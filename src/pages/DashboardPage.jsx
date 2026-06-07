import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../contexts/LanguageContext'
import { listProdutores } from '../services/produtoresService'
import { listLaudos } from '../services/laudoService'
import { listTalhoes } from '../services/talhoesService'
import Spinner from '../components/ui/Spinner'
import OnboardingModal from '../components/OnboardingModal'

// ─── WMO weather codes ────────────────────────────────────────────────────────
const WMO = {
  0:  ['☀️', ['Céu limpo', 'Clear sky']],
  1:  ['🌤', ['Predom. limpo', 'Mainly clear']],
  2:  ['⛅', ['Parcialmente nublado', 'Partly cloudy']],
  3:  ['☁️', ['Nublado', 'Overcast']],
  45: ['🌫', ['Neblina', 'Foggy']],
  51: ['🌦', ['Garoa leve', 'Light drizzle']],
  61: ['🌧', ['Chuva leve', 'Light rain']],
  63: ['🌧', ['Chuva moderada', 'Moderate rain']],
  65: ['🌧', ['Chuva forte', 'Heavy rain']],
  80: ['🌦', ['Pancadas leves', 'Light showers']],
  81: ['🌦', ['Pancadas moder.', 'Moderate showers']],
  82: ['⛈', ['Pancadas fortes', 'Violent showers']],
  95: ['⛈', ['Trovoada', 'Thunderstorm']],
  96: ['⛈', ['Trovoada c/ granizo', 'Thunderstorm w/ hail']],
  99: ['⛈', ['Trovoada forte', 'Heavy thunderstorm']],
}
function wmoInfo(code, lang) {
  const entry = WMO[code] ?? WMO[0]
  return { emoji: entry[0], label: entry[1][lang === 'en' ? 1 : 0] }
}

// ─── Saudação por horário ─────────────────────────────────────────────────────
function getGreeting(lang) {
  const h = new Date().getHours()
  if (lang === 'en') return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
  return h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'
}

// ─── Data formatada ────────────────────────────────────────────────────────────
function getFormattedDate(lang) {
  return new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ─── Quick action card ─────────────────────────────────────────────────────────
function ActionCard({ to, icon, label, desc, accent }) {
  return (
    <Link
      to={to}
      className={`
        group flex items-center gap-3 p-4 rounded-card bg-white border border-surface-border
        shadow-card hover:shadow-md hover:-translate-y-0.5 active:translate-y-0
        transition-all duration-150
        ${accent ? 'border-brand-400 bg-brand-50' : ''}
      `}
    >
      <span className={`
        w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center text-xl
        ${accent ? 'bg-brand-900 text-white' : 'bg-surface-muted text-brand-700'}
        group-hover:scale-105 transition-transform duration-150
      `}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className={`font-display font-bold text-sm leading-tight ${accent ? 'text-brand-900' : 'text-ink-900'}`}>
          {label}
        </p>
        {desc && <p className="font-mono text-[10px] text-ink-400 mt-0.5 truncate">{desc}</p>}
      </div>
      <span className="ml-auto text-ink-400 group-hover:text-brand-700 transition-colors text-xs">›</span>
    </Link>
  )
}

// ─── Stat item no hero ─────────────────────────────────────────────────────────
function HeroStat({ value, label }) {
  return (
    <div className="text-center">
      <p className="font-display font-extrabold text-xl text-white leading-none">
        {value ?? <span className="text-brand-400 text-base">—</span>}
      </p>
      <p className="font-mono text-[9px] text-brand-400 mt-0.5 uppercase tracking-wider">{label}</p>
    </div>
  )
}

// ─── Weather widget ────────────────────────────────────────────────────────────
function WeatherWidget({ lang, t }) {
  const w = t.weather
  const [city, setCity]           = useState(() => localStorage.getItem('weather_city') || '')
  const [cityInput, setCityInput] = useState('')
  const [editing, setEditing]     = useState(false)
  const [weather, setWeather]     = useState(null)
  const [geoName, setGeoName]     = useState('')
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (city) return
    listProdutores()
      .then(list => {
        const first = list.find(p => p.cidade)
        if (first) {
          const c = first.estado ? `${first.cidade} ${first.estado}` : first.cidade
          setCity(c); localStorage.setItem('weather_city', c)
        } else setEditing(true)
      })
      .catch(() => setEditing(true))
  }, [city])

  useEffect(() => { if (city) fetchWeather(city) }, [city])
  useEffect(() => { if (editing && inputRef.current) inputRef.current.focus() }, [editing])

  async function fetchWeather(cityStr) {
    setLoading(true); setError('')
    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityStr)}&count=1&language=${lang}&format=json`
      ).then(r => r.json())
      if (!geo.results?.length) throw new Error('notFound')
      const { latitude, longitude, name, admin1 } = geo.results[0]
      setGeoName(admin1 ? `${name}, ${admin1}` : name)
      const wx = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,weathercode,windspeed_10m,relative_humidity_2m,precipitation` +
        `&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum` +
        `&timezone=auto&forecast_days=7`
      ).then(r => r.json())
      setWeather(wx)
    } catch (err) {
      setError(err.message === 'notFound' ? w.notFound : w.error)
    } finally { setLoading(false) }
  }

  function handleSearch(e) {
    e.preventDefault()
    if (!cityInput.trim()) return
    const c = cityInput.trim()
    setCity(c); localStorage.setItem('weather_city', c); setEditing(false); setCityInput('')
  }

  return (
    <div className="bg-white border border-surface-border rounded-card shadow-card overflow-hidden">
      {/* Header */}
      <div className="bg-brand-900 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm">🌦</span>
          <span className="font-mono text-[10px] font-bold text-brand-400 uppercase tracking-wider">
            {w.title}
          </span>
        </div>
        {city && !editing && (
          <button
            onClick={() => { setCityInput(city); setEditing(true) }}
            className="font-mono text-[10px] text-brand-400 hover:text-white transition-colors flex items-center gap-1"
          >
            <span className="max-w-[150px] truncate">📍 {geoName || city}</span>
            <span className="opacity-50 ml-0.5">✏</span>
          </button>
        )}
      </div>

      <div className="p-4">
        {(editing || !city) && (
          <form onSubmit={handleSearch} className="flex gap-2 mb-3">
            <input
              ref={inputRef}
              value={cityInput}
              onChange={e => setCityInput(e.target.value)}
              placeholder={w.cityPh}
              className="flex-1 border border-surface-border rounded-sm px-3 py-2 font-mono text-xs bg-surface-input focus:outline-none focus:border-brand-700 transition-colors"
            />
            <button type="submit"
              className="px-4 py-2 bg-brand-900 text-white rounded-sm font-mono text-xs font-bold hover:bg-brand-700 transition-colors">
              {w.search}
            </button>
            {city && (
              <button type="button" onClick={() => setEditing(false)}
                className="px-3 py-2 border border-surface-border rounded-sm font-mono text-xs text-ink-400 hover:border-ink-400 transition-colors">✕</button>
            )}
          </form>
        )}

        {!city && !editing && <p className="font-mono text-xs text-ink-400 py-4 text-center">{w.noCity}</p>}
        {loading && <div className="flex justify-center py-6"><Spinner /></div>}
        {error && <p className="font-mono text-xs text-danger-600 py-2 text-center">{error}</p>}

        {weather && !loading && !editing && (
          <>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl leading-none">{wmoInfo(weather.current.weathercode, lang).emoji}</div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-3xl text-brand-900">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <div className="font-mono text-xs text-ink-400 mt-0.5">
                  {wmoInfo(weather.current.weathercode, lang).label}
                </div>
                <div className="flex gap-3 mt-1.5 flex-wrap">
                  <span className="font-mono text-[10px] text-ink-400">💧 {weather.current.relative_humidity_2m}%</span>
                  <span className="font-mono text-[10px] text-ink-400">💨 {Math.round(weather.current.windspeed_10m)} km/h</span>
                  <span className="font-mono text-[10px] text-ink-400">🌧 {weather.current.precipitation.toFixed(1)} mm</span>
                </div>
              </div>
            </div>

            <div className="border-t border-surface-border pt-3">
              <div className="font-mono text-[9px] text-ink-400 uppercase tracking-wider mb-2">{w.forecast}</div>
              <div className="grid grid-cols-7 gap-0.5">
                {weather.daily.time.map((dateStr, i) => {
                  const d = new Date(dateStr + 'T12:00:00')
                  const dayLabel = i === 0 ? w.today : w.days[d.getDay()]
                  const { emoji } = wmoInfo(weather.daily.weathercode[i], lang)
                  return (
                    <div key={dateStr}
                      className={`flex flex-col items-center gap-0.5 px-0.5 py-1.5 rounded-md ${i === 0 ? 'bg-brand-50 border border-brand-100' : ''}`}>
                      <span className="font-mono text-[9px] text-ink-400 leading-none">{dayLabel}</span>
                      <span className="text-base leading-none mt-0.5">{emoji}</span>
                      <span className="font-mono text-[9px] font-bold text-brand-900 leading-none mt-0.5">
                        {Math.round(weather.daily.temperature_2m_max[i])}°
                      </span>
                      <span className="font-mono text-[9px] text-ink-400 leading-none">
                        {Math.round(weather.daily.temperature_2m_min[i])}°
                      </span>
                      {weather.daily.precipitation_sum[i] > 0 && (
                        <span className="font-mono text-[8px] text-brand-400 leading-none">
                          {weather.daily.precipitation_sum[i].toFixed(0)}mm
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Dashboard principal ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const { profile } = useAuth()
  const { t, lang } = useLanguage()
  const [showOnboarding, setShowOnboarding] = useState(
    () => !localStorage.getItem('onboarding_done')
  )
  const [stats, setStats] = useState({ produtores: null, talhoes: null, laudos: null })

  useEffect(() => {
    Promise.allSettled([
      listProdutores(),
      listTalhoes(),
      listLaudos({ limit: 1 }),
    ]).then(([p, tl, ld]) => {
      setStats({
        produtores: p.status === 'fulfilled' ? p.value.length : null,
        talhoes:    tl.status === 'fulfilled' ? tl.value.length : null,
        laudos:     ld.status === 'fulfilled' ? ld.value.count : null,
      })
    })
  }, [])

  function closeOnboarding() {
    localStorage.setItem('onboarding_done', '1')
    setShowOnboarding(false)
  }

  const firstName = profile?.name?.split(' ')[0] || (lang === 'en' ? 'Welcome' : 'Bem-vindo')

  return (
    <AppLayout>
      {showOnboarding && <OnboardingModal onClose={closeOnboarding} />}

      <div className="space-y-4">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <div className="relative overflow-hidden rounded-card bg-brand-900">
          {/* Decoração de fundo */}
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-brand-700 rounded-full opacity-25 pointer-events-none" />
          <div className="absolute -bottom-16 -left-8 w-48 h-48 bg-brand-700 rounded-full opacity-15 pointer-events-none" />

          <div className="relative px-5 pt-5 pb-4">
            <p className="font-mono text-[9px] text-brand-400 uppercase tracking-widest">
              {getGreeting(lang)}
            </p>
            <h1 className="font-display font-extrabold text-[22px] text-white mt-1 leading-tight">
              {firstName}
            </h1>
            <p className="font-mono text-[10px] text-brand-400 mt-0.5 capitalize">
              {getFormattedDate(lang)}
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-4 pt-4 border-t border-white/10">
              <HeroStat value={stats.produtores} label={lang === 'en' ? 'Producers' : 'Produtores'} />
              <div className="w-px bg-white/10" />
              <HeroStat value={stats.talhoes}    label={lang === 'en' ? 'Fields' : 'Talhões'} />
              <div className="w-px bg-white/10" />
              <HeroStat value={stats.laudos}     label={lang === 'en' ? 'Reports' : 'Laudos'} />
            </div>
          </div>
        </div>

        {/* ── Ações rápidas ──────────────────────────────────────────────── */}
        <div>
          <p className="font-mono text-[9px] text-ink-400 uppercase tracking-wider mb-2 px-0.5">
            {lang === 'en' ? 'Quick access' : 'Acesso rápido'}
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <ActionCard
              to="/wizard"
              icon="🔬"
              label={lang === 'en' ? 'New Analysis' : 'Nova Análise'}
              desc={lang === 'en' ? 'Start physiological diagnosis' : 'Iniciar diagnóstico fisiológico'}
              accent
            />
            <ActionCard
              to="/produtores"
              icon="👤"
              label={lang === 'en' ? 'Producers' : 'Produtores'}
              desc={stats.produtores != null ? `${stats.produtores} cadastrado${stats.produtores !== 1 ? 's' : ''}` : undefined}
            />
            <ActionCard
              to="/talhoes"
              icon="🗺️"
              label={lang === 'en' ? 'Fields' : 'Talhões'}
              desc={stats.talhoes != null ? `${stats.talhoes} talhão${stats.talhoes !== 1 ? 's' : ''}` : undefined}
            />
            <ActionCard
              to="/laudos"
              icon="📋"
              label={lang === 'en' ? 'Reports' : 'Laudos'}
              desc={stats.laudos != null ? `${stats.laudos} laudo${stats.laudos !== 1 ? 's' : ''} gerado${stats.laudos !== 1 ? 's' : ''}` : undefined}
            />
          </div>
        </div>

        {/* ── Clima ──────────────────────────────────────────────────────── */}
        <WeatherWidget lang={lang} t={t} />

      </div>
    </AppLayout>
  )
}
