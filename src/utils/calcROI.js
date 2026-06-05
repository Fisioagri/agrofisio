// Estimativa de impacto econômico por deficiência nutricional
// Fontes: Embrapa, CQFS RS/SC, literatura de resposta a nutrientes

const IMPACTO = {
  N:  { redMin: 0.10, redMax: 0.30, desc: 'N limita fotossíntese, proteína e produtividade diretamente' },
  P:  { redMin: 0.05, redMax: 0.20, desc: 'P reduz enraizamento, energia e transferência de fotoassimilados' },
  K:  { redMin: 0.08, redMax: 0.25, desc: 'K é crítico para enchimento de grãos e sanidade celular' },
  Ca: { redMin: 0.03, redMax: 0.12, desc: 'Ca estrutural — impacto maior em formação e retenção de vagens' },
  Mg: { redMin: 0.04, redMax: 0.15, desc: 'Mg é o átomo central da clorofila — limita fotossíntese' },
  S:  { redMin: 0.05, redMax: 0.15, desc: 'S essencial para aminoácidos sulfurados e fixação biológica' },
  B:  { redMin: 0.05, redMax: 0.20, desc: 'B crítico em florescimento — deficiência causa aborto de flores' },
  Zn: { redMin: 0.05, redMax: 0.18, desc: 'Zn regula síntese de auxina — impacto no enraizamento e formação' },
  Cu: { redMin: 0.02, redMax: 0.08, desc: 'Cu ativa enzimas da cadeia respiratória e lignificação' },
  Mn: { redMin: 0.03, redMax: 0.10, desc: 'Mn ativa fotossíntese e síntese de clorofila' },
  Fe: { redMin: 0.03, redMax: 0.12, desc: 'Fe essencial para síntese de clorofila e transporte de elétrons' },
  Mo: { redMin: 0.08, redMax: 0.25, desc: 'Mo é cofator da nitrogenase — deficiência compromete FBN diretamente' },
}

// Custo indicativo de correção foliar por nutriente (R$/ha)
const CUSTO_CORRECAO = {
  N: 45, P: 30, K: 35, Ca: 20, Mg: 20, S: 25,
  B: 18, Zn: 22, Cu: 15, Mn: 20, Fe: 25, Mo: 12,
}

export function calcROI({ deficiencias = [], prodExpect, areaHa = 1 }) {
  const prod    = parseFloat(prodExpect) || 60
  const area    = parseFloat(areaHa)    || 1
  const preco   = 85 // R$/sc — referência

  let perdaMin = 0
  let perdaMax = 0
  const itens  = []

  for (const nut of deficiencias) {
    const imp = IMPACTO[nut]
    if (!imp) continue
    const pMin = prod * imp.redMin
    const pMax = prod * imp.redMax
    perdaMin += pMin
    perdaMax += pMax
    itens.push({ nut, pMin: pMin.toFixed(1), pMax: pMax.toFixed(1), desc: imp.desc })
  }

  // Cap: máximo 45% de perda acumulada (efeito conjunto tem teto biológico)
  perdaMin = Math.min(perdaMin, prod * 0.45)
  perdaMax = Math.min(perdaMax, prod * 0.45)

  const custoHa    = deficiencias.reduce((s, n) => s + (CUSTO_CORRECAO[n] || 0), 0)
  const custoTotal = custoHa * area

  const perdaMinHa  = parseFloat(perdaMin.toFixed(1))
  const perdaMaxHa  = parseFloat(perdaMax.toFixed(1))
  const valorMinHa  = Math.round(perdaMinHa * preco)
  const valorMaxHa  = Math.round(perdaMaxHa * preco)
  const valorMinTotal = Math.round(valorMinHa * area)
  const valorMaxTotal = Math.round(valorMaxHa * area)

  const roiMin = custoHa > 0 ? Math.round(valorMinHa / custoHa) : 0
  const roiMax = custoHa > 0 ? Math.round(valorMaxHa / custoHa) : 0

  return {
    itens,
    perdaMinHa, perdaMaxHa,
    valorMinHa, valorMaxHa,
    valorMinTotal, valorMaxTotal,
    custoHa, custoTotal,
    roiMin, roiMax,
    precoSoja: preco,
    area,
    semDeficiencias: deficiencias.length === 0,
  }
}

export function getDeficiencias(foliarNuts, soloNuts) {
  // Retorna lista única de nutrientes com deficiência em pelo menos uma fonte
  const set = new Set()
  for (const n of [...foliarNuts, ...soloNuts]) {
    if (n.status === 'def') set.add(n.nut)
  }
  return [...set]
}
