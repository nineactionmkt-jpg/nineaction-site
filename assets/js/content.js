/*
 * Conteúdo do site Nine Action Marketing.
 * Edite este arquivo para atualizar textos, serviços, portfólio, cases e contatos.
 * Não é preciso compilar nada: salve e recarregue a página.
 */
window.NINE = {
  /* ------------------------------------------------------------------ */
  /* Contato                                                             */
  /* ------------------------------------------------------------------ */
  contato: {
    // Link oficial do WhatsApp comercial (fornecido pela Nine Action).
    whatsappLink: "https://w.app/nineaction",
    // Opcional: número no formato internacional, só dígitos (ex.: "5517999999999").
    // Quando preenchido, o site abre o WhatsApp com a mensagem já escrita.
    // Enquanto estiver vazio, o site usa o link acima e oferece um botão para copiar a mensagem.
    whatsappNumero: "",
    mensagemPadrao:
      "Olá! Conheci a Nine Action pelo site e gostaria de conversar sobre um projeto para a minha marca.",
    instagram: { usuario: "@nineaction.mkt", url: "https://www.instagram.com/nineaction.mkt/" },
    // Preencha somente com dados oficiais. Itens vazios não aparecem no site.
    email: "",
    cidade: "",
    cnpj: ""
  },

  /* Exibir nomes de clientes nas legendas. Deixe false até ter autorização de cada cliente. */
  mostrarClientes: false,

  /* ------------------------------------------------------------------ */
  /* Nove serviços                                                       */
  /* ------------------------------------------------------------------ */
  servicos: [
    {
      n: "01", nome: "Vídeo",
      descricao: "Produção audiovisual para marcas, empresas, produtos, campanhas e eventos. Pode incluir planejamento, gravação e edição, conforme o escopo contratado.",
      beneficio: "Sua marca ganha imagem em movimento com roteiro, ritmo e acabamento pensados para onde o vídeo vai ser visto.",
      visual: { tipo: "grafico", rotulo: "rec" }
    },
    {
      n: "02", nome: "Fotografia",
      descricao: "Fotografia corporativa, retratos, ensaios, produtos, eventos e registros profissionais.",
      beneficio: "Imagens próprias, com luz e enquadramento cuidados, que dão rosto e credibilidade à comunicação.",
      visual: { tipo: "grafico", rotulo: "foto" }
    },
    {
      n: "03", nome: "Social Media",
      descricao: "Planejamento estratégico, criação de conteúdo e gestão de redes sociais, respeitando a identidade e os objetivos de cada marca.",
      beneficio: "Um perfil com linha editorial clara, constância e conteúdo que conversa com o público certo.",
      visual: { tipo: "grafico", rotulo: "feed" }
    },
    {
      n: "04", nome: "Criação de sites",
      descricao: "Desenvolvimento de sites institucionais, landing pages e experiências digitais adequadas às necessidades do negócio.",
      beneficio: "Um endereço próprio que organiza a apresentação da marca e facilita o contato de quem chega pelas redes.",
      visual: { tipo: "grafico", rotulo: "www" }
    },
    {
      n: "05", nome: "Tráfego pago",
      descricao: "Estruturação e gestão de campanhas de anúncios, com acompanhamento de indicadores relevantes e otimização conforme os objetivos definidos.",
      beneficio: "Investimento em mídia direcionado ao público e ao objetivo de cada campanha, acompanhado por indicadores.",
      visual: { tipo: "grafico", rotulo: "ads" }
    },
    {
      n: "06", nome: "Branding",
      descricao: "Desenvolvimento de identidade visual, posicionamento e elementos que contribuem para uma marca coerente e reconhecível.",
      beneficio: "Uma marca que é reconhecida em qualquer ponto de contato, do perfil ao material impresso.",
      visual: { tipo: "grafico", rotulo: "marca" }
    },
    {
      n: "07", nome: "Estratégia e briefing",
      descricao: "Entendimento do negócio, levantamento de necessidades, definição de objetivos e planejamento da direção criativa.",
      beneficio: "Antes de criar, entendemos o negócio. O briefing orienta cada decisão de conteúdo, formato e canal.",
      visual: { tipo: "grafico", rotulo: "brief" }
    },
    {
      n: "08", nome: "Design",
      descricao: "Criação de peças gráficas, materiais de comunicação, layouts e soluções visuais para diferentes canais e formatos.",
      beneficio: "Peças consistentes com a identidade, prontas para feed, stories, impresso e anúncios.",
      visual: { tipo: "grafico", rotulo: "layout" }
    },
    {
      n: "09", nome: "Storymaker",
      descricao: "Produção de stories e narrativas em tempo real, incluindo bastidores, eventos e experiências de marca.",
      beneficio: "Presença ao vivo nos momentos importantes, com bastidores e cobertura publicados enquanto acontecem.",
      visual: { tipo: "grafico", rotulo: "ao vivo" }
    }
  ],

  /* ------------------------------------------------------------------ */
  /* Portfólio                                                           */
  /* Categorias permitidas. Criação de sites não entra no portfólio.     */
  /* ------------------------------------------------------------------ */
  categorias: [
    {id: "eventos", nome: "Eventos", pasta: "Eventos Vídeos", descricao: "Filmes de eventos, formaturas, casamentos e celebrações, do registro à edição final.", tags: ["Cobertura","Filme","Edição"]},
    {id: "comerciais", nome: "Vídeos comerciais e institucionais", pasta: "Vídeos comerciais e institucionais", descricao: "Vídeos de marca, de produto e institucionais, do roteiro à edição.", tags: ["Roteiro","Gravação","Edição"]},
    {id: "storymaker", nome: "Storymaker", pasta: "Storymaker", descricao: "Stories e bastidores publicados em tempo real, enquanto o evento acontece.", tags: ["Stories","Ao vivo","Bastidores"]},
    {id: "fotografia", nome: "Fotografia", pasta: "Fotografia", descricao: "Ensaios, retratos, eventos e registros com luz e direção cuidadas.", tags: ["Ensaio","Retrato","Evento"], capa: {tipo: "img", src: "assets/img/foto-bailarina-sm.webp", alt: "Retrato de bailarina"}},
    {id: "social", nome: "Social Media", pasta: "Social Média", descricao: "Planejamento, produção e gestão de perfis, com Reels e feed pensados para cada marca.", tags: ["Conteúdo","Reels","Gestão"], capa: {tipo: "video", src: "assets/video/honda-motos-andrade.mp4", poster: "assets/video/honda-motos-andrade.webp", alt: "Reels de concessionária de motos"}},
    {id: "gastronomia", nome: "Gastronomia", pasta: "Gastronomia", descricao: "Comida e produto com apetite visual, para cardápio, feed e anúncio.", tags: ["Food","Produto","Reels"]},
    {id: "branding", nome: "Branding e design", pasta: "Branding e design", descricao: "Identidade visual e peças gráficas coerentes em todos os pontos de contato.", tags: ["Identidade","Peças","Campanhas"], capa: {tipo: "img", src: "assets/img/design-mega-combo-sm.webp", alt: "Peça Mega Combo"}},
    {id: "cases", nome: "Cases reais", pasta: "Cases Reais", descricao: "Capturas do Instagram Insights com os números de perfis atendidos.", tags: ["Insights","Alcance","Resultados"], capa: {tipo: "img", src: "assets/img/case-reel-2mi-sm.webp", alt: "Captura de Insights"}},
    {id: "idv", nome: "IDV Nine Action", pasta: "IDV Nine Action", descricao: "A identidade visual da própria Nine Action: logotipo, versões e paleta.", tags: ["Logo","Paleta","Marca"], capa: {tipo: "img", src: "assets/img/idv-paleta-sm.webp", alt: "Paleta de cores da Nine Action"}},
    {id: "socias", nome: "Foto das sócias", pasta: "Foto das sócias institucional", descricao: "Retrato institucional das sócias da Nine Action.", tags: ["Institucional","Retrato"], capa: {tipo: "img", src: "assets/img/socias-sm.webp", alt: "Sócias da Nine Action"}}
  ],


  /*
   * Itens da galeria. As categorias seguem as pastas do Google Drive da Nine Action.
   * - src/thumb: arquivo otimizado dentro do site.
   * - drive: ID do arquivo no Google Drive (compartilhado como "qualquer pessoa com o link").
   *   Itens só com "drive" aparecem com prévia quando o navegador consegue carregar o Drive;
   *   caso contrário, aparecem como link para assistir no Drive.
   * - formato: "v" (vertical), "h" (horizontal) ou "q" (quadrado).
   */
  portfolio: [
    {tipo: "img", cats: ["fotografia"], titulo: "Ensaio de bailarina", segmento: "Retrato", formato: "v", src: "assets/img/foto-bailarina.webp", thumb: "assets/img/foto-bailarina-sm.webp", alt: "Bailarina de vestido rosa-claro olha por cima do ombro diante de folhagens"},
    {tipo: "video", cats: ["social"], titulo: "Semana de aniversário", segmento: "Concessionária de motos", cliente: "Honda Motos Andrade", formato: "v", detalhe: "Reels · 20 s", src: "assets/video/honda-motos-andrade.mp4", thumb: "assets/video/honda-motos-andrade.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Espetáculo de dança", segmento: "Evento cultural", formato: "v", src: "assets/img/foto-danca.webp", thumb: "assets/img/foto-danca-sm.webp", alt: "Bailarina sorri no palco segurando a saia verde, branca e vermelha"},
    {tipo: "img", cats: ["fotografia"], titulo: "Casamento", segmento: "Retratos de convidados", formato: "v", src: "assets/img/foto-casamento-07.webp", thumb: "assets/img/foto-casamento-07-sm.webp", alt: "Convidada de vestido verde-claro posa sorrindo dentro da igreja"},
    {tipo: "img", cats: ["fotografia"], titulo: "Casamento", segmento: "Retratos de convidados", formato: "v", src: "assets/img/foto-casamento-02.webp", thumb: "assets/img/foto-casamento-02-sm.webp", alt: "Convidada de costas com vestido verde-claro olhando para o altar"},
    {tipo: "img", cats: ["branding"], titulo: "Soluções para o setor agrícola", segmento: "Indústria de bombas e implementos", cliente: "Inova Bombas", formato: "v", src: "assets/img/design-inova-bombas.webp", thumb: "assets/img/design-inova-bombas-sm.webp", alt: "Peça gráfica com tanques agrícolas no campo e o título Soluções completas para o setor agrícola"},
    {tipo: "img", cats: ["branding"], titulo: "1º de Maio", segmento: "Data comemorativa", cliente: "Frajam", formato: "v", src: "assets/img/design-frajam.webp", thumb: "assets/img/design-frajam-sm.webp", alt: "Peça do Dia do Trabalhador com capacete amarelo e a frase A energia do seu trabalho movimenta o mundo"},
    {tipo: "img", cats: ["branding"], titulo: "Mega Combo", segmento: "Hamburgueria", formato: "v", src: "assets/img/design-mega-combo.webp", thumb: "assets/img/design-mega-combo-sm.webp", alt: "Hambúrguer e batatas fritas sob luz neon rosa com o título Mega Combo"},
    {tipo: "img", cats: ["branding"], titulo: "Assessoria do agronegócio", segmento: "Contabilidade rural", cliente: "Contador Agro", formato: "v", src: "assets/img/design-contador-agro.webp", thumb: "assets/img/design-contador-agro-sm.webp", alt: "Peça com logotipo Contador Agro, texto “acessoria financeira especializada no agronegócio” e trator no campo"},
    {tipo: "img", cats: ["social"], titulo: "Feed de concessionária", segmento: "Concessionária de motos", formato: "v", src: "assets/img/feed-motos.webp", thumb: "assets/img/feed-motos-sm.webp", alt: "Captura de tela do feed do Instagram com motos vermelhas e apresentadora de camisa vermelha"},
    {tipo: "img", cats: ["social"], titulo: "Feed de produtos de saúde", segmento: "Loja de produtos hospitalares", formato: "h", src: "assets/img/feed-saude.webp", thumb: "assets/img/feed-saude-sm.webp", alt: "Captura de tela do feed do Instagram com cadeiras de rodas, calçados e apresentadora"},
    {tipo: "img", cats: ["social"], titulo: "Feed de farmácia", segmento: "Farmácia", formato: "h", src: "assets/img/feed-farmacia.webp", thumb: "assets/img/feed-farmacia-sm.webp", alt: "Captura de tela do feed do Instagram em vermelho e branco com conteúdos de saúde"},
    {tipo: "img", cats: ["social"], titulo: "Feed de criadora de conteúdo", segmento: "Universo country", formato: "h", src: "assets/img/feed-country.webp", thumb: "assets/img/feed-country-sm.webp", alt: "Captura de tela do feed do Instagram com pessoas de chapéu de caubói e paisagens rurais"},
    {tipo: "img", cats: ["cases"], titulo: "4.058.391 visualizações", segmento: "Conta de cliente · período personalizado", formato: "v", src: "assets/img/case-conta-4mi.webp", thumb: "assets/img/case-conta-4mi-sm.webp", alt: "Captura do Instagram Insights com 4.058.391 visualizações e 11.408 seguidores líquidos"},
    {tipo: "img", cats: ["cases"], titulo: "2.105.876 visualizações", segmento: "Reels em colaboração", formato: "v", src: "assets/img/case-reel-2mi.webp", thumb: "assets/img/case-reel-2mi-sm.webp", alt: "Captura de Insights de Reels com 2.105.876 visualizações"},
    {tipo: "img", cats: ["cases"], titulo: "1.147.134 visualizações", segmento: "Reels em colaboração", formato: "v", src: "assets/img/case-reel-1mi.webp", thumb: "assets/img/case-reel-1mi-sm.webp", alt: "Captura de Insights de Reels com 1.147.134 visualizações"},
    {tipo: "img", cats: ["cases"], titulo: "280.153 visualizações", segmento: "Reels", formato: "v", src: "assets/img/case-reel-280k.webp", thumb: "assets/img/case-reel-280k-sm.webp", alt: "Captura de Insights de Reels com 280.153 visualizações"},
    {tipo: "img", cats: ["cases"], titulo: "4,0 mi de visualizações nos últimos 30 dias", segmento: "Painel profissional", formato: "h", src: "assets/img/case-painel-4mi.webp", thumb: "assets/img/case-painel-4mi-sm.webp", alt: "Painel profissional do Instagram: 4,0 mi visualizações nos últimos 30 dias"},
    {tipo: "img", cats: ["cases"], titulo: "2,1 mi de visualizações nos últimos 30 dias", segmento: "Painel profissional", formato: "h", src: "assets/img/case-painel-2mi.webp", thumb: "assets/img/case-painel-2mi-sm.webp", alt: "Painel profissional do Instagram: 2,1 mi visualizações nos últimos 30 dias"},
    {tipo: "img", cats: ["idv"], titulo: "Logo para fundo claro", segmento: "Identidade visual", formato: "q", src: "assets/img/idv-logo-fundo-branco.webp", thumb: "assets/img/idv-logo-fundo-branco-sm.webp", alt: "Logo Nine Action Estratégia & Conteúdo em fundo claro"},
    {tipo: "img", cats: ["idv"], titulo: "Logo para fundo escuro", segmento: "Identidade visual", formato: "v", src: "assets/img/idv-logo-fundo-preto.webp", thumb: "assets/img/idv-logo-fundo-preto-sm.webp", alt: "Logo Nine Action Marketing Digital em fundo preto"},
    {tipo: "img", cats: ["idv"], titulo: "Paleta de cores", segmento: "Identidade visual", formato: "q", src: "assets/img/idv-paleta.webp", thumb: "assets/img/idv-paleta-sm.webp", alt: "Paleta de cores: F6F4F8, CF39DE, 9A57D7, 5B2D8B, 2E1A47 e 000000"},
    {tipo: "img", cats: ["idv"], titulo: "Banner da marca", segmento: "Identidade visual", formato: "h", src: "assets/img/idv-banner.webp", thumb: "assets/img/idv-banner.webp", alt: "Banner roxo com logo Nine Action Marketing Digital"},
    {tipo: "img", cats: ["socias"], titulo: "Sócias da Nine Action", segmento: "Retrato institucional", formato: "v", src: "assets/img/socias.webp", thumb: "assets/img/socias-sm.webp", alt: "As duas sócias da Nine Action de costas uma para a outra, com bastão de luz e câmera"},
    {tipo: "video", cats: ["eventos"], titulo: "Retrospectiva 2025", segmento: "Escola técnica", cliente: "Etec", formato: "h", src: "assets/video/eventos-retrospectiva-2025.mp4", thumb: "assets/video/eventos-retrospectiva-2025.webp", detalhe: "Horizontal · 62 s", alt: "Retrospectiva 2025, Escola técnica"},
    {tipo: "video", cats: ["eventos"], titulo: "Vídeo oficial de casamento", segmento: "Casamento", cliente: "Letícia & João Pedro", formato: "h", src: "assets/video/eventos-video-oficial-de-casamento.mp4", thumb: "assets/video/eventos-video-oficial-de-casamento.webp", detalhe: "Destaques do filme · 60 s", alt: "Vídeo oficial de casamento, Casamento"},
    {tipo: "video", cats: ["eventos"], titulo: "Revelando SP", segmento: "Evento musical", cliente: "Sonare", formato: "v", src: "assets/video/eventos-revelando-sp.mp4", thumb: "assets/video/eventos-revelando-sp.webp", detalhe: "Vertical · 57 s", alt: "Revelando SP, Evento musical"},
    {tipo: "video", cats: ["eventos"], titulo: "Homenagens", segmento: "Evento", formato: "h", src: "assets/video/eventos-homenagens.mp4", thumb: "assets/video/eventos-homenagens.webp", detalhe: "Destaques do filme · 60 s", alt: "Homenagens, Evento"},
    {tipo: "video", cats: ["eventos"], titulo: "Semana Paulo Freire", segmento: "Escola técnica", cliente: "Etec", formato: "v", src: "assets/video/eventos-semana-paulo-freire.mp4", thumb: "assets/video/eventos-semana-paulo-freire.webp", detalhe: "Vertical · 43 s", alt: "Semana Paulo Freire, Escola técnica"},
    {tipo: "video", cats: ["eventos"], titulo: "Gincana", segmento: "Escola técnica", cliente: "Etec", formato: "v", src: "assets/video/eventos-gincana.mp4", thumb: "assets/video/eventos-gincana.webp", detalhe: "Vertical · 46 s", alt: "Gincana, Escola técnica"},
    {tipo: "video", cats: ["eventos"], titulo: "Integração", segmento: "Escola técnica", cliente: "Etec", formato: "v", src: "assets/video/eventos-integracao.mp4", thumb: "assets/video/eventos-integracao.webp", detalhe: "Vertical · 47 s", alt: "Integração, Escola técnica"},
    {tipo: "video", cats: ["eventos"], titulo: "Making of do Vestibulinho", segmento: "Escola técnica", cliente: "Etec", formato: "v", src: "assets/video/eventos-making-of-do-vestibulinho.mp4", thumb: "assets/video/eventos-making-of-do-vestibulinho.webp", detalhe: "Vertical · 27 s", alt: "Making of do Vestibulinho, Escola técnica"},
    {tipo: "video", cats: ["comerciais"], titulo: "Lentes em resina", segmento: "Odontologia estética", formato: "v", detalhe: "Vertical · 55 s", src: "assets/video/comerciais-lentes-em-resina.mp4", thumb: "assets/video/comerciais-lentes-em-resina.webp", alt: "Lentes em resina, Odontologia estética"},
    {tipo: "video", cats: ["comerciais"], titulo: "Vestibulinho", segmento: "Escola técnica", cliente: "Etec", formato: "v", src: "assets/video/comerciais-vestibulinho.mp4", thumb: "assets/video/comerciais-vestibulinho.webp", detalhe: "Vertical · 31 s", alt: "Vestibulinho, Escola técnica"},
    {tipo: "video", cats: ["comerciais"], titulo: "Vídeo institucional odontológico", segmento: "Odontologia", cliente: "Dr. Francisco · Yunes Odontologia", formato: "v", src: "assets/video/comerciais-video-institucional-odontologico.mp4", thumb: "assets/video/comerciais-video-institucional-odontologico.webp", detalhe: "Vertical · 51 s", alt: "Vídeo institucional odontológico, Odontologia"},
    {tipo: "video", cats: ["comerciais"], titulo: "Diagnóstico por imagem", segmento: "Clínica de diagnóstico", cliente: "Dra. Renata · DVI Diagnósticos", formato: "v", src: "assets/video/comerciais-diagnostico-por-imagem.mp4", thumb: "assets/video/comerciais-diagnostico-por-imagem.webp", detalhe: "Vertical · 51 s", alt: "Diagnóstico por imagem, Clínica de diagnóstico"},
    {tipo: "video", cats: ["comerciais"], titulo: "Implantes", segmento: "Odontologia", cliente: "Dr. Luis Cabral", formato: "v", src: "assets/video/comerciais-implantes.mp4", thumb: "assets/video/comerciais-implantes.webp", detalhe: "Trecho de 60 s", alt: "Implantes, Odontologia"},
    {tipo: "video", cats: ["comerciais"], titulo: "Reels de topo de funil", segmento: "Odontologia", cliente: "Dr. Luis Cabral", formato: "v", src: "assets/video/comerciais-reels-de-topo-de-funil.mp4", thumb: "assets/video/comerciais-reels-de-topo-de-funil.webp", detalhe: "Vertical · 11 s", alt: "Reels de topo de funil, Odontologia"},
    {tipo: "video", cats: ["comerciais"], titulo: "Mês das Mulheres", segmento: "Saúde", cliente: "Dra. Juliana", formato: "v", src: "assets/video/comerciais-mes-das-mulheres.mp4", thumb: "assets/video/comerciais-mes-das-mulheres.webp", detalhe: "Vertical · 25 s", alt: "Mês das Mulheres, Saúde"},
    {tipo: "video", cats: ["comerciais"], titulo: "Campanha eleitoral", segmento: "Comunicação política", cliente: "Guilherme Rodriguez", formato: "v", src: "assets/video/comerciais-campanha-eleitoral.mp4", thumb: "assets/video/comerciais-campanha-eleitoral.webp", detalhe: "Vertical · 47 s", alt: "Campanha eleitoral, Comunicação política"},
    {tipo: "video", cats: ["storymaker"], titulo: "Cobertura em stories 01", segmento: "Storymaker", formato: "v", src: "assets/video/storymaker-cobertura-em-stories-01.mp4", thumb: "assets/video/storymaker-cobertura-em-stories-01.webp", detalhe: "Vertical · 29 s", alt: "Cobertura em stories 01, Storymaker"},
    {tipo: "video", cats: ["storymaker"], titulo: "Cobertura em stories 02", segmento: "Storymaker", formato: "v", src: "assets/video/storymaker-cobertura-em-stories-02.mp4", thumb: "assets/video/storymaker-cobertura-em-stories-02.webp", detalhe: "Vertical · 42 s", alt: "Cobertura em stories 02, Storymaker"},
    {tipo: "video", cats: ["storymaker"], titulo: "Cobertura em stories 03", segmento: "Storymaker", formato: "v", src: "assets/video/storymaker-cobertura-em-stories-03.mp4", thumb: "assets/video/storymaker-cobertura-em-stories-03.webp", detalhe: "Vertical · 43 s", alt: "Cobertura em stories 03, Storymaker"},
    {tipo: "video", cats: ["storymaker"], titulo: "Cobertura em stories 04", segmento: "Storymaker", formato: "v", src: "assets/video/storymaker-cobertura-em-stories-04.mp4", thumb: "assets/video/storymaker-cobertura-em-stories-04.webp", detalhe: "Vertical · 35 s", alt: "Cobertura em stories 04, Storymaker"},
    {tipo: "img", cats: ["fotografia"], titulo: "Fotografia de produto", segmento: "Gastronomia", formato: "v", alt: "Hambúrguer com queijo sobre tábua de madeira, com luzes desfocadas ao fundo", src: "assets/img/fotografia-fotografia.webp", thumb: "assets/img/fotografia-fotografia-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Decoração de festa", segmento: "Evento infantil", formato: "h", alt: "Mesa de festa infantil decorada em azul e verde com balões", src: "assets/img/fotografia-fotografia-2.webp", thumb: "assets/img/fotografia-fotografia-2-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Festa de aniversário", segmento: "Evento infantil", formato: "v", alt: "Avô segura o neto no colo durante festa de aniversário", src: "assets/img/fotografia-fotografia-3.webp", thumb: "assets/img/fotografia-fotografia-3-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Festa de aniversário", segmento: "Evento infantil", formato: "v", alt: "Menino de cabelo cacheado sorri durante a festa", src: "assets/img/fotografia-fotografia-4.webp", thumb: "assets/img/fotografia-fotografia-4-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Retrato profissional", segmento: "Retrato corporativo", formato: "v", alt: "Mulher de terno azul-claro sorri em pé no escritório", src: "assets/img/fotografia-fotografia-5.webp", thumb: "assets/img/fotografia-fotografia-5-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Retrato profissional", segmento: "Retrato corporativo", formato: "v", alt: "Mulher de terno azul-claro sorri sentada à mesa", src: "assets/img/fotografia-fotografia-6.webp", thumb: "assets/img/fotografia-fotografia-6-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Bastidores do atendimento", segmento: "Odontologia", formato: "v", alt: "Mãos de dentista com luvas durante atendimento", src: "assets/img/fotografia-fotografia-7.webp", thumb: "assets/img/fotografia-fotografia-7-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Ensaio em família", segmento: "Família", formato: "v", alt: "Pai segura o filho no colo ao ar livre", src: "assets/img/fotografia-fotografia-8.webp", thumb: "assets/img/fotografia-fotografia-8-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Ensaio em família", segmento: "Família", formato: "v", alt: "Casal de óculos escuros com o filho no colo, todos de amarelo", src: "assets/img/fotografia-fotografia-9.webp", thumb: "assets/img/fotografia-fotografia-9-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Ensaio ao pôr do sol", segmento: "Retrato", formato: "v", alt: "Mulher de vestido claro sob a luz do fim de tarde", src: "assets/img/fotografia-fotografia-10.webp", thumb: "assets/img/fotografia-fotografia-10-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Ensaio de bailarina", segmento: "Retrato", formato: "v", alt: "Bailarina de vestido branco em pose de dança no jardim", src: "assets/img/fotografia-fotografia-11.webp", thumb: "assets/img/fotografia-fotografia-11-sm.webp"},
    {tipo: "img", cats: ["fotografia"], titulo: "Smash the cake", segmento: "Ensaio infantil", formato: "v", alt: "Menino come bolo de aniversário de 2 anos sentado na grama", src: "assets/img/fotografia-fotografia-12.webp", thumb: "assets/img/fotografia-fotografia-12-sm.webp"},
    {tipo: "video", cats: ["social"], titulo: "Treinamento Ferradura", segmento: "Universo equestre", cliente: "Lara Prado", formato: "v", src: "assets/video/social-treinamento-ferradura.mp4", thumb: "assets/video/social-treinamento-ferradura.webp", detalhe: "Vertical · 46 s", alt: "Treinamento Ferradura, Universo equestre"},
    {tipo: "video", cats: ["social"], titulo: "Reels de produto", segmento: "Produtos", formato: "v", src: "assets/video/social-reels-de-produto.mp4", thumb: "assets/video/social-reels-de-produto.webp", detalhe: "Vertical · 40 s", alt: "Reels de produto, Produtos"},
    {tipo: "video", cats: ["gastronomia"], titulo: "Porção recheada", segmento: "Restaurante", formato: "v", src: "assets/video/gastronomia-porcao-recheada.mp4", thumb: "assets/video/gastronomia-porcao-recheada.webp", detalhe: "Vertical · 44 s", alt: "Porção recheada, Restaurante"},
    {tipo: "video", cats: ["gastronomia"], titulo: "Todo mundo ama o Maik", segmento: "Restaurante", cliente: "Toca Gourmet do Maik", formato: "v", src: "assets/video/gastronomia-todo-mundo-ama-o-maik.mp4", thumb: "assets/video/gastronomia-todo-mundo-ama-o-maik.webp", detalhe: "Vertical · 34 s", alt: "Todo mundo ama o Maik, Restaurante"},
    {tipo: "video", cats: ["gastronomia"], titulo: "Tem coisas que o alface não cura", segmento: "Restaurante", formato: "v", src: "assets/video/gastronomia-tem-coisas-que-o-alface-nao-cura.mp4", thumb: "assets/video/gastronomia-tem-coisas-que-o-alface-nao-cura.webp", detalhe: "Vertical · 7 s", alt: "Tem coisas que o alface não cura, Restaurante"}
  ],



  /*
   * Materiais que estão no Google Drive e ainda não foram enviados em versão para o site.
   * Não aparecem na página. Quando o arquivo for enviado, mova o item para "portfolio" com src e thumb.
   */
  pendentes: [

  ],




  /*
   * Projetos em destaque (até seis). Campos vazios não aparecem no site.
   * Preencha objetivo, solução e resultado apenas com informações reais.
   */
  destaques: [
    {
      categoria: "Social Media",
      titulo: "Concessionária de motos",
      segmento: "Varejo de motocicletas",
      cliente: "Honda Motos Andrade",
      servicos: [
        "Social Media",
        "Vídeo",
        "Design"
      ],
      entrega: "Feed, Reels e campanhas sazonais",
      objetivo: "",
      solucao: "",
      resultado: "",
      midia: {
        tipo: "video",
        src: "assets/video/honda-motos-andrade.mp4",
        poster: "assets/video/honda-motos-andrade.webp",
        alt: "Apresentadora de camisa vermelha ao lado de moto vermelha"
      },
      apoio: {
        src: "assets/img/feed-motos-sm.webp",
        alt: "Feed do Instagram da concessionária"
      }
    },
    {
      categoria: "Fotografia",
      titulo: "Retrato, palco e cerimônia",
      segmento: "Ensaios e eventos",
      servicos: [
        "Fotografia"
      ],
      entrega: "Ensaio de bailarina, espetáculo de dança e casamento",
      objetivo: "",
      solucao: "",
      resultado: "",
      midia: {
        tipo: "img",
        src: "assets/img/foto-bailarina.webp",
        alt: "Retrato de bailarina de vestido rosa-claro diante de folhagens"
      },
      apoio: {
        src: "assets/img/foto-danca-sm.webp",
        alt: "Bailarina em apresentação de palco"
      }
    },
    {
      categoria: "Branding e design",
      titulo: "Peças para quatro marcas",
      segmento: "Agro, indústria, alimentação e serviços",
      servicos: [
        "Design",
        "Branding"
      ],
      entrega: "Peças para redes sociais e material institucional",
      objetivo: "",
      solucao: "",
      resultado: "",
      midia: {
        tipo: "img",
        src: "assets/img/design-mega-combo.webp",
        alt: "Peça Mega Combo"
      },
      apoio: {
        src: "assets/img/design-inova-bombas-sm.webp",
        alt: "Peça para o setor agrícola"
      }
    }
  ],


  /* ------------------------------------------------------------------ */
  /* Cases e resultados                                                  */
  /* Somente dados presentes nas capturas do Instagram Insights enviadas. */
  /* ------------------------------------------------------------------ */
  cases: [
    {
      rotulo: "Conta de cliente · período personalizado",
      contexto: "Todos os conteúdos da conta no período selecionado no Instagram Insights (o gráfico vai de meados de agosto a meados de setembro).",
      destaque: { valor: 4058391, texto: "visualizações" },
      metricas: [
        { valor: 1711900, texto: "visualizadores (contas únicas)" },
        { valor: 11408, prefixo: "+", texto: "seguidores líquidos" },
        { valorTexto: "3,1 mi", texto: "visualizações vindas de Reels" }
      ],
      fonte: "assets/img/case-conta-4mi.webp",
      fonteAlt: "Captura do Instagram Insights com 4.058.391 visualizações e 11.408 seguidores líquidos"
    },
    {
      rotulo: "Reels em colaboração",
      contexto: "Números de um único Reels, publicado em colaboração e cruzado no Facebook.",
      destaque: { valor: 2105876, texto: "visualizações" },
      metricas: [
        { valor: 1476889, texto: "visualizadores" },
        { valor: 2658, texto: "seguidores a partir do Reels" },
        { valorTexto: "15,2 mil", texto: "compartilhamentos" }
      ],
      fonte: "assets/img/case-reel-2mi.webp",
      fonteAlt: "Captura de Insights de Reels com 2.105.876 visualizações"
    },
    {
      rotulo: "Reels em colaboração",
      contexto: "Números de um único Reels gravado em rodeio, publicado em colaboração.",
      destaque: { valor: 1147134, texto: "visualizações" },
      metricas: [
        { valor: 822178, texto: "visualizadores" },
        { valor: 1643, texto: "seguidores a partir do Reels" },
        { valorTexto: "9,2 mil", texto: "compartilhamentos" }
      ],
      fonte: "assets/img/case-reel-1mi.webp",
      fonteAlt: "Captura de Insights de Reels com 1.147.134 visualizações"
    },
    {
      rotulo: "Reels",
      contexto: "Números de um único Reels cruzado no Facebook.",
      destaque: { valor: 280153, texto: "visualizações" },
      metricas: [
        { valor: 227194, texto: "visualizadores" },
        { valor: 2554, texto: "seguidores a partir do Reels" },
        { valorTexto: "3,8 mil", texto: "compartilhamentos" }
      ],
      fonte: "assets/img/case-reel-280k.webp",
      fonteAlt: "Captura de Insights de Reels com 280.153 visualizações"
    }
  ],
  // Capturas do painel profissional (exibidas como registros complementares).
  painel: [
    { texto: "4,0 mi de visualizações nos últimos 30 dias", src: "assets/img/case-painel-4mi.webp", alt: "Painel profissional do Instagram: 4,0 mi visualizações nos últimos 30 dias" },
    { texto: "2,1 mi de visualizações nos últimos 30 dias", src: "assets/img/case-painel-2mi.webp", alt: "Painel profissional do Instagram: 2,1 mi visualizações nos últimos 30 dias" }
  ],

  /* ------------------------------------------------------------------ */
  /* Formulário de análise                                               */
  /* ------------------------------------------------------------------ */
  analise: {
    objetivos: ["Alcançar novas pessoas", "Fortalecer o posicionamento", "Melhorar o conteúdo", "Atrair clientes", "Melhorar a apresentação da marca"],
    dificuldades: ["Baixo alcance", "Falta de estratégia", "Pouca consistência", "Dificuldade para gerar oportunidades", "Identidade visual inconsistente"]
  },

  /* Quem somos. Nomes das sócias: preencha quando quiser exibi-los. */
  socias: []
};
