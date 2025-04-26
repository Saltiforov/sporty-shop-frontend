import { useRoute, useRouter } from 'vue-router'

export function useQueryParams(queryParamsRef) {
    const route = useRoute()
    const router = useRouter()

    const updateQueryParams = () => {
        router.replace({
            query: {
                ...route.query,
                ...queryParamsRef.value,
            },
        })
    }

    return {
        updateQueryParams,
    }
}
