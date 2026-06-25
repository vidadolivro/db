#!/usr/bin/env node
/* Migra os livros de dados/categorias.js para db_livros no Directus,
   garantindo que cada ISBN está ligado à coleção biblioteca (capas/metadados).

   Uso:
     DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/migrate-categorias.js

   Flags:
     --dry-run   só mostra o que faria, sem escrever nada
     --limpar    após migração bem-sucedida, esvazia categorias.js
*/

'use strict';

const fs   = require('fs');
const path = require('path');

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';
const ROOT     = path.join(__dirname, '..');
const DRY      = process.argv.includes('--dry-run');
const LIMPAR   = process.argv.includes('--limpar');

/* ── carregar categorias ── */
const src = fs.readFileSync(path.join(ROOT, 'dados/categorias.js'), 'utf8');
const fake = {};
new Function('window', src)(fake); // eslint-disable-line no-new-func
const CATS = (fake.CATEGORIAS || []).filter(c => c.isbn && !c.titulo); // só os remotos (sem título hardcoded)

if (!CATS.length) { console.log('Nada para migrar.'); process.exit(0); }
console.log(`${CATS.length} livro(s) em categorias.js para migrar.\n`);

async function api(token, method, url, body) {
  const r = await fetch(DIRECTUS + url, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = r.status === 204 ? {} : await r.json();
  if (!r.ok) throw new Error(`${method} ${url} → ${r.status}: ${JSON.stringify(d.errors?.[0]?.message || d)}`);
  return d.data;
}

async function run() {
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (!email || !pass) {
    console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/migrate-categorias.js');
    process.exit(1);
  }

  /* login */
  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado\n');

  /* verificar quais ISBNs existem na biblioteca */
  const isbns = [...new Set(CATS.map(c => c.isbn))];
  const bibData = await api(token, 'GET',
    `/items/biblioteca?filter[isbn][_in]=${encodeURIComponent(isbns.join(','))}&fields=isbn,titulo,capa_url&limit=${isbns.length + 5}`);
  const bibMap = {};
  (bibData || []).forEach(b => { bibMap[b.isbn] = b; });

  console.log('── Verificação na biblioteca ──');
  let ok = 0, faltando = 0;
  isbns.forEach(isbn => {
    const b = bibMap[isbn];
    if (b) {
      console.log(`  ✓ ${isbn}  "${b.titulo}"  capa:${b.capa_url ? 'sim' : 'NÃO'}`);
      ok++;
    } else {
      console.log(`  ✗ ${isbn}  NÃO está na biblioteca`);
      faltando++;
    }
  });
  console.log(`\n  ${ok} com registro  |  ${faltando} faltando\n`);

  /* verificar o que já existe em db_livros (evitar duplicatas) */
  const existentes = await api(token, 'GET',
    `/items/db_livros?filter[isbn][_in]=${encodeURIComponent(isbns.join(','))}&fields=id,isbn,tema_slug&limit=500`);
  const jaExiste = new Set((existentes || []).map(e => `${e.isbn}|${e.tema_slug}`));

  /* montar lista de entradas a criar */
  const acriar = [];
  CATS.forEach(cat => {
    (cat.temas || []).forEach(tema => {
      const key = `${cat.isbn}|${tema}`;
      if (jaExiste.has(key)) {
        console.log(`  já existe: isbn=${cat.isbn} tema=${tema} — ignorando`);
      } else {
        acriar.push({ isbn: cat.isbn, macrotema: cat.macrotema || null, tema_slug: tema });
      }
    });
  });

  console.log(`\n── ${acriar.length} entrada(s) a criar em db_livros ──`);
  acriar.forEach(e => console.log(`  + isbn=${e.isbn}  tema=${e.tema_slug}  macro=${e.macrotema}`));

  if (DRY) { console.log('\n[dry-run] Nenhuma escrita realizada.'); return; }
  if (!acriar.length) { console.log('\nNada a criar — todos já migrados.'); }

  /* criar entradas */
  let criados = 0, erros = 0;
  for (const entry of acriar) {
    try {
      await api(token, 'POST', '/items/db_livros', entry);
      console.log(`  ✓ criado: isbn=${entry.isbn}  tema=${entry.tema_slug}`);
      criados++;
    } catch (e) {
      console.error(`  ✗ erro: isbn=${entry.isbn}  tema=${entry.tema_slug}  →  ${e.message}`);
      erros++;
    }
  }

  console.log(`\n✓ ${criados} criado(s)  |  ${erros} erro(s)`);

  if (erros === 0 && LIMPAR) {
    const novasCats = `/* vida do livro db — categorias
   Livros migrados para db_livros no Directus.
   Este arquivo mantido vazio para compatibilidade. */

window.CATEGORIAS = [];
`;
    fs.writeFileSync(path.join(ROOT, 'dados/categorias.js'), novasCats, 'utf8');
    console.log('\n✓ dados/categorias.js esvaziado.');
  } else if (erros > 0) {
    console.log('\n⚠ Houve erros — categorias.js não foi modificado.');
  } else {
    console.log('\ncategorias.js mantido. Use --limpar para esvaziar após confirmar.');
  }
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
