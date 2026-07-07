# -*- coding: utf-8 -*-
"""Lê a planilha de editoras e escreve um JSON pronto para importar.
   (A importação em si é feita por scripts/import-editoras.mjs, em Node,
    porque o SSL do Python nesta máquina está com CA expirada.)
   Uso: python scripts/import-editoras.py <caminho.xlsx> <saida.json>
"""
import json, sys
import openpyxl

XLSX = sys.argv[1] if len(sys.argv) > 1 else r'C:\Users\dlame\Downloads\Editoras.xlsx'
OUT  = sys.argv[2] if len(sys.argv) > 2 else 'editoras.json'

wb = openpyxl.load_workbook(XLSX, data_only=True)
ws = wb.active
rows = [r for r in ws.iter_rows(values_only=True)]

def clean(v): return ('' if v is None else str(v)).strip()
def norm_site(s):
    s = clean(s)
    if s and not s.startswith('http'): s = 'https://' + s
    return s

data = []
for r in rows[1:]:
    editora = clean(r[2])
    if not editora: continue
    cat = clean(r[0]).lower()
    data.append({
        'c1': editora,
        'c2': cat,
        'c3': clean(r[1]),
        'c4': clean(r[4]),
        'selo': clean(r[3]),
        'instagram': clean(r[5]),
        'href': norm_site(r[6]),
        'tags': [cat] if cat else [],
    })

with open(OUT, 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=0)

cats = sorted(set(d['c2'] for d in data))
print(f'{len(data)} editoras/selos -> {OUT}')
print('categorias:', cats)
