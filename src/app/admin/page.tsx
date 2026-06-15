import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: merchTotal },
    { count: merchPublished },
    { count: saucesTotal },
    { count: saucesPublished },
  ] = await Promise.all([
    supabase.from('merch').select('*', { count: 'exact', head: true }),
    supabase.from('merch').select('*', { count: 'exact', head: true }).eq('is_published', true),
    supabase.from('sauces').select('*', { count: 'exact', head: true }),
    supabase.from('sauces').select('*', { count: 'exact', head: true }).eq('is_published', true),
  ])

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <StatCard
          label="Merch"
          total={merchTotal ?? 0}
          published={merchPublished ?? 0}
        />
        <StatCard
          label="Sauces"
          total={saucesTotal ?? 0}
          published={saucesPublished ?? 0}
        />
      </div>

      <h2 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Quick actions</h2>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Link href="/admin/merch/new" style={linkStyle}>+ Add new merch</Link>
        <Link href="/admin/sauces/new" style={linkStyle}>+ Add new sauce</Link>
      </div>
    </div>
  )
}

function StatCard({ label, total, published }: { label: string; total: number; published: number }) {
  return (
    <div style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '1rem 1.5rem', minWidth: '160px' }}>
      <div style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1 }}>{total}</div>
      <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.4rem' }}>
        {published} published · {total - published} draft
      </div>
    </div>
  )
}

const linkStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.5rem 1rem',
  background: '#111',
  color: '#fff',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '0.875rem',
}
