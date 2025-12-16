
import crypto from 'crypto'
import { serverSupabaseServiceRole } from '#supabase/server'

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig()
    const secret = config.lemonSqueezyWebhookSecret || process.env.LEMONSQUEEZY_WEBHOOK_SECRET

    if (!secret) {
        console.error('LEMONSQUEEZY_WEBHOOK_SECRET is not set')
        throw createError({
            statusCode: 500,
            statusMessage: 'Webhook secret not configured'
        })
    }

    // 1. Read raw body for signature verification
    const rawBody = await readRawBody(event)
    if (!rawBody) {
        throw createError({
            statusCode: 400,
            statusMessage: 'No body provided'
        })
    }

    // 2. Verify Signature
    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
    const signature = Buffer.from(getHeader(event, 'x-signature') || '', 'utf8')

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid signature'
        })
    }

    // 3. Parse Body
    const payload = JSON.parse(rawBody)
    const { meta, data } = payload
    const eventName = meta.event_name
    const customData = meta.custom_data || {}
    const userId = customData.user_id // We must pass user_id in custom_data from the checkout

    console.log(`Received Lemon Squeezy event: ${eventName}`, { userId, dataId: data.id })

    if (!userId) {
        console.warn('No user_id found in custom_data. Cannot link subscription to user.')
        return { status: 'ignored', reason: 'no_user_id' }
    }

    const supabase = serverSupabaseServiceRole(event)
    const attributes = data.attributes

    try {
        if (eventName === 'subscription_created' || eventName === 'subscription_updated' || eventName === 'subscription_resumed') {
            const updateData = {
                subscription_status: attributes.status,
                subscription_tier: attributes.variant_name, // Or map variant_id to a tier name if preferred
                subscription_id: data.id,
                customer_id: attributes.customer_id.toString(),
                variant_id: attributes.variant_id.toString(),
                renews_at: attributes.renews_at,
                expires_at: attributes.ends_at, // might be null if active
                updated_at: new Date().toISOString()
            }

            const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('user_id', userId)

            if (error) throw error

        } else if (eventName === 'subscription_cancelled') {
            // Access continues until ends_at
            const updateData = {
                subscription_status: attributes.status, // 'cancelled'
                renews_at: null,
                expires_at: attributes.ends_at,
                updated_at: new Date().toISOString()
            }

            const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('user_id', userId)

            if (error) throw error

        } else if (eventName === 'subscription_expired') {
            const updateData = {
                subscription_status: 'expired',
                subscription_tier: 'free', // Downgrade
                updated_at: new Date().toISOString()
            }

            const { error } = await supabase
                .from('profiles')
                .update(updateData)
                .eq('user_id', userId)

            if (error) throw error

        } else if (eventName === 'order_created') {
            // Handle one-time purchases (non-renewing)
            // Check if it's a "lifetime" or "fixed duration" product based on variant_id or product_id
            // For this specific request: "additional 2 paid tiers that don't renew... disable access once their 30 days has expired"

            // Assuming we can identify these tiers by variant_id or name. 
            // For now, let's assume if it's NOT a subscription event, it might be this.
            // But wait, order_created is also fired for subscriptions.
            // We need to check if it's a subscription order or a one-time order.

            // If attributes.first_subscription_item is present, it's a subscription.
            if (!attributes.first_subscription_item) {
                const expiresAt = new Date()
                expiresAt.setDate(expiresAt.getDate() + 30) // 30 days access

                const updateData = {
                    subscription_status: 'active', // or 'one_time'
                    subscription_tier: attributes.variant_name, // e.g. "One Month Pass"
                    subscription_id: `order_${data.id}`,
                    customer_id: attributes.customer_id.toString(),
                    variant_id: attributes.variant_id.toString(),
                    renews_at: null,
                    expires_at: expiresAt.toISOString(),
                    updated_at: new Date().toISOString()
                }

                const { error } = await supabase
                    .from('profiles')
                    .update(updateData)
                    .eq('user_id', userId)

                if (error) throw error
            }
        }

        return { status: 'success' }

    } catch (err: any) {
        console.error('Error processing webhook:', err)
        throw createError({
            statusCode: 500,
            statusMessage: err.message
        })
    }
})
