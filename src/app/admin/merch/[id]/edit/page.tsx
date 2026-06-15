import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import MerchForm from '../../MerchForm'

export default async function EditMerchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: item } = await supabase.from('merch').select('*').eq('id', id).single()

  if (!item) notFound()

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Edit merch — {item.name}</h1>
      <MerchForm initialData={item} />
    </div>
  )
}
