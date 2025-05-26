import { defineNuxtPlugin, useCookie } from '#imports'
import { useCurrencyStore }      from '~/stores/currency'

export default defineNuxtPlugin((nuxtApp) => {
    const currency = useCookie('currency')
    console.log('currency', currency.value)
    const store    = useCurrencyStore(nuxtApp.$pinia)
    console.log('store', store);
    if (currency.value) {
        store.setCurrency(currency.value)
    }
})
