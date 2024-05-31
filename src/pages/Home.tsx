import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { pageSize, useAppDispatch } from '../redux/store'

import { setPageCount, setFilters, selectFilter, SearchPizzaParams } from '../redux/slices/filterSlice'
import { FetchPizzasArgs, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice'

import Categories from '../components/Categories'
import SortPopup, { sortOptions } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { fetchOffset, selectOffset } from '../redux/slices/offsetSlice'

let tempCount = 0

const Home: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter)
    const { offset } = useSelector(selectOffset)
    // console.log(offset)

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const sortType = sort.sortProperty

    const sortOrder = sortType.includes('-') ? 'desc' : 'asc'
    const sortBy = sortType.replace('-', '')
    const sortUrl = `&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`

    const fetchByCategoryId = `filterByFormula=%7Bcategory%7D%3D${categoryId}${sortUrl}`
    // const idkCount = offset[3] ? 4 : 3
    const fetchBySortAndPage = `${sortUrl}&pageSize=${pageSize}&offset=${offset[pageCount]}`

    const categoryFetch = categoryId > 0 ? fetchByCategoryId : fetchBySortAndPage

    const getPizzas = async () => {
        dispatch(
            // @ts-ignore
            fetchPizzas({ sortBy, sortOrder, searchValue, categoryFetch })
        )
    }

    const onChangePage = (page: number) => {
        dispatch(setPageCount(page))
    }

    // React.useEffect(() => {
    //     while (tempCount < 3) {
    //         tempCount++
    //         dispatch(
    //             // @ts-ignore
    //             fetchOffset()
    //         )
    //     }
    // }, [])

    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //         const sort = sortOptions.find(obj => obj.sortProperty === params.sortBy)
    //         console.log(params)
    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 pageCount: Number(params.currentPage),
    //                 sort: sort || sortOptions[0]
    //             })
    //         )
    //         isSearch.current = true
    //     }
    // }, [dispatch])
    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        } else {
            getPizzas()
        }
        isSearch.current = false
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, pageCount])

    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId,
    //             pageCount
    //         })
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    // }, [categoryId, sort.sortProperty, pageCount, navigate])

    const skeletons = [...new Array(4)].map((_, index) => (
        <li key={index}>
            <Skeleton />
        </li>
    ))
    const pizzas = items
        ?.filter((pizzaObj: any) => pizzaObj.fields.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map((pizzaObj: any) => <PizzaBlock key={pizzaObj.id} {...pizzaObj.fields} />)

    return (
        <>
            <div className='content__top'>
                <Categories value={categoryId} />
                <SortPopup value={sort} />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>{status === 'success' ? pizzas : skeletons}</div>
            <Pagination onChangePage={onChangePage} />
        </>
    )
}

export default Home
