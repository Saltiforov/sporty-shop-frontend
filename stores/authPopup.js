import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthPopup = defineStore('authPopup', () => {
    const isShow = ref(true)
    const popupType = ref('login') // просто строка без типов

    function open(type = 'login') {
        isShow.value = true
        popupType.value = type
    }

    function close() {
        isShow.value = false
    }

    function setType(type) {
        popupType.value = type
    }

    return {
        isShow,
        popupType,
        open,
        close,
        setType,
    }
})
