import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      version: pkg.version,
      enableBetaModal: true,
      gtm: {
        id: 'G-QSCLS15XJM'
      }
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-gtag', '@nuxt/eslint', '@nuxtjs/supabase', '@nuxtjs/google-fonts', '@nuxt/content', '@nuxtjs/sitemap'],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700]
    }
  },
  css: ['~/assets/css/main.css'],
  ssr: true,
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      title: 'Now. Next. Live.'
    }
  },
  gtag: {
    id: ''
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_PUBLISHABLE_KEY,
    redirect: false,
  },
  sitemap: {
    exclude: ['/r/**'],
    sources: [
      '/api/__sitemap__/urls'
    ]
  }

})