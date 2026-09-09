/**
 * One-time: seed placeholder "Coming Soon" sauces into the `sauces` table.
 *
 * Usage:
 *   $env:SUPABASE_SERVICE_ROLE_KEY = "<service_role key>"
 *   npx tsx --env-file=.env.local scripts/seed-placeholder-sauces.ts
 *
 * Safe to re-run: upserts on slug, so existing rows are updated, not duplicated.
 * Price and images are intentionally left null — these are placeholders with
 * no real product data yet, editable later in Admin.
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
  console.error('Run with:')
  console.error('  $env:SUPABASE_SERVICE_ROLE_KEY = "<service_role key>"')
  console.error('  npx tsx --env-file=.env.local scripts/seed-placeholder-sauces.ts')
  process.exit(1)
}

const PLACEHOLDER_SAUCES = [
  {
    name: 'Flavor No. 1',
    slug: 'flavor-no-1',
    description: 'A bold, smoky heat with a slow build. Details coming soon.',
    heat_level: 5,
    is_published: true,
    sort_order: 1,
  },
  {
    name: 'Flavor No. 2',
    slug: 'flavor-no-2',
    description: 'Bright and tangy up front, with a lingering kick.',
    heat_level: 7,
    is_published: true,
    sort_order: 2,
  },
  {
    name: 'Flavor No. 3',
    slug: 'flavor-no-3',
    description: 'Our mildest blend — full flavor without the burn.',
    heat_level: 3,
    is_published: true,
    sort_order: 3,
  },
  {
    name: 'Flavor No. 4',
    slug: 'flavor-no-4',
    description: 'For those who bring the heat. Not for the faint of heart.',
    heat_level: 9,
    is_published: true,
    sort_order: 4,
  },
  {
    name: 'Flavor No. 5',
    slug: 'flavor-no-5',
    description: 'Sweet and savory with a bright citrus finish.',
    heat_level: 4,
    is_published: true,
    sort_order: 5,
  },
  {
    name: 'Flavor No. 6',
    slug: 'flavor-no-6',
    description: 'Deep, earthy heat with a hint of char.',
    heat_level: 6,
    is_published: true,
    sort_order: 6,
  },
  {
    name: 'Flavor No. 7',
    slug: 'flavor-no-7',
    description: 'A garlic-forward blend built for everyday use.',
    heat_level: 5,
    is_published: true,
    sort_order: 7,
  },
  {
    name: 'Flavor No. 8',
    slug: 'flavor-no-8',
    description: 'Our hottest blend yet — approach with caution.',
    heat_level: 10,
    is_published: true,
    sort_order: 8,
  },
]

async function main() {
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

  console.log(`\nSupabase URL: ${SUPABASE_URL}`)
  console.log('Target table: sauces')
  console.log('─'.repeat(60))

  for (const sauce of PLACEHOLDER_SAUCES) {
    const { error } = await supabase.from('sauces').upsert(sauce, { onConflict: 'slug' })
    if (error) {
      console.error(`  FAIL  [${sauce.slug}] — ${error.message}`)
    } else {
      console.log(`  OK    [${sauce.slug}] "${sauce.name}"`)
    }
  }

  console.log('\nDone.')
}

main().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
