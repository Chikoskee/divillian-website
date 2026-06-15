'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

type MerchData = {
  id?: string
  name?: string
  slug?: string
  description?: string
  price?: number | null
  shopify_url?: string | null
  images?: string[] | null
  sizes?: string[] | null
  colors?: string[] | null
  category?: string | null
  tags?: string[] | null
  stock_status?: string | null
  is_published?: boolean
  seo_title?: string | null
  seo_description?: string | null
  sort_order?: number | null
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function toCommaString(val: unknown): string {
  if (Array.isArray(val)) return val.join(', ')
  if (typeof val === 'string') return val
  return ''
}

export default function MerchForm({ initialData }: { initialData?: MerchData }) {
  const router = useRouter()
  const slugEdited = useRef(!!initialData?.slug)

  const [form, setForm] = useState({
    name: initialData?.name ?? '',
    slug: initialData?.slug ?? '',
    description: initialData?.description ?? '',
    price: initialData?.price != null ? String(initialData.price) : '',
    shopify_url: initialData?.shopify_url ?? '',
    sizes: toCommaString(initialData?.sizes),
    colors: toCommaString(initialData?.colors),
    category: initialData?.category ?? '',
    tags: toCommaString(initialData?.tags),
    stock_status: initialData?.stock_status ?? 'in_stock',
    is_published: initialData?.is_published ?? false,
    seo_title: initialData?.seo_title ?? '',
    seo_description: initialData?.seo_description ?? '',
    sort_order: initialData?.sort_order != null ? String(initialData.sort_order) : '0',
  })

  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images ?? [])
  const [newFiles, setNewFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

    if (name === 'name') {
      setForm(f => ({
        ...f,
        name: value,
        slug: slugEdited.current ? f.slug : slugify(value),
      }))
    } else if (name === 'slug') {
      slugEdited.current = true
      setForm(f => ({ ...f, slug: value }))
    } else {
      setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) setNewFiles(Array.from(e.target.files))
  }

  function removeExistingImage(url: string) {
    setExistingImages(imgs => imgs.filter(i => i !== url))
  }

  async function uploadImages(): Promise<string[]> {
    if (newFiles.length === 0) return []
    const supabase = createClient()
    const urls: string[] = []
    for (const file of newFiles) {
      const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(path, file)
      if (uploadError) throw new Error(`Image upload failed: ${uploadError.message}`)
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(path)
      urls.push(publicUrl)
    }
    return urls
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      setUploading(true)
      const uploadedUrls = await uploadImages()
      setUploading(false)

      const allImages = [...existingImages, ...uploadedUrls]

      const payload = {
        name: form.name,
        slug: form.slug,
        description: form.description || null,
        price: form.price !== '' ? parseFloat(form.price) : null,
        shopify_url: form.shopify_url || null,
        images: allImages.length > 0 ? allImages : null,
        sizes: form.sizes ? form.sizes.split(',').map(s => s.trim()).filter(Boolean) : null,
        colors: form.colors ? form.colors.split(',').map(s => s.trim()).filter(Boolean) : null,
        category: form.category || null,
        tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : null,
        stock_status: form.stock_status || null,
        is_published: form.is_published,
        seo_title: form.seo_title || null,
        seo_description: form.seo_description || null,
        sort_order: form.sort_order !== '' ? parseInt(form.sort_order, 10) : 0,
      }

      const supabase = createClient()
      if (initialData?.id) {
        const { error } = await supabase.from('merch').update(payload).eq('id', initialData.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('merch').insert(payload)
        if (error) throw error
      }

      router.push('/admin/merch')
      router.refresh()
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : typeof err === 'object' && err !== null && 'message' in err
            ? String((err as { message: unknown }).message)
            : JSON.stringify(err)
      setError(msg)
      setSaving(false)
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '680px' }}>
      {error && (
        <p style={{ color: '#c00', background: '#fff0f0', border: '1px solid #f99', borderRadius: '4px', padding: '0.5rem 0.75rem', marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      <Section title="Basic info">
        <Field label="Name *">
          <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
        </Field>
        <Field label="Slug *">
          <input name="slug" value={form.slug} onChange={handleChange} required style={inputStyle} />
        </Field>
        <Field label="Description">
          <textarea name="description" value={form.description} onChange={handleChange} rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>
        <Field label="Price">
          <input name="price" type="number" step="0.01" min="0" value={form.price} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Shopify URL">
          <input name="shopify_url" type="url" value={form.shopify_url} onChange={handleChange} style={inputStyle} />
        </Field>
      </Section>

      <Section title="Images">
        {existingImages.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {existingImages.map(url => (
              <div key={url} style={{ position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: '4px', border: '1px solid #e5e5e5' }} />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  style={{ position: 'absolute', top: 2, right: 2, background: '#c00', color: '#fff', border: 'none', borderRadius: '50%', width: 18, height: 18, fontSize: 10, cursor: 'pointer', lineHeight: 1 }}
                >×</button>
              </div>
            ))}
          </div>
        )}
        <input type="file" accept="image/*" multiple onChange={handleFileChange} />
        {newFiles.length > 0 && <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>{newFiles.length} file(s) selected</p>}
      </Section>

      <Section title="Details">
        <Field label="Sizes (comma-separated)">
          <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="S, M, L, XL" style={inputStyle} />
        </Field>
        <Field label="Colors (comma-separated)">
          <input name="colors" value={form.colors} onChange={handleChange} placeholder="Black, White" style={inputStyle} />
        </Field>
        <Field label="Category">
          <input name="category" value={form.category} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="Tags (comma-separated)">
          <input name="tags" value={form.tags} onChange={handleChange} style={inputStyle} />
        </Field>
      </Section>

      <Section title="Status">
        <Field label="Stock status">
          <select name="stock_status" value={form.stock_status} onChange={handleChange} style={inputStyle}>
            <option value="in_stock">In stock</option>
            <option value="out_of_stock">Out of stock</option>
            <option value="limited">Limited</option>
          </select>
        </Field>
        <Field label="Sort order">
          <input name="sort_order" type="number" value={form.sort_order} onChange={handleChange} style={{ ...inputStyle, width: '100px' }} />
        </Field>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" name="is_published" checked={form.is_published} onChange={handleChange} />
          Published
        </label>
      </Section>

      <Section title="SEO">
        <Field label="SEO title">
          <input name="seo_title" value={form.seo_title} onChange={handleChange} style={inputStyle} />
        </Field>
        <Field label="SEO description">
          <textarea name="seo_description" value={form.seo_description} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        </Field>
      </Section>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <button
          type="submit"
          disabled={saving}
          style={{ padding: '0.625rem 1.5rem', background: '#111', color: '#fff', border: 'none', borderRadius: '4px', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.6 : 1 }}
        >
          {uploading ? 'Uploading images…' : saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/merch')}
          style={{ padding: '0.625rem 1rem', background: 'none', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: '1px solid #e5e5e5', borderRadius: '6px', padding: '1rem', marginBottom: '1rem' }}>
      <legend style={{ padding: '0 0.5rem', fontWeight: 600, fontSize: '0.875rem' }}>{title}</legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>{children}</div>
    </fieldset>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.875rem' }}>
      {label}
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  padding: '0.4rem 0.5rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '0.875rem',
  width: '100%',
  boxSizing: 'border-box',
}
