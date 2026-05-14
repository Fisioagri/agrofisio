import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const SLIDES_PT = [
  {
    icon: '🌱',
    title: 'Bem-vindo ao AgroFísio',
    text: 'Gere protocolos fisiológicos completos para suas lavouras com auxílio de inteligência artificial, baseado em Marschner, Taiz & Zeiger e Embrapa.',
  },
  {
    icon: '🧪',
    title: 'Como funciona',
    text: 'Informe os dados do produtor, análise de solo e foliar, foto da planta e estádio. A IA gera diagnose fisiológica + protocolo de manejo em segundos.',
  },
  {
    icon: '📋',
    title: 'Histórico e PDF',
    text: 'Todos os laudos ficam salvos no histórico. Você pode abrir, compartilhar como PDF pelo WhatsApp ou excluir quando quiser.',
  },
  {
    icon: '⚠️',
    title: 'Uso Responsável',
    text: 'Os protocolos são gerados por IA e devem ser validados por engenheiro agrônomo habilitado antes da aplicação. Você é o responsável técnico.',
  },
]

const SLIDES_EN = [
  {
    icon: '🌱',
    title: 'Welcome to AgroFísio',
    text: 'Generate complete physiological protocols for your crops with AI assistance, based on Marschner, Taiz & Zeiger and Embrapa.',
  },
  {
    icon: '🧪',
    title: 'How it works',
    text: 'Enter producer data, soil and leaf analysis, plant photo and growth stage. The AI generates a physiological diagnosis + management protocol in seconds.',
  },
  {
    icon: '📋',
    title: 'History and PDF',
    text: 'All reports are saved in history. You can open, share as PDF via WhatsApp, or delete them anytime.',
  },
  {
    icon: '⚠️',
    title: 'Responsible Use',
    text: 'Protocols are AI-generated and must be validated by a licensed agronomist before application. You are the technical responsible.',
  },
]

export default function OnboardingModal({ onClose }) {
  const { lang } = useLanguage()
  const slides = lang === 'en' ? SLIDES_EN : SLIDES_PT
  const [idx, setIdx] = useState(0)
  const isLast = idx === slides.length - 1
  const slide = slides[idx]

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-end justify-center p-0">
      <div className="bg-white w-full max-w-2xl rounded-t-2xl p-6 pb-8 animate-slide-up">
        {/* dots */}
        <div className="flex justify-center gap-1.5 mb-6">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-6 bg-brand-900' : 'w-1.5 bg-surface-border'}`}
            />
          ))}
        </div>

        <div className="text-center space-y-3 mb-8">
          <div className="text-5xl">{slide.icon}</div>
          <h2 className="font-display font-bold text-xl text-brand-900">{slide.title}</h2>
          <p className="text-sm text-ink-600 leading-relaxed max-w-xs mx-auto">{slide.text}</p>
        </div>

        <div className="flex gap-3">
          {idx > 0 && (
            <button
              onClick={() => setIdx(i => i - 1)}
              className="flex-1 py-3 border border-surface-border rounded-card font-mono text-sm text-ink-600"
            >
              {lang === 'en' ? 'Back' : 'Voltar'}
            </button>
          )}
          <button
            onClick={isLast ? onClose : () => setIdx(i => i + 1)}
            className="flex-1 py-3 bg-brand-900 text-white rounded-card font-display font-bold text-sm hover:bg-brand-700 transition-colors"
          >
            {isLast
              ? (lang === 'en' ? '🚀 Get Started' : '🚀 Começar')
              : (lang === 'en' ? 'Next →' : 'Próximo →')}
          </button>
        </div>
      </div>
    </div>
  )
}
