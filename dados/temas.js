/* vida do livro db — conteúdo dos 22 temas */

window.TEMAS = {

'criacao-literaria': {
  num: '01', titulo: 'criação literária',
  intro: 'O processo de criação narrativa — da ideia à estrutura, do personagem ao estilo. Técnicas, referências e a disciplina necessária para transformar intenção em texto.',
  diretorios: [],
  videos: [
    { titulo: 'Ursula K. Le Guin — A responsabilidade do escritor com o leitor', canal: 'FLiP Arquivos', meta: '2016 · 48min', href: '#' },
    { titulo: 'Como construir um enredo que sustenta — estrutura narrativa na prática', canal: 'Oficina da Palavra', meta: '2023 · 1h22min', href: '#' },
  ],
  textos: [
    { tag: 'ensaio', titulo: 'A disciplina da ficção: sobre o que separa escritores de aspirantes', trecho: '"Escrever é uma prática. Não um talento que você tem ou não tem — é uma habilidade que você desenvolve pela repetição deliberada, pela leitura atenta e pela disposição de rascunhar mal."', fonte: 'Quatro Cinco Um · jan 2023', href: '#' },
    { tag: 'entrevista', titulo: 'Milton Hatoum: "O romance brasileiro ainda não disse tudo que tem a dizer"', trecho: 'Conversa sobre os processos de pesquisa, o papel da memória na ficção e a relação entre lugar e narrativa na obra de um dos maiores escritores contemporâneos do Brasil.', fonte: 'Piauí · set 2022', href: '#' },
    { tag: 'artigo', titulo: 'Personagem como destino — o que faz uma figura de ficção ser inesquecível', trecho: '"Um personagem não é um ser humano. É uma construção cujos detalhes foram escolhidos para criar a ilusão de necessidade — a sensação de que ele não poderia ser diferente."', fonte: 'Rascunho · mar 2023', href: '#' },
  ],
  links: [
    { titulo: '→ Escola São Paulo de Escrita Criativa', domain: 'escolasaopaulo.com.br', tipo: 'curso', href: '#' },
    { titulo: '→ Oficina de Criação Literária — SESC', domain: 'sesc.com.br', tipo: 'curso', href: '#' },
    { titulo: '→ The Rumpus — essays on writing', domain: 'therumpus.net', tipo: '', href: '#' },
    { titulo: '→ Lithub — The Craft of Fiction', domain: 'lithub.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ Fundação Nacional do Livro Infantil e Juvenil', domain: 'fnlij.org.br', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Palavra Puxa Palavra', titulo: 'ep. 34 — Estrutura narrativa: por que algumas histórias funcionam e outras não', meta: '58min · 2023', href: '#' },
    { show: 'Leituras do Fim do Mundo', titulo: 'ep. 12 — O mito do talento e a ética do esforço na escrita literária', meta: '1h04min · 2024', href: '#' },
  ],
},

'agentes-literarios': {
  num: '02', titulo: 'agentes literários',
  intro: 'O agente literário representa o escritor perante editoras, negocia contratos e vende direitos internacionais. No Brasil, o mercado de agenciamento é jovem mas cresce consistentemente — e muda a relação de poder entre autores e editoras.',
  diretorios: [
    { nome: 'agentes literários', href: 'diretorio?tipo=agentes' },
  ],
  videos: [
    { titulo: 'Como funciona uma agência literária — bastidores da representação no Brasil', canal: 'Fósforo Editora', meta: '2023 · 44min', href: '#' },
    { titulo: 'Direitos internacionais: como um livro brasileiro chega ao exterior', canal: 'CBL Talks', meta: '2022 · 1h10min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'A ascensão do agente literário no Brasil', trecho: '"Até dez anos atrás, a maioria dos escritores brasileiros negociava contratos sem representação. Hoje, os maiores nomes do mercado têm agentes — e as editoras já esperam isso."', fonte: 'Folha de S. Paulo · out 2023', href: '#' },
    { tag: 'guia', titulo: 'O que esperar de um agente: deveres, honorários e a natureza do contrato', trecho: 'Tudo que um escritor precisa saber antes de assinar com uma agência — do percentual padrão (15% no Brasil, 10% com editoras nacionais) ao que acontece quando a relação termina.', fonte: 'Publishnews · fev 2024', href: '#' },
    { tag: 'entrevista', titulo: 'Lucia Riff: "O Brasil ainda subestima o potencial de exportação de sua literatura"', trecho: 'A agente que representa nomes como Chico Buarque e Milton Hatoum fala sobre o mercado internacional, as feiras de direitos e o que editoras estrangeiras procuram na ficção brasileira.', fonte: 'Quatro Cinco Um · jul 2022', href: '#' },
  ],
  links: [
    { titulo: '→ Association of Authors Representatives', domain: 'aaronline.org', tipo: '', href: '#' },
    { titulo: '→ Agência Literária Ilíada', domain: 'iliada.com.br', tipo: '', href: '#' },
    { titulo: '→ Pontes Agência', domain: 'pontesagencia.com.br', tipo: '', href: '#' },
    { titulo: '→ Frankfurt Rights Guide 2024', domain: 'book-fair.com', tipo: 'arquivo', href: '#' },
    { titulo: '→ Publishers Weekly Rights Report', domain: 'publishersweekly.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 7 — Agência literária: o que é, para que serve e como funciona', meta: '52min · 2023', href: '#' },
    { show: 'Rights & Reads', titulo: 'ep. 21 — Selling Brazilian literature abroad: challenges and opportunities', meta: '48min · 2023', href: '#' },
  ],
},

'direitos-editoriais': {
  num: '03', titulo: 'direitos editoriais',
  intro: 'Cessão, sublicenciamento, territórios e prazos — o mercado de direitos move bilhões por ano em feiras como Frankfurt e Bologna. Entender contratos de direito autoral é indispensável para editoras, agentes e autores.',
  diretorios: [],
  videos: [
    { titulo: 'Guia da Feira de Frankfurt para editoras independentes', canal: 'CBL Internacional', meta: '2023 · 1h02min', href: '#' },
    { titulo: 'Como negociar direitos autorais: da proposta ao contrato assinado', canal: 'Fósforo Editora', meta: '2022 · 55min', href: '#' },
  ],
  textos: [
    { tag: 'guia', titulo: 'Direitos autorais na prática: o que todo editor precisa saber', trecho: 'Da distinção entre direito moral e patrimonial ao licenciamento para adaptações — um mapa dos principais pontos de um contrato editorial bem redigido.', fonte: 'Publishnews · abr 2023', href: '#' },
    { tag: 'reportagem', titulo: 'O mercado de direitos no Brasil: crescimento e gargalos', trecho: '"O Brasil vende mais do que compra. Mas ainda há pouca estrutura profissional para negociar direitos internacionais — a maioria das editoras independentes opera sem especialista na área."', fonte: 'Estadão Cultura · nov 2022', href: '#' },
    { tag: 'artigo', titulo: 'Creative Commons e o livro: quando a abertura é estratégia, não exceção', trecho: 'Análise dos modelos de licenciamento aberto e seu impacto no mercado editorial — casos de editoras que adotaram CC e o que aprenderam com isso.', fonte: 'Cult · jan 2024', href: '#' },
  ],
  links: [
    { titulo: '→ Feira de Frankfurt — Guia para expositores', domain: 'book-fair.com', tipo: 'arquivo', href: '#' },
    { titulo: '→ CBL — Câmara Brasileira do Livro', domain: 'cbl.org.br', tipo: '', href: '#' },
    { titulo: '→ ABDR — Associação Brasileira de Direitos Reprográficos', domain: 'abdr.org.br', tipo: '', href: '#' },
    { titulo: '→ LitAlert — Rights alerts newsletter', domain: 'litalert.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ WIPO — Organização Mundial da Propriedade Intelectual', domain: 'wipo.int', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 18 — Contratos editoriais: o que ler antes de assinar', meta: '1h10min · 2023', href: '#' },
    { show: 'Frankfurt Talks', titulo: 'ep. 4 — Latin American rights: what international publishers are buying', meta: '40min · 2022', href: '#' },
  ],
},

'autor-editora': {
  num: '04', titulo: 'autor e editora',
  intro: 'A relação entre quem escreve e quem publica é ao mesmo tempo criativa e contratual. Como se negocia, o que cada parte espera, e o que raramente está escrito no contrato.',
  diretorios: [],
  videos: [
    { titulo: 'Cartas entre Fitzgerald e Maxwell Perkins — a edição como conversa', canal: 'Vida do Livro', meta: '2024 · 36min', href: '#' },
    { titulo: 'O que um editor faz — visão do autor e visão da editora', canal: 'Todavia Editora', meta: '2023 · 1h05min', href: '#' },
  ],
  textos: [
    { tag: 'ensaio', titulo: 'O que um editor faz — e o que os autores raramente percebem', trecho: '"O editor ideal é invisível para o leitor. Mas o livro que você lê sem tropeçar — aquele que parece inevitável — passou por muitas mãos antes de chegar a você."', fonte: 'Quatro Cinco Um · mai 2023', href: '#' },
    { tag: 'reportagem', titulo: 'Royalties no Brasil: quanto ganha um autor publicado por grande editora?', trecho: 'Levantamento com contratos e declarações anônimas revela que a maioria dos escritores brasileiros publicados por editoras tradicionais recebe entre 8% e 12% sobre o preço de capa.', fonte: 'Piauí · ago 2023', href: '#' },
    { tag: 'entrevista', titulo: 'Bruna Beber: "Aprendi a defender meu texto sem perder o editor de aliado"', trecho: 'Sobre como negociar edição, preservar a própria voz e construir uma relação de trabalho produtiva com o editor — sem romantizar nem hostilizar.', fonte: 'Rascunho · set 2022', href: '#' },
  ],
  links: [
    { titulo: '→ UBE — União Brasileira de Escritores', domain: 'ube.org.br', tipo: '', href: '#' },
    { titulo: '→ Contrato-modelo para autores — UBE', domain: 'ube.org.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ Authors Guild — recursos para escritores', domain: 'authorsguild.org', tipo: '', href: '#' },
    { titulo: '→ The Society of Authors (UK)', domain: 'societyofauthors.org', tipo: '', href: '#' },
    { titulo: '→ Quanto vale um livro? — Cálculo de royalties', domain: 'publishnews.com.br', tipo: 'arquivo', href: '#' },
  ],
  podcasts: [
    { show: 'Editando o Editor', titulo: 'ep. 9 — A visão do autor sobre o processo editorial — com Ana Paula Maia', meta: '1h12min · 2023', href: '#' },
    { show: 'The Editors Podcast', titulo: 'ep. 45 — When author and editor disagree: navigating creative conflict', meta: '55min · 2022', href: '#' },
  ],
},

'coordenacao-editorial': {
  num: '05', titulo: 'coordenação editorial',
  intro: 'O coordenador editorial gerencia o percurso do livro desde a submissão até o lançamento. Prazos, autores, revisores, designers e distribuidores passam por ele — é quem mantém o processo em movimento.',
  diretorios: [],
  videos: [
    { titulo: 'O fluxo editorial na prática — da proposta ao livro impresso', canal: 'Editora Autêntica', meta: '2023 · 58min', href: '#' },
    { titulo: 'Gestão de catálogo: como uma editora decide o que publica', canal: 'CBL Talks', meta: '2022 · 44min', href: '#' },
  ],
  textos: [
    { tag: 'artigo', titulo: 'Fluxo editorial 2024: como as editoras estão repensando processos', trecho: 'Da submissão digital ao acompanhamento de produção — como ferramentas de gestão de projetos estão transformando rotinas editoriais que não mudavam há décadas.', fonte: 'Publishnews · mar 2024', href: '#' },
    { tag: 'ensaio', titulo: 'O coordenador editorial como curador de projetos — além do gerenciamento', trecho: '"Coordenar editorialmente é mais do que cumprir cronogramas. É manter a coerência de um projeto enquanto ele passa por dezenas de mãos — cada uma com sua própria ideia do que o livro deveria ser."', fonte: 'Cult · nov 2023', href: '#' },
    { tag: 'guia', titulo: 'Como montar um cronograma editorial realista', trecho: 'Prazos por etapa, folgas estratégicas e o que acontece quando o autor atrasa. Um guia prático para coordenadores que não querem ser pegos de surpresa.', fonte: 'Vida do Livro · 2024', href: '#' },
  ],
  links: [
    { titulo: '→ CBL — cursos de formação editorial', domain: 'cbl.org.br', tipo: 'curso', href: '#' },
    { titulo: '→ Senac SP — Formação em Edição e Produção Editorial', domain: 'sp.senac.br', tipo: 'curso', href: '#' },
    { titulo: '→ Editorial Freelancers Association', domain: 'the-efa.org', tipo: '', href: '#' },
    { titulo: '→ Modelo de cronograma editorial — download gratuito', domain: 'publishnews.com.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ The Hot Sheet — editorial industry newsletter', domain: 'hotsheetpub.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 14 — A rotina de uma coordenadora editorial em grande editora', meta: '1h02min · 2023', href: '#' },
    { show: 'Publishing Talks', titulo: 'ep. 67 — Editorial project management: tools and workflows', meta: '48min · 2022', href: '#' },
  ],
},

'traducao': {
  num: '06', titulo: 'tradução',
  intro: 'Traduzir é reescrever em outra língua sem apagar a voz de quem escreveu. As escolhas invisíveis que fazem um livro existir numa língua que não era a sua — ética, estilo, mercado e ofício.',
  diretorios: [
    { nome: 'tradutores', href: 'diretorio?tipo=tradutores' },
    { nome: 'editoras', href: 'diretorio?tipo=editoras' },
  ],
  videos: [
    { titulo: 'Caetano e Rogerio Galindo — Traduzindo Ulysses e Graça Infinita', canal: 'Vida do Livro', meta: '2024 · 1h14min', href: '#' },
    { titulo: 'Stephanie Borges — Tradução como Interpretação', canal: 'Vida do Livro', meta: '2024 · 58min', href: '#' },
  ],
  textos: [
    { tag: 'artigo', titulo: 'O ofício invisível — tradutores literários no Brasil', trecho: '"Toda tradução é uma leitura. O que o tradutor entrega ao leitor não é o original — é sua melhor aposta sobre o que o original diria se tivesse nascido em português."', fonte: 'Piauí · mar 2022', href: '#' },
    { tag: 'artigo', titulo: 'Fidelidade e traição: o debate eterno na tradução literária', trecho: '"Nenhuma tradução é neutra. Toda escolha de palavra carrega uma posição — sobre o texto, sobre o leitor, sobre o que merece ser preservado."', fonte: 'Suplemento Pernambuco · dez 2021', href: '#' },
    { tag: 'artigo', titulo: 'Como se paga um tradutor no Brasil', trecho: '"A maioria dos contratos ainda não garante participação nos royalties. O texto existe por causa do tradutor — e raramente seu nome aparece na capa."', fonte: 'PublishNews · ago 2023', href: '#' },
  ],
  links: [
    { titulo: '→ ABRATES', domain: 'abrates.org.br', tipo: '', href: '#' },
    { titulo: '→ Prêmio Paulo Rónai de Tradução', domain: 'fnlij.org.br', tipo: '', href: '#' },
    { titulo: '→ Cadernos de Literatura em Tradução — USP', domain: 'revistas.usp.br', tipo: '', href: '#' },
    { titulo: '→ Contrato-modelo de tradução literária', domain: 'ABRATES · PDF · 4p', tipo: 'arquivo', href: '#' },
    { titulo: '→ Tabela de honorários ABRATES 2024', domain: 'abrates.org.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ Babel — newsletter sobre tradução', domain: 'babel.substack.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'Sem Tradução', titulo: 'ep. 12 — Caetano Galindo sobre Joyce e os limites do intraduzível', meta: '55min · 2024', href: '#' },
    { show: 'Letras Estrangeiras', titulo: 'ep. 8 — O trabalho da tradução: entre a fidelidade e a criação', meta: '1h02min · 2023', href: '#' },
  ],
},

'preparacao-revisao': {
  num: '07', titulo: 'preparação e revisão',
  intro: 'Preparar e revisar um texto é torná-lo legível sem desfazê-lo. O editor de texto navega entre a norma, o estilo do autor e o ritmo da leitura — um trabalho que define a qualidade do livro sem aparecer nele.',
  diretorios: [],
  videos: [
    { titulo: 'O que é preparação de originais — e por que ela não é "só corrigir erros"', canal: 'Vida do Livro', meta: '2024 · 52min', href: '#' },
    { titulo: 'Revisão de provas na prática: do PDF anotado ao arquivo final', canal: 'Editora Autêntica', meta: '2022 · 38min', href: '#' },
  ],
  textos: [
    { tag: 'artigo', titulo: 'O editor de texto e o estilo do autor — onde termina a norma e começa a voz', trecho: '"Revisar não é corrigir — é interpretar. O revisor decide o tempo todo o que é erro e o que é escolha, o que precisa mudar e o que precisa ficar. Essa é uma decisão editorial, não gramatical."', fonte: 'Rascunho · fev 2023', href: '#' },
    { tag: 'guia', titulo: 'Marcações de revisão: padrões e como usá-los', trecho: 'Do tradicional lápis vermelho ao PDF comentado — como a revisão de provas mudou com o digital e o que ainda funciona melhor no papel.', fonte: 'Vida do Livro · 2024', href: '#' },
    { tag: 'entrevista', titulo: 'Jerônimo Teixeira: "Revisar literatura é aprender a não intervir"', trecho: '"A tentação de melhorar o texto é permanente. A habilidade do revisor literário está em resistir a essa tentação e defender o que o autor quis dizer — mesmo quando não estava dizendo muito bem."', fonte: 'Quatro Cinco Um · out 2022', href: '#' },
  ],
  links: [
    { titulo: '→ ABEC — Associação Brasileira de Editores Científicos', domain: 'abecbrasil.org.br', tipo: '', href: '#' },
    { titulo: '→ EFA — Editorial Freelancers Association', domain: 'the-efa.org', tipo: '', href: '#' },
    { titulo: '→ Acordo Ortográfico 2009 — texto completo', domain: 'planalto.gov.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ VOLP — Vocabulário Ortográfico da Língua Portuguesa', domain: 'academia.org.br', tipo: '', href: '#' },
    { titulo: '→ Dicionário Houaiss Online', domain: 'houaiss.uol.com.br', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Editando o Editor', titulo: 'ep. 3 — Preparação de originais: como funciona a etapa mais invisível do livro', meta: '55min · 2023', href: '#' },
    { show: 'The Editors Podcast', titulo: 'ep. 38 — Copyediting versus line editing: understanding the difference', meta: '44min · 2022', href: '#' },
  ],
},

'design-grafico': {
  num: '08', titulo: 'design gráfico',
  intro: 'A forma visual do livro é uma interpretação do seu conteúdo. Tipografia, capa e diagramação constroem o contrato visual com o leitor — decidindo o que ele nota antes mesmo de abrir a primeira página.',
  diretorios: [
    { nome: 'designers', href: 'diretorio?tipo=designers' },
  ],
  videos: [
    { titulo: 'Tipografia para editores: o que todo editor deveria entender sobre tipo', canal: 'Vida do Livro', meta: '2024 · 1h08min', href: '#' },
    { titulo: 'A capa como argumento — design de livros e sedução visual', canal: 'Bienal do Livro SP', meta: '2023 · 46min', href: '#' },
  ],
  textos: [
    { tag: 'ensaio', titulo: 'A capa que vende e a capa que fica — dois critérios em conflito permanente', trecho: '"Toda capa responde a dois mercados ao mesmo tempo: o de hoje, que precisa vender, e o de amanhã, que vai julgar. Os melhores designers sabem que esses dois mercados não têm o mesmo gosto."', fonte: 'Quatro Cinco Um · jul 2023', href: '#' },
    { tag: 'entrevista', titulo: 'Alceu Nunes: "O design de livro no Brasil está crescendo — mas ainda ignora a tipografia"', trecho: 'Conversa com um dos principais designers de livros do Brasil sobre a diferença entre decorar uma página e projetar uma leitura.', fonte: 'Cult · abr 2022', href: '#' },
    { tag: 'artigo', titulo: 'Diagramação e leiturabilidade: o que a pesquisa diz sobre tipos, espaçamento e mancha', trecho: 'Resumo dos estudos mais recentes sobre tipografia e conforto visual — e o que editores e designers precisam saber para tomar decisões baseadas em evidências.', fonte: 'Vida do Livro · 2023', href: '#' },
  ],
  links: [
    { titulo: '→ ABDI — Associação Brasileira de Design de Interiores', domain: 'abd.org.br', tipo: '', href: '#' },
    { titulo: '→ Typewolf — referência tipográfica para designers', domain: 'typewolf.com', tipo: '', href: '#' },
    { titulo: '→ Book Design Review — portfolio de capas', domain: 'bookdesignreview.com', tipo: '', href: '#' },
    { titulo: '→ Google Fonts — tipografias de uso livre', domain: 'fonts.google.com', tipo: '', href: '#' },
    { titulo: '→ Adobe Fonts — biblioteca tipográfica', domain: 'fonts.adobe.com', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Livro na Prateleira', titulo: 'ep. 22 — Design de livros no Brasil: quem são e como trabalham os capistas', meta: '1h10min · 2023', href: '#' },
    { show: 'Overtime (Dribbble)', titulo: 'ep. 88 — Book cover design: process, constraints and culture', meta: '42min · 2022', href: '#' },
  ],
},

'producao-grafica': {
  num: '09', titulo: 'produção gráfica',
  intro: 'Da arte-final à impressora: especificações técnicas, escolha de papel, acabamento e produção industrial. O livro como objeto fabricado — e as decisões que determinam se ele vai durar 10 ou 100 anos.',
  diretorios: [
    { nome: 'produção gráfica', href: 'diretorio?tipo=producao' },
  ],
  videos: [
    { titulo: 'Como um livro é impresso — da arte-final à gráfica em 8 etapas', canal: 'Gráfica Posigraf', meta: '2022 · 28min', href: '#' },
    { titulo: 'Papel, gramatura e acabamento — o que cada decisão significa para o leitor', canal: 'Vida do Livro', meta: '2024 · 54min', href: '#' },
  ],
  textos: [
    { tag: 'guia', titulo: 'Especificações técnicas para editoras: o que mandar para a gráfica', trecho: 'Da resolução do arquivo à sangria, do perfil de cor ao formato de entrega — um guia completo para quem envia arquivos para impressão pela primeira vez.', fonte: 'Vida do Livro · 2024', href: '#' },
    { tag: 'artigo', titulo: 'O papel do livro — qual usar, por quê e quanto custa', trecho: 'Offset, couchê, reciclado, pólen — cada tipo de papel tem propriedades físicas e econômicas distintas. Um mapa das opções disponíveis no mercado brasileiro.', fonte: 'Publishnews · jun 2023', href: '#' },
    { tag: 'reportagem', titulo: 'Sustentabilidade na gráfica: o que as editoras brasileiras estão fazendo (e o que ainda falta)', trecho: 'Da certificação FSC ao papel reciclado pós-consumo — como algumas editoras estão repensando a cadeia de produção gráfica.', fonte: 'Estadão Cultura · jan 2024', href: '#' },
  ],
  links: [
    { titulo: '→ ABIGRAF — Associação Brasileira da Indústria Gráfica', domain: 'abigraf.org.br', tipo: '', href: '#' },
    { titulo: '→ Posigraf — gráfica editorial', domain: 'posigraf.com.br', tipo: '', href: '#' },
    { titulo: '→ Leograf — gráfica e encadernação', domain: 'leograf.com.br', tipo: '', href: '#' },
    { titulo: '→ Suzano Papel — especificações de papel para livros', domain: 'suzano.com.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ FSC Brasil — certificação florestal', domain: 'fsc.org.br', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Gráfica & Editora', titulo: 'ep. 5 — A cadeia de produção do livro físico no Brasil', meta: '1h02min · 2023', href: '#' },
    { show: 'O Mercado do Livro', titulo: 'ep. 11 — Produção gráfica: custos, prazos e o que ninguém conta para o editor estreante', meta: '58min · 2023', href: '#' },
  ],
},

'ebooks': {
  num: '10', titulo: 'e-books',
  intro: 'O e-book como formato, mercado e experiência de leitura. Plataformas, royalties e o leitor de tela — o livro que cabe em todos os dispositivos e que desafia categorias tradicionais de produção e distribuição.',
  diretorios: [],
  videos: [
    { titulo: 'O mercado de e-books no Brasil — dados, tendências e o futuro do digital', canal: 'CBL Talks', meta: '2023 · 48min', href: '#' },
    { titulo: 'EPUB 3 na prática: como formatar um e-book de qualidade', canal: 'Vida do Livro', meta: '2024 · 1h18min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'Por que o e-book não matou o livro impresso — e o que isso nos diz sobre leitura', trecho: '"O digital não substituiu o analógico — ele o redefiniu. O leitor que usa e-reader tende a ler mais, não menos, em papel. E as categorias que crescem mais no digital são aquelas que também crescem no físico."', fonte: 'Piauí · fev 2023', href: '#' },
    { tag: 'guia', titulo: 'Royalties digitais no Brasil: como funcionam as diferentes plataformas', trecho: 'Amazon, Google Play Books, Apple Books e Kindle Unlimited — cada plataforma tem sua estrutura de royalties. Um comparativo atualizado para editoras e autores independentes.', fonte: 'Publishnews · mai 2024', href: '#' },
    { tag: 'artigo', titulo: 'Acessibilidade no e-book: recursos que todo editor deveria conhecer', trecho: 'EPUB acessível, leitores de tela e o potencial do digital para alcançar leitores que o livro impresso excluiu. Uma introdução prática.', fonte: 'Vida do Livro · 2023', href: '#' },
  ],
  links: [
    { titulo: '→ Kindle Direct Publishing — Amazon', domain: 'kdp.amazon.com.br', tipo: '', href: '#' },
    { titulo: '→ Gato Sabido — distribuição digital nacional', domain: 'gatosabido.com.br', tipo: '', href: '#' },
    { titulo: '→ Draft2Digital — distribuição ebook internacional', domain: 'draft2digital.com', tipo: '', href: '#' },
    { titulo: '→ EPUB 3 Specification — W3C', domain: 'w3.org', tipo: 'arquivo', href: '#' },
    { titulo: '→ Calibre — software gratuito para e-books', domain: 'calibre-ebook.com', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 23 — O livro digital no Brasil: onde estamos e para onde vamos', meta: '52min · 2024', href: '#' },
    { show: 'Digital Book World', titulo: 'ep. 112 — Ebooks in emerging markets: lessons from Latin America', meta: '44min · 2023', href: '#' },
  ],
},

'audiolivros': {
  num: '11', titulo: 'audiolivros',
  intro: 'A escuta como modo de leitura. O mercado de audiobooks no Brasil cresce a dois dígitos ao ano. Narração, produção e as plataformas que disputam os fones de ouvido de uma nova geração de leitores.',
  diretorios: [],
  videos: [
    { titulo: 'Como se produz um audiolivro — do roteiro à publicação', canal: 'Ubook', meta: '2023 · 42min', href: '#' },
    { titulo: 'O mercado de audio no Brasil: Audible, Storytel, Ubook e o crescimento do segmento', canal: 'CBL Talks', meta: '2023 · 58min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'O boom do audiolivro no Brasil — e o que está por trás dos números', trecho: '"O crescimento não é acidente: é uma combinação de penetração de smartphone, planos de streaming e uma geração que aprendeu a consumir conteúdo enquanto faz outra coisa."', fonte: 'Folha de S. Paulo · set 2023', href: '#' },
    { tag: 'guia', titulo: 'Narrar um audiolivro: o que diferencia uma boa narração de uma excelente', trecho: 'Ritmo, entonação, caracterização de personagens — os critérios que estúdios e plataformas usam para avaliar narradores e o que um autor deve saber antes de narrar o próprio livro.', fonte: 'Publishnews · jan 2024', href: '#' },
    { tag: 'artigo', titulo: 'Royalties no audio: como cada plataforma remunera autores e editoras', trecho: 'Comparativo entre Audible, Storytel, Ubook e Skeelo — modelos de subscrição versus avulso e o que isso significa para a receita de uma editora.', fonte: 'Vida do Livro · 2024', href: '#' },
  ],
  links: [
    { titulo: '→ Ubook — plataforma brasileira de audiolivros', domain: 'ubook.com', tipo: '', href: '#' },
    { titulo: '→ Storytel Brasil', domain: 'storytel.com/br', tipo: '', href: '#' },
    { titulo: '→ Skeelo — plataforma de leitura digital', domain: 'skeelo.com', tipo: '', href: '#' },
    { titulo: '→ ACX — Audiobook Creation Exchange (Amazon)', domain: 'acx.com', tipo: '', href: '#' },
    { titulo: '→ Podcast sobre produção de audiolivros', domain: 'narratoroutreach.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 31 — Audiolivros no Brasil: quem consome, quem produz e quem lucra', meta: '1h04min · 2024', href: '#' },
    { show: 'Narrators Inc.', titulo: 'ep. 77 — Producing audiobooks for global audiences', meta: '48min · 2023', href: '#' },
  ],
},

'marketing-editorial': {
  num: '12', titulo: 'marketing editorial',
  intro: 'Como livros chegam até leitores. Da campanha de lançamento ao trabalho cotidiano de construção de público — do BookTok ao assessor de imprensa, do ARCs ao algoritmo da Amazon.',
  diretorios: [
    { nome: 'influencers e creators', href: 'diretorio?tipo=influencers' },
  ],
  videos: [
    { titulo: 'Marketing de livros na era das redes sociais — o que funciona em 2024', canal: 'CBL Talks', meta: '2024 · 1h10min', href: '#' },
    { titulo: 'Lançamento editorial do zero: o plano que as editoras não ensinam', canal: 'Vida do Livro', meta: '2023 · 55min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'BookTok Brasil: como o TikTok virou a maior influência de vendas literárias do país', trecho: '"Uma recomendação de 30 segundos no TikTok pode vender mais exemplares do que uma resenha de página inteira na Folha. Isso não é uma anomalia — é o novo normal."', fonte: 'Folha de S. Paulo · mar 2024', href: '#' },
    { tag: 'artigo', titulo: 'ARCs e galley copies: como editoras gerenciam a antecipação de lançamentos', trecho: 'Do ARC impresso ao PDF protegido — como o mercado de advance review copies está se adaptando ao digital e às redes sociais.', fonte: 'Publishnews · out 2023', href: '#' },
    { tag: 'ensaio', titulo: 'A marca pessoal do autor como ativo editorial', trecho: '"Uma editora que lança um livro de autor anônimo está apostando no título. Uma editora que lança um livro de autor com audiência está apostando num ativo que vai além do título."', fonte: 'Quatro Cinco Um · jan 2024', href: '#' },
  ],
  links: [
    { titulo: '→ BookBub — plataforma de promoções para livros', domain: 'bookbub.com', tipo: '', href: '#' },
    { titulo: '→ NetGalley — plataforma de ARCs digitais', domain: 'netgalley.com', tipo: '', href: '#' },
    { titulo: '→ The Book Designer — marketing para editores', domain: 'thebookdesigner.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ Jane Friedman — recursos para autores e editoras', domain: 'janefriedman.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ Publishnews — notícias do mercado editorial', domain: 'publishnews.com.br', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 19 — Marketing editorial: o que funciona, o que é perda de dinheiro e o que poucos fazem', meta: '1h08min · 2024', href: '#' },
    { show: 'How Books Are Made', titulo: 'ep. 33 — Marketing a book in the age of social media', meta: '52min · 2023', href: '#' },
  ],
},

'comunicacao-midia': {
  num: '13', titulo: 'comunicação e mídia',
  intro: 'A cobertura jornalística do livro, as resenhas, os suplementos literários e as redes sociais como espaços de mediação cultural. Quem tem autoridade para falar de livros — e como esse mapa está mudando.',
  diretorios: [
    { nome: 'veículos', href: 'diretorio?tipo=veiculos' },
    { nome: 'jornalistas', href: 'diretorio?tipo=jornalistas' },
  ],
  videos: [
    { titulo: 'O jornalismo literário no Brasil — sobrevivência e renovação', canal: 'FLiP Arquivos', meta: '2022 · 52min', href: '#' },
    { titulo: 'A crítica literária nas redes — quem é o crítico hoje', canal: 'Vida do Livro', meta: '2023 · 44min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'O fim dos suplementos literários — e o que veio no lugar', trecho: '"O Caderno Mais!, o Literário do Globo, o Suplemento Literário do Estado — todos foram reduzidos ou extintos. O espaço que sobrou não desapareceu: migrou para podcasts, newsletters e perfis no Instagram."', fonte: 'Piauí · abr 2023', href: '#' },
    { tag: 'ensaio', titulo: 'Quem tem autoridade para resenhar livros? — A crítica na era da democratização', trecho: 'A crítica especializada ainda importa quando qualquer leitor pode publicar uma resenha com milhares de leitores? Uma reflexão sobre autoridade, expertise e diversidade de perspectivas.', fonte: 'Rascunho · nov 2022', href: '#' },
    { tag: 'artigo', titulo: 'O assessor de imprensa de livros — como funciona a relação entre editoras e jornalistas', trecho: 'Da lista de jornalistas ao press kit digital — como se constrói a cobertura de um lançamento e o que jornalistas recebem mal.', fonte: 'Publishnews · fev 2024', href: '#' },
  ],
  links: [
    { titulo: '→ Quatro Cinco Um — crítica literária', domain: 'quatrocincoum.com.br', tipo: '', href: '#' },
    { titulo: '→ Rascunho — jornal de literatura', domain: 'rascunho.com.br', tipo: '', href: '#' },
    { titulo: '→ Suplemento Pernambuco', domain: 'suplementopernambuco.com.br', tipo: '', href: '#' },
    { titulo: '→ Publishnews — notícias do mercado', domain: 'publishnews.com.br', tipo: '', href: '#' },
    { titulo: '→ Literary Hub — literary journalism', domain: 'lithub.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'Estante de Livros', titulo: 'ep. 15 — Crítica literária: quem escreve, para quem e com qual autoridade', meta: '58min · 2023', href: '#' },
    { show: 'Books & Banter', titulo: 'ep. 42 — How literary journalism is changing in the age of social media', meta: '46min · 2022', href: '#' },
  ],
},

'distribuicao': {
  num: '14', titulo: 'distribuição',
  intro: 'O livro físico precisa ir da gráfica até a prateleira. Como funcionam distribuidoras, atacadistas, consignação e o custo invisível da logística — o elo da cadeia que mais influencia a margem de lucro das editoras.',
  diretorios: [],
  videos: [
    { titulo: 'A cadeia de distribuição do livro no Brasil — do depósito à livraria', canal: 'CBL Talks', meta: '2022 · 48min', href: '#' },
    { titulo: 'Distribuição direta vs. terceirizada: o que é melhor para editoras independentes', canal: 'Vida do Livro', meta: '2024 · 1h02min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'A crise das distribuidoras independentes no Brasil', trecho: '"Com margens cada vez menores e o crescimento do online, várias distribuidoras regionais fecharam na última década. O mercado se concentrou — e editoras pequenas pagam o preço."', fonte: 'Publishnews · set 2023', href: '#' },
    { tag: 'guia', titulo: 'Consignação e venda firme: as diferenças que todo editor precisa entender', trecho: 'Quando o livro fica na prateleira por consignação, quem corre o risco é a editora. Mas as alternativas têm seus próprios custos. Um guia para entender o contrato de distribuição.', fonte: 'Vida do Livro · 2023', href: '#' },
    { tag: 'artigo', titulo: 'O e-commerce como canal de distribuição: Amazon, Americanas e os novos intermediários', trecho: 'Como as grandes plataformas de comércio eletrônico mudaram a lógica da distribuição — e o que isso significa para editoras que vendem pela internet.', fonte: 'Estadão Cultura · mai 2023', href: '#' },
  ],
  links: [
    { titulo: '→ Martins Distribuidora', domain: 'grupomart.ins.com.br', tipo: '', href: '#' },
    { titulo: '→ Record — Distribuição e Logística', domain: 'record.com.br', tipo: '', href: '#' },
    { titulo: '→ Traço Criativo — distribuidora independente', domain: 'tracocriativo.com.br', tipo: '', href: '#' },
    { titulo: '→ CBL — dados de distribuição do mercado', domain: 'cbl.org.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ IngramSpark — distribuição global para editoras brasileiras', domain: 'ingramspark.com', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 8 — Distribuição no Brasil: como funciona e por que é tão cara', meta: '1h10min · 2023', href: '#' },
    { show: 'Publishing Talks', titulo: 'ep. 78 — Global distribution for independent publishers', meta: '50min · 2022', href: '#' },
  ],
},

'pontos-de-venda': {
  num: '15', titulo: 'pontos de venda',
  intro: 'Livrarias, aeroportos, supermercados, bancas e feiras — onde o livro encontra o leitor. O ponto de venda como espaço cultural, decisão comercial e termômetro do mercado.',
  diretorios: [],
  videos: [
    { titulo: 'O futuro da livraria — conversa com livreiros independentes brasileiros', canal: 'FLiP Arquivos', meta: '2023 · 1h10min', href: '#' },
    { titulo: 'Por que as livrarias ainda importam na era do e-commerce', canal: 'Vida do Livro', meta: '2024 · 48min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'A reação das livrarias independentes — como sobrevivem no Brasil de hoje', trecho: '"As livrarias que sobreviveram apostaram em curadoria, eventos e comunidade — coisas que o e-commerce não consegue entregar. As que fecharam tentaram competir no preço."', fonte: 'Folha de S. Paulo · out 2023', href: '#' },
    { tag: 'artigo', titulo: 'Exposição versus velocidade: o que determina o destino de um livro na prateleira', trecho: 'Quem decide onde um livro fica na loja, por quanto tempo e em quantos exemplares — e como esse processo afeta as vendas de maneiras que a maioria dos editores subestima.', fonte: 'Publishnews · ago 2022', href: '#' },
    { tag: 'entrevista', titulo: 'Pedro Godoy, da Livraria Boto Cor-de-Rosa: "Curadorismo salvou a livraria física"', trecho: '"A livraria de prateleiras infinitas perdeu para a Amazon. A livraria com ponto de vista próprio — que te diz o que ler — ainda tem algo que o algoritmo não tem."', fonte: 'Quatro Cinco Um · mai 2023', href: '#' },
  ],
  links: [
    { titulo: '→ ANL — Associação Nacional de Livrarias', domain: 'anl.org.br', tipo: '', href: '#' },
    { titulo: '→ American Booksellers Association', domain: 'bookweb.org', tipo: '', href: '#' },
    { titulo: '→ Bookseller (UK) — indústria livraria', domain: 'thebookseller.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ IndieReader — livrarias independentes', domain: 'indiereader.com', tipo: '', href: '#' },
    { titulo: '→ Radar do Livro — dados de venda no varejo', domain: 'publishnews.com.br', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'Livreiro Carioca', titulo: 'ep. 18 — O dia a dia de uma livraria independente em 2024', meta: '52min · 2024', href: '#' },
    { show: 'The Bookseller Podcast', titulo: 'ep. 34 — Physical retail: what bookshops are doing right', meta: '44min · 2023', href: '#' },
  ],
},

'clubes-do-livro': {
  num: '16', titulo: 'clubes do livro',
  intro: 'O clube do livro como curadoria, fidelização e comunidade. Um modelo de negócio que cresce enquanto o varejo físico enfrenta dificuldades — e que redefine a relação entre editora, curador e leitor.',
  diretorios: [],
  videos: [
    { titulo: 'Tag Livros: como construímos o maior clube do livro do Brasil', canal: 'CBL Talks', meta: '2023 · 52min', href: '#' },
    { titulo: 'Clubes de livros como canal editorial — oportunidades para editoras independentes', canal: 'Vida do Livro', meta: '2024 · 44min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'O mercado de box e clubes literários no Brasil: um setor que não para de crescer', trecho: '"Enquanto o varejo físico fechava lojas, os clubes de livros abriam assinantes. A combinação de curadoria, surpresa e comunidade criou um produto que o e-commerce ainda não conseguiu replicar."', fonte: 'Estadão Cultura · fev 2024', href: '#' },
    { tag: 'artigo', titulo: 'Curadoria como diferencial — o que clubes de livros podem ensinar a editoras', trecho: 'Da seleção do título à embalagem — como os melhores clubes criaram uma linguagem própria que vai além do livro e fideliza leitores com uma taxa de cancelamento surpreendentemente baixa.', fonte: 'Publishnews · nov 2023', href: '#' },
    { tag: 'entrevista', titulo: 'Kolbe Livros: "Nosso modelo é anti-algoritmo — curamos, não personalizamos"', trecho: '"Em vez de dar ao leitor o que ele acha que quer, damos o que achamos que ele precisa. Às vezes erra. Mas quando acerta, cria uma fidelidade que a personalização nunca consegue."', fonte: 'Quatro Cinco Um · abr 2023', href: '#' },
  ],
  links: [
    { titulo: '→ Tag Livros', domain: 'taglivros.com', tipo: '', href: '#' },
    { titulo: '→ Leiturinha — clube de livros infantis', domain: 'leiturinha.com.br', tipo: '', href: '#' },
    { titulo: '→ Kolbe Livros', domain: 'kolbelivros.com.br', tipo: '', href: '#' },
    { titulo: '→ Book of the Month (EUA) — referência do setor', domain: 'bookofthemonth.com', tipo: '', href: '#' },
    { titulo: '→ Clube do Livro CBL — dados de assinaturas', domain: 'cbl.org.br', tipo: 'arquivo', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 27 — Clubes de livros: por que funcionam e o que podem ensinar ao mercado', meta: '58min · 2024', href: '#' },
    { show: 'Subscription Insider', titulo: 'ep. 55 — Book subscription boxes: retention, curation and growth', meta: '42min · 2023', href: '#' },
  ],
},

'ter-uma-editora': {
  num: '17', titulo: 'ter uma editora',
  intro: 'Abrir e manter uma editora independente no Brasil. Gestão, catálogo, identidade editorial e sustentabilidade financeira em um mercado concentrado — e por que ainda vale a pena.',
  diretorios: [],
  videos: [
    { titulo: 'Como abrir uma editora independente no Brasil — guia prático', canal: 'Vida do Livro', meta: '2024 · 1h22min', href: '#' },
    { titulo: 'Editoras independentes: catálogo, identidade e viabilidade — mesa redonda', canal: 'FLiP Arquivos', meta: '2023 · 1h30min', href: '#' },
  ],
  textos: [
    { tag: 'guia', titulo: 'Abrir uma editora no Brasil: o guia burocrático e prático', trecho: 'CNPJ, cadastro no SNEL, ISBN, registro na Biblioteca Nacional — os passos formais que todo editor estreante precisa dar antes de publicar o primeiro livro.', fonte: 'Publishnews · 2023', href: '#' },
    { tag: 'reportagem', titulo: 'A nova geração de editoras independentes brasileiras', trecho: '"São editoras menores, mais ágeis, com catálogo mais coerente e disposição para apostar em autores que o mainstream ignorou. Várias delas estão mudando o que o Brasil lê."', fonte: 'Piauí · jul 2023', href: '#' },
    { tag: 'ensaio', titulo: 'O catálogo como declaração de princípios', trecho: '"Uma editora é o que ela publica — não o que quer publicar. O catálogo é a única evidência concreta de que valores e escolhas editoriais existem."', fonte: 'Quatro Cinco Um · set 2022', href: '#' },
  ],
  links: [
    { titulo: '→ SNEL — Sindicato Nacional dos Editores de Livros', domain: 'snel.org.br', tipo: '', href: '#' },
    { titulo: '→ Agência Brasileira do ISBN', domain: 'isbn.bn.gov.br', tipo: '', href: '#' },
    { titulo: '→ PNLL — Plano Nacional do Livro e da Leitura', domain: 'pnll.gov.br', tipo: '', href: '#' },
    { titulo: '→ Independent Publishers Group', domain: 'ipgbook.com', tipo: '', href: '#' },
    { titulo: '→ Frankfurt Academy — cursos para editores', domain: 'book-fair.com', tipo: 'curso', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 2 — Ter uma editora independente: o que ninguém conta antes de você abrir a sua', meta: '1h18min · 2022', href: '#' },
    { show: 'Publishing Talks', titulo: 'ep. 89 — Independent publishing: identity, sustainability and culture', meta: '56min · 2023', href: '#' },
  ],
},

'dados-do-mercado': {
  num: '18', titulo: 'dados do mercado',
  intro: 'O que os números revelam sobre o mercado editorial brasileiro. Pesquisas da CBL, relatórios internacionais e as métricas que editoras usam para tomar decisões — e as que ainda faltam.',
  diretorios: [],
  videos: [
    { titulo: 'Pesquisa Produção e Vendas do Setor Editorial Brasileiro 2023 — apresentação CBL', canal: 'CBL', meta: '2024 · 36min', href: '#' },
    { titulo: 'Dados e intuição: como editoras tomam decisões de publicação', canal: 'Vida do Livro', meta: '2023 · 58min', href: '#' },
  ],
  textos: [
    { tag: 'relatório', titulo: 'Pesquisa Produção e Vendas do Setor Editorial Brasileiro 2023', trecho: 'O mercado editorial brasileiro faturou R$ 2,96 bilhões em 2023, crescimento de 4,8% em relação ao ano anterior. As categorias de maior crescimento foram didático (8,2%) e literatura nacional (6,1%).', fonte: 'CBL/SNEL · 2024', href: '#' },
    { tag: 'análise', titulo: 'Global Publishing Statistics 2023 — o Brasil no contexto internacional', trecho: 'Como o Brasil se posiciona no mercado editorial mundial — em produção, faturamento, tradução e exportação — segundo os dados mais recentes da IPA e da Frankfurt Book Fair.', fonte: 'IPA · 2024', href: '#' },
    { tag: 'artigo', titulo: 'O que os dados do Bookscan revelam (e o que eles não capturam)', trecho: '"Os dados de venda são a melhor aproximação que temos da realidade — mas a realidade é mais ampla do que o que as livrarias registram. Feiras, sebos, piratas e empréstimos ficam de fora."', fonte: 'Publishnews · dez 2023', href: '#' },
  ],
  links: [
    { titulo: '→ CBL — relatórios e pesquisas', domain: 'cbl.org.br', tipo: 'arquivo', href: '#' },
    { titulo: '→ IPA — International Publishers Association', domain: 'internationalpublishers.org', tipo: '', href: '#' },
    { titulo: '→ Nielsen Bookscan Brasil', domain: 'nielsenbook.co.uk', tipo: '', href: '#' },
    { titulo: '→ Publishers Association UK — estatísticas', domain: 'publishers.org.uk', tipo: 'arquivo', href: '#' },
    { titulo: '→ Publishnews Radar — acompanhamento semanal', domain: 'publishnews.com.br', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 40 — O que os dados de 2023 revelam sobre o mercado editorial brasileiro', meta: '1h05min · 2024', href: '#' },
    { show: 'Publishers Weekly PW Cast', titulo: 'ep. 201 — Global book market data: trends and surprises', meta: '38min · 2024', href: '#' },
  ],
},

'autopublicacao': {
  num: '19', titulo: 'autopublicação',
  intro: 'Publicar sem intermediários: do arquivo formatado à distribuição digital. O autor como editor de si mesmo — plataformas, custos, decisões e o que se ganha e se perde ao dispensar a editora.',
  diretorios: [],
  videos: [
    { titulo: 'Como autopublicar um livro no Brasil em 2024 — guia completo', canal: 'Clube de Autores', meta: '2024 · 1h28min', href: '#' },
    { titulo: 'A autopublicação de qualidade — capa, revisão e formatação que parecem profissionais', canal: 'Vida do Livro', meta: '2023 · 58min', href: '#' },
  ],
  textos: [
    { tag: 'guia', titulo: 'Autopublicação no Brasil: plataformas, custos e o que esperar', trecho: 'Clube de Autores, Amazon KDP, Gato Sabido e Draft2Digital — comparativo de royalties, alcance e suporte para autores que decidem publicar por conta própria.', fonte: 'Publishnews · jan 2024', href: '#' },
    { tag: 'reportagem', titulo: 'Self-publishing no Brasil: quem são os autores independentes de sucesso', trecho: '"O modelo funciona para quem tem audiência prévia, nicho definido ou disposição para aprender marketing. Para quem espera que a plataforma substitua a editora, a decepção costuma ser grande."', fonte: 'Estadão Cultura · jun 2023', href: '#' },
    { tag: 'ensaio', titulo: 'O autor-editor e o paradoxo da liberdade total', trecho: '"Sem editor, você decide tudo. Mas decidir tudo significa que você também escolhe tudo o que vai errar — e sem ninguém para te avisar antes de publicar."', fonte: 'Quatro Cinco Um · out 2023', href: '#' },
  ],
  links: [
    { titulo: '→ Clube de Autores — plataforma brasileira', domain: 'clubedeautores.com.br', tipo: '', href: '#' },
    { titulo: '→ Amazon KDP Brasil', domain: 'kdp.amazon.com.br', tipo: '', href: '#' },
    { titulo: '→ Draft2Digital — distribuição global', domain: 'draft2digital.com', tipo: '', href: '#' },
    { titulo: '→ IngramSpark — impressão por demanda', domain: 'ingramspark.com', tipo: '', href: '#' },
    { titulo: '→ ALLi — Alliance of Independent Authors', domain: 'allianceindependentauthors.org', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Escrever para Viver', titulo: 'ep. 55 — Autopublicação: o que funciona, o que não funciona e o que depende de você', meta: '1h02min · 2024', href: '#' },
    { show: 'The Creative Penn', titulo: 'ep. 312 — Independent publishing in 2024: global opportunities', meta: '52min · 2024', href: '#' },
  ],
},

'literatura-infantil': {
  num: '20', titulo: 'livros infantis',
  intro: 'O livro infantil e juvenil como projeto editorial específico — imagem, texto, formato e o leitor em formação. Da Bologna Book Fair à prateleira da escola, um mercado com lógica, linguagem e valores próprios.',
  diretorios: [],
  videos: [
    { titulo: 'O livro-álbum como forma — imagem e texto numa relação que não é ilustração', canal: 'FLiP Arquivos', meta: '2022 · 58min', href: '#' },
    { titulo: 'A Feira de Bologna — o maior evento de livros infantis do mundo', canal: 'CBL Internacional', meta: '2023 · 42min', href: '#' },
  ],
  textos: [
    { tag: 'ensaio', titulo: 'O que é um bom livro infantil? — critérios além do educativo', trecho: '"O livro que educa sem parecer que educa é um livro que as crianças também lembram quando adultas. Aquele que parece feito para ensiná-las vai para a estante e fica lá."', fonte: 'Rascunho · jun 2023', href: '#' },
    { tag: 'reportagem', titulo: 'Mercado infantil no Brasil: o segmento que mais cresce em volume', trecho: 'Com a retomada do PNLD e o crescimento do varejo digital, o segmento de livros infantis é hoje o de melhor desempenho no mercado editorial brasileiro.', fonte: 'Publishnews · fev 2024', href: '#' },
    { tag: 'entrevista', titulo: 'Rafa Rodrigues, editora da Companhia das Letrinhas: "Literatura infantil não é literatura menor"', trecho: '"A dificuldade de fazer um livro infantil de qualidade é maior do que a de fazer um livro adulto — porque o leitor infantil é implacável: ou o livro funciona, ou ele larga."', fonte: 'Quatro Cinco Um · ago 2022', href: '#' },
  ],
  links: [
    { titulo: '→ FNLIJ — Fundação Nacional do Livro Infantil e Juvenil', domain: 'fnlij.org.br', tipo: '', href: '#' },
    { titulo: '→ Bologna Children\'s Book Fair', domain: 'bolognachildrensbookfair.com', tipo: '', href: '#' },
    { titulo: '→ PNLD — Programa Nacional do Livro Didático', domain: 'fnde.gov.br', tipo: '', href: '#' },
    { titulo: '→ Baobá — literatura africana para crianças', domain: 'editorababoa.com.br', tipo: '', href: '#' },
    { titulo: '→ Leiturinha — clube de livros infantis', domain: 'leiturinha.com.br', tipo: '', href: '#' },
  ],
  podcasts: [
    { show: 'Leitura na Infância', titulo: 'ep. 11 — O que torna um livro infantil bom — além do educativo', meta: '52min · 2023', href: '#' },
    { show: 'Kidlit Podcast', titulo: 'ep. 88 — Illustrators and editors: making picture books together', meta: '44min · 2022', href: '#' },
  ],
},

'quadrinhos': {
  num: '21', titulo: 'quadrinhos',
  intro: 'O quadrinho como narrativa visual, mercado editorial e linguagem artística. Da HQ brasileira às graphic novels — um segmento que reconquista espaço nas livrarias e desafia categorias da indústria.',
  diretorios: [],
  videos: [
    { titulo: 'A graphic novel no Brasil — história, mercado e a nova geração de quadrinistas', canal: 'FLiP Arquivos', meta: '2023 · 1h08min', href: '#' },
    { titulo: 'Processo de criação de uma HQ — roteiro, arte e publicação', canal: 'Vida do Livro', meta: '2024 · 52min', href: '#' },
  ],
  textos: [
    { tag: 'reportagem', titulo: 'A volta dos quadrinhos às livrarias — e por que desta vez parece diferente', trecho: '"O segmento de graphic novels cresceu 18% em 2023, liderado por títulos de não-ficção e memória. As livrarias que antes mal reservavam uma prateleira agora têm seções inteiras."', fonte: 'Folha de S. Paulo · jan 2024', href: '#' },
    { tag: 'ensaio', titulo: 'Quadrinho e legitimidade: a luta que nunca terminou', trecho: '"Desde Eisner, os quadrinistas lutam para serem levados a sério. Cada vitória — de Spiegelman ao Man Booker shortlist de Fun Home — é celebrada como um marco. A batalha continua."', fonte: 'Rascunho · set 2023', href: '#' },
    { tag: 'entrevista', titulo: 'Laerte: "Os quadrinhos brasileiros estão entre os melhores do mundo — e quase ninguém sabe"', trecho: 'Sobre a tradição da HQ nacional, a invisibilidade internacional dos quadrinistas brasileiros e o que seria necessário para mudar isso.', fonte: 'Quatro Cinco Um · mar 2023', href: '#' },
  ],
  links: [
    { titulo: '→ ABQ — Associação Brasileira de Quadrinhos', domain: 'abqbrasil.com.br', tipo: '', href: '#' },
    { titulo: '→ Angoulême International Comics Festival', domain: 'bdangouleme.com', tipo: '', href: '#' },
    { titulo: '→ Quadrinhos na escola — recursos pedagógicos', domain: 'fnlij.org.br', tipo: '', href: '#' },
    { titulo: '→ Sequential — plataforma de quadrinhos digitais BR', domain: 'sequential.app', tipo: '', href: '#' },
    { titulo: '→ The Beat — HQ news e crítica', domain: 'comicsbeat.com', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'Gibi Cult', titulo: 'ep. 24 — Graphic novel no Brasil: mercado, editoras e o leitor que surgiu', meta: '1h02min · 2024', href: '#' },
    { show: 'Comic Books Are Burning in Hell', titulo: 'ep. 55 — Comics and the literary market', meta: '48min · 2023', href: '#' },
  ],
},

'futuro-tecnologia': {
  num: '22', titulo: 'futuro e tecnologia',
  intro: 'Inteligência artificial, plataformas de streaming, dados e a transformação do livro. O que muda — e o que permanece — quando a tecnologia reescreve as regras do mercado editorial.',
  diretorios: [],
  videos: [
    { titulo: 'IA e o livro — oportunidades, ameaças e o que ninguém ainda sabe responder', canal: 'CBL Talks', meta: '2024 · 1h15min', href: '#' },
    { titulo: 'O futuro do livro — mesa com editores, autores e tecnólogos na FLiP 2023', canal: 'FLiP Arquivos', meta: '2023 · 1h28min', href: '#' },
  ],
  textos: [
    { tag: 'análise', titulo: 'IA generativa e direitos autorais: o impasse que a indústria editorial precisa resolver', trecho: '"Quando uma IA treina com milhões de livros sem autorização e produz textos que competem com seus autores, qual é o regime jurídico aplicável? A resposta ainda não existe — e o mercado não pode esperar."', fonte: 'Piauí · nov 2023', href: '#' },
    { tag: 'reportagem', titulo: 'Big Five versus independentes: a tecnologia está equilibrando o jogo?', trecho: 'Das ferramentas de autopublicação às plataformas de IA para marketing, a tecnologia está reduzindo vantagens que grandes editoras tinham sobre as pequenas — mas criando novas assimetrias.', fonte: 'Publishers Weekly · fev 2024', href: '#' },
    { tag: 'ensaio', titulo: 'O livro no ecossistema da atenção — e por que ele ainda sobrevive', trecho: '"Toda geração previu que algo mataria o livro: o rádio, a TV, o vídeo game, a internet. O livro sobreviveu não porque venceu a batalha da atenção — mas porque ocupa um nicho que os outros não conseguem preencher."', fonte: 'Quatro Cinco Um · jan 2024', href: '#' },
  ],
  links: [
    { titulo: '→ O\'Reilly TOC — Technology, Media and Publishing', domain: 'oreilly.com/conferences', tipo: '', href: '#' },
    { titulo: '→ Publishers Weekly — Technology', domain: 'publishersweekly.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ Digital Book World', domain: 'digitalbookworld.com', tipo: '', href: '#' },
    { titulo: '→ The Shatzkin Files — análise de tendências', domain: 'shatzkinfiles.com', tipo: 'newsletter', href: '#' },
    { titulo: '→ Ebooks Brasil — newsletter digital', domain: 'ebooksbrasil.org', tipo: 'newsletter', href: '#' },
  ],
  podcasts: [
    { show: 'O Mercado do Livro', titulo: 'ep. 45 — IA, plataformas e o futuro do livro: o que vemos e o que ainda não entendemos', meta: '1h12min · 2024', href: '#' },
    { show: 'Rethinking Publishing', titulo: 'ep. 33 — Artificial intelligence and the book industry: where we are', meta: '58min · 2023', href: '#' },
  ],
},

};
