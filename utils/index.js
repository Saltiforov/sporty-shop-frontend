export const calculateTotal = (items, useDiscount = true) => {
    if (Array.isArray(items)) {
        return items.reduce((total, item) => {
            const price = useDiscount ? item.discountPrice ?? item.price : item.price
            return total + price * item.quantity
        }, 0)
    }
    const price = useDiscount ? items.discountPrice ?? items.price : items.price
    return price * items.quantity
}