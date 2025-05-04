const router = {
    orders: '/api/client/orders',
    ordersByID: '/api/client/orders/user'
}

export const createOrder = (product) => {
    const { $api } = useNuxtApp()
    return $api.post(router.orders, product)
}

export const getOrdersByUserId = (userId, { limit = 10, skip = 0 } = {}) => {
    const { $api } = useNuxtApp()

    return $api.get(`${router.ordersByID}/${userId}`, {
        params: {
            limit,
            skip
        }
    })
}