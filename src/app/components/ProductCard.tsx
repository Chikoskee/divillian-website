import Link from 'next/link'

type Props = {
  name: string
  price: number | null
  images: string[] | null
  href: string
}

export default function ProductCard({ name, price, images, href }: Props) {
  const firstImage = Array.isArray(images) ? images[0] : null

  return (
    <Link href={href} className="shop-item" style={{ textDecoration: 'none', color: 'inherit' }}>
      {firstImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={firstImage} alt={name} />
      ) : (
        <div style={{ width: '100%', height: 280, background: '#f0f0f0', borderRadius: 8, marginBottom: 15 }} />
      )}
      <h4>{name}</h4>
      {price != null && <p className="price">${Number(price).toFixed(2)}</p>}
    </Link>
  )
}
