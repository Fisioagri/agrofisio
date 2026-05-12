import { useEffect, useRef, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import { callClaude } from '../../services/api'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import InfoBox from '../../components/ui/InfoBox'
import Button from '../../components/ui/Button'

// ─── CHAMADA 1: Condição + Mapa Hormonal (com foto) ──────────────────────────
function buildPrompt1(d, promptLang) {
  const solo = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, V%=${d.vSolo||'nd'}, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`

  return `${promptLang}
Especialista sênior em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Kerbauy (2008), Embrapa.

LAVOURA: ${d.prodNome} | ${d.prodCidade} | ${d.cultura} | ${d.hibrido} | Safra ${d.safra}
Estádio: ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha | Última prod.: ${d.prodUltima||'nd'} sc/ha
Adubação: ${d.adubacao}
Visível na foto: ${d.visivel.join(', ')||'não informado'}
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Sintomas: ${d.sintomas||'nenhum'}
SOLO: ${solo}
FOLIAR: ${foliar}
${d.fotoB64 ? 'FOTO ANEXADA: analise visualmente coloração, sintomas e arquitetura da planta.' : ''}

Gere SOMENTE as seções 1 e 2 em HTML:

<h3>🌿 1. Condição Fisiológica — Estádio ${d.estadio}</h3>
5-6 linhas técnicas: processos metabólicos dominantes, relação source/sink, atividade fotossintética, demandas energéticas e nutricionais. Citar referência científica. Mencionar expectativa de ${d.prodExpect} sc/ha.
${d.fotoB64 ? 'Descrever também o que é observável na foto: coloração, arquitetura, sintomas visíveis.' : ''}

<h3>🧬 2. Mapa Hormonal</h3>
<table><tr><th>Hormônio</th><th>Nível</th><th>Função no Estádio</th><th>Impacto sob Estresse</th><th>Nutriente Relacionado</th></tr>...</table>
Incluir: Auxina, Citocinina, Giberelina, Etileno, ABA, Brasinoesteroide, Jasmonato (7 linhas).`
}

// ─── CHAMADA 2: Nutrição + Estresse + Gargalos (sem foto) ────────────────────
function buildPrompt2(d, promptLang) {
  const solo = `pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, S=${d.sSolo||'nd'}, Al=${d.alSolo||'nd'}, H+Al=${d.hAlSolo||'nd'}, CTC=${d.ctcSolo||'nd'}, V%=${d.vSolo||'nd'}, Sat.Al=${d.satAlSolo||'nd'}%, Argila=${d.argilaSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}`
  const foliar = `N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, S=${d.sFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}`

  return `${promptLang}
Especialista sênior em fisiologia vegetal. Base: Marschner (2012), Taiz & Zeiger (2017), Kerbauy (2008), Embrapa.

LAVOURA: ${d.prodNome} | ${d.cultura} | Estádio ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Ocorrências: ${[...d.ocorrencias, d.outrasOcorrencias].filter(Boolean).join(', ')||'nenhuma'}
Sintomas: ${d.sintomas||'nenhum'}
Moléstia: ${d.molestia === true ? 'SIM — ' + d.doencas.join(', ') : 'NÃO'}
SOLO: ${solo}
FOLIAR: ${foliar}

Gere SOMENTE as seções 3${d.stresse ? ', 4' : ''} e ${d.stresse ? '5' : '4'} em HTML:

<h3>🧪 3. Exigência Nutricional e Diagnose Foliar</h3>
Tabela com N, P, K, Ca, Mg, S, Fe, Zn, Cu, Mn, B, Mo:
<table><tr><th>Nutriente</th><th>Dose Total (kg-g/ha)</th><th>Função Fisiológica no Estádio</th><th>Sintoma de Deficiência</th><th>Status Foliar</th><th>Eficiência Foliar</th><th>Dose Foliar Indicada</th></tr>...</table>
Status Foliar: ✅ Adequado / ⚠️ Limite / ❌ Deficiente / — sem dado.
Eficiência Foliar (Marschner, 2012): ✅ Alta absorção foliar / ⚠️ Média / ❌ Baixa eficiência foliar.
Dose Foliar Indicada: baseada na deficiência detectada na análise foliar acima (g ou kg de elemento puro/ha). Se status = nd, indicar dose preventiva padrão. Se adequado, escrever "—".

<strong>⚠️ Antagonismos Nutricionais Críticos (Marschner, 2012):</strong>
Baseado nos nutrientes com deficiência ou limite detectados, listar 3-4 antagonismos relevantes para aplicação foliar conjunta:
<ul><li><strong>[Nutriente A] × [Nutriente B]:</strong> mecanismo do antagonismo → recomendação (separar tanque / intervalo mínimo)</li></ul>
NUNCA cite marcas comerciais.

${d.stresse ? `<h3>⚠️ 4. Diagnose de Estresse — ${d.tiposStresse.join(' + ')}</h3>
Mecanismo de dano celular, cascata hormonal (ABA, etileno, jasmonato), nutrientes mais afetados, impacto no estádio ${d.estadio}. 5-6 linhas técnicas.` : ''}

<h3>${d.stresse ? '5' : '4'}. 🔴 Gargalos Fisiológicos e Riscos Produtivos</h3>
3-5 principais gargalos baseados em todos os dados. Formato:
<ul><li><strong>[Gargalo]:</strong> descrição → impacto (-X a -Y sc/ha) → urgência: 🔴 Alta / 🟡 Média / 🟢 Baixa</li></ul>
Síntese final: risco total estimado sem intervenção.`
}

export default function StepDiagnose() {
  const { data, laudoDiagnoseHtml, setDiagnoseHtml } = useWizard()
  const { t } = useLanguage()
  const started = useRef(false)
  const [error, setError]   = useState(null)
  const [fase, setFase]     = useState(0)

  useEffect(() => {
    if (laudoDiagnoseHtml || started.current) return
    started.current = true
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setError(null)
    setDiagnoseHtml('__loading__')
    try {
      setFase(1)
      const html1 = await callClaude(buildPrompt1(data, t.promptLang), data.fotoB64 || null, 3500)

      setFase(2)
      const html2 = await callClaude(buildPrompt2(data, t.promptLang), null, 3500)

      setDiagnoseHtml(html1 + html2)
      setFase(0)
    } catch (e) {
      setDiagnoseHtml(null)
      started.current = false
      setFase(0)
      setError(e.message)
    }
  }

  const isLoading = !laudoDiagnoseHtml || laudoDiagnoseHtml === '__loading__'

  const steps = [
    { label: t.diagnose.loadingSteps[0], status: 'done' },
    { label: t.diagnose.loadingSteps[1], status: fase === 1 ? 'current' : fase > 1 ? 'done' : 'pending' },
    { label: t.diagnose.loadingSteps[2], status: fase === 1 ? 'pending' : fase === 2 ? 'current' : fase > 2 ? 'done' : 'pending' },
    { label: t.diagnose.loadingSteps[3], status: fase === 2 ? 'current' : fase > 2 ? 'done' : 'pending' },
    { label: t.diagnose.loadingSteps[4], status: fase === 2 ? 'pending' : 'pending' },
  ]

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{t.diagnose.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{t.diagnose.subtitle}</p>
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
            title={t.diagnose.loading}
            subtitle={t.diagnose.loadingSub}
            steps={steps}
          />
        </div>
      ) : (
        <>
          <LaudoView
            title={`🔬 Diagnose — ${(data.cultura || '').toUpperCase()}`}
            subtitle={`${data.prodNome} · ${data.prodCidade} · Estádio ${data.estadio}`}
            badge="📚 Marschner (2012) · Taiz & Zeiger (2017) · Kerbauy · Embrapa"
            html={laudoDiagnoseHtml}
          />
          <InfoBox variant="amber">
            {t.diagnose.done}
          </InfoBox>
        </>
      )}
    </>
  )
}
