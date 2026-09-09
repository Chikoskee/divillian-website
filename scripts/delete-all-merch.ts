/**
 * One-time: wipe all rows from the `merch` table (and ONLY that table).
 *
 * Usage:
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<service_role key>"
 *   npx tsx --env-file=.env.local scripts/delete-all-merch.ts
 *
 * Requires the service_role key explicitly (no anon-key fallback) since
 * RLS would otherwise block or silently no-op a bulk delete.
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
  console.error('Run with:')
  console.error('  $env:SUPABASE_SERVICE_ROLE_KEY = "<service_role key>"')
  console.error('  npx tsx --env-file=.env.local scripts/delete-all-merch.ts')
  process.exit(1)
}

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

  console.log(`\nSupabase URL: ${SUPABASE_URL}`)
  console.log('Target table: merch')
  console.log('─'.repeat(60))

  const { count: before, error: countErr } = await supabase
    .from('merch')
    .select('id', { count: 'exact', head: true })

  if (countErr) {
    console.error('Failed to count existing rows:', countErr.message)
    process.exit(1)
  }

  console.log(`Existing rows in merch: ${before}`)

  if (!before) {
    console.log('Nothing to delete.')
    return
  }

  const { error, count: deletedCount } = await supabase
    .from('merch')
    .delete({ count: 'exact' })
    .not('id', 'is', null) // matches every row; required because the client refuses an unfiltered delete

  if (error) {
    console.error('DELETE FAILED:', error.message)
    process.exit(1)
  }

  console.log(`Deleted ${deletedCount ?? before} row(s) from merch.`)

  const { count: after } = await supabase
    .from('merch')
    .select('id', { count: 'exact', head: true })

  console.log(`Remaining rows in merch: ${after}`)
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
