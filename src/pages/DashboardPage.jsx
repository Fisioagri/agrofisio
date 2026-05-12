import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { listLaudos, deleteLaudo } from '../services/laudoService'
import Spinner from '../components/ui/Spinner'

const CROP_ICO = { soja: '🫘', milho: '🌽', feijao: '🫛' }

export default function DashboardPage() {
  const { profile } = useAuth()
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [laudos, setLaudos]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [deleting, setDeleting] = useState(null)

  useEffect(() => {
    listLaudos()
      .then(setLaudos)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  async function handleDelete(e, id) {
    e.stopPropagation()
    const msg = lang === 'en'
      ? 'Delete this report?'
      : 'Excluir este laudo?'
    if (!window.confirm(msg)) return
    setDeleting(id)
    await deleteLaudo(id).catch(() => {})
    setLaudos(prev => prev.filter(l => l.id !== id))
    setDeleting(null)
  }

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">
            {t.dashboard.greeting(profile?.name)}
          </h1>
          <p className="font-mono text-xs text-ink-400 mt-1">{t.dashboard.subtitle}</p>
        </div>

        <Link
          to="/wizard"
          className="block bg-brand-900 text-white rounded-card p-5 shadow-card hover:bg-brand-700 transition-colors"
        >
          <div className="text-3xl mb-2">🌱</div>
          <h2 className="font-display font-bold text-xl">{t.dashboard.newAnalysis}</h2>
          <p className="font-mono text-xs text-brand-400 mt-1">{t.dashboard.newAnalysisSub}</p>
        </Link>

        {/* Histórico */}
        <div>
          <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-2">
            {lang === 'en' ? 'History' : 'Histórico'}
          </div>

          {loading ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : laudos.length === 0 ? (
            <div className="bg-white border border-surface-border rounded-card p-5 text-center shadow-card">
              <p className="text-2xl mb-2">📋</p>
              <p className="font-mono text-xs text-ink-400">
                {lang === 'en' ? 'No reports yet.' : 'Nenhum laudo gerado ainda.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {laudos.map(l => (
                <button
                  key={l.id}
                  onClick={() => navigate(`/laudos/${l.id}`)}
                  className="w-full bg-white border border-surface-border rounded-card p-3.5 shadow-card
                    hover:border-brand-700 hover:shadow-md transition-all text-left flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {CROP_ICO[l.cultura] || '🌱'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-sm text-brand-900 truncate">
                      {l.produtor_nome}
                    </p>
                    <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                      {(l.cultura || '').toUpperCase()} · Estádio {l.estadio} · Safra {l.safra}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-right">
                      <p className="font-mono text-[10px] text-ink-400">
                        {new Date(l.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', {
                          day: '2-digit', month: 'short'
                        })}
                      </p>
                      <p className="font-mono text-[10px] text-ink-300 mt-0.5">
                        {new Date(l.created_at).toLocaleTimeString(lang === 'en' ? 'en-US' : 'pt-BR', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={e => handleDelete(e, l.id)}
                      disabled={deleting === l.id}
                      className="w-7 h-7 flex items-center justify-center rounded-md text-ink-300
                        hover:text-danger-600 hover:bg-danger-50 transition-colors"
                    >
                      {deleting === l.id ? '…' : '🗑'}
                    </button>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white border border-surface-border rounded-card p-4 shadow-card">
          <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-3">
            {t.dashboard.aboutTitle}
          </div>
          <p className="text-sm text-ink-600 leading-relaxed">{t.dashboard.aboutText}</p>
        </div>
      </div>
    </AppLayout>
  )
}
