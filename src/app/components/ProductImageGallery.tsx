'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

type Props = {
  images: string[]
  alt: string
}

export default function ProductImageGallery({ images, alt }: Props) {
  const [openImage, setOpenImage] = useState<{ src: string; alt: string } | null>(null)

  if (images.length === 0) {
    return <div style={{ width: '100%', height: 380, background: '#f0f0f0', borderRadius: 10 }} />
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[0]}
        alt={alt}
        className="zoomable-img"
        onClick={() => setOpenImage({ src: images[0], alt })}
        style={{ width: '100%', borderRadius: 10, objectFit: 'contain', background: '#f9f9f9', maxHeight: 420 }}
      />
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          {images.slice(1).map((url, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={url}
              alt={`${alt} ${i + 2}`}
              className="zoomable-img"
              onClick={() => setOpenImage({ src: url, alt: `${alt} ${i + 2}` })}
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee', background: '#f9f9f9' }}
            />
          ))}
        </div>
      )}

      {openImage && (
        <Lightbox src={openImage.src} alt={openImage.alt} onClose={() => setOpenImage(null)} />
      )}
    </>
  )
}
