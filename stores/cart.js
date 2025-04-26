import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const cartProducts = ref([])

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
        const existingProduct =  cartProducts.value.find(item => item._id === product._id)
        if (!existingProduct) {
            cartProducts.value.push({...product, quantity: 1})
            return;
        }
        existingProduct.quantity += 1
    }

    function removeFromCart(productId) {
        cartProducts.value = cartProducts.value.filter((p) => p._id !== productId)
    }


    return {
        cartProducts,
        cartCount,
        cartTotalPrice,
        addToCart,
        getCartProducts,
        removeFromCart
    }
})
