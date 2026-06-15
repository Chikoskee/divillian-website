'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      style={{ background: 'none', border: '1px solid #ccc', borderRadius: '4px', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}
    >
      Sign out
    </button>
  )
}
