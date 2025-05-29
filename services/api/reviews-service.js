const router = {
    reviews: (slug) => `/api/client/products/${slug}/reviews`,
}

export const leaveReview = async (slug, rating, comment) => {
    const { $api } = useNuxtApp()
    return $api.post(router.reviews(slug), {
        rating,
        comment
    })
}

export const getReviewByProduct = (slug) => {
    const { $api } = useNuxtApp()
    return $api.get(router.reviews(slug))
}
