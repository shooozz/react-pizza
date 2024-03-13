import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'

const Home = () => {
    const [pizzasData, setPizzasData] = React.useState([])
    const [isLoaded, setIsLoaded] = React.useState(true)

    React.useEffect(() => {
        fetch('https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza', {
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
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
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
