import {defineStore} from 'pinia'
import {ref, computed, watch, onMounted} from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartProducts = ref([])

    onMounted(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('cartProducts')) {
            cartProducts.value = JSON.parse(sessionStorage.getItem('cartProducts'))
        }
    })

    const cartCount = computed(() => {
        return cartProducts.value.reduce((acc, item) => {
            return acc + item.quantity
        }, 0)
    })

    const getCartProducts = computed(() => cartProducts.value)

    const cartTotalPrice = computed(() =>
        cartProducts.value.reduce(
            (total, product) => total + product.price * product.quantity,
            0
        )
    )

    const addToCart = (product) => {
        const existingProduct = cartProducts.value.find(item => item._id === product._id)
        if (!existingProduct) {
            cartProducts.value.push({...product, quantity: 1})
        } else {
            existingProduct.quantity += 1
        }

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('cartProducts', JSON.stringify(cartProducts.value))
        }
    }

    function removeFromCart(productId) {
        cartProducts.value = cartProducts.value.filter((p) => p._id !== productId)

        if (typeof window !== 'undefined') {
            sessionStorage.setItem('cartProducts', JSON.stringify(cartProducts.value))
        }
    }

    const clearCart = () => {
        cartProducts.value = []

        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('cartProducts')
        }
    }

    return {
        cartProducts,
        cartCount,
        cartTotalPrice,
        addToCart,
        getCartProducts,
        removeFromCart,
        clearCart
    }
})
