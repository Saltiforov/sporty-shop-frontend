import { Fetch } from '~/utils/fetch'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()

    const api = new Fetch(config.public.apiBase, {
        'Content-Type': 'application/json',
    })

    nuxtApp.provide('api', api)
})
