export type CartItemState = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    sizes: number
    count: number
}

export interface CartSliceState {
    totalPrice: number
    totalCount: number
    items: CartItemState[]
}
