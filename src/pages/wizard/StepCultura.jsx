import { useEffect, useState } from 'react'
import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import CropSelector from '../../components/CropSelector'
import { saveSafraCache } from '../../utils/safraCache'

export default function StepCultura() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const c = t.cultura
  const [autoFilled, setAutoFilled] = useState(!!data._autoFilled)

  // Salvar no localStorage sempre que safra+cultivar estiverem preenchidos
  useEffect(() => {
    if (data.safra && data.prodNome && data.prodTalhao) {
      saveSafraCache({
        prodNome:  data.prodNome,
        prodTalhao: data.prodTalhao,
        safra:     data.safra,
        cultura:   data.cultura,
        hibrido:   data.hibrido,
        adubacao:  data.adubacao,
      })
    }
  }, [data.safra, data.hibrido, data.adubacao, data.cultura, data.prodNome, data.prodTalhao])

  // Limpar indicador de auto-fill quando o usuário editar qualquer campo
  function fieldWithClear(key) {
    return {
      value: data[key] ?? '',
      onChange: e => {
        setAutoFilled(false)
        update({ [key]: e.target.value, _autoFilled: false })
      },
    }
  }

  function handleCropChange(v) {
    if (v === data.cultura) return  // mesma cultura — não resetar campos
    setAutoFilled(false)
    update({
      cultura: v, estadio: '',
      ph: '', mo: '', pSolo: '', kSolo: '', caSolo: '', mgSolo: '',
      sSolo: '', alSolo: '', hAlSolo: '', ctcSolo: '', vSolo: '', satAlSolo: '',
      argilaSolo: '', bSolo: '', znSolo: '', cuSolo: '', mnSolo: '', feSolo: '', moSolo: '',
      nFoliar: '', pFoliar: '', kFoliar: '', caFoliar: '', mgFoliar: '', sFoliar: '',
      bFoliar: '', znFoliar: '', cuFoliar: '', mnFoliar: '', feFoliar: '', moFoliar: '',
      fotoB64: '', temp: '', chuva: '', diasSemChuva: '',
      stresse: null, tiposStresse: [], ocorrencias: [], outrasOcorrencias: '',
      sintomas: '', molestia: null, doencas: [], visivel: [], objetivos: [],
      _autoFilled: false,
    })
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{c.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{c.subtitle}</p>
      </div>

      {autoFilled && (
        <div className="mb-3 bg-brand-50 border border-brand-200 rounded-card px-4 py-2.5 flex items-center gap-2">
          <span className="text-brand-700 text-sm">✦</span>
          <p className="font-mono text-[11px] text-brand-800">
            Safra, cultivar e adubação preenchidos automaticamente — mesmo talhão, mesma safra.
          </p>
          <button
            onClick={() => {
              setAutoFilled(false)
              update({ safra: '', hibrido: '', adubacao: '', _autoFilled: false })
            }}
            className="ml-auto font-mono text-[10px] text-brand-600 underline"
          >
            Limpar
          </button>
        </div>
      )}

      <Card title={c.cardCrop}>
        <CropSelector
          value={data.cultura}
          onChange={handleCropChange}
        />
      </Card>

      <Card title={c.cardPlanting}>
        <div className="grid grid-cols-2 gap-2.5">
          <Input label={c.plantingDate} required type="date" {...fieldWithClear('dataPlantio')} />
          <Input label={c.season} required placeholder={c.seasonPh} {...fieldWithClear('safra')} />
        </div>
        <Input label={c.variety} required placeholder={c.varietyPh} {...fieldWithClear('hibrido')} />
        <Textarea
          label={c.fertilization}
          required
          placeholder={c.fertPh}
          {...fieldWithClear('adubacao')}
        />
      </Card>
    </>
  )
}
