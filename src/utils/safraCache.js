// Determina a safra vigente (ano-safra começa em julho)
// Ex: agosto 2025 → "2025/2026"; março 2026 → "2025/2026"
function getSafraAtual() {
  const now   = new Date()
  const year  = now.getFullYear()
  const month = now.getMonth() + 1 // 1-12
  return month >= 7 ? `${year}/${year + 1}` : `${year - 1}/${year}`
}

function cacheKey(prodNome, talhao) {
  const n = (prodNome || '').toLowerCase().trim().replace(/\s+/g, '_')
  const t = (talhao   || '').toLowerCase().trim().replace(/\s+/g, '_')
  return `agrofisio_talhao__${n}__${t}`
}

export function saveSafraCache({ prodNome, prodTalhao, safra, cultura, hibrido, adubacao }) {
  if (!prodNome || !prodTalhao || !safra) return
  try {
    localStorage.setItem(cacheKey(prodNome, prodTalhao), JSON.stringify({
      safraAno: getSafraAtual(),
      safra, cultura, hibrido: hibrido || '', adubacao: adubacao || '',
    }))
  } catch { /* localStorage indisponível */ }
}

export function loadSafraCache(prodNome, prodTalhao) {
  if (!prodNome || !prodTalhao) return null
  try {
    const raw = localStorage.getItem(cacheKey(prodNome, prodTalhao))
    if (!raw) return null
    const cached = JSON.parse(raw)
    if (cached.safraAno !== getSafraAtual()) return null
    return cached // { safra, cultura, hibrido, adubacao }
  } catch {
    return null
  }
}

export function getSafraAtualFormatted() {
  return getSafraAtual()
}
