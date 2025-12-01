import axios from "axios";

const authAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
  headers: { "Content-Type": "application/json" },
});

export async function registerUser(data) {
  const res = await authAPI.post("/registration", data);
  return res.data;
}

export async function loginUser(data) {
  const res = await authAPI.post("/login", data);

  let token =
    res.data.token ||
    res.data.Authorization ||
    res.data.jwt ||
    res.headers["authorization"];

  if (!token) throw new Error("Токен не получен");

  if (token.startsWith("Bearer ")) {
    token = token.substring(7);
  }

  localStorage.setItem("token", token);
  return token;
}

export default authAPI;
