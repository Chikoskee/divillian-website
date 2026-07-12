'use client'

import { useMemo, useState } from 'react'
import ProductCard from '@/app/components/ProductCard'

type MerchItem = {
  id: string
  name: string
  slug: string
  price: number | null
  images: string[] | null
  category: string | null
}

function labelCase(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export default function MerchCatalog({ items }: { items: MerchItem[] }) {
  const categories = useMemo(
    () => [...new Set(items.map(item => item.category).filter((c): c is string => !!c))].sort(),
    [items]
  )

  const [selected, setSelected] = useState<string | null>(null)

  const filtered = selected ? items.filter(item => item.category === selected) : items

  return (
    <>
      {categories.length > 0 && (
        <div className="category-filter">
          <button
            className={`category-filter-btn${selected === null ? ' active' : ''}`}
            onClick={() => setSelected(null)}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-filter-btn${selected === category ? ' active' : ''}`}
              onClick={() => setSelected(category)}
            >
              {labelCase(category)}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '3rem' }}>
          No products in this category.
        </p>
      ) : (
        <div className="shop-grid">
          {filtered.map(item => (
            <ProductCard
              key={item.id}
              name={item.name}
              price={item.price}
              images={item.images}
              href={`/merch/${item.slug}`}
              buttonLabel="View"
              buttonHref={`/merch/${item.slug}`}
            />
          ))}
        </div>
      )}
    </>
  )
}
