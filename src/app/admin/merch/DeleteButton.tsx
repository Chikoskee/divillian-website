'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function DeleteButton({ id, name, table }: { id: string; name: string; table: 'merch' | 'sauces' }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    const supabase = createClient()
    await supabase.from(table).delete().eq('id', id)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      style={{ background: 'none', border: '1px solid #c00', color: '#c00', borderRadius: '4px', padding: '0.25rem 0.625rem', cursor: 'pointer', fontSize: '0.8rem' }}
    >
      Delete
    </button>
  )
}
