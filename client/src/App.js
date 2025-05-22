import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  useLocation,
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
import AdminDashboard from "./pages/AdminDashboard";
import CustomerLogin from "./pages/CustomerLogin";
import ManageProducts from "./pages/seller/ManageProducts";
import AddProduct from "./pages/seller/AddProduct";
import Users from "./pages/seller/Users";

// Layout with conditional Header/Footer
const Layout = () => {
  const location = useLocation();
  const [cartQuantity, setCartQuantity] = useState(0);

  const hideHeaderFooter =
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/admindashboard");

  return (
    <div>
      {!hideHeaderFooter && <Header cartQuantity={cartQuantity} />}
      <Outlet context={{ cartQuantity, setCartQuantity }} />
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};

// App-level router
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="payment" element={<Payment />} />
      <Route path="contactus" element={<ContactUs />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="/CustomerLogin" element={<CustomerLogin />} />

      {/* Admin routes */}
      <Route path="/admindashboard" element={<AdminDashboard />} />

      <Route path="/seller" element={<AdminDashboard />}>
        <Route path="manage-products" element={<ManageProducts />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Route>
  )
);

// App root
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
