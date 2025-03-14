import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { useState } from "react";
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import ContactUs from "./pages/ContactUs";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { CartProvider } from "./pages/CartContext";
import CartPage from "./components/cart/CartPage";
import ProductsPage from "./pages/ProductsPage";

const Layout = () => {
  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <div>
      <Header cartQuantity={cartQuantity} />
      <Outlet context={{ cartQuantity, setCartQuantity }} />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="payment" element={<Payment />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/product/:id/cart" element={<CartPage />} />
      <Route path="products" element={<ProductsPage />} />
    </Route>
  )
);

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

export default App;
