import React from 'react'
import { useSelector } from 'react-redux'

import { useAppDispatch } from '../redux/store'

import { selectFilter } from '../redux/filter/selector'
import { fetchPizzas } from '../redux/pizza/slice'
import { selectPizzaData } from '../redux/pizza/selector'

import { Categories, SortPopup, PizzaBlock, Skeleton } from '../components/index'

const Home: React.FC = () => {
    const dispatch = useAppDispatch()

    const { items, status } = useSelector(selectPizzaData)
    const { categoryId, sort, pageCount, searchValue } = useSelector(selectFilter)
    const isSearch = React.useRef(false)

    const sortType = sort.sortProperty

    const sortOrder = sortType.includes('-') ? 'desc' : 'asc'
    const sortBy = sortType.replace('-', '')
    const sortUrl = `&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`

    const fetchByCategoryId = `filterByFormula=%7Bcategory%7D%3D${categoryId}${sortUrl}`

    const categoryFetch = categoryId > 0 ? fetchByCategoryId : sortUrl

    const getPizzas = async () => {
        dispatch(
            // @ts-ignore
            fetchPizzas({ sortBy, sortOrder, searchValue, categoryFetch })
        )
    }

    React.useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
        } else {
            getPizzas()
        }
        isSearch.current = false
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, pageCount])

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
        </>
    )
}

export default Home
