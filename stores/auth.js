import { defineStore } from 'pinia'

const routes = {
    login: '/api/admin/login',
    signup: '/api/admin/signup'
}

export const useAuthStore = defineStore('auth', () => {
    const authenticated = ref(false)

    const { $api } = useNuxtApp()

    async function authenticateUser({ username, password }) {
        return $api.post(routes.login, {
            username,
            password
        })
            .then(({ token: accessToken }) => {
                if (accessToken) {
                    const token = useCookie('token')
                    token.value = accessToken
                    authenticated.value = true
                } else {
                    authenticated.value = false
                    throw new Error('Invalid login credentials')
                }
            })
            .catch(error => {
                console.error("Login error:", error)
                throw error
            })
    }

    async function registerUser({ username, email, password, firstName, lastName, phone, address }) {
        return $api.post(routes.signup, {
            username,
            password,
            email,
            firstName,
            lastName,
            phone,
            address,
        })
            .then(async ({ token: accessToken }) => {
                if (accessToken) {
                    await authenticateUser({ username, password })
                    authenticated.value = true
                } else {
                    authenticated.value = false
                    throw new Error('Registration failed')
                }
            })
            .catch(error => {
                console.error("Registration error:", error)
                throw error
            })
    }

    function logUserOut() {
        const token = useCookie('token')
        token.value = null
        authenticated.value = false
    }

    return {
        authenticated,
        authenticateUser,
        registerUser,
        logUserOut
    }
})
