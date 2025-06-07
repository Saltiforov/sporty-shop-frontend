import { defineStore } from 'pinia'
import { computed, onMounted } from 'vue'
import { useCookie } from '#app'

export const useCurrencyStore = defineStore('currency', () => {
    const currency = useCookie('currency')

    const isRegionEurope = computed(() => currency.value === 'eur')

    const getCurrency = computed(() => currency.value)

    const isUAHSelected = computed(() => currency.value === 'uah')

    const label = computed(() => {
        return isUAHSelected.value ? 'currency_uah' : 'currency_eur'
    })

    const setCurrency = (curr) => {
        currency.value = curr
    }

    onMounted(() => {
        const currentCurrency = localStorage.getItem('currency') || 'uah'
        currency.value = currentCurrency
    })

    return {
        getCurrency,
        setCurrency,
        isUAHSelected,
        label,
        isRegionEurope
    }
})
