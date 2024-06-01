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
