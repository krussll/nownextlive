// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', 'nuxt-gtag', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  colorMode: {
    preference: 'light'
  },
  app: {
    head: {
      title: 'Now. Next. Live.'
    }
  },
  gtag: {
    id: 'G-QSCLS15XJM'
  }
})
