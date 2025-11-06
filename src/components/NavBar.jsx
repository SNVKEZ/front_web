// src/components/Navbar.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCart(); // 🛒 получаем данные корзины

  // ❌ Не показываем navbar на /login и /register
  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const cartCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3 mb-6">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-purple-600 font-bold text-lg">
          Online Store
        </Link>
        <Link
          to="/home"
          className={`hover:text-purple-600 ${
            location.pathname === "/home" ? "text-purple-700 font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/cart"
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
        </Link>
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
