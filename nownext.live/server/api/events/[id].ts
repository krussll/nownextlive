import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server'


export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = event.context.params!.id

  // Anon client + forward cookies so auth works server-side
  const supabase = await serverSupabaseClient(event)

  const user = await serverSupabaseUser(event)

  const { data, error } = await supabase.rpc(
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

  const eventUserId = data?.user_id

  console.log(eventUserId, user?.sub)

  if (eventUserId && (!user || user.sub !== eventUserId)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Event not found'
    })
  }

  // All good → return event JSON
  const { user_id, ...sanitizedData } = data as any
  return {
    ...sanitizedData,
    is_associated_with_user: !!user_id
  }
})