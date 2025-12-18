import { serverSupabaseClient } from '#supabase/server'
import { getSubscriptionRestrictions } from '../../utils/subscriptions'

export default defineEventHandler(async (_event) => {
    const supabase = await serverSupabaseClient(_event)

    const { data: { user } } = await supabase.auth.getUser()

    // Not logged in → return default
    if (!user) {
        const subLevel = 'free'
        return {
            subscription: subLevel,
            restrictions: getSubscriptionRestrictions(subLevel)
        }
    }

    // Fetch profile
    const { data, error } = await supabase
        .from('profiles')
        .select('subscription_level')
        .eq('user_id', user.id)
        .maybeSingle()

    if (error) {
        console.error('Profile fetch error:', error)
        throw createError({
            statusCode: 500,
            statusMessage: error.message
        })
    }
    // TEMPORARY: Hardcoded subscription level
    const subscriptionLevel = data?.subscription_level ?? 'free' // options: 'free', 'pro', 'enterprise'

    // TEMPORARY: Hardcoded restrictions for now
    const restrictions = getSubscriptionRestrictions(subscriptionLevel)

    return {
        subscription: subscriptionLevel,
        restrictions
    }
})
