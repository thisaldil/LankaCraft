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
];

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

      {/* Main navbar */}
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
                ArtisanCraft
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
                              <a
                                href="#"
                                className="block text-stone-700 hover:text-white hover:bg-amber-700 px-4 py-2 rounded-lg transition-all duration-300 ease-in-out"
                              >
                                {item}
                              </a>
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
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-stone-100 rounded-full"
            >
              <Search className="h-6 w-6 text-stone-700" />
            </button>
            <Link
              to="/login"
              className="hidden sm:block p-2 hover:bg-stone-100 rounded-full"
            >
              <User className="h-6 w-6 text-stone-700" />
            </Link>
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
              <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
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

export default Navbar;
