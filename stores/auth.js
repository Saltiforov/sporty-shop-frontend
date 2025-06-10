import { defineStore } from 'pinia'
import { getCurrentUser } from '~/services/api/user-service.js'

const routes = {
    login: '/api/admin/login',
    signup: '/api/admin/signup'
}

export const useAuthStore = defineStore('auth', () => {
    const authenticated = ref(false)
    const userToken = ref('')
    const currentUser = ref({})

    const setCurrentUser = (user) => {
        currentUser.value = user
    }

    const { $api } = useNuxtApp()

    function restoreAuthFromLocalStorage() {
        const storedToken = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('currentUser')

        if (storedToken) {
            userToken.value = storedToken
            authenticated.value = true
        }

        if (storedUser) {
            currentUser.value = JSON.parse(storedUser)
        }
    }

    async function fetchUserData() {
        try {
            const user = await getCurrentUser()
            currentUser.value = user
            localStorage.setItem('currentUser', JSON.stringify(user))
            authenticated.value = true
        } catch (error) {
            console.error('Error fetching user data:', error)
            authenticated.value = false
            localStorage.removeItem('currentUser')
        }
    }

    async function authenticateUser({ username, password }) {
        return $api
            .post(routes.login, { username, password })
            .then(({ token: accessToken }) => {
                if (accessToken) {
                    userToken.value = accessToken
                    authenticated.value = true
                    localStorage.setItem('authToken', accessToken)
                    fetchUserData()
                } else {
                    authenticated.value = false
                    throw new Error('Invalid login credentials')
                }
            })
            .catch((error) => {
                console.error('Login error:', error)
                throw error
            })
    }

    async function registerUser({ username, email, password, firstName, lastName, phone, address }) {
        return $api
            .post(routes.signup, {
                username,
                password,
                email,
                firstName,
                lastName,
                phone,
                address
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
            .catch((error) => {
                console.error('Registration error:', error)
                throw error
            })
    }

    function logUserOut() {
        userToken.value = null
        authenticated.value = false
        currentUser.value = {}

        localStorage.removeItem('authToken')
        localStorage.removeItem('currentUser')
    }

    const isAuthenticated = computed(() => authenticated.value)

    return {
        authenticated,
        authenticateUser,
        registerUser,
        logUserOut,
        currentUser,
        isAuthenticated,
        userToken,
        setCurrentUser,
        restoreAuthFromLocalStorage,
        fetchUserData
    }
})
