export class Fetch {
    constructor(baseURL, defaultHeaders = {}) {
        this.baseURL = baseURL
        this.defaultHeaders = defaultHeaders
    }

    /**
     * Внутренний метод, реализующий "интерцепторы"
     */
    async request(method, url, { params = {}, data = {}, headers = {}, ...config } = {}) {
        // const token = localStorage.getItem('authToken')
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoiNjdhNGYxMGVjZTMzNDg0MjE5OTUzZTkwIiwiaWF0IjoxNzQ1ODQzNTUxLCJleHAiOjE3NDU5Mjk5NTF9.KjrpmU-AWYQl7makkaNX7yFIheXMaGC5PaDtOqXuxIA'

        const finalHeaders = {
            ...this.defaultHeaders,
            ...headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        }

        try {
            const response = await $fetch(url, {
                baseURL: this.baseURL,
                method,
                headers: finalHeaders,
                params,
                body: ['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) ? data : undefined,
                ...config,
                onRequest({ options }) {
                    console.log('[Fetch] Запрос:', method, url)
                },
                onResponse({ response }) {
                    console.log('[Fetch] Ответ:', response._data)
                },
                onResponseError({ response }) {
                    console.error('[Fetch] Ошибка:', response.status)
                    if (response.status === 401) {
                        window.location.href = '/login'
                    }
                }
            })

            return response
        } catch (error) {
            console.error('[Fetch] Ошибка запроса:', error)
            throw error
        }
    }

    get(url, config = {}) {
        return this.request('GET', url, config)
    }

    post(url, data = {}, config = {}) {
        return this.request('POST', url, { data, ...config })
    }

    put(url, data = {}, config = {}) {
        return this.request('PUT', url, { data, ...config })
    }

    delete(url, config = {}) {
        return this.request('DELETE', url, config)
    }

    setHeaders(headers) {
        this.defaultHeaders = {
            ...this.defaultHeaders,
            ...headers,
        }
    }
}
