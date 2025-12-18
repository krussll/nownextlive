import { serverSupabaseClient } from '#supabase/server'
import { getSubscriptionRestrictions } from '../../../utils/subscriptions'

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event)

    const eventId = event.context.params!.id
    if (!eventId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Event ID is required'
        })
    }

    /**
     * Step 1: Get the event owner
     */
    const { data: eventRow, error: eventError } = await supabase
        .from('events')
        .select('user_id')
        .eq('id', eventId)
        .single()

    if (eventError || !eventRow) {
        const subLevel = "free"
        return {
            subscriptionLevel: subLevel,
            restrictions: getSubscriptionRestrictions(subLevel)
        }
    }

    /**
     * Step 2: Get subscription level from profiles
     */
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('subscription_level')
        .eq('user_id', eventRow.user_id)
        .single()

    if (profileError || !profile) {
        const subLevel = "free"
        return {
            subscriptionLevel: subLevel,
            restrictions: getSubscriptionRestrictions(subLevel)
        }
    }

    const subscriptionLevel = profile.subscription_level
    return {
        subscriptionLevel,
        restrictions: getSubscriptionRestrictions(subscriptionLevel)
    }
})
