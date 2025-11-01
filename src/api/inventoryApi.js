import axios from 'axios'


const API = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
headers: { 'Content-Type': 'application/json' },
})


export async function fetchProducts() {
const resp = await API.get('/inventory/products')
return resp.data
}


export async function fetchProduct(id) {
const resp = await API.get(`/inventory/products/${id}`)
return resp.data
}