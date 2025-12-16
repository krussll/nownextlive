import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (_event) => {
    const supabase = await serverSupabaseClient(_event)

    const session = await supabase.auth.getSession()
    const user = session.data.session?.user

    // Not logged in → return default
    if (!user) {
        const subLevel = 'free'
        return {
            subscription: subLevel,
            capabilities: getCapabilities(subLevel)
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

    // TEMPORARY: Hardcoded capabilities for now
    const capabilities = getCapabilities(subscriptionLevel)

    return {
        subscription: subscriptionLevel,
        capabilities
    }
})

// Hardcoded capability map
function getCapabilities(level: string) {
    switch (level) {
        case 'free':
            return {
                max_spaces: 3,
                max_sessions: 6,
                custom_displays: false
            }
        case 'pro':
            return {
                max_spaces: 10,
                max_sessions: 50,
                custom_displays: true
            }
        case 'enterprise':
            return {
                max_spaces: 100,
                max_sessions: 500,
                custom_displays: true
            }
        default:
            // fallback (should never happen)
            return {
                max_spaces: 1,
                max_sessions: 3,
                custom_displays: false
            }
    }
}
