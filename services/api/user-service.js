const router = {
    me: '/api/client/users/me',
}

export const getCurrentUser = () => {
    const { $api } = useNuxtApp()
    return $api.get(router.me)
}

