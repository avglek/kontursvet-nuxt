// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['nuxt-email-renderer', '@nuxtjs/i18n', '@vueuse/nuxt'],
  css: ['~/assets/css/style.css', '~/assets/css/portfolio.css'],

  app: {
    head: {
      title: 'Контурсвет', // default fallback title
      htmlAttrs: {
        lang: 'ru',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }],
    },
  },

  nitro: {
    storage: {
      uploads: {
        driver: 'fs',
        base: './public/uploads',
      },
    },
  },

  runtimeConfig: {
    smtpHost: '',
    smtpPort: '',
    smtpUser: '',
    smtpPass: '',
    smtpFrom: '',
    smtpTo: '',
  },

  i18n: {
    locales: [
      { code: 'ru', file: 'ru.json' },
      { code: 'en', file: 'en.json' },
    ],
    defaultLocale: 'ru',
    langDir: 'locales/',
  },
});
