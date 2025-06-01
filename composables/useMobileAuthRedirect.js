import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

export function useMobileAuthRedirect() {
    const router = useRouter()

    onBeforeMount(() => {
        if (typeof window !== 'undefined') {
            const isMobile = window.innerWidth < 500
            const currentUserRaw = localStorage.getItem('currentUser')

            const currentUser = currentUserRaw && currentUserRaw.trim() !== '' ? currentUserRaw : null

            if (isMobile && currentUser) {
               return navigateTo('/')
            }
        }
    })
}
