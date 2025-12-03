import React from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import VTLink from "./VTLink";

const prefetchHome = () => import("../pages/HomePage");
const prefetchCart = () => import("../pages/CartPage");
const prefetchOrders = () => import("../pages/OrdersPage");

const addResourceHint = (rel, href) => {
  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
};

const prerender = (url) => addResourceHint("prerender", url);

const prefetch = (url) => addResourceHint("prefetch", url);

export default function NavBar() {
  const location = useLocation();
  const { state } = useCart();

  if (["/login", "/register"].includes(location.pathname)) return null;

  const cartCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  const doPrefetch = (importer, url) => {
    importer();     
    prefetch(url);  
    prerender(url);  
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; 
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3 mb-6">
      <div className="flex items-center space-x-6">
        
        <VTLink to="/" className="text-purple-600 font-bold text-lg">
          Online Store
        </VTLink>

        <VTLink
          to="/home"
          onMouseEnter={() => doPrefetch(prefetchHome, "/home")}
          className={`hover:text-purple-600 ${
            location.pathname === "/home" ? "text-purple-700 font-semibold" : ""
          }`}
        >
          Home
        </VTLink>

        <VTLink
          to="/orders"
          onMouseEnter={() => doPrefetch(prefetchOrders, "/orders")}
          className={`hover:text-purple-600 ${
            location.pathname === "/orders" ? "text-purple-700 font-semibold" : ""
          }`}
        >
          Orders
        </VTLink>

        <VTLink
          to="/cart"
          onMouseEnter={() => doPrefetch(prefetchCart, "/cart")}
          className={`hover:text-purple-600 flex items-center ${
            location.pathname === "/cart" ? "text-purple-700 font-semibold" : ""
          }`}
        >
          Cart
          {cartCount > 0 && (
            <span className="ml-1 bg-purple-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
              {cartCount}
            </span>
          )}
        </VTLink>
      </div>

      <button
        onClick={handleLogout}
        className="bg-purple-500 text-white px-4 py-1 rounded hover:bg-purple-600"
      >
        Logout
      </button>
    </nav>
  );
}
