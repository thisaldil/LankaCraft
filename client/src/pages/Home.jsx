import React from "react";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import craftPhoto from "../assets/image/craftphoto.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="relative bg-gray-900 h-[500px] md:h-screen">
        <div className="absolute inset-0">
          <img
            src={craftPhoto}
            alt="Featured bags collection"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Handcrafted Sri Lankan Bags
            </h1>
            <p className="text-xl mb-8">
              Explore our unique collection of traditional and eco-friendly
              designs
            </p>
            <Link to="/products">
              <button className="bg-[#8B4513] text-white px-8 py-3 rounded-lg hover:bg-[#A0522D] transition-colors">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Categories and Featured Products */}
      <div className="pt-12">
        <Categories />
        <FeaturedProducts />
      </div>
    </>
  );
};

export default Hero;
