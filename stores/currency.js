import {defineStore} from 'pinia'
import {ref} from 'vue'

export const useCurrencyStore = defineStore('currency', () => {

    const currency = useCookie('currency')

    const isRegionEurope = computed(() => currency.value.toLowerCase()  === 'eur')

    const getCurrency = computed(() => currency.value)

    const isUAHSelected = computed(() => currency.value.toLowerCase() === 'uah')

    const label = computed(() => {
        return isUAHSelected.value ? 'currency_uah' : 'currency_eur'
    })

    const setCurrency = (curr) => {
        currency.value = curr.toLowerCase()
    }

    onMounted(() => {
        const currentCurrency = localStorage.getItem('currency') || 'uah'
        currency.value = currentCurrency.toLowerCase()
    })

    return {
        getCurrency,
        setCurrency,
        isUAHSelected,
        label,
        isRegionEurope
    }
})
