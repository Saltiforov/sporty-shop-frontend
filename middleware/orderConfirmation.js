import { useOrderStore } from '~/stores/order'

export default defineNuxtRouteMiddleware(() => {
    const orderStore = useOrderStore()

    if (!orderStore.recentOrder || Object.keys(orderStore.recentOrder).length === 0) {
        return navigateTo('/') // или другую нужную страницу
    }
})
