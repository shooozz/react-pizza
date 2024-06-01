import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { getCartFromLS } from '../../utils/getCartFromLS'
import { calculateTotalPrice } from '../../utils/calcTotalPrice'
import { calculateTotalCount } from '../../utils/calcTotalCount'

import { CartItemState, CartSliceState } from './types'

const { items, totalPrice, totalCount } = getCartFromLS()

const initialState: CartSliceState = {
    items,
    totalPrice,
    totalCount
}

// const calculateTotalPrice = (items: CartItemState[]) => items.reduce((sum, obj) => obj.price * obj.count + sum, 0)
// const calculateTotalCount = (items: CartItemState[]) => items.reduce((sum, item) => sum + item.count, 0)

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

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer
