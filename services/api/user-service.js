const router = {
    me: '/api/client/users/me',
    updateUser: '/api/client/users/',
}

export const getCurrentUser = () => {
    const { $api } = useNuxtApp()
    return $api.get(router.me)
}

export const updateInfoAboutUser = (id, data) => {
    const { $api } = useNuxtApp()
    return $api.post(`${router.updateUser}${id}`, data)
}