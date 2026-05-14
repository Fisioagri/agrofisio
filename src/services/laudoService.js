import { supabase } from './supabase'

export async function saveLaudo({ userId, data, diagnoseHtml, laudoHtml }) {
  const { error } = await supabase.from('laudos').insert({
    user_id:       userId,
    produtor_nome: data.prodNome,
    cultura:       data.cultura,
    estadio:       data.estadio,
    safra:         data.safra,
    diagnose_html: diagnoseHtml,
    laudo_html:    laudoHtml,
  })
  if (error) throw error
}

export async function listLaudos({ limit = 10, offset = 0 } = {}) {
  const { data, error, count } = await supabase
    .from('laudos')
    .select('id, produtor_nome, cultura, estadio, safra, created_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)
  if (error) throw error
  return { data, count }
}

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
