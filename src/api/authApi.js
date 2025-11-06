import axios from "axios";

const authAPI = axios.create({
  baseURL: "http://localhost:8081/api/auth",
  headers: { "Content-Type": "application/json" },
});

// ✅ Регистрация
export async function registerUser(data) {
  const res = await authAPI.post("/registration", data);
  return res.data;
}

// ✅ Авторизация
export async function loginUser(data) {
  const res = await authAPI.post("/login", data);

  // 🧠 Получаем токен из тела или заголовка
  let token =
    res.data.token ||
    res.data.Authorization ||
    res.data.jwt ||
    res.headers["authorization"];

  if (!token) throw new Error("Токен не получен");

  // 🧹 Убираем префикс Bearer, если есть
  if (token.startsWith("Bearer ")) {
    token = token.substring(7);
  }

  // 💾 Сохраняем токен под ключом "token"
  localStorage.setItem("token", token);

  return token;
}

export default authAPI;
