import { supabase } from './supabase'

export async function listProdutores() {
  const { data, error } = await supabase
    .from('produtores')
    .select('*')
    .order('nome')
  if (error) throw error
  return data
}

export async function createProdutor(fields) {
  const { data: { user } } = await supabase.auth.getUser()
  const { data, error } = await supabase
    .from('produtores')
    .insert([{ ...fields, user_id: user.id }])
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateProdutor(id, fields) {
  const { data, error } = await supabase
    .from('produtores')
    .update(fields)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteProdutor(id) {
  const { error } = await supabase
    .from('produtores')
    .delete()
    .eq('id', id)
  if (error) throw error
}

export function validateCPF(cpf) {
  const c = cpf.replace(/\D/g, '')
  if (c.length !== 11 || /^(.)\1{10}$/.test(c)) return false
  let s = 0
  for (let i = 0; i < 9; i++) s += +c[i] * (10 - i)
  let r = s % 11; const d1 = r < 2 ? 0 : 11 - r
  if (+c[9] !== d1) return false
  s = 0
  for (let i = 0; i < 10; i++) s += +c[i] * (11 - i)
  r = s % 11; const d2 = r < 2 ? 0 : 11 - r
  return +c[10] === d2
}

export function formatCPF(v) {
  const c = v.replace(/\D/g, '').slice(0, 11)
  return c
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2')
}
