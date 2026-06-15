import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/app/components/ProductCard'

export const metadata: Metadata = {
  title: 'Merch — Divillian',
  description: 'Official Divillian merchandise.',
}

export default async function MerchPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('merch')
    .select('id, name, slug, price, images')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  return (
    <>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/sauces">Sauces</a>
          <a href="/merch">Merch</a>
          <a href="/order">Order</a>
        </nav>
      </header>

      <div className="container">
        <h1 className="section-title">Merch</h1>

        <div className="page-intro">
          <p>Rep the brand. Official Divillian gear — built for those who bring the heat.</p>
        </div>

        {!items || items.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
            No merch available yet — check back soon.
          </p>
        ) : (
          <div className="shop-grid">
            {items.map(item => (
              <ProductCard
                key={item.id}
                name={item.name}
                price={item.price}
                images={item.images}
                href={`/merch/${item.slug}`}
              />
            ))}
          </div>
        )}
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-section">
            <h4>Divillian</h4>
            <p>Bringing the heat since day one.</p>
          </div>
          <div className="footer-section">
            <h4>Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/sauces">Sauces</a></li>
              <li><a href="/merch">Merch</a></li>
              <li><a href="/order">Order</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Divillian. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
