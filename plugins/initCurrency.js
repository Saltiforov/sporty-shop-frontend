import {defineNuxtPlugin, useCookie} from '#imports'
import {useCurrencyStore} from '~/stores/currency'

export default defineNuxtPlugin((nuxtApp) => {
    const currency = useCookie('currency')
    const store = useCurrencyStore(nuxtApp.$pinia)
    if (currency.value) {
        store.setCurrency(currency.value)
    }
})
