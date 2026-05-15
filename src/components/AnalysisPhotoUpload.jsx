import { useState } from 'react'
import { callClaude } from '../services/api'
import { useLanguage } from '../contexts/LanguageContext'
import { compressPhoto } from '../utils/compressPhoto'
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

function extractJSON(text) {
  // Non-greedy match to get the first complete JSON object
  const match = text.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)?\}/)
  if (!match) throw new Error('Não foi possível extrair os dados do laudo')
  try {
    return JSON.parse(match[0])
  } catch {
    // Fallback: try to find any valid JSON in the text
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) throw new Error('Formato de resposta inválido')
    return JSON.parse(text.slice(start, end + 1))
  }
}

export default function AnalysisPhotoUpload({ type, onFill }) {
  const { t, lang } = useLanguage()
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
      setErrorMsg(e.message || 'Erro ao processar imagem')
    }
  }

  function handleRetake() {
    setStatus(null)
    setPreview(null)
    setErrorMsg('')
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
          <button
            onClick={handleRetake}
            className="mt-2 font-mono text-[10px] text-brand-700 underline"
          >
            {lang === 'en' ? 'Use a different photo' : 'Usar outra foto'}
          </button>
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
