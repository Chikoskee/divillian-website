'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  flavor: string
  onClose: () => void
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwlkdvav'

export default function FreeSampleModal({ flavor, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (response.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!mounted) return null

  return createPortal(
    <div
      className="free-sample-modal open"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Request a free sample"
    >
      <div className="free-sample-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="free-sample-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        {status === 'success' ? (
          <div className="free-sample-success">
            <h3>Thanks for your request!</h3>
            <p>We&apos;ve got your free sample request for {flavor}. Keep an eye on your inbox &mdash; we&apos;ll be in touch soon.</p>
            <button type="button" className="buy-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="free-sample-form">
            <h3>Request a Free Sample</h3>
            <p className="free-sample-subtitle">Tell us where to send your {flavor} sample.</p>

            <input type="hidden" name="_subject" value="New Free Sample Request" />

            <label className="free-sample-field">
              Name
              <input type="text" name="name" required autoComplete="name" />
            </label>

            <label className="free-sample-field">
              Email
              <input type="email" name="email" required autoComplete="email" />
            </label>

            <label className="free-sample-field">
              Flavor
              <input type="text" name="flavor" defaultValue={flavor} required />
            </label>

            <label className="free-sample-field">
              Street Address
              <input type="text" name="street" required autoComplete="street-address" />
            </label>

            <div className="free-sample-row">
              <label className="free-sample-field">
                City
                <input type="text" name="city" required autoComplete="address-level2" />
              </label>

              <label className="free-sample-field">
                State
                <input type="text" name="state" required autoComplete="address-level1" />
              </label>

              <label className="free-sample-field">
                Zip
                <input type="text" name="zip" required autoComplete="postal-code" />
              </label>
            </div>

            {status === 'error' && (
              <p className="free-sample-error">
                Something went wrong sending your request. Please try again.
              </p>
            )}

            <button type="submit" className="buy-btn" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send My Request'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
