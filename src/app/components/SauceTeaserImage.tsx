'use client'

import { useState } from 'react'
import Lightbox from './Lightbox'

type Props = {
  src: string
  alt: string
}

export default function SauceTeaserImage({ src, alt }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} onClick={() => setOpen(true)} />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  )
}
