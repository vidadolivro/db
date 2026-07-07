/* Importa editoras/selos para db_dir_editoras no Directus.
   - garante campos selo + instagram
   - substitui os itens existentes pelos do JSON
   Token: .directus-token (ou env DIRECTUS_TOKEN).
   Uso: node scripts/import-editoras.mjs <editoras.json>
*/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';
const COL = 'db_dir_editoras';
const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const TK = (process.env.DIRECTUS_TOKEN
  || fs.readFileSync(path.join(ROOT, '.directus-token'), 'utf8')).trim();

const JSON_PATH = process.argv[2] || 'editoras.json';
const data = JSON.parse(fs.readFileSync(JSON_PATH, 'utf8'));

async function api(method, p, body) {
  const r = await fetch(DIRECTUS + p, {
    method,
    headers: { Authorization: 'Bearer ' + TK, 'Content-Type': 'application/json' },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  const txt = await r.text();
  let j; try { j = txt ? JSON.parse(txt) : {}; } catch { j = { raw: txt }; }
  return { status: r.status, ok: r.ok, j };
}

/* 1) campos */
for (const [field, note] of [['selo', 'selo / imprint'], ['instagram', '@ do Instagram']]) {
  const { ok, j } = await api('POST', '/fields/' + COL, {
    field, type: 'string', meta: { interface: 'input', note }, schema: {},
  });
  const msg = String(j.errors?.[0]?.message || '');
  console.log(ok ? `  + campo ${field} criado`
    : `  = campo ${field}: ${/exist|unique/i.test(msg) ? 'já existe' : msg}`);
}

/* 2) apagar existentes */
const cur = await api('GET', `/items/${COL}?fields=id&limit=2000`);
const ids = (cur.j.data || []).map(it => it.id);
if (ids.length) {
  const del = await api('DELETE', `/items/${COL}`, ids);
  console.log(`  - ${ids.length} itens antigos removidos (status ${del.status})`);
}

/* 3) importar em lotes de 100 */
let total = 0;
for (let i = 0; i < data.length; i += 100) {
  const chunk = data.slice(i, i + 100);
  const res = await api('POST', `/items/${COL}`, chunk);
  if (res.ok) total += (res.j.data || chunk).length;
  else { console.error(`  ✗ lote ${i}:`, JSON.stringify(res.j.errors?.[0] || res.j)); break; }
}
console.log(`\n✓ ${total} editoras/selos importados em ${COL}`);
