import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [pizzasData, setPizzasData] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)
    const [indexCategories, setIndexCategories] = React.useState(0)
    const [selectedSort, setSelectedSort] = React.useState({ name: 'популярности', sortProperty: 'rating' })
    console.log(selectedSort)
    React.useEffect(() => {
        setIsLoaded(true)

        const sortOrder = selectedSort.sortProperty.includes('-') ? 'desc' : 'asc'
        const sortBy = selectedSort.sortProperty.replace('-', '')
        const categoryFetch =
            indexCategories > 0
                ? `filterByFormula=%7Bcategory%7D%3D${indexCategories}&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`
                : `&sort%5B0%5D%5Bfield%5D=${sortBy}&sort%5B0%5D%5Bdirection%5D=${sortOrder}`

        fetch(`https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza?${categoryFetch}`, {
            headers: {
                Authorization:
                    'Bearer pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0',
            },
        })
            .then(response => response.json())
            .then(data => (data = data['records']))
            .then(data => {
                setPizzasData(
                    data.map(pizzaData => {
                        pizzaData.fields['types'] = JSON.parse(pizzaData.fields.types)
                        pizzaData.fields['sizes'] = JSON.parse(pizzaData.fields.sizes)
                        return pizzaData.fields
                    }),
                )
                setIsLoaded(false)
            })
        window.scrollTo(0, 0)
    }, [indexCategories, selectedSort])
    return (
        <>
            <div className="content__top">
                <Categories value={indexCategories} onClickCategory={index => setIndexCategories(index)} />
                <Sort value={selectedSort} onClickSort={index => setSelectedSort(index)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? [...new Array(6)].map((_, index) => {
                          return (
                              <li key={index}>
                                  <Skeleton />
                              </li>
                          )
                      })
                    : pizzasData.map(pizzaObj => <PizzaBlock {...pizzaObj} key={pizzaObj['id']} />)}
            </div>
        </>
    )
}

export default Home
