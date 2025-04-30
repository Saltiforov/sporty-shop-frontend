import { defineStore } from 'pinia'

const routes = {
    userList: '/api/login',
    signup: '/api/signup'
}

export const useAuthStore = defineStore('auth', () => {
    const authenticated = ref(false)

    async function authenticateUser({ username, password }) {
        return useFetch('http://localhost:3000/api/admin/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
                username,
                password
            }
        })
            .then(({ data }) => {
                if (data.value && data.value.accessToken) {
                    const token = useCookie('token')
                    token.value = data.value.accessToken
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
        return useFetch('http://localhost:3000/api/admin/signup', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: {
                username,
                password,
                email,
                firstName,
                lastName,
                phone,
                address,
            }
        })
            .then(async ({ data }) => {
                if (data.value) {
                    await authenticateUser({ username, password })
                } else {
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
