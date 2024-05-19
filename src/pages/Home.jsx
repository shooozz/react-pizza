import React from 'react'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Categories from '../components/Categories'
import Sort, { sortOptions } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { SearchContext } from '../App'
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzaSlice'

import { addOffset } from '../redux/slices/offsetSlice'

const Home = () => {
    const dispatch = useDispatch()

    const { offset } = useSelector(state => state.offset)
    const { items, status } = useSelector(state => state.pizza)

    const { categoryId, sort, pageCount } = useSelector(state => state.filter)

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)
    const navigate = useNavigate()
    const sortType = sort.sortProperty
    const indexCategories = categoryId
    const { searchValue, setSearchValue } = React.useContext(SearchContext)

    const [offsetLoaded, setOffsetLoaded] = React.useState(false)

    const url = 'https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza0'
    const API_KEY = 'pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0'
    const pageSize = 4

    const onChangeCategory = id => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = number => {
        dispatch(setPageCount(number))
    }

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortOptions.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }
    }, [dispatch])

    const sortOrder = sortType.includes('-') ? 'desc' : 'asc'
    const sortBy = sortType.replace('-', '')

    const categoryFetch =
        indexCategories > 0
            ? `filterByFormula=%7Bcategory%7D%3D${indexCategories}&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`
            : `sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}&pageSize=${pageSize}&offset=${pageCount ? offset[pageCount] : ''}`

    const getPizzas = async () => {
        const offsetHandler = response => {
            if (typeof response === 'undefined') {
                setOffsetLoaded(true)
            } else {
                dispatch(addOffset(response))
            }
        }

        dispatch(fetchPizzas({ url, sortBy, sortOrder, searchValue, categoryFetch, API_KEY, offsetLoaded, offsetHandler }))
    }
    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        } else {
            getPizzas()
        }
        isSearch.current = false
        window.scrollTo(0, 0)
    }, [indexCategories, sortType, searchValue, pageCount])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                pageCount
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, pageCount, navigate])

    const skeletons = [...new Array(4)].map((_, index) => (
        <li key={index}>
            <Skeleton />
        </li>
    ))
    const pizzas = items?.records
        ?.filter(pizzaObj => pizzaObj.fields.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizzaObj => <PizzaBlock {...pizzaObj.fields} key={pizzaObj.id} />)

    return (
        <>
            <div className='content__top'>
                <Categories value={indexCategories} onClickCategory={onChangeCategory} onChangeCategory={() => setSearchValue('')} />
                <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>{status === 'success' ? pizzas : skeletons}</div>
            <Pagination onChangePage={onChangePage} setIndexCategories={() => onChangeCategory(0)} />
        </>
    )
}

export default Home
