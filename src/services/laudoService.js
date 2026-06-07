import { supabase } from './supabase'
import { REF_FOLIAR, REF_SOLO } from '../data/referencias'

// ─── Calcula deficiências predominantes a partir dos dados do wizard ──────────
function calcDeficiencias(data) {
  const cult = (data.cultura || 'soja').toLowerCase().replace('ã', 'a')
  const refFol = REF_FOLIAR[cult] || REF_FOLIAR.soja
  const refSol = REF_SOLO[cult]   || REF_SOLO.soja
  const defs = new Set()

  const foliarMap = {
    nFoliar: 'N', pFoliar: 'P', kFoliar: 'K', caFoliar: 'Ca',
    mgFoliar: 'Mg', sFoliar: 'S', bFoliar: 'B', znFoliar: 'Zn',
    cuFoliar: 'Cu', mnFoliar: 'Mn', feFoliar: 'Fe', moFoliar: 'Mo',
  }
  for (const [field, nut] of Object.entries(foliarMap)) {
    const v = parseFloat(data[field])
    const r = refFol[nut]
    if (!isNaN(v) && r && v < r.min) defs.add(nut)
  }

  const soloMap = {
    ph: 'pH', pSolo: 'P', caSolo: 'Ca', mgSolo: 'Mg',
    sSolo: 'S', bSolo: 'B', znSolo: 'Zn', cuSolo: 'Cu', mnSolo: 'Mn',
  }
  const ctc = parseFloat(data.ctcSolo) || 0
  const ctcDef = { caSolo: 45, mgSolo: 15, kSolo: 3 }

  for (const [field, nut] of Object.entries(soloMap)) {
    const v = parseFloat(data[field])
    const r = refSol[nut]
    if (isNaN(v) || !r) continue
    if (ctc > 0 && ctcDef[field] !== undefined) {
      if (v / ctc * 100 < ctcDef[field]) defs.add(nut)
    } else if (v < r.min) {
      defs.add(nut)
    }
  }
  if (ctc > 0 && parseFloat(data.kSolo) / ctc * 100 < 3) defs.add('K')

  return [...defs].slice(0, 5)
}

// ─── Extrai snapshot da análise de solo ───────────────────────────────────────
function soloSnapshot(data) {
  const fields = ['ph','mo','pSolo','kSolo','caSolo','mgSolo','sSolo',
                  'alSolo','hAlSolo','ctcSolo','vSolo','satAlSolo','argilaSolo',
                  'bSolo','znSolo','cuSolo','mnSolo','feSolo']
  const snap = {}
  for (const f of fields) {
    const v = parseFloat(data[f])
    if (!isNaN(v) && v !== null && v !== undefined) snap[f] = v
  }
  return Object.keys(snap).length ? snap : null
}

// ─── Extrai snapshot da análise foliar ────────────────────────────────────────
function foliarSnapshot(data) {
  const fields = ['nFoliar','pFoliar','kFoliar','caFoliar','mgFoliar','sFoliar',
                  'bFoliar','znFoliar','cuFoliar','mnFoliar','feFoliar','moFoliar']
  const snap = {}
  for (const f of fields) {
    const v = parseFloat(data[f])
    if (!isNaN(v) && v !== null && v !== undefined) snap[f] = v
  }
  return Object.keys(snap).length ? snap : null
}

// ─── Salvar laudo ─────────────────────────────────────────────────────────────
export async function saveLaudo({ userId, data, diagnoseHtml, laudoHtml }) {
  const { error } = await supabase.from('laudos').insert({
    user_id:         userId,
    produtor_nome:   data.prodNome,
    cultura:         data.cultura,
    estadio:         data.estadio,
    safra:           data.safra,
    diagnose_html:   diagnoseHtml,
    laudo_html:      laudoHtml,
    // Campos estruturados
    talhao:          data.prodTalhao   || null,
    data_plantio:    data.dataPlantio  || null,
    hibrido:         data.hibrido      || null,
    adubacao:        data.adubacao     || null,
    analise_solo:    soloSnapshot(data),
    analise_foliar:  foliarSnapshot(data),
    deficiencias:    calcDeficiencias(data),
    objetivos:       (data.manipOptions || []).length ? data.manipOptions : null,
  })
  if (error) throw error
}

// ─── Listar laudos ────────────────────────────────────────────────────────────
export async function listLaudos({ limit = 10, offset = 0 } = {}) {
  const { data, error, count } = await supabase
    .from('laudos')
    .select(
      'id, produtor_nome, cultura, estadio, safra, created_at, talhao, ' +
      'data_plantio, hibrido, adubacao, analise_solo, analise_foliar, deficiencias, objetivos',
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return { data, count }
}

// ─── Buscar laudo individual ──────────────────────────────────────────────────
export async function getLaudo(id) {
  const { data, error } = await supabase
    .from('laudos')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function deleteLaudo(id) {
  const { error } = await supabase.from('laudos').delete().eq('id', id)
  if (error) throw error
}
