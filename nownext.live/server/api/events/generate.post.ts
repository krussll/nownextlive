import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  // Call Supabase RPC
  const { data, error } = await client.rpc(
    'create_new_event',
    {} as any
  )

  if (error) {
    console.error('Error creating event:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  if (!data) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unexpected empty response from RPC'
    })
  }

  // Return new event ID
  return {
    id: data
  }
})
