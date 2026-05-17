import { supabase } from './supabase'

// ── Insumos ────────────────────────────────────────────────────────────────

export async function listInsumos() {
  const { data, error } = await supabase
    .from('insumos')
    .select('*')
    .order('nome')
  if (error) throw error
  return data
}

export async function createInsumo(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('insumos')
    .insert([{ ...fields, user_id: user.id }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateInsumo(id, fields) {
  const { data, error } = await supabase
    .from('insumos')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteInsumo(id) {
  const { error } = await supabase
    .from('insumos')
    .delete()
    .eq('id', id)
  if (error) throw error
}

// ── Movimentações ──────────────────────────────────────────────────────────

export async function listMovimentacoes(limit = 100) {
  const { data, error } = await supabase
    .from('movimentacoes')
    .select('*, insumos(nome, unidade)')
    .order('data_mov', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data
}

export async function uploadEstoqueDoc(file, folder) {
  const { data: { user } } = await supabase.auth.getUser()
  const ext = file.name.split('.').pop() || 'bin'
  const path = `${user.id}/${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage
    .from('estoque-docs')
    .upload(path, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data: { publicUrl } } = supabase.storage
    .from('estoque-docs')
    .getPublicUrl(path)
  return publicUrl
}

export async function createMovimentacao(fields) {
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch current stock
  const { data: insumo, error: fetchErr } = await supabase
    .from('insumos')
    .select('quantidade')
    .eq('id', fields.insumo_id)
    .single()
  if (fetchErr) throw fetchErr

  const delta = fields.tipo === 'entrada'
    ? Number(fields.quantidade)
    : -Number(fields.quantidade)
  const novaQtd = Math.max(0, (insumo.quantidade ?? 0) + delta)

  // Insert movement
  const { data: mov, error: movErr } = await supabase
    .from('movimentacoes')
    .insert([{ ...fields, quantidade: Number(fields.quantidade), user_id: user.id }])
    .select()
    .single()
  if (movErr) throw movErr

  // Update insumo stock
  await supabase
    .from('insumos')
    .update({ quantidade: novaQtd })
    .eq('id', fields.insumo_id)

  return { mov, novaQtd }
}

// ── Contratos ──────────────────────────────────────────────────────────────

export async function listContratos() {
  const { data, error } = await supabase
    .from('contratos')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createContrato(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('contratos')
    .insert([{ ...fields, user_id: user.id }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateContrato(id, fields) {
  const { data, error } = await supabase
    .from('contratos')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteContrato(id) {
  const { error } = await supabase
    .from('contratos')
    .delete()
    .eq('id', id)
  if (error) throw error
}
