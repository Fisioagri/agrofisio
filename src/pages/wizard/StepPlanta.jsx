import { useWizard } from '../../hooks/useWizard'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import Textarea from '../../components/ui/Textarea'
import PhotoUpload from '../../components/PhotoUpload'
import PhenoSelector from '../../components/PhenoSelector'
import TagGroup from '../../components/TagGroup'
import BoolSelect from '../../components/BoolSelect'

const VISIVEL_TAGS = ['Planta inteira','Folha apical/nova','Folha mediana','Folha basal/velha','Vagem/grão','Sistema radicular','Flores','Caule/nódulos']
const STRESS_TAGS  = ['Hídrico','Térmico','Nutricional','Biótico','Oxidativo','Salino']
const OCORR_TAGS   = ['Granizo','Geada','Acamamento','Déficit hídrico','Encharcamento','Alta temperatura','Compactação','Nematoide']
const DOENCA_TAGS  = ['Ferrugem asiática','Mancha alvo','Antracnose','Oídio','Phytophthora','Esclerotinia','Mofo branco','Outra']

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

  const photoPreview = data.fotoB64 ? `data:image/jpeg;base64,${data.fotoB64}` : null

  function f(key) {
    return { value: data[key], onChange: e => update({ [key]: e.target.value }) }
  }

  return (
    <>
      <div className="mb-4">
        <h2 className="font-display font-bold text-xl text-brand-900">Planta e Campo</h2>
        <p className="font-mono text-[11px] text-ink-400 mt-0.5">foto obrigatória + condições atuais</p>
      </div>

      <Card title="📸 Foto da Planta *">
        <PhotoUpload
          preview={photoPreview}
          onFile={file => compressAndSave(file, b64 => update({ fotoB64: b64 }))}
        />
      </Card>

      <Card title="🌿 O que está visível na foto?">
        <TagGroup tags={VISIVEL_TAGS} selected={data.visivel} onChange={v => update({ visivel: v })} />
      </Card>

      <Card title="📊 Estádio Fenológico *">
        <PhenoSelector cultura={data.cultura} value={data.estadio} onChange={v => update({ estadio: v })} />
      </Card>

      <Card title="🌦️ Clima e Campo">
        <div className="grid grid-cols-2 gap-2.5">
          <Input label="Temperatura (°C)"  type="number" placeholder="Ex: 32" {...f('temp')} />
          <Input label="Última chuva (mm)" type="number" placeholder="Ex: 25" {...f('chuva')} />
        </div>
        <Input label="Dias sem chuva significativa" type="number" placeholder="Ex: 7" {...f('diasSemChuva')} />
      </Card>

      <Card title="⚠️ A planta está em estresse?">
        <BoolSelect value={data.stresse} onChange={v => update({ stresse: v })}>
          <div>
            <p className="text-xs font-bold text-ink-900 mb-1.5">Tipos de estresse:</p>
            <TagGroup tags={STRESS_TAGS} selected={data.tiposStresse} onChange={v => update({ tiposStresse: v })} />
          </div>
        </BoolSelect>
      </Card>

      <Card title="🌩️ Ocorrências a Campo">
        <TagGroup tags={OCORR_TAGS} selected={data.ocorrencias} onChange={v => update({ ocorrencias: v })} />
      </Card>

      <Card title="🔍 Sintomas Visuais Observados">
        <Textarea
          placeholder="Ex: clorose internerval em folhas basais, bordos necróticos, encurtamento de entrenós..."
          value={data.sintomas}
          onChange={e => update({ sintomas: e.target.value })}
        />
      </Card>

      <Card title="🔬 Possui moléstia por doença?">
        <BoolSelect value={data.molestia} onChange={v => update({ molestia: v })}>
          <TagGroup tags={DOENCA_TAGS} selected={data.doencas} onChange={v => update({ doencas: v })} />
        </BoolSelect>
      </Card>
    </>
  )
}
