import { useWizard } from '../../hooks/useWizard'
import { useLanguage } from '../../contexts/LanguageContext'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import PhotoUpload from '../../components/PhotoUpload'
import PhenoSelector from '../../components/PhenoSelector'
import TagGroup from '../../components/TagGroup'
import BoolSelect from '../../components/BoolSelect'

function compressAndSave(file, onDone) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = ev => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height, max = 700
      if (w > h) { h = Math.round(h * max / w); w = max }
      else       { w = Math.round(w * max / h); h = max }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      let q = 0.6
      let b64 = canvas.toDataURL('image/jpeg', q).split(',')[1]
      while (b64.length * 0.75 > 3_000_000 && q > 0.1) {
        q -= 0.1
        b64 = canvas.toDataURL('image/jpeg', q).split(',')[1]
      }
      onDone(b64)
    }
    img.src = ev.target.result
  }
  reader.readAsDataURL(file)
}

export default function StepPlanta() {
  const { data, update } = useWizard()
  const { t } = useLanguage()
  const p = t.planta

  const photoPreview = data.fotoB64 ? `data:image/jpeg;base64,${data.fotoB64}` : null
  const temOutros    = data.ocorrencias.includes(t.tags.ocorr[8]) || data.ocorrencias.includes('Outros') || data.ocorrencias.includes('Others')

  function f(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">{p.title}</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">{p.subtitle}</p>
      </div>

      <Card title={p.cardPhoto}>
        <PhotoUpload
          preview={photoPreview}
          onFile={file => compressAndSave(file, b64 => update({ fotoB64: b64 }))}
        />
      </Card>

      <Card title={p.cardVisible}>
        <TagGroup
          tags={t.tags.visivel}
          selected={data.visivel}
          onChange={v => update({ visivel: v })}
        />
      </Card>

      <Card title={p.cardPheno}>
        <PhenoSelector
          cultura={data.cultura}
          value={data.estadio}
          onChange={v => update({ estadio: v })}
        />
      </Card>

      <Card title={p.cardClimate}>
        <div className="grid grid-cols-2 gap-2.5">
          <Input label={p.temp}  type="number" placeholder={p.tempPh} {...f('temp')} />
          <Input label={p.rain} type="number" placeholder={p.rainPh} {...f('chuva')} />
        </div>
        <Input label={p.dryDays} type="number" placeholder={p.dryPh} {...f('diasSemChuva')} />
      </Card>

      <Card title={p.cardStress}>
        <BoolSelect value={data.stresse} onChange={v => update({ stresse: v })}>
          <div>
            <p className="text-xs font-bold text-ink-900 mb-1.5">{p.stressTypes}</p>
            <TagGroup
              tags={t.tags.stress}
              selected={data.tiposStresse}
              onChange={v => update({ tiposStresse: v })}
            />
          </div>
        </BoolSelect>
      </Card>

      <Card title={p.cardOcorr}>
        <TagGroup
          tags={t.tags.ocorr}
          selected={data.ocorrencias}
          onChange={v => update({ ocorrencias: v })}
        />
        {temOutros && (
          <div className="mt-3">
            <Textarea
              placeholder={p.outrosPh}
              value={data.outrasOcorrencias}
              onChange={e => update({ outrasOcorrencias: e.target.value })}
            />
          </div>
        )}
      </Card>

      <Card title={p.cardSymptoms}>
        <Textarea
          placeholder={p.symptomsPh}
          value={data.sintomas}
          onChange={e => update({ sintomas: e.target.value })}
        />
      </Card>

      <Card title={p.cardDisease}>
        <BoolSelect value={data.molestia} onChange={v => update({ molestia: v })}>
          <TagGroup
            tags={t.tags.doenca}
            selected={data.doencas}
            onChange={v => update({ doencas: v })}
          />
        </BoolSelect>
      </Card>
    </>
  )
}
