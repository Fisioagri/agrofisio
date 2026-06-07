import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { useLanguage } from '../contexts/LanguageContext'
import { listLaudos, deleteLaudo } from '../services/laudoService'
import Spinner from '../components/ui/Spinner'

const CROP_ICO   = { soja: '🫘', milho: '🌽', feijao: '🫛' }
const CROP_LABEL = { soja: 'Soja', milho: 'Milho', feijao: 'Feijão' }
const PAGE_SIZE  = 10

const OBJETIVO_LABEL = {
  raiz:          'Desenvolvimento radicular',
  entrenós:      'Redução de entrenós',
  florescimento: 'Otimização do florescimento',
  enchimento:    'Enchimento de grãos',
  defesa:        'Defesa celular / antioxidante',
  producao:      'Aumento de produtividade',
  qualidade:     'Qualidade do produto',
  preestresse:   'Manejo pré-estresse',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtDate(isoStr) {
  if (!isoStr) return '—'
  return new Date(isoStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}
function fmtTime(isoStr) {
  if (!isoStr) return ''
  return new Date(isoStr).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}
function fmtPlantio(str) {
  if (!str) return null
  try {
    const d = new Date(str + 'T12:00:00')
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  } catch { return str }
}

// ─── Chip colorido ─────────────────────────────────────────────────────────────
function Chip({ label, color = 'neutral' }) {
  const cls = {
    red:     'bg-red-50 text-red-700 border-red-200',
    amber:   'bg-amber-50 text-amber-700 border-amber-200',
    blue:    'bg-brand-50 text-brand-700 border-brand-100',
    neutral: 'bg-surface-muted text-ink-600 border-surface-border',
    green:   'bg-green-50 text-green-700 border-green-200',
  }[color]
  return (
    <span className={`inline-flex items-center text-[9px] font-mono font-semibold border rounded-full px-1.5 py-0.5 ${cls}`}>
      {label}
    </span>
  )
}

// ─── Linha de análise (solo ou foliar) ────────────────────────────────────────
function AnalysisRow({ icon, label, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className="flex items-start gap-1.5">
      <span className="text-[10px] flex-shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0">
        <span className="font-mono text-[8px] text-ink-400 uppercase tracking-wider mr-1">{label}</span>
        <span className="font-mono text-[9px] text-ink-600">{items.join(' · ')}</span>
      </div>
    </div>
  )
}

// ─── Card do laudo ─────────────────────────────────────────────────────────────
function LaudoCard({ l, onDelete, deleting, onClick }) {
  const solo   = l.analise_solo   || {}
  const foliar = l.analise_foliar || {}
  const defs   = l.deficiencias   || []
  const objs   = l.objetivos      || []

  // Monta linhas de solo
  const soloItems = []
  if (solo.ph)      soloItems.push(`pH ${solo.ph}`)
  if (solo.ctcSolo) soloItems.push(`CTC ${solo.ctcSolo}`)
  if (solo.vSolo)   soloItems.push(`V% ${solo.vSolo}`)
  if (solo.caSolo && solo.ctcSolo) soloItems.push(`Ca ${(solo.caSolo/solo.ctcSolo*100).toFixed(0)}%CTC`)
  if (solo.mgSolo && solo.ctcSolo) soloItems.push(`Mg ${(solo.mgSolo/solo.ctcSolo*100).toFixed(0)}%CTC`)
  if (solo.kSolo  && solo.ctcSolo) soloItems.push(`K ${(solo.kSolo/solo.ctcSolo*100).toFixed(1)}%CTC`)

  // Monta linhas de foliar (só macros)
  const foliarItems = []
  const foliarLabels = { nFoliar:'N', pFoliar:'P', kFoliar:'K', caFoliar:'Ca', mgFoliar:'Mg', sFoliar:'S' }
  for (const [f, lbl] of Object.entries(foliarLabels)) {
    if (foliar[f] != null) foliarItems.push(`${lbl} ${foliar[f]}`)
  }

  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-surface-border rounded-card shadow-card
        hover:border-brand-400 hover:shadow-md transition-all text-left overflow-hidden"
    >
      {/* ── Cabeçalho ─────────────────────────────────────── */}
      <div className="flex items-stretch">
        {/* Ícone da cultura */}
        <div className="w-12 flex-shrink-0 bg-brand-50 flex flex-col items-center justify-center py-3 border-r border-surface-border">
          <span className="text-2xl">{CROP_ICO[l.cultura] || '🌱'}</span>
        </div>

        {/* Título: data + estádio */}
        <div className="flex-1 min-w-0 px-3 py-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="font-display font-bold text-sm text-ink-900 leading-tight">
                {fmtDate(l.created_at)}
                {l.estadio && (
                  <span className="ml-2 text-[10px] font-mono font-semibold text-brand-700 bg-brand-50 border border-brand-100 px-1.5 py-0.5 rounded-full">
                    Estádio {l.estadio}
                  </span>
                )}
              </p>
              <p className="font-sans text-[10px] text-ink-400 mt-0.5">
                {CROP_LABEL[l.cultura] || l.cultura} · {l.produtor_nome}
                {l.talhao ? ` · ${l.talhao}` : ''}
                <span className="ml-2 opacity-60">{fmtTime(l.created_at)}</span>
              </p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); onDelete(l.id) }}
              disabled={deleting}
              className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-md text-ink-300
                hover:text-danger-600 hover:bg-danger-50 transition-colors"
            >
              {deleting ? '…' : '🗑'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Corpo ─────────────────────────────────────────── */}
      <div className="px-3 pb-3 pt-2 border-t border-surface-border space-y-2">

        {/* Data plantio + cultivar + adubação */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {fmtPlantio(l.data_plantio) && (
            <div className="flex items-center gap-1">
              <span className="text-[10px]">📅</span>
              <span className="font-sans text-[10px] text-ink-500">
                <span className="text-ink-400">Plantio</span> {fmtPlantio(l.data_plantio)}
              </span>
            </div>
          )}
          {l.safra && (
            <div className="flex items-center gap-1">
              <span className="font-sans text-[10px] text-ink-400">Safra</span>
              <span className="font-mono text-[10px] text-ink-600 font-semibold">{l.safra}</span>
            </div>
          )}
        </div>

        {(l.hibrido || l.adubacao) && (
          <div className="space-y-0.5">
            {l.hibrido && (
              <div className="flex items-start gap-1.5">
                <span className="text-[10px] flex-shrink-0">🌱</span>
                <span className="font-sans text-[10px] text-ink-600 leading-snug line-clamp-1">
                  <span className="text-ink-400">Cultivar: </span>{l.hibrido}
                </span>
              </div>
            )}
            {l.adubacao && (
              <div className="flex items-start gap-1.5">
                <span className="text-[10px] flex-shrink-0">💊</span>
                <span className="font-sans text-[10px] text-ink-500 leading-snug line-clamp-2">
                  <span className="text-ink-400">Adubação: </span>{l.adubacao}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Solo */}
        <AnalysisRow icon="🌍" label="Solo" items={soloItems} />

        {/* Foliar */}
        <AnalysisRow icon="🌿" label="Foliar" items={foliarItems} />

        {/* Deficiências + objetivos */}
        {(defs.length > 0 || objs.length > 0) && (
          <div className="flex flex-wrap gap-1 pt-1 border-t border-surface-border">
            {defs.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap">
                <span className="font-mono text-[8px] text-ink-400 uppercase tracking-wider">Def.</span>
                {defs.map(d => <Chip key={d} label={d} color="red" />)}
              </div>
            )}
            {objs.length > 0 && (
              <div className="flex items-center gap-1 flex-wrap ml-auto">
                <span className="text-[9px]">🎯</span>
                {objs.slice(0, 2).map(o => (
                  <Chip key={o} label={OBJETIVO_LABEL[o] || o} color="blue" />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </button>
  )
}

// ─── Página principal ──────────────────────────────────────────────────────────
export default function AnalysePage() {
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [laudos, setLaudos]           = useState([])
  const [total, setTotal]             = useState(0)
  const [loading, setLoading]         = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [deleting, setDeleting]       = useState(null)

  useEffect(() => {
    let cancelled = false
    listLaudos({ limit: PAGE_SIZE, offset: 0 })
      .then(({ data, count }) => { if (!cancelled) { setLaudos(data); setTotal(count) } })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function loadMore() {
    setLoadingMore(true)
    listLaudos({ limit: PAGE_SIZE, offset: laudos.length })
      .then(({ data }) => setLaudos(prev => [...prev, ...data]))
      .catch(() => {})
      .finally(() => setLoadingMore(false))
  }

  async function handleDelete(id) {
    const msg = lang === 'en' ? 'Delete this report?' : 'Excluir este laudo?'
    if (!window.confirm(msg)) return
    setDeleting(id)
    await deleteLaudo(id).catch(() => {})
    setLaudos(prev => prev.filter(l => l.id !== id))
    setTotal(prev => prev - 1)
    setDeleting(null)
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="font-display font-bold text-xl md:text-2xl text-brand-900">
            {lang === 'en' ? 'Physiological Analysis' : 'Análise Fisiológica'}
          </h1>
          <p className="font-sans text-xs text-ink-400 mt-0.5">
            {lang === 'en' ? 'Diagnosis · 8-step protocol' : 'Diagnóstico · Protocolo de 8 etapas'}
          </p>
        </div>

        {/* Nova Análise CTA */}
        <Link
          to="/wizard"
          className="flex items-center gap-4 bg-brand-900 text-white rounded-card p-4 shadow-card
            hover:bg-brand-700 transition-colors"
        >
          <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
            🔬
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-bold text-base leading-tight">{t.dashboard.newAnalysis}</p>
            <p className="font-sans text-[11px] text-brand-400 mt-0.5">{t.dashboard.newAnalysisSub}</p>
          </div>
          <span className="text-white/40 text-lg">›</span>
        </Link>

        {/* Histórico */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <p className="font-sans text-xs font-semibold text-ink-600">
              {lang === 'en' ? 'History' : 'Histórico de Laudos'}
            </p>
            {total > 0 && (
              <p className="font-mono text-[10px] text-ink-400">{laudos.length} / {total}</p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><Spinner /></div>
          ) : laudos.length === 0 ? (
            <div className="bg-white border border-surface-border rounded-card p-8 text-center shadow-card">
              <p className="text-3xl mb-3">📋</p>
              <p className="font-sans text-sm text-ink-400 mb-3">
                {lang === 'en' ? 'No reports yet.' : 'Nenhum laudo gerado ainda.'}
              </p>
              <Link to="/wizard" className="font-sans text-sm text-brand-700 font-semibold underline">
                {lang === 'en' ? 'Start first analysis →' : 'Iniciar primeira análise →'}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {laudos.map(l => (
                  <LaudoCard
                    key={l.id}
                    l={l}
                    deleting={deleting === l.id}
                    onDelete={handleDelete}
                    onClick={() => navigate(`/laudos/${l.id}`)}
                  />
                ))}
              </div>

              {laudos.length < total && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="mt-3 w-full py-3 border border-surface-border rounded-card
                    font-sans text-xs text-ink-500 hover:border-brand-400 hover:text-brand-700
                    transition-all disabled:opacity-50"
                >
                  {loadingMore
                    ? (lang === 'en' ? 'Loading…' : 'Carregando…')
                    : lang === 'en'
                      ? `Load more (${total - laudos.length} remaining)`
                      : `Ver mais ${total - laudos.length} laudos`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
