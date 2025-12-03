import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import { fetchProducts } from "../api/inventoryApi";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const total = state.items.reduce((s, i) => s + i.price * i.qty, 0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [conflictItem, setConflictItem] = useState(null);

  const validateStockFromServer = async () => {
    try {
      const products = await fetchProducts(); 

      const serverMap = {};
      for (const p of products) serverMap[p.id] = p.quantity;

      for (const item of state.items) {
        const serverQty = serverMap[item.id];

        if (serverQty === undefined) continue;

        if (item.qty > serverQty) {
          setConflictItem({
            ...item,
            serverQty,  
          });
          return false;
        }
      }

      return true;
    } catch (err) {
      console.error("Ошибка проверки остатков:", err);
      setError("Не удалось получить данные склада");
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (state.items.length === 0) return;

    setError("");

    const ok = await validateStockFromServer();
    if (!ok) return;

    setLoading(true);

    try {
      for (const item of state.items) {
        await createOrder({
          product: item.name,
          quantity: item.qty,
        });
      }

      dispatch({ type: "CLEAR" });
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Ошибка при оформлении заказа");
    } finally {
      setLoading(false);
    }
  };

  const handleConflictFixKeepAvailable = () => {
    dispatch({
      type: "SET_QTY",
      payload: { id: conflictItem.id, qty: conflictItem.serverQty },
    });
    setConflictItem(null);
  };

  const handleConflictFixRemove = () => {
    dispatch({ type: "REMOVE", payload: conflictItem.id });
    setConflictItem(null);
  };

  return (
    <div className="bg-purple-50 p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-purple-800">Корзина</h1>

      {conflictItem && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-bold mb-2 text-red-600">
              Недостаточно товара
            </h2>
            <p className="text-gray-700 mb-4">
              Доступно только{" "}
              <b>{conflictItem.serverQty}</b> шт. товара{" "}
              <b>{conflictItem.name}</b>.
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleConflictFixKeepAvailable}
                className="bg-blue-600 text-white px-3 py-2 rounded w-full"
              >
                Оставить доступное
              </button>
              <button
                onClick={handleConflictFixRemove}
                className="bg-red-600 text-white px-3 py-2 rounded w-full"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {state.items.length === 0 ? (
        <div>
          <p className="text-gray-600 mb-4">Ваша корзина пуста.</p>
          <Link to="/home" className="text-purple-700 underline">
            Вернуться к покупкам
          </Link>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-4 rounded-xl">
              {state.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between border-b py-3 transition ${
                    loading ? "opacity-50 pointer-events-none" : ""
                  }`}
                >
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.price.toFixed(2)} ₽
                    </div>
                    <div className="text-xs text-gray-500">
                      В корзине: {item.qty}
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
                          payload: {
                            id: item.id,
                            qty: Number(e.target.value),
                          },
                        })
                      }
                      className="w-16 border rounded px-2 py-1"
                    />

                    <button
                      onClick={() =>
                        dispatch({ type: "REMOVE", payload: item.id })
                      }
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

              {error && (
                <div className="text-red-500 mb-2 text-sm">{error}</div>
              )}

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Оформление...</span>
                  </>
                ) : (
                  "Оформить заказ"
                )}
              </button>
            </aside>
          </div>
        </>
      )}
    </div>
  );
}
