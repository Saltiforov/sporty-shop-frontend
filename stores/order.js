import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOrderStore = defineStore('order', () => {
    const recentOrder = ref(null)

    const setRecentOrder = (orderData) => {
        recentOrder.value = orderData
    }

    const clearRecentOrder = () => {
        recentOrder.value = null
    }

    const getRecentOrder = () => {
        return recentOrder.value
    }

    return {
        recentOrder,
        setRecentOrder,
        clearRecentOrder,
        getRecentOrder,
    }
})
