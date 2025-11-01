import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import NavBar from './components/NavBar'


export default function App() {
return (
<div className="min-h-screen flex flex-col">
<NavBar />
<main className="container mx-auto px-4 py-6 flex-1">
<Routes>
<Route path="/" element={<HomePage />} />
<Route path="/product/:id" element={<ProductPage />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/checkout" element={<CheckoutPage />} />
</Routes>
</main>
<footer className="bg-white border-t py-4 text-center">© Online Store</footer>
</div>
)
}