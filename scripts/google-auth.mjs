/* Autorização Google (OAuth de app para computador).
 *
 * A organização bloqueia chave de conta de serviço
 * (iam.disableServiceAccountKeyCreation), então o acesso é como usuário: você
 * autoriza uma vez no navegador e fica guardado um refresh token, que os
 * scripts trocam por acesso temporário quando precisam.
 *
 *   node scripts/google-auth.mjs            → autoriza (uma vez só)
 *   node scripts/google-auth.mjs --status   → diz se já está valendo
 *
 * Nos outros scripts:
 *   import { tokenDeAcesso } from './google-auth.mjs'
 *
 * Os dois arquivos de credencial ficam FORA do repositório, no caminho de
 * CREDENCIAIS abaixo. Nenhum deles deve ser versionado nem colado em chat.
 */
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import os from 'node:os';

const CREDENCIAIS = process.env.VDL_CREDENCIAIS || path.join(os.homedir(), '.vdl-google');
const CLIENTE = path.join(CREDENCIAIS, 'cliente-oauth.json');   /* o que você baixa do Google Cloud */
const TOKEN = path.join(CREDENCIAIS, 'token.json');             /* o que este script grava */
const PORTA = 4599;

/* spreadsheets: ler e escrever planilhas.
   drive.readonly: só pra localizar arquivos pelo nome — tire se não quiser. */
const ESCOPOS = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.readonly',
];

function lerCliente() {
  if (!fs.existsSync(CLIENTE)) {
    console.error(`✗ não achei ${CLIENTE}`);
    console.error(`  baixe o JSON em Google Cloud → Clientes → App para computador e salve nesse caminho`);
    process.exit(1);
  }
  const j = JSON.parse(fs.readFileSync(CLIENTE, 'utf8'));
  const c = j.installed || j.web || j;
  if (!c.client_id || !c.client_secret) {
    console.error('✗ esse JSON não parece de cliente OAuth de app para computador (falta client_id/client_secret)');
    process.exit(1);
  }
  return { id: c.client_id, segredo: c.client_secret };
}

async function trocar(corpo) {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(corpo),
  });
  const j = await r.json();
  if (!r.ok) throw new Error('google recusou: ' + (j.error_description || j.error || r.status));
  return j;
}

/* ── autorização inicial ──
   Servidor local só pra receber o "code" de volta do navegador. O Google
   permite redirecionar pra localhost em cliente de app para computador. */
export async function autorizar() {
  const cli = lerCliente();
  const redirect = `http://localhost:${PORTA}`;
  const estado = Math.random().toString(36).slice(2) + Date.now().toString(36);

  const url = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
    client_id: cli.id,
    redirect_uri: redirect,
    response_type: 'code',
    scope: ESCOPOS.join(' '),
    access_type: 'offline',      /* é isto que faz vir o refresh token */
    prompt: 'consent',
    state: estado,
  });

  console.log('\nAbra este endereço no navegador e autorize com a sua conta:\n');
  console.log(url + '\n');

  const codigo = await new Promise((ok, falha) => {
    const s = http.createServer((req, res) => {
      const u = new URL(req.url, redirect);
      if (u.pathname !== '/') { res.writeHead(404).end(); return; }
      const erro = u.searchParams.get('error');
      const code = u.searchParams.get('code');
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(`<meta charset="utf-8"><body style="font:16px system-ui;padding:40px">
        <p>${erro ? 'Autorização recusada: ' + erro : 'Pronto. Pode fechar esta aba e voltar pro terminal.'}</p></body>`);
      s.close();
      if (erro) falha(new Error(erro));
      else if (u.searchParams.get('state') !== estado) falha(new Error('state não confere — recomece'));
      else ok(code);
    });
    s.listen(PORTA, () => console.log(`esperando o retorno em ${redirect} …`));
    setTimeout(() => { s.close(); falha(new Error('tempo esgotado — ninguém autorizou em 5 min')); }, 5 * 60 * 1000);
  });

  const t = await trocar({
    code: codigo, client_id: cli.id, client_secret: cli.segredo,
    redirect_uri: redirect, grant_type: 'authorization_code',
  });
  if (!t.refresh_token) {
    console.error('✗ o Google não devolveu refresh token. Revogue o acesso em');
    console.error('  myaccount.google.com/permissions e rode de novo.');
    process.exit(1);
  }

  fs.mkdirSync(CREDENCIAIS, { recursive: true });
  fs.writeFileSync(TOKEN, JSON.stringify({ refresh_token: t.refresh_token, escopos: ESCOPOS, em: new Date().toISOString() }, null, 2), { mode: 0o600 });
  console.log(`\n✓ autorizado. Token guardado em ${TOKEN}`);
  console.log('  (não versione esse arquivo e não cole o conteúdo dele em lugar nenhum)');
}

/* ── uso corrente ── */
let cache = { valor: '', vence: 0 };
export async function tokenDeAcesso() {
  if (cache.valor && Date.now() < cache.vence - 60_000) return cache.valor;
  if (!fs.existsSync(TOKEN)) throw new Error('ainda não autorizado — rode: node scripts/google-auth.mjs');
  const cli = lerCliente();
  const { refresh_token } = JSON.parse(fs.readFileSync(TOKEN, 'utf8'));
  const t = await trocar({
    refresh_token, client_id: cli.id, client_secret: cli.segredo, grant_type: 'refresh_token',
  });
  cache = { valor: t.access_token, vence: Date.now() + (t.expires_in || 3600) * 1000 };
  return cache.valor;
}

/* só age como programa quando é ele que foi chamado na linha de comando;
   importado por outro script (ou por node -e, onde argv[1] nem existe), fica quieto */
const chamadoDireto = process.argv[1] && import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`;
if (chamadoDireto) {
  if (process.argv.includes('--status')) {
    if (!fs.existsSync(TOKEN)) { console.log('✗ ainda não autorizado'); process.exit(1); }
    await tokenDeAcesso();
    const j = JSON.parse(fs.readFileSync(TOKEN, 'utf8'));
    console.log(`✓ valendo — autorizado em ${j.em}`);
    console.log('  escopos:', j.escopos.join(', '));
  } else {
    await autorizar();
  }
}
