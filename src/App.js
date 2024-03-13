import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './NotFound'
import Header from './components/Header'
import Cart from './pages/Cart'
// import pizzasData from './assets/pizzas.json'

import './scss/app.scss'

function App() {
    // React.useEffect(() => {
    //     setPizzasData(
    //         allDataAirTable.map((item, index) => {
    //             let data = item.fields
    //             data['types'] = JSON.parse(data.types)
    //             data['sizes'] = JSON.parse(data.sizes)
    //             return data
    //         }),
    //     )
    // }, [allDataAirTable])

    return (
        <div className="wrapper">
            <Header />
            <div className="content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default App

// AirTable
// pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0
// appeSnv5U5vIOIJCq
