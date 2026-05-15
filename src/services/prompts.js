function ctx(d) {
  return `LAVOURA: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | Safra ${d.safra}
Estádio: ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha | Última prod.: ${d.prodUltima||'nd'} sc/ha
Adubação: ${d.adubacao}
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Moléstia: ${d.molestia === true ? 'SIM — ' + d.doencas.join(', ') : 'NÃO'}
Ocorrências: ${[...d.ocorrencias, d.outrasOcorrencias].filter(Boolean).join(', ')||'nenhuma'}
Sintomas: ${d.sintomas||'nenhum'}
SOLO: pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}
FOLIAR: N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
}

const BASE = 'Especialista sênior em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Kerbauy (2008), Embrapa.'

export function buildDiagnosePrompt1(d, lang) {
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, V%=${d.vSolo||'nd'}, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
  return `${lang}
${BASE}
LAVOURA: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | Safra ${d.safra}
Estádio: ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha | Última prod.: ${d.prodUltima||'nd'} sc/ha
Adubação: ${d.adubacao}
Visível na foto: ${(d.visivel||[]).join(', ')||'não informado'}
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Sintomas: ${d.sintomas||'nenhum'}
SOLO: ${solo}
FOLIAR: ${foliar}
${d.fotoB64 ? 'FOTO ANEXADA: analise coloração, sintomas e arquitetura da planta.' : ''}

Gere SOMENTE as seções 1 e 2 em HTML:

<h3>🌿 1. Condição Fisiológica — Estádio ${d.estadio}</h3>
5-6 linhas técnicas: processos metabólicos dominantes, source/sink, fotossíntese, demandas energéticas. Referência científica. Meta ${d.prodExpect} sc/ha.
${d.fotoB64 ? 'Descrever também o observável na foto: coloração, arquitetura, sintomas.' : ''}

<h3>🧬 2. Mapa Hormonal</h3>
<table><tr><th>Hormônio</th><th>Ação no Estádio</th><th>Nutriente-chave</th></tr>...</table>
Incluir: Auxina, Citocinina, Giberelina, Etileno, ABA. 5 linhas.`
}

export function buildDiagnosePrompt2(d, lang) {
  const solo   = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, Argila=${d.argilaSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`
  return `${lang}
${BASE}
LAVOURA: ${d.prodNome} | ${d.cultura} | Estádio ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Ocorrências: ${[...d.ocorrencias, d.outrasOcorrencias].filter(Boolean).join(', ')||'nenhuma'}
Sintomas: ${d.sintomas||'nenhum'}
Moléstia: ${d.molestia === true ? 'SIM — ' + d.doencas.join(', ') : 'NÃO'}
SOLO: ${solo}
FOLIAR: ${foliar}

Gere SOMENTE as seções 3${d.stresse ? ', 4' : ''} e ${d.stresse ? '5' : '4'} em HTML:

<h3>🧪 3. Exigência Nutricional</h3>
Tabela N,P,K,Ca,Mg,S,Fe,Zn,Cu,Mn,B,Mo: <table><tr><th>Nutriente</th><th>Dose</th><th>Função</th><th>Status</th><th>Efic.Foliar</th><th>Dose Foliar</th></tr></table>
Status:✅/⚠️/❌/—. Efic.Foliar:✅Alta/⚠️Média/❌Baixa. Dose Foliar(g ou kg/ha):corretiva❌,preventiva⚠️,—✅.
Antagonismos: 3 pares <ul><li><strong>A×B:</strong>mecanismo→intervalo</li></ul>Sem marcas.
${d.stresse ? `<h3>⚠️ 4. Estresse — ${d.tiposStresse.join('+')} </h3>Dano celular, hormônios (ABA/etileno/jasmonato), nutrientes afetados. 4 linhas.` : ''}
<h3>${d.stresse ? '5' : '4'}. 🔴 Gargalos</h3>
<ul><li><strong>[Gargalo]:</strong>descrição→impacto(-X sc/ha)→🔴/🟡/🟢</li></ul>3-4 itens. Risco total sem intervenção.`
}

export function buildLaudoPrompt1(d, lang) {
  return `${lang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}

Gere SOMENTE as seções 1, 2 e 3 do laudo técnico em HTML.

<h3>📋 1. Resumo da Lavoura</h3>
Tabela 8 linhas: Produtor, Cultura, Híbrido/Variedade, Safra, Estádio, Última Produtividade, Expectativa, Local.
<table><tr><th>Item</th><th>Dado</th></tr>...</table>

<h3>🌿 2. Condição Fisiológica Atual</h3>
Nível de estresse (Ausente/Leve/Moderado/Severo) com justificativa. Processos fisiológicos, demanda metabólica, implicações para ${d.prodExpect} sc/ha. 4-5 linhas.

<h3>🧪 3. Interpretação Nutricional</h3>
<strong>Solo:</strong> limitações (pH, Al, V%, deficiências). 2-3 linhas.
<strong>Foliar:</strong> suficiência/deficiência e antagonismos. 2-3 linhas.
Tabela N, P, K, Ca, Mg, S, B, Zn, Cu, Mn, Fe:
<table><tr><th>Nutriente</th><th>Solo</th><th>Foliar</th><th>Status</th><th>Impacto Fisiológico</th></tr>...</table>
Status: ✅ Adequado / ⚠️ Limite / ❌ Deficiente / — sem dado.`
}

export function buildLaudoPrompt2(d, lang) {
  return `${lang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}
OBJETIVOS: ${d.objetivos.join(', ')}

Gere SOMENTE as seções 4 e 5 do laudo técnico em HTML.

<h3>🔴 4. Diagnose Fisiológica</h3>
<strong>Gargalos:</strong>
<ul><li><strong>[Gargalo]:</strong> descrição → impacto (sc/ha) → urgência 🔴/🟡/🟢</li></ul>
4 principais gargalos.
<strong>Perda estimada sem intervenção:</strong> X a Y sc/ha.
<strong>Riscos imediatos (2 semanas):</strong> 2-3 linhas.

<h3>🎯 5. Objetivos Fisiológicos</h3>
<ul><li><strong>[Objetivo]:</strong> justificativa para estádio ${d.estadio} — compostos: [princípios ativos]</li></ul>
NUNCA citar marcas.`
}

export function buildLaudoPrompt3(d, lang) {
  return `${lang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}
OBJETIVOS: ${d.objetivos.join(', ')}

Gere SOMENTE as seções 6 e 7 do laudo técnico em HTML.

<h3>💊 6. Protocolo Fisiológico</h3>
<strong>Macronutrientes:</strong>elementos→função no estádio ${d.estadio}.
<strong>Micronutrientes:</strong>elementos→função e antagonismos.
<strong>Aminoácidos:</strong>3-4 entre prolina,betaína,glicina,triptofano,glutamina,arginina,metionina,cisteína,fenilalanina,asparagina — pertinentes ao estádio e objetivos. Nome→função→benefício.
<strong>Algas:</strong>betaínas,citocininas,polissacarídeos→função.
<strong>Bioestimulantes:</strong>húmico/fúlvico,silício→mecanismo.
Sem doses. Sem marcas.

<h3>📈 7. Resultado Esperado</h3>
<table><tr><th>Nutriente</th><th>Dose Foliar</th><th>Mecanismo</th><th>Ganho(sc/ha)</th><th>Prazo</th></tr></table>
5 linhas. N e P obrigatórios. Dose foliar(g/kg/ha):corretiva se❌,preventiva se⚠️,padrão se nd.
Projeção:+X a +Y sc/ha. Meta ${d.prodExpect} sc/ha:2 linhas.`
}
