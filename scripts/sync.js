#!/usr/bin/env node
/* vida do livro db — sync
   Lê dados/categorias.js + busca Directus + gera dados/livros.js
   Uso: npm run sync */

'use strict';
const fs   = require('fs');
const path = require('path');

const DIRECTUS_BASE = 'https://directus-production-afdd.up.railway.app';
const DIRECTUS      = DIRECTUS_BASE + '/items/biblioteca';
const ROOT          = path.join(__dirname, '..');

/* ── carregar categorias ── */
const src = fs.readFileSync(path.join(ROOT, 'dados/categorias.js'), 'utf8');
const fakeWindow = {};
const fn = new Function('window', src); // eslint-disable-line no-new-func
fn(fakeWindow);
const CATS = fakeWindow.CATEGORIAS || [];

/* ── carregar temas (para mapear slug → macrotema) ── */
const temasSrc = fs.readFileSync(path.join(ROOT, 'dados/temas.js'), 'utf8');
const fakeTemas = {};
new Function('window', temasSrc)(fakeTemas); // eslint-disable-line no-new-func
const TEMAS = fakeTemas.TEMAS || {};
const SLUG_TO_MACRO = {};
Object.entries(TEMAS).forEach(([slug, t]) => { if (t.macrotema) SLUG_TO_MACRO[slug] = t.macrotema; });

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

  /* merge curados */
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

  /* merge db_livros (contribuições) */
  const dbLivros = await fetchDbLivros();
  const isbnIndex = {};
  livros.forEach((l, i) => { if (l.isbn) isbnIndex[l.isbn] = i; });
  dbLivros.forEach(item => {
    if (!item.titulo) return;
    const temaSlug = item.tema_slug || '';
    const macro    = SLUG_TO_MACRO[temaSlug] || null;
    if (item.isbn && isbnIndex[item.isbn] !== undefined) {
      /* livro já existe: adiciona tema e macrotema se ainda não tem */
      const l = livros[isbnIndex[item.isbn]];
      if (temaSlug && !l.temas.includes(temaSlug)) l.temas.push(temaSlug);
      if (macro && !l.macrotema) l.macrotema = macro;
    } else {
      /* livro novo */
      const key = item.isbn || item.titulo;
      if (!isbnIndex[key]) {
        isbnIndex[key] = livros.length;
        livros.push({
          isbn:      item.isbn      || '',
          titulo:    item.titulo,
          autor:     normAutor(item.autor) || '',
          editora:   item.editora   || '',
          ano:       '',
          capa:      '',
          macrotema: macro,
          temas:     temaSlug ? [temaSlug] : [],
          href:      item.href      || '#',
        });
      } else if (temaSlug) {
        const l = livros[isbnIndex[key]];
        if (!l.temas.includes(temaSlug)) l.temas.push(temaSlug);
        if (macro && !l.macrotema) l.macrotema = macro;
      }
    }
  });

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

  await syncTemasMedia();
  await syncTemasConteudo();
}

async function fetchDbLivros() {
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (!email || !pass) return [];
  try {
    const lr = await fetch(DIRECTUS_BASE + '/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });
    const ld = await lr.json();
    const t  = ld.data?.access_token;
    if (!t) return [];
    const r = await fetch(DIRECTUS_BASE + '/items/db_livros?limit=1000&sort=id', {
      headers: { Authorization: 'Bearer ' + t },
    });
    const d = await r.json();
    return d.data || [];
  } catch { return []; }
}

/* ── fase 2: temas-media ── */
async function syncTemasMedia() {
  const temasSrc = fs.readFileSync(path.join(ROOT, 'dados/temas.js'), 'utf8');
  const fakeWin2 = {};
  new Function('window', temasSrc)(fakeWin2); // eslint-disable-line no-new-func
  const TEMAS = fakeWin2.TEMAS || {};

  /* coletar hrefs únicos */
  const spotifyHrefs = new Set();
  const linkHrefs    = new Set();
  Object.values(TEMAS).forEach(t => {
    (t.podcasts || []).forEach(ep => { if (ep.href && ep.href.includes('spotify.com')) spotifyHrefs.add(ep.href); });
    (t.links    || []).forEach(lk => { if (lk.href && lk.href !== '#') linkHrefs.add(lk.href); });
  });

  const podcastImgs = {};
  const linkImgs    = {};

  /* Spotify oEmbed */
  console.log(`\nbuscando artwork de ${spotifyHrefs.size} podcast(s)…`);
  await Promise.all([...spotifyHrefs].map(async href => {
    try {
      const r = await fetch('https://open.spotify.com/oembed?url=' + encodeURIComponent(href));
      const d = await r.json();
      if (d.thumbnail_url) { podcastImgs[href] = d.thumbnail_url; console.log(`  ✓ ${href.slice(-30)}`); }
    } catch (e) { console.warn(`  ✗ spotify ${href} — ${e.message}`); }
  }));

  /* og:image via fetch direto */
  console.log(`\nbuscando og:image de ${linkHrefs.size} link(s)…`);
  await Promise.all([...linkHrefs].map(async href => {
    try {
      const r = await fetch(href, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; vida-do-livro-db/1.0)' },
        signal: AbortSignal.timeout(8000),
      });
      const html = await r.text();
      const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
             || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      if (m?.[1]) {
        const imgUrl = m[1].startsWith('http') ? m[1] : new URL(m[1], href).href;
        /* valida que a imagem existe e tem tamanho razoável */
        try {
          const ir = await fetch(imgUrl, { method: 'HEAD', signal: AbortSignal.timeout(5000) });
          const ct = ir.headers.get('content-type') || '';
          const cl = parseInt(ir.headers.get('content-length') || '0', 10);
          if (ir.ok && ct.startsWith('image/') && (cl === 0 || cl > 500)) {
            linkImgs[href] = imgUrl; console.log(`  ✓ ${href} → ${imgUrl.slice(0, 60)}`);
          } else {
            console.log(`  — og:image inválida (${ir.status} ${ct} ${cl}b): ${href}`);
          }
        } catch { console.log(`  — og:image inacessível: ${imgUrl.slice(0, 60)}`); }
      } else { console.log(`  — sem og:image: ${href}`); }
    } catch (e) { console.warn(`  ✗ link ${href} — ${e.message}`); }
  }));

  /* gerar temas-media.js */
  const out2 = [
    '/* vida do livro db — gerado por scripts/sync.js */',
    '/* não editar manualmente — rode: npm run sync */',
    '',
    'window.TEMAS_MEDIA = ' + JSON.stringify({ podcasts: podcastImgs, links: linkImgs }, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(ROOT, 'dados/temas-media.js'), out2, 'utf8');
  const np = Object.keys(podcastImgs).length, nl = Object.keys(linkImgs).length;
  console.log(`\n✓ dados/temas-media.js gerado — ${np} podcast(s), ${nl} link(s)`);
}

/* ── fase 3: conteúdo dos temas via Directus ── */
async function syncTemasConteudo() {
  /* login para acesso às coleções db_* */
  let authHeader = {};
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (email && pass) {
    try {
      const lr = await fetch(DIRECTUS_BASE + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const ld = await lr.json();
      if (ld.data?.access_token) {
        authHeader = { Authorization: 'Bearer ' + ld.data.access_token };
        console.log('\n✓ autenticado no Directus');
      } else {
        console.warn('\n⚠ login falhou, tentando sem autenticação');
      }
    } catch (e) { console.warn('\n⚠ erro no login:', e.message); }
  } else {
    console.log('\n⚠ DIRECTUS_EMAIL/DIRECTUS_PASS não definidos — buscando sem auth');
  }

  const COLS = {
    db_videos:   'videos',
    db_podcasts: 'podcasts',
    db_links:    'links',
    db_textos:   'textos',
    db_artigos:  'artigos',
  };

  const conteudo = {};
  let total = 0;

  for (const [col, chave] of Object.entries(COLS)) {
    const url = `${DIRECTUS_BASE}/items/${col}?limit=1000&sort=id`;
    console.log(`\nbuscando ${col}…`);
    try {
      const r = await fetch(url, { headers: authHeader });
      const d = await r.json();
      if (!r.ok) { console.warn(`  ✗ ${col}: ${JSON.stringify(d.errors?.[0])}`); continue; }
      const items = d.data || [];
      items.forEach(item => {
        if (!item.tema_slug) return;
        if (!conteudo[item.tema_slug]) conteudo[item.tema_slug] = {};
        if (!conteudo[item.tema_slug][chave]) conteudo[item.tema_slug][chave] = [];
        const { id, tema_slug, date_created, user_created, ...rest } = item;
        conteudo[item.tema_slug][chave].push(rest);
      });
      total += items.length;
      console.log(`  ✓ ${items.length} item(s)`);
    } catch (e) { console.warn(`  ✗ ${col}: ${e.message}`); }
  }

  const out = [
    '/* vida do livro db — gerado por scripts/sync.js */',
    '/* não editar manualmente — rode: npm run sync */',
    '',
    'window.TEMAS_CONTEUDO = ' + JSON.stringify(conteudo, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(ROOT, 'dados/temas-conteudo.js'), out, 'utf8');
  console.log(`\n✓ dados/temas-conteudo.js gerado — ${total} item(s) em ${Object.keys(conteudo).length} tema(s)`);
}

run().catch(err => { console.error('\nerro:', err.message); process.exit(1); });
