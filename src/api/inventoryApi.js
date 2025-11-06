import axios from 'axios'

// Создаём инстанс axios
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8084',
  headers: { 'Content-Type': 'application/json' },
})

// 🔐 Добавляем interceptor, чтобы автоматически подставлять JWT токен
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// ==============================
//      API методы
// ==============================

// Получить все продукты
export async function fetchProducts() {
  const resp = await API.get('/inventory/products')
  return resp.data
}

// Получить один продукт по ID
export async function fetchProduct(id) {
  const resp = await API.get(`/inventory/products/${id}`)
  return resp.data
}

export default API
