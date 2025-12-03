import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProducts } from '../api/inventoryApi'
import { useCart } from '../context/CartContext'
import Loader from '../components/Loader'


export default function ProductPage(){
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const { dispatch } = useCart()


useEffect(() => {
setLoading(true)
fetchProduct(id)
.then(d => setProduct(d))
.catch(e => setError(e.message || 'Failed'))
.finally(() => setLoading(false))
}, [id])


if (loading) return <Loader />
if (error) return <div className="text-red-600">{error}</div>
if (!product) return <div>Product not found</div>


return (
<div className="grid md:grid-cols-3 gap-6">
<div className="md:col-span-2 bg-white p-4 rounded">
<div className="h-96 bg-gray-100 flex items-center justify-center">{product.image ? <img src={product.image} alt={product.name} /> : 'No image'}</div>
</div>
<div className="bg-white p-4 rounded">
<h1 className="text-2xl font-bold">{product.name}</h1>
<p className="mt-2 text-gray-700">{product.description}</p>
<div className="mt-4 font-bold text-xl">${product.price?.toFixed(2)}</div>
<div className="mt-4">
<button onClick={() => dispatch({ type: 'ADD', payload: product })} className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>
<Link to="/cart" className="ml-4 underline">Go to cart</Link>
</div>
</div>
</div>
)
}