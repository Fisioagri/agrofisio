import { supabase } from './supabase'

/**
 * Fetches active knowledge entries relevant to the current crop.
 * Returns a compact string to embed in AI prompts.
 */
export async function fetchKnowledgeContext(cultura, lang = 'pt') {
  try {
    const { data, error } = await supabase
      .from('conhecimento')
      .select('titulo, conteudo, fonte, tags')
      .eq('ativo', true)
      .or(`cultura.eq.${cultura},cultura.eq.all`)
      .order('tipo', { ascending: true })
      .limit(6)

    if (error || !data?.length) return ''

    const header = lang === 'en'
      ? 'SCIENTIFIC KNOWLEDGE BASE (use to enrich diagnosis):'
      : 'BASE DE CONHECIMENTO CIENTÍFICO (use para enriquecer a diagnose):'

    const entries = data.map(e =>
      `[${e.titulo}]\n${e.conteudo}\n${e.fonte ? `Fonte: ${e.fonte}` : ''}`
    ).join('\n\n')

    return `\n${header}\n${entries}\n`
  } catch {
    return ''
  }
}

// ─── Admin CRUD ───────────────────────────────────────────────────────────────

export async function listConhecimento() {
  const { data, error } = await supabase
    .from('conhecimento')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createConhecimento(entry) {
  const { data, error } = await supabase
    .from('conhecimento')
    .insert([entry])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateConhecimento(id, fields) {
  const { data, error } = await supabase
    .from('conhecimento')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteConhecimento(id) {
  const { error } = await supabase
    .from('conhecimento')
    .delete()
    .eq('id', id)
  if (error) throw error
}
