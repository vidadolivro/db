#!/usr/bin/env node
/* vida do livro db — diagnóstico do Flow de sync
   Verifica por que o "sync a cada adição" não está disparando.

   Uso:
     DIRECTUS_EMAIL=seu@email DIRECTUS_PASS=suasenha node scripts/diag-flow.js
*/

'use strict';

const DIRECTUS  = 'https://directus-production-afdd.up.railway.app';
const FLOW_NAME = 'sync github a cada adição';

async function api(token, path) {
  const r = await fetch(DIRECTUS + path, { headers: { Authorization: 'Bearer ' + token } });
  const d = await r.json();
  if (!r.ok) throw new Error(`${path} → ${r.status}: ${JSON.stringify(d.errors?.[0]?.message || d)}`);
  return d.data;
}

async function run() {
  const email = process.env.DIRECTUS_EMAIL, pass = process.env.DIRECTUS_PASS;
  if (!email || !pass) { console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/diag-flow.js'); process.exit(1); }

  /* login */
  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado no Directus\n');

  /* flow */
  const flows = await api(token, `/flows?filter[name][_eq]=${encodeURIComponent(FLOW_NAME)}&fields=id,name,status,trigger,options,operation`);
  if (!flows.length) { console.error('✗ Flow não encontrado. Rode scripts/setup-flow.js primeiro.'); process.exit(1); }
  const flow = flows[0];
  console.log('── FLOW ──');
  console.log('  status   :', flow.status, flow.status === 'active' ? '✓' : '✗ (precisa estar "active")');
  console.log('  trigger  :', flow.trigger);
  console.log('  options  :', JSON.stringify(flow.options));
  console.log('  operation:', flow.operation || '✗ NENHUMA operação ligada');

  /* operações */
  const ops = await api(token, `/operations?filter[flow][_eq]=${flow.id}&fields=id,key,type,options`);
  const op = ops.find(o => o.key === 'github_dispatch') || ops[0];
  if (!op) { console.error('\n✗ Nenhuma operação no flow.'); process.exit(1); }
  console.log('\n── OPERAÇÃO ──');
  console.log('  type :', op.type, op.type === 'request' ? '✓' : '✗ (esperado "request")');
  console.log('  url  :', op.options?.url);
  console.log('  method:', op.options?.method);

  /* extrai o token do header Authorization (sem imprimir o valor) */
  const headers = op.options?.headers || [];
  const authH = headers.find(h => (h.header || '').toLowerCase() === 'authorization');
  if (!authH) { console.error('\n✗ Sem header Authorization na operação.'); process.exit(1); }
  const ghToken = String(authH.value || '').replace(/^Bearer\s+/i, '');
  console.log('  token: ' + ghToken.slice(0, 10) + '…' + ghToken.slice(-4) + ' (' + ghToken.length + ' chars)');

  /* TESTE REAL: dispara o workflow no GitHub com o token guardado */
  console.log('\n── TESTE DE DISPARO NO GITHUB ──');
  const ghRes = await fetch(op.options.url, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + ghToken,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'vida-do-livro-diag',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ref: 'main' }),
  });
  console.log('  HTTP', ghRes.status, ghRes.statusText);
  if (ghRes.status === 204) {
    console.log('  ✓ TOKEN OK — o GitHub aceitou. O sync foi disparado por este teste.');
    console.log('  → Se mesmo assim as adições não disparam, o problema é o GATILHO do Flow (evento items.create).');
  } else {
    const body = await ghRes.text();
    console.log('  ✗ FALHOU. Resposta do GitHub:', body.slice(0, 300));
    if (ghRes.status === 403) console.log('  → 403 normalmente = token fine-grained PENDENTE de aprovação na org, ou sem permissão "Actions: Read and write".');
    if (ghRes.status === 401) console.log('  → 401 = token inválido/expirado.');
  }
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
