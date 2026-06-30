#!/usr/bin/env node
/* vida do livro db — lista os usuários do Directus e seus papéis
   Mostra quem é Administrador e quem é colaborador.

   Uso:
     DIRECTUS_EMAIL=seu@email DIRECTUS_PASS=suasenha node scripts/list-users.js
*/

'use strict';

const DIRECTUS = 'https://directus-production-afdd.up.railway.app';

async function run() {
  const email = process.env.DIRECTUS_EMAIL, pass = process.env.DIRECTUS_PASS;
  if (!email || !pass) { console.error('Uso: DIRECTUS_EMAIL=xxx DIRECTUS_PASS=xxx node scripts/list-users.js'); process.exit(1); }

  const lr = await fetch(DIRECTUS + '/auth/login', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: pass }),
  });
  const auth = await lr.json();
  if (!auth.data?.access_token) { console.error('Login falhou:', auth); process.exit(1); }
  const token = auth.data.access_token;

  const r = await fetch(DIRECTUS + '/users?fields=email,first_name,last_name,status,role.name,role.admin_access&limit=200', {
    headers: { Authorization: 'Bearer ' + token },
  });
  const d = await r.json();
  if (!r.ok) { console.error('Erro:', JSON.stringify(d.errors?.[0] || d)); process.exit(1); }

  const users = d.data || [];
  console.log(`\n${users.length} usuário(s) no Directus:\n`);
  users.forEach(u => {
    const nome = [u.first_name, u.last_name].filter(Boolean).join(' ') || '(sem nome)';
    const papel = u.role?.name || '(sem papel)';
    const admin = u.role?.admin_access ? '  ⭐ ADMIN' : '';
    console.log(`  • ${nome}  <${u.email}>  —  ${papel}  [${u.status}]${admin}`);
  });
  console.log('');
}

run().catch(e => { console.error('\nerro:', e.message); process.exit(1); });
