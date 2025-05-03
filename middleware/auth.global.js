export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated, currentUser } = storeToRefs(useAuthStore());
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

    if (!token.value && to?.name !== '/') {
        abortNavigation();
    }
});
