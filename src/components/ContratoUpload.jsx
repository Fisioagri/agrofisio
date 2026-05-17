import { useState } from 'react'
import { callClaude } from '../services/api'
import { compressPhoto } from '../utils/compressPhoto'
import Spinner from './ui/Spinner'
import { useLanguage } from '../contexts/LanguageContext'

const MAX_PDF_BYTES = 10 * 1024 * 1024

// Prompt asks for multi-product array + contract metadata
const PROMPT = `Analise este documento (contrato, lista de compra, nota fiscal ou comprovante de insumos agrícolas).
O documento pode conter UMA TABELA com MÚLTIPLOS PRODUTOS, um produto por linha.
Extraia TODOS os produtos encontrados e as informações gerais do contrato.
Retorne SOMENTE um objeto JSON válido, sem markdown, sem explicações.

REGRA CRÍTICA para quantidades: neste tipo de documento o PONTO é separador DECIMAL com 3 casas fixas.
Exemplos: "20.000" = 20 (vinte), "5.000" = 5 (cinco), "150.000" = 150, "1.500" = 1.5, "2.500" = 2.5.
VERIFIQUE SEMPRE: quantidade × preço unitário deve bater com "Total do Item". Use isso para confirmar.
Para preços/totais com ponto E vírgula (ex: "10.400,05"): ponto=milhar, vírgula=decimal → 10400.05.
Para preços só com vírgula (ex: "520,00") → 520.

Datas no formato YYYY-MM-DD.
Campo "Vencimento" no cabeçalho = data de vencimento do contrato/pagamento → campo "vencimento".
"Retirada a partir de" = data_inicio. "Com data limite de" ou "Data Fim" = data_fim.
Unidades de medida: use L, mL, kg, g, t, sc, un, m³ ou cx — escolha a mais adequada para cada produto.

Estrutura esperada (use EXATAMENTE estas chaves, null se não encontrado):
{
  "empresa": null,
  "vencimento": null,
  "data_inicio": null,
  "data_fim": null,
  "notas": null,
  "produtos": [
    {
      "nome_produto": null,
      "volume": null,
      "unidade": null,
      "preco_unit": null,
      "valor_total": null
    }
  ]
}`

function extractJSON(text) {
  const start = text.indexOf('{')
  const end   = text.lastIndexOf('}')
  if (start === -1 || end === -1) throw new Error('Não foi possível extrair dados do documento')
  return JSON.parse(text.slice(start, end + 1))
}

function PickButton({ icon, label, sub, accept, capture, onFile }) {
  return (
    <label className="flex-1 border-2 border-dashed border-surface-border rounded-card py-4 px-2
      text-center cursor-pointer hover:border-brand-700 hover:bg-brand-50 transition-colors">
      <input type="file" accept={accept} capture={capture} className="hidden"
        onChange={e => onFile(e.target.files?.[0])} />
      <div className="text-2xl mb-1">{icon}</div>
      <div className="font-display font-bold text-[11px] text-brand-900">{label}</div>
      {sub && <div className="font-mono text-[9px] text-ink-400 mt-0.5">{sub}</div>}
    </label>
  )
}

export default function ContratoUpload({ onFill, onChange, value }) {
  const { lang } = useLanguage()
  const [status, setStatus]   = useState(null)
  const [preview, setPreview] = useState(null)
  const [summary, setSummary] = useState(null) // { nProdutos, empresa }
  const [errMsg, setErrMsg]   = useState('')

  async function processImage(file) {
    setStatus('reading'); setErrMsg(''); onChange?.(file)
    try {
      const b64 = await compressPhoto(file, 1800, 0.85)
      setPreview({ url: 'data:image/jpeg;base64,' + b64, isImage: true, name: file.name })
      const raw = extractJSON(await callClaude(PROMPT, b64, 1200))
      applyFill(raw)
    } catch (e) {
      setStatus('error')
      setErrMsg(e.message || 'Erro ao ler documento.')
    }
  }

  async function processPDF(file) {
    if (!file) return
    if (file.size > MAX_PDF_BYTES) { setStatus('error'); setErrMsg('PDF excede 10 MB.'); return }
    setStatus('reading'); setErrMsg('')
    setPreview({ isImage: false, name: file.name })
    onChange?.(file)
    try {
      const pdfB64 = await new Promise((res, rej) => {
        const r = new FileReader()
        r.onload  = e => res(e.target.result.split(',')[1])
        r.onerror = () => rej(new Error('Erro ao ler PDF'))
        r.readAsDataURL(file)
      })
      const raw = extractJSON(await callClaude(PROMPT, null, 1200, pdfB64))
      applyFill(raw)
    } catch (e) {
      setStatus('error')
      setErrMsg(e.message || 'Erro ao ler PDF.')
    }
  }

  function applyFill(raw) {
    // Normalize produtos array
    const produtos = (raw.produtos || [])
      .filter(p => p.nome_produto)
      .map(p => ({
        nome_produto: String(p.nome_produto || ''),
        volume:       p.volume      != null ? String(p.volume)      : '',
        unidade:      p.unidade     || 'kg',
        preco_unit:   p.preco_unit  != null ? String(p.preco_unit)  : '',
        valor_total:  p.valor_total != null ? String(p.valor_total) : '',
      }))

    const meta = {
      empresa:     raw.empresa     || '',
      vencimento:  raw.vencimento  || '',
      data_inicio: raw.data_inicio || '',
      data_fim:    raw.data_fim    || '',
      notas:       raw.notas       || '',
    }

    onFill({ ...meta, produtos })
    setSummary({ nProdutos: produtos.length, empresa: meta.empresa })
    setStatus('done')
  }

  function reset() {
    setStatus(null); setPreview(null); setSummary(null); setErrMsg('')
    onChange?.(null)
  }

  // Edit mode — existing URL
  if (value && status === null) {
    const isImg = /\.(jpe?g|png|webp|heic|gif)(\?|$)/i.test(value)
    return (
      <div className="space-y-2">
        {isImg
          ? <a href={value} target="_blank" rel="noopener noreferrer">
              <img src={value} alt="" className="w-full max-h-36 object-cover rounded-sm border border-surface-border" />
            </a>
          : <a href={value} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 border border-surface-border rounded-sm bg-surface-bg hover:bg-brand-50 transition-colors">
              <span className="text-xl">📄</span>
              <span className="font-mono text-[10px] text-brand-900">Ver documento ↗</span>
            </a>
        }
        <button type="button" onClick={reset}
          className="w-full py-2 border border-surface-border rounded-sm font-mono text-[10px] text-ink-600 hover:border-ink-400 transition-colors">
          🔄 Trocar documento
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {status === null && (
        <div className="flex gap-2">
          <PickButton icon="📷" label={lang === 'en' ? 'Camera' : 'Câmera'} sub="foto"
            accept="image/*" capture="environment" onFile={f => f && processImage(f)} />
          <PickButton icon="🖼️" label={lang === 'en' ? 'Gallery' : 'Galeria'} sub="imagem"
            accept="image/*" onFile={f => f && processImage(f)} />
          <PickButton icon="📄" label="PDF" sub="contrato/NF"
            accept="application/pdf" onFile={f => f && processPDF(f)} />
        </div>
      )}

      {preview?.isImage && preview.url && (
        <img src={preview.url} alt="" className="w-full max-h-40 object-cover rounded-sm border border-surface-border" />
      )}
      {preview && !preview.isImage && (
        <div className="flex items-center gap-2 p-3 bg-surface-bg border border-surface-border rounded-sm">
          <span className="text-xl">📄</span>
          <span className="font-mono text-[10px] text-ink-600 truncate flex-1">{preview.name}</span>
        </div>
      )}

      {status === 'reading' && (
        <div className="flex items-center gap-3 p-3 bg-brand-50 border border-brand-400 rounded-sm">
          <Spinner size="sm" />
          <div>
            <p className="font-mono text-xs font-bold text-brand-900">🤖 Lendo documento com IA…</p>
            <p className="font-mono text-[10px] text-ink-500">Identificando todos os produtos e quantidades</p>
          </div>
        </div>
      )}

      {status === 'done' && summary && (
        <div className="p-3 bg-green-50 border border-green-400 rounded-sm space-y-1">
          <p className="font-mono text-xs font-bold text-green-800">
            ✅ {summary.nProdutos} produto{summary.nProdutos !== 1 ? 's' : ''} identificado{summary.nProdutos !== 1 ? 's' : ''}
            {summary.empresa ? ` — ${summary.empresa}` : ''}
          </p>
          <p className="font-mono text-[10px] text-green-700">Revise e edite os dados abaixo antes de salvar.</p>
          <button type="button" onClick={reset} className="font-mono text-[10px] text-green-700 underline">
            Usar outro documento
          </button>
        </div>
      )}

      {status === 'error' && (
        <div className="p-3 bg-danger-50 border border-danger-600 rounded-sm space-y-1">
          <p className="font-mono text-xs font-bold text-danger-600">⚠️ {errMsg}</p>
          <p className="font-mono text-[10px] text-ink-500">Preencha manualmente ou tente outro arquivo.</p>
          <button type="button" onClick={reset} className="font-mono text-[10px] text-danger-600 underline">
            Tentar novamente
          </button>
        </div>
      )}
    </div>
  )
}
