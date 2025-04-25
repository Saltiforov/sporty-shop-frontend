export const calculateTotal = (items, useDiscount = true) => {
    if (Array.isArray(items)) {
        return items.reduce((total, item) => {
            const price = useDiscount ? item.discount ?? item.price : item.price
            return total + price * item.quantity
        }, 0)
    }
    const price = useDiscount ? items.discount ?? items.price : items.price
    return price * items.quantity
}

export const addProductToCart = (array, product) => {
    const existItem =  array.value.find(item => item._id === product._id)
    if (!existItem) {
        array.value.push({...product, quantity: 1})
        return;
    }
    existItem.quantity += 1
}

export function fullImageUrls(imagesRef) {
    return imagesRef.map((url) =>
        /^https?:\/\//.test(url) ? url : "http://localhost:3000" + url
    )
}