import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md',
            schema: z.object({
                date: z.string(),
                image: z.string(),
                author: z.string(),
                tags: z.array(z.string()),
                draft: z.boolean()
            })
        }),
        usecases: defineCollection({
            type: 'page',
            source: 'usecases/**/*.md',
            schema: z.object({
                date: z.string(),
                image: z.string(),
                author: z.string(),
                tags: z.array(z.string()),
                draft: z.boolean()
            })
        }),
        docs: defineCollection({
            type: 'page',
            source: 'docs/**/*.md',
            schema: z.object({
                date: z.string(),
                image: z.string(),
                author: z.string(),
                tags: z.array(z.string()),
                draft: z.boolean()
            })
        })
    }
})
