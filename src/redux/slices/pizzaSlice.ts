import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { url, API_KEY, RootState } from '../store'

export type Pizza = {
    id: string
    imageUrl: string
    title: string
    types: number[]
    sizes: number[]
    price: number
}

export type FetchPizzasArgs = Record<string, string>

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: Pizza[]
    status: 'loading' | 'success' | 'error'
}

export const fetchPizzas = createAsyncThunk<Pizza[], Record<string, string>>('pizza/fetchPizzasStatus', async (params: FetchPizzasArgs) => {
    const { sortBy, sortOrder, searchValue, categoryFetch } = params
    const fetchSearch = `${url}?sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`

    const { data } = await axios.get(searchValue ? fetchSearch : `${url}?${categoryFetch}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return data.records
})

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING //loading | succes | error
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchPizzas.pending, state => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, state => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

export const selectPizzaData = (state: RootState) => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
