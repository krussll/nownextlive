import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)

    const { data, error } = await client.rpc('get_user_events')

    if (error) {
        console.error('RPC error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    return data ?? []
})
