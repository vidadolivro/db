#!/usr/bin/env node
/* vida do livro db — setup do Flow que dispara o sync a cada adição
   Cria (ou atualiza) um Flow no Directus que, sempre que um item é criado
   nas coleções db_*, chama o workflow sync.yml no GitHub Actions.

   O token do GitHub fica guardado DENTRO do Directus (server-side),
   nunca no navegador nem no repositório público.

   Uso:
     DIRECTUS_EMAIL=seu@email \
     DIRECTUS_PASS=suasenha \
     GITHUB_SYNC_TOKEN=github_pat_xxx \
     node scripts/setup-flow.js
*/

'use strict';

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';
const REPO     = 'vidadolivro/db';
const WORKFLOW = 'sync.yml';
const FLOW_NAME = 'sync github a cada adição';
const COLLECTIONS = ['db_videos', 'db_podcasts', 'db_links', 'db_textos', 'db_artigos', 'db_livros'];

async function api(token, method, path, body) {
  const r = await fetch(DIRECTUS + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = r.status === 204 ? {} : await r.json();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${JSON.stringify(d.errors?.[0]?.message || d.errors?.[0] || d)}`);
  return d.data;
}

async function run() {
  const email   = process.env.DIRECTUS_EMAIL;
  const pass    = process.env.DIRECTUS_PASS;
  const ghToken = process.env.GITHUB_SYNC_TOKEN;

  if (!email || !pass || !ghToken) {
    console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx GITHUB_SYNC_TOKEN=github_pat_xxx node scripts/setup-flow.js');
    process.exit(1);
  }

  /* ── login ── */
  console.log('Fazendo login no Directus…');
  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado\n');

  /* ── opções da operação que chama o GitHub ── */
  const requestOptions = {
    url: `https://api.github.com/repos/${REPO}/actions/workflows/${WORKFLOW}/dispatches`,
    method: 'POST',
    headers: [
      { header: 'Authorization',        value: 'Bearer ' + ghToken },
      { header: 'Accept',               value: 'application/vnd.github+json' },
      { header: 'X-GitHub-Api-Version', value: '2022-11-28' },
      { header: 'User-Agent',           value: 'directus-vida-do-livro' },
    ],
    body: JSON.stringify({ ref: 'main' }),
  };

  /* ── flow já existe? ── */
  const existing = await api(token, 'GET',
    `/flows?filter[name][_eq]=${encodeURIComponent(FLOW_NAME)}&fields=id,operation`);

  if (existing.length) {
    const flowId = existing[0].id;
    console.log('Flow já existe:', flowId, '— atualizando o token/opções…');
    /* atualiza a operação existente (rotaciona o token sem recriar o flow) */
    const ops = await api(token, 'GET', `/operations?filter[flow][_eq]=${flowId}&fields=id,key`);
    const op = ops.find(o => o.key === 'github_dispatch') || ops[0];
    if (op) {
      await api(token, 'PATCH', `/operations/${op.id}`, { options: requestOptions });
      console.log('✓ operação atualizada — token novo aplicado');
    } else {
      console.warn('⚠ flow existe mas sem operação; recrie removendo o flow antigo no painel.');
    }
    console.log('\n✓ pronto. As adições continuam disparando o sync.');
    return;
  }

  /* ── criar flow ── */
  console.log('Criando flow…');
  const flow = await api(token, 'POST', '/flows', {
    name: FLOW_NAME,
    icon: 'sync',
    color: '#2ECDA7',
    description: 'Dispara o workflow sync.yml no GitHub a cada item criado nas coleções db_*',
    status: 'active',
    trigger: 'event',
    accountability: 'all',
    options: {
      type: 'action',            // roda DEPOIS do evento, sem bloquear o salvamento
      scope: ['items.create'],
      collections: COLLECTIONS,
    },
  });
  console.log('✓ flow criado:', flow.id);

  /* ── criar operação (request → GitHub) ── */
  console.log('Criando operação de disparo…');
  const op = await api(token, 'POST', '/operations', {
    flow: flow.id,
    name: 'dispatch github actions',
    key: 'github_dispatch',
    type: 'request',
    position_x: 19,
    position_y: 1,
    options: requestOptions,
  });
  console.log('✓ operação criada:', op.id);

  /* ── ligar a operação como início do flow ── */
  await api(token, 'PATCH', `/flows/${flow.id}`, { operation: op.id });
  console.log('✓ operação ligada ao flow');

  console.log('\n✓ setup concluído!');
  console.log(`Coleções monitoradas: ${COLLECTIONS.join(', ')}`);
  console.log('A partir de agora, cada item adicionado dispara o sync no GitHub.');
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
