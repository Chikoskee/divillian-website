'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import DeleteButton from './DeleteButton'

type MerchListItem = {
  id: string
  name: string
  price: number | null
  stock_status: string | null
  is_published: boolean
}

export default function MerchTable({ items }: { items: MerchListItem[] }) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [updating, setUpdating] = useState(false)

  const allSelected = items.length > 0 && selectedIds.size === items.length
  const someSelected = selectedIds.size > 0 && !allSelected

  function toggleAll() {
    setSelectedIds(allSelected ? new Set() : new Set(items.map(item => item.id)))
  }

  function toggleOne(id: string) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function setPublished(published: boolean) {
    setUpdating(true)
    const supabase = createClient()
    await supabase.from('merch').update({ is_published: published }).in('id', Array.from(selectedIds))
    setUpdating(false)
    setSelectedIds(new Set())
    router.refresh()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>{selectedIds.size} selected</span>
        <button
          onClick={() => setPublished(true)}
          disabled={selectedIds.size === 0 || updating}
          style={selectedIds.size === 0 || updating ? { ...publishButtonStyle, ...disabledStyle } : publishButtonStyle}
        >
          Publish selected
        </button>
        <button
          onClick={() => setPublished(false)}
          disabled={selectedIds.size === 0 || updating}
          style={selectedIds.size === 0 || updating ? { ...unpublishButtonStyle, ...disabledStyle } : unpublishButtonStyle}
        >
          Unpublish selected
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e5e5', textAlign: 'left' }}>
            <th style={th}>
              <input
                type="checkbox"
                checked={allSelected}
                ref={el => { if (el) el.indeterminate = someSelected }}
                onChange={toggleAll}
              />
            </th>
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
              <td style={td}>
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleOne(item.id)}
                />
              </td>
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
    </div>
  )
}

const th: React.CSSProperties = { padding: '0.5rem 0.75rem', fontWeight: 600 }
const td: React.CSSProperties = { padding: '0.5rem 0.75rem', verticalAlign: 'middle' }

const publishButtonStyle: React.CSSProperties = {
  padding: '0.4rem 0.875rem',
  background: '#111',
  color: '#fff',
  border: '1px solid #111',
  borderRadius: '4px',
  fontSize: '0.8rem',
  cursor: 'pointer',
}

const unpublishButtonStyle: React.CSSProperties = {
  padding: '0.4rem 0.875rem',
  background: 'none',
  color: '#111',
  border: '1px solid #555',
  borderRadius: '4px',
  fontSize: '0.8rem',
  cursor: 'pointer',
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.4,
  cursor: 'not-allowed',
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
