export default defineEventHandler(async (_event) => {
    // TEMPORARY: Hardcoded subscription level
    const subscriptionLevel = 'free' // options: 'free', 'pro', 'enterprise'

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
