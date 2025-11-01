import React from 'react'
export default function CartPage(){
const { state, dispatch } = useCart()
const navigate = useNavigate()
const total = state.items.reduce((s,i)=> s + (i.price || 0) * i.qty, 0)


return (
<div>
<h1 className="text-2xl font-bold mb-4">Cart</h1>
{state.items.length === 0 ? (
<div>
<p>Your cart is empty.</p>
<Link to="/" className="underline">Continue shopping</Link>
</div>
) : (
<div className="grid md:grid-cols-3 gap-6">
<div className="md:col-span-2 bg-white p-4 rounded">
{state.items.map(item => (
<div key={item.id} className="flex items-center justify-between border-b py-3">
<div>
<div className="font-semibold">{item.name}</div>
<div className="text-sm text-gray-600">${item.price?.toFixed(2)}</div>
</div>
<div className="flex items-center gap-2">
<input type="number" value={item.qty} min={1} onChange={(e)=> dispatch({ type: 'SET_QTY', payload: { id: item.id, qty: Number(e.target.value) } })} className="w-20 border rounded px-2 py-1" />
<button onClick={()=> dispatch({ type: 'REMOVE', payload: item.id })} className="text-red-600">Remove</button>
</div>
</div>
))}
</div>
<aside className="bg-white p-4 rounded">
<div className="font-semibold">Summary</div>
<div className="mt-2">Total: <span className="font-bold">${total.toFixed(2)}</span></div>
<div className="mt-4">
<button onClick={()=> navigate('/checkout')} className="bg-green-600 text-white px-4 py-2 rounded">Checkout</button>
</div>
</aside>
</div>
)}
</div>
)
}