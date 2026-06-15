import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

type Props = { params: Promise<{ slug: string }> }

async function getProduct(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('merch')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) return {}
  return {
    title: product.seo_title ?? `${product.name} — Divillian Merch`,
    description: product.seo_description ?? product.description ?? undefined,
  }
}

export default async function MerchDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const images: string[] = Array.isArray(product.images) ? product.images : []
  const sizes: string[] = Array.isArray(product.sizes) ? product.sizes : []
  const colors: string[] = Array.isArray(product.colors) ? product.colors : []
  const tags: string[] = Array.isArray(product.tags) ? product.tags : []

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

      <div className="container" style={{ maxWidth: 960 }}>
        <a href="/merch" style={{ color: '#8b0000', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to Merch
        </a>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

          {/* Gallery */}
          <div>
            {images.length > 0 ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[0]}
                  alt={product.name}
                  style={{ width: '100%', borderRadius: 10, objectFit: 'contain', background: '#f9f9f9', maxHeight: 420 }}
                />
                {images.length > 1 && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    {images.slice(1).map((url, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={url}
                        alt={`${product.name} ${i + 2}`}
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee', background: '#f9f9f9' }}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div style={{ width: '100%', height: 380, background: '#f0f0f0', borderRadius: 10 }} />
            )}
          </div>

          {/* Info */}
          <div>
            {product.category && (
              <p style={{ fontSize: '0.8rem', color: '#8b0000', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: '0.5rem' }}>
                {product.category}
              </p>
            )}
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 1 }}>
              {product.name}
            </h1>
            {product.price != null && (
              <p className="price" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                ${Number(product.price).toFixed(2)}
              </p>
            )}
            {product.description && (
              <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '1.25rem' }}>{product.description}</p>
            )}

            {sizes.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Sizes</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {sizes.map(s => <Pill key={s} label={s} />)}
                </div>
              </div>
            )}

            {colors.length > 0 && (
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Colors</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {colors.map(c => <Pill key={c} label={c} />)}
                </div>
              </div>
            )}

            {tags.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {tags.map(t => <Pill key={t} label={t} muted />)}
                </div>
              </div>
            )}

            {product.shopify_url ? (
              <a
                href={product.shopify_url}
                target="_blank"
                rel="noopener noreferrer"
                className="buy-btn"
                style={{ marginTop: '0.5rem' }}
              >
                Buy on Shopify
              </a>
            ) : (
              <p style={{ color: '#888', fontStyle: 'italic', marginTop: '0.5rem' }}>Coming soon</p>
            )}
          </div>
        </div>
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

function Pill({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: 20,
      fontSize: '0.8rem',
      fontWeight: 600,
      background: muted ? '#f0f0f0' : '#fff5f5',
      border: `1px solid ${muted ? '#ddd' : '#e8c0c0'}`,
      color: muted ? '#666' : '#8b0000',
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    }}>
      {label}
    </span>
  )
}
