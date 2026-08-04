import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from '../merch/DeleteButton'

export default async function SaucesListPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('sauces')
    .select('id, name, heat_level, volume_oz, is_published, images')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0 }}>Sauces</h1>
        <Link href="/admin/sauces/new" style={addButtonStyle}>+ Add new</Link>
      </div>

      {!items || items.length === 0 ? (
        <p style={{ color: '#666' }}>No sauce products yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e5e5', textAlign: 'left' }}>
              <th style={th}></th>
              <th style={th}>Name</th>
              <th style={th}>Heat level</th>
              <th style={th}>Volume (oz)</th>
              <th style={th}>Published</th>
              <th style={th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} style={{ borderBottom: '1px solid #e5e5e5' }}>
                <td style={td}>
                  {item.images?.[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.images[0]}
                      alt=""
                      style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee', background: '#f9f9f9' }}
                    />
                  ) : (
                    <div style={{ width: 44, height: 44, borderRadius: 6, border: '1px solid #eee', background: '#f0f0f0' }} />
                  )}
                </td>
                <td style={td}>{item.name}</td>
                <td style={td}>{item.heat_level ?? '—'}</td>
                <td style={td}>{item.volume_oz ?? '—'}</td>
                <td style={td}>{item.is_published ? 'Yes' : 'No'}</td>
                <td style={{ ...td, display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/sauces/${item.id}/edit`} style={editLinkStyle}>Edit</Link>
                  <DeleteButton id={item.id} name={item.name} table="sauces" />
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
