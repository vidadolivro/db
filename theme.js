/* vida do livro db — modo noturno (compartilhado)
   Aplica o tema salvo (ou a preferência do sistema) ANTES de renderizar,
   e injeta um botão flutuante pra alternar. Lembra a escolha (localStorage). */
(function () {
  function escolhaSalva() {
    try { return localStorage.getItem('vdl-tema'); } catch (e) { return null; }
  }

  function preferido() {
    var salvo = escolhaSalva();
    if (salvo === 'dark' || salvo === 'light') return salvo;
    try {
      if (window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    } catch (e) {}
    return 'light';
  }

  function aplicar(t) { document.documentElement.setAttribute('data-theme', t); }

  /* aplica imediatamente (script no <head>, síncrono → sem flash) */
  aplicar(preferido());

  function icone(t) { return t === 'dark' ? '☀' : '☾'; }

  function montarBotao() {
    if (document.querySelector('.theme-toggle')) return;
    var btn = document.createElement('button');
    btn.className = 'theme-toggle';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'alternar modo noturno');
    btn.title = 'modo noturno';
    btn.textContent = icone(document.documentElement.getAttribute('data-theme'));
    btn.addEventListener('click', function () {
      var atual = document.documentElement.getAttribute('data-theme');
      var novo = atual === 'dark' ? 'light' : 'dark';
      aplicar(novo);
      try { localStorage.setItem('vdl-tema', novo); } catch (e) {}
      btn.textContent = icone(novo);
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', montarBotao);
  } else {
    montarBotao();
  }

  /* segue a preferência do sistema em tempo real — só enquanto o usuário não escolher manualmente */
  try {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (escolhaSalva()) return;
      var novo = e.matches ? 'dark' : 'light';
      aplicar(novo);
      var btn = document.querySelector('.theme-toggle');
      if (btn) btn.textContent = icone(novo);
    });
  } catch (e) {}

  /* sincroniza entre abas abertas do site */
  window.addEventListener('storage', function (e) {
    if (e.key !== 'vdl-tema' || !e.newValue) return;
    aplicar(e.newValue);
    var btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = icone(e.newValue);
  });
})();
