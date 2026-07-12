import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/app/components/ProductCard'

export default async function SaucesPreview() {
  const supabase = await createClient()

  const { data: sauces } = await supabase
    .from('sauces')
    .select('id, name, slug, price, images')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (!sauces || sauces.length === 0) return null

  return (
    <div className="container">
      <h2 className="section-title">Sauces</h2>
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
    </div>
  )
}
