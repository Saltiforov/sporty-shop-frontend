
export default defineNuxtRouteMiddleware((to, from) => {
    const { authenticated } = storeToRefs(useAuthStore());
    const router = useRouter()


    const token = useCookie('token');

    if (token.value) {

        authenticated.value = true;

    }

    if (!token.value) {

    }
})