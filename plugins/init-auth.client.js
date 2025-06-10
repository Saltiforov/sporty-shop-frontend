export default defineNuxtPlugin(async (nuxtApp) => {
    const auth = useAuthStore()

    auth.restoreAuthFromLocalStorage()

    if (auth.userToken) {
        await auth.fetchUserData()
    }
})
