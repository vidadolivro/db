#!/usr/bin/env node
/* Cria as coleções db_editores e db_listas_mais_vendidos no Directus
   e configura permissões para db_colaborador (insert) e público (read).

   Uso:
     DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/setup-db-dirs.js
*/

'use strict';

const DIRECTUS       = 'https://directus-production-afdd.up.railway.app';
const PUBLIC_POLICY  = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';
const COLAB_POLICY   = '00754130-b5ec-4e8c-b1e2-c356af1dcdc2';

const COLECOES = [
  {
    name: 'db_editores',
    fields: [
      { field: 'nome',       type: 'string',   meta: { required: true } },
      { field: 'onde_atua',  type: 'string',   meta: {} },
      { field: 'rede',       type: 'string',   meta: { note: 'URL — LinkedIn, Instagram, site…' } },
    ],
  },
  {
    name: 'db_listas_mais_vendidos',
    fields: [
      { field: 'nome',          type: 'string',  meta: { required: true } },
      { field: 'href',          type: 'string',  meta: { required: true, note: 'URL da lista' } },
      { field: 'pais',          type: 'string',  meta: {} },
      { field: 'periodicidade', type: 'string',  meta: { note: 'semanal, mensal, anual…' } },
    ],
  },
];

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
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (!email || !pass) {
    console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/setup-db-dirs.js');
    process.exit(1);
  }

  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado\n');

  for (const col of COLECOES) {
    console.log(`── ${col.name} ──`);

    /* verificar se já existe */
    try {
      const existing = await api(token, 'GET', `/collections/${col.name}`);
      if (existing) { console.log(`  já existe — pulando criação`); }
    } catch {
      /* não existe — criar */
      await api(token, 'POST', '/collections', {
        collection: col.name,
        schema: { name: col.name },
        meta: { icon: 'list', color: '#2ECDA7' },
      });
      console.log(`  ✓ coleção criada`);

      /* criar campos */
      for (const f of col.fields) {
        await api(token, 'POST', '/fields/' + col.name, {
          field: f.field, type: f.type,
          schema: { is_nullable: true },
          meta: f.meta,
        });
        console.log(`  ✓ campo: ${f.field}`);
      }
    }

    /* permissões: público pode ler */
    await api(token, 'POST', '/permissions', {
      policy: PUBLIC_POLICY, collection: col.name, action: 'read', fields: ['*'],
    }).catch(() => console.log(`  (permissão pública já existe)`));
    console.log(`  ✓ público: read`);

    /* permissões: colaborador pode inserir, editar e excluir */
    for (const action of ['create', 'update', 'delete']) {
      await api(token, 'POST', '/permissions', {
        policy: COLAB_POLICY, collection: col.name, action, fields: ['*'],
      }).catch(() => {});
    }
    console.log(`  ✓ colaborador: create / update / delete\n`);
  }

  console.log('✓ setup concluído.');
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
