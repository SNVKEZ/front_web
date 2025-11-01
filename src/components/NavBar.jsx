import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'


export default function NavBar() {
const { state } = useCart()
const count = state.items.reduce((s, i) => s + i.qty, 0)
return (
<header className="bg-white shadow">
<div className="container mx-auto px-4 py-4 flex items-center justify-between">
<Link to="/" className="font-bold text-xl">Online Store</Link>
<nav className="space-x-4">
<Link to="/">Home</Link>
<Link to="/cart" className="relative">
Cart
{count > 0 && (<span className="ml-2 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded">{count}</span>)}
</Link>
</nav>
</div>
</header>
)
}