import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'

import './scss/app.scss'

const Cart = React.lazy(() => import('./pages/Cart'))
const FullPizza = React.lazy(() => import('./pages/FullPizza'))
const NotFound = React.lazy(() => import('./components/NotFound'))

function App() {
    return (
        <Routes>
            <Route path='/' element={<MainLayout />}>
                <Route path='' element={<Home />} />
                <Route
                    path='cart'
                    element={
                        <React.Suspense fallback={<div>Идёт загрузка корзины...</div>}>
                            <Cart />
                        </React.Suspense>
                    }
                />
                <Route
                    path='pizza/:id'
                    element={
                        <React.Suspense fallback={<div>Идёт загрузка...</div>}>
                            <FullPizza />
                        </React.Suspense>
                    }
                />
                <Route
                    path='*'
                    element={
                        <React.Suspense fallback={<div>Идёт загрузка....</div>}>
                            <NotFound />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    )
}

export default App

// AirTable
// pat3n4HF2M6n8Yc7t.a2bf9f82332b5826eb455b6800df4dd44ce26d0777881c5352925e057aec86c0
// appeSnv5U5vIOIJCq
