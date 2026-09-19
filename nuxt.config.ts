// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/i18n'
  ],

  i18n: {
    locales: [
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'fr',
    strategy: 'no_prefix',
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'globalearn_locale',
      redirectOn: 'root'
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      script: [
        {
          innerHTML: "(function(){try{var t=localStorage.getItem('globalearn_theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();",
          tagPosition: 'head'
        }
      ]
    }
  },

  site: {
    url: 'https://www.globalearn-africa.com',
    name: 'GlobalEarn',
    defaultLocale: 'fr'
  },

  runtimeConfig: {
    resendApiKey: 'process.env.NUXT_RESEND_API_KEY',
    contactEmail: 'process.env.NUXT_CONTACT_EMAIL',
    public: {}
  }
})
