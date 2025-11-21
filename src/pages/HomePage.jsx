import { useEffect, useState } from "react";
import { fetchProducts } from "../api/inventoryApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

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
      <div className="flex flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={{
            id: product.id,
            name: product.product,  // маппим поле product -> name
            price: product.cost,    // маппим cost -> price
            description: product.description,
            image: product.image
          }} />
        ))}
      </div>
    </div>
  );
}
