const router = {
    products: '/api/client/products',
}

class CacheService {
    static instance = null;
    cache = new Map();
    cacheOrder = new Set(); // Для LRU (Least Recently Used)
    size = 0;
    maxSize = 100; // Максимальный размер кэша
    maxAge = 300000; // Время жизни кэша (5 минут)
    pendingRequests = new Map(); // Хранит выполняющиеся запросы

    constructor(maxSize = 100, maxAge = 300000) {
        if (CacheService.instance) {
            return CacheService.instance;
        }

        this.maxSize = maxSize;
        this.maxAge = maxAge;
        CacheService.instance = this;
    }

    getCacheKey(url, params) {
        const paramString = new URLSearchParams(
            Object.entries(params)
                .filter(([_, value]) => value !== undefined)
                .reduce((acc, [key, value]) => ({ ...acc, [key]: value?.toString() }), {})
        ).toString();
        return `${url}?${paramString}`;
    }

    async getAllProducts(params = {}) {
        const config = useRuntimeConfig();
        const url = `${config.public.apiBase}${router.products}`;

        const cacheKey = this.getCacheKey(url, params);

        if (this.pendingRequests.has(cacheKey)) {
            console.log(`CACHE SERVICE Pending request exists for ${cacheKey}, waiting for it...`);
            return this.pendingRequests.get(cacheKey);
        }

        if (this.cache.has(cacheKey)) {
            const { data, timestamp } = this.cache.get(cacheKey);
            if (Date.now() - timestamp < this.maxAge) {
                console.log(`CACHE SERVICE Returning cached data for ${cacheKey}`);
                return Promise.resolve(data);
            }
            this.cache.delete(cacheKey);
            this.cacheOrder.delete(cacheKey);
            this.size--;
        }

        if (this.size >= this.maxSize) {
            const oldestKey = this.cacheOrder.keys().next().value;
            this.cache.delete(oldestKey);
            this.cacheOrder.delete(oldestKey);
            this.size--;
        }

        console.log(`CACHE SERVICE Fetching data for ${cacheKey}`);
        const request = $fetch(url, {
            params,
            headers: {
                'ngrok-skip-browser-warning': 'true',
            }
        })
            .then((response) => {
                this.cache.set(cacheKey, { data: response, timestamp: Date.now() });
                this.cacheOrder.add(cacheKey);
                this.size++;
                return response;
            })
            .catch((error) => {
                console.error(`CACHE SERVICE Error fetching data for ${cacheKey}:`, error);
                throw error;
            })
            .finally(() => {
                this.pendingRequests.delete(cacheKey);
            });

        this.pendingRequests.set(cacheKey, request);
        return request;
    }

    clearCache() {
        this.cache = new Map();
        this.cacheOrder.clear();
        this.size = 0;
        this.pendingRequests.clear();
    }
}

export const cacheService = new CacheService();