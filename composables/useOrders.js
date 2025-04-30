export const useOrders = () => {
    const { $api } = useNuxtApp()
    const router = {
        orders: '/api/client/orders',
    }

    const create = (order) => $api.post(router.orders, order)

    return { create }
}
