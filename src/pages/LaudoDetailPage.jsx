import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import LaudoView from '../components/LaudoView'
import { useLanguage } from '../contexts/LanguageContext'
import { getLaudo, deleteLaudo } from '../services/laudoService'
import Spinner from '../components/ui/Spinner'

export default function LaudoDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLanguage()
  const [laudo, setLaudo]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    getLaudo(id)
      .then(setLaudo)
      .catch(() => navigate('/'))
      .finally(() => setLoading(false))
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  async function handleDelete() {
    const msg = lang === 'en'
      ? 'Delete this report? This action cannot be undone.'
      : 'Excluir este laudo? Essa ação não pode ser desfeita.'
    if (!window.confirm(msg)) return
    setDeleting(true)
    await deleteLaudo(id).catch(() => {})
    navigate('/')
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex justify-center py-16"><Spinner /></div>
      </AppLayout>
    )
  }

  const cultura = (laudo?.cultura || '').toUpperCase()
  const subtitle = `${laudo?.produtor_nome} · ${cultura} · Estádio ${laudo?.estadio} · Safra ${laudo?.safra}`
  const dateStr = laudo?.created_at
    ? new Date(laudo.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
    : ''

  return (
    <AppLayout>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <button
              onClick={() => navigate('/')}
              className="font-mono text-xs text-ink-400 hover:text-ink-600 mb-2 flex items-center gap-1"
            >
              ← {lang === 'en' ? 'Back' : 'Voltar'}
            </button>
            <p className="font-mono text-[10px] text-ink-400">{dateStr}</p>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="font-mono text-[10px] text-danger-600 hover:text-danger-700 border border-danger-200
              hover:border-danger-400 px-2.5 py-1.5 rounded-sm transition-colors flex-shrink-0"
          >
            🗑 {lang === 'en' ? 'Delete' : 'Excluir'}
          </button>
        </div>

        {laudo?.diagnose_html && (
          <LaudoView
            title={`🔬 Diagnose — ${cultura}`}
            subtitle={subtitle}
            badge="📚 Marschner · Taiz & Zeiger · Kerbauy · Embrapa"
            html={laudo.diagnose_html}
          />
        )}

        {laudo?.laudo_html && (
          <LaudoView
            title="📄 Protocolo Fisiológico"
            subtitle={subtitle}
            badge="📚 Marschner · Taiz & Zeiger · Kerbauy · Embrapa"
            html={laudo.laudo_html}
            showPrint
          />
        )}
      </div>
    </AppLayout>
  )
}
