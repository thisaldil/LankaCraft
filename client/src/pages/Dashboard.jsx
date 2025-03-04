// src/pages/AdminDashboard.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-red-500"
      >
        Logout
      </button>
      <h3 className="text-lg font-semibold mt-6">Products</h3>
      <ul className="mt-4">
        {products.map((product) => (
          <li key={product._id} className="border p-2 rounded-lg mb-2">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
