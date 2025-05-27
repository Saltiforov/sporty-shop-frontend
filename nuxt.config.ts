// https://nuxt.com/docs/api/configuration/nuxt-config
import Noir from "./utils/themes/noir";


export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {enabled: true},
    ssr: true,
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE || 'http://localhost:3000/api'
        }
    },
    app: {
        head: {
            title: 'Магазин спортивного питания | SP BALKAN',
            link: [
                { name: 'description', content: 'Купить протеин, аминокислоты и BCAA в Украине — доставка по всей стране. Широкий ассортимент от проверенных производителей.' },
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
                // { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                // { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            ],
            // при желании можно добавить meta для темы
            meta: [
                { name: 'theme-color', content: '#ffffff' }
            ]
        }
    },
    modules: [
      '@primevue/nuxt-module',
      '@nuxtjs/tailwindcss',
      'nuxt-swiper',
      '@pinia/nuxt',
      '@nuxtjs/i18n',
      '@nuxt/image'
    ],
    css: [
        'primeicons/primeicons.css',
        '@/assets/styles/fonts.css',
        '@/assets/styles/base.css',
        '@/assets/css/variables.css',
        '@/assets/css/responsive.css',
    ],
    i18n: {
        defaultLocale: 'en',
        strategy: 'prefix',
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
                        class: [
                            'w-full',
                            'px-4 py-2',
                            'border-none',
                            'hover:bg-transparent',
                            'hover:border-none',
                            'hover:text-inherit',
                            'focus:ring-0',
                            'focus:shadow-none',
                            'transition-none'
                        ].join(' ')
                    }
                },
                inputtext: {
                    root: {
                        class: 'w-full'
                    }
                },
                password: {
                    input: {
                        class: 'w-full'
                    }
                },
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
