import { buildRefContext } from '../data/referencias'
import { fetchKnowledgeContext } from './conhecimentoService'

/**
 * Fetches Supabase knowledge context (gracefully returns '' if offline/error).
 */
async function getKnowledge(cultura, lang) {
  try { return await fetchKnowledgeContext(cultura, isEn(lang) ? 'en' : 'pt') } catch { return '' }
}

// lang = t.promptLang (either PT or EN instruction string)
function isEn(lang) { return lang.includes('ENGLISH') }

function ctx(d, lang) {
  const en = isEn(lang)
  return `${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | ${en ? 'Season' : 'Safra'} ${d.safra}
${en ? 'Stage' : 'Estádio'}: ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha | ${en ? 'Last yield' : 'Última prod.'}: ${d.prodUltima||'nd'} sc/ha
${en ? 'Fertilization' : 'Adubação'}: ${d.adubacao}
${en ? 'Stress' : 'Estresse'}: ${d.stresse ? (en ? 'YES — ' : 'SIM — ') + d.tiposStresse.join(', ') : (en ? 'NO' : 'NÃO')}
${en ? 'Disease' : 'Moléstia'}: ${d.molestia === true ? (en ? 'YES — ' : 'SIM — ') + d.doencas.join(', ') : (en ? 'NO' : 'NÃO')}
${en ? 'Occurrences' : 'Ocorrências'}: ${[...d.ocorrencias, d.outrasOcorrencias].filter(Boolean).join(', ')||(en ? 'none' : 'nenhuma')}
${en ? 'Symptoms' : 'Sintomas'}: ${d.sintomas||(en ? 'none' : 'nenhum')}
SOIL: pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}
FOLIAR: N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
}

function base(lang) {
  return isEn(lang)
    ? 'Senior expert in plant physiology. Based on: Marschner (2012), Taiz & Zeiger (2017), Kerbauy (2008), Embrapa.'
    : 'Especialista sênior em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Kerbauy (2008), Embrapa.'
}

export function buildDiagnosePrompt1(d, lang) {
  const en = isEn(lang)
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, V%=${d.vSolo||'nd'}, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`

  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | ${en ? 'Season' : 'Safra'} ${d.safra}
${en ? 'Stage' : 'Estádio'}: ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha | ${en ? 'Last yield' : 'Última prod.'}: ${d.prodUltima||'nd'} sc/ha
${en ? 'Fertilization' : 'Adubação'}: ${d.adubacao}
${en ? 'Visible in photo' : 'Visível na foto'}: ${(d.visivel||[]).join(', ')||(en ? 'not provided' : 'não informado')}
${en ? 'Stress' : 'Estresse'}: ${d.stresse ? (en ? 'YES — ' : 'SIM — ') + d.tiposStresse.join(', ') : (en ? 'NO' : 'NÃO')}
${en ? 'Symptoms' : 'Sintomas'}: ${d.sintomas||(en ? 'none' : 'nenhum')}
SOIL: ${solo}
FOLIAR: ${foliar}
${d.fotoB64 ? (en ? 'PHOTO ATTACHED: analyze coloration, symptoms and plant architecture.' : 'FOTO ANEXADA: analise coloração, sintomas e arquitetura da planta.') : ''}

${en ? 'Generate ONLY sections 1 and 2 in HTML:' : 'Gere SOMENTE as seções 1 e 2 em HTML:'}

<h3>🌿 1. ${en ? `Physiological Condition — Stage ${d.estadio}` : `Condição Fisiológica — Estádio ${d.estadio}`}</h3>
${en
  ? `5-6 technical lines: dominant metabolic processes, source/sink, photosynthesis, energy demands. Scientific reference. Target ${d.prodExpect} sc/ha.`
  : `5-6 linhas técnicas: processos metabólicos dominantes, source/sink, fotossíntese, demandas energéticas. Referência científica. Meta ${d.prodExpect} sc/ha.`}
${d.fotoB64 ? (en ? 'Also describe observable in the photo: coloration, architecture, symptoms.' : 'Descrever também o observável na foto: coloração, arquitetura, sintomas.') : ''}

<h3>🧬 2. ${en ? 'Hormonal Map' : 'Mapa Hormonal'}</h3>
<table><tr><th>${en ? 'Hormone' : 'Hormônio'}</th><th>${en ? 'Action in Stage' : 'Ação no Estádio'}</th><th>${en ? 'Key Nutrient' : 'Nutriente-chave'}</th></tr>...</table>
${en ? 'Include: Auxin, Cytokinin, Gibberellin, Ethylene, ABA. 5 lines.' : 'Incluir: Auxina, Citocinina, Giberelina, Etileno, ABA. 5 linhas.'}`
}

export function buildDiagnosePrompt2(d, lang) {
  const en = isEn(lang)
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, ${en ? 'Clay' : 'Argila'}=${d.argilaSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`

  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.cultura} | ${en ? 'Stage' : 'Estádio'} ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha
${en ? 'Stress' : 'Estresse'}: ${d.stresse ? (en ? 'YES — ' : 'SIM — ') + d.tiposStresse.join(', ') : (en ? 'NO' : 'NÃO')}
${en ? 'Occurrences' : 'Ocorrências'}: ${[...d.ocorrencias, d.outrasOcorrencias].filter(Boolean).join(', ')||(en ? 'none' : 'nenhuma')}
${en ? 'Symptoms' : 'Sintomas'}: ${d.sintomas||(en ? 'none' : 'nenhum')}
${en ? 'Disease' : 'Moléstia'}: ${d.molestia === true ? (en ? 'YES — ' : 'SIM — ') + d.doencas.join(', ') : (en ? 'NO' : 'NÃO')}
SOIL: ${solo}
FOLIAR: ${foliar}

${en ? `Generate ONLY sections 3${d.stresse ? ', 4' : ''} and ${d.stresse ? '5' : '4'} in HTML:` : `Gere SOMENTE as seções 3${d.stresse ? ', 4' : ''} e ${d.stresse ? '5' : '4'} em HTML:`}

<h3>🧪 3. ${en ? 'Nutritional Requirement' : 'Exigência Nutricional'}</h3>
${en
  ? `Table N,P,K,Ca,Mg,S,Fe,Zn,Cu,Mn,B,Mo: <table><tr><th>Nutrient</th><th>Dose</th><th>Function</th><th>Status</th><th>Foliar Eff.</th><th>Foliar Dose</th></tr></table>
Status:✅/⚠️/❌/—. Foliar Eff.:✅High/⚠️Medium/❌Low. Foliar Dose(g or kg/ha): corrective❌, preventive⚠️, —✅.
Antagonisms: 3 pairs <ul><li><strong>A×B:</strong>mechanism→interval</li></ul>No brands.`
  : `Tabela N,P,K,Ca,Mg,S,Fe,Zn,Cu,Mn,B,Mo: <table><tr><th>Nutriente</th><th>Dose</th><th>Função</th><th>Status</th><th>Efic.Foliar</th><th>Dose Foliar</th></tr></table>
Status:✅/⚠️/❌/—. Efic.Foliar:✅Alta/⚠️Média/❌Baixa. Dose Foliar(g ou kg/ha):corretiva❌,preventiva⚠️,—✅.
Antagonismos: 3 pares <ul><li><strong>A×B:</strong>mecanismo→intervalo</li></ul>Sem marcas.`}
${d.stresse ? `<h3>⚠️ 4. ${en ? `Stress — ${d.tiposStresse.join('+')}` : `Estresse — ${d.tiposStresse.join('+')}`}</h3>${en ? 'Cell damage, hormones (ABA/ethylene/jasmonate), affected nutrients. 4 lines.' : 'Dano celular, hormônios (ABA/etileno/jasmonato), nutrientes afetados. 4 linhas.'}` : ''}
<h3>${d.stresse ? '5' : '4'}. 🔴 ${en ? 'Bottlenecks' : 'Gargalos'}</h3>
<ul><li><strong>[${en ? 'Bottleneck' : 'Gargalo'}]:</strong>${en ? 'description→impact(-X sc/ha)→🔴/🟡/🟢' : 'descrição→impacto(-X sc/ha)→🔴/🟡/🟢'}</li></ul>${en ? '3-4 items. Total risk without intervention.' : '3-4 itens. Risco total sem intervenção.'}`
}

export function buildLaudoPrompt1(d, lang) {
  const en = isEn(lang)
  return `${lang}
${base(lang)}
${ctx(d, lang)}

${en ? 'Generate ONLY sections 1, 2 and 3 of the technical report in HTML.' : 'Gere SOMENTE as seções 1, 2 e 3 do laudo técnico em HTML.'}

<h3>📋 1. ${en ? 'Farm Summary' : 'Resumo da Lavoura'}</h3>
${en ? 'Table 8 rows: Producer, Crop, Variety/Hybrid, Season, Stage, Last Yield, Expected, Location.' : 'Tabela 8 linhas: Produtor, Cultura, Híbrido/Variedade, Safra, Estádio, Última Produtividade, Expectativa, Local.'}
<table><tr><th>${en ? 'Item' : 'Item'}</th><th>${en ? 'Data' : 'Dado'}</th></tr>...</table>

<h3>🌿 2. ${en ? 'Current Physiological Condition' : 'Condição Fisiológica Atual'}</h3>
${en
  ? `Stress level (Absent/Mild/Moderate/Severe) with justification. Physiological processes, metabolic demand, implications for ${d.prodExpect} sc/ha. 4-5 lines.`
  : `Nível de estresse (Ausente/Leve/Moderado/Severo) com justificativa. Processos fisiológicos, demanda metabólica, implicações para ${d.prodExpect} sc/ha. 4-5 linhas.`}

<h3>🧪 3. ${en ? 'Nutritional Interpretation' : 'Interpretação Nutricional'}</h3>
${en
  ? `<strong>Soil:</strong> limitations (pH, Al, V%, deficiencies). 2-3 lines.
<strong>Foliar:</strong> sufficiency/deficiency and antagonisms. 2-3 lines.
Table N, P, K, Ca, Mg, S, B, Zn, Cu, Mn, Fe:
<table><tr><th>Nutrient</th><th>Soil</th><th>Foliar</th><th>Status</th><th>Physiological Impact</th></tr></table>
Status: ✅ Adequate / ⚠️ Borderline / ❌ Deficient / — no data.`
  : `<strong>Solo:</strong> limitações (pH, Al, V%, deficiências). 2-3 linhas.
<strong>Foliar:</strong> suficiência/deficiência e antagonismos. 2-3 linhas.
Tabela N, P, K, Ca, Mg, S, B, Zn, Cu, Mn, Fe:
<table><tr><th>Nutriente</th><th>Solo</th><th>Foliar</th><th>Status</th><th>Impacto Fisiológico</th></tr></table>
Status: ✅ Adequado / ⚠️ Limite / ❌ Deficiente / — sem dado.`}`
}

export function buildLaudoPrompt2(d, lang) {
  const en = isEn(lang)
  return `${lang}
${base(lang)}
${ctx(d, lang)}
${en ? 'OBJECTIVES' : 'OBJETIVOS'}: ${d.objetivos.join(', ')}

${en ? 'Generate ONLY sections 4 and 5 of the technical report in HTML.' : 'Gere SOMENTE as seções 4 e 5 do laudo técnico em HTML.'}

<h3>🔴 4. ${en ? 'Physiological Diagnosis' : 'Diagnose Fisiológica'}</h3>
${en
  ? `<strong>Bottlenecks:</strong>
<ul><li><strong>[Bottleneck]:</strong> description → impact (sc/ha) → urgency 🔴/🟡/🟢</li></ul>
4 main bottlenecks.
<strong>Estimated loss without intervention:</strong> X to Y sc/ha.
<strong>Immediate risks (2 weeks):</strong> 2-3 lines.`
  : `<strong>Gargalos:</strong>
<ul><li><strong>[Gargalo]:</strong> descrição → impacto (sc/ha) → urgência 🔴/🟡/🟢</li></ul>
4 principais gargalos.
<strong>Perda estimada sem intervenção:</strong> X a Y sc/ha.
<strong>Riscos imediatos (2 semanas):</strong> 2-3 linhas.`}

<h3>🎯 5. ${en ? 'Physiological Objectives' : 'Objetivos Fisiológicos'}</h3>
<ul><li><strong>[${en ? 'Objective' : 'Objetivo'}]:</strong> ${en ? `justification for stage ${d.estadio} — compounds: [active principles]` : `justificativa para estádio ${d.estadio} — compostos: [princípios ativos]`}</li></ul>
${en ? 'NEVER cite brands.' : 'NUNCA citar marcas.'}`
}

export async function buildDiagnoseOption01Prompt(d, lang) {
  const en = isEn(lang)
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
  const refs = buildRefContext(d.cultura, en)
  const knowledge = await getKnowledge(d.cultura, lang)

  return `${lang}
${en ? 'Expert in plant physiology.' : 'Especialista em fisiologia vegetal.'} ${en ? 'Based on: Marschner (2012), Taiz & Zeiger (2017), Embrapa.' : 'Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.'}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | ${en ? 'Season' : 'Safra'} ${d.safra}
${en ? 'Stage' : 'Estádio'}: ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha
${en ? 'Symptoms' : 'Sintomas'}: ${d.sintomas||(en ? 'none' : 'nenhum')}
${d.fotoB64 ? (en ? 'PHOTO ATTACHED: correlate visual symptoms with analytical data.' : 'FOTO ANEXADA: correlacione sintomas visuais com dados analíticos.') : ''}
SOIL: ${solo}
FOLIAR: ${foliar}

${refs}
${knowledge}
${en ? 'Generate deficiency/toxicity diagnosis as HTML (no markdown, pure HTML tags):' : 'Gere diagnose de deficiência/toxidez em HTML puro (sem markdown, apenas tags HTML):'}

<h3>🔬 ${en ? 'Deficiency/Toxicity Diagnosis' : 'Diagnose de Deficiência/Toxidez'}</h3>
${en
  ? `<table><tr><th>Nutrient</th><th>Soil (measured)</th><th>Soil Ref.</th><th>Foliar (measured)</th><th>Foliar Ref.</th><th>Status</th><th>Visual Symptom</th><th>Priority</th></tr>...</table>
MANDATORY: rows in EXACT sequence — 1.N 2.P 3.K 4.Ca 5.Mg 6.S 7.B 8.Zn 9.Cu 10.Mn 11.Fe 12.Mo — do not reorder.
Status: ✅Adequate / ⚠️Borderline / ❌Deficient / ☠️Toxic. Priority: 🔴High/🟡Medium/🟢Low.
Use the reference values provided above.
After the table add: <h4>Main findings:</h4> — 3-4 technical lines correlating soil, foliar and visual symptoms.`
  : `<table><tr><th>Nutriente</th><th>Solo (medido)</th><th>Ref. Solo</th><th>Foliar (medido)</th><th>Ref. Foliar</th><th>Status</th><th>Sintoma Visual</th><th>Prioridade</th></tr>...</table>
OBRIGATÓRIO: linhas em ORDEM EXATA — 1.N 2.P 3.K 4.Ca 5.Mg 6.S 7.B 8.Zn 9.Cu 10.Mn 11.Fe 12.Mo — não reordenar.
Status: ✅Adequado / ⚠️Limite / ❌Deficiente / ☠️Tóxico. Prioridade: 🔴Alta/🟡Média/🟢Baixa.
Use os valores de referência fornecidos acima.
Após a tabela adicione: <h4>Principais achados:</h4> — 3-4 linhas técnicas correlacionando solo, foliar e sintomas visuais.`}`
}

export async function buildDiagnoseOption02Prompt(d, lang) {
  const en = isEn(lang)
  const knowledge = await getKnowledge(d.cultura, lang)
  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.cultura} | ${en ? 'Stage' : 'Estádio'} ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha
${en ? 'Stress' : 'Estresse'}: ${d.stresse ? (en ? 'YES — ' : 'SIM — ') + d.tiposStresse.join(', ') : (en ? 'NO' : 'NÃO')}
${en ? 'Fertilization' : 'Adubação'}: ${d.adubacao}
${knowledge}
${en ? 'Generate hormonal map as pure HTML (no markdown):' : 'Gere mapa hormonal em HTML puro (sem markdown):'}

<h3>🧬 ${en ? `Hormonal Map — Stage ${d.estadio}` : `Mapa Hormonal — Estádio ${d.estadio}`}</h3>
${en
  ? `<table><tr><th>Hormone</th><th>Status</th><th>Action at Stage</th><th>Macronutrients Involved</th><th>Micronutrients Involved</th><th>Management Implication</th></tr>...</table>
Include: Auxin, Cytokinin, Gibberellin, Ethylene, ABA, Brassinosteroid, Jasmonate.
For each hormone: describe current synthesis/activity level at stage ${d.estadio}.
Macronutrients involved: list N/P/K/Ca/Mg/S that directly participate in synthesis, transport or signaling — with brief role in parentheses (e.g. "N (tryptophan precursor)", "K (membrane polarity)").
Micronutrients involved: list B/Zn/Cu/Mn/Fe/Mo with specific role (e.g. "Zn (IAA biosynthesis)", "Fe (ACC oxidase cofactor)").
Management implication: 1 concise line on which nutrient to apply to modulate this hormone.
Base: Kerbauy (2008), Taiz & Zeiger Ch. 19-23, Marschner (2012).`
  : `<table><tr><th>Hormônio</th><th>Status</th><th>Ação no Estádio</th><th>Macronutrientes Envolvidos</th><th>Micronutrientes Envolvidos</th><th>Implicação de Manejo</th></tr>...</table>
Incluir: Auxina, Citocinina, Giberelina, Etileno, ABA, Brassinoesteroide, Jasmonato.
Para cada hormônio: descrever nível atual de síntese/atividade no estádio ${d.estadio}.
Macronutrientes envolvidos: listar N/P/K/Ca/Mg/S que participam diretamente da síntese, transporte ou sinalização — com função resumida entre parênteses (ex: "N (precursor do triptofano)", "K (polaridade de membrana)").
Micronutrientes envolvidos: listar B/Zn/Cu/Mn/Fe/Mo com papel específico (ex: "Zn (biossíntese de IAA)", "Fe (cofator da ACC oxidase)").
Implicação de manejo: 1 linha concisa sobre qual nutriente aplicar para modular este hormônio.
Base: Kerbauy (2008), Taiz & Zeiger Cap. 19-23, Marschner (2012).`}`
}

export async function buildDiagnoseOption03Prompt(d, lang) {
  const en = isEn(lang)
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
  const refs = buildRefContext(d.cultura, en)
  const knowledge = await getKnowledge(d.cultura, lang)

  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.cultura} | ${en ? 'Stage' : 'Estádio'} ${d.estadio}
SOIL: ${solo}
FOLIAR: ${foliar}

${refs}
${knowledge}
${en ? 'Generate nutritional map as pure HTML (no markdown):' : 'Gere mapa nutricional em HTML puro (sem markdown):'}

<h3>🗺️ ${en ? 'Nutritional Map' : 'Mapa Nutricional'}</h3>
${en
  ? `<table><tr><th>Nutrient</th><th>Soil Value</th><th>Soil Ref.</th><th>Foliar Value</th><th>Foliar Ref.</th><th>Status</th><th>Physiological Impact</th></tr>...</table>
MANDATORY: rows in EXACT sequence — 1.N 2.P 3.K 4.Ca 5.Mg 6.S 7.B 8.Zn 9.Cu 10.Mn 11.Fe 12.Mo — do not reorder.
Status: ✅Adequate/⚠️Borderline/❌Deficient/—(no data).
Fill reference ranges from the data above. Be precise with the measured vs. reference comparison.`
  : `<table><tr><th>Nutriente</th><th>Valor Solo</th><th>Ref. Solo</th><th>Valor Foliar</th><th>Ref. Foliar</th><th>Status</th><th>Impacto Fisiológico</th></tr>...</table>
OBRIGATÓRIO: linhas em ORDEM EXATA — 1.N 2.P 3.K 4.Ca 5.Mg 6.S 7.B 8.Zn 9.Cu 10.Mn 11.Fe 12.Mo — não reordenar.
Status: ✅Adequado/⚠️Limite/❌Deficiente/—(sem dado).
Preencha as faixas de referência com os dados fornecidos acima. Seja preciso na comparação medido vs. referência.`}`
}

export async function buildCorrecaoPrompt(d, diagnoseHtml, lang) {
  const en = isEn(lang)
  const soloCtx = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, V%=${d.vSolo||'nd'}`
  const foliarCtx = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
  const refs = buildRefContext(d.cultura, en)
  const knowledge = await getKnowledge(d.cultura, lang)

  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.cultura} | ${en ? 'Stage' : 'Estádio'} ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha
${en ? 'Fertilization already applied' : 'Adubação já realizada'}: ${d.adubacao}
SOIL: ${soloCtx}
FOLIAR: ${foliarCtx}

${refs}
${knowledge}
${en ? 'DIAGNOSIS (use as basis — HTML):' : 'DIAGNOSE (use como base — HTML):'}
${diagnoseHtml}

${en
  ? `Based on the diagnosis above, generate a COMPLETE nutritional correction protocol as pure HTML.

MANDATORY RULES:
1. Include ALL nutrients with ❌Deficient or ⚠️Borderline status from the diagnosis
2. The "Dose" column is MANDATORY — never leave blank. Use the reference doses provided above.
   Examples of correct format: "2 kg/ha bórax (11% B)" | "300 g/ha sulfato de Zn via foliar" | "30 kg/ha N-ureia"
3. Always specify: amount + unit + source material (no commercial brand names)
4. Via: Soil / Foliar / Both — choose the most efficient for current stage ${d.estadio}
5. Timing: indicate phenological window (e.g., "R1–R2" or "immediately" or "next application")

<h3>💊 Nutritional Correction Protocol</h3>
<table><tr><th>Nutrient</th><th>Status</th><th>Via</th><th>Dose</th><th>Source (active ingredient)</th><th>Timing</th><th>Note</th></tr>...</table>

After the table add:
<h4>Priority order:</h4> — numbered list of corrections from most to least urgent, with brief justification.
<h4>Technical observations:</h4> — 2-3 lines on nutrient antagonisms and application synergies.`
  : `Com base na diagnose acima, gere um protocolo COMPLETO de correção nutricional em HTML puro.

REGRAS OBRIGATÓRIAS:
1. Inclua TODOS os nutrientes com status ❌Deficiente ou ⚠️Limite/Borderline da diagnose
2. A coluna "Dose" é OBRIGATÓRIA — nunca deixar em branco. Use as doses de referência fornecidas acima.
   Exemplos de formato correto: "2 kg/ha de bórax (11% B)" | "300 g/ha de sulfato de Zn via foliar" | "30 kg/ha de N-ureia"
3. Especifique sempre: quantidade + unidade + ingrediente ativo (sem marcas comerciais)
4. Via: Solo / Foliar / Ambos — escolha a mais eficiente para o estádio atual ${d.estadio}
5. Momento: indique a janela fenológica (ex: "R1–R2" ou "imediato" ou "próxima aplicação")

<h3>💊 Protocolo de Correção Nutricional</h3>
<table><tr><th>Nutriente</th><th>Status</th><th>Via</th><th>Dose</th><th>Fonte (ingrediente ativo)</th><th>Momento</th><th>Observação</th></tr>...</table>

Após a tabela adicione:
<h4>Ordem de prioridade:</h4> — lista numerada das correções da mais para a menos urgente, com breve justificativa.
<h4>Observações técnicas:</h4> — 2-3 linhas sobre antagonismos entre nutrientes e sinergias de aplicação.`}`
}

export async function buildManipPrompt(d, manipOptions, lang) {
  const en = isEn(lang)
  const knowledge = await getKnowledge(d.cultura, lang)
  const optionLabels = {
    raiz:       en ? 'Root Growth'            : 'Crescimento de Raiz',
    defesa:     en ? 'Cell Defense'           : 'Defesa Celular',
    prestresse: en ? 'Pre-Stress Management'  : 'Manejo Pré-Estresse',
    enchimento: en ? 'Grain Filling'          : 'Enchimento de Grão',
    floral:     en ? 'Floral Setting'         : 'Pegamento Floral',
  }
  const selectedLabels = manipOptions.map(o => optionLabels[o] || o).join(', ')

  return `${lang}
${base(lang)}
${en ? 'FARM' : 'LAVOURA'}: ${d.prodNome} | ${d.cultura} | ${en ? 'Stage' : 'Estádio'} ${d.estadio} | ${en ? 'Expected' : 'Expectativa'}: ${d.prodExpect} sc/ha
${en ? 'Fertilization' : 'Adubação'}: ${d.adubacao}
${en ? 'Stress' : 'Estresse'}: ${d.stresse ? (en ? 'YES — ' : 'SIM — ') + d.tiposStresse.join(', ') : (en ? 'NO' : 'NÃO')}${knowledge}

${en ? `Selected objectives: ${selectedLabels}` : `Objetivos selecionados: ${selectedLabels}`}

${en
  ? `For each selected objective, generate a structured HTML block as pure HTML (no markdown):

<h3>[icon] [Objective]</h3>
<p>2 lines: dominant physiological mechanism at stage ${d.estadio} and why this objective is critical now.</p>
<table>
  <tr><th>Nutrient</th><th>Type</th><th>Role in this Process</th><th>Recommended Action</th></tr>
  [3-5 rows ordered by importance]
</table>

RULES:
- Type: Macro or Micro
- Role: name the exact molecular/physiological function (e.g. "IAA precursor via tryptophan synthesis", "sucrose phloem loading", "stomatal ABA signaling", "pollen tube elongation")
- Recommended Action: concrete and specific, no commercial brands (e.g. "100–200 g/ha zinc sulfate foliar at ${d.estadio}", "ensure soil pH 6.0–6.5 for adequate uptake", "30 kg/ha N-urea split application")
- Never write generic text like "essential for growth" — always name the specific process
- Base: Marschner (2012), Kerbauy (2008), Taiz & Zeiger (2017)`
  : `Para cada objetivo selecionado, gere um bloco HTML estruturado em HTML puro (sem markdown):

<h3>[ícone] [Objetivo]</h3>
<p>2 linhas: mecanismo fisiológico dominante no estádio ${d.estadio} e por que este objetivo é crítico agora.</p>
<table>
  <tr><th>Nutriente</th><th>Tipo</th><th>Função neste Processo</th><th>Ação Recomendada</th></tr>
  [3-5 linhas em ordem de importância]
</table>

REGRAS:
- Tipo: Macro ou Micro
- Função: nomear o processo molecular/fisiológico específico (ex: "precursor de IAA via síntese de triptofano", "carregamento de sacarose no floema", "sinalização ABA para fechamento estomático", "elongação do tubo polínico")
- Ação Recomendada: concreta e específica, sem marcas comerciais (ex: "100–200 g/ha de sulfato de zinco via foliar no ${d.estadio}", "garantir pH do solo 6,0–6,5 para absorção adequada", "30 kg/ha de N-ureia parcelado")
- Nunca escrever textos genéricos como "essencial para crescimento" — sempre nomear o processo específico
- Base: Marschner (2012), Kerbauy (2008), Taiz & Zeiger (2017)`}`
}

export function buildLaudoPrompt3(d, lang) {
  const en = isEn(lang)
  return `${lang}
${base(lang)}
${ctx(d, lang)}
${en ? 'OBJECTIVES' : 'OBJETIVOS'}: ${d.objetivos.join(', ')}

${en ? 'Generate ONLY sections 6 and 7 of the technical report in HTML.' : 'Gere SOMENTE as seções 6 e 7 do laudo técnico em HTML.'}

<h3>💊 6. ${en ? 'Physiological Protocol' : 'Protocolo Fisiológico'}</h3>
${en
  ? `<strong>Macronutrients:</strong> elements → function at stage ${d.estadio}.
<strong>Micronutrients:</strong> elements → function and antagonisms.
<strong>Amino acids:</strong> 3-4 among proline, betaine, glycine, tryptophan, glutamine, arginine, methionine, cysteine, phenylalanine, asparagine — relevant to stage and objectives. Name → function → benefit.
<strong>Seaweed:</strong> betaines, cytokinins, polysaccharides → function.
<strong>Biostimulants:</strong> humic/fulvic, silicon → mechanism.
No doses. No brands.`
  : `<strong>Macronutrientes:</strong> elementos → função no estádio ${d.estadio}.
<strong>Micronutrientes:</strong> elementos → função e antagonismos.
<strong>Aminoácidos:</strong> 3-4 entre prolina, betaína, glicina, triptofano, glutamina, arginina, metionina, cisteína, fenilalanina, asparagina — pertinentes ao estádio e objetivos. Nome → função → benefício.
<strong>Algas:</strong> betaínas, citocininas, polissacarídeos → função.
<strong>Bioestimulantes:</strong> húmico/fúlvico, silício → mecanismo.
Sem doses. Sem marcas.`}

<h3>📈 7. ${en ? 'Expected Results' : 'Resultado Esperado'}</h3>
${en
  ? `<table><tr><th>Nutrient</th><th>Foliar Dose</th><th>Mechanism</th><th>Gain(sc/ha)</th><th>Timeline</th></tr></table>
5 lines. N and P mandatory. Foliar dose (g/kg/ha): corrective if ❌, preventive if ⚠️, standard if nd.
Projection: +X to +Y sc/ha. Target ${d.prodExpect} sc/ha: 2 lines.`
  : `<table><tr><th>Nutriente</th><th>Dose Foliar</th><th>Mecanismo</th><th>Ganho(sc/ha)</th><th>Prazo</th></tr></table>
5 linhas. N e P obrigatórios. Dose foliar(g/kg/ha): corretiva se ❌, preventiva se ⚠️, padrão se nd.
Projeção: +X a +Y sc/ha. Meta ${d.prodExpect} sc/ha: 2 linhas.`}`
}
