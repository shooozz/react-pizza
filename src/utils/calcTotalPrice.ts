import { CartItemState } from '../redux/cart/types'

export const calculateTotalPrice = (items: CartItemState[]) => {
    return items.reduce((sum, item) => sum + item.count, 0)
}
