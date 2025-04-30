const router = {
    orders: '/api/client/orders',
}

export const createOrder = (product) => {
    const { $api } = useNuxtApp()
    return $api.post(router.orders, product)
}

export const getAllOrders = (id) => {
    const { $api } = useNuxtApp()
    return $api.get(`${router.orders}/${id}`)
}
