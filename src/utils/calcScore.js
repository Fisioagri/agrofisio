// Score AgroFísio 0–100
// Penaliza por deficiências e excessos nutricionais + estresse climático
// Nutrição foliar pesa mais que solo (observação direta na planta)

const PESO_FOLIAR = {
  N:  { def: 15, alto: 8  },
  P:  { def: 12, alto: 6  },
  K:  { def: 12, alto: 6  },
  Ca: { def: 7,  alto: 4  },
  Mg: { def: 8,  alto: 4  },
  S:  { def: 8,  alto: 4  },
  B:  { def: 10, alto: 5  },
  Zn: { def: 8,  alto: 4  },
  Cu: { def: 5,  alto: 3  },
  Mn: { def: 5,  alto: 3  },
  Fe: { def: 4,  alto: 3  },
  Mo: { def: 10, alto: 5  },
}

const PESO_SOLO = {
  pH: { def: 10, alto: 8 },
  MO: { def: 5,  alto: 0 },
  P:  { def: 7,  alto: 4 },
  K:  { def: 7,  alto: 4 },
  Ca: { def: 5,  alto: 3 },
  Mg: { def: 5,  alto: 3 },
  S:  { def: 5,  alto: 3 },
  V:  { def: 7,  alto: 5 },
  B:  { def: 6,  alto: 4 },
  Zn: { def: 5,  alto: 3 },
  Cu: { def: 4,  alto: 3 },
  Mn: { def: 4,  alto: 3 },
}

export function calcScore({ foliarNuts = [], soloNuts = [], data = {} }) {
  let pontos = 100
  const detalhes = []

  for (const n of foliarNuts) {
    if (n.status === 'nd' || n.status === 'ok') continue
    const peso = PESO_FOLIAR[n.nut]
    if (!peso) continue
    const dedução = n.status === 'def' ? peso.def : peso.alto
    pontos -= dedução
    detalhes.push({
      label: `${n.nut} ${n.status === 'def' ? 'deficiente' : 'em excesso'} (foliar)`,
      impacto: -dedução,
    })
  }

  for (const n of soloNuts) {
    if (n.status === 'nd' || n.status === 'ok') continue
    const peso = PESO_SOLO[n.nut]
    if (!peso) continue
    // Solo vale 60% do peso — foliar é evidência direta
    const dedução = Math.round((n.status === 'def' ? peso.def : peso.alto) * 0.6)
    pontos -= dedução
    detalhes.push({
      label: `${n.nut} ${n.status === 'def' ? 'deficiente' : 'em excesso'} (solo)`,
      impacto: -dedução,
    })
  }

  // Estresse climático
  const dias = parseInt(data.diasSemChuva) || 0
  const temp = parseFloat(data.temp) || 25
  if (dias >= 21)       { pontos -= 15; detalhes.push({ label: `${dias} dias sem chuva — estresse severo`, impacto: -15 }) }
  else if (dias >= 14)  { pontos -= 10; detalhes.push({ label: `${dias} dias sem chuva — estresse moderado`, impacto: -10 }) }
  else if (dias >= 7)   { pontos -= 5;  detalhes.push({ label: `${dias} dias sem chuva — atenção hídrica`, impacto: -5 }) }
  if (temp > 35)        { pontos -= 8;  detalhes.push({ label: `Temperatura ${temp}°C — estresse térmico`, impacto: -8 }) }
  else if (temp < 10)   { pontos -= 8;  detalhes.push({ label: `Temperatura ${temp}°C — frio crítico`, impacto: -8 }) }

  const score = Math.max(0, Math.min(100, pontos))

  // Projeção: quanto ganharia se corrigisse as deficiências nutricionais
  const ganhoProjecao = detalhes
    .filter(d => d.label.includes('deficiente'))
    .reduce((acc, d) => acc - d.impacto, 0)
  const scoreProjecao = Math.min(100, score + ganhoProjecao)

  const semDados =
    foliarNuts.every(n => n.status === 'nd') &&
    soloNuts.every(n => n.status === 'nd')

  return {
    score,
    scoreProjecao,
    semDados,
    detalhes: detalhes.sort((a, b) => a.impacto - b.impacto),
    label: score >= 85 ? 'Excelente' : score >= 70 ? 'Bom' : score >= 50 ? 'Atenção' : 'Crítico',
    cor:   score >= 85 ? 'green'     : score >= 70 ? 'amber': score >= 50 ? 'orange'  : 'red',
    emoji: score >= 85 ? '🟢'        : score >= 70 ? '🟡'   : score >= 50 ? '🟠'      : '🔴',
    corClass: score >= 85
      ? { bar: 'bg-green-500',  text: 'text-green-700',  bg: 'bg-green-50',  border: 'border-green-200' }
      : score >= 70
      ? { bar: 'bg-amber-400',  text: 'text-amber-700',  bg: 'bg-amber-50',  border: 'border-amber-200' }
      : score >= 50
      ? { bar: 'bg-orange-500', text: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' }
      : { bar: 'bg-red-500',    text: 'text-red-700',    bg: 'bg-red-50',    border: 'border-red-200'   },
  }
}
