import { useEffect } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { callClaude } from '../../services/api'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'
import InfoBox from '../../components/ui/InfoBox'

const LOADING_STEPS = [
  { label: 'Dados coletados',                status: 'done'    },
  { label: 'Analisando estádio e processos', status: 'current' },
  { label: 'Mapeando hormônios',             status: 'pending' },
  { label: 'Calculando exigência nutricional',status: 'pending' },
]

function buildPrompt(d) {
  return `Você é especialista em fisiologia vegetal (base: Marschner 2012, Taiz & Zeiger, Kerbauy, Embrapa).

DADOS DA LAVOURA:
Produtor: ${d.prodNome} | Cidade: ${d.prodCidade} | Talhão: ${d.prodTalhao}
Cultura: ${d.cultura} | Safra: ${d.safra} | Híbrido: ${d.hibrido}
Expectativa: ${d.prodExpect} sc/ha | Última prod.: ${d.prodUltima} sc/ha
Adubação: ${d.adubacao}
Estádio: ${d.estadio}
O que está na foto: ${d.visivel.join(', ') || 'não informado'}
Temperatura: ${d.temp}°C | Chuva: ${d.chuva}mm | Dias sem chuva: ${d.diasSemChuva}
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Ocorrências: ${d.ocorrencias.join(', ') || 'nenhuma'}
Sintomas visuais: ${d.sintomas || 'nenhum'}
Moléstia: ${d.molestia === true ? 'SIM — ' + d.doencas.join(', ') : d.molestia === false ? 'NÃO' : 'não informado'}

ANÁLISE DE SOLO: pH=${d.ph||'nd'}, MO=${d.mo||'nd'}%, P=${d.pSolo||'nd'}, K=${d.kSolo||'nd'}, Ca=${d.caSolo||'nd'}, Mg=${d.mgSolo||'nd'}, V=${d.vSolo||'nd'}%, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Cu=${d.cuSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Fe=${d.feSolo||'nd'}

ANÁLISE FOLIAR: N=${d.nFoliar||'nd'}, P=${d.pFoliar||'nd'}, K=${d.kFoliar||'nd'}, Ca=${d.caFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Cu=${d.cuFoliar||'nd'}, Mn=${d.mnFoliar||'nd'}, Fe=${d.feFoliar||'nd'}

${d.fotoB64 ? 'FOTO ANEXADA: analise visualmente os sintomas, coloração e estado geral da planta.' : ''}

Gere uma DIAGNOSE FISIOLÓGICA RESUMIDA com exatamente 3 seções em HTML:

<h3>⚗️ Processos Metabólicos Ativos</h3>
Em 4-5 linhas: processo dominante neste estádio, relação source/sink, taxa fotossintética, principais demandas metabólicas. Cite o livro base.

<h3>🧬 Mapa Hormonal</h3>
Tabela com 5 hormônios mais relevantes: <table><tr><th>Hormônio</th><th>Nível</th><th>Função atual</th><th>Impacto do estresse</th></tr>...</table>

<h3>🧪 Exigência Nutricional Prioritária</h3>
Tabela apenas com K, Mg, Fe, Zn, Cu, Mn, B: <table><tr><th>Nutriente</th><th>Dose (g ou kg/ha)</th><th>Sintoma de deficiência</th></tr>...</table>
Use APENAS elemento puro em g/ha ou kg/ha. NUNCA cite marcas.

${d.stresse ? '<h3>⚠️ Diagnose de Estresse</h3>\nDescreva o tipo de estresse, fase na sequência de Hsiao (se hídrico), impacto hormonal e nutricional em 4-5 linhas.' : ''}

Seja técnico e conciso. Não repita dados já fornecidos.`
}

export default function StepDiagnose() {
  const { data, laudoDiagnoseHtml, setDiagnoseHtml } = useWizard()

  useEffect(() => {
    if (laudoDiagnoseHtml) return
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setDiagnoseHtml('__loading__')
    try {
      const html = await callClaude(buildPrompt(data), data.fotoB64 || null)
      setDiagnoseHtml(html)
    } catch (e) {
      setDiagnoseHtml(`<p style="color:#C0392B">⚠️ Erro: ${e.message}</p>`)
    }
  }

  if (!laudoDiagnoseHtml || laudoDiagnoseHtml === '__loading__') {
    return (
      <>
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-brand-900">Diagnose Fisiológica</h2>
          <p className="font-mono text-[11px] text-ink-400 mt-0.5">análise do estado atual da planta</p>
        </div>
        <div className="bg-white border border-surface-border rounded-card shadow-card">
          <LoadingLaudo
            title="Gerando diagnose..."
            subtitle="analisando foto e dados da planta"
            steps={LOADING_STEPS}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Diagnose Fisiológica</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">análise do estado atual da planta</p>
      </div>
      <LaudoView
        title={`🔬 Diagnose — ${(data.cultura || '').toUpperCase()}`}
        subtitle={`${data.prodNome} · ${data.prodCidade} · Estádio ${data.estadio}`}
        badge="📚 Taiz & Zeiger · Kerbauy · Marschner (2012)"
        html={laudoDiagnoseHtml}
      />
      <InfoBox variant="amber" >
        ✅ Diagnose concluída. Avance para selecionar os objetivos fisiológicos.
      </InfoBox>
    </>
  )
}
