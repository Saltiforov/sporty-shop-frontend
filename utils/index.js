export const calculateTotal = (items, currency = 'uah', useDiscount = true) => {
    if (!Array.isArray(items)) return 0;

    return items.reduce((total, item) => {
        const discountPrice = useDiscount && item.priceAfterDiscount && typeof item.priceAfterDiscount[currency] === 'number'
            ? item.priceAfterDiscount[currency]
            : null;

        const regularPrice = item.price && typeof item.price[currency] === 'number' ? item.price[currency] : 0;

        const priceToUse = discountPrice !== null ? discountPrice : regularPrice;

        return total + priceToUse * (item.quantity || 1);
    }, 0);
};


export function fullImageUrls(imagesRef, size = 'thumb') {
    return imagesRef.map(image => {
        const url = image.variants?.[size];

        if (!url) return null

        return /^https?:\/\//.test(url) ? url : "http://localhost:3000" + url;
    }).filter(Boolean);
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
                image: fullImageUrls(product.images || [])[0] || '',
                name: product.name || '',
                quantity: item.quantity || 0,
                price: product.price || {},
                id: product._id || '',
                discount: product.discount || product.price || {},
                priceAfterDiscount: product.priceAfterDiscount || {},
            }
        })

        return {
            id: order._id || '',
            orderNumber: order.orderNumber || '',
            status: order.orderStatus || '',
            firstName: order.user.firstName || '',
            lastName: order.user.lastName || '',
            phone: order.user.phone || '',
            email: order.user.email || '',
            userInfo: {
                firstName: order.user.firstName || '',
                lastName: order.user.lastName || '',
                email: order.user.email || '',
                phone: order.user.phone || '',
                address: formatAddress(shipping),
                deliveryComment: order.description || ''
            },
            pricing: order.pricing || '',
            currency: order.currency || '',
            createdAt: order.createdAt || '',
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

export const formatRating = (rating) => {
    const num = Number(rating ?? 0);
    return Number.isInteger(num) ? String(num) : num.toFixed(1);
};

export const toInteger = (number) => {
    return Math.floor(number);
}

