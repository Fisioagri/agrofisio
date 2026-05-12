export const STEPS = [
  { id: 0, lbl: 'Produtor',  ico: '👨‍🌾' },
  { id: 1, lbl: 'Cultura',   ico: '🌾'  },
  { id: 2, lbl: 'Solo',      ico: '📋'  },
  { id: 3, lbl: 'Foliar',    ico: '🍃'  },
  { id: 4, lbl: 'Planta',    ico: '📸'  },
  { id: 5, lbl: 'Diagnose',  ico: '🔬'  },
  { id: 6, lbl: 'Objetivos', ico: '🎯'  },
  { id: 7, lbl: 'Laudo',     ico: '📄'  },
]

export const PHENO = {
  soja:   ['VE','VC','V1','V2','V3','V4','V5','V6','R1','R2','R3','R4','R5','R5.1','R5.2','R5.3','R5.4','R5.5','R6','R7','R8'],
  milho:  ['VE','V1','V2','V3','V4','V5','V6','V7','V8','V9','VT','R1','R2','R3','R4','R5','R6'],
  feijao: ['VE','VC','V1','V2','V3','V4','R5','R6','R7','R8','R9'],
}

export const OBJETIVOS_DEF = [
  { id: 'raiz',          t: 'Desenvolvimento radicular',  d: 'expansão e enraizamento',  fases: ['VE','VC','V1','V2','V3','V4','V5','V6'] },
  { id: 'entrenós',      t: 'Diminuição de entrenós',     d: 'controle de elongação',    fases: ['VE','VC','V1','V2','V3','V4'] },
  { id: 'florescimento', t: 'Otimização do florescimento',d: 'fixação e uniformidade',   fases: ['V6','R1','R2'] },
  { id: 'enchimento',    t: 'Enchimento de grãos',        d: 'peso e qualidade',         fases: ['R1','R2','R3','R4','R5','R5.1'] },
  { id: 'defesa',        t: 'Defesa celular',             d: 'todo o ciclo',             fases: [] },
  { id: 'producao',      t: 'Aumento de produtividade',   d: 'maximização sc/ha',        fases: ['VE','VC','V1','V2','V3','V4','V5','V6','R1','R2','R3','R4'] },
  { id: 'qualidade',     t: 'Qualidade do produto',       d: 'proteína, óleo, fibra',    fases: ['R1','R2','R3','R4','R5','R5.1','R5.2','R5.3','R5.4','R5.5'] },
  { id: 'preestresse',   t: 'Manejo pré-estresse',        d: 'preparação preventiva',    fases: [] },
]

export const INITIAL_STATE = {
  // Step 1
  prodNome: '', prodCidade: '', prodTalhao: '', prodUltima: '', prodExpect: '',
  // Step 2
  cultura: '', safra: '', dataPlantio: '', hibrido: '', adubacao: '',
  // Step 3 – Solo
  ph: '', mo: '', pSolo: '', kSolo: '', caSolo: '', mgSolo: '',
  sSolo: '', alSolo: '', hAlSolo: '', ctcSolo: '', vSolo: '', satAlSolo: '',
  argilaSolo: '', bSolo: '', znSolo: '', cuSolo: '', mnSolo: '', feSolo: '', moSolo: '',
  // Step 4 – Foliar
  nFoliar: '', pFoliar: '', kFoliar: '', caFoliar: '', mgFoliar: '', sFoliar: '',
  bFoliar: '', znFoliar: '', cuFoliar: '', mnFoliar: '', feFoliar: '', moFoliar: '',
  // Step 5 – Planta
  fotoB64: '', estadio: '', temp: '', chuva: '', diasSemChuva: '',
  stresse: null, tiposStresse: [], ocorrencias: [], outrasOcorrencias: '',
  sintomas: '', molestia: null, doencas: [], visivel: [],
  // Step 7 – Objetivos
  objetivos: [],
}
