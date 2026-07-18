import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import MerchTable from './MerchTable'

export default async function MerchListPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('merch')
    .select('id, name, price, stock_status, is_published')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Merch</h1>
        <Link href="/admin/merch/new" style={addButtonStyle}>+ Add new</Link>
      </div>

      {!items || items.length === 0 ? (
        <p style={{ color: '#666' }}>No merch products yet.</p>
      ) : (
        <MerchTable items={items} />
      )}
    </div>
  )
}

const addButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.5rem 1rem',
  background: '#111',
  color: '#fff',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '0.875rem',
}
