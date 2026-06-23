/* vida do livro db — metadados dos 22 temas */
/* conteúdo (vídeos, textos, links, podcasts, artigos) vem do Directus via sync */

window.TEMAS = {

'criacao-literaria': {
  num: '01', titulo: 'criação literária',
  intro: 'O processo de criação narrativa — da ideia à estrutura, do personagem ao estilo. Técnicas, referências e a disciplina necessária para transformar intenção em texto.',
  diretorios: [],
},

'agentes-literarios': {
  num: '02', titulo: 'agentes literários',
  intro: 'O agente literário representa o escritor perante editoras, negocia contratos e vende direitos internacionais. No Brasil, o mercado de agenciamento é jovem mas cresce consistentemente — e muda a relação de poder entre autores e editoras.',
  diretorios: [
    { nome: 'agentes literários', href: 'diretorio?tipo=agentes' },
  ],
},

'direitos-editoriais': {
  num: '03', titulo: 'direitos editoriais',
  intro: 'Cessão, sublicenciamento, territórios e prazos — o mercado de direitos move bilhões por ano em feiras como Frankfurt e Bologna. Entender contratos de direito autoral é indispensável para editoras, agentes e autores.',
  diretorios: [],
},

'autor-editora': {
  num: '04', titulo: 'autor e editora',
  intro: 'A relação entre quem escreve e quem publica é ao mesmo tempo criativa e contratual. Como se negocia, o que cada parte espera, e o que raramente está escrito no contrato.',
  diretorios: [],
},

'coordenacao-editorial': {
  num: '05', titulo: 'coordenação editorial',
  intro: 'O coordenador editorial gerencia o percurso do livro desde a submissão até o lançamento. Prazos, autores, revisores, designers e distribuidores passam por ele — é quem mantém o processo em movimento.',
  diretorios: [],
},

'traducao': {
  num: '06', titulo: 'tradução',
  intro: 'Traduzir é reescrever em outra língua sem apagar a voz de quem escreveu. As escolhas invisíveis que fazem um livro existir numa língua que não era a sua — ética, estilo, mercado e ofício.',
  diretorios: [
    { nome: 'tradutores', href: 'diretorio?tipo=tradutores' },
    { nome: 'editoras', href: 'diretorio?tipo=editoras' },
  ],
},

'preparacao-revisao': {
  num: '07', titulo: 'preparação e revisão',
  intro: 'Preparar e revisar um texto é torná-lo legível sem desfazê-lo. O editor de texto navega entre a norma, o estilo do autor e o ritmo da leitura — um trabalho que define a qualidade do livro sem aparecer nele.',
  diretorios: [],
},

'design-grafico': {
  num: '08', titulo: 'design gráfico',
  intro: 'A forma visual do livro é uma interpretação do seu conteúdo. Tipografia, capa e diagramação constroem o contrato visual com o leitor — decidindo o que ele nota antes mesmo de abrir a primeira página.',
  diretorios: [
    { nome: 'designers', href: 'diretorio?tipo=designers' },
  ],
},

'producao-grafica': {
  num: '09', titulo: 'produção gráfica',
  intro: 'Da arte-final à impressora: especificações técnicas, escolha de papel, acabamento e produção industrial. O livro como objeto fabricado — e as decisões que determinam se ele vai durar 10 ou 100 anos.',
  diretorios: [
    { nome: 'produção gráfica', href: 'diretorio?tipo=producao' },
  ],
},

'ebooks': {
  num: '10', titulo: 'e-books',
  intro: 'O e-book como formato, mercado e experiência de leitura. Plataformas, royalties e o leitor de tela — o livro que cabe em todos os dispositivos e que desafia categorias tradicionais de produção e distribuição.',
  diretorios: [],
},

'audiolivros': {
  num: '11', titulo: 'audiolivros',
  intro: 'A escuta como modo de leitura. O mercado de audiobooks no Brasil cresce a dois dígitos ao ano. Narração, produção e as plataformas que disputam os fones de ouvido de uma nova geração de leitores.',
  diretorios: [],
},

'marketing-editorial': {
  num: '12', titulo: 'marketing editorial',
  intro: 'Como livros chegam até leitores. Da campanha de lançamento ao trabalho cotidiano de construção de público — do BookTok ao assessor de imprensa, do ARCs ao algoritmo da Amazon.',
  diretorios: [
    { nome: 'influencers e creators', href: 'diretorio?tipo=influencers' },
  ],
},

'comunicacao-midia': {
  num: '13', titulo: 'comunicação e mídia',
  intro: 'A cobertura jornalística do livro, as resenhas, os suplementos literários e as redes sociais como espaços de mediação cultural. Quem tem autoridade para falar de livros — e como esse mapa está mudando.',
  diretorios: [
    { nome: 'veículos', href: 'diretorio?tipo=veiculos' },
    { nome: 'jornalistas', href: 'diretorio?tipo=jornalistas' },
  ],
},

'distribuicao': {
  num: '14', titulo: 'distribuição',
  intro: 'O livro físico precisa ir da gráfica até a prateleira. Como funcionam distribuidoras, atacadistas, consignação e o custo invisível da logística — o elo da cadeia que mais influencia a margem de lucro das editoras.',
  diretorios: [],
},

'pontos-de-venda': {
  num: '15', titulo: 'pontos de venda',
  intro: 'Livrarias, aeroportos, supermercados, bancas e feiras — onde o livro encontra o leitor. O ponto de venda como espaço cultural, decisão comercial e termômetro do mercado.',
  diretorios: [],
},

'clubes-do-livro': {
  num: '16', titulo: 'clubes do livro',
  intro: 'O clube do livro como curadoria, fidelização e comunidade. Um modelo de negócio que cresce enquanto o varejo físico enfrenta dificuldades — e que redefine a relação entre editora, curador e leitor.',
  diretorios: [],
},

'ter-uma-editora': {
  num: '17', titulo: 'ter uma editora',
  intro: 'Abrir e manter uma editora independente no Brasil. Gestão, catálogo, identidade editorial e sustentabilidade financeira em um mercado concentrado — e por que ainda vale a pena.',
  diretorios: [],
},

'dados-do-mercado': {
  num: '18', titulo: 'dados do mercado',
  intro: 'O que os números revelam sobre o mercado editorial brasileiro. Pesquisas da CBL, relatórios internacionais e as métricas que editoras usam para tomar decisões — e as que ainda faltam.',
  diretorios: [],
},

'autopublicacao': {
  num: '19', titulo: 'autopublicação',
  intro: 'Publicar sem intermediários: do arquivo formatado à distribuição digital. O autor como editor de si mesmo — plataformas, custos, decisões e o que se ganha e se perde ao dispensar a editora.',
  diretorios: [],
},

'literatura-infantil': {
  num: '20', titulo: 'livros infantis',
  intro: 'O livro infantil e juvenil como projeto editorial específico — imagem, texto, formato e o leitor em formação. Da Bologna Book Fair à prateleira da escola, um mercado com lógica, linguagem e valores próprios.',
  diretorios: [],
},

'quadrinhos': {
  num: '21', titulo: 'quadrinhos',
  intro: 'O quadrinho como narrativa visual, mercado editorial e linguagem artística. Da HQ brasileira às graphic novels — um segmento que reconquista espaço nas livrarias e desafia categorias da indústria.',
  diretorios: [],
},

'futuro-tecnologia': {
  num: '22', titulo: 'futuro e tecnologia',
  intro: 'Inteligência artificial, plataformas de streaming, dados e a transformação do livro. O que muda — e o que permanece — quando a tecnologia reescreve as regras do mercado editorial.',
  diretorios: [],
},

};
