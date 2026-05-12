import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function LaudoView({ title, subtitle, badge, html, showPrint = false }) {
  const { lang } = useLanguage()
  const contentRef = useRef(null)
  const [generating, setGenerating] = useState(false)

  async function handlePDF() {
    if (generating) return
    setGenerating(true)
    try {
      const html2pdf = (await import('html2pdf.js')).default

      const element = document.createElement('div')
      element.innerHTML = `
        <div style="font-family: sans-serif; padding: 8px;">
          <div style="background:#0A3D2E; color:white; padding:16px; border-radius:8px; margin-bottom:16px;">
            <h2 style="margin:0 0 4px 0; font-size:18px;">${title}</h2>
            <p style="margin:0; font-size:11px; opacity:0.8;">${subtitle}</p>
            ${badge ? `<span style="display:inline-block; background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); padding:3px 8px; border-radius:20px; font-size:10px; margin-top:8px;">${badge}</span>` : ''}
          </div>
          ${contentRef.current?.innerHTML || html}
        </div>
      `

      // Apply basic styles for tables
      element.querySelectorAll('table').forEach(t => {
        t.style.cssText = 'width:100%;border-collapse:collapse;margin:8px 0;font-size:11px;'
      })
      element.querySelectorAll('th').forEach(th => {
        th.style.cssText = 'background:#0A3D2E;color:white;padding:6px 8px;text-align:left;font-size:10px;'
      })
      element.querySelectorAll('td').forEach(td => {
        td.style.cssText = 'padding:5px 8px;border-bottom:1px solid #e5e7eb;font-size:11px;'
      })
      element.querySelectorAll('h3').forEach(h => {
        h.style.cssText = 'color:#0A3D2E;font-size:14px;margin:16px 0 8px 0;border-bottom:2px solid #dcfce7;padding-bottom:4px;'
      })
      element.querySelectorAll('strong').forEach(s => {
        s.style.cssText = 'color:#0A3D2E;'
      })

      const filename = `laudo-agrofisio-${subtitle.split('·')[0].trim().replace(/\s+/g, '-').toLowerCase()}.pdf`

      const opt = {
        margin: [12, 12, 12, 12],
        filename,
        image: { type: 'jpeg', quality: 0.92 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      }

      const blob = await html2pdf().set(opt).from(element).outputPdf('blob')
      const file = new File([blob], filename, { type: 'application/pdf' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'AgroFísio — Laudo Fisiológico' })
      } else {
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        a.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
    } catch (e) {
      console.error('PDF error:', e)
      alert(lang === 'en' ? 'Could not generate PDF. Try again.' : 'Não foi possível gerar o PDF. Tente novamente.')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-brand-900 to-brand-700 rounded-card p-4 mb-2.5 text-white">
        <h2 className="font-display font-extrabold text-[19px] mb-0.5">{title}</h2>
        <p className="font-mono text-xs opacity-80">{subtitle}</p>
        {badge && (
          <span className="inline-block bg-white/15 border border-white/25 px-2.5 py-1 rounded-full
            font-mono text-[10px] mt-2">
            {badge}
          </span>
        )}
        {showPrint && (
          <button
            onClick={handlePDF}
            disabled={generating}
            className="mt-3 flex items-center gap-1.5 bg-white/20 hover:bg-white/30
              border border-white/30 px-3 py-1.5 rounded-full font-mono text-[11px]
              transition-all disabled:opacity-60"
          >
            {generating
              ? (lang === 'en' ? '⏳ Generating PDF...' : '⏳ Gerando PDF...')
              : (lang === 'en' ? '📄 Share as PDF' : '📄 Compartilhar PDF')}
          </button>
        )}
      </div>
      <div className="bg-white border border-surface-border rounded-card shadow-card p-4">
        <div
          ref={contentRef}
          className="laudo-body text-sm text-ink-900 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  )
}
