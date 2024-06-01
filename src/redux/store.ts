import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import pizza from './pizza/slice'
import filter from './filter/slice'
import cart from './cart/slice'

export const url = 'https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza0'
export const API_KEY = 'pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0'
export const pageSize = 4

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza
    }
})
// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
