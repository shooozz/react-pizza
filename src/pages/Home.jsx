import React from 'react'
import axios from 'axios'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'

const Home = ({ searchValue, setSearchValue }) => {
    const [pizzasData, setPizzasData] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)
    const [indexCategories, setIndexCategories] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [selectedSort, setSelectedSort] = React.useState({ name: 'популярности', sortProperty: 'rating' })

    const url = 'https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza0'
    const API_KEY = 'pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0'
    const pageSize = 4
    const [offset, setOffset] = React.useState([''])

    React.useEffect(() => {
        setIsLoaded(true)

        const responseHandler = data => {
            setPizzasData(
                data.map(pizzaData => {
                    pizzaData.fields['types'] = JSON.parse(pizzaData.fields.types)
                    pizzaData.fields['sizes'] = JSON.parse(pizzaData.fields.sizes)
                    return pizzaData.fields
                }),
            )
        }

        const offsetHandler = response => {
            if (offset.indexOf(response) !== -1) {
                console.log('Finded')
            } else if (offset.indexOf(response) === -1) {
                setOffset(prevOffset => [...prevOffset, response])
            }
        }

        const sortOrder = selectedSort.sortProperty.includes('-') ? 'desc' : 'asc'
        const sortBy = selectedSort.sortProperty.replace('-', '')
        const categoryFetch =
            indexCategories > 0
                ? `filterByFormula=%7Bcategory%7D%3D${indexCategories}&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`
                : `&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}&pageSize=${pageSize}&offset=${
                      currentPage ? offset[currentPage] : ''
                  }`

        axios({
            method: 'get',
            url: `${
                searchValue
                    ? `${url}?sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`
                    : `${url}?${categoryFetch}`
            }`,
            headers: {
                Authorization: `Bearer ${API_KEY}`,
            },
        }).then(response => {
            console.log(offset)
            offsetHandler(response['data']['offset'])
            responseHandler(response['data']['records'])
            setIsLoaded(false)
        })
        window.scrollTo(0, 0)
    }, [indexCategories, selectedSort, searchValue, currentPage])

    const skeletons = [...new Array(4)].map((_, index) => {
        return (
            <li key={index}>
                <Skeleton />
            </li>
        )
    })
    const pizzas = pizzasData
        .filter(pizzaObj => pizzaObj.title.toLowerCase().includes(searchValue.toLowerCase()))
        .map(pizzaObj => <PizzaBlock {...pizzaObj} key={pizzaObj['id']} />)
    return (
        <>
            <div className="content__top">
                <Categories
                    value={indexCategories}
                    onClickCategory={index => setIndexCategories(index)}
                    onChangeCategory={() => setSearchValue('')}
                />
                <Sort value={selectedSort} onClickSort={index => setSelectedSort(index)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">{isLoaded ? skeletons : pizzas}</div>

            <Pagination
                onChangePage={number => setCurrentPage(number)}
                setIndexCategories={() => setIndexCategories(0)}
            />
        </>
    )
}

export default Home
