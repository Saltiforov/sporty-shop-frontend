const router = {
    products: '/api/client/products',
    productsSale: '/api/client/products/on-sale',
    productToFavorite: (id) =>  `/api/client/favorites/${id}`,
    favorites: '/api/client/favorites',
}

export const getAllProducts = (params = {}) => {
    const { $api } = useNuxtApp()
    return $api.get(router.products, { params })
}

export const getProductsOnSale = () => {
    const { $api } = useNuxtApp()
    return $api.get(router.productsSale)
}

export const addProductToFavorites = (id) => {
    const { $api } = useNuxtApp()
    return $api.post(router.productToFavorite(id))
}

export const deleteProductFromFavorites = (id) => {
    const { $api } = useNuxtApp()
    return $api.delete(router.productToFavorite(id))
}

export const getFavorites = () => {
    const { $api } = useNuxtApp()
    return $api.get(router.favorites)
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



