import { configureStore } from '@reduxjs/toolkit'

import filter from './slices/filterSlice'
import offset from './slices/offsetSlice'

export const store = configureStore({
    reducer: {
        filter,
        offset
    }
})
