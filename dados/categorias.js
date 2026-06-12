/* vida do livro db — categorias
   Cada entrada mapeia um livro a macrotema + temas do site.
   Se o livro NÃO existe no Directus, adicionar: titulo, autor, editora, ano.
   Se existe, só isbn + macrotema + temas. */

window.CATEGORIAS = [

  /* ── HISTÓRIA ── */
  { isbn: '9788535938340', macrotema: 'historia', temas: ['mercado-editorial', 'edicao'] },        // Boemia literária e revolução — Darnton
  { isbn: '9786559213924', macrotema: 'historia', temas: ['mercado-editorial'] },                  // Como organizar uma biblioteca — Calasso

  /* ── EXPERIÊNCIAS ── */
  { isbn: '9786598244309', macrotema: 'experiencias', temas: ['criacao-literaria'] },              // Arte e medo — Bayles & Orland
  { isbn: '9786598244378', macrotema: 'experiencias', temas: ['criacao-literaria'] },              // Como ser artista — Saltz
  { isbn: '9786583239112', macrotema: 'experiencias', temas: ['criacao-literaria'] },              // O mundo precisa da sua arte — McNee

  /* ── ESCRITA ── */
  { isbn: '9786598244316', macrotema: 'escrita', temas: ['criacao-literaria'] },                   // Anatomia da história — Truby
  { isbn: '9786598244361', macrotema: 'escrita', temas: ['criacao-literaria'] },                   // Como criar histórias — Le Guin
  { isbn: '9786583239013', macrotema: 'escrita', temas: ['criacao-literaria'] },                   // A Jornada do Escritor — Vogler
  { isbn: '9786555645415', macrotema: 'escrita', temas: ['criacao-literaria'] },                   // Palavra por palavra — Lamott

  /* ── DESIGN & TÉCNICO ── */
  { isbn: '9788592886608', macrotema: 'design', temas: ['design-grafico'] },                       // Elementos do estilo tipográfico — Bringhurst
  { isbn: '9786560920026', macrotema: 'design', temas: ['design-grafico'] },                       // Pensar com tipos — Lupton
  { isbn: '9786588280706', macrotema: 'design', temas: ['design-grafico'] },                       // Extra Bold — Lupton
  { isbn: '9788578276935', macrotema: 'design', temas: ['design-grafico'] },                       // O detalhe na tipografia — Hochuli

  /* ── TRADUÇÃO (macrotema null = não aparece em livros.html, só em tema?slug=traducao) ── */
  { isbn: '9786557110249', macrotema: null, temas: ['traducao'] },                                 // A invisibilidade do tradutor — Venuti

];
