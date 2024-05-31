import { configureStore } from '@reduxjs/toolkit'

import offset from './slices/offsetSlice'
import pizza from './slices/pizzaSlice'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'

export const url = 'https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza0'
export const API_KEY = 'pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0'
export const pageSize = 4

export const store = configureStore({
    reducer: {
        filter,
        offset,
        cart,
        pizza
    }
})
