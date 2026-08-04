import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductImageGallery from '@/app/components/ProductImageGallery'

type Props = { params: Promise<{ slug: string }> }

async function getProduct(slug: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('sauces')
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
    title: product.seo_title ?? `${product.name} — Divillian Sauces`,
    description: product.seo_description ?? product.description ?? undefined,
  }
}

export default async function SauceDetailPage({ params }: Props) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()

  const images: string[] = Array.isArray(product.images) ? product.images : []
  const ingredients: string[] = Array.isArray(product.ingredients) ? product.ingredients : []
  const hasVariants = !!(
    product.glass_bottle_shopify_url ||
    product.glass_bottle_price != null ||
    product.squeeze_bottle_shopify_url ||
    product.squeeze_bottle_price != null
  )

  return (
    <main style={{ padding: 'clamp(1.25rem, 5vw, 2rem)', maxWidth: 960, margin: '0 auto' }}>
      <a href="/sauces" style={{ color: '#8b0000', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
        ← Back to Sauces
      </a>

      <div className="product-detail-grid">

        {/* Gallery */}
        <div>
          <ProductImageGallery images={images} alt={product.name} />
        </div>

        {/* Info */}
        <div>
          {product.category && (
            <p style={{ fontSize: '0.8rem', color: '#8b0000', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, marginBottom: '0.5rem' }}>
              {product.category}
            </p>
          )}

          <h1 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', fontWeight: 800, color: '#111', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: 1 }}>
            {product.name}
          </h1>

          {product.price != null && (
            <p className="price" style={{ fontSize: 'clamp(1.25rem, 4vw, 1.5rem)', marginBottom: '1rem' }}>
              ${Number(product.price).toFixed(2)}
            </p>
          )}

          {product.description && (
            <p style={{ color: '#444', lineHeight: 1.8, marginBottom: '1.25rem' }}>{product.description}</p>
          )}

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            {product.heat_level != null && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#666' }}>Heat</span>
                <p style={{ fontWeight: 800, color: '#8b0000', fontSize: '1.1rem', marginTop: 2 }}>
                  {product.heat_level} / 10
                </p>
              </div>
            )}
            {product.volume_oz != null && (
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: '#666' }}>Volume</span>
                <p style={{ fontWeight: 800, color: '#111', fontSize: '1.1rem', marginTop: 2 }}>
                  {product.volume_oz} oz
                </p>
              </div>
            )}
          </div>

          {ingredients.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.4rem' }}>Ingredients</p>
              <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.7 }}>
                {ingredients.join(', ')}
              </p>
            </div>
          )}

          {hasVariants ? (
            <div style={{ marginTop: '1rem' }}>
              <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.75rem' }}>Choose Your Bottle</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 140, border: '1px solid #e5e5e5', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Glass Bottle</p>
                  {product.glass_bottle_price != null && (
                    <p className="price" style={{ marginBottom: '0.75rem' }}>${Number(product.glass_bottle_price).toFixed(2)}</p>
                  )}
                  {product.glass_bottle_shopify_url ? (
                    <a href={product.glass_bottle_shopify_url} target="_blank" rel="noopener noreferrer" className="buy-btn">Buy on Shopify</a>
                  ) : (
                    <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Coming soon</p>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 140, border: '1px solid #e5e5e5', borderRadius: 8, padding: '1rem', textAlign: 'center' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.5rem' }}>Squeeze Bottle</p>
                  {product.squeeze_bottle_price != null && (
                    <p className="price" style={{ marginBottom: '0.75rem' }}>${Number(product.squeeze_bottle_price).toFixed(2)}</p>
                  )}
                  {product.squeeze_bottle_shopify_url ? (
                    <a href={product.squeeze_bottle_shopify_url} target="_blank" rel="noopener noreferrer" className="buy-btn">Buy on Shopify</a>
                  ) : (
                    <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9rem' }}>Coming soon</p>
                  )}
                </div>
              </div>
            </div>
          ) : product.shopify_url ? (
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
    </main>
  )
}
