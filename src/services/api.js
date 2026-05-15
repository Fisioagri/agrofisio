const WORKER_URL = import.meta.env.VITE_WORKER_URL

const RETRY_DELAYS = [12000, 22000, 35000] // ms entre tentativas

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms))
}

export async function callClaude(prompt, imageB64 = null, maxTokens = 4000, pdfB64 = null) {
  const content = []

  if (pdfB64) {
    content.push({
      type: 'document',
      source: { type: 'base64', media_type: 'application/pdf', data: pdfB64 },
    })
  }

  if (imageB64) {
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: imageB64 },
    })
  }
  content.push({ type: 'text', text: prompt })

  const body = JSON.stringify({
    model: 'claude-sonnet-4-6',
    max_tokens: maxTokens,
    messages: [{ role: 'user', content }],
  })

  let lastError
  for (let attempt = 0; attempt <= RETRY_DELAYS.length; attempt++) {
    if (attempt > 0) {
      await sleep(RETRY_DELAYS[attempt - 1])
    }

    let resp
    try {
      resp = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      })
    } catch (e) {
      lastError = new Error('Falha na conexão: ' + e.message)
      continue
    }

    const rawText = await resp.text()
    let data
    try {
      data = JSON.parse(rawText)
    } catch {
      const preview = rawText.slice(0, 120)
      lastError = new Error(`Servidor retornou resposta inválida (HTTP ${resp.status}): ${preview}`)
      continue
    }

    if (data.error) {
      const isOverloaded = data.error.type === 'overloaded_error' || resp.status === 529
      lastError = new Error(data.error.message || JSON.stringify(data.error))
      if (isOverloaded && attempt < RETRY_DELAYS.length) continue
      throw lastError
    }

    return data.content?.map(b => b.text || '').join('') || ''
  }

  throw lastError
}
