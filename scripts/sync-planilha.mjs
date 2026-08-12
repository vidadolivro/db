/* Lê a planilha "database vdl" publicada em CSV e gera dois arquivos:
 *
 *   dados/temas-conteudo.js — agrupado por tema e por tipo, do jeito que o
 *                             tema.html sempre consumiu (um item multi-tema
 *                             aparece dentro de cada tema).
 *   dados/inputs.js         — a mesma curadoria como lista plana: uma linha da
 *                             planilha = um objeto, com a lista de temas junto.
 *                             É o que a home de cards usa (cada input vira um
 *                             card com tipo e temas visíveis).
 *
 * Substitui a leitura das coleções db_* do Directus: a curadoria passou a ser
 * feita na planilha. Um item pode servir a até três temas (tema 1/2/3).
 *
 * uso: node scripts/sync-planilha.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/* fileURLToPath e não new URL().pathname: no Linux o pathname começa com "/",
   e removê-lo (necessário no Windows) transformaria o caminho em relativo —
   a raiz sairia errada justamente no runner da CI. */
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PLANILHA = '1k-Ae6UFoCjhlYpq-i0jjy4soE-PkGddo5OC-1VNDAoI';
const ABA = 'inputs';
const CSV = `https://docs.google.com/spreadsheets/d/${PLANILHA}/gviz/tq?tqx=out:csv&sheet=${ABA}`;

/* tipo da planilha -> chave que o tema.html consome */
const BALDE = { video: 'videos', texto: 'textos', link: 'links', podcast: 'podcasts', artigo: 'artigos' };

/* ---------- CSV de verdade: aspas, vírgula e quebra de linha dentro do campo ---------- */
function parseCSV(txt) {
  const linhas = [];
  let campo = '', linha = [], aspas = false;
  txt = txt.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  for (let i = 0; i < txt.length; i++) {
    const c = txt[i];
    if (aspas) {
      if (c === '"') {
        if (txt[i + 1] === '"') { campo += '"'; i++; }
        else aspas = false;
      } else campo += c;
    } else if (c === '"') aspas = true;
    else if (c === ',') { linha.push(campo); campo = ''; }
    else if (c === '\n') { linha.push(campo); linhas.push(linha); linha = []; campo = ''; }
    else campo += c;
  }
  if (campo.length || linha.length) { linha.push(campo); linhas.push(linha); }
  return linhas;
}

const lp = s => String(s || '').replace(/\s+/g, ' ').trim();

function dominio(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
}

/* corta no fim da última palavra inteira antes do limite */
function corta(s, max) {
  s = lp(s);
  if (s.length <= max) return s;
  const fatia = s.slice(0, max);
  const corte = fatia.lastIndexOf(' ');
  return (corte > max * 0.6 ? fatia.slice(0, corte) : fatia).replace(/[,;:.\s]+$/, '') + '…';
}

/* junta duração e ano numa linha só de metadados */
function meta(...partes) {
  return partes.map(lp).filter(Boolean).join(' · ');
}

/* monta o objeto no formato que cada coluna do tema.html espera */
function paraItem(tipo, r) {
  const base = { titulo: r.titulo, href: r.url };
  if (r['adicionado em']) base.date_created = r['adicionado em'];

  switch (tipo) {
    case 'video':
      return { ...base, canal: r.fonte, meta: meta(r['tempo de consumo'], r.data) };
    case 'texto':
      return { ...base, tag: '', autor: r.pessoas, trecho: r.descricao, fonte: r.fonte };
    case 'link':
      return { ...base, tipo: '', domain: r.fonte || dominio(r.url) };
    case 'podcast':
      return { ...base, show: r.fonte, meta: meta(r['tempo de consumo'], r.data) };
    case 'artigo':
      return { ...base, autores: r.pessoas, publicacao: r.fonte, ano: r.data };
    default:
      return base;
  }
}

const resp = await fetch(CSV, { redirect: 'follow' });
if (!resp.ok) {
  console.error(`✗ planilha respondeu ${resp.status}. Ela precisa estar "qualquer pessoa com o link → leitor".`);
  process.exit(1);
}
const linhas = parseCSV(await resp.text());
const cab = linhas.shift().map(lp);
const idx = Object.fromEntries(cab.map((c, i) => [c, i]));

for (const obrig of ['titulo', 'tema 1', 'tipo', 'url']) {
  if (!(obrig in idx)) { console.error(`✗ coluna obrigatória ausente na planilha: "${obrig}"`); process.exit(1); }
}

/* temas válidos: os que existem em dados/temas.js */
const temasSrc = fs.readFileSync(path.join(ROOT, 'dados/temas.js'), 'utf8');
const validos = new Set([...temasSrc.matchAll(/^'([a-z0-9-]+)':\s*\{/gm)].map(m => m[1]));

const conteudo = {};
const inputs = [];
let usados = 0, semTema = 0, tipoInvalido = 0, semUrl = 0;
const desconhecidos = new Map();

for (const l of linhas) {
  const r = Object.fromEntries(cab.map((c, i) => [c, lp(l[i])]));
  if (!r.titulo && !r.url) continue;
  if (!r.url) { semUrl++; continue; }
  if (r.publicar && /^n(ao|ão)$/i.test(r.publicar)) continue;

  const tipo = r.tipo.toLowerCase();
  const balde = BALDE[tipo];
  if (!balde) { tipoInvalido++; continue; }

  const temas = ['tema 1', 'tema 2', 'tema 3']
    .map(c => r[c]).filter(Boolean)
    .filter(t => {
      if (validos.has(t)) return true;
      desconhecidos.set(t, (desconhecidos.get(t) || 0) + 1);
      return false;
    });
  if (!temas.length) { semTema++; continue; }

  const item = paraItem(tipo, r);
  for (const t of temas) {
    conteudo[t] ??= {};
    conteudo[t][balde] ??= [];
    conteudo[t][balde].push(item);
  }

  /* a mesma linha, plana, pro card. Só os campos que o card mostra —
     descrição cortada porque o card exibe no máximo ~5 linhas. */
  inputs.push({
    titulo: r.titulo,
    href: r.url,
    tipo,
    temas,
    fonte: r.fonte || dominio(r.url),
    pessoas: r.pessoas,
    descricao: corta(r.descricao, 300),
    duracao: r['tempo de consumo'],
    data: r.data,
    adicionado: r['adicionado em'],
  });
  usados++;
}

const cabecalho = [
  '/* vida do livro db — gerado por scripts/sync-planilha.mjs */',
  '/* não editar manualmente — a fonte é a planilha "database vdl" */',
  '',
];

fs.writeFileSync(
  path.join(ROOT, 'dados/temas-conteudo.js'),
  [...cabecalho, 'window.TEMAS_CONTEUDO = ' + JSON.stringify(conteudo, null, 2) + ';', ''].join('\n'),
  'utf8',
);

/* um objeto por linha: o arquivo é grande, e diff de uma linha por input
   deixa claro o que a planilha mudou entre um sync e outro. */
fs.writeFileSync(
  path.join(ROOT, 'dados/inputs.js'),
  [
    ...cabecalho,
    'window.INPUTS = [',
    ...inputs.map(i => JSON.stringify(i) + ','),
    '];',
    '',
  ].join('\n'),
  'utf8',
);

const totalItens = Object.values(conteudo)
  .reduce((s, b) => s + Object.values(b).reduce((x, a) => x + a.length, 0), 0);

console.log(`✓ dados/temas-conteudo.js e dados/inputs.js gerados`);
console.log(`  linhas aproveitadas: ${usados}`);
console.log(`  entradas geradas:    ${totalItens} (itens multi-tema contam em cada tema)`);
console.log(`  temas com conteúdo:  ${Object.keys(conteudo).length}`);
if (semUrl) console.log(`  ⚠ ${semUrl} linha(s) sem url`);
if (semTema) console.log(`  ⚠ ${semTema} linha(s) sem tema válido`);
if (tipoInvalido) console.log(`  ⚠ ${tipoInvalido} linha(s) com tipo fora da lista`);
for (const [t, n] of desconhecidos) console.log(`  ⚠ tema inexistente em temas.js: "${t}" (${n}x)`);
