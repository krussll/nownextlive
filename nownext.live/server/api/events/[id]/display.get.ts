import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const id = event.context.params!.id
    const supabase = await serverSupabaseClient(event)

    const { data, error } = await supabase.rpc(
        'get_event',
        { event_id: id } as any
    )

    if (error) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: `Event ${id} not found`
        })
    }

    // Return sanitized data for public display
    const { user_id, ...sanitizedData } = data as any
    return sanitizedData
})
