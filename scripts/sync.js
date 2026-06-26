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

/* ── carregar config dos diretórios ── */
const dirCfgSrc = fs.readFileSync(path.join(ROOT, 'dados/dir-config.js'), 'utf8');
const fakeDirCfg = {};
new Function('window', dirCfgSrc)(fakeDirCfg); // eslint-disable-line no-new-func
const DIR_CONFIG = fakeDirCfg.DIR_CONFIG || {};

if (!CATS.length) console.log('categorias.js vazio — livros vêm de db_livros, diretórios de db_*.');

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
    const macro    = item.macrotema || SLUG_TO_MACRO[temaSlug] || null;
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
          isbn:      item.isbn           || '',
          titulo:    item.titulo,
          autor:     item._autor         || normAutor(item.autor) || '',
          editora:   item._editora       || item.editora          || '',
          ano:       item._ano           || '',
          capa:      item._capa          || '',
          macrotema: macro,
          temas:     temaSlug ? [temaSlug] : [],
          href:      item.href           || '#',
          _date:     item.date_created   || '',
        });
      } else if (temaSlug) {
        const l = livros[isbnIndex[key]];
        if (!l.temas.includes(temaSlug)) l.temas.push(temaSlug);
        if (macro && !l.macrotema) l.macrotema = macro;
      }
    }
  });

  /* resolver capas faltantes/instáveis antes de gerar */
  await resolveCapas(livros);

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

  await syncDbDiretorios();
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
    const items = d.data || [];

    /* enriquecer com capa_url e dados da coleção biblioteca */
    const isbns = [...new Set(items.map(i => i.isbn).filter(Boolean))];
    if (isbns.length) {
      const br = await fetch(
        DIRECTUS_BASE + '/items/biblioteca?filter[isbn][_in]=' + encodeURIComponent(isbns.join(',')) +
        '&fields=isbn,titulo,capa_url,autor,editora,data_publicacao&limit=' + (isbns.length + 5)
      );
      const bd = await br.json();
      const bibMap = {};
      (bd.data || []).forEach(b => { bibMap[b.isbn] = b; });
      items.forEach(item => {
        const bib = bibMap[item.isbn];
        if (bib) {
          item.titulo   = item.titulo  || bib.titulo                   || '';
          item._capa    = bib.capa_url || '';
          item._autor   = item.autor   || normAutor(bib.autor)         || '';
          item._editora = item.editora || bib.editora                  || '';
          item._ano     = normAno(bib.data_publicacao) || '';
        }
      });
    }

    return items;
  } catch { return []; }
}

/* decodifica entidades HTML (nomeadas comuns + numéricas decimais/hex) */
const HTML_ENTITIES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ',
  aacute: 'á', agrave: 'à', acirc: 'â', atilde: 'ã', auml: 'ä',
  eacute: 'é', egrave: 'è', ecirc: 'ê', euml: 'ë',
  iacute: 'í', icirc: 'î', oacute: 'ó', ograve: 'ò', ocirc: 'ô', otilde: 'õ', ouml: 'ö',
  uacute: 'ú', ucirc: 'û', uuml: 'ü', ccedil: 'ç', ntilde: 'ñ',
  Aacute: 'Á', Agrave: 'À', Acirc: 'Â', Atilde: 'Ã',
  Eacute: 'É', Ecirc: 'Ê', Iacute: 'Í', Oacute: 'Ó', Ocirc: 'Ô', Otilde: 'Õ',
  Uacute: 'Ú', Ccedil: 'Ç',
  ndash: '–', mdash: '—', hellip: '…', laquo: '«', raquo: '»',
  lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', sbquo: '‚', bdquo: '„', deg: '°',
};
function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, code) => {
    if (code[0] === '#') {
      const n = code[1] === 'x' || code[1] === 'X' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return isNaN(n) ? m : String.fromCodePoint(n);
    }
    return HTML_ENTITIES[code] != null ? HTML_ENTITIES[code] : m;
  });
}

/* extrai og:description ou meta description de uma URL (para textos sem trecho) */
async function fetchDescricao(url) {
  if (!url || url === '#') return '';
  try {
    const r = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; vida-do-livro-sync/1.0)' },
    });
    if (!r.ok) return '';
    /* detectar charset: header Content-Type → <meta charset> → utf-8 */
    const buf = Buffer.from(await r.arrayBuffer());
    let charset = (r.headers.get('content-type') || '').match(/charset=([\w-]+)/i)?.[1];
    if (!charset) {
      const head = buf.toString('latin1', 0, 2048);
      charset = head.match(/<meta[^>]+charset=["']?([\w-]+)/i)?.[1]
             || head.match(/charset=([\w-]+)/i)?.[1];
    }
    charset = (charset || 'utf-8').toLowerCase();
    if (charset === 'iso-8859-1' || charset === 'latin1' || charset === 'windows-1252') charset = 'latin1';
    const html = buf.toString(charset === 'latin1' ? 'latin1' : 'utf-8');

    const og = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']{10,})/i)
            || html.match(/<meta[^>]+content=["']([^"']{10,})["'][^>]+property=["']og:description["']/i)
            || html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{10,})/i)
            || html.match(/<meta[^>]+content=["']([^"']{10,})["'][^>]+name=["']description["']/i);
    return og ? decodeEntities(og[1]).replace(/\s+/g, ' ').trim().slice(0, 300) : '';
  } catch { return ''; }
}

/* valida ISBN-13 (prefixo 978/979 + checksum) ou ISBN-10 (checksum) — evita lixo como 0000000000000 */
function isbnValido(raw) {
  const s = String(raw || '').replace(/[^0-9Xx]/g, '').toUpperCase();
  if (s.length === 13) {
    if (!/^97[89]\d{10}$/.test(s)) return false;
    let sum = 0;
    for (let i = 0; i < 13; i++) sum += (+s[i]) * (i % 2 ? 3 : 1);
    return sum % 10 === 0;
  }
  if (s.length === 10) {
    if (/^(.)\1{9}$/.test(s)) return false; // todos iguais
    let sum = 0;
    for (let i = 0; i < 10; i++) {
      const c = s[i] === 'X' ? 10 : +s[i];
      if (isNaN(c)) return false;
      sum += c * (10 - i);
    }
    return sum % 11 === 0;
  }
  return false;
}

/* ── resolve capas: troca capas vazias ou instáveis (metabooks) pela do Open Library ── */
async function resolveCapas(livros) {
  const candidatos = livros.filter(l => isbnValido(l.isbn) && (!l.capa || l.capa.includes('metabooks.com')));
  if (!candidatos.length) return;
  console.log(`\nresolvendo capa de ${candidatos.length} livro(s) via Open Library…`);
  await Promise.all(candidatos.map(async l => {
    const isbn = String(l.isbn).replace(/[^0-9Xx]/g, '');
    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    try {
      /* default=false → 404 se não houver capa (em vez de devolver imagem em branco) */
      const r = await fetch(url + '?default=false', { redirect: 'follow', signal: AbortSignal.timeout(8000) });
      const ct = r.headers.get('content-type') || '';
      const cl = parseInt(r.headers.get('content-length') || '0', 10);
      if (r.ok && ct.startsWith('image/') && (cl === 0 || cl > 1000)) {
        l.capa = url;
        console.log(`  ✓ ${l.titulo} → Open Library`);
      } else {
        console.log(`  — sem capa no Open Library: ${l.titulo} (mantém atual)`);
      }
    } catch (e) {
      console.warn(`  ✗ ${l.titulo} — ${e.message} (mantém atual)`);
    }
  }));
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
      /* para db_textos sem trecho, busca og:description do URL */
      if (col === 'db_textos') {
        for (const item of items) {
          if (!item.trecho && item.href) {
            item.trecho = await fetchDescricao(item.href);
            if (item.trecho) console.log(`  trecho auto: ${item.href.slice(0, 60)}…`);
          }
        }
      }
      items.forEach(item => {
        if (!item.tema_slug) return;
        if (!conteudo[item.tema_slug]) conteudo[item.tema_slug] = {};
        if (!conteudo[item.tema_slug][chave]) conteudo[item.tema_slug][chave] = [];
        const { id, tema_slug, user_created, ...rest } = item; // mantém date_created p/ ordenar "recentes"
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

async function syncDbDiretorios() {
  let authHeader = {};
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (email && pass) {
    try {
      const lr = await fetch(DIRECTUS_BASE + '/auth/login', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass }),
      });
      const ld = await lr.json();
      if (ld.data?.access_token) authHeader = { Authorization: 'Bearer ' + ld.data.access_token };
    } catch { /* silencioso */ }
  }

  const DB_DIRS = {};

  for (const [key, cfg] of Object.entries(DIR_CONFIG)) {
    try {
      const r = await fetch(DIRECTUS_BASE + '/items/' + cfg.collection + '?limit=1000&sort=id', { headers: authHeader });
      const d = await r.json();
      if (!r.ok) { console.warn(`  ✗ ${cfg.collection}: ${JSON.stringify(d.errors?.[0]?.message || d.errors?.[0])}`); continue; }
      const items = d.data || [];
      if (!items.length) continue;

      /* mapeia cada item para colunas de exibição c1..c4 conforme a config */
      const data = items.map(it => {
        const row = { c1: '', c2: '', c3: '', c4: '', tags: [], href: '' };
        cfg.campos.forEach(campo => {
          const col = campo.col || campo.key;           // c1..c4 de destino
          row[col] = it[campo.key] != null ? String(it[campo.key]) : '';
        });
        row.href = (cfg.hrefKey && it[cfg.hrefKey]) ? it[cfg.hrefKey] : '';
        if (cfg.tags) row.tags = Array.isArray(it.tags) ? it.tags : [];
        else if (cfg.filtrosFrom) { const v = row[cfg.filtrosFrom]; if (v) row.tags = [v]; }
        return row;
      });

      /* filtros: estáticos da config, ou derivados de uma coluna (ex: país) */
      let filtros = cfg.filtros || ['todos'];
      if (cfg.filtrosFrom) {
        const vals = [...new Set(data.map(r => r[cfg.filtrosFrom]).filter(Boolean))].sort();
        filtros = ['todos', ...vals];
      }

      /* ordena por c1 (nome) para exibição estável */
      data.sort((a, b) => (a.c1 || '').localeCompare(b.c1 || '', 'pt'));

      DB_DIRS[key] = {
        titulo: cfg.titulo,
        num: cfg.num,
        desc: cfg.desc,
        filtroLabel: cfg.filtroLabel,
        filtros,
        cols: cfg.campos.map(c => c.label),
        data,
      };
      console.log(`  ✓ ${cfg.collection}: ${items.length} entrada(s)`);
    } catch (e) { console.warn(`  ✗ ${cfg.collection}:`, e.message); }
  }

  const out = [
    '/* vida do livro db — gerado por scripts/sync.js */',
    '/* não editar manualmente — rode: npm run sync */',
    '',
    'window.DB_DIRS = ' + JSON.stringify(DB_DIRS, null, 2) + ';',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(ROOT, 'dados/db-dirs.js'), out, 'utf8');
  console.log(`\n✓ dados/db-dirs.js gerado — ${Object.keys(DB_DIRS).length} diretório(s)`);
}

run().catch(err => { console.error('\nerro:', err.message); process.exit(1); });
