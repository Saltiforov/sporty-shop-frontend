export const calculateTotal = (items, useDiscount = true) => {
    console.log("calculateTotal", items)
    if (Array.isArray(items)) {
        return items.reduce((total, item) => {
            const price = useDiscount ? (item.discountPrice || item.discount) ?? item.price : item.price
            return total + price * item.quantity
        }, 0)
    }
    const price = useDiscount ? items.discount ?? items.price : items.price
    return price * items.quantity
}

export const addProductToCart = (array, product) => {
    const existItem = array.value.find(item => item._id === product._id)
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

export function formatDateToDMY(isoDate) {
    const date = new Date(isoDate)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы от 0 до 11
    const year = date.getFullYear()

    return `${day}.${month}.${year}`
}

export function mapOrdersToSummaries(orders) {
    return orders.map(order => {
        const shipping = order.shippingAddress || {}

        const products = (order.products || []).map(item => {
            const product = item.product || {}

            return {
                image: fullImageUrls(product.images)[0] || '',
                name: product.name || '',
                quantity: item.quantity || 0,
                price: product.price || 0,
                id: product._id || '',
                discountPrice: product.discount || product.price || 0
            }
        })


        return {
            id: order._id || '',
            orderNumber: order.orderNumber || '',
            status: order.orderStatus || '',
            firstName: shipping.firstName || '',
            lastName: shipping.lastName || '',
            phone: shipping.phone || '',
            email: shipping.email || '',
            userInfo: {
                firstName: shipping.firstName || '',
                lastName: shipping.lastName || '',
                email: shipping.email || '',
                phone: shipping.phone || '',
                address: formatAddress(shipping),
                deliveryComment: shipping.note || ''
            },
            products
        }
    })
}

function formatAddress(address) {
    const parts = [address.street, address.city, address.country].filter(Boolean)
    return parts.join(', ')
}

export function capitalizeFirstLetter(str) {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}
