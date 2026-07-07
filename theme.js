/* vida do livro db — modo noturno (compartilhado)
   Aplica o tema salvo (ou a preferência do sistema) ANTES de renderizar,
   e injeta um botão flutuante pra alternar. Lembra a escolha (localStorage). */
(function () {
  function preferido() {
    try {
      var salvo = localStorage.getItem('vdl-tema');
      if (salvo === 'dark' || salvo === 'light') return salvo;
    } catch (e) {}
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
})();
