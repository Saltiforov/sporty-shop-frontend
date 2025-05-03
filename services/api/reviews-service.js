const router = {
    reviews: (productId) => `/api/client/products/${productId}/reviews`,
}

export const leaveReview = async (productId, rating, comment) => {
    const { $api } = useNuxtApp()
    return $api.post(router.reviews(productId), {
        rating,
        comment
    })
}

export const getReviewByProduct = (productId) => {
    const { $api } = useNuxtApp()
    return $api.get(router.reviews(productId))
}
