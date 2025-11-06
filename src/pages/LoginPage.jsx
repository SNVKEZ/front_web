import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await loginUser({ username, password });
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Неверный логин или пароль");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-purple-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-96"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Вход</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          type="text"
          placeholder="Логин"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border w-full p-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full p-2 mb-6 rounded"
          required
        />

        <button
          type="submit"
          className="bg-purple-600 text-white w-full py-2 rounded hover:bg-purple-700 transition"
        >
          Войти
        </button>

        <p className="text-sm text-center mt-4">
          Нет аккаунта?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-700 cursor-pointer hover:underline"
          >
            Зарегистрироваться
          </span>
        </p>
      </form>
    </div>
  );
}
