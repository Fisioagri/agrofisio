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
