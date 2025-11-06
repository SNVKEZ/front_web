// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="bg-purple-50 p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Корзина</h1>

      {state.items.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-4">Ваша корзина пуста.</p>
          <Link to="/home" className="text-purple-700 underline">
            Вернуться к покупкам
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white p-4 rounded-xl">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-3"
              >
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600">
                    {item.price.toFixed(2)} ₽
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.qty}
                    min={1}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_QTY",
                        payload: { id: item.id, qty: Number(e.target.value) },
                      })
                    }
                    className="w-16 border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => dispatch({ type: "REMOVE", payload: item.id })}
                    className="text-red-600 hover:underline"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="bg-white p-4 rounded-xl">
            <div className="font-semibold mb-2">Сводка</div>
            <div className="mb-4">
              Итого: <span className="font-bold">{total.toFixed(2)} ₽</span>
            </div>
            <button
              onClick={() => {
                alert("Оформление заказа (заглушка)");
                dispatch({ type: "CLEAR" });
                navigate("/home");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full"
            >
              Оформить заказ
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
