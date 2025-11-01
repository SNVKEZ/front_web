import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api/inventoryApi'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'


export default function HomePage(){
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)


useEffect(() => {
setLoading(true)
fetchProducts()
.then(data => setProducts(data || []))
.catch(err => setError(err.message || 'Failed to load'))
.finally(() => setLoading(false))
}, [])


if (loading) return <Loader />
if (error) return <div className="text-red-600">{error}</div>


return (
<div>
<h1 className="text-2xl font-bold mb-4">Products</h1>
<div className="flex flex-wrap">
{products.map(p => <ProductCard key={p.id} product={p} />)}
</div>
</div>
)
}