import { useAuthStore } from "~/stores/auth.js";

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, currentUser } = storeToRefs(useAuthStore());
    const { logUserOut } = useAuthStore();
    const token = useCookie('token');

    if (process.client && token.value) {
        authenticated.value = true;
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            currentUser.value = JSON.parse(storedUserData);
        }
    }

    if (!token.value && to.path.startsWith('/profile')) {
        return navigateTo('/');
    }

});