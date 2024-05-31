import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

export type CartItemState = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    sizes: number
    count: number
}

interface CartSliceState {
    totalPrice: number
    totalCount: number
    items: CartItemState[]
}

const initialState: CartSliceState = {
    items: [],
    totalPrice: 0,
    totalCount: 0
}

const calculateTotalPrice = (items: CartItemState[]) => items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
const calculateTotalCount = (items: CartItemState[]) => items.reduce((sum, item) => sum + item.count, 0)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemState>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({ ...action.payload, count: 1 })
            }
            state.totalPrice = calculateTotalPrice(state.items)
            state.totalCount = calculateTotalCount(state.items)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
                if (findItem.count === 0) {
                    state.items = state.items.filter(obj => obj.id !== action.payload)
                }
            }
            state.totalPrice = calculateTotalPrice(state.items)
            state.totalCount = calculateTotalCount(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = calculateTotalPrice(state.items)
            state.totalCount = calculateTotalCount(state.items)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
            state.totalCount = 0
        }
    }
})

export const selectCart = (state: RootState) => state.cart

export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(obj => Number(obj.id) === id)

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
