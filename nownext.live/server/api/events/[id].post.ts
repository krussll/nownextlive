import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)
  const id = event.context.params!.id

  const body = await readBody(event)

  if (!body || body.id !== id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid event payload'
    })
  }

  const { data, error } = await client.rpc(
    'update_full_event',
    { payload: body } as any
  )

  if (error) {
    console.error('RPC error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: error.message
    })
  }

  return {
    id: data,
    status: 'updated'
  }
})
