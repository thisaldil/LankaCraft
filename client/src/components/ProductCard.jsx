import React from "react";

const ProductCard = ({
  name = "Unnamed Product",
  image = "", // fallback for broken/missing images
  price = 0,
  originalPrice,
  isOnSale,
  onClick,
}) => {
  return (
    <div
      className="group relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image || "/fallback.jpg"} // fallback image if missing
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isOnSale && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-30 blur-md"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white px-3 py-1 rounded-full shadow border border-red-400 text-sm font-semibold tracking-wide">
                SALE
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3 text-left">
        <h3 className="text-sm font-medium text-gray-800 truncate">{name}</h3>
        <div className="flex items-center gap-2 mt-1">
          <p className="text-base font-semibold text-gray-900">
            Rs. {price.toFixed(2)}
          </p>
          {originalPrice && originalPrice > price && (
            <p className="text-sm text-gray-500 line-through">
              Rs. {originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
