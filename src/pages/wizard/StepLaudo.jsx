import { useEffect } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { callClaude } from '../../services/api'
import LoadingLaudo from '../../components/LoadingLaudo'
import LaudoView from '../../components/LaudoView'

const LOADING_STEPS = [
  { label: 'Diagnose concluída',             status: 'done'    },
  { label: 'Objetivos selecionados',         status: 'done'    },
  { label: 'Montando protocolo de manejo',   status: 'current' },
  { label: 'Calculando ganho em produtividade', status: 'pending' },
  { label: 'Elaborando cronograma',          status: 'pending' },
]

function buildPrompt(d) {
  return `Você é especialista em fisiologia vegetal (base: Marschner 2012, Taiz & Zeiger, Kerbauy, Embrapa).

DADOS:
Produtor: ${d.prodNome} | ${d.prodCidade} | Talhão: ${d.prodTalhao}
Cultura: ${d.cultura} | Safra: ${d.safra} | Híbrido: ${d.hibrido}
Estádio: ${d.estadio} | Expectativa: ${d.prodExpect} sc/ha
Adubação realizada: ${d.adubacao}
Estresse: ${d.stresse ? 'SIM — ' + d.tiposStresse.join(', ') : 'NÃO'}
Moléstia: ${d.molestia === true ? 'SIM — ' + d.doencas.join(', ') : 'NÃO'}
Ocorrências: ${d.ocorrencias.join(', ') || 'nenhuma'}
Solo: pH=${d.ph||'nd'}, K=${d.kSolo||'nd'}, Mg=${d.mgSolo||'nd'}, B=${d.bSolo||'nd'}, Zn=${d.znSolo||'nd'}, Fe=${d.feSolo||'nd'}, Mn=${d.mnSolo||'nd'}, Cu=${d.cuSolo||'nd'}
Foliar: K=${d.kFoliar||'nd'}, Mg=${d.mgFoliar||'nd'}, B=${d.bFoliar||'nd'}, Zn=${d.znFoliar||'nd'}, Fe=${d.feFoliar||'nd'}
OBJETIVOS SELECIONADOS: ${d.objetivos.join(', ')}

Gere o PROTOCOLO FISIOLÓGICO com exatamente 3 seções em HTML:

<h3>💊 Protocolo de Manejo por Objetivo</h3>
Para cada objetivo selecionado, crie uma sub-seção com:
- Nome do manejo (extrato de algas, aminoácidos: prolina/betaína/glicina, silício, K, Mg, Fe, Zn, Cu, Mn, B, ácido húmico/fúlvico)
- Justificativa fisiológica em 2 linhas
- NUNCA cite marcas comerciais, apenas o princípio ativo ou elemento

<h3>📈 Potencial de Ganho em Produtividade</h3>
Com base nas correções recomendadas e na literatura (Embrapa, Marschner), calcule o ganho esperado em sc/ha. Exemplo: "Correção de deficiência de B no florescimento → +8-12% no pegamento → +4 a 6 sc/ha". Mostre 3-4 correções com seus ganhos estimados e o ganho total possível.

<h3>📅 Cronograma — Próximas 2 semanas</h3>
Tabela: <table><tr><th>Dia</th><th>Manejo</th><th>Princípio ativo</th><th>Via</th><th>Justificativa</th></tr>...</table>

${d.molestia ? '<h3>🌿 Protocolo Anti-Doenças</h3>\nNutrição de defesa: Si foliar, Ca, P, Mn em doses em g/ha ou kg/ha elemento puro. Estratégia por estádio em 4-5 linhas.' : ''}

REGRAS: NUNCA cite marcas. Apenas princípio ativo, elemento puro ou produto genérico. Use g/ha ou kg/ha para nutrientes.`
}

export default function StepLaudo() {
  const { data, laudoFinalHtml, setFinalHtml } = useWizard()

  useEffect(() => {
    if (laudoFinalHtml) return
    generate()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function generate() {
    setFinalHtml('__loading__')
    try {
      const html = await callClaude(buildPrompt(data))
      setFinalHtml(html)
    } catch (e) {
      setFinalHtml(`<p style="color:#C0392B">⚠️ Erro: ${e.message}</p>`)
    }
  }

  if (!laudoFinalHtml || laudoFinalHtml === '__loading__') {
    return (
      <>
        <div className="mb-4">
          <h2 className="font-display font-bold text-xl text-brand-900">Laudo Fisiológico</h2>
          <p className="font-mono text-[11px] text-ink-400 mt-0.5">protocolo completo de manejo</p>
        </div>
        <div className="bg-white border border-surface-border rounded-card shadow-card">
          <LoadingLaudo
            title="Gerando protocolo..."
            subtitle="montando manejo fisiológico completo"
            steps={LOADING_STEPS}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Laudo Fisiológico</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">protocolo completo de manejo</p>
      </div>
      <LaudoView
        title="📄 Protocolo Fisiológico"
        subtitle={`${data.prodNome} · ${(data.cultura || '').toUpperCase()} · Estádio ${data.estadio}`}
        badge="📚 Base: Marschner · Taiz & Zeiger · Kerbauy · Embrapa"
        html={laudoFinalHtml}
      />
    </>
  )
}
