import { createClient } from '@/lib/supabase/client'
import ProductCard from '@/app/components/ProductCard'

export default async function FeaturedDrops() {
  const supabase = createClient()

  const [{ data: merch }, { data: sauces }] = await Promise.all([
    supabase
      .from('merch')
      .select('id, name, slug, price, images')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(4),
    supabase
      .from('sauces')
      .select('id, name, slug, price, images')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(4),
  ])

  return (
    <div className="container" id="apparel-shop">
      <h2 className="section-title">FEATURED DROPS</h2>

      {merch && merch.length > 0 && (
        <>
          <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 3, color: '#8b0000' }}>Merch</h3>
          <div className="shop-grid">
            {merch.map(item => (
              <ProductCard
                key={item.id}
                name={item.name}
                price={item.price}
                images={item.images}
                href={`/merch/${item.slug}`}
                buttonLabel="View More"
                buttonHref="/merch"
              />
            ))}
          </div>
        </>
      )}

      {sauces && sauces.length > 0 && (
        <>
          <h3 style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '1.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: 3, color: '#8b0000' }}>Sauces</h3>
          <div className="shop-grid">
            {sauces.map(item => (
              <ProductCard
                key={item.id}
                name={item.name}
                price={item.price}
                images={item.images}
                href={`/sauces/${item.slug}`}
                buttonLabel="View More"
                buttonHref="/sauces"
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
