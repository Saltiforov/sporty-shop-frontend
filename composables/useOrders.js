export const useOrders = () => {
    const { $api } = useNuxtApp()
    const router = {
        orders: '/api/orders',
    }

    const create = (order) => $api.post(router.orders, order)

    return { create }
}
