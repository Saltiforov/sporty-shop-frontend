import { storeToRefs } from "pinia"
import { useAuthStore } from "~/stores/auth.js"
import {matchPathPrefix} from "~/utils/index.js";

export default defineNuxtRouteMiddleware((to) => {
    const {isAuthenticated, authenticated} = storeToRefs(useAuthStore());

    if (!isAuthenticated.value && matchPathPrefix(to.path, '/profile')) {
        return navigateTo(`/`)
    }

     if (isAuthenticated.value && matchPathPrefix(to.path, '/auth')) {
        return navigateTo(`/`)
    }

})
