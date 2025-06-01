const router = {
    filters: '/api/client/filters',
}

export const getAllFilters = (params = {}) => {
    const config = useRuntimeConfig()
    const url = `${config.public.apiBase}${router.filters}`
    return $fetch(url, { params })
}
