import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './components/NotFound'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza'

import './scss/app.scss'
import MainLayout from './layouts/MainLayout'

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route path='cart' element={<Cart />} />
                <Route path='pizza/:id' element={<FullPizza />} />
                <Route path='*' element={<NotFound />} />
            </Route>
        </Routes>
    )
}

export default App

// AirTable
// pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0
// appeSnv5U5vIOIJCq
