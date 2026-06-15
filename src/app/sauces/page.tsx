import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ProductCard from '@/app/components/ProductCard'

export const metadata: Metadata = {
  title: 'Sauces — Divillian',
  description: 'Explore the full Divillian hot sauce lineup.',
}

export default async function SaucesPage() {
  const supabase = await createClient()
  const { data: items } = await supabase
    .from('sauces')
    .select('id, name, slug, price, images')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })

  return (
    <main style={{ padding: '2rem', maxWidth: 1200, margin: '0 auto' }}>
      <h1>Sauces</h1>
      <p>Explore the full Divillian hot sauce lineup.</p>
      {!items || items.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '2rem' }}>
          No sauces available yet — check back soon.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
          {items.map(item => (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              images={item.images}
              href={`/sauces/${item.slug}`}
            />
          ))}
        </div>
      )}
    </main>
  )
}
