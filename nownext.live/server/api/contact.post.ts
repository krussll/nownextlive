// server/api/contact.post.ts

import { serverSupabaseClient } from '#supabase/server'

type ContactMessage = {
    id?: string
    name: string | null
    email: string
    message: string
    created_at?: string
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body?.email || !body?.message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid form submission'
        })
    }

    const supabase = await serverSupabaseClient(event)

    const { error } = await (supabase as any)
        .from('contact_messages')
        .insert([
            {
                name: body.name ?? null,
                email: body.email,
                message: body.message
            }
        ])

    if (error) {
        console.error('Supabase insert error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save message'
        })
    }

    return { status: 'ok', message: 'Message saved successfully' }
})
