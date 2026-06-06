import { useEffect, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { listProdutores } from '../../services/produtoresService'
import { listTalhoes } from '../../services/talhoesService'
import { loadSafraCache } from '../../utils/safraCache'

const MAX_SC = 200

const selCls = 'w-full px-3 py-2.5 border-[1.5px] border-surface-border rounded-sm text-sm font-sans text-ink-900 bg-surface-input focus:border-brand-700 focus:bg-white outline-none transition-colors'
const lblCls = 'block text-xs font-bold text-ink-900 mb-1'

function ProdInput({ label, required, placeholder, value, onChange }) {
  const num = value !== '' && value !== undefined ? parseFloat(value) : null
  const hasError = num !== null && !isNaN(num) && (num < 0 || num > MAX_SC)
  return (
    <div>
      <Input
        label={label}
        required={required}
        type="number"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={0}
        max={MAX_SC}
        className={hasError ? 'border-danger-400 bg-red-50' : ''}
      />
      {hasError && (
        <p className="font-mono text-[10px] text-danger-500 mt-0.5">
          Valor fora do intervalo (0–{MAX_SC} sc/ha)
        </p>
      )}
    </div>
  )
}

export default function StepProdutor() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const p = t.produtor

  const [produtores, setProdutores] = useState([])
  const [talhoes, setTalhoes]       = useState([])

  useEffect(() => {
    listProdutores().then(setProdutores).catch(() => {})
  }, [])

  // Restaura talhões ao navegar de volta (se produtorId já estava salvo)
  useEffect(() => {
    if (data.produtorId && produtores.length > 0) {
      listTalhoes(data.produtorId).then(setTalhoes).catch(() => setTalhoes([]))
    }
  }, [produtores, data.produtorId])

  function field(key) {
    return { value: data[key] ?? '', onChange: e => update({ [key]: e.target.value }) }
  }

  function applyTalhaoAutoFill(prodNome, talhaoNome) {
    const cached = loadSafraCache(prodNome, talhaoNome)
    if (cached) {
      update({
        prodTalhao:   talhaoNome,
        safra:        cached.safra,
        cultura:      cached.cultura,
        hibrido:      cached.hibrido,
        adubacao:     cached.adubacao,
        _autoFilled:  true,
      })
    } else {
      update({ prodTalhao: talhaoNome, _autoFilled: false })
    }
  }

  function handleSelectProdutor(e) {
    const id = e.target.value
    if (!id) {
      update({ produtorId: '', prodNome: '', prodCidade: '', prodTalhao: '', _autoFilled: false })
      setTalhoes([])
      return
    }
    const prod = produtores.find(pr => pr.id === id)
    if (prod) {
      update({ produtorId: id, prodNome: prod.nome, prodCidade: prod.cidade, prodTalhao: '', _autoFilled: false })
      listTalhoes(id).then(setTalhoes).catch(() => setTalhoes([]))
    }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{p.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{p.subtitle}</p>
      </div>

      <Card title={p.cardId}>
        {/* Select de produtor cadastrado */}
        {produtores.length > 0 && (
          <div className="mb-3">
            <label className={lblCls}>
              Produtor cadastrado <span className="font-normal text-ink-400">(opcional)</span>
            </label>
            <select className={selCls} value={data.produtorId || ''} onChange={handleSelectProdutor}>
              <option value="">— Selecionar ou preencher manualmente —</option>
              {produtores.map(pr => (
                <option key={pr.id} value={pr.id}>{pr.nome} · {pr.cidade}</option>
              ))}
            </select>
          </div>
        )}

        <Input label={p.name} required placeholder={p.namePh} {...field('prodNome')} />

        <div className="grid grid-cols-2 gap-2.5">
          <Input label={p.city} required placeholder={p.cityPh} {...field('prodCidade')} />

          {/* Talhão: select se houver cadastros, input texto se não */}
          <div className="mb-3">
            <label className={lblCls}>{p.plot}</label>
            {talhoes.length > 0 ? (
              <select
                className={selCls}
                value={data.prodTalhao || ''}
                onChange={e => applyTalhaoAutoFill(data.prodNome, e.target.value)}
              >
                <option value="">— Selecionar talhão —</option>
                {talhoes.map(tl => (
                  <option key={tl.id} value={tl.nome}>
                    {tl.nome}{tl.area_ha ? ` (${tl.area_ha} ha)` : ''}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className={selCls}
                placeholder={p.plotPh}
                value={data.prodTalhao ?? ''}
                onChange={e => update({ prodTalhao: e.target.value, _autoFilled: false })}
                onBlur={e => {
                  const val = e.target.value.trim()
                  if (val && data.prodNome) applyTalhaoAutoFill(data.prodNome, val)
                }}
              />
            )}
          </div>
        </div>
      </Card>

      <Card title={p.cardProd}>
        <div className="grid grid-cols-2 gap-2.5">
          <ProdInput label={p.lastProd} placeholder={p.lastPh} {...field('prodUltima')} />
          <ProdInput label={p.expectation} required placeholder={p.expectPh} {...field('prodExpect')} />
        </div>
      </Card>
    </>
  )
}
