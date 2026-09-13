'use client'

import { useState } from 'react'
import FreeSampleModal from './FreeSampleModal'

type Props = {
  flavor: string
  className?: string
  style?: React.CSSProperties
}

export default function FreeSampleButton({ flavor, className, style }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className={className ?? 'buy-btn'}
        style={style}
        onClick={() => setIsOpen(true)}
      >
        Free Sample
      </button>

      {isOpen && <FreeSampleModal flavor={flavor} onClose={() => setIsOpen(false)} />}
    </>
  )
}
