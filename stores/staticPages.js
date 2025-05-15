import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStaticPages = defineStore('static-pages', () => {
    const staticPages = ref([])

    function setPages(pages) {
        staticPages.value = pages
    }

    const getCurrentPage = (slug) => {
        return staticPages.value.find(page => page.slug === slug)
    }


    return {
        setPages,
        getCurrentPage
    }
})
