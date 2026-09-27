import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductImageGallery from '@/app/components/ProductImageGallery'
import SocialIcons from '@/app/components/SocialIcons'
import CustomDesignSection from '@/app/components/CustomDesignSection'

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
          <a href="/merch">Merch</a>
          <a href="/sauces">Sauces</a>
          <a href="/order">Order</a>
        </nav>
      </header>

      <div className="container" style={{ maxWidth: 960 }}>
        <a href="/merch" style={{ color: '#8b0000', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 1, textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to Merch
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
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {colors.map(c => <ColorSwatch key={c} name={c} />)}
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

            <CustomDesignSection productName={product.name} />
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
              <li><a href="/merch">Merch</a></li>
              <li><a href="/sauces">Sauces</a></li>
              <li><a href="/order">Order</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <SocialIcons />
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Divillian. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

const COLOR_NAME_MAP: Record<string, string> = {
  black: '#111',
  white: '#fff',
  red: '#b00020',
  blue: '#1e40af',
  navy: '#1e293b',
  green: '#166534',
  grey: '#6b7280',
  gray: '#6b7280',
  orange: '#c2410c',
  yellow: '#ca8a04',
  purple: '#6b21a8',
  pink: '#db2777',
  brown: '#78350f',
  beige: '#e8dcc8',
  tan: '#d2b48c',
  olive: '#4d5d21',
  maroon: '#7f1d1d',
  teal: '#0f766e',
  charcoal: '#374151',
  cream: '#fdf6e3',
  ivory: '#fffff0',
  khaki: '#bdb76b',
  silver: '#c0c0c0',
  gold: '#d4af37',
}

// Standard CSS named colors, used to validate a fallback lowercase name before using it as a raw color value.
const CSS_NAMED_COLORS = new Set([
  'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
  'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
  'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
  'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
  'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
  'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro',
  'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred',
  'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
  'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon',
  'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime',
  'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
  'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
  'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange',
  'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip',
  'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue',
  'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue',
  'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise',
  'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen',
])

function getSwatchColor(name: string): string {
  const key = name.trim().toLowerCase()
  if (COLOR_NAME_MAP[key]) return COLOR_NAME_MAP[key]
  if (CSS_NAMED_COLORS.has(key)) return key
  return '#ddd'
}

function ColorSwatch({ name }: { name: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span
        title={name}
        style={{
          display: 'inline-block',
          width: 28,
          height: 28,
          borderRadius: 6,
          background: getSwatchColor(name),
          border: '1px solid #ccc',
        }}
      />
      <span style={{ fontSize: '0.85rem', color: '#444' }}>{name}</span>
    </div>
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
