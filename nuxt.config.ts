// https://nuxt.com/docs/api/configuration/nuxt-config
import Noir from "./utils/themes/noir";


export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
      '@primevue/nuxt-module',
      '@nuxtjs/tailwindcss',
      'nuxt-swiper',
    ],
    css: [
        'primeicons/primeicons.css',
        '@/assets/styles/fonts.css',
        '@/assets/styles/base.css',
        '@/assets/css/variables.css',
    ],
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
