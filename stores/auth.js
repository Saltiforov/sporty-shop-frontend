import {defineStore} from 'pinia'
import {getCurrentUser} from "~/services/api/user-service.js";

const routes = {
    login: '/api/admin/login',
    signup: '/api/admin/signup'
}

export const useAuthStore = defineStore('auth', () => {
    const authenticated = ref(false)

    const currentUser = ref({})

    const {$api} = useNuxtApp()

    async function fetchUserData() {
        try {
            const storedUserData = localStorage.getItem('currentUser');
            if (storedUserData) {
                currentUser.value = JSON.parse(storedUserData);
                authenticated.value = true;
            } else {
                const user = await getCurrentUser();
                currentUser.value = user;
                authenticated.value = true;

                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    }

    async function authenticateUser({username, password}) {
        return $api.post(routes.login, {
            username,
            password
        })
            .then(({token: accessToken}) => {
                if (accessToken) {
                    const token = useCookie('token')
                    token.value = accessToken
                    authenticated.value = true
                    setTimeout(() => {
                        fetchUserData()
                    })
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

    async function registerUser({username, email, password, firstName, lastName, phone, address}) {
        return $api.post(routes.signup, {
            username,
            password,
            email,
            firstName,
            lastName,
            phone,
            address,
        })
            .then(async ({token: accessToken}) => {
                if (accessToken) {
                    await authenticateUser({username, password})
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

        // localStorage.removeItem('currentUser');
    }

    return {
        authenticated,
        authenticateUser,
        registerUser,
        logUserOut,
        currentUser
    }
})
