import axios from "axios";

const inventoryAPI = axios.create({
  baseURL: "http://localhost:8084/inventory",
  headers: { "Content-Type": "application/json" },
});

// 🔐 Добавляем токен в каждый запрос
inventoryAPI.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 📦 Получить все товары
export async function fetchProducts() {
  const res = await inventoryAPI.get("/products");
  return res.data;
}

export default inventoryAPI;
