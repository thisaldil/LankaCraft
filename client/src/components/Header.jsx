import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  User,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
const categories = [
  {
    name: "Traditional Bags",
    subcategories: [
      {
        name: "Travel Bags",
        featured: [
          "Leather Travel Bags",
          "Canvas Duffels",
          "Traditional Backpacks",
          "Handwoven Carriers",
        ],
      },
      {
        name: "Shopping Bags",
        featured: [
          "Market Totes",
          "Woven Baskets",
          "Traditional Pouches",
          "Eco-friendly Bags",
        ],
      },
      {
        name: "Handcrafted Purses",
        featured: [
          "Evening Clutches",
          "Embroidered Bags",
          "Traditional Wallets",
          "Festival Bags",
        ],
      },
    ],
  },
  {
    name: "Jewelry",
    subcategories: [
      {
        name: "Men's Collection",
        featured: [
          "Traditional Necklaces",
          "Ethnic Bracelets",
          "Cultural Rings",
          "Prayer Beads",
        ],
      },
      {
        name: "Women's Collection",
        featured: [
          "Statement Necklaces",
          "Heritage Pieces",
          "Tribal Jewelry",
          "Handcrafted Earrings",
        ],
      },
    ],
  },
  {
    name: "Gifts",
    subcategories: [
      {
        name: "Birthday Gifts",
        featured: [
          "Personalized Keepsakes",
          "Handmade Cards",
          "Cultural Gift Boxes",
          "Traditional Goodies",
        ],
      },
      {
        name: "Wrapped Candy Boxes",
        featured: [
          "Assorted Treat Packs",
          "Custom Sweet Hampers",
          "Festive Wrapped Boxes",
          "Organic Confections",
        ],
      },
      {
        name: "Festive Hampers",
        featured: [
          "Holiday Hampers",
          "Seasonal Gift Sets",
          "Ethnic Celebration Boxes",
          "Curated Artisan Combos",
        ],
      },
    ],
  },
  {
    name: "Wall Arts",
    subcategories: [
      {
        name: "Canvas Paintings",
        featured: [
          "Abstract Canvas",
          "Floral Canvas",
          "Traditional Motifs",
          "Minimalist Art",
        ],
      },
    ],
  },
];

export const Header = ({ cartQuantity }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isLoggedIn = false; // Example, replace this with real authentication state
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="w-full bg-white border-b border-stone-200">
      {/* Top bar */}
      <div className="bg-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-2">
            <p className="text-sm font-medium">
              Free worldwide shipping on orders over $100
            </p>
            <div className="hidden sm:flex space-x-6 text-sm">
              <a href="#" className="hover:text-amber-200">
                Track Order
              </a>
              <a href="#" className="hover:text-amber-200">
                Help Center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Left section - Mobile menu & Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-stone-700" />
              ) : (
                <Menu className="h-6 w-6 text-stone-700" />
              )}
            </button>
            <a href="/" className="ml-4 lg:ml-0">
              <span className="text-3xl font-serif text-amber-900">
                LankaCrafts
              </span>
            </a>
          </div>

          {/* Center section - Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {categories.map((category) => (
              <div key={category.name} className="relative group">
                <button className="flex items-center space-x-2 py-6 text-stone-800 hover:text-amber-700 transition-all duration-300 ease-in-out">
                  <span className="font-semibold text-lg">{category.name}</span>
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 group-hover:rotate-180" />
                </button>

                {/* Mega Menu */}
                <div className="absolute left-0 top-full w-[520px] bg-white shadow-2xl rounded-2xl p-6 opacity-0 invisible transform translate-y-6 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out z-50 border border-stone-200">
                  <div className="grid grid-cols-2 gap-6">
                    {category.subcategories.map((subcategory) => (
                      <div key={subcategory.name}>
                        <h3 className="text-xl font-bold text-amber-800 mb-4 border-l-4 border-amber-800 pl-4">
                          {subcategory.name}
                        </h3>
                        <ul className="space-y-2">
                          {subcategory.featured.map((item) => (
                            <li key={item}>
                              <Link
                                to={`/products?filter=${encodeURIComponent(
                                  item
                                )}`}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right section - Search, Account & Cart */}
          <div className="flex items-center space-x-6 relative">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-stone-100 rounded-full"
            >
              <Search className="h-6 w-6 text-stone-700" />
            </button>

            {localStorage.getItem("customerPhoto") ? (
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="focus:outline-none"
                >
                  <img
                    src={localStorage.getItem("customerPhoto")}
                    alt="Customer"
                    className="w-9 h-9 rounded-full border-2 border-amber-700 object-cover"
                  />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-lg z-50">
                    <div
                      onClick={() => {
                        localStorage.removeItem("customerToken");
                        localStorage.removeItem("customerPhoto");
                        localStorage.removeItem("customerEmail");
                        localStorage.removeItem("customerName");
                        window.location.reload();
                      }}
                      className="block px-4 py-2 text-stone-700 hover:bg-red-100 hover:text-red-700 cursor-pointer transition"
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative hidden sm:block">
                <button
                  className="p-2 hover:bg-stone-100 rounded-full"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User className="h-6 w-6 text-stone-700" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-lg z-50">
                    <Link
                      to="/CustomerLogin"
                      className="block px-4 py-2 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition"
                    >
                      Buy on LankaCrafts
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition"
                    >
                      Sell on LankaCrafts
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-stone-700 hover:bg-amber-100 hover:text-amber-900 transition"
                    >
                      Inventory
                    </Link>
                  </div>
                )}
              </div>
            )}

            <a
              href="#"
              className="hidden sm:block p-2 hover:bg-stone-100 rounded-full"
            >
              <Heart className="h-6 w-6 text-stone-700" />
            </a>

            <a
              href="#"
              className="p-2 hover:bg-stone-100 rounded-full relative"
            >
              <ShoppingBag className="h-6 w-6 text-stone-700" />
              {cartQuantity > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </a>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t border-stone-200 p-4 shadow-lg">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for artisanal products..."
                className="w-full px-4 py-3 pl-12 rounded-lg border-2 border-stone-200 focus:outline-none focus:border-amber-900"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
