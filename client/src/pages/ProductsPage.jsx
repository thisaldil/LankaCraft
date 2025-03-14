import React, { useState } from "react";
import { useCart } from "../pages/CartContext";
import {
  FilterIcon,
  ShoppingBagIcon,
  XIcon,
  ChevronDownIcon,
} from "lucide-react";

const products = [
  {
    id: 1,
    product: "Modern Leather Tote",
    description: "Premium leather tote bag with reinforced handles",
    color: "Caramel Brown",
    size: "Large",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  },
  {
    id: 2,
    product: "Canvas Backpack",
    description: "Durable canvas backpack with laptop compartment",
    color: "Navy Blue",
    size: "Medium",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 3,
    product: "Minimalist Crossbody",
    description: "Sleek crossbody bag perfect for everyday essentials",
    color: "Black",
    size: "Small",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1598532163257-ae3c6b2524b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1463&q=80",
  },
  {
    id: 4,
    product: "Weekend Duffle",
    description: "Spacious duffle bag for short trips",
    color: "Gray",
    size: "Large",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
  },
  {
    id: 5,
    product: "Classic Messenger",
    description: "Professional messenger bag with multiple compartments",
    color: "Brown",
    size: "Medium",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80",
  },
  {
    id: 6,
    product: "Mini Bucket Bag",
    description: "Trendy bucket bag with adjustable strap",
    color: "Tan",
    size: "Small",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=757&q=80",
  },
];

const filters = {
  sizes: ["Small", "Medium", "Large"],
  colors: ["Black", "Brown", "Navy Blue", "Gray", "Tan", "Caramel Brown"],
  priceRanges: [
    {
      label: "Under $50",
      range: [0, 50],
    },
    {
      label: "$50 - $100",
      range: [50, 100],
    },
    {
      label: "$100 - $150",
      range: [100, 150],
    },
    {
      label: "Over $150",
      range: [150, Infinity],
    },
  ],
};

const sortOptions = [
  {
    label: "Price: Low to High",
    value: "price-asc",
  },
  {
    label: "Price: High to Low",
    value: "price-desc",
  },
  {
    label: "Name: A to Z",
    value: "name-asc",
  },
  {
    label: "Name: Z to A",
    value: "name-desc",
  },
];

const ProductCard = ({ product, onAddToCart }) => {
  return (
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
              ${product.price.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500">
              {product.color} • {product.size}
            </p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ShoppingBagIcon className="h-5 w-5 mr-1" />
            View
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductPage = () => {
  const { addItem } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    sizes: [],
    colors: [],
    priceRange: null,
  });
  const [sortBy, setSortBy] = useState("price-asc");

  const handleAddToCart = (product) => {
    addItem({
      ...product,
      quantity: 1,
    });
  };

  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const filteredProducts = products
    .filter((product) => {
      if (
        activeFilters.sizes.length &&
        !activeFilters.sizes.includes(product.size)
      )
        return false;
      if (
        activeFilters.colors.length &&
        !activeFilters.colors.includes(product.color)
      )
        return false;
      if (activeFilters.priceRange) {
        const [min, max] = activeFilters.priceRange;
        if (product.price < min || product.price > max) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.product.localeCompare(b.product);
        case "name-desc":
          return b.product.localeCompare(a.product);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Product</h1>
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            {/* Filter Button (Mobile) */}
            <button
              onClick={() => setShowFilters(true)}
              className="lg:hidden inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FilterIcon className="h-5 w-5 mr-1" />
              Filters
            </button>
          </div>
        </div>
        <div className="flex gap-8">
          {/* Filter Sidebar (Desktop) */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Size</h3>
                <div className="space-y-2">
                  {filters.sizes.map((size) => (
                    <label key={size} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.sizes.includes(size)}
                        onChange={() => toggleFilter("sizes", size)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Color
                </h3>
                <div className="space-y-2">
                  {filters.colors.map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={activeFilters.colors.includes(color)}
                        onChange={() => toggleFilter("colors", color)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-600">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Price Range
                </h3>
                <div className="space-y-2">
                  {filters.priceRanges.map((range) => (
                    <label key={range.label} className="flex items-center">
                      <input
                        type="radio"
                        checked={activeFilters.priceRange === range.range}
                        onChange={() =>
                          setActiveFilters((prev) => ({
                            ...prev,
                            priceRange: range.range,
                          }))
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-600">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
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
