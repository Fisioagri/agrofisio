/**
 * AgroEngine — Motor de Inferência Agronômica Offline
 *
 * Executa diagnóstico completo a partir de dados analíticos e agronômicos,
 * sem depender de conexão com internet.
 *
 * Pipeline:
 *  1. Classificação nutricional (deficiência / adequado / alto / tóxico)
 *  2. Cálculo de severidade e importância estádio-específica
 *  3. Análise de interações (antagonismos e sinergismos)
 *  4. Avaliação de impacto hormonal
 *  5. Geração de recomendações priorizadas
 *  6. Score de sanidade nutricional
 *  7. Relatório técnico estruturado
 */

import { REF_FOLIAR, REF_SOLO } from '../data/referencias'
import {
  NUTRIENT_PROFILES,
  INTERACTIONS,
  HORMONE_DATABASE,
  SYMPTOMS_DB,
  PHENOLOGY_DEMANDS,
  PHENOLOGY_DEMANDS_MILHO,
  STRESS_RESPONSES,
  RECOMMENDATION_PROTOCOLS,
  MANIPULATION_PROTOCOLS_MILHO,
  CORN_PRODUCTIVITY_PROFILES,
  SOJA_PRODUCTIVITY_PROFILES,
  CROP_INTELLIGENCE,
  ANTIOXIDANT_ENZYMES,
  BIBLIOGRAPHY,
} from './knowledgeBase'

// ─────────────────────────────────────────────────────────────────────────────
// Constantes internas
// ─────────────────────────────────────────────────────────────────────────────

const FOLIAR_FIELDS = {
  nFoliar: 'N', pFoliar: 'P', kFoliar: 'K', caFoliar: 'Ca',
  mgFoliar: 'Mg', sFoliar: 'S', bFoliar: 'B', znFoliar: 'Zn',
  cuFoliar: 'Cu', mnFoliar: 'Mn', feFoliar: 'Fe', moFoliar: 'Mo',
}
const SOLO_FIELDS = {
  ph: 'pH', mo: 'MO', pSolo: 'P', kSolo: 'K', caSolo: 'Ca', mgSolo: 'Mg',
  sSolo: 'S', vSolo: 'V', bSolo: 'B', znSolo: 'Zn', cuSolo: 'Cu',
  mnSolo: 'Mn', feSolo: 'Fe',
}

function gravidade(ratio) {
  // ratio = valor / limite_min (para def) ou valor / limite_max (para alto)
  if (ratio <= 0.5)  return 'severo'
  if (ratio <= 0.75) return 'moderado'
  return 'leve'
}

function gravidadeAlto(ratio) {
  if (ratio >= 3)   return 'severo'
  if (ratio >= 1.5) return 'moderado'
  return 'leve'
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 1 — Classificação Nutricional
// ─────────────────────────────────────────────────────────────────────────────

function classificarFoliar(data, cultura) {
  const cult   = normCultura(cultura)
  const refFol = REF_FOLIAR[cult] || REF_FOLIAR.soja
  const result = []

  for (const [field, nut] of Object.entries(FOLIAR_FIELDS)) {
    const raw = parseFloat(data[field])
    const ref = refFol[nut]
    if (isNaN(raw) || !ref) {
      result.push({ nut, fonte: 'foliar', status: 'nd', valor: null, ref })
      continue
    }
    let status, grav
    if (raw < ref.min) {
      status = 'def'
      grav   = gravidade(raw / ref.min)
    } else if (raw > ref.max * 2) {
      status = 'toxico'
      grav   = gravidadeAlto(raw / ref.max)
    } else if (raw > ref.max) {
      status = 'alto'
      grav   = gravidadeAlto(raw / ref.max)
    } else {
      status = 'ok'
      grav   = null
    }
    result.push({ nut, fonte: 'foliar', status, grav, valor: raw, ref, campo: field })
  }
  return result
}

// Faixas CTC% para Ca, Mg, K (avaliação via concentração na CTC)
const CTC_RANGES = { caSolo: [45, 70], mgSolo: [15, 25], kSolo: [3, 6] }

function classificarSolo(data, cultura) {
  const cult   = normCultura(cultura)
  const refSol = REF_SOLO[cult] || REF_SOLO.soja
  const ctc    = parseFloat(data?.ctcSolo) || 0
  const result = []

  for (const [field, nut] of Object.entries(SOLO_FIELDS)) {
    const raw = parseFloat(data[field])
    const ref = refSol[nut]
    if (isNaN(raw) || !ref) {
      result.push({ nut, fonte: 'solo', status: 'nd', valor: null, ref })
      continue
    }

    let status, grav

    // Ca, Mg, K: avaliar via % da CTC quando CTC disponível
    if (ctc > 0 && CTC_RANGES[field]) {
      const pct = raw / ctc * 100
      const [minPct, maxPct] = CTC_RANGES[field]
      if (pct < minPct) {
        status = 'def'
        grav   = gravidade(pct / minPct)
      } else if (pct > maxPct) {
        status = 'alto'  // excesso ≠ tóxico (ajuste de adubação)
        grav   = gravidadeAlto(pct / maxPct)
      } else {
        status = 'ok'
        grav   = null
      }
    } else {
      // Demais nutrientes: comparação absoluta (K sem conversão agora é cmolc)
      const cmpVal = raw
      if (cmpVal < ref.min) {
        status = 'def'
        grav   = gravidade(cmpVal / ref.min)
      } else if (cmpVal > ref.max * 2) {
        status = 'toxico'
        grav   = gravidadeAlto(cmpVal / ref.max)
      } else if (cmpVal > ref.max) {
        status = 'alto'
        grav   = gravidadeAlto(cmpVal / ref.max)
      } else {
        status = 'ok'
        grav   = null
      }
    }

    result.push({ nut, fonte: 'solo', status, grav, valor: raw, ref, campo: field })
  }
  return result
}

function normCultura(c) {
  return (c || 'soja').toLowerCase()
    .replace('ã', 'a').replace('é', 'e').replace('ê', 'e')
    .replace('ó', 'o').replace('ô', 'o').replace('ç', 'c')
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 2 — Prioridade por Estádio Fenológico
// ─────────────────────────────────────────────────────────────────────────────

function estadioParaKey(estadio, cultura) {
  if (!estadio) return 'V3'
  const s = estadio.trim().toUpperCase()

  if (normCultura(cultura) === 'milho') {
    const milhoMap = {
      'VE':'VE','V1':'V1','V2':'V2','V3':'V3','V4':'V4','V5':'V5',
      'V6':'V6','V7':'V7','V8':'V8','V9':'V9','V10':'V10','V11':'V11',
      'V12':'V12','V13':'V13','V14':'V14','V15':'V15','V16':'V16',
      'VT':'VT','R1':'R1','R2':'R2','R3':'R3','R4':'R4','R5':'R5','R6':'R5',
    }
    return milhoMap[s] || 'V6'
  }

  const map = {
    VE: 'VE', VC: 'VC', V1: 'V1', V2: 'V2', V3: 'V3', V4: 'V4',
    V5: 'V5', V6: 'V6', R1: 'R1', R2: 'R2', R3: 'R3', R4: 'R4', R5: 'R5',
    'R5.5': 'R5', R6: 'R5', R7: 'R5', R8: 'R5',
  }
  for (const [k, v] of Object.entries(map)) {
    if (s.startsWith(k)) return v
  }
  return 'V3'
}

function getEstadioPeso(nut, estadioKey, cultura) {
  const isMilho = normCultura(cultura) === 'milho'
  const demands = isMilho
    ? (PHENOLOGY_DEMANDS_MILHO[estadioKey] || null)
    : (PHENOLOGY_DEMANDS[estadioKey] || null)
  if (!demands) return 5
  const found = demands.nutrientes_criticos.find(n => n.nut === nut)
  return found ? found.peso : 3
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 3 — Análise de Interações Antagonismo/Sinergismo
// ─────────────────────────────────────────────────────────────────────────────

function analisarInteracoes(foliarNuts, soloNuts) {
  const allNuts = [...foliarNuts, ...soloNuts]
  const statusMap = {}
  for (const n of allNuts) {
    if (!statusMap[n.nut] || n.status !== 'nd') {
      statusMap[n.nut] = n
    }
  }

  const interacoes = []

  for (const [chave, inter] of Object.entries(INTERACTIONS)) {
    // Formato: 'K→Mg' ou 'Mn→Fe'
    const [a, b] = chave.split('→')
    const nutA = statusMap[a]
    const nutB = statusMap[b]
    if (!nutA || !nutB) continue

    if (inter.tipo === 'antagonismo') {
      // A em excesso pode explicar B em deficiência
      if ((nutA.status === 'alto' || nutA.status === 'toxico') && nutB.status === 'def') {
        interacoes.push({
          tipo: 'antagonismo_explicativo',
          nutA: a,
          nutB: b,
          statusA: nutA.status,
          statusB: nutB.status,
          severidade: inter.severidade,
          mecanismo: inter.mecanismo,
          interpretacao: `Excesso de ${a} pode estar causando a deficiência de ${b} via ${inter.mecanismo}`,
          fonte: inter.fonte_ref,
        })
      }
      // A em excesso como risco para B (que está OK mas em risco)
      if ((nutA.status === 'alto' || nutA.status === 'toxico') && nutB.status === 'ok' && inter.severidade >= 2) {
        interacoes.push({
          tipo: 'antagonismo_risco',
          nutA: a,
          nutB: b,
          statusA: nutA.status,
          statusB: nutB.status,
          severidade: inter.severidade,
          mecanismo: inter.mecanismo,
          interpretacao: `Excesso de ${a} representa risco de induzir deficiência de ${b}`,
          fonte: inter.fonte_ref,
        })
      }
    } else if (inter.tipo === 'sinergismo') {
      // A deficiente → B também afetado por sinergismo
      if (nutA.status === 'def' && (nutB.status === 'def' || nutB.status === 'ok')) {
        interacoes.push({
          tipo: 'sinergismo_potencializador',
          nutA: a,
          nutB: b,
          statusA: nutA.status,
          statusB: nutB.status,
          severidade: inter.severidade,
          mecanismo: inter.mecanismo,
          interpretacao: `Deficiência de ${a} pode comprometer também a eficiência de ${b} — são sinérgicos`,
          fonte: inter.fonte_ref,
        })
      }
    }
  }

  // Verificar efeito de pH
  const pHObj = soloNuts.find(n => n.nut === 'pH')
  if (pHObj && pHObj.valor !== null) {
    const pH = pHObj.valor
    if (pH < 5.5) {
      interacoes.push({
        tipo: 'ph_acido',
        nutA: 'pH',
        nutB: 'múltiplos',
        severidade: pH < 5.0 ? 3 : 2,
        mecanismo: `pH ${pH} (< 5.5): Mn e Fe são solubilizados em excesso (toxicidade); Al e outros metais podem ser mobilizados; disponibilidade de Mo, B, Ca, Mg e P reduzida.`,
        interpretacao: `Solo ácido (pH ${pH}) cria ambiente que exacerba toxicidade de Mn/Fe e reduz disponibilidade de Ca, Mg, Mo, P e B`,
        fonte: 'CQFS RS/SC (2016) p.35',
      })
    } else if (pH > 7.0) {
      interacoes.push({
        tipo: 'ph_alcalino',
        nutA: 'pH',
        nutB: 'múltiplos',
        severidade: pH > 7.5 ? 3 : 2,
        mecanismo: `pH ${pH} (> 7.0): Fe, Mn, Zn, Cu, B tornam-se insolúveis; P precipita como Ca3(PO4)2. Mo tem maior disponibilidade.`,
        interpretacao: `Solo alcalino (pH ${pH}) reduz disponibilidade de Fe, Mn, Zn, Cu, B e P — micronutrientes em risco mesmo com adubação`,
        fonte: 'Marschner (2012) p.350',
      })
    }
  }

  return interacoes
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 4 — Impacto Hormonal
// ─────────────────────────────────────────────────────────────────────────────

function avaliarImpactoHormonal(allNuts) {
  const statusMap = {}
  for (const n of allNuts) {
    if (!statusMap[n.nut] || n.status !== 'nd') statusMap[n.nut] = n
  }

  const impactos = []

  for (const [hormonioId, hormonio] of Object.entries(HORMONE_DATABASE)) {
    const nutsAfetados = []
    let maxSeveridade = 0

    for (const [nut, dep] of Object.entries(hormonio.dependencia_nutricional)) {
      const nutStatus = statusMap[nut]
      if (!nutStatus || nutStatus.status === 'nd') continue

      if (nutStatus.status === 'def') {
        const sevScore = dep.nivel === 'crítico' ? 3 : dep.nivel === 'importante' ? 2 : 1
        maxSeveridade = Math.max(maxSeveridade, sevScore)
        nutsAfetados.push({
          nut,
          status: 'deficiente',
          nivel: dep.nivel,
          mecanismo: dep.mecanismo,
        })
      } else if (nutStatus.status === 'alto' || nutStatus.status === 'toxico') {
        nutsAfetados.push({
          nut,
          status: 'excessivo',
          nivel: dep.nivel,
          mecanismo: dep.mecanismo,
        })
        maxSeveridade = Math.max(maxSeveridade, 2)
      }
    }

    if (nutsAfetados.length > 0 && maxSeveridade >= 2) {
      impactos.push({
        hormonio: hormonio.nome,
        hormonioId,
        abrev: hormonio.abrev,
        funcoes: hormonio.funcoes.slice(0, 3),
        nutsAfetados,
        severidade: maxSeveridade,
        impacto: hormonio.impacto_deficiencia,
        fonte: hormonio.fonte_ref,
      })
    }
  }

  // Ordenar por severidade
  return impactos.sort((a, b) => b.severidade - a.severidade)
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 5 — Avaliação de Antioxidantes
// ─────────────────────────────────────────────────────────────────────────────

function avaliarAntioxidantes(allNuts) {
  const statusMap = {}
  for (const n of allNuts) {
    if (!statusMap[n.nut] || n.status !== 'nd') statusMap[n.nut] = n
  }

  const resultado = []
  for (const [enzId, enz] of Object.entries(ANTIOXIDANT_ENZYMES)) {
    const nutsAfetados = []
    for (const nut of (enz.isozimas ? enz.isozimas.flatMap(i => i.nutrientes) : enz.nutrientes || [])) {
      const s = statusMap[nut]
      if (s && s.status === 'def') nutsAfetados.push(nut)
    }
    if (nutsAfetados.length > 0) {
      resultado.push({ enzima: enz.nome, nutsDeficientes: nutsAfetados, impacto: `Atividade reduzida de ${enz.nome} por carência de: ${nutsAfetados.join(', ')}` })
    }
  }
  return resultado
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 6 — Recomendações Priorizadas
// ─────────────────────────────────────────────────────────────────────────────

function gerarRecomendacoes(diagnosticos, interacoes, estadioKey, clima, cultura) {
  const recs = []

  // Recomendações por deficiência detectada
  for (const diag of diagnosticos.filter(d => d.status === 'def')) {
    const prof   = NUTRIENT_PROFILES[diag.nut]
    const peso   = diag.estadioPeso
    const grav   = diag.grav
    const prioridade = (grav === 'severo' ? 3 : grav === 'moderado' ? 2 : 1) * (peso / 10)

    recs.push({
      tipo: 'correcao_deficiencia',
      prioridade,
      urgencia: grav === 'severo' ? 'imediata' : grav === 'moderado' ? 'curto_prazo' : 'preventiva',
      nut: diag.nut,
      acao: prof ? `Corrigir deficiência de ${prof.nome} (${diag.nut}) via ${diag.fonte === 'foliar' ? 'aplicação foliar' : 'solo/foliar'}` : `Corrigir ${diag.nut}`,
      justificativa: prof ? prof.deficiencia.impacto_produtivo : '',
      estagios_ideais: prof ? prof.estagios_criticos : [],
      fonte: prof ? prof.fonte_ref : '',
    })
  }

  // Recomendações para antagonismos explicativos
  for (const inter of interacoes.filter(i => i.tipo === 'antagonismo_explicativo')) {
    recs.push({
      tipo: 'resolver_antagonismo',
      prioridade: inter.severidade,
      urgencia: 'curto_prazo',
      nut: inter.nutB,
      acao: `Resolver antagonismo: excesso de ${inter.nutA} inibe ${inter.nutB}. Reduzir ${inter.nutA} e aplicar ${inter.nutB} foliar.`,
      justificativa: inter.mecanismo,
      estagios_ideais: [],
      fonte: inter.fonte,
    })
  }

  // Recomendações para correção de pH
  for (const inter of interacoes.filter(i => i.tipo === 'ph_acido' || i.tipo === 'ph_alcalino')) {
    recs.push({
      tipo: 'correcao_ph',
      prioridade: inter.severidade + 1,
      urgencia: 'planejamento',
      nut: 'pH',
      acao: inter.tipo === 'ph_acido'
        ? 'Realizar calagem para elevar pH ao intervalo 5.8–6.5 (Embrapa Soja) — base para disponibilidade de todos os nutrientes'
        : 'Adicionar matéria orgânica, gesso e enxofre para reduzir pH; verificar micronutrientes quelados',
      justificativa: inter.mecanismo,
      estagios_ideais: ['Entre-safras'],
      fonte: inter.fonte,
    })
  }

  // Recomendações de protocolos milho-específicos por deficiências detectadas
  if (normCultura(cultura) === 'milho') {
    const defs = diagnosticos.filter(d => d.status === 'def').map(d => d.nut)
    const estadioNum = parseInt(estadioKey?.replace(/[^0-9]/g, '')) || 0
    const isVegetativo = estadioKey?.startsWith('V') || estadioKey === 'VE'
    const isVT_R1 = ['VT','R1'].includes(estadioKey)
    const isReprodutivo = ['R1','R2','R3','R4','R5'].includes(estadioKey)

    // Protocolo de crescimento radicular
    if (isVegetativo && defs.some(n => ['P','Zn','Ca','B'].includes(n))) {
      const proto = MANIPULATION_PROTOCOLS_MILHO.crescimento_radicular
      recs.push({ tipo: 'protocolo_milho', prioridade: 2.5, urgencia: 'curto_prazo', nut: null, acao: `Protocolo Raiz Milho: ${proto.nutrientes.slice(0,2).map(n => n.nut).join('+')} — ${proto.objetivo}`, justificativa: proto.mecanismo_fisiologico.substring(0, 200), fonte: proto.fonte_ref })
    }
    // Protocolo de pegamento floral
    if ((isVT_R1 || estadioKey === 'V16' || estadioKey === 'V15') && defs.some(n => ['B','Ca','K','Zn'].includes(n))) {
      const proto = MANIPULATION_PROTOCOLS_MILHO.pegamento_floral
      recs.push({ tipo: 'protocolo_milho', prioridade: 4.5, urgencia: 'imediata', nut: null, acao: `URGENTE — Protocolo Pegamento Floral Milho: B+Ca+K+Zn — ${proto.objetivo}`, justificativa: proto.alertas[0], fonte: proto.fonte_ref })
    }
    // Protocolo de assimilação de N
    if (!isVegetativo || estadioNum >= 6) {
      if (defs.some(n => ['N','Mo','Mg','S','Fe'].includes(n))) {
        const proto = MANIPULATION_PROTOCOLS_MILHO.assimilacao_nitrogenio
        recs.push({ tipo: 'protocolo_milho', prioridade: 3.5, urgencia: 'curto_prazo', nut: null, acao: `Protocolo Assimilação N Milho: Mo+Mg+S — ${proto.objetivo.substring(0,80)}`, justificativa: proto.mecanismo_fisiologico.substring(0, 200), fonte: proto.fonte_ref })
      }
    }
    // Protocolo antioxidante
    if (defs.some(n => ['Mn','Zn','Cu','Fe'].includes(n)) && (estadioNum >= 6 || isReprodutivo)) {
      const proto = MANIPULATION_PROTOCOLS_MILHO.defesa_antioxidante
      recs.push({ tipo: 'protocolo_milho', prioridade: 2.0, urgencia: 'proativo', nut: null, acao: `Protocolo Antioxidante Milho: Mn+Zn+Cu+Fe — ${proto.objetivo.substring(0,80)}`, justificativa: `Enzimas alvo: SOD (Cu/Zn), Mn-SOD, Fe-SOD, CAT, POD. ${proto.alertas[0]}`, fonte: proto.fonte_ref })
    }
  }

  // Recomendações baseadas no estádio fenológico (cultura-específico)
  const stageDemands = normCultura(cultura) === 'milho'
    ? PHENOLOGY_DEMANDS_MILHO[estadioKey]
    : PHENOLOGY_DEMANDS[estadioKey]
  if (stageDemands) {
    for (const manip of stageDemands.manipulacoes || []) {
      recs.push({
        tipo: 'manipulacao_fisiologica',
        prioridade: 1.5,
        urgencia: 'proativo',
        nut: null,
        acao: manip,
        justificativa: `Recomendação específica para o estádio ${estadioKey} (${stageDemands.label})`,
        estagios_ideais: [estadioKey],
        fonte: 'Embrapa Soja (2013); Sfredo (2008)',
      })
    }
  }

  // Recomendações por estresse climático
  if (clima) {
    const { diasSemChuva = 0, tempMax = 28 } = clima
    if (diasSemChuva >= STRESS_RESPONSES.seca.limiar_dias) {
      recs.push({
        tipo: 'estresse_climatico',
        prioridade: diasSemChuva >= STRESS_RESPONSES.seca.limiar_critico ? 4 : 2.5,
        urgencia: diasSemChuva >= STRESS_RESPONSES.seca.limiar_critico ? 'imediata' : 'curto_prazo',
        nut: null,
        acao: STRESS_RESPONSES.seca.recomendacao_geral,
        justificativa: `Déficit hídrico de ${diasSemChuva} dias compromete absorção de K, Ca, N e B`,
        estagios_ideais: [estadioKey],
        fonte: STRESS_RESPONSES.seca.fonte_ref,
      })
    }
    if (tempMax >= STRESS_RESPONSES.calor_extremo.critico_temp) {
      recs.push({
        tipo: 'estresse_climatico',
        prioridade: 3,
        urgencia: 'imediata',
        nut: null,
        acao: STRESS_RESPONSES.calor_extremo.recomendacao_geral,
        justificativa: `Temperatura máxima de ${tempMax}°C inibe FBN e compromete pegamento floral`,
        estagios_ideais: [estadioKey],
        fonte: STRESS_RESPONSES.calor_extremo.fonte_ref,
      })
    }
  }

  // Ordenar por prioridade decrescente
  return recs.sort((a, b) => b.prioridade - a.prioridade)
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 7 — Score de Sanidade Nutricional
// ─────────────────────────────────────────────────────────────────────────────

function calcularScore(diagnosticos, interacoes, clima) {
  let score = 100
  const deducoes = []

  // Deduções por deficiência (foliar pesa mais — dado mais preciso)
  for (const d of diagnosticos.filter(d => d.status === 'def')) {
    const pesoBruto = (d.grav === 'severo' ? 12 : d.grav === 'moderado' ? 7 : 4)
    const pesoFonte = d.fonte === 'foliar' ? 1.4 : 0.9
    const ded       = Math.min(pesoBruto * pesoFonte * (d.estadioPeso / 10), 20)
    score -= ded
    deducoes.push({ motivo: `Def. ${d.nut} (${d.grav}, ${d.fonte})`, pontos: -ded.toFixed(1) })
  }

  // Deduções por toxicidade
  for (const d of diagnosticos.filter(d => d.status === 'toxico')) {
    const ded = 8
    score -= ded
    deducoes.push({ motivo: `Tox. ${d.nut}`, pontos: -ded })
  }

  // Deduções por antagonismos explicativos
  for (const inter of interacoes.filter(i => i.tipo === 'antagonismo_explicativo')) {
    const ded = inter.severidade * 2
    score -= ded
    deducoes.push({ motivo: `Antagonismo ${inter.nutA}→${inter.nutB}`, pontos: -ded })
  }

  // Deduções por pH crítico
  for (const inter of interacoes.filter(i => i.tipo === 'ph_acido' || i.tipo === 'ph_alcalino')) {
    const ded = inter.severidade * 3
    score -= ded
    deducoes.push({ motivo: `pH ${inter.tipo === 'ph_acido' ? 'ácido' : 'alcalino'}`, pontos: -ded })
  }

  // Deduções por estresse climático
  if (clima) {
    const { diasSemChuva = 0, tempMax = 28 } = clima
    if (diasSemChuva >= 14) { score -= 15; deducoes.push({ motivo: `Seca severa (${diasSemChuva} dias)`, pontos: -15 }) }
    else if (diasSemChuva >= 7) { score -= 5; deducoes.push({ motivo: `Déficit hídrico (${diasSemChuva} dias)`, pontos: -5 }) }
    if (tempMax >= 35) { score -= 8; deducoes.push({ motivo: `Calor extremo (${tempMax}°C)`, pontos: -8 }) }
  }

  score = Math.max(0, Math.round(score))

  let label, cor, corClass
  if (score >= 85) { label = 'Excelente'; cor = '#16a34a'; corClass = 'green' }
  else if (score >= 70) { label = 'Bom'; cor = '#65a30d'; corClass = 'lime' }
  else if (score >= 55) { label = 'Regular'; cor = '#d97706'; corClass = 'amber' }
  else if (score >= 40) { label = 'Crítico'; cor = '#ea580c'; corClass = 'orange' }
  else { label = 'Alarmante'; cor = '#dc2626'; corClass = 'red' }

  return { score, label, cor, corClass, deducoes }
}

// ─────────────────────────────────────────────────────────────────────────────
// Etapa 8 — Identificação de Sintomas Prováveis
// ─────────────────────────────────────────────────────────────────────────────

function mapearSintomas(diagnosticos) {
  const defsNuts = new Set(diagnosticos.filter(d => d.status === 'def').map(d => d.nut))
  const altosNuts = new Set(diagnosticos.filter(d => d.status === 'alto' || d.status === 'toxico').map(d => d.nut))

  const sintomas = []
  for (const [sintId, sintoma] of Object.entries(SYMPTOMS_DB)) {
    // Checar se alguma causa provável está confirmada pela análise
    const causasConfirmadas = sintoma.causas.filter(c => defsNuts.has(c.nut) || altosNuts.has(c.nut))
    if (causasConfirmadas.length > 0) {
      sintomas.push({
        sintoma: sintoma.descricao,
        causasConfirmadas: causasConfirmadas.map(c => ({
          nut: c.nut,
          probabilidade: (c.prob * 100).toFixed(0) + '%',
          mecanismo: c.mecanismo,
        })),
        diferenciacao: sintoma.diferenciacao,
      })
    }
  }
  return sintomas
}

// ─────────────────────────────────────────────────────────────────────────────
// FUNÇÃO PRINCIPAL — runDiagnostic
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Executa o diagnóstico agronômico completo.
 *
 * @param {object} params
 * @param {object} params.data          — dados do wizard (todos os campos)
 * @param {string} params.cultura       — 'soja' | 'milho' | 'feijao'
 * @param {string} params.estadio       — ex: 'V4', 'R1', 'R3'
 * @param {object} [params.clima]       — { diasSemChuva, tempMax }
 * @returns {DiagnosticResult}
 */
export function runDiagnostic({ data, cultura, estadio, clima } = {}) {
  const estadioKey = estadioParaKey(estadio, cultura)

  // 1. Classificar nutrientes
  const foliarNuts = classificarFoliar(data, cultura)
  const soloNuts   = classificarSolo(data, cultura)
  const allNuts    = [...foliarNuts, ...soloNuts]

  // 2. Adicionar peso de estádio
  const diagnosticos = allNuts
    .filter(n => n.status !== 'nd')
    .map(n => ({ ...n, estadioPeso: getEstadioPeso(n.nut, estadioKey, cultura) }))

  // 3. Interações
  const interacoes = analisarInteracoes(foliarNuts, soloNuts)

  // 4. Impacto hormonal
  const impactoHormonal = avaliarImpactoHormonal(allNuts)

  // 5. Antioxidantes
  const antioxidantes = avaliarAntioxidantes(allNuts)

  // 6. Recomendações
  const recomendacoes = gerarRecomendacoes(diagnosticos, interacoes, estadioKey, clima, cultura)

  // 7. Score
  const scoreData = calcularScore(diagnosticos, interacoes, clima)

  // 8. Sintomas
  const sintomasProvaveis = mapearSintomas(diagnosticos)

  // 9. Estádio (cultura-específico)
  const isMilhoDiag = normCultura(cultura) === 'milho'
  const demandaEstadio = isMilhoDiag
    ? (PHENOLOGY_DEMANDS_MILHO[estadioKey] || null)
    : (PHENOLOGY_DEMANDS[estadioKey] || null)

  // Resumo executivo
  const defs    = diagnosticos.filter(d => d.status === 'def')
  const altos   = diagnosticos.filter(d => d.status === 'alto' || d.status === 'toxico')
  const criticos = defs.filter(d => d.estadioPeso >= 9)

  return {
    // Metadados
    cultura,
    estadio,
    estadioKey,
    demandaEstadio,
    timestamp: new Date().toISOString(),
    versao: '1.0.0',
    motor: 'AgroEngine Offline',

    // Dados classificados
    foliarNuts,
    soloNuts,
    diagnosticos,

    // Resultados analíticos
    interacoes,
    impactoHormonal,
    antioxidantes,
    sintomasProvaveis,

    // Score
    ...scoreData,

    // Recomendações
    recomendacoes,

    // Resumo
    resumo: {
      totalDefs: defs.length,
      totalAltos: altos.length,
      totalInteracoes: interacoes.filter(i => i.tipo === 'antagonismo_explicativo').length,
      criticos: criticos.map(d => d.nut),
      alertaPrincipal: criticos.length > 0
        ? `Deficiência crítica de ${criticos.map(d => d.nut).join(', ')} no estádio ${estadio} (alta prioridade)`
        : defs.length > 0
        ? `${defs.length} nutriente(s) abaixo do adequado — monitorar`
        : 'Nutrição dentro dos padrões de referência',
      fontesPrimarias: Object.values(BIBLIOGRAPHY).slice(0, 4),
    },
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitário — Busca de protocolo de recomendação
// ─────────────────────────────────────────────────────────────────────────────

export function getProtocolo(objetivo) {
  return RECOMMENDATION_PROTOCOLS[objetivo] || null
}

export function getNutrientProfile(nut) {
  return NUTRIENT_PROFILES[nut] || null
}

export function getInteractionsList(nut) {
  return Object.entries(INTERACTIONS)
    .filter(([k]) => k.startsWith(nut + '→') || k.endsWith('→' + nut))
    .map(([k, v]) => ({ chave: k, ...v }))
}

export function getSymptomsForNut(nut) {
  return Object.entries(SYMPTOMS_DB)
    .filter(([, s]) => s.causas.some(c => c.nut === nut))
    .map(([id, s]) => ({ id, descricao: s.descricao, diferenciacao: s.diferenciacao }))
}

export {
  PHENOLOGY_DEMANDS, PHENOLOGY_DEMANDS_MILHO,
  RECOMMENDATION_PROTOCOLS, MANIPULATION_PROTOCOLS_MILHO,
  CORN_PRODUCTIVITY_PROFILES, SOJA_PRODUCTIVITY_PROFILES,
  CROP_INTELLIGENCE,
  HORMONE_DATABASE, BIBLIOGRAPHY,
}

// ─── Utilitários públicos adicionais ─────────────────────────────────────────

export function getManipulacaoProtocol(objetivo, cultura) {
  if (normCultura(cultura) === 'milho') {
    return MANIPULATION_PROTOCOLS_MILHO[objetivo] || null
  }
  return RECOMMENDATION_PROTOCOLS[objetivo] || null
}

export function getProductivityProfile(cultura, metaSc) {
  const cult = normCultura(cultura)
  const profiles = cult === 'milho' ? CORN_PRODUCTIVITY_PROFILES : SOJA_PRODUCTIVITY_PROFILES
  if (profiles[metaSc]) return profiles[metaSc]
  const keys = Object.keys(profiles).map(Number).sort((a, b) => a - b)
  const closest = keys.reduce((prev, cur) => Math.abs(cur - metaSc) < Math.abs(prev - metaSc) ? cur : prev)
  return profiles[closest] || null
}

export function getCropIntelligence(topico) {
  return CROP_INTELLIGENCE[topico] || CROP_INTELLIGENCE
}
