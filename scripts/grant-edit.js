#!/usr/bin/env node
/* vida do livro db — libera EDITAR e EXCLUIR para os colaboradores
   Adiciona as permissões update + delete ao policy db_colaborador,
   nas coleções de conteúdo. Assim dá pra corrigir/remover itens
   (ex: um item cadastrado como "link" que na verdade é "texto").

   Uso:
     DIRECTUS_EMAIL=seu@email DIRECTUS_PASS=suasenha node scripts/grant-edit.js
*/

'use strict';

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';
const COLLECTIONS = ['db_videos', 'db_podcasts', 'db_links', 'db_textos', 'db_artigos', 'db_livros'];
const ACTIONS = ['update', 'delete'];

async function api(token, method, path, body) {
  const r = await fetch(DIRECTUS + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = r.status === 204 ? {} : await r.json();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${JSON.stringify(d.errors?.[0]?.message || d)}`);
  return d.data;
}

async function run() {
  const email = process.env.DIRECTUS_EMAIL, pass = process.env.DIRECTUS_PASS;
  if (!email || !pass) { console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/grant-edit.js'); process.exit(1); }

  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado\n');

  /* acha a policy db_colaborador */
  const policies = await api(token, 'GET', '/policies?filter[name][_eq]=db_colaborador&fields=id,name');
  if (!policies.length) { console.error('✗ Policy db_colaborador não encontrada. Rode scripts/setup-directus.js antes.'); process.exit(1); }
  const policyId = policies[0].id;
  console.log('policy db_colaborador:', policyId, '\n');

  for (const col of COLLECTIONS) {
    for (const action of ACTIONS) {
      try {
        await api(token, 'POST', '/permissions', { policy: policyId, collection: col, action, fields: ['*'] });
        console.log(`  ✓ ${col} — ${action}`);
      } catch (e) {
        if (e.message.includes('unique') || e.message.includes('already') || e.message.includes('RECORD_NOT_UNIQUE')) {
          console.log(`  — ${col} ${action}: já existe`);
        } else {
          console.error(`  ✗ ${col} ${action}:`, e.message);
        }
      }
    }
  }

  console.log('\n✓ pronto. Colaboradores agora podem editar e excluir itens nas coleções db_*.');
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
