import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'viewed_products'

const viewed = ref([])

export const useViewedProducts = () => {
    const load = () => {
        const raw = localStorage.getItem(STORAGE_KEY)
        viewed.value = raw ? JSON.parse(raw) : []
    }

    const addProductToViewed = (product) => {
        if (!product?._id) return

        if (!viewed.value.length) load()

        viewed.value = viewed.value.filter(p => p._id !== product._id)

        viewed.value.unshift(product)

        if (viewed.value.length > 10) viewed.value = viewed.value.slice(0, 10)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(viewed.value))
    }

    const clearViewed = () => {
        viewed.value = []
        localStorage.removeItem(STORAGE_KEY)
    }

    const removeProductFromViewedAndRedirect = async (id) => {
        if (process.client) {
            const router = useRouter()
            const viewed = JSON.parse(localStorage.getItem('viewed_products') || '[]')
            const updated = viewed.filter(p => p._id !== id)
            localStorage.setItem('viewed_products', JSON.stringify(updated))
            await router.push('/')
        }
    }

    onMounted(load)

    return {
        viewed,
        addProductToViewed,
        clearViewed,
        removeProductFromViewedAndRedirect
    }
}
