// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { fetchProducts } from "../api/inventoryApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(`Ошибка загрузки: ${err.message}`);
      }
    };

    loadProducts();
  }, [navigate]);

  if (error)
    return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="bg-purple-50 p-8 rounded-xl shadow">
      <h1 className="text-2xl font-semibold mb-6 text-purple-800">
        Инвентарь
      </h1>
      <table className="w-full bg-white shadow rounded-xl">
        <thead className="bg-purple-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Название</th>
            <th className="p-3 text-left">Количество</th>
            <th className="p-3 text-left">Цена</th>
            <th className="p-3 text-left">Действие</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b hover:bg-purple-50">
              <td className="p-3">{p.id}</td>
              <td className="p-3">{p.product}</td>
              <td className="p-3">{p.quantity}</td>
              <td className="p-3">{p.cost.toFixed(2)} ₽</td>
              <td className="p-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: "ADD",
                      payload: { id: p.id, name: p.product, price: p.cost },
                    })
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded"
                >
                  Добавить в корзину
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
