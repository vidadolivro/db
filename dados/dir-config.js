/* vida do livro db — configuração dos diretórios
   Fonte única: rótulos das colunas, filtros e mapeamento de campos.
   Lida por scripts/sync.js, admin.html e diretorio.html.

   Cada diretório aponta para uma coleção no Directus. Os 'campos' definem,
   em ordem, o rótulo mostrado no admin e a coluna de exibição (c1..c4).
   'hrefKey' = campo que guarda o link; 'tags' = usa filtros como etiquetas. */

window.DIR_CONFIG = {
  editoras: {
    collection: 'db_dir_editoras', titulo: 'editoras', num: '01',
    desc: 'editoras brasileiras por segmento editorial',
    filtroLabel: 'segmento',
    filtros: ['todos', 'literatura', 'não-ficção', 'infantil', 'universitária', 'independente'],
    campos: [
      { key: 'c1', label: 'editora' },
      { key: 'c2', label: 'segmento' },
      { key: 'c3', label: 'catálogo / destaque' },
      { key: 'c4', label: 'cidade' },
    ],
    hrefKey: 'href', tags: true,
  },
  agentes: {
    collection: 'db_dir_agentes', titulo: 'agentes literários', num: '02',
    desc: 'agentes e agências literárias atuantes no Brasil',
    filtroLabel: 'atuação',
    filtros: ['todos', 'nacional', 'internacional', 'direitos'],
    campos: [
      { key: 'c1', label: 'nome' },
      { key: 'c2', label: 'agência' },
      { key: 'c3', label: 'perfil' },
      { key: 'c4', label: 'foco' },
    ],
    hrefKey: 'href', tags: true,
  },
  tradutores: {
    collection: 'db_dir_tradutores', titulo: 'tradutores', num: '03',
    desc: 'tradutores literários ativos no mercado brasileiro',
    filtroLabel: 'idioma',
    filtros: ['todos', 'inglês', 'espanhol', 'francês', 'alemão', 'italiano', 'outras'],
    campos: [
      { key: 'c1', label: 'nome' },
      { key: 'c2', label: 'idioma' },
      { key: 'c3', label: 'especialidade' },
      { key: 'c4', label: 'atuação' },
    ],
    hrefKey: 'href', tags: true,
  },
  designers: {
    collection: 'db_dir_designers', titulo: 'designers', num: '04',
    desc: 'designers especializados em livros e editorial',
    filtroLabel: 'especialidade',
    filtros: ['todos', 'capas', 'tipografia', 'diagramação', 'identidade'],
    campos: [
      { key: 'c1', label: 'nome' },
      { key: 'c2', label: 'especialidade' },
      { key: 'c3', label: 'clientes / projetos' },
      { key: 'c4', label: 'base' },
    ],
    hrefKey: 'href', tags: true,
  },
  producao: {
    collection: 'db_dir_producao', titulo: 'produção gráfica', num: '05',
    desc: 'gráficas e fornecedores de produção editorial',
    filtroLabel: 'serviço',
    filtros: ['todos', 'offset', 'digital', 'encadernação', 'acabamento'],
    campos: [
      { key: 'c1', label: 'empresa' },
      { key: 'c2', label: 'serviço' },
      { key: 'c3', label: 'especialidade' },
      { key: 'c4', label: 'localização' },
    ],
    hrefKey: 'href', tags: true,
  },
  veiculos: {
    collection: 'db_dir_veiculos', titulo: 'veículos', num: '06',
    desc: 'publicações e canais de cobertura do mercado editorial',
    filtroLabel: 'formato',
    filtros: ['todos', 'impresso', 'digital', 'audiovisual', 'newsletter'],
    campos: [
      { key: 'c1', label: 'veículo' },
      { key: 'c2', label: 'formato' },
      { key: 'c3', label: 'cobertura' },
      { key: 'c4', label: 'periodicidade' },
    ],
    hrefKey: 'href', tags: true,
  },
  jornalistas: {
    collection: 'db_dir_jornalistas', titulo: 'jornalistas', num: '07',
    desc: 'jornalistas e críticos especializados em literatura e livros',
    filtroLabel: 'veículo',
    filtros: ['todos', 'jornal', 'revista', 'online'],
    campos: [
      { key: 'c1', label: 'nome' },
      { key: 'c2', label: 'veículo' },
      { key: 'c3', label: 'cobertura' },
      { key: 'c4', label: 'base' },
    ],
    hrefKey: 'href', tags: true,
  },
  influencers: {
    collection: 'db_dir_influencers', titulo: 'influencers e creators', num: '08',
    desc: 'criadores de conteúdo sobre livros e leitura',
    filtroLabel: 'plataforma',
    filtros: ['todos', 'instagram', 'youtube', 'tiktok', 'podcast'],
    campos: [
      { key: 'c1', label: 'creator' },
      { key: 'c2', label: 'plataforma' },
      { key: 'c3', label: 'perfil' },
      { key: 'c4', label: 'seguidores aprox.' },
    ],
    hrefKey: 'href', tags: true,
  },
  escolas: {
    collection: 'db_dir_escolas', titulo: 'escolas e cursos', num: '09',
    desc: 'formação em escrita criativa, edição e mercado editorial',
    filtroLabel: 'área',
    filtros: ['todos', 'escrita', 'edição', 'tradução', 'design'],
    campos: [
      { key: 'c1', label: 'instituição' },
      { key: 'c2', label: 'área' },
      { key: 'c3', label: 'formato' },
      { key: 'c4', label: 'cidade' },
    ],
    hrefKey: 'href', tags: true,
  },
  editores: {
    collection: 'db_editores', titulo: 'editores', num: '10',
    desc: 'editores literários — onde atuam e como encontrá-los',
    filtroLabel: 'filtro', filtros: ['todos'],
    campos: [
      { key: 'nome', label: 'nome', col: 'c1' },
      { key: 'onde_atua', label: 'onde atua', col: 'c2' },
    ],
    hrefKey: 'rede', hrefLabel: 'rede', tags: false,
  },
  'listas-mais-vendidos': {
    collection: 'db_listas_mais_vendidos', titulo: 'listas de mais vendidos', num: '11',
    desc: 'rankings de livros mais vendidos ao redor do mundo',
    filtroLabel: 'país', filtros: ['todos'], filtrosFrom: 'c2',
    campos: [
      { key: 'nome', label: 'nome', col: 'c1' },
      { key: 'pais', label: 'país', col: 'c2' },
      { key: 'periodicidade', label: 'periodicidade', col: 'c3' },
    ],
    hrefKey: 'href', hrefLabel: 'url', tags: false,
  },
};
