import React from 'react'

import Header from './components/Header'
import Categories from './components/Categories'
import Sort from './components/Sort'
import PizzaBlock from './components/PizzaBlock'
// import pizzasData from './assets/pizzas.json'

import './scss/app.scss'

function App() {
    const [pizzasData, setPizzasData] = React.useState([])
    const [allDataAirTable, setallDataAirTable] = React.useState([])

    React.useEffect(() => {
        fetch('https://api.airtable.com/v0/appeSnv5U5vIOIJCq/reactPizza', {
            headers: {
                Authorization:
                    'Bearer pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0',
            },
        })
            .then(response => response.json())
            .then(data => setallDataAirTable(data['records']))
    }, [])
    React.useEffect(() => {
        setPizzasData(
            allDataAirTable.map((item, index) => {
                let data = item.fields
                data['types'] = JSON.parse(data.types)
                data['sizes'] = JSON.parse(data.sizes)
                return data
            }),
        )
    }, [allDataAirTable])

    console.log(pizzasData)
    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories />
                        <Sort />
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {pizzasData.map(pizzaObj => (
                            <PizzaBlock {...pizzaObj} key={pizzaObj['id']} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App

// AirTable
// pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0
// appeSnv5U5vIOIJCq
