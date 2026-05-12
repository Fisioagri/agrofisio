import { useRef } from 'react'

export default function PhotoUpload({ preview, onFile }) {
  const camRef = useRef()
  const galRef = useRef()

  return (
    <div>
      <div className="flex gap-2.5">
        <label className="flex-1 border-2 border-dashed border-surface-border rounded-card py-5 px-2 text-center
          cursor-pointer hover:border-brand-700 transition-colors bg-brand-50">
          <input
            ref={camRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={e => onFile(e.target.files[0])}
          />
          <div className="text-2xl mb-1.5">📷</div>
          <div className="font-display font-bold text-[11px] text-brand-900">Câmera</div>
          <div className="font-mono text-[10px] text-ink-400 mt-0.5">tirar agora</div>
        </label>

        <label className="flex-1 border-2 border-dashed border-surface-border rounded-card py-5 px-2 text-center
          cursor-pointer hover:border-brand-700 transition-colors bg-brand-50">
          <input
            ref={galRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => onFile(e.target.files[0])}
          />
          <div className="text-2xl mb-1.5">🖼️</div>
          <div className="font-display font-bold text-[11px] text-brand-900">Galeria</div>
          <div className="font-mono text-[10px] text-ink-400 mt-0.5">escolher foto</div>
        </label>
      </div>

      {preview && (
        <div className="mt-2.5">
          <img src={preview} alt="Preview" className="w-full max-h-48 object-cover rounded-sm border border-surface-border" />
          <p className="font-mono text-[11px] text-brand-700 mt-2">✓ Foto carregada e comprimida</p>
        </div>
      )}
    </div>
  )
}
