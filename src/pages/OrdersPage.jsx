import React, { useEffect, useState } from "react";
import { fetchOrders } from "../api/orderApi";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError("Ошибка загрузки заказов");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

 
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;

  return (
    <div className="bg-purple-50 p-8 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6 text-purple-800">Мои заказы</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">Пока нет оформленных заказов.</p>
      ) : (
        <table className="w-full bg-white shadow rounded-xl">
          <thead className="bg-purple-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Продукт</th>
              <th className="p-3 text-left">Количество</th>
              <th className="p-3 text-left">Статус</th>
              <th className="p-3 text-left">Дата</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b hover:bg-purple-50">
                <td className="p-3">{o.id}</td>
                <td className="p-3">{o.product}</td>
                <td className="p-3">{o.quantity}</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3">
                  {new Date(o.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
