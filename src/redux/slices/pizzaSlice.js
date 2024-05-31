import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { url, API_KEY } from '../store'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
    // const state = thunkApi.getState()
    // const { categoryId } = state.filter
    // console.log(state)
    const { sortBy, sortOrder, searchValue, categoryFetch } = params
    const fetchSearch = `${url}?sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`

    const { data } = await axios.get(searchValue ? fetchSearch : `${url}?${categoryFetch}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    return data
})

const initialState = {
    items: [],
    status: 'loading' //loading | succes | error
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
                state.status = 'loading'
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = 'success'
            })
            .addCase(fetchPizzas.rejected, state => {
                state.status = 'error'
                state.items = []
            })
    }
})

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
