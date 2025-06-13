import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth.js"
import {matchPathPrefix} from "~/utils/index.js";

export default defineNuxtRouteMiddleware((to) => {
    const {isAuthenticated, authInitialized} = storeToRefs(useAuthStore());

    if (!authInitialized.value) {
        return
    }

    if (!isAuthenticated.value && matchPathPrefix(to.path, '/profile')) {
        return navigateTo(`/`)
    }

     if (isAuthenticated.value && matchPathPrefix(to.path, '/auth')) {
        return navigateTo(`/`)
    }

})
