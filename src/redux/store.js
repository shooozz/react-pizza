import { configureStore } from '@reduxjs/toolkit'

import filter from './slices/filterSlice'
import offset from './slices/offsetSlice'
import cart from './slices/cartSlice'

export const store = configureStore({
    reducer: {
        filter,
        offset,
        cart
    }
})
