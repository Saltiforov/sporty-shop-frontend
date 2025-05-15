const router = {
    static_pages: `/api/admin/static-pages`,
}

export const getStaticPagesInfo = (productId) => {
    const { $api } = useNuxtApp()
    return $api.get(router.static_pages)
}
