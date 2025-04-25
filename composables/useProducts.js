export const useProducts = () => {
    const { $api } = useNuxtApp()

    const router = {
        products: '/api/products',
    }

    const getAll = (params = {}) => $api.get(router.products, { params })
    const create = (product) => $api.post(router.products, product)
    const getOne = (id) => $api.get(`${router.products}/${id}`)
    const update = (id, data) => $api.put(`${router.products}/${id}`, data)
    const remove = (id) => $api.delete(`${router.products}/${id}`)

    return { getAll, create, getOne, update, remove }
}
