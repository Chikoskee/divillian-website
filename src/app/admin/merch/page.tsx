import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from './DeleteButton'

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
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5', textAlign: 'left' }}>
              <th style={th}>Name</th>
              <th style={th}>Price</th>
              <th style={th}>Stock</th>
              <th style={th}>Published</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={td}>{item.name}</td>
                <td style={td}>{item.price != null ? `$${Number(item.price).toFixed(2)}` : '—'}</td>
                <td style={td}>{item.stock_status ?? '—'}</td>
                <td style={td}>{item.is_published ? 'Yes' : 'No'}</td>
                <td style={{ ...td, display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/merch/${item.id}/edit`} style={editLinkStyle}>Edit</Link>
                  <DeleteButton id={item.id} name={item.name} table="merch" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const th: React.CSSProperties = { padding: '0.5rem 0.75rem', fontWeight: 600 }
const td: React.CSSProperties = { padding: '0.5rem 0.75rem', verticalAlign: 'middle' }

const addButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.5rem 1rem',
  background: '#111',
  color: '#fff',
  borderRadius: '4px',
  textDecoration: 'none',
  fontSize: '0.875rem',
}

const editLinkStyle: React.CSSProperties = {
  display: 'inline-block',
  border: '1px solid #555',
  borderRadius: '4px',
  padding: '0.25rem 0.625rem',
  textDecoration: 'none',
  color: '#111',
  fontSize: '0.8rem',
}
