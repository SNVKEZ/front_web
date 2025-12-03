import { idbGet, idbSet } from "../utils/idb";

const BASE = import.meta.env.VITE_ORDER_URL;

export async function createOrder(orderData) {
  const token = localStorage.getItem("token");

  if (!navigator.onLine) {
    const err = new Error("offline");
    err.isOffline = true;
    throw err;
  }

  const res = await fetch(`${BASE}/orders/create_order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    let msg;
    try {
      msg = await res.json();
    } catch {
      msg = null;
    }

    return (
      msg || {
        success: false,
        reason: "unknown",
      }
    );
  }

  return res.json();
}

export async function fetchOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE}/orders/get_orders_by_name`, {
    method: "GET",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error("Ошибка при получении заказов");
  }

  return res.json();
}

export async function queueOrder(order) {
  const q = (await idbGet("orderQueue")) || [];
  q.push(order);
  await idbSet("orderQueue", q);
}

export async function processOrderQueue() {
  if (!navigator.onLine) return;

  const queue = (await idbGet("orderQueue")) || [];
  if (queue.length === 0) return;

  const remaining = [];

  for (const order of queue) {
    try {
      const result = await createOrder(order);

      if (!result.success) {
        await idbSet("orderConflict", { order, info: result });
        return;
      }
    } catch (err) {
      if (err.isOffline) {
        remaining.push(order);
      }
    }
  }

  await idbSet("orderQueue", remaining);
}

window.addEventListener("online", () => {
  processOrderQueue();
});
