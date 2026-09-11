import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function SaucesTeaser() {
  const supabase = await createClient()
  const { data: sauces } = await supabase
    .from('sauces')
    .select('id, name, slug, images')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
    .limit(4)

  return (
    <div className="container">
      <h2 className="section-title">Sauces</h2>
      <p className="teaser-intro">A preview of the current lineup.</p>

      {!sauces || sauces.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
          No sauces available yet — check back soon.
        </p>
      ) : (
        <div className="sauces-teaser-grid">
          {sauces.map(sauce => {
            const firstImage = Array.isArray(sauce.images) ? sauce.images[0] : null
            return (
              <div className="teaser-card" key={sauce.id}>
                <div className="teaser-card-media">
                  {firstImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={firstImage} alt={sauce.name} />
                  ) : (
                    <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path d="M8 2c.5 1.5-1 2-1 4a3 3 0 0 0 6 0c0-.8-.3-1.3-.6-1.8" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9Z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <h4>{sauce.name}</h4>
              </div>
            )
          })}
        </div>
      )}

      <div className="teaser-cta-wrap">
        <Link href="/sauces" className="teaser-cta">Explore Sauces</Link>
      </div>
    </div>
  )
}
