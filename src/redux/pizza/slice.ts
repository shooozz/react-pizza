import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { API_KEY, url } from '../store'

import { FetchPizzasArgs, Pizza, Status } from './types'

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

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
