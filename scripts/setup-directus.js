#!/usr/bin/env node
/* vida do livro db — setup único das coleções no Directus
   Uso: DIRECTUS_EMAIL=seu@email DIRECTUS_PASS=senha node scripts/setup-directus.js */

'use strict';
const DIRECTUS = 'https://directus-production-afdd.up.railway.app';

async function api(token, method, path, body) {
  const r = await fetch(DIRECTUS + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  const d = await r.json();
  if (!r.ok) throw new Error(`${method} ${path} → ${r.status}: ${JSON.stringify(d.errors?.[0])}`);
  return d.data;
}

async function run() {
  const email = process.env.DIRECTUS_EMAIL;
  const pass  = process.env.DIRECTUS_PASS;
  if (!email || !pass) {
    console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/setup-directus.js');
    process.exit(1);
  }

  /* ── login ── */
  console.log('Fazendo login…');
  const r = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await r.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;
  console.log('✓ logado\n');

  /* ── coleções ── */
  const COLECOES = [
    {
      collection: 'db_videos',
      meta: { icon: 'videocam', note: 'vida do livro db — vídeos por tema' },
      fields: [
        pk(),
        str('tema_slug',  { required: true, note: 'slug do tema (ex: traducao)' }),
        str('titulo',     { required: true }),
        str('canal',      {}),
        str('href',       { required: true, note: 'URL do YouTube ou outro' }),
        str('meta',       { note: 'ex: 1h15min · 2024' }),
        dateCriado(), userCriado(),
      ],
    },
    {
      collection: 'db_podcasts',
      meta: { icon: 'headphones', note: 'vida do livro db — podcasts por tema' },
      fields: [
        pk(),
        str('tema_slug',  { required: true }),
        sel('subtipo',    ['episodio', 'show'], { required: true, note: 'episódio ou podcast inteiro' }),
        str('show',       { required: true, note: 'nome do podcast' }),
        str('titulo',     { note: 'título do episódio (se subtipo = episodio)' }),
        str('href',       { required: true }),
        str('meta',       { note: 'ex: 45min · 2023' }),
        dateCriado(), userCriado(),
      ],
    },
    {
      collection: 'db_links',
      meta: { icon: 'link', note: 'vida do livro db — links por tema' },
      fields: [
        pk(),
        str('tema_slug',  { required: true }),
        str('titulo',     { required: true }),
        str('href',       { required: true }),
        str('domain',     { note: 'ex: publishnews.com.br' }),
        sel('tipo',       ['newsletter', 'blog', 'ferramenta', 'evento', 'outro'], {}),
        dateCriado(), userCriado(),
      ],
    },
    {
      collection: 'db_textos',
      meta: { icon: 'article', note: 'vida do livro db — textos por tema' },
      fields: [
        pk(),
        str('tema_slug',  { required: true }),
        str('titulo',     { required: true }),
        sel('tag',        ['análise', 'reportagem', 'ensaio', 'entrevista', 'resenha'], { required: true }),
        str('href',       { required: true }),
        txt('trecho',     { note: 'trecho representativo (opcional)' }),
        str('fonte',      { note: 'ex: Piauí · nov 2023' }),
        dateCriado(), userCriado(),
      ],
    },
    {
      collection: 'db_artigos',
      meta: { icon: 'school', note: 'vida do livro db — artigos acadêmicos por tema' },
      fields: [
        pk(),
        str('tema_slug',  { required: true }),
        str('titulo',     { required: true }),
        str('autores',    { required: true }),
        str('publicacao', { note: 'revista / anais / repositório' }),
        str('ano',        {}),
        str('href',       { required: true, note: 'URL ou DOI' }),
        dateCriado(), userCriado(),
      ],
    },
  ];

  for (const col of COLECOES) {
    process.stdout.write(`Criando ${col.collection}… `);
    try {
      await api(token, 'POST', '/collections', col);
      console.log('✓');
    } catch (e) {
      if (e.message.includes('already exists') || e.message.includes('1050')) {
        console.log('já existe, pulando');
      } else {
        console.error('ERRO:', e.message);
      }
    }
  }

  /* ── role colaborador (Directus v11: role → policy → permissions) ── */
  console.log('\nCriando role db_colaborador…');
  let roleId;
  try {
    const roles = await api(token, 'GET', '/roles?filter[name][_eq]=db_colaborador');
    if (roles.length) {
      roleId = roles[0].id;
      console.log('role já existe:', roleId);
    } else {
      const role = await api(token, 'POST', '/roles', { name: 'db_colaborador', icon: 'edit', description: 'Colaboradores vida do livro db' });
      roleId = role.id;
      console.log('✓ role criado:', roleId);
    }
  } catch(e) { console.error('erro ao criar role:', e.message); }

  /* ── policy (v11 exige policy antes das permissions) ── */
  let policyId;
  if (roleId) {
    console.log('\nCriando policy db_colaborador…');
    try {
      const policies = await api(token, 'GET', '/policies?filter[name][_eq]=db_colaborador');
      if (policies.length) {
        policyId = policies[0].id;
        console.log('policy já existe:', policyId);
      } else {
        const policy = await api(token, 'POST', '/policies', { name: 'db_colaborador', icon: 'edit', description: 'Permissões dos colaboradores vida do livro db' });
        policyId = policy.id;
        console.log('✓ policy criada:', policyId);
      }
      /* associa policy ao role via /access (Directus v11) */
      try {
        await api(token, 'POST', '/access', { role: roleId, policy: policyId });
        console.log('✓ policy associada ao role via /access');
      } catch(e2) {
        /* fallback: PATCH role com array de policies */
        const roleData = await api(token, 'GET', `/roles/${roleId}`);
        const policies = [...(roleData.policies || []), policyId];
        await api(token, 'PATCH', `/roles/${roleId}`, { policies });
        console.log('✓ policy associada ao role via PATCH');
      }
    } catch(e) {
      if (!e.message.includes('already') && !e.message.includes('unique')) {
        console.error('erro ao criar policy:', e.message);
      } else {
        console.log('associação já existe');
      }
    }
  }

  /* ── permissões via policy ── */
  if (policyId) {
    console.log('\nConfigurando permissões…');
    for (const col of COLECOES) {
      for (const action of ['create', 'read']) {
        try {
          await api(token, 'POST', '/permissions', {
            policy: policyId,
            collection: col.collection,
            action,
            fields: ['*'],
          });
          console.log(`  ✓ ${col.collection} — ${action}`);
        } catch(e) {
          if (e.message.includes('unique') || e.message.includes('already')) {
            console.log(`  — ${col.collection} ${action}: já existe`);
          } else {
            console.error(`  ✗ ${col.collection} ${action}:`, e.message);
          }
        }
      }
    }
  }

  console.log('\n✓ setup concluído');
  console.log('Role ID para novos usuários colaboradores:', roleId);
}

/* ── helpers de campo ── */
function pk() {
  return { field: 'id', type: 'integer', meta: { hidden: true, readonly: true, interface: 'input' }, schema: { is_primary_key: true, has_auto_increment: true } };
}
function str(field, { required = false, note } = {}) {
  return { field, type: 'string', meta: { interface: 'input', required: required || false, note: note || null } };
}
function txt(field, { note } = {}) {
  return { field, type: 'text', meta: { interface: 'input-multiline', note: note || null } };
}
function sel(field, values, { required = false, note } = {}) {
  return {
    field, type: 'string',
    meta: {
      interface: 'select-dropdown',
      required: required || false,
      note: note || null,
      options: { choices: values.map(v => ({ text: v, value: v })) },
    },
  };
}
function dateCriado() {
  return { field: 'date_created', type: 'timestamp', meta: { special: ['date-created'], interface: 'datetime', readonly: true, hidden: true } };
}
function userCriado() {
  return { field: 'user_created', type: 'uuid', meta: { special: ['user-created'], interface: 'select-dropdown-m2o', readonly: true, hidden: true }, schema: { is_nullable: true } };
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
