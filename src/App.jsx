import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";
import PageSkeleton from "./components/PageSkeleton";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const OrdersPage = React.lazy(() => import("./pages/OrdersPage"));
const ProductPage = React.lazy(() => import("./pages/ProductPage"));

function ViewTransitionLayout() {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    if (!document.startViewTransition) {
      setCurrentPage(location.pathname);
      return;
    }
  }, [location.pathname]);

  return (
    <div style={{ viewTransitionName: "page" }}>
      <Outlet key={currentPage} />
    </div>
  );
}

const prefetch = (loader) => loader();

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const hideNav = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col bg-purple-100">

      {!hideNav && token && (
        <NavBar
          onHomeHover={() => prefetch(() => import("./pages/HomePage"))}
          onCartHover={() => prefetch(() => import("./pages/CartPage"))}
          onOrdersHover={() => prefetch(() => import("./pages/OrdersPage"))}
        />
      )}

      <main className="container mx-auto px-4 py-6 flex-1">

        <Suspense fallback={<PageSkeleton />}>
          <Routes>

            <Route element={<ViewTransitionLayout />}>

              <Route
                path="/"
                element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
              />

              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/product/:id"
                element={
                  <ProtectedRoute>
                    <ProductPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrdersPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </Suspense>

      </main>
    </div>
  );
}
