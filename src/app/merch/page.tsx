import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import MerchCatalog from './MerchCatalog'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Merch — Divillian',
  description: 'Official Divillian merchandise.',
}

export default async function MerchPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('merch')
    .select('id, name, slug, price, images, category')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  return (
    <>
      <header>
        <nav>
          <Link href="/#home">Home</Link>
          <Link href="/sauces">Sauces</Link>
          <Link href="/merch">Merch</Link>
          <a href="/#media">Media</a>
          <a href="/#about">About</a>
          <a href="/#contact">Contact</a>
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
          <MerchCatalog items={items} />
        )}
      </div>

      <footer id="contact">
        <div className="footer-container">
          <div className="footer-section">
            <h4>Divil&apos;Lian</h4>
            <p>Premium apparel and gourmet flavors crafted in New Jersey, USA. Representing the bold and the authentic since 2026.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/#home">Home</a></li>
              <li><a href="/sauces">Sauces</a></li>
              <li><a href="/merch">Merch</a></li>
              <li><a href="/#about">Our Story</a></li>
              <li><a href="/#media">Media Gallery</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>📍 Jersey City, New Jersey, USA</p>
            <p>📧 info@divillian.com</p>
            <p>📸 Instagram: @DivilLian</p>
            <p>🎥 TikTok: @DivilLianOfficial</p>
          </div>
          <div className="footer-section">
            <h4>Newsletter</h4>
            <p>Get the latest drops and spicy news.</p>
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-btn">Subscribe</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Divil&apos;Lian. All rights reserved. Made with fire in New Jersey.</p>
        </div>
      </footer>
    </>
  )
}
