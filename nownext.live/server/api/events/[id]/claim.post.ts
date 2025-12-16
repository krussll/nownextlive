import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const client = await serverSupabaseClient(event)
    const id = event.context.params!.id

    const { data, error } = await client.rpc(
        'claim_event',
        { p_event_id: id } as any
    )

    if (error) {
        throw createError({
            statusCode: 403,
            statusMessage: error.message
        })
    }

    if (!data) {
        throw createError({
            statusCode: 409,
            statusMessage: 'Event already claimed or not found'
        })
    }

    return { status: 'claimed', id }
})
