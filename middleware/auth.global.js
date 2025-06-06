import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth.js"

export default defineNuxtRouteMiddleware((to) => {
    if (process.server) return

    const auth = useAuthStore()
    const { isAuthenticated } = storeToRefs(auth)

    const locale = useCookie('locale')

    if (!isAuthenticated.value && to.path.startsWith(`${locale.value}/profile`)) {
        return navigateTo('/')
    }

    if (isAuthenticated.value && to.path.startsWith(`${locale.value}/auth/`)) {
        return navigateTo('/')
    }

    console.log("auth.isAuthenticated", isAuthenticated.value)
})
