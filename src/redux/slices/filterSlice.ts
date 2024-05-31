import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

export enum SortPropertyEnum {
    RATING_DESC = 'rating',
    RATING_ASC = '-rating',
    TITLE_DESC = 'title',
    TITLE_ASC = '-title',
    PRICE_DESC = 'price',
    PRICE_ASC = '-price'
}

export type SortState = {
    name: string
    sortProperty: SortPropertyEnum
}

export interface FilterSliceState {
    searchValue: string
    categoryId: number
    pageCount: number
    sort: SortState
}

export type SearchPizzaParams = {
    sortBy: string
    order: string
    category: string
    search: string
    currentPage: string
}

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

export const selectSort = (state: RootState) => state.filter.sort

export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setPageCount, setFilters, setSearchValue } = filterSlice.actions

export default filterSlice.reducer
