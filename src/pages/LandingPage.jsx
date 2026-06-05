import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const BENEFICIOS = [
  {
    icon: '🔬',
    titulo: 'Diagnose fundamentada em ciência',
    desc: 'Mapa de hormônios ativos por estádio, análise nutricional comparada com faixas Embrapa e diagnose por IA com base em Marschner, Taiz & Zeiger.',
  },
  {
    icon: '📄',
    titulo: 'Laudo profissional em PDF',
    desc: 'Com número de ordem, data de emissão, tabela de correção, protocolo fisiológico, campo para assinatura do responsável técnico e fontes científicas citadas.',
  },
  {
    icon: '💰',
    titulo: 'Impacto econômico calculado',
    desc: 'Estimativa de perda em sc/ha, valor em risco por hectare e ROI da correção nutricional — para tornar o diagnóstico em argumento de venda.',
  },
]

const PASSOS = [
  { num: '01', titulo: 'Informe o talhão', desc: 'Produtor, cultura, safra e expectativa de produtividade.' },
  { num: '02', titulo: 'Insira a análise', desc: 'Solo e foliar são opcionais — o diagnóstico funciona mesmo sem laudo.' },
  { num: '03', titulo: 'Registre a planta', desc: 'Selecione o estádio e tire uma foto da lavoura.' },
  { num: '04', titulo: 'Receba o protocolo', desc: 'Score, diagnose IA, correção nutricional, protocolo fisiológico e laudo PDF.' },
]

const REFERENCIAS = [
  'Marschner (2012) — Mineral Nutrition of Higher Plants',
  'Taiz & Zeiger (2017) — Plant Physiology',
  'Embrapa Soja — Tecnologias de Produção',
  'CQFS RS/SC (2016) — Manual de Calagem e Adubação',
]

export default function LandingPage() {
  const navigate   = useNavigate()
  const { user }   = useAuth()

  function handleCTA() {
    if (user) navigate('/wizard')
    else navigate('/login')
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── NAV ─────────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-5 py-3.5 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-brand-900 rounded-lg flex items-center justify-center text-base">🌱</div>
          <span className="font-display font-extrabold text-brand-900 text-lg">AgroFísio</span>
        </div>
        <button
          onClick={handleCTA}
          className="bg-brand-900 text-white font-mono text-xs font-semibold px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          {user ? 'Abrir app →' : 'Entrar'}
        </button>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-brand-900 via-brand-800 to-green-800 text-white px-5 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-3 py-1.5 mb-6">
            <span className="text-xs">🧬</span>
            <span className="font-mono text-[11px]">Nutrição · Fisiologia · Diagnóstico Agronômico</span>
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl leading-tight mb-5">
            Diagnose fisiológica da sua lavoura em menos de 5 minutos
          </h1>

          <p className="font-mono text-base opacity-85 max-w-xl mx-auto mb-8 leading-relaxed">
            Para agrônomos, RTVs e consultores que precisam de diagnóstico fundamentado,
            protocolo técnico e laudo profissional pronto para compartilhar.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleCTA}
              className="bg-white text-brand-900 font-display font-extrabold text-base px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-lg"
            >
              Gerar minha primeira diagnose →
            </button>
          </div>

          <p className="font-mono text-[11px] opacity-50 mt-4">
            Gratuito para começar · Sem cartão de crédito
          </p>
        </div>
      </section>

      {/* ── SCORE DEMO ──────────────────────────────────────────────────── */}
      <section className="bg-surface-bg px-5 py-10 border-b border-gray-100">
        <div className="max-w-lg mx-auto">
          <p className="font-mono text-[10px] text-ink-400 uppercase tracking-wider text-center mb-4">
            Exemplo de diagnose — Soja R2, Cascavel/PR
          </p>
          <div className="bg-white border border-amber-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span>🟡</span>
                <div>
                  <p className="font-display font-extrabold text-sm text-brand-900">Score AgroFísio</p>
                  <p className="font-mono text-[10px] text-amber-700">Atenção — 3 deficiências detectadas</p>
                </div>
              </div>
              <div>
                <span className="font-display font-extrabold text-3xl leading-none text-amber-700">72</span>
                <span className="font-mono text-[11px] text-ink-400">/100</span>
              </div>
            </div>
            <div className="px-4 py-3">
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '72%' }} />
              </div>
              <p className="font-mono text-[10px] text-green-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                Corrigindo B e Mo → Score 92 (+20 pts)
              </p>
            </div>
            <div className="border-t border-gray-100 px-4 py-2.5 space-y-1">
              {[
                ['B deficiente (foliar)', '-10 pts'],
                ['Mo deficiente (foliar)', '-10 pts'],
                ['pH 5.4 — Mo imobilizado', '-6 pts'],
              ].map(([l, v]) => (
                <div key={l} className="flex items-center justify-between">
                  <p className="font-mono text-[10px] text-ink-600">{l}</p>
                  <span className="font-mono text-[10px] text-red-600 font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFÍCIOS ──────────────────────────────────────────────────── */}
      <section className="px-5 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-brand-900 text-center mb-2">
            Um sistema técnico completo
          </h2>
          <p className="font-mono text-xs text-ink-400 text-center mb-10">
            Do estádio fenológico ao laudo assinado, em uma única plataforma
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {BENEFICIOS.map(b => (
              <div key={b.titulo} className="bg-white border border-surface-border rounded-xl p-5 shadow-sm">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center text-xl mb-4">
                  {b.icon}
                </div>
                <h3 className="font-display font-bold text-sm text-brand-900 mb-2">{b.titulo}</h3>
                <p className="font-mono text-[11px] text-ink-500 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ───────────────────────────────────────────────── */}
      <section className="bg-brand-900 text-white px-5 py-14">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-center mb-2">Como funciona</h2>
          <p className="font-mono text-xs opacity-60 text-center mb-10">4 etapas. 5 minutos.</p>
          <div className="space-y-4">
            {PASSOS.map((p, i) => (
              <div key={p.num} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="font-mono font-bold text-sm">{p.num}</span>
                </div>
                <div className="flex-1 pt-1.5">
                  <p className="font-display font-bold text-sm mb-0.5">{p.titulo}</p>
                  <p className="font-mono text-[11px] opacity-70">{p.desc}</p>
                </div>
                {i < PASSOS.length - 1 && (
                  <div className="absolute ml-5 mt-10 w-px h-4 bg-white/10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CREDIBILIDADE TÉCNICA ───────────────────────────────────────── */}
      <section className="px-5 py-12 bg-surface-bg border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-[10px] text-ink-400 uppercase tracking-wider mb-6">
            Base científica
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {REFERENCIAS.map(r => (
              <span key={r} className="bg-white border border-surface-border rounded-lg px-3 py-1.5 font-mono text-[10px] text-ink-600 shadow-sm">
                📚 {r}
              </span>
            ))}
          </div>
          <p className="font-mono text-[10px] text-ink-400 mt-6">
            Recomendações geradas com IA (Claude — Anthropic) devem ser validadas por engenheiro agrônomo habilitado.
          </p>
        </div>
      </section>

      {/* ── CTA FINAL ───────────────────────────────────────────────────── */}
      <section className="px-5 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="font-display font-extrabold text-2xl text-brand-900 mb-3">
            Pronto para começar?
          </h2>
          <p className="font-mono text-xs text-ink-500 mb-7">
            Sua primeira diagnose é gratuita. Sem cartão de crédito.
          </p>
          <button
            onClick={handleCTA}
            className="w-full bg-brand-900 text-white font-display font-extrabold text-base px-8 py-4 rounded-xl hover:bg-brand-700 transition-colors shadow-md"
          >
            Começar agora →
          </button>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-gray-100 px-5 py-6 text-center">
        <p className="font-mono text-[10px] text-ink-400">
          © 2025 AgroFísio · Nutrição e Fisiologia Vegetal Digital
        </p>
      </footer>

    </div>
  )
}
