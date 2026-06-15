import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SauceForm from '../../SauceForm'

export default async function EditSaucePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: item } = await supabase.from('sauces').select('*').eq('id', id).single()

  if (!item) notFound()

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Edit sauce — {item.name}</h1>
      <SauceForm initialData={item} />
    </div>
  )
}
