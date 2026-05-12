import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAuth } from '../../hooks/useAuth'
import { callClaude } from '../../services/api'
import { saveLaudo } from '../../services/laudoService'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import Button from '../../components/ui/Button'

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

function buildPrompt1(d, promptLang) {
  return `${promptLang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}

Gere SOMENTE as seções 1, 2 e 3 do laudo técnico em HTML. Seja objetivo e técnico.

<h3>📋 1. Resumo da Lavoura</h3>
Tabela com 8 linhas: Produtor, Cultura, Híbrido/Variedade, Safra, Estádio, Última Produtividade, Expectativa, Local.
<table><tr><th>Item</th><th>Dado</th></tr>...</table>

<h3>🌿 2. Condição Fisiológica Atual</h3>
Nível de estresse (Ausente/Leve/Moderado/Severo) com justificativa. Processos fisiológicos predominantes neste estádio. Demanda metabólica e implicações para a expectativa de ${d.prodExpect} sc/ha. 4-5 linhas.

<h3>🧪 3. Interpretação Nutricional</h3>
<strong>Solo:</strong> principais limitações identificadas (pH, Al, V%, deficiências). 2-3 linhas objetivas.
<strong>Foliar:</strong> suficiência/deficiência e antagonismos detectados. 2-3 linhas objetivas.
Tabela com K, Ca, Mg, S, B, Zn, Cu, Mn, Fe:
<table><tr><th>Nutriente</th><th>Solo</th><th>Foliar</th><th>Status</th><th>Impacto Fisiológico</th></tr>...</table>
Status: ✅ Adequado / ⚠️ Limite / ❌ Deficiente / — sem dado.`
}

function buildPrompt2(d, promptLang) {
  return `${promptLang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}
OBJETIVOS SELECIONADOS: ${d.objetivos.join(', ')}

Gere SOMENTE as seções 4 e 5 do laudo técnico em HTML. Seja objetivo e técnico.

<h3>🔴 4. Diagnose Fisiológica</h3>
<strong>Gargalos identificados:</strong>
<ul><li><strong>[Gargalo]:</strong> descrição → impacto estimado (sc/ha) → urgência 🔴/🟡/🟢</li></ul>
Listar os 4 principais gargalos.
<strong>Perda estimada total sem intervenção:</strong> X a Y sc/ha.
<strong>Riscos fisiológicos imediatos (próximas 2 semanas):</strong> 2-3 linhas.

<h3>🎯 5. Objetivos Fisiológicos do Manejo</h3>
Para cada objetivo selecionado (${d.objetivos.join(', ')}), uma linha:
<ul><li><strong>[Objetivo]:</strong> justificativa fisiológica para o estádio ${d.estadio} — compostos indicados: [princípios ativos]</li></ul>
NUNCA citar marcas. Apenas princípios ativos, grupos compostos e elementos.`
}

function buildPrompt3(d, promptLang) {
  return `${promptLang}
Especialista em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Embrapa.
${ctx(d)}
OBJETIVOS SELECIONADOS: ${d.objetivos.join(', ')}

Gere SOMENTE as seções 6 e 7 do laudo técnico em HTML. Seja objetivo e técnico.

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

export default function StepLaudo() {
  const { data, laudoFinalHtml, laudoDiagnoseHtml, setFinalHtml } = useWizard()
  const { t } = useLanguage()
  const { user } = useAuth()
  const [fase, setFase]   = useState(0)
  const [error, setError] = useState(null)
  const started           = useRef(false)

  useEffect(() => {
    if (laudoFinalHtml || started.current) return
    started.current = true
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setError(null)
    setFinalHtml('__loading__')
    try {
      setFase(1)
      const html1 = await callClaude(buildPrompt1(data, t.promptLang), null, 3500)

      setFase(2)
      const html2 = await callClaude(buildPrompt2(data, t.promptLang), null, 3500)

      setFase(3)
      const html3 = await callClaude(buildPrompt3(data, t.promptLang), null, 3500)

      const finalHtml = html1 + html2 + html3
      setFinalHtml(finalHtml)
      setFase(0)
      saveLaudo({ userId: user.id, data, diagnoseHtml: laudoDiagnoseHtml, laudoHtml: finalHtml }).catch(() => {})
    } catch (e) {
      setFinalHtml(null)
      started.current = false
      setFase(0)
      setError(e.message)
    }
  }

  const isLoading = !laudoFinalHtml || laudoFinalHtml === '__loading__'

  const steps = [
    { label: t.laudo.loadingSteps[0], status: 'done'                                   },
    { label: t.laudo.loadingSteps[1], status: 'done'                                   },
    { label: t.laudo.loadingSteps[2], status: fase === 1 ? 'current' : fase > 1 ? 'done' : 'pending' },
    { label: t.laudo.loadingSteps[3], status: fase === 2 ? 'current' : fase > 2 ? 'done' : 'pending' },
    { label: t.laudo.loadingSteps[4], status: fase === 3 ? 'current' : 'pending'        },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{t.laudo.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{t.laudo.subtitle}</p>
      </div>

      {error ? (
        <div className="bg-white border border-danger-600 rounded-card p-5 shadow-card text-center space-y-3">
          <p className="text-2xl">⚠️</p>
          <p className="font-mono text-xs text-danger-600">{error}</p>
          <Button onClick={generate} fullWidth>🔄 Tentar novamente</Button>
        </div>
      ) : isLoading ? (
        <div className="bg-white border border-surface-border rounded-card shadow-card">
          <LoadingLaudo
            title={t.laudo.loading}
            subtitle={t.laudo.loadingSub}
            steps={steps}
          />
        </div>
      ) : (
        <LaudoView
          title="📄 Protocolo Fisiológico"
          subtitle={`${data.prodNome} · ${(data.cultura||'').toUpperCase()} ${data.hibrido ? '· '+data.hibrido : ''} · Estádio ${data.estadio}`}
          badge="📚 Marschner · Taiz & Zeiger · Kerbauy · Embrapa"
          html={laudoFinalHtml}
          showPrint
        />
      )}
    </>
  )
}
