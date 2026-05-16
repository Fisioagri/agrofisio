import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { listLaudos, deleteLaudo } from '../services/laudoService'
import { listProdutores } from '../services/produtoresService'
import Spinner from '../components/ui/Spinner'
import OnboardingModal from '../components/OnboardingModal'

// WMO weather code → [emoji, [pt label, en label]]
const WMO = {
  0:  ['☀️', ['Céu limpo',            'Clear sky']],
  1:  ['🌤', ['Predom. limpo',         'Mainly clear']],
  2:  ['⛅', ['Parcialmente nublado',  'Partly cloudy']],
  3:  ['☁️', ['Nublado',              'Overcast']],
  45: ['🌫', ['Neblina',              'Foggy']],
  48: ['🌫', ['Neblina c/ gelo',      'Icy fog']],
  51: ['🌦', ['Garoa leve',           'Light drizzle']],
  53: ['🌦', ['Garoa moderada',       'Moderate drizzle']],
  55: ['🌦', ['Garoa intensa',        'Dense drizzle']],
  61: ['🌧', ['Chuva leve',          'Light rain']],
  63: ['🌧', ['Chuva moderada',       'Moderate rain']],
  65: ['🌧', ['Chuva forte',         'Heavy rain']],
  71: ['🌨', ['Neve leve',           'Light snow']],
  73: ['🌨', ['Neve moderada',        'Moderate snow']],
  75: ['❄️', ['Neve forte',          'Heavy snow']],
  80: ['🌦', ['Pancadas leves',       'Light showers']],
  81: ['🌦', ['Pancadas moder.',      'Moderate showers']],
  82: ['⛈', ['Pancadas fortes',      'Violent showers']],
  95: ['⛈', ['Trovoada',            'Thunderstorm']],
  96: ['⛈', ['Trovoada c/ granizo', 'Thunderstorm w/ hail']],
  99: ['⛈', ['Trovoada forte',      'Heavy thunderstorm']],
}

function wmoInfo(code, lang) {
  const entry = WMO[code] ?? WMO[0]
  return { emoji: entry[0], label: entry[1][lang === 'en' ? 1 : 0] }
}

const CROP_ICO = { soja: '🫘', milho: '🌽', feijao: '🫛' }
const PAGE_SIZE = 8

// ── Weather widget ─────────────────────────────────────────────────────────
function WeatherWidget({ lang, t }) {
  const w = t.weather
  const [city, setCity]         = useState(() => localStorage.getItem('weather_city') || '')
  const [cityInput, setCityInput] = useState('')
  const [editing, setEditing]   = useState(false)
  const [weather, setWeather]   = useState(null)
  const [geoName, setGeoName]   = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const inputRef = useRef(null)

  // Auto-load city from first produtor if none saved
  useEffect(() => {
    if (city) return
    listProdutores()
      .then(list => {
        const first = list.find(p => p.cidade)
        if (first) {
          const c = first.estado ? `${first.cidade} ${first.estado}` : first.cidade
          setCity(c)
          localStorage.setItem('weather_city', c)
        } else {
          setEditing(true)
        }
      })
      .catch(() => setEditing(true))
  }, [city])

  useEffect(() => {
    if (!city) return
    fetchWeather(city)
  }, [city])

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus()
  }, [editing])

  async function fetchWeather(cityStr) {
    setLoading(true)
    setError('')
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityStr)}&count=1&language=${lang}&format=json`
      )
      const geoData = await geoRes.json()
      if (!geoData.results?.length) throw new Error('notFound')

      const { latitude, longitude, name, admin1 } = geoData.results[0]
      setGeoName(admin1 ? `${name}, ${admin1}` : name)

      const wxRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m,precipitation` +
        `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum` +
        `&timezone=auto&forecast_days=7`
      )
      const wxData = await wxRes.json()
      setWeather(wxData)
    } catch (err) {
      setError(err.message === 'notFound' ? w.notFound : w.error)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!cityInput.trim()) return
    const c = cityInput.trim()
    setCity(c)
    localStorage.setItem('weather_city', c)
    setEditing(false)
    setCityInput('')
  }

  function startEdit() {
    setCityInput(city)
    setEditing(true)
  }

  const cityQuery = encodeURIComponent(geoName || city)

  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-brand-900 px-4 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-wider">
          {w.title}
        </span>
        {city && !editing && (
          <button
            onClick={startEdit}
            className="font-mono text-[10px] text-brand-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span>📍</span>
            <span className="max-w-[140px] truncate">{geoName || city}</span>
            <span className="ml-1 opacity-60">✏️</span>
          </button>
        )}
      </div>

      <div className="p-4">
        {/* City input */}
        {(editing || !city) && (
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <input
              ref={inputRef}
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={w.cityPh}
              className="flex-1 border border-surface-border rounded-sm px-3 py-2 font-mono text-xs bg-surface-input focus:outline-none focus:border-brand-700 transition-colors"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors"
            >
              {w.search}
            </button>
            {city && (
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-3 py-2 border border-surface-border rounded-sm font-mono text-xs text-ink-400 hover:border-ink-400 transition-colors"
              >
                ✕
              </button>
            )}
          </form>
        )}

        {!city && !editing && (
          <p className="font-mono text-xs text-ink-400 py-4 text-center">{w.noCity}</p>
        )}

        {loading && (
          <div className="flex justify-center py-6"><Spinner /></div>
        )}

        {error && (
          <p className="font-mono text-xs text-danger-600 py-2 text-center">{error}</p>
        )}

        {weather && !loading && !editing && (
          <>
            {/* Current conditions */}
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl leading-none">
                {wmoInfo(weather.current.weathercode, lang).emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-3xl text-brand-900">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <div className="font-mono text-xs text-ink-500 mt-0.5">
                  {wmoInfo(weather.current.weathercode, lang).label}
                </div>
                <div className="flex gap-3 mt-1.5 flex-wrap">
                  <span className="font-mono text-[10px] text-ink-400">
                    💧 {weather.current.relative_humidity_2m}%
                  </span>
                  <span className="font-mono text-[10px] text-ink-400">
                    💨 {Math.round(weather.current.windspeed_10m)} km/h
                  </span>
                  <span className="font-mono text-[10px] text-ink-400">
                    🌧 {weather.current.precipitation.toFixed(1)} mm
                  </span>
                </div>
              </div>
            </div>

            {/* 7-day forecast */}
            <div className="border-t border-surface-border pt-3 mb-3">
              <div className="font-mono text-[9px] text-ink-300 uppercase tracking-wider mb-2">{w.forecast}</div>
              <div className="grid grid-cols-7 gap-0.5">
                {weather.daily.time.map((dateStr, i) => {
                  const d = new Date(dateStr + 'T12:00:00')
                  const dayIdx = d.getDay()
                  const dayLabel = i === 0 ? w.today : w.days[dayIdx]
                  const { emoji } = wmoInfo(weather.daily.weathercode[i], lang)
                  return (
                    <div key={dateStr} className={`flex flex-col items-center gap-0.5 px-0.5 py-1.5 rounded-md ${i === 0 ? 'bg-brand-50' : ''}`}>
                      <span className="font-mono text-[9px] text-ink-400 leading-none">{dayLabel}</span>
                      <span className="text-base leading-none mt-0.5">{emoji}</span>
                      <span className="font-mono text-[9px] font-bold text-brand-900 leading-none mt-0.5">
                        {Math.round(weather.daily.temperature_2m_max[i])}°
                      </span>
                      <span className="font-mono text-[9px] text-ink-300 leading-none">
                        {Math.round(weather.daily.temperature_2m_min[i])}°
                      </span>
                      {weather.daily.precipitation_sum[i] > 0 && (
                        <span className="font-mono text-[8px] text-blue-500 leading-none">
                          {weather.daily.precipitation_sum[i].toFixed(0)}mm
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* External links */}
            <div className="border-t border-surface-border pt-3">
              <div className="font-mono text-[9px] text-ink-300 uppercase tracking-wider mb-2">{w.sources}</div>
              <div className="flex gap-2 flex-wrap">
                <a
                  href={`https://www.yr.no/en/search?q=${cityQuery}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-surface-border rounded-full font-mono text-[10px] text-ink-500 hover:border-brand-700 hover:text-brand-900 transition-colors"
                >
                  🌍 yr.no
                </a>
                <a
                  href={`https://www.foreca.com/pt/?q=${cityQuery}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-surface-border rounded-full font-mono text-[10px] text-ink-500 hover:border-brand-700 hover:text-brand-900 transition-colors"
                >
                  🌦 Foreca
                </a>
                <a
                  href="https://www.climatempo.com.br"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-surface-border rounded-full font-mono text-[10px] text-ink-500 hover:border-brand-700 hover:text-brand-900 transition-colors"
                >
                  🌧 ClimaTempo
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ── Main dashboard ─────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { profile } = useAuth()
  const { t, lang } = useLanguage()
  const navigate = useNavigate()
  const [laudos, setLaudos]         = useState([])
  const [total, setTotal]           = useState(0)
  const [loading, setLoading]       = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [deleting, setDeleting]     = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('onboarding_done')
  )

  function closeOnboarding() {
    localStorage.setItem('onboarding_done', '1')
    setShowOnboarding(false)
  }

  useEffect(() => {
    let cancelled = false
    listLaudos({ limit: PAGE_SIZE, offset: 0 })
      .then(({ data, count }) => { if (!cancelled) { setLaudos(data); setTotal(count) } })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  async function loadMore() {
    setLoadingMore(true)
    listLaudos({ limit: PAGE_SIZE, offset: laudos.length })
      .then(({ data }) => setLaudos(prev => [...prev, ...data]))
      .catch(() => {})
      .finally(() => setLoadingMore(false))
  }

  async function handleDelete(e, id) {
    e.stopPropagation()
    const msg = lang === 'en' ? 'Delete this report?' : 'Excluir este laudo?'
    if (!window.confirm(msg)) return
    setDeleting(id)
    await deleteLaudo(id).catch(() => {})
    setLaudos(prev => prev.filter(l => l.id !== id))
    setTotal(prev => prev - 1)
    setDeleting(null)
  }

  const hasMore = laudos.length < total

  return (
    <AppLayout>
      {showOnboarding && <OnboardingModal onClose={closeOnboarding} />}
      <div className="space-y-4">
        {/* Greeting */}
        <div>
          <h1 className="font-display font-bold text-xl md:text-2xl text-brand-900">
            {t.dashboard.greeting(profile?.name)}
          </h1>
          <p className="font-mono text-xs text-ink-400 mt-0.5">{t.dashboard.subtitle}</p>
        </div>

        {/* Weather */}
        <WeatherWidget lang={lang} t={t} />

        {/* New Analysis CTA */}
        <Link
          to="/wizard"
          className="block bg-brand-900 text-white rounded-card p-4 md:p-5 shadow-card hover:bg-brand-700 transition-colors"
        >
          <div className="text-2xl mb-1.5">🌱</div>
          <h2 className="font-display font-bold text-lg md:text-xl">{t.dashboard.newAnalysis}</h2>
          <p className="font-mono text-xs text-brand-400 mt-0.5">{t.dashboard.newAnalysisSub}</p>
        </Link>

        {/* Histórico */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-[10px] font-bold text-ink-400 uppercase tracking-wider">
              {lang === 'en' ? 'History' : 'Histórico'}
            </div>
            {total > 0 && (
              <div className="font-mono text-[10px] text-ink-300">
                {laudos.length}/{total}
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-8"><Spinner /></div>
          ) : laudos.length === 0 ? (
            <div className="bg-white border border-surface-border rounded-card p-5 text-center shadow-card">
              <p className="text-2xl mb-2">📋</p>
              <p className="font-mono text-xs text-ink-400">
                {lang === 'en' ? 'No reports yet.' : 'Nenhum laudo gerado ainda.'}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                {laudos.map(l => (
                  <button
                    key={l.id}
                    onClick={() => navigate(`/laudos/${l.id}`)}
                    className="w-full bg-white border border-surface-border rounded-card p-3.5 shadow-card
                      hover:border-brand-700 hover:shadow-md transition-all text-left flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {CROP_ICO[l.cultura] || '🌱'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display font-bold text-sm text-brand-900 truncate">
                        {l.produtor_nome}
                      </p>
                      <p className="font-mono text-[10px] text-ink-400 mt-0.5">
                        {(l.cultura || '').toUpperCase()} · {lang === 'en' ? 'Stage' : 'Estádio'} {l.estadio} · {lang === 'en' ? 'Season' : 'Safra'} {l.safra}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="text-right">
                        <p className="font-mono text-[10px] text-ink-400">
                          {new Date(l.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', {
                            day: '2-digit', month: 'short'
                          })}
                        </p>
                        <p className="font-mono text-[10px] text-ink-300 mt-0.5">
                          {new Date(l.created_at).toLocaleTimeString(lang === 'en' ? 'en-US' : 'pt-BR', {
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={e => handleDelete(e, l.id)}
                        disabled={deleting === l.id}
                        className="w-7 h-7 flex items-center justify-center rounded-md text-ink-300
                          hover:text-danger-600 hover:bg-danger-50 transition-colors"
                      >
                        {deleting === l.id ? '…' : '🗑'}
                      </button>
                    </div>
                  </button>
                ))}
              </div>

              {hasMore && (
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="mt-2 w-full py-2.5 border border-surface-border rounded-card
                    font-mono text-xs text-ink-500 hover:border-brand-700 hover:text-brand-900
                    transition-all disabled:opacity-50"
                >
                  {loadingMore
                    ? t.common.loading
                    : lang === 'en'
                      ? `Load more (${total - laudos.length} remaining)`
                      : `Ver mais (${total - laudos.length} restantes)`}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
