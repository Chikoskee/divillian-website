import ProductImageGallery from './ProductImageGallery'
import FreeSampleButton from './FreeSampleButton'

type Props = {
  name: string
  description: string | null
  heatLevel: number | null
  images: string[] | null
}

export default function SauceCard({ name, description, heatLevel, images }: Props) {
  const imageList = Array.isArray(images) ? images : []

  return (
    <div className="sauce-card">
      {imageList.length > 0 ? (
        <ProductImageGallery images={imageList} alt={name} />
      ) : (
        <div className="sauce-card-placeholder">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 2c.5 1.5-1 2-1 4a3 3 0 0 0 6 0c0-.8-.3-1.3-.6-1.8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 9h12l-1 11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 9Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
      <h4>{name}</h4>
      {description && <p>{description}</p>}
      {heatLevel != null && (
        <p className="heat-meter" aria-label={`Heat level ${heatLevel} of 10`}>
          {'🔥'.repeat(Math.max(1, Math.round(heatLevel / 2)))}
        </p>
      )}
      <FreeSampleButton flavor={name} />
    </div>
  )
}
