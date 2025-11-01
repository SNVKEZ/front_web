import React, { createContext, useReducer, useContext } from 'react'


const CartContext = createContext()


const initialState = { items: [] }


function reducer(state, action) {
switch (action.type) {
case 'ADD': {
const existing = state.items.find(i => i.id === action.payload.id)
if (existing) {
return {
...state,
items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i)
}
}
return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
}
case 'REMOVE':
return { ...state, items: state.items.filter(i => i.id !== action.payload) }
case 'SET_QTY':
return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) }
case 'CLEAR':
return initialState
default:
return state
}
}


export function CartProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initialState)
return (
<CartContext.Provider value={{ state, dispatch }}>
{children}
</CartContext.Provider>
)
}


export function useCart() { return useContext(CartContext) }