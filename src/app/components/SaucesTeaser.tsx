import Link from 'next/link'

const PLACEHOLDER_SAUCES = [
  { label: 'Flavor No. 1' },
  { label: 'Flavor No. 2' },
  { label: 'Flavor No. 3' },
  { label: 'Flavor No. 4' },
]

export default function SaucesTeaser() {
  return (
    <div className="container">
      <h2 className="section-title">Sauces</h2>
      <p className="teaser-intro">Small-batch heat is on the way. Here&apos;s a preview of what&apos;s cooking.</p>

      <div className="sauces-teaser-grid">
        {PLACEHOLDER_SAUCES.map(sauce => (
          <div className="teaser-card" key={sauce.label}>
            <div className="teaser-card-media">
              <span className="teaser-badge">Coming Soon</span>
              <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 2c.5 1.5-1 2-1 4a3 3 0 0 0 6 0c0-.8-.3-1.3-.6-1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9Z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h4>{sauce.label}</h4>
          </div>
        ))}
      </div>

      <div className="teaser-cta-wrap">
        <Link href="/sauces" className="teaser-cta">Explore Sauces</Link>
      </div>
    </div>
  )
}
