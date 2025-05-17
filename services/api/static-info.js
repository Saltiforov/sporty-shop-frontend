const router = {
    static_pages: `/api/admin/static-pages`,
}

export const getStaticPagesInfo = () => {
    const { $api } = useNuxtApp()
    return $api.get(router.static_pages)
}
