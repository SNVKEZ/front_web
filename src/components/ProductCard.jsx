import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'


export default function ProductCard({ product }) {
const { dispatch } = useCart()
return (
<div className="bg-white border rounded p-4 w-64 m-2 flex flex-col">
<div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">
{product.image ? <img src={product.image} alt={product.name} className="max-h-full" /> : <span>No image</span>}
</div>
<h3 className="font-semibold">{product.name}</h3>
<p className="text-sm text-gray-600">{product.description?.slice(0, 80)}</p>
<div className="mt-auto pt-4 flex items-center justify-between">
<div className="font-bold">${product.price?.toFixed(2) ?? '0.00'}</div>
<div className="flex gap-2">
<Link to={`/product/${product.id}`} className="text-sm underline">View</Link>
<button onClick={() => dispatch({ type: 'ADD', payload: product })} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Add</button>
</div>
</div>
</div>
)
}