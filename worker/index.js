// Cloudflare Worker — proxy seguro para a API Anthropic
// Aceita requisições apenas das origens autorizadas do AgroFísio
// Deploy: cd worker && npx wrangler deploy
// Segredo: npx wrangler secret put ANTHROPIC_API_KEY

const ALLOWED_ORIGINS = [
  'https://agrofisio1.pages.dev',
  'https://main.agrofisio1.pages.dev',
  'http://localhost:5173',
  'http://localhost:4173',
]

const CORS_HEADERS = (origin) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
})

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || ''

    if (request.method === 'OPTIONS') {
      if (!ALLOWED_ORIGINS.includes(origin)) {
        return new Response('Forbidden', { status: 403 })
      }
      return new Response(null, { status: 204, headers: CORS_HEADERS(origin) })
    }

    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    if (!ALLOWED_ORIGINS.includes(origin)) {
      return new Response('Forbidden', { status: 403 })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return new Response(JSON.stringify({ error: { type: 'invalid_request', message: 'Invalid JSON body' } }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...CORS_HEADERS(origin) },
      })
    }

    const anthropicResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    const data = await anthropicResp.json()

    return new Response(JSON.stringify(data), {
      status: anthropicResp.status,
      headers: {
        'Content-Type': 'application/json',
        ...CORS_HEADERS(origin),
      },
    })
  },
}
