import {useAuthStore} from "~/stores/auth.js";

export default defineNuxtRouteMiddleware((to, from) => {
    const {authenticated, currentUser} = storeToRefs(useAuthStore());
    const {logUserOut} = useAuthStore();
    const token = useCookie('token');

    if (process.client) {
        if (token.value) {
            authenticated.value = true;
            const storedUserData = localStorage.getItem('currentUser');
            if (storedUserData) {
                currentUser.value = JSON.parse(storedUserData);
            }
        }
    }


    if (!token.value && to.fullPath === '/profile') {
        return navigateTo('/')
    }

    // if (!token.value) {
    //     logUserOut()
    // }
});
