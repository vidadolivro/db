#!/usr/bin/env node
/* vida do livro db — sync
   Lê dados/categorias.js + busca Directus + gera dados/livros.js
   Uso: npm run sync */

'use strict';
const fs   = require('fs');
const path = require('path');

const DIRECTUS = 'https://directus-production-afdd.up.railway.app/items/biblioteca';
const ROOT     = path.join(__dirname, '..');

/* ── carregar categorias ── */
const src = fs.readFileSync(path.join(ROOT, 'dados/categorias.js'), 'utf8');
const fakeWindow = {};
const fn = new Function('window', src); // eslint-disable-line no-new-func
fn(fakeWindow);
const CATS = fakeWindow.CATEGORIAS || [];

if (!CATS.length) { console.log('categorias.js vazio — nada a fazer.'); process.exit(0); }

const locais  = CATS.filter(c => c.titulo);
const remotos = CATS.filter(c => !c.titulo);
console.log(`categorias: ${CATS.length} total  |  ${remotos.length} remotos  |  ${locais.length} locais`);

/* ── helpers ── */
function normAutor(s) {
  if (!s) return '';
  return s.split('; ').map(a => {
    if (a.includes(',')) {
      const comma = a.indexOf(',');
      const sob = a.slice(0, comma).trim();
      const nom = a.slice(comma + 1).trim();
      return nom ? nom + ' ' + sob : sob;
    }
    return a.trim();
  }).join(' & ');
}

function normAno(s) {
  if (!s) return '';
  const y = parseInt(String(s).slice(0, 4), 10);
  return isNaN(y) ? '' : y;
}

/* ── main ── */
async function run() {
  let dbMap = {};

  if (remotos.length) {
    const isbns = remotos.map(c => c.isbn).join(',');
    const url   = `${DIRECTUS}?filter[isbn][_in]=${encodeURIComponent(isbns)}&fields=isbn,titulo,autor,editora,data_publicacao,capa_url&limit=${remotos.length + 10}`;

    console.log(`\nbuscando ${remotos.length} ISBN(s) no Directus…`);
    const res  = await fetch(url);
    const json = await res.json();
    const data = json.data || [];
    data.forEach(l => { dbMap[l.isbn] = l; });
    console.log(`  encontrados: ${data.length}`);

    const missing = remotos.filter(c => !dbMap[c.isbn]);
    if (missing.length) {
      console.warn(`  não encontrados (${missing.length}):`);
      missing.forEach(c => console.warn(`    isbn ${c.isbn}`));
    }
  }

  /* merge */
  const livros = CATS.map(cat => {
    const db    = dbMap[cat.isbn] || {};
    const titulo = cat.titulo || db.titulo || null;
    if (!titulo) return null;
    return {
      isbn:      cat.isbn,
      titulo,
      autor:     cat.autor   || normAutor(db.autor)          || '',
      editora:   cat.editora || db.editora                   || '',
      ano:       cat.ano     || normAno(db.data_publicacao)  || '',
      capa:      cat.capa    || db.capa_url                  || '',
      macrotema: cat.macrotema || null,
      temas:     cat.temas   || [],
      href:      cat.href    || '#',
    };
  }).filter(Boolean);

  /* gerar livros.js */
  const out = [
    '/* vida do livro db — gerado por scripts/sync.js */',
    '/* não editar manualmente — rode: npm run sync */',
    '',
    'window.LIVROS = ' + JSON.stringify(livros, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(ROOT, 'dados/livros.js'), out, 'utf8');
  console.log(`\n✓ dados/livros.js gerado — ${livros.length} livro(s)`);
}

run().catch(err => { console.error('\nerro:', err.message); process.exit(1); });
