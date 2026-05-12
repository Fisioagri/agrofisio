const WORKER_URL = import.meta.env.VITE_WORKER_URL

export async function callClaude(prompt, imageB64 = null) {
  const content = []

  if (imageB64) {
    content.push({
      type: 'image',
      source: { type: 'base64', media_type: 'image/jpeg', data: imageB64 },
    })
  }
  content.push({ type: 'text', text: prompt })

  const resp = await fetch(WORKER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 4000,
      messages: [{ role: 'user', content }],
    }),
  })

  const rawText = await resp.text()
  let data
  try {
    data = JSON.parse(rawText)
  } catch {
    throw new Error('Resposta inválida do servidor')
  }

  if (data.error) throw new Error(data.error.message || JSON.stringify(data.error))
  return data.content?.map(b => b.text || '').join('') || ''
}
