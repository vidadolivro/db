#!/usr/bin/env node
/* vida do livro db — consulta rápida ao Directus (Directus Query)
   Usa um token estático salvo localmente, sem precisar de e-mail/senha.

   Token: lido de (nesta ordem)
     1. variável de ambiente DIRECTUS_TOKEN
     2. arquivo .directus-token na raiz do projeto (uma linha, só o token)

   Uso:
     node scripts/dq.js "users?fields=email,first_name,role.name"
     node scripts/dq.js "items/db_links?limit=5&sort=-id"
     node scripts/dq.js "items/db_links/3" DELETE
     node scripts/dq.js "items/db_links/3" PATCH '{"titulo":"novo"}'

   (sem método = GET). O resultado vem em JSON.
*/

'use strict';
const fs   = require('fs');
const path = require('path');

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';

function pegarToken() {
  if (process.env.DIRECTUS_TOKEN) return process.env.DIRECTUS_TOKEN.trim();
  const f = path.join(__dirname, '..', '.directus-token');
  if (fs.existsSync(f)) return fs.readFileSync(f, 'utf8').trim();
  return null;
}

async function run() {
  const token = pegarToken();
  if (!token) {
    console.error('Sem token. Crie o arquivo .directus-token (uma linha com o token estático) na raiz do projeto,');
    console.error('ou defina a variável DIRECTUS_TOKEN.');
    process.exit(1);
  }

  const endpoint = process.argv[2];
  const method   = (process.argv[3] || 'GET').toUpperCase();
  const body     = process.argv[4];

  if (!endpoint) {
    console.error('Uso: node scripts/dq.js "<endpoint>" [METHOD] [jsonBody]');
    console.error('Ex.:  node scripts/dq.js "users?fields=email,role.name"');
    process.exit(1);
  }

  const url = DIRECTUS + '/' + endpoint.replace(/^\//, '');
  const opts = { method, headers: { Authorization: 'Bearer ' + token } };
  if (body) { opts.headers['Content-Type'] = 'application/json'; opts.body = body; }

  const r = await fetch(url, opts);
  const txt = await r.text();
  let out;
  try { out = JSON.stringify(JSON.parse(txt), null, 2); } catch { out = txt; }
  console.log(`HTTP ${r.status} ${r.statusText}\n${out}`);
  if (!r.ok) process.exit(1);
}

run().catch(e => { console.error('erro:', e.message); process.exit(1); });
