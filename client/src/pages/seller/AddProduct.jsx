import { useState } from "react";
import axios from "axios";
const API_URI = import.meta.env?.VITE_API_URI ?? "http://localhost:5000";

const categories = {
  Bags: ["Travel Bags", "Shopping Bags", "Handcrafted Purses"],
  Jewelry: ["Men's Collection", "Women's Collection"],
  Gifts: ["Birthday Gifts", "Wrapped Candy Boxes", "Festive Hampers"],
  "Wall Arts": ["Canvas Paintings", "Wooden Wall Décor", "Metal Wall Hangings"],
};

const colors = [
  "Black",
  "Brown",
  "Navy Blue",
  "Gray",
  "Tan",
  "Caramel Brown",
  "Multicolor",
  "Silver",
  "Gold",
];

const sizes = ["Small", "Medium", "Large", "One Size", "Custom"];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    product: "",
    description: "",
    category: "",
    subcategory: "",
    color: "",
    size: "",
    price: "",
    discount: 0,
    image: "",
    stock: 10,
    isFeatured: false,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URI}/products/create`, formData);
      setMessage("✅ Product added successfully!");
      setFormData({
        product: "",
        description: "",
        category: "",
        subcategory: "",
        color: "",
        size: "",
        price: "",
        discount: 0,
        image: "",
        stock: 10,
        isFeatured: false,
      });
    } catch (err) {
      setMessage("❌ Failed to add product: " + err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-amber-800">
        Add New Product
      </h2>
      {message && (
        <p className="mb-4 text-sm text-center text-blue-700">{message}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="product"
          placeholder="Product Name"
          value={formData.product}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <div className="flex gap-4">
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            name="subcategory"
            value={formData.subcategory}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded-md"
            disabled={!formData.category}
          >
            <option value="">Select Subcategory</option>
            {(categories[formData.category] || []).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-md"
          >
            <option value="">Select Color</option>
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-md"
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-1/2 p-2 border rounded-md"
          />

          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-md"
            min={0}
            max={100}
          />
        </div>

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md"
        />

        <div className="flex items-center gap-4">
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded-md"
          />

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="accent-amber-700"
            />
            Featured
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
