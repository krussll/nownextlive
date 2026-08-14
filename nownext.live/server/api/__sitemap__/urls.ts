export default defineSitemapEventHandler(async (event) => {
    const posts = await queryCollection(event, 'blog').all()
    const useCases = await queryCollection(event, 'usecases').all()
    const docs = await queryCollection(event, 'docs').all()

    const blogUrls = posts.map(post => ({
        loc: post.path,
        lastmod: post.modifiedAt || new Date().toISOString()
    }))

    const useCaseUrls = useCases.map(uc => ({
        loc: uc.path,
        lastmod: uc.modifiedAt || new Date().toISOString()
    }))

    const docUrls = docs.map(doc => ({
        loc: doc.path,
        lastmod: doc.modifiedAt || new Date().toISOString()
    }))

    return [...blogUrls, ...useCaseUrls, ...docUrls]
})
