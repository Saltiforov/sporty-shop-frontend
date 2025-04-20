// https://nuxt.com/docs/api/configuration/nuxt-config

import Aura from '@primeuix/themes/aura';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    modules: [
      '@primevue/nuxt-module',
      '@nuxtjs/tailwindcss',
      'nuxt-swiper',
    ],
    css: [
        '@/assets/styles/fonts.css',
        '@/assets/styles/base.css',
        '@/assets/css/variables.css',
    ],
    primevue: {
        options: {
            theme: {
                preset: Aura
            }
        }
    }
})
