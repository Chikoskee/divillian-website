import Link from 'next/link'
import SignOutButton from './components/SignOutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', background: '#111', color: '#fff' }}>
        <span style={{ fontWeight: 600, letterSpacing: '0.05em' }}>Divillian Admin</span>
        <SignOutButton />
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <nav style={{ width: '180px', flexShrink: 0, borderRight: '1px solid #e5e5e5', padding: '1.5rem 1rem' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <li><Link href="/admin" style={{ textDecoration: 'none', color: '#111', fontSize: '0.9rem' }}>Dashboard</Link></li>
            <li><Link href="/admin/merch" style={{ textDecoration: 'none', color: '#111', fontSize: '0.9rem' }}>Merch</Link></li>
            <li><Link href="/admin/sauces" style={{ textDecoration: 'none', color: '#111', fontSize: '0.9rem' }}>Sauces</Link></li>
          </ul>
        </nav>

        <main style={{ flex: 1, padding: '1.5rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
