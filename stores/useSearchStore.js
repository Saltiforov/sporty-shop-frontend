import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
    const searchCallback = ref(null)

    function setSearchCallback(callback) {
        searchCallback.value = callback
    }

    function emitSearch(value) {
        searchCallback.value?.(value)
    }

    return {
        setSearchCallback,
        emitSearch
    }
})
