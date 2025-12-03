import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const id = event.context.params!.id

  const { data, error } = await client.rpc(
    'get_event',
    { event_id: id } as any
  )

  // Handle Supabase error
  if (error) {
    console.error('Supabase error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  // Handle "not found"
  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: `Event ${id} not found`
    })
  }

  // All good → return event JSON
  return data
})