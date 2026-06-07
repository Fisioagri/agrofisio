// Valores de referência nutricional por cultura
// Fontes: Embrapa (2013), Bataglia et al. (2004), CQFS RS/SC (2016), Marschner (2012)
// Unidades foliar: macros em g/kg, micros em mg/kg
// Unidades solo: pH CaCl2, MO %, P mg/dm³, K cmolc/dm³, CTC cmolc/dm³, V%
// Ca/Mg/K solo: avaliados via % da CTC quando CTC informada (Ca 45-70%, Mg 15-25%, K 3-6%)
// Valores absolutos abaixo são fallback quando CTC não informada

export const REF_FOLIAR = {
  soja: {
    N:  { min: 45,   max: 55,   unit: 'g/kg',  fonte: 'Embrapa Soja (2013)' },
    P:  { min: 3.0,  max: 5.0,  unit: 'g/kg',  fonte: 'Bataglia et al. (2004)' },
    K:  { min: 17,   max: 25,   unit: 'g/kg',  fonte: 'Embrapa Soja (2013)' },
    Ca: { min: 5,    max: 20,   unit: 'g/kg',  fonte: 'Embrapa Soja (2013)' },
    Mg: { min: 3.0,  max: 8.0,  unit: 'g/kg',  fonte: 'Embrapa Soja (2013)' },
    S:  { min: 3.0,  max: 4.5,  unit: 'g/kg',  fonte: 'Embrapa Soja (2013)' },
    B:  { min: 30,   max: 60,   unit: 'mg/kg', fonte: 'Bataglia et al. (2004)' },
    Zn: { min: 21,   max: 50,   unit: 'mg/kg', fonte: 'Embrapa Soja (2013)' },
    Cu: { min: 5,    max: 15,   unit: 'mg/kg', fonte: 'Embrapa Soja (2013)' },
    Mn: { min: 23,   max: 100,  unit: 'mg/kg', fonte: 'Embrapa Soja (2013)' },
    Fe: { min: 50,   max: 350,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
    Mo: { min: 0.5,  max: 5.0,  unit: 'mg/kg', fonte: 'Embrapa Soja (2013)' },
  },
  milho: {
    N:  { min: 27,   max: 35,   unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    P:  { min: 2.0,  max: 4.0,  unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    K:  { min: 15,   max: 25,   unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    Ca: { min: 3.0,  max: 8.0,  unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    Mg: { min: 2.0,  max: 6.0,  unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    S:  { min: 2.0,  max: 3.5,  unit: 'g/kg',  fonte: 'Embrapa Milho e Sorgo (2010)' },
    B:  { min: 15,   max: 40,   unit: 'mg/kg', fonte: 'Bataglia et al. (2004)' },
    Zn: { min: 15,   max: 60,   unit: 'mg/kg', fonte: 'Embrapa Milho e Sorgo (2010)' },
    Cu: { min: 4,    max: 12,   unit: 'mg/kg', fonte: 'Embrapa Milho e Sorgo (2010)' },
    Mn: { min: 15,   max: 150,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
    Fe: { min: 50,   max: 300,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
    Mo: { min: 0.1,  max: 1.0,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
  },
  feijao: {
    N:  { min: 40,   max: 55,   unit: 'g/kg',  fonte: 'Embrapa Arroz e Feijão (2012)' },
    P:  { min: 3.0,  max: 5.5,  unit: 'g/kg',  fonte: 'Embrapa Arroz e Feijão (2012)' },
    K:  { min: 18,   max: 28,   unit: 'g/kg',  fonte: 'Embrapa Arroz e Feijão (2012)' },
    Ca: { min: 8,    max: 20,   unit: 'g/kg',  fonte: 'Embrapa Arroz e Feijão (2012)' },
    Mg: { min: 3.0,  max: 8.0,  unit: 'g/kg',  fonte: 'Embrapa Arroz e Feijão (2012)' },
    S:  { min: 2.5,  max: 4.0,  unit: 'g/kg',  fonte: 'Bataglia et al. (2004)' },
    B:  { min: 25,   max: 70,   unit: 'mg/kg', fonte: 'Bataglia et al. (2004)' },
    Zn: { min: 20,   max: 60,   unit: 'mg/kg', fonte: 'Embrapa Arroz e Feijão (2012)' },
    Cu: { min: 5,    max: 15,   unit: 'mg/kg', fonte: 'Bataglia et al. (2004)' },
    Mn: { min: 40,   max: 200,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
    Fe: { min: 70,   max: 400,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
    Mo: { min: 0.5,  max: 5.0,  unit: 'mg/kg', fonte: 'Marschner (2012)' },
  },
}

export const REF_SOLO = {
  soja: {
    pH:      { min: 5.5,  max: 6.5,  unit: 'CaCl₂', fonte: 'Embrapa Soja (2013)' },
    MO:      { min: 2.5,  max: 5.0,  unit: '%',      fonte: 'CQFS RS/SC (2016)' },
    P:       { min: 12,   max: 40,   unit: 'mg/dm³', fonte: 'Embrapa Soja (2013)' },
    K:       { min: 0.12, max: 0.35, unit: 'cmolc/dm³', fonte: 'Embrapa Soja (2013)' },
    Ca:      { min: 1.5,  max: 5.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Soja (2013)' },
    Mg:      { min: 0.6,  max: 2.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Soja (2013)' },
    S:       { min: 5,    max: 30,   unit: 'mg/dm³', fonte: 'Embrapa Soja (2013)' },
    V:       { min: 60,   max: 75,   unit: '%',      fonte: 'Embrapa Soja (2013)' },
    B:       { min: 0.3,  max: 1.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Zn:      { min: 0.6,  max: 5.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Cu:      { min: 0.3,  max: 2.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Mn:      { min: 3.0,  max: 50,   unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Fe:      { min: 10,   max: 100,  unit: 'mg/dm³', fonte: 'Marschner (2012)' },
  },
  milho: {
    pH:      { min: 5.5,  max: 6.5,  unit: 'CaCl₂', fonte: 'Embrapa Milho e Sorgo (2010)' },
    MO:      { min: 2.0,  max: 5.0,  unit: '%',      fonte: 'CQFS RS/SC (2016)' },
    P:       { min: 10,   max: 40,   unit: 'mg/dm³', fonte: 'Embrapa Milho e Sorgo (2010)' },
    K:       { min: 0.12, max: 0.35, unit: 'cmolc/dm³', fonte: 'Embrapa Milho e Sorgo (2010)' },
    Ca:      { min: 1.5,  max: 5.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Milho e Sorgo (2010)' },
    Mg:      { min: 0.5,  max: 2.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Milho e Sorgo (2010)' },
    S:       { min: 5,    max: 30,   unit: 'mg/dm³', fonte: 'Embrapa Milho e Sorgo (2010)' },
    V:       { min: 60,   max: 75,   unit: '%',      fonte: 'Embrapa Milho e Sorgo (2010)' },
    B:       { min: 0.2,  max: 0.8,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Zn:      { min: 0.5,  max: 3.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Cu:      { min: 0.2,  max: 1.5,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Mn:      { min: 2.0,  max: 40,   unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Fe:      { min: 10,   max: 80,   unit: 'mg/dm³', fonte: 'Marschner (2012)' },
  },
  feijao: {
    pH:      { min: 5.5,  max: 6.5,  unit: 'CaCl₂', fonte: 'Embrapa Arroz e Feijão (2012)' },
    MO:      { min: 2.0,  max: 5.0,  unit: '%',      fonte: 'CQFS RS/SC (2016)' },
    P:       { min: 12,   max: 35,   unit: 'mg/dm³', fonte: 'Embrapa Arroz e Feijão (2012)' },
    K:       { min: 0.12, max: 0.35, unit: 'cmolc/dm³', fonte: 'Embrapa Arroz e Feijão (2012)' },
    Ca:      { min: 1.5,  max: 5.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Arroz e Feijão (2012)' },
    Mg:      { min: 0.5,  max: 2.0,  unit: 'cmolc/dm³', fonte: 'Embrapa Arroz e Feijão (2012)' },
    S:       { min: 5,    max: 25,   unit: 'mg/dm³', fonte: 'Bataglia et al. (2004)' },
    V:       { min: 60,   max: 75,   unit: '%',      fonte: 'Embrapa Arroz e Feijão (2012)' },
    B:       { min: 0.3,  max: 1.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Zn:      { min: 0.5,  max: 4.0,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Cu:      { min: 0.2,  max: 1.5,  unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Mn:      { min: 3.0,  max: 60,   unit: 'mg/dm³', fonte: 'CQFS RS/SC (2016)' },
    Fe:      { min: 10,   max: 90,   unit: 'mg/dm³', fonte: 'Marschner (2012)' },
  },
}

// Doses corretivas indicativas por nutriente e via
// Fontes: Embrapa, CQFS RS/SC, Malavolta et al.
export const DOSES_CORRETIVAS = {
  N:  { solo: '30–60 kg/ha de N (ureia 45% N)', foliar: '3–5 kg/ha de ureia (2–3% p/v)', fonte: 'Embrapa/CQFS' },
  P:  { solo: '60–120 kg/ha de P₂O₅ (superfosfato simples ou triplo)', foliar: '1–2 kg/ha de MAP foliar', fonte: 'Embrapa' },
  K:  { solo: '60–100 kg/ha de K₂O (KCl 60%)', foliar: '1–3 kg/ha de KNO₃ foliar', fonte: 'Embrapa' },
  Ca: { solo: '1–2 t/ha de calcário calcítico (PRNT 100%)', foliar: '1–2 kg/ha de nitrato de cálcio', fonte: 'CQFS' },
  Mg: { solo: '0.5–1 t/ha de calcário dolomítico (PRNT 100%)', foliar: '0.5–1 kg/ha de sulfato de Mg', fonte: 'CQFS' },
  S:  { solo: '20–40 kg/ha de S (gesso agrícola)', foliar: '1–2 kg/ha de tiosulfato de amônio', fonte: 'Embrapa' },
  B:  { solo: '0.5–2 kg/ha de bórax (11% B)', foliar: '100–300 g/ha de ácido bórico', fonte: 'CQFS RS/SC' },
  Zn: { solo: '2–5 kg/ha de sulfato de Zn (21% Zn)', foliar: '100–400 g/ha de sulfato de Zn', fonte: 'CQFS RS/SC' },
  Cu: { solo: '1–3 kg/ha de sulfato de Cu (25% Cu)', foliar: '100–200 g/ha de sulfato de Cu', fonte: 'CQFS RS/SC' },
  Mn: { solo: '2–5 kg/ha de sulfato de Mn (25% Mn)', foliar: '300–600 g/ha de sulfato de Mn', fonte: 'Embrapa' },
  Fe: { solo: '5–10 kg/ha de sulfato ferroso (20% Fe)', foliar: '500 g–1 kg/ha de sulfato ferroso quelato', fonte: 'Marschner' },
  Mo: { solo: '—', foliar: '20–50 g/ha de molibdato de sódio', fonte: 'Embrapa Soja' },
}

/**
 * Builds a compact reference table string for inclusion in AI prompts.
 * @param {string} cultura - 'soja' | 'milho' | 'feijao'
 * @param {boolean} en - true for English
 */
export function buildRefContext(cultura, en = false) {
  const cult = cultura?.toLowerCase().replace('ã', 'a').replace('é', 'e') || 'soja'
  const refFol = REF_FOLIAR[cult] || REF_FOLIAR.soja
  const refSol = REF_SOLO[cult]   || REF_SOLO.soja

  const folRows = Object.entries(refFol)
    .map(([k, v]) => `${k}:${v.min}–${v.max}${v.unit}`)
    .join(' | ')

  const solRows = Object.entries(refSol)
    .map(([k, v]) => `${k}:${v.min}–${v.max}${v.unit}`)
    .join(' | ')

  const doseRows = Object.entries(DOSES_CORRETIVAS)
    .map(([k, v]) => `${k} → ${en ? 'Soil' : 'Solo'}:${v.solo} / ${en ? 'Foliar' : 'Foliar'}:${v.foliar}`)
    .join('\n')

  if (en) {
    return `REFERENCE VALUES (${cult.toUpperCase()}):
FOLIAR ADEQUATE RANGE: ${folRows}
SOIL ADEQUATE RANGE: ${solRows}
CORRECTIVE DOSES (indicative, no commercial brands):
${doseRows}`
  }
  return `VALORES DE REFERÊNCIA (${cult.toUpperCase()}):
FAIXA ADEQUADA FOLIAR: ${folRows}
FAIXA ADEQUADA SOLO: ${solRows}
DOSES CORRETIVAS (indicativas, sem marcas comerciais):
${doseRows}`
}
