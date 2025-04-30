const router = {
    products: '/api/client/products',
}

export const getAllProducts = (params = {}) => {
    const { $api } = useNuxtApp()
    return $api.get(router.products, { params })
}

export const createProduct = (product) => {
    const { $api } = useNuxtApp()
    return $api.post(router.products, product)
}

export const getProduct = (id) => {
    const { $api } = useNuxtApp()
    return $api.get(`${router.products}/${id}`)
}

export const updateProduct = (id, data) => {
    const { $api } = useNuxtApp()
    return $api.put(`${router.products}/${id}`, data)
}

export const deleteProduct = (id) => {
    const { $api } = useNuxtApp()
    return $api.delete(`${router.products}/${id}`)
}



