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
            source: 'use-cases/**/*.md',
            schema: z.object({
                date: z.string(),
                image: z.string().optional(),
                author: z.string(),
                tags: z.array(z.string()),
                draft: z.boolean()
            })
        }),
        docs: defineCollection({
            type: 'page',
            source: 'docs/**/*.md',
            schema: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                date: z.string().optional(),
                image: z.string().optional(),
                author: z.string().optional(),
                tags: z.array(z.string()).optional(),
                category: z.string().optional(),
                order: z.number().optional(),
                draft: z.boolean().optional()
            })
        })
    }
})
