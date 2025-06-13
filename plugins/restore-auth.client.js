import { storeToRefs } from 'pinia'

export default defineNuxtPlugin(async () => {
    const auth = useAuthStore()
    const { authInitialized, authenticated } = storeToRefs(auth)

    auth.restoreAuthFromLocalStorage()

    if (authenticated.value) {
        await auth.fetchUserData()
    }

    authInitialized.value = true
})
