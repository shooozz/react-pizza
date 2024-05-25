import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
    const { url, sortBy, sortOrder, searchValue, categoryFetch, API_KEY } = params
    const { data } = await axios.get(
        searchValue ? `${url}?sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}` : `${url}?${categoryFetch}`,
        {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        }
    )
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
