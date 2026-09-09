/**
 * One-time Shopify → Supabase merch import
 *
 * Usage:
 *   npx tsx --env-file=.env.local scripts/import-merch.ts <path-to-json>
 *
 * Safe to re-run: upserts on slug, so existing rows are updated, not duplicated.
 *
 * If inserts fail with RLS/permission errors, replace SUPABASE_ANON_KEY below
 * with your service_role key from:
 *   Supabase dashboard → Project Settings → API → service_role secret
 * (never commit the service_role key to git)
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
// Uses service_role key (bypasses RLS) if set; falls back to anon key
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY')
  console.error('Run with: npx tsx --env-file=.env.local scripts/import-merch.ts <file>')
  process.exit(1)
}

const jsonPath = process.argv[2]
if (!jsonPath) {
  console.error('Usage: npx tsx --env-file=.env.local scripts/import-merch.ts <path-to-json>')
  process.exit(1)
}

type MerchRow = {
  name: string
  slug: string
  description?: string | null
  price?: number | null
  shopify_url?: string | null
  images?: string[] | null
  sizes?: string[] | null
  colors?: string[] | null
  category?: string | null
  tags?: string[] | null
  stock_status?: string | null
  is_published?: boolean
  seo_title?: string | null
  seo_description?: string | null
  sort_order?: number | null
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!)

  const keyType = process.env.SUPABASE_SERVICE_ROLE_KEY ? 'service_role' : 'anon'
  console.log(`\nSupabase URL: ${SUPABASE_URL}`)
  console.log(`Key type:     ${keyType}`)
  console.log('─'.repeat(60))

  const raw = readFileSync(resolve(jsonPath), 'utf-8')
  const parsed = JSON.parse(raw)

  // Support both a flat array and the { merch: [...] } wrapper format
  const items: MerchRow[] = Array.isArray(parsed) ? parsed : parsed.merch

  if (!Array.isArray(items) || items.length === 0) {
    console.error('JSON file must be a non-empty array, or an object with a "merch" array.')
    process.exit(1)
  }

  console.log(`Found ${items.length} item(s) in ${jsonPath}\n`)

  let inserted = 0
  let updated = 0
  let failed = 0

  for (const item of items) {
    if (!item.slug || !item.name) {
      console.warn(`  SKIP — missing required field (name/slug):`, item)
      failed++
      continue
    }

    // Check if slug already exists so we can log insert vs update
    const { data: existing } = await supabase
      .from('merch')
      .select('id')
      .eq('slug', item.slug)
      .maybeSingle()

    const isUpdate = !!existing

    const { error } = await supabase
      .from('merch')
      .upsert(item, { onConflict: 'slug' })

    if (error) {
      console.error(`  FAIL  [${item.slug}] — ${error.message}`)
      failed++
    } else if (isUpdate) {
      console.log(`  UPDATE [${item.slug}] "${item.name}"`)
      updated++
    } else {
      console.log(`  INSERT [${item.slug}] "${item.name}"`)
      inserted++
    }
  }

  console.log('\n' + '─'.repeat(60))
  console.log(`Done. ${inserted} inserted, ${updated} updated, ${failed} failed.`)
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
