/**
 * apply_migrations.js — Aplica migrations pendentes no Supabase
 *
 * Como usar:
 *   1. Pegue o personal access token em:
 *      https://supabase.com/dashboard/account/tokens
 *   2. Rode: node apply_migrations.js <ACCESS_TOKEN>
 */

import fs from 'fs'
import path from 'path'
import https from 'https'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const SUPABASE_URL = 'https://cyxkitfzwvsynhhnogqy.supabase.co'
const SERVICE_KEY  = process.argv[2]

if (!SERVICE_KEY) {
  console.error('\n❌  Forneça o personal access token como argumento:')
  console.error('    node apply_migrations.js <ACCESS_TOKEN>\n')
  console.error('    Pegue em: https://supabase.com/dashboard/account/tokens')
  process.exit(1)
}

const MIGRATIONS = [
  '046_criar_tabela_laudos.sql',
]


function postSQL(sql) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ query: sql })
    const url  = new URL(`${SUPABASE_URL}/rest/v1/rpc/exec_sql_service`)

    // Use the Management API endpoint for running queries
    const managementUrl = `api.supabase.com`
    const projectRef    = 'cyxkitfzwvsynhhnogqy'

    const options = {
      hostname: managementUrl,
      path:     `/v1/projects/${projectRef}/database/query`,
      method:   'POST',
      headers:  {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'Content-Type':  'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }

    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode })
        } else {
          resolve({ ok: false, status: res.statusCode, body: data })
        }
      })
    })
    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

async function main() {
  console.log('\n🌱 AgroFísio — Aplicador de Migrations')
  console.log('═'.repeat(50))

  // Aplicar cada migration
  const migrDir = path.join(__dirname, 'migrations')
  for (const file of MIGRATIONS) {
    const filePath = path.join(migrDir, file)
    if (!fs.existsSync(filePath)) {
      console.log(`\n⚠️  Arquivo não encontrado: ${file}`)
      continue
    }

    const sql = fs.readFileSync(filePath, 'utf8')
    console.log(`\n📄 Aplicando ${file}...`)

    const result = await postSQL(sql)
    if (result.ok) {
      console.log(`   ✅ OK (HTTP ${result.status})`)
    } else {
      console.log(`   ❌ Erro HTTP ${result.status}`)
      console.log(`      ${result.body?.substring(0, 300)}`)
    }
  }

  console.log('\n═'.repeat(50))
  console.log('✅ Concluído! Verifique o Supabase Table Editor.')
  console.log('   https://supabase.com/dashboard/project/cyxkitfzwvsynhhnogqy/editor\n')
}

main().catch(console.error)
