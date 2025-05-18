// Client-side product page with full filtering and sorting support
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../pages/CartContext";
import { ShoppingBagIcon, ChevronDownIcon, FilterIcon } from "lucide-react";

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

const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4">
    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg mb-4">
      <img
        src={product.image}
        alt={product.product}
        className="h-64 w-full object-cover object-center"
      />
    </div>
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">{product.product}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-medium text-gray-900">
            Rs.{" "}
            {(
              product.price -
              (product.price * (product.discount || 0)) / 100
            ).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            {product.color} • {product.size}
          </p>
        </div>
        <button
          onClick={() => onAddToCart(product)}
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <ShoppingBagIcon className="h-5 w-5 mr-1" /> View
        </button>
      </div>
    </div>
  </div>
);

const ProductPage = () => {
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

  const toggleFilter = (type, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
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
      default:
        break;
    }
    setFiltered(result);
  }, [products, filtersState, sortBy]);

  const handleAddToCart = (product) => {
    addItem({ ...product, quantity: 1 });
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Size</h3>
                {filters.sizes.map((size) => (
                  <label key={size} className="block text-sm text-gray-600">
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
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Color
                </h3>
                {filters.colors.map((color) => (
                  <label key={color} className="block text-sm text-gray-600">
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
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Price Range
                </h3>
                {filters.priceRanges.map((range) => (
                  <label
                    key={range.label}
                    className="block text-sm text-gray-600"
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
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
