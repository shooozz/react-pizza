import { CartItemState } from '../redux/cart/types'

export const calculateTotalCount = (items: CartItemState[]) => {
    return items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
}
