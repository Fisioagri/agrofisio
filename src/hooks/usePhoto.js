import { useState } from 'react'

export function usePhoto(initialB64 = '') {
  const [preview, setPreview]       = useState(initialB64 ? `data:image/jpeg;base64,${initialB64}` : null)
  const [compressed, setCompressed] = useState(initialB64 || null)

  async function handleFile(file) {
    if (!file) return
    const reader = new FileReader()
    reader.onload = async (ev) => {
      const b64 = await compressImage(ev.target.result)
      setCompressed(b64)
      setPreview('data:image/jpeg;base64,' + b64)
    }
    reader.readAsDataURL(file)
  }

  return { preview, compressed, handleFile }
}

function compressImage(dataUrl) {
  return new Promise(resolve => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      const max = 700
      if (w > h) { h = Math.round(h * max / w); w = max }
      else       { w = Math.round(w * max / h); h = max }
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      let q = 0.6
      let result = canvas.toDataURL('image/jpeg', q).split(',')[1]
      while (result.length * 0.75 > 3_000_000 && q > 0.1) {
        q -= 0.1
        result = canvas.toDataURL('image/jpeg', q).split(',')[1]
      }
      resolve(result)
    }
    img.src = dataUrl
  })
}
