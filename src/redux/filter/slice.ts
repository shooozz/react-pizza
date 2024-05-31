import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { FilterSliceState, SortPropertyEnum, SortState } from './types'

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    pageCount: 0,
    sort: {
        name: 'популярности',
        sortProperty: SortPropertyEnum.PRICE_DESC
    }
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload
        },
        setSort(state, action: PayloadAction<SortState>) {
            state.sort = action.payload
        },
        setPageCount(state, action: PayloadAction<number>) {
            state.pageCount = action.payload
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            // console.log(action.payload)
            state.pageCount = Number(action.payload.pageCount)
            state.sort = action.payload.sort
            state.categoryId = Number(action.payload.categoryId)
        }
    }
})

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
