import { Link } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { useAuth } from '../hooks/useAuth'

export default function DashboardPage() {
  const { profile } = useAuth()

  return (
    <AppLayout>
      <div className="space-y-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-brand-900">
            Olá{profile?.name ? `, ${profile.name}` : ''} 👋
          </h1>
          <p className="font-mono text-xs text-ink-400 mt-1">bem-vindo ao AgroFísio v4.0</p>
        </div>

        <Link
          to="/wizard"
          className="block bg-brand-900 text-white rounded-card p-5 shadow-card hover:bg-brand-700 transition-colors"
        >
          <div className="text-3xl mb-2">🌱</div>
          <h2 className="font-display font-bold text-xl">Nova Análise Fisiológica</h2>
          <p className="font-mono text-xs text-brand-400 mt-1">iniciar protocolo de manejo · 8 etapas</p>
        </Link>

        <div className="bg-white border border-surface-border rounded-card p-4 shadow-card">
          <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider mb-3">
            SOBRE O AGROFÍSIO
          </div>
          <p className="text-sm text-ink-600 leading-relaxed">
            Diagnose e protocolo fisiológico para lavouras de soja, milho e feijão.
            Com base em dados do produtor, análises de solo e foliar, e inteligência artificial,
            gera diagnoses e protocolos personalizados fundamentados em Marschner, Taiz & Zeiger e Embrapa.
          </p>
        </div>
      </div>
    </AppLayout>
  )
}
