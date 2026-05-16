import { supabase } from './supabase'

export async function listTalhoes(produtorId = null) {
  let q = supabase
    .from('talhoes')
    .select('*, produtores(nome)')
    .order('nome')
  if (produtorId) q = q.eq('produtor_id', produtorId)
  const { data, error } = await q
  if (error) throw error
  return data
}

export async function createTalhao(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('talhoes')
    .insert([{ ...fields, user_id: user.id }])
    .select('*, produtores(nome)')
    .single()
  if (error) throw error
  return data
}

export async function updateTalhao(id, fields) {
  const { data, error } = await supabase
    .from('talhoes')
    .update(fields)
    .eq('id', id)
    .select('*, produtores(nome)')
    .single()
  if (error) throw error
  return data
}

export async function deleteTalhao(id) {
  const { error } = await supabase
    .from('talhoes')
    .delete()
    .eq('id', id)
  if (error) throw error
}
