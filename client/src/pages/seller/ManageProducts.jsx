import { useEffect, useState } from "react";
import axios from "axios";

const API_URI = import.meta.env?.VITE_API_URI ?? "http://localhost:5000";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URI}/products`);
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`${API_URI}/products/${id}`);
      const updated = products.filter((p) => p._id !== id);
      setProducts(updated);
      setFiltered(
        categoryFilter === "All"
          ? updated
          : updated.filter((p) => p.category === categoryFilter)
      );
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategoryFilter(selected);
    if (selected === "All") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((p) => p.category === selected));
    }
  };

  const handleEditSave = async () => {
    try {
      await axios.put(
        `${API_URI}/products/${editingProduct._id}`,
        editingProduct
      );
      const updatedList = products.map((prod) =>
        prod._id === editingProduct._id ? editingProduct : prod
      );
      setProducts(updatedList);
      setFiltered(
        categoryFilter === "All"
          ? updatedList
          : updatedList.filter((p) => p.category === categoryFilter)
      );
      setEditingProduct(null);
    } catch (err) {
      alert("Failed to update product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading products...</p>;
  if (error) return <p className="text-center text-red-600 mt-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-amber-800">Manage Products</h2>
        <select
          value={categoryFilter}
          onChange={handleCategoryChange}
          className="border p-2 rounded-md"
        >
          <option value="All">All Categories</option>
          <option value="Bags">Traditional Bags</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Gifts">Gifts</option>
          <option value="Wall Arts">Wall Arts</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Image</th>
              <th className="p-3">Product</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Discount</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod) => (
              <tr key={prod._id} className="border-t">
                <td className="p-3">
                  <img
                    src={prod.image}
                    alt={prod.product}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 font-medium">
                  {editingProduct?._id === prod._id ? (
                    <input
                      value={editingProduct.product}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          product: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    prod.product
                  )}
                </td>
                <td className="p-3">
                  {prod.category} / {prod.subcategory}
                </td>
                <td className="p-3">
                  {editingProduct?._id === prod._id ? (
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    `Rs. ${prod.price}`
                  )}
                </td>
                <td className="p-3">
                  {editingProduct?._id === prod._id ? (
                    <input
                      type="number"
                      value={editingProduct.discount}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          discount: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    `${prod.discount}%`
                  )}
                </td>
                <td className="p-3">
                  {editingProduct?._id === prod._id ? (
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: e.target.value,
                        })
                      }
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    prod.stock
                  )}
                </td>
                <td className="p-3 space-x-2">
                  {editingProduct?._id === prod._id ? (
                    <>
                      <button
                        onClick={handleEditSave}
                        className="text-green-600 hover:underline"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="text-gray-600 hover:underline"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setEditingProduct(prod)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(prod._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts;
