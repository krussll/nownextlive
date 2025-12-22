export function getSubscriptionRestrictions(level: string) {
    switch (level) {
        case 'free':
            return {
                max_spaces: 3,
                max_sessions: 6,
                custom_displays: false,
                concurrent_displays: 1
            }
        case 'pro':
            return {
                max_spaces: 10,
                max_sessions: 50,
                custom_displays: true,
                concurrent_displays: 5
            }
        case 'enterprise':
            return {
                max_spaces: 100,
                max_sessions: 500,
                custom_displays: true,
                concurrent_displays: 50
            }
        default:
            // fallback (should never happen)
            return {
                max_spaces: 1,
                max_sessions: 3,
                custom_displays: false,
                concurrent_displays: 1
            }
    }
}
