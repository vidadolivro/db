#!/usr/bin/env node
/* Cria no Directus as coleções de diretório genéricas (db_dir_*) que ainda
   não existem, lendo dados/dir-config.js. Idempotente: pode rodar sempre.
   Campos genéricos: c1..c4, tags (json), href. Permissões: público read,
   colaborador read/create/update/delete.

   Uso:
     DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/setup-dir-collections.js
*/

'use strict';

const fs   = require('fs');
const path = require('path');

const DIRECTUS      = 'https://directus-production-afdd.up.railway.app';
const PUBLIC_POLICY = 'abf8a154-5b1c-4a46-ac9c-7300570f4f17';
const COLAB_POLICY  = '00754130-b5ec-4e8c-b1e2-c356af1dcdc2';

/* carrega a config dos diretórios */
const src = fs.readFileSync(path.join(__dirname, '..', 'dados/dir-config.js'), 'utf8');
const w = {};
new Function('window', src)(w); // eslint-disable-line no-new-func
const CFG = w.DIR_CONFIG || {};

/* só as coleções genéricas db_dir_* (as db_editores/listas/designers têm schema próprio) */
const COLECOES = [...new Set(Object.values(CFG).map(c => c.collection).filter(n => n && n.startsWith('db_dir_')))];

async function api(token, method, p, body) {
  const r = await fetch(DIRECTUS + p, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = r.status === 204 ? {} : await r.json();
  return { ok: r.ok, data: d.data, err: d.errors?.[0]?.message };
}

async function run() {
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (!email || !pass) {
    console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/setup-dir-collections.js');
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

  console.log('coleções db_dir_* na config:', COLECOES.join(', '), '\n');

  for (const col of COLECOES) {
    const ex = await api(token, 'GET', '/collections/' + col);
    if (ex.ok && ex.data) { console.log(`— ${col}: já existe`); continue; }

    const c = await api(token, 'POST', '/collections', {
      collection: col, schema: { name: col }, meta: { icon: 'list', color: '#2ECDA7' },
    });
    if (!c.ok) { console.error(`✗ ${col}: erro coleção → ${c.err}`); continue; }

    const fields = [
      { field: 'c1', type: 'string' }, { field: 'c2', type: 'string' },
      { field: 'c3', type: 'string' }, { field: 'c4', type: 'string' },
      { field: 'tags', type: 'json' }, { field: 'href', type: 'string' },
    ];
    for (const f of fields) {
      const fr = await api(token, 'POST', '/fields/' + col, { field: f.field, type: f.type, schema: { is_nullable: true }, meta: {} });
      if (!fr.ok) console.error(`  ✗ ${col}.${f.field}: ${fr.err}`);
    }
    console.log(`✓ ${col}: criada + campos`);

    await api(token, 'POST', '/permissions', { policy: PUBLIC_POLICY, collection: col, action: 'read', fields: ['*'] });
    for (const action of ['read', 'create', 'update', 'delete']) {
      await api(token, 'POST', '/permissions', { policy: COLAB_POLICY, collection: col, action, fields: ['*'] });
    }
    console.log(`  permissões: público read | colaborador read/create/update/delete`);
  }

  console.log('\n✓ pronto.');
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
