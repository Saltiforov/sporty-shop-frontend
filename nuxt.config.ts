// https://nuxt.com/docs/api/configuration/nuxt-config
import Noir from "./utils/themes/noir";


export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://localhost:3000/api'
        }
    },
    modules: [
      '@primevue/nuxt-module',
      '@nuxtjs/tailwindcss',
      'nuxt-swiper',
      '@pinia/nuxt',
      '@nuxtjs/i18n'
    ],
    css: [
        'primeicons/primeicons.css',
        '@/assets/styles/fonts.css',
        '@/assets/styles/base.css',
        '@/assets/css/variables.css',
    ],
    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'EN', file: 'en.json' },
            { code: 'ua', name: 'UA', file: 'uk.json' },
        ]
    },
    primevue: {
        options: {
            pt: {
              button: {
                  root: {
                      class: 'btn-primary',
                   }
              }
            },
            theme: {
                preset: Noir,
                options: {
                    darkModeSelector: 'light',
                }
            }
        }
    }
})