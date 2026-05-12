import { useState } from 'react'
import { callClaude } from '../services/api'
import { useLanguage } from '../contexts/LanguageContext'
import Spinner from './ui/Spinner'

const PROMPTS = {
  solo: `Analise esta foto de laudo de análise de solo brasileiro.
Extraia os valores numéricos dos nutrientes listados. Retorne SOMENTE um objeto JSON válido, sem markdown, sem texto adicional.
Use null para campos não encontrados na imagem.
JSON esperado (use exatamente estas chaves):
{"ph":null,"mo":null,"pSolo":null,"kSolo":null,"caSolo":null,"mgSolo":null,"sSolo":null,"alSolo":null,"hAlSolo":null,"ctcSolo":null,"vSolo":null,"satAlSolo":null,"argilaSolo":null,"bSolo":null,"znSolo":null,"cuSolo":null,"mnSolo":null,"feSolo":null,"moSolo":null}`,

  foliar: `Analise esta foto de laudo de análise foliar de planta.
Extraia os valores numéricos dos nutrientes. Retorne SOMENTE um objeto JSON válido, sem markdown, sem texto adicional.
Use null para campos não encontrados.
JSON esperado (use exatamente estas chaves):
{"nFoliar":null,"pFoliar":null,"kFoliar":null,"caFoliar":null,"mgFoliar":null,"sFoliar":null,"bFoliar":null,"znFoliar":null,"cuFoliar":null,"mnFoliar":null,"feFoliar":null,"moFoliar":null}`,
}

function compressPhoto(file) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = ev => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let w = img.width, h = img.height, max = 1400
        if (w > h) { h = Math.round(h * max / w); w = max }
        else       { w = Math.round(w * max / h); h = max }
        canvas.width = w; canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.75).split(',')[1])
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  })
}

function extractJSON(text) {
  const match = text.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('Could not parse lab report')
  return JSON.parse(match[0])
}

export default function AnalysisPhotoUpload({ type, onFill }) {
  const { t } = useLanguage()
  const ap = t.analysisPhoto
  const [status, setStatus]     = useState(null) // null | 'reading' | 'done' | 'error'
  const [preview, setPreview]   = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  async function handleFile(file) {
    if (!file) return
    setStatus('reading')
    setErrorMsg('')
    try {
      const b64 = await compressPhoto(file)
      setPreview('data:image/jpeg;base64,' + b64)
      const response = await callClaude(PROMPTS[type], b64)
      const raw = extractJSON(response)
      const filled = Object.fromEntries(
        Object.entries(raw).filter(([, v]) => v !== null && v !== '')
      )
      onFill(filled)
      setStatus('done')
    } catch (e) {
      setStatus('error')
      setErrorMsg(e.message || 'Error processing image')
    }
  }

  return (
    <div className="space-y-3">
      {status !== 'done' && (
        <div className="flex gap-2.5">
          <PhotoLabel
            icon="📷"
            title={ap.camera}
            sub={ap.cameraSub}
            capture="environment"
            onChange={e => handleFile(e.target.files[0])}
          />
          <PhotoLabel
            icon="🖼️"
            title={ap.gallery}
            sub={ap.gallerySub}
            onChange={e => handleFile(e.target.files[0])}
          />
        </div>
      )}

      {preview && (
        <img
          src={preview}
          alt="Laudo"
          className="w-full max-h-52 object-cover rounded-sm border border-surface-border"
        />
      )}

      {status === 'reading' && (
        <div className="flex items-center gap-3 p-3 bg-brand-50 rounded-sm border border-brand-400">
          <Spinner size="sm" />
          <div>
            <p className="font-mono text-xs font-semibold text-brand-900">{ap.reading}</p>
            <p className="font-mono text-[10px] text-ink-400">{ap.readingSub}</p>
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className="p-3 bg-brand-100 rounded-sm border border-brand-700">
          <p className="font-mono text-xs font-semibold text-brand-900">{ap.done}</p>
          <p className="font-mono text-[10px] text-ink-600 mt-0.5">{ap.doneSub}</p>
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-danger-50 rounded-sm border border-danger-600">
          <p className="font-mono text-xs font-semibold text-danger-600">⚠️ {errorMsg}</p>
          <p className="font-mono text-[10px] text-ink-600 mt-0.5">{ap.error}</p>
        </div>
      )}
    </div>
  )
}

function PhotoLabel({ icon, title, sub, capture, onChange }) {
  return (
    <label className="flex-1 border-2 border-dashed border-surface-border rounded-card py-5 px-2
      text-center cursor-pointer hover:border-brand-700 transition-colors bg-brand-50">
      <input
        type="file"
        accept="image/*"
        capture={capture}
        className="hidden"
        onChange={onChange}
      />
      <div className="text-2xl mb-1.5">{icon}</div>
      <div className="font-display font-bold text-[11px] text-brand-900">{title}</div>
      <div className="font-mono text-[10px] text-ink-400 mt-0.5">{sub}</div>
    </label>
  )
}
