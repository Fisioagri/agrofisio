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
  V7: '🌿', V8: '🌿', V9: '🌿', VT: '🌿',
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

// ─── Milho (simplificado) ───────────────────────────────────────────────────
const _milhoBase = {
  VE:  { ativos: ['Giberelina','Auxina','Citocinina'],                                   detalhes: { 'Giberelina':'Elongação do coleóptilo e emergência', 'Auxina':'Gravitropismo radicular', 'Citocinina':'Divisão celular em raízes' } },
  V1:  { ativos: ['Auxina','Giberelina','Citocinina'],                                   detalhes: { 'Auxina':'Crescimento apical', 'Giberelina':'Elongação da primeira folha', 'Citocinina':'Divisão no meristema apical' } },
  V2:  { ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],                 detalhes: { 'Auxina':'Dominância apical', 'Giberelina':'Elongação de entrenós', 'Brasinoesteroide':'Expansão celular', 'Citocinina':'Ramificação de raízes' } },
  V4:  { ativos: ['Auxina','Giberelina','Brasinoesteroide','Citocinina'],                 detalhes: { 'Auxina':'Crescimento vegetativo intenso', 'Giberelina':'Elongação de entrenós', 'Brasinoesteroide':'Expansão foliar', 'Citocinina':'Divisão celular no meristema apical' } },
  V8:  { ativos: ['Citocinina','Auxina','Giberelina'],                                   detalhes: { 'Citocinina':'Define número de grãos por espiga — fase crítica', 'Auxina':'Formação do pendão', 'Giberelina':'Elongação do pendão' } },
  VT:  { ativos: ['Auxina','Etileno','Giberelina'],                                      detalhes: { 'Auxina':'Liberação do pólen', 'Etileno':'Abertura de anteras', 'Giberelina':'Elongação final do caule' } },
  R1:  { ativos: ['Citocinina','Auxina','Brasinoesteroide'],                             detalhes: { 'Citocinina':'Fertilização e início do enchimento de grão', 'Auxina':'Pegamento — previne aborto', 'Brasinoesteroide':'Viabilidade do estigma' } },
  R3:  { ativos: ['Citocinina','ABA','Auxina'],                                          detalhes: { 'Citocinina':'Síntese de proteínas e amido no grão', 'ABA':'Acúmulo de amido', 'Auxina':'Estabilidade do grão' } },
  R5:  { ativos: ['ABA','Etileno'],                                                      detalhes: { 'ABA':'Finaliza acúmulo de amido e induz maturação', 'Etileno':'Senescência foliar e remobilização de nutrientes' } },
  R6:  { ativos: ['ABA','Etileno'],                                                      detalhes: { 'ABA':'Desidratação do grão e maturação final', 'Etileno':'Senescência completa' } },
}
// Fill intermediate stages with nearest known
export const HORMONES_MILHO = new Proxy(_milhoBase, {
  get(target, key) {
    if (target[key]) return target[key]
    // fallback: nearest stage by prefix
    if (String(key).startsWith('V')) return target.V4 || target.V2
    if (String(key).startsWith('R')) return target.R3
    return target.V4
  }
})

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
