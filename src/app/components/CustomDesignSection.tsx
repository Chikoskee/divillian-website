'use client'

import { useState } from 'react'

type Props = {
  productName: string
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mwlkdvav'

export default function CustomDesignSection({ productName }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

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

  return (
    <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #eee' }}>
      {status === 'success' ? (
        <div className="free-sample-success">
          <h3>Thanks for your request!</h3>
          <p>We&apos;ve got your custom design request for {productName}. Keep an eye on your inbox &mdash; we&apos;ll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="free-sample-form">
          <h3>Custom Designs &amp; Colors</h3>
          <p className="free-sample-subtitle">Have an idea for a custom design or a color you&apos;d like? Send us the details and we&apos;ll get back to you.</p>

          <input type="hidden" name="_subject" value="New Custom Design Request" />
          <input type="hidden" name="product_name" value={productName} />

          <label className="free-sample-field">
            Name
            <input type="text" name="name" required autoComplete="name" />
          </label>

          <label className="free-sample-field">
            Email
            <input type="email" name="email" required autoComplete="email" />
          </label>

          <label className="free-sample-field">
            Message
            <textarea name="message" required rows={4} />
          </label>

          {status === 'error' && (
            <p className="free-sample-error">
              Something went wrong sending your request. Please try again.
            </p>
          )}

          <button type="submit" className="buy-btn" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Send Request'}
          </button>
        </form>
      )}
    </div>
  )
}
