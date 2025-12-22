export default defineNuxtRouteMiddleware(async (to) => {
    const { error } = await useFetch(`/api/events/${to.params.id}`)

    if (error.value) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Page not found',
            fatal: true
        })
    }
})
