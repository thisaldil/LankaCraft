import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import { ShoppingBagIcon, ChevronDownIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const API_URI = import.meta.env?.VITE_API_URI ?? "http://localhost:5000";

const filters = {
  sizes: ["Small", "Medium", "Large", "One Size", "Custom"],
  colors: [
    "Black",
    "Brown",
    "Navy Blue",
    "Gray",
    "Tan",
    "Caramel Brown",
    "Multicolor",
    "Silver",
    "Gold",
  ],
  priceRanges: [
    { label: "Under Rs. 5000", range: [0, 5000] },
    { label: "Rs. 5000 - Rs. 10000", range: [5000, 10000] },
    { label: "Rs. 10000 - Rs. 15000", range: [10000, 15000] },
    { label: "Over Rs. 15000", range: [15000, Infinity] },
  ],
};

const sortOptions = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A to Z", value: "name-asc" },
  { label: "Name: Z to A", value: "name-desc" },
];

const ProductsPage = () => {
  const { addItem } = useCart();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("price-asc");
  const [filtersState, setFiltersState] = useState({
    sizes: [],
    colors: [],
    priceRange: null,
  });

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const filterQuery = searchParams.get("filter");

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

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (filtersState.sizes.length)
      result = result.filter((p) => filtersState.sizes.includes(p.size));
    if (filtersState.colors.length)
      result = result.filter((p) => filtersState.colors.includes(p.color));
    if (filtersState.priceRange) {
      const [min, max] = filtersState.priceRange;
      result = result.filter((p) => p.price >= min && p.price <= max);
    }
    if (filterQuery) {
      result = result.filter(
        (p) =>
          p.product?.toLowerCase().includes(filterQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(filterQuery.toLowerCase()) ||
          p.subcategory?.toLowerCase().includes(filterQuery.toLowerCase())
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.product.localeCompare(b.product));
        break;
      case "name-desc":
        result.sort((a, b) => b.product.localeCompare(a.product));
        break;
    }

    setFiltered(result);
  }, [products, filtersState, sortBy, filterQuery]);

  const toggleFilter = (type, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 space-y-6">
            {/* Size Filters */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Size</h3>
              {filters.sizes.map((size) => (
                <label key={size} className="block text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filtersState.sizes.includes(size)}
                    onChange={() => toggleFilter("sizes", size)}
                    className="mr-2"
                  />
                  {size}
                </label>
              ))}
            </div>

            {/* Color Filters */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Color</h3>
              {filters.colors.map((color) => (
                <label key={color} className="block text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={filtersState.colors.includes(color)}
                    onChange={() => toggleFilter("colors", color)}
                    className="mr-2"
                  />
                  {color}
                </label>
              ))}
            </div>

            {/* Price Range Filters */}
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-medium mb-2">Price</h3>
              {filters.priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="block text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={filtersState.priceRange === range.range}
                    onChange={() =>
                      setFiltersState((prev) => ({
                        ...prev,
                        priceRange: range.range,
                      }))
                    }
                    className="mr-2"
                  />
                  {range.label}
                </label>
              ))}
            </div>
          </aside>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                name={product.product || "No Name"}
                image={product.image || "/fallback.jpg"}
                price={product.price || 0}
                originalPrice={
                  product.discount > 0
                    ? product.price / ((100 - product.discount) / 100)
                    : undefined
                }
                isOnSale={product.discount > 0}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
