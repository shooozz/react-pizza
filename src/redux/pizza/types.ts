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
