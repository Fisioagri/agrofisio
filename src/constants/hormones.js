// Mapa hormonal por estádio fenológico
// Fontes: Kerbauy (2008), Taiz & Zeiger (2017), Marschner (2012)

export const HORMONE_STYLE = {
  'Auxina':           { bg: 'bg-yellow-50',  border: 'border-yellow-400', text: 'text-yellow-800',  dot: 'bg-yellow-400',  sigla: 'AUX' },
  'Citocinina':       { bg: 'bg-green-50',   border: 'border-green-500',  text: 'text-green-800',   dot: 'bg-green-500',   sigla: 'CK'  },
  'Giberelina':       { bg: 'bg-blue-50',    border: 'border-blue-500',   text: 'text-blue-800',    dot: 'bg-blue-500',    sigla: 'GA'  },
  'Etileno':          { bg: 'bg-red-50',     border: 'border-red-400',    text: 'text-red-800',     dot: 'bg-red-400',     sigla: 'ET'  },
  'ABA':              { bg: 'bg-orange-50',  border: 'border-orange-500', text: 'text-orange-800',  dot: 'bg-orange-500',  sigla: 'ABA' },
  'Brasinoesteroide': { bg: 'bg-purple-50',  border: 'border-purple-500', text: 'text-purple-800',  dot: 'bg-purple-500',  sigla: 'BR'  },
  'Jasmonato':        { bg: 'bg-teal-50',    border: 'border-teal-500',   text: 'text-teal-800',    dot: 'bg-teal-500',    sigla: 'JA'  },
}

export const STAGE_ICON = {
  VE: '🌱', VC: '🌿',
  V1: '🌿', V2: '🌿', V3: '🌿', V4: '🌿', V5: '🌿', V6: '🌿',
  V7: '🌿', V8: '🌿', V9: '🌿',
  V10: '🌽', V11: '🌽', V12: '🌽', V13: '🌽', V14: '🌽', V15: '🌽', V16: '🌽',
  VT: '🌾',
  R1: '🌸', R2: '🌸',
  R3: '🫛', R4: '🫛',
  R5: '🫛', 'R5.1': '🫛', 'R5.2': '🫛', 'R5.3': '🫛', 'R5.4': '🫛', 'R5.5': '🫛',
  R6: '🌾', R7: '🌾', R8: '🌾', R9: '🌾',
}

export const FASE_LABEL = (estadio) => {
  if (!estadio) return ''
  if (estadio === 'VE') return 'Germinação e emergência'
  if (estadio === 'VC') return 'Fase vegetativa inicial'
  if (estadio.startsWith('V'))  return 'Fase vegetativa'
  if (estadio === 'VT')         return 'Pendoamento (milho)'
  if (['R1','R2'].includes(estadio)) return 'Fase reprodutiva — florescimento'
  if (['R3','R4'].includes(estadio)) return 'Fase reprodutiva — formação de vagens'
  if (estadio.startsWith('R5')) return 'Fase reprodutiva — enchimento de grão'
  if (['R6','R7','R8','R9'].includes(estadio)) return 'Fase reprodutiva — maturação'
  return 'Fase reprodutiva'
}

// ─── Soja ───────────────────────────────────────────────────────────────────
export const HORMONES_SOJA = {
  VE: {
    ativos: ['Giberelina', 'Auxina', 'Citocinina'],
    detalhes: {
      'Giberelina':  'Mobiliza reservas do endosperma e estimula elongação do hipocótilo',
      'Auxina':      'Promove elongação e gravitropismo da radícula',
      'Citocinina':  'Ativa divisão celular nas raízes primárias',
    },
  },
  VC: {
    ativos: ['Giberelina', 'Auxina', 'Citocinina'],
    detalhes: {
      'Giberelina':  'Expansão dos cotilédones e desenvolvimento do epicótilo',
      'Auxina':      'Dominância apical e direcionamento do crescimento caulinar',
      'Citocinina':  'Ativa raízes laterais para absorção de nutrientes iniciais',
    },
  },
  V1: {
    ativos: ['Auxina', 'Citocinina', 'Giberelina', 'Brasinoesteroide'],
    detalhes: {
      'Auxina':          'Dominância apical e expansão da lâmina foliar',
      'Citocinina':      'Coordena ramificação dos primeiros nós',
      'Giberelina':      'Elongação dos entrenós iniciais',
      'Brasinoesteroide':'Inicia expansão e espessamento celular nas folhas',
    },
  },
  V2: {
    ativos: ['Auxina', 'Citocinina', 'Giberelina', 'Brasinoesteroide'],
    detalhes: {
      'Auxina':          'Define arquitetura vegetativa — crítica para o engalhamento',
      'Citocinina':      'Ativa gemas axilares — determina número de ramos produtivos',
      'Giberelina':      'Elongação internodal e expansão foliar',
      'Brasinoesteroide':'Regula síntese de carboidratos e expansão celular',
    },
  },
  V3: {
    ativos: ['Auxina', 'Giberelina', 'Brasinoesteroide', 'Citocinina'],
    detalhes: {
      'Auxina':          'Elongação do caule e dominância apical',
      'Giberelina':      'Crescimento rápido de entrenós e folhas',
      'Brasinoesteroide':'Expansão celular e síntese de parede celular',
      'Citocinina':      'Ramificação lateral e divisão celular nas gemas',
    },
  },
  V4: {
    ativos: ['Auxina', 'Giberelina', 'Brasinoesteroide', 'Citocinina'],
    detalhes: {
      'Auxina':          'Crescimento vegetativo intenso — pico de síntese de IAA',
      'Giberelina':      'Elongação e diferenciação de entrenós produtivos',
      'Brasinoesteroide':'Regulação do metabolismo de carboidratos e síntese de proteínas',
      'Citocinina':      'Ramificação ativa — fase crítica para estrutura vegetativa',
    },
  },
  V5: {
    ativos: ['Auxina', 'Giberelina', 'Brasinoesteroide'],
    detalhes: {
      'Auxina':          'Dominância apical e crescimento rápido',
      'Giberelina':      'Máxima elongação de entrenós e área foliar',
      'Brasinoesteroide':'Expansão foliar e preparo para diferenciação reprodutiva',
    },
  },
  V6: {
    ativos: ['Auxina', 'Giberelina', 'Brasinoesteroide', 'Etileno'],
    detalhes: {
      'Auxina':          'Dominância apical — inicia sinalização reprodutiva',
      'Giberelina':      'Crescimento vegetativo residual — inicia regulação floral',
      'Brasinoesteroide':'Estabiliza membranas e paredes celulares',
      'Etileno':         'Inicia diferenciação de gemas florais nos nós',
    },
  },
  R1: {
    ativos: ['Auxina', 'Etileno', 'Brasinoesteroide', 'Citocinina'],
    detalhes: {
      'Auxina':          'Pegamento floral e inibição da abscisão de flores',
      'Etileno':         'Abertura das flores e receptividade do estigma',
      'Brasinoesteroide':'Viabilidade do pólen e fertilização',
      'Citocinina':      'Divisão celular nas gemas florais e primórdios de vagens',
    },
  },
  R2: {
    ativos: ['Citocinina', 'Auxina', 'Giberelina', 'Brasinoesteroide', 'ABA'],
    detalhes: {
      'Citocinina':      'Síntese máxima nas raízes e nódulos de Bradyrhizobium. Exportada para flores — sustenta pegamento de vagens e divisão celular embrionária',
      'Auxina':          'Estabiliza flores abertas — inicia desenvolvimento das sementes. Inibe abscisão floral',
      'Giberelina':      'Estimula crescimento do tubo polínico e desenvolvimento inicial do embrião',
      'Brasinoesteroide':'Fertilização e desenvolvimento do endosperma — viabilidade do pólen',
      'ABA':             'Inicia regulação hídrica e reserva de energia para o enchimento futuro',
    },
  },
  R3: {
    ativos: ['Citocinina', 'Auxina', 'ABA', 'Jasmonato'],
    detalhes: {
      'Citocinina': 'Divisão celular nas sementes em formação — hormônio dominante nesta fase',
      'Auxina':     'Estabiliza vagens e previne aborto embrionário em condições de estresse',
      'ABA':        'Aumenta em condições de estresse — pode causar aborto de vagens sob seca intensa',
      'Jasmonato':  'Defesa das vagens contra patógenos e herbivoria — induz mecanismos de proteção',
    },
  },
  R4: {
    ativos: ['Citocinina', 'ABA', 'Auxina', 'Jasmonato'],
    detalhes: {
      'Citocinina': 'Divisão celular acelerada nas sementes — máxima demanda por N e P',
      'ABA':        'Regula abertura estomática e previne dessecação das sementes',
      'Auxina':     'Expansão final das sementes e manutenção da estrutura das vagens',
      'Jasmonato':  'Ativa defesas contra insetos e contribui para acúmulo de proteínas de reserva',
    },
  },
  R5: {
    ativos: ['Citocinina', 'ABA', 'Auxina', 'Jasmonato'],
    detalhes: {
      'Citocinina': 'Ativa síntese de proteínas de reserva (glicinina, β-conglicinina) e óleo — fase crítica para qualidade',
      'ABA':        'Regula acúmulo de amido e proteínas — induz tolerância à seca nos grãos',
      'Auxina':     'Estabiliza sementes em expansão — mantém integridade da vagem',
      'Jasmonato':  'Inicia sinalização para acúmulo de lipídeos e proteínas de reserva',
    },
  },
  'R5.1': {
    ativos: ['Citocinina', 'ABA', 'Jasmonato'],
    detalhes: {
      'Citocinina': 'Alta atividade na síntese de proteínas e particionamento de N para os grãos',
      'ABA':        'Cresce progressivamente — inicia programa de maturação e acúmulo de reservas',
      'Jasmonato':  'Sinaliza particionamento de carboidratos e nitrogênio para os grãos',
    },
  },
  'R5.2': {
    ativos: ['Citocinina', 'ABA', 'Jasmonato'],
    detalhes: {
      'Citocinina': 'Pico de síntese de proteínas de reserva — demanda máxima por N e S',
      'ABA':        'Coordena particionamento de fotoassimilados das folhas para os grãos',
      'Jasmonato':  'Promove acúmulo de oleosinas e proteínas de armazenamento',
    },
  },
  'R5.3': {
    ativos: ['ABA', 'Citocinina', 'Jasmonato', 'Etileno'],
    detalhes: {
      'ABA':        'Passa a ser dominante — controla abertura estomática e finaliza acúmulo de proteínas',
      'Citocinina': 'Ainda ativa na síntese final de proteínas de reserva e óleo',
      'Jasmonato':  'Inicia senescência coordenada — mobilização de N foliar para os grãos',
      'Etileno':    'Primeiros sinais — inicia amarelecimento das folhas basais mais velhas',
    },
  },
  'R5.4': {
    ativos: ['ABA', 'Etileno', 'Jasmonato'],
    detalhes: {
      'ABA':       'Prepara grão para desidratação e finaliza acúmulo de reservas',
      'Etileno':   'Inicia senescência foliar ativa — remobilização de N, Mg, K para o grão',
      'Jasmonato': 'Acelera degradação de clorofila e remobilização de N das folhas senescentes',
    },
  },
  'R5.5': {
    ativos: ['ABA', 'Etileno', 'Jasmonato'],
    detalhes: {
      'ABA':       'Nível máximo — completa desidratação e maturação dos grãos',
      'Etileno':   'Acelera senescência foliar e remobilização final de N, K, Mg',
      'Jasmonato': 'Finaliza senescência — prepara vagens para dehiscência',
    },
  },
  R6: {
    ativos: ['ABA', 'Etileno', 'Jasmonato'],
    detalhes: {
      'ABA':       'Controla desidratação progressiva das sementes (70% → 30% umidade)',
      'Etileno':   'Senescência foliar acelerada — remobilização completa de nutrientes para grãos',
      'Jasmonato': 'Promove abscisão foliar e coordena senescência final da planta',
    },
  },
  R7: {
    ativos: ['ABA', 'Etileno', 'Jasmonato'],
    detalhes: {
      'ABA':       'Finaliza maturação — grão atinge máximo de matéria seca',
      'Etileno':   'Coordena senescência final e prepara abertura de vagens',
      'Jasmonato': 'Completa o programa de senescência — promove dehiscência das vagens',
    },
  },
  R8: {
    ativos: ['Etileno', 'Jasmonato', 'ABA'],
    detalhes: {
      'Etileno':   'Abertura de vagens, queda de folhas e secagem final do grão — senescência total',
      'Jasmonato': 'Promotor final da dehiscência das vagens e senescência completa',
      'ABA':       'Mantém dormência da semente após a maturação completa',
    },
  },
}

// ─── Milho (completo — todos os estádios V1-V16, VT, R1-R6) ─────────────────
// Fontes: DuPont Pioneer (2015) Corn Growth and Development;
//         Taiz & Zeiger (2013); Marschner (2012);
//         Embrapa Milho e Sorgo (2010)
export const HORMONES_MILHO = {
  VE: {
    ativos: ['Giberelina','Auxina','Citocinina'],
    detalhes: {
      'Giberelina':  'Mobiliza reservas do endosperma; promove elongação do coleóptilo e mesocótilo que posiciona a coroa a ~2 cm de profundidade; luz inibe o mesocótilo (fixando a coroa)',
      'Auxina':      'Gravitropismo da radícula (raiz cresce para baixo); orienta o coleóptilo para a superfície; produzida no coleóptilo e transportada para a radícula',
      'Citocinina':  'Ativa divisão celular nas raízes nodais primárias (coroa); sinaliza condições de solo para os meristemas aéreos',
    },
  },
  V1: {
    ativos: ['Auxina','Giberelina','Citocinina'],
    detalhes: {
      'Auxina':      '1ª folha verdadeira (ponta arredondada — identificador de V1); dominância apical do meristema foliar; gravitropismo das raízes nodais',
      'Giberelina':  'Elongação da bainha e lâmina da 1ª folha; crescimento do meristema intercalar',
      'Citocinina':  'Divisão celular nas raízes nodais — sistema radicular permanente iniciando; sinaliza N e P disponível para as folhas',
    },
  },
  V2: {
    ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],
    detalhes: {
      'Auxina':      'Dominância apical; crescimento do meristema apical; síntese de IAA dependente de Zn (triptofano sintase) — DEFICIÊNCIA DE Zn = MANCHA BRANCA em V2-V4',
      'Giberelina':  'Elongação das bainhas foliares e internós basais; crescimento em comprimento do caule',
      'Brasinoesteroide': 'Expansão das células foliares e síntese de parede celular; coordena crescimento foliar com condições de temperatura',
      'Citocinina':  'Raiz seminal ainda ativa; raízes nodais crescem — citocinina exportada para folhas sustenta crescimento',
    },
  },
  V3: {
    ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],
    detalhes: {
      'Auxina':      'Ponto de crescimento ainda abaixo do solo (~2 cm); protegido de injúrias mecânicas; IAA drive crescimento internodal',
      'Giberelina':  'Elongação foliar acelerada; início de diferenciação dos primórdios de folhas superiores',
      'Brasinoesteroide': 'Expansão celular e síntese de celulose na parede — biomassa foliar aumenta rapidamente',
      'Citocinina':  'Raiz seminal começa a ceder para raízes nodais permanentes; divisão celular intensa no meristema',
    },
  },
  V4: {
    ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],
    detalhes: {
      'Auxina':      'Crescimento vegetativo intenso — pico de síntese de IAA nas folhas jovens; dominância apical forte',
      'Giberelina':  'Elongação e diferenciação dos internós; elongação da lâmina foliar; altura da planta aumenta rapidamente',
      'Brasinoesteroide': 'Regulação da síntese de carboidratos; expansão celular coordenada com temperatura e luz',
      'Citocinina':  'Divisão celular no meristema apical; coordena o crescimento com a disponibilidade de N e P via sinalização radicular',
    },
  },
  V5: {
    ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],
    detalhes: {
      'Auxina':      'Raiz seminal cessa absorção (~V3-V5); raízes nodais dominam; IAA coordena arquitetura radicular',
      'Giberelina':  'Máxima elongação internodal dos internós basais; área foliar aumenta exponencialmente',
      'Brasinoesteroide': 'Espessamento da parede celular nos entrenós; tolerância mecânica ao vento aumenta',
      'Citocinina':  'Exportada das raízes nodais para folhas — sinaliza qualidade do solo para regulação de crescimento',
    },
  },
  V6: {
    ativos: ['Auxina','Giberelina','Citocinina','Brasinoesteroide'],
    detalhes: {
      'Auxina':      'PONTO DE CRESCIMENTO SOBE ACIMA DO SOLO — planta agora vulnerável a injúrias; IAA regula elongação rápida de internós; dominância apical intensa',
      'Giberelina':  'PICO de elongação internodal; internós se alongam visivelmente dia a dia; diferenciação dos nós superiores; GA necessita de K para síntese eficiente',
      'Citocinina':  'FASE CRÍTICA — absorção de N de todo o ciclo começa a escalar aqui; CK sinaliza disponibilidade de N para regulação do crescimento; >60% do N total é absorvido entre V6-R1',
      'Brasinoesteroide': 'Expansão foliar máxima; IAI (Índice de Área Foliar) cresce rapidamente; síntese de proteínas fotossintéticas aumenta',
    },
  },
  V7: {
    ativos: ['Citocinina','Auxina','Giberelina'],
    detalhes: {
      'Citocinina':  'FASE MAIS CRÍTICA PARA NÚMERO DE FILEIRAS: CK controla o número de divisões celulares na circunferência do primórdio da espiga — determina número de fileiras (sempre par: 14-16-18-20); estresse de N, K ou seca em V7 = menos fileiras permanentemente',
      'Auxina':      'Diferenciação floral no pendão (inicia primórdios masculinos); dominância apical continua regulando razão pendão/espiga',
      'Giberelina':  'Elongação intensa de internós centrais; define arquitetura de altura da planta; GA elevado favorece elongação sobre espessamento',
    },
  },
  V8: {
    ativos: ['Citocinina','Giberelina','Auxina','Brasinoesteroide'],
    detalhes: {
      'Citocinina':  'Início da determinação do número de grãos por fileira — divisão celular nos óvulos da espiga primária; N e K adequados nesta fase = mais grãos por fileira',
      'Giberelina':  'Elongação máxima de internós; maior velocidade de crescimento diário da planta; GA em sinergia com temperatura elevada',
      'Auxina':      'Primórdios florais do pendão em desenvolvimento; espiga primária visível em dissecção a ~V9',
      'Brasinoesteroide': 'Expansão celular coordenada; síntese de parede celular nos internós em elongação',
    },
  },
  V9: {
    ativos: ['Citocinina','Auxina','Giberelina'],
    detalhes: {
      'Citocinina':  'PRIMÓRDIO DA ESPIGA PRIMÁRIA VISÍVEL em dissecção (~5-7 cm de comprimento); CK coordena divisão celular nos óvulos; determinação de grãos por fileira em andamento',
      'Auxina':      'Primórdios florais femininos na espiga em diferenciação; IAA mantém dominância da espiga primária sobre espigas auxiliares',
      'Giberelina':  'Internós 7-12 em elongação acelerada; GA coordena crescimento do pedúnculo da espiga',
    },
  },
  V10: {
    ativos: ['Giberelina','Auxina','Citocinina','Brasinoesteroide'],
    detalhes: {
      'Giberelina':  'MÁXIMA TAXA DE ELONGAÇÃO DE INTERNÓS — planta em fase de crescimento mais rápida do ciclo; GA essencial para qualidade do colmo (lignificação pós-elongação)',
      'Auxina':      'Diferenciação do pedúnculo da espiga; desenvolvimento das espigas superiores; IAA high en elongating internodes',
      'Citocinina':  'Comprimento da espiga sendo determinado — número final de grãos por fileira ainda em ajuste; CK de raízes e nódulos radiculares',
      'Brasinoesteroide': 'Espessamento da parede dos internós; síntese de lignina inicia nos internós basais — resistência ao acamamento',
    },
  },
  V11: {
    ativos: ['Giberelina','Auxina','Brasinoesteroide'],
    detalhes: {
      'Giberelina':  'Elongação de internós continua acelerada; penúltimos internós em expansão; GA coordena com temperatura (ativo acima de 15°C)',
      'Auxina':      'Diferenciação do pendão nos estágios finais; IAA sinaliza posição da espiga primária para supressão das secundárias',
      'Brasinoesteroide': 'Espessamento e lignificação de internós basais — estrutura mecânica do colmo para suporte do grão futuro',
    },
  },
  V12: {
    ativos: ['Giberelina','Auxina','Citocinina','Brasinoesteroide'],
    detalhes: {
      'Giberelina':  'Elongação dos últimos internós antes do pendão; diferenciação dos tecidos do pendão',
      'Auxina':      'PRIMÓRDIOS FLORAIS FEMININOS na espiga primária em diferenciação ativa; IAA coordena sinalização fonte-dreno espiga↔folhas',
      'Citocinina':  'Divisão celular dos óvulos da espiga primária intensifica; K e B adequados potencializam ação da CK na espiga',
      'Brasinoesteroide': 'Lignificação dos internós; síntese de parede celular em todos os tecidos vasculares',
    },
  },
  V13: {
    ativos: ['Giberelina','Auxina','Brasinoesteroide'],
    detalhes: {
      'Giberelina':  'COMPRIMENTO FINAL DA ESPIGA sendo determinado — nº de grãos por fileira em definição final; GA essencial para alongamento da espiga',
      'Auxina':      'Sinalização para o florescimento: IAA dos tecidos jovens sinaliza ao pendão; diferenciação de estigmas (silk) na espiga inicia',
      'Brasinoesteroide': 'Síntese intensa de parede celular e lignina; arquitetura mecânica da planta sendo finalizada',
    },
  },
  V14: {
    ativos: ['Giberelina','Auxina','Etileno'],
    detalhes: {
      'Giberelina':  'Últimos internós em elongação; pedúnculo da espiga se alonga para posicionar a espiga; GA em nível muito alto',
      'Auxina':      'Estigmas (silk) em desenvolvimento avançado na espiga; IAA coordena desenvolvimento das flores femininas',
      'Etileno':     'Primeiros sinais de ET indicam aproximação do florescimento; inicia diferenciação final do pendão',
    },
  },
  V15: {
    ativos: ['Giberelina','Auxina','Etileno'],
    detalhes: {
      'Giberelina':  'Elongação final do pedúnculo do pendão; plantas podem crescer 5-8 cm/dia nesta fase em condições ideais',
      'Auxina':      'IAA nas últimas folhas bandeira; sinalização hormonal para emergência do pendão',
      'Etileno':     'ET começa a regular antese (abertura das anteras do pendão); precede a liberação de pólen em ~5-7 dias',
    },
  },
  V16: {
    ativos: ['Giberelina','Auxina','Etileno'],
    detalhes: {
      'Giberelina':  'Pendão emergindo ou prestes a emergir; GA garante elongação total do pendão e abertura dos ramos do pendão',
      'Auxina':      'IAA coordena o desenvolvimento final do estigma (silk) para sincronizar com a liberação de pólen (NICK)',
      'Etileno':     'ET aumenta progressivamente — abre as anteras e regula liberação de pólen; ET também induz receptividade dos estigmas',
    },
  },
  VT: {
    ativos: ['Auxina','Etileno','Giberelina'],
    detalhes: {
      'Auxina':      'VIABILIDADE DO PÓLEN: IAA necessário para desenvolvimento completo do grão de pólen e da célula espermática; >1 milhão grãos de pólen/planta; vida do pólen = 20 min; Zn essencial para IAA aqui',
      'Etileno':     'ABERTURA DAS ANTERAS: ET controla deiscência das anteras (abertura para liberação de pólen); pico de liberação = meio da manhã; temperaturas > 35°C + seca = ET excessivo = falha na deiscência',
      'Giberelina':  'Elongação final do caule e dos ramos do pendão; GA garante que o pendão fique acima da espiga para polinização cruzada eficiente',
    },
  },
  R1: {
    ativos: ['Citocinina','Auxina','Brasinoesteroide'],
    detalhes: {
      'Citocinina':  'FERTILIZAÇÃO E INÍCIO DO ENCHIMENTO: CK nos grãos recém fertilizados; coordena divisão celular inicial no endosperma; B, Ca e Zn devem estar disponíveis aqui para CK funcionar; estigmas emergem ao longo de 3-5 dias (base → ponta da espiga)',
      'Auxina':      'PREVENÇÃO DE ABORTO: IAA nos grãos fertilizados inibe abscisão; grãos sem IAA = grain gaps (posições vazias na espiga); 2 semanas após R1 = período mais sensível para aborto de grãos; estresse hídrico reduz IAA = mais aborto',
      'Brasinoesteroide': 'Viabilidade do estigma (silk receptividade): BR essencial para que o estigma receba e germine o grão de pólen; B essencial para tubo polínico percorrer o estigma até o óvulo',
    },
  },
  R2: {
    ativos: ['Citocinina','ABA','Auxina'],
    detalhes: {
      'Citocinina':  'BLISTER (10-14 dias após R1): divisão celular intensa no endosperma — multiplica células que serão enchidas de amido; 85% de umidade no grão; CK em pico máximo no endosperma',
      'ABA':         'INÍCIO DO ACÚMULO DE AMIDO: ABA ativa amidoplastos e a síntese de amido no endosperma; regula abertura estomática para evitar dessecação prematura dos grãos; aborto ainda possível',
      'Auxina':      'Estabiliza os grãos em desenvolvimento; previne aborto dos grãos da ponta da espiga (mais vulneráveis); K e N adequados suportam produção de IAA',
    },
  },
  R3: {
    ativos: ['Citocinina','ABA','Auxina'],
    detalhes: {
      'Citocinina':  'MILK (18-22 dias após R1): fluido leitoso = amido em suspensão no endosperma; CK ativa síntese de proteínas de reserva do endosperma; S crítico para zeínas (proteínas do milho)',
      'ABA':         'ABA coordena particionamento de fotoassimilados das folhas para os grãos; acúmulo de amido acelerado; 80% umidade no grão; cor final do grão visível',
      'Auxina':      'IAA mantém integridade dos grãos em formação; aborto ainda possível mas risco menor que R1-R2',
    },
  },
  R4: {
    ativos: ['ABA','Citocinina'],
    detalhes: {
      'ABA':         'DOUGH (24-28 dias após R1): ABA DOMINANTE — controla síntese e deposição de amido; 70% umidade; ~50% da matéria seca final acumulada; ABA regula fechamento estomático para balanço hídrico',
      'Citocinina':  'Síntese residual de proteínas e enzimas; CK decresce progressivamente; estresse nesta fase = menor peso de grão (não mais aborto, mas grão mais leve)',
    },
  },
  R5: {
    ativos: ['ABA','Etileno'],
    detalhes: {
      'ABA':         'DENT (35-42 dias após R1): milk line visível (amido duro/mole); ABA finaliza deposição de amido; R5.5 (½ milk line) = 90% MS final; ABA regula desidratação progressiva (55% → 35% umidade)',
      'Etileno':     'Senescência foliar inicia; ET mobiliza N, K, Mg das folhas para os grãos; stover (restos culturais) começa a amarelar; camada negra (black layer) começa a se formar de ponta para base da espiga',
    },
  },
  R6: {
    ativos: ['ABA','Etileno'],
    detalhes: {
      'ABA':         'MATURIDADE FISIOLÓGICA: camada negra (black layer) na ponta do grão = barreira impermeável = impede entrada/saída de amido e umidade; 35% umidade; máximo peso de grão atingido; ABA mantém dormência da semente',
      'Etileno':     'Senescência completa de folhas e colmo; ET coordena remobilização final de nutrientes; colmo começa a desidratar; momento ideal de monitoramento para colheita (quando umidade cai para 15-18%)',
    },
  },
}

// ─── Feijão (simplificado) ──────────────────────────────────────────────────
const _feijaoBase = {
  VE:  { ativos: ['Giberelina','Auxina','Citocinina'],                                   detalhes: { 'Giberelina':'Elongação do hipocótilo', 'Auxina':'Gravitropismo e crescimento radicular', 'Citocinina':'Divisão celular inicial' } },
  VC:  { ativos: ['Giberelina','Auxina','Citocinina'],                                   detalhes: { 'Giberelina':'Expansão dos cotilédones', 'Auxina':'Dominância apical', 'Citocinina':'Absorção inicial de nutrientes' } },
  V1:  { ativos: ['Auxina','Giberelina','Citocinina'],                                   detalhes: { 'Auxina':'Dominância apical', 'Giberelina':'Expansão foliar', 'Citocinina':'Ramificação' } },
  V3:  { ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],                 detalhes: { 'Auxina':'Crescimento do caule', 'Giberelina':'Elongação internodal', 'Brasinoesteroide':'Expansão celular', 'Citocinina':'Ramificação lateral' } },
  R5:  { ativos: ['Auxina','Etileno','Citocinina'],                                      detalhes: { 'Auxina':'Diferenciação floral', 'Etileno':'Abertura das flores', 'Citocinina':'Divisão em gemas florais' } },
  R6:  { ativos: ['Auxina','Citocinina','ABA'],                                          detalhes: { 'Auxina':'Pegamento floral', 'Citocinina':'Desenvolvimento de vagens', 'ABA':'Regulação hídrica' } },
  R7:  { ativos: ['Citocinina','ABA'],                                                   detalhes: { 'Citocinina':'Divisão celular nas sementes', 'ABA':'Estabilização do desenvolvimento' } },
  R8:  { ativos: ['ABA','Citocinina','Auxina'],                                          detalhes: { 'ABA':'Acúmulo de reservas', 'Citocinina':'Síntese de proteínas', 'Auxina':'Estabilização do grão' } },
  R9:  { ativos: ['ABA','Etileno'],                                                      detalhes: { 'ABA':'Maturação e desidratação', 'Etileno':'Senescência e abertura de vagens' } },
}
export const HORMONES_FEIJAO = new Proxy(_feijaoBase, {
  get(target, key) {
    if (target[key]) return target[key]
    if (String(key).startsWith('V')) return target.V3 || target.V1
    if (String(key).startsWith('R')) return target.R7
    return target.V3
  }
})

export function getHormonesForStage(cultura, estadio) {
  const map = cultura === 'milho' ? HORMONES_MILHO
            : cultura === 'feijao' ? HORMONES_FEIJAO
            : HORMONES_SOJA
  return map[estadio] || { ativos: [], detalhes: {} }
}
