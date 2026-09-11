// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: [
    'nuxt-email-renderer',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    '@nuxt/test-utils/module',
  ],
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
    botToken: '',
    chatId: '',
    nodeSslCerts: '',
    smtpActive: 'false',
    botActive: 'false',
  },

  i18n: {
    defaultLocale: 'ru',
    langDir: 'locales',
    locales: [
      { code: 'ru', language: 'ru-RU', file: 'ru.json' },
      { code: 'en', language: 'en-US', file: 'en.json' },
    ],
  },
});
