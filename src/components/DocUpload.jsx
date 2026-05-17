import { useRef, useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const btn = 'flex items-center gap-1.5 px-3 py-2 border border-surface-border rounded-sm font-mono text-[10px] text-ink-600 hover:border-brand-700 hover:text-brand-900 transition-colors cursor-pointer select-none'

function isImageUrl(url) {
  return /\.(jpe?g|png|webp|gif|heic|heif|avif)(\?|$)/i.test(url)
}

export default function DocUpload({ value, onChange }) {
  const { lang } = useLanguage()
  const [preview, setPreview] = useState(null) // { url, isImage, name } — local only
  const cameraRef  = useRef()
  const galleryRef = useRef()
  const pdfRef     = useRef()

  function handleFile(f) {
    if (!f) return
    const isImage = f.type.startsWith('image/')
    setPreview({ url: URL.createObjectURL(f), isImage, name: f.name })
    onChange(f)
  }

  function resetInputs() {
    ;[cameraRef, galleryRef, pdfRef].forEach(r => { if (r.current) r.current.value = '' })
  }

  function remove() {
    setPreview(null)
    resetInputs()
    onChange(null)
  }

  // Local preview after picking a file
  if (preview) {
    return (
      <div className="space-y-2">
        {preview.isImage ? (
          <img src={preview.url} alt="" className="w-full max-h-36 object-cover rounded-sm border border-surface-border" />
        ) : (
          <div className="flex items-center gap-2 p-3 border border-surface-border rounded-sm bg-surface-bg">
            <span className="text-xl">📄</span>
            <span className="font-mono text-[10px] text-ink-600 truncate flex-1">{preview.name}</span>
          </div>
        )}
        <div className="flex gap-2">
          <label className={`${btn} flex-1 justify-center`}>
            <input ref={galleryRef} type="file" accept="image/*,application/pdf" className="hidden"
              onChange={e => handleFile(e.target.files?.[0])} />
            🔄 {lang === 'en' ? 'Replace' : 'Trocar'}
          </label>
          <button type="button" onClick={remove}
            className="flex-1 py-2 border border-danger-600 rounded-sm font-mono text-[10px] text-danger-600 hover:bg-danger-50 transition-colors">
            🗑 {lang === 'en' ? 'Remove' : 'Remover'}
          </button>
        </div>
      </div>
    )
  }

  // Existing saved URL (edit mode, no new file picked yet)
  if (value) {
    const isImg = isImageUrl(value)
    return (
      <div className="space-y-2">
        {isImg ? (
          <a href={value} target="_blank" rel="noopener noreferrer">
            <img src={value} alt="" className="w-full max-h-36 object-cover rounded-sm border border-surface-border hover:opacity-90 transition-opacity" />
          </a>
        ) : (
          <a href={value} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border border-surface-border rounded-sm bg-surface-bg hover:bg-brand-50 transition-colors">
            <span className="text-xl">📄</span>
            <span className="font-mono text-[10px] text-brand-900 truncate flex-1">
              {lang === 'en' ? 'View document' : 'Ver documento'} ↗
            </span>
          </a>
        )}
        <label className={`${btn} w-full justify-center`}>
          <input ref={galleryRef} type="file" accept="image/*,application/pdf" className="hidden"
            onChange={e => handleFile(e.target.files?.[0])} />
          🔄 {lang === 'en' ? 'Replace file' : 'Trocar arquivo'}
        </label>
      </div>
    )
  }

  // Empty state — show three pick buttons
  return (
    <div className="flex gap-2 flex-wrap">
      <label className={btn}>
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden"
          onChange={e => handleFile(e.target.files?.[0])} />
        📷 {lang === 'en' ? 'Camera' : 'Câmera'}
      </label>
      <label className={btn}>
        <input ref={galleryRef} type="file" accept="image/*" className="hidden"
          onChange={e => handleFile(e.target.files?.[0])} />
        🖼️ {lang === 'en' ? 'Gallery' : 'Galeria'}
      </label>
      <label className={btn}>
        <input ref={pdfRef} type="file" accept="application/pdf" className="hidden"
          onChange={e => handleFile(e.target.files?.[0])} />
        📄 PDF
      </label>
    </div>
  )
}
