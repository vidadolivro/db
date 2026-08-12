/* Edita células da planilha "database vdl" pela API do Sheets.
 *
 * Toda edição é condicional: o script lê a célula antes e só grava se ela
 * ainda contiver exatamente o texto esperado. Se alguém mexeu à mão no meio
 * do caminho, aquela linha é pulada e reportada — nada é sobrescrito às cegas.
 *
 *   node scripts/planilha-editar.mjs correcoes.json           → mostra o que faria
 *   node scripts/planilha-editar.mjs correcoes.json --gravar  → grava
 *
 * O arquivo de edições é uma lista de { linha, coluna, de, para }, onde coluna
 * é o nome do cabeçalho na planilha ("titulo", "pessoas", …).
 */
import fs from 'node:fs';
import { tokenDeAcesso } from './google-auth.mjs';

const PLANILHA = '1k-Ae6UFoCjhlYpq-i0jjy4soE-PkGddo5OC-1VNDAoI';
const ABA = 'inputs';
const API = 'https://sheets.googleapis.com/v4/spreadsheets/' + PLANILHA;

const lp = s => String(s ?? '').replace(/\s+/g, ' ').trim();
const letra = n => { let s = ''; n++; while (n > 0) { const r = (n - 1) % 26; s = String.fromCharCode(65 + r) + s; n = Math.floor((n - 1) / 26); } return s; };

async function api(caminho, opcoes = {}) {
  const r = await fetch(API + caminho, {
    ...opcoes,
    headers: { authorization: 'Bearer ' + await tokenDeAcesso(), 'content-type': 'application/json', ...(opcoes.headers || {}) },
  });
  const j = await r.json();
  if (!r.ok) throw new Error('sheets ' + r.status + ': ' + JSON.stringify(j.error?.message || j));
  return j;
}

const arquivo = process.argv[2];
const gravar = process.argv.includes('--gravar');
if (!arquivo) { console.error('uso: node scripts/planilha-editar.mjs <edicoes.json> [--gravar]'); process.exit(1); }
const edicoes = JSON.parse(fs.readFileSync(arquivo, 'utf8'));

/* cabeçalho → índice de coluna */
const cab = (await api(`/values/${ABA}!1:1`)).values[0].map(lp);
const idx = Object.fromEntries(cab.map((c, i) => [c, i]));
for (const e of edicoes) {
  if (!(e.coluna in idx)) { console.error(`✗ coluna "${e.coluna}" não existe na planilha`); process.exit(1); }
}

/* lê todas as células alvo de uma vez */
const enderecos = edicoes.map(e => `${ABA}!${letra(idx[e.coluna])}${e.linha}`);
const atual = await api('/values:batchGet?' + enderecos.map(r => 'ranges=' + encodeURIComponent(r)).join('&') + '&majorDimension=ROWS');

const gravaveis = [], puladas = [];
edicoes.forEach((e, i) => {
  const valor = lp(atual.valueRanges[i].values?.[0]?.[0]);
  if (valor !== lp(e.de)) { puladas.push({ ...e, encontrado: valor }); return; }
  gravaveis.push({ range: enderecos[i], values: [[e.para]], _e: e });
});

console.log(`${gravaveis.length} para gravar · ${puladas.length} puladas\n`);
gravaveis.forEach(g => {
  console.log(`  ${g.range}`);
  console.log(`    de   "${g._e.de.slice(0, 78)}"`);
  console.log(`    para "${String(g._e.para).slice(0, 78) || '(vazio)'}"`);
});
if (puladas.length) {
  console.log('\npuladas — a célula não tem o texto que eu esperava:');
  puladas.forEach(p => console.log(`  linha ${p.linha} (${p.coluna}): encontrei "${p.encontrado.slice(0, 60)}"`));
}

if (!gravar) { console.log('\n— teste, nada foi gravado. Rode de novo com --gravar para valer.'); process.exit(0); }
if (!gravaveis.length) { console.log('\nnada a fazer.'); process.exit(0); }

const r = await api('/values:batchUpdate', {
  method: 'POST',
  body: JSON.stringify({
    valueInputOption: 'RAW',   /* RAW: o texto entra como está, sem o Sheets interpretar fórmula ou data */
    data: gravaveis.map(({ range, values }) => ({ range, values })),
  }),
});
console.log(`\n✓ ${r.totalUpdatedCells} células gravadas`);
