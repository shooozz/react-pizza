import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 0,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload
        },
        setSort(state, action) {
            state.sort = action.payload
        },
        setPageCount(state, action) {
            state.pageCount = action.payload
        },
        setFilters(state, action) {
            state.pageCount = Number(action.payload.pageCount)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const selectSort = state => state.filter.sort

export const selectFilter = state => state.filter

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
