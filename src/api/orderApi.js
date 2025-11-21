export async function createOrder(orderData) {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:8082/orders/create_order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    throw new Error("Ошибка при создании заказа");
  }
  return res.json();
}

export async function fetchOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    "http://localhost:8082/orders/get_orders_by_name",
    {
      method: "GET",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );

  if (!res.ok) {
    throw new Error("Ошибка при получении заказов");
  }
  return res.json();
}
