import { useAuthStore } from "~/stores/auth.js";

export default defineNuxtRouteMiddleware((to) => {
    const { authenticated, currentUser } = storeToRefs(useAuthStore());
    const { logUserOut } = useAuthStore();
    const token = useCookie('token');
    const locale = useCookie('locale');

    if (process.client && token.value) {
        authenticated.value = true;
        const storedUserData = localStorage.getItem('currentUser');
        if (storedUserData) {
            currentUser.value = JSON.parse(storedUserData);
        }
    }

    console.log("`${locale}/profile`", locale.value)


    if (!token.value && to.path.startsWith(`${locale}/profile`)) {
        return navigateTo('/');
    }

});