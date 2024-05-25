import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import NotFound from './components/NotFound'
import Header from './components/Header'
import Cart from './pages/Cart'

import './scss/app.scss'
function App() {
    return (
        <div className='wrapper'>
            <Header />
            <div className='content'>
                <div className='container'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/cart' element={<Cart />} />
                        <Route path='*' element={<NotFound />} />
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
