
export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const router = useRouter()


    const token = useCookie('token');

    if (token.value) {

        authenticated.value = true;
        console.log("token.value",token.value)
    }

    if (!token.value && to?.name !== '/') {

        abortNavigation();

        return navigateTo('/')
    }
})