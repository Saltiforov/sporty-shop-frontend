import {useStaticPages} from "~/stores/staticPages.js";

export const useStaticInformation = () => {
    const staticPagesStore = useStaticPages()
    const route = useRoute()

    const staticInformation = ref([])

    const pageSlug = computed(() => {
        const segments = route.fullPath.split('/')
        const filtered = segments.filter(Boolean)
        return filtered[filtered.length - 1] || null
    })

    onMounted(() => {
        staticInformation.value = staticPagesStore.getCurrentPage(pageSlug.value)
    })

    return {
        staticInformation,
    }
}