import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
  onClick?: () => void; // optional click handler
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  originalPrice,
  isOnSale,
  onClick,
}) => {
  return (
    <div
      className="group relative bg-white rounded-xl shadow hover:shadow-lg transition duration-300 p-4 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
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

      {/* Details */}
      <div className="mt-4 text-center">
        <h3 className="text-base md:text-lg font-medium text-gray-800 truncate">
          {name}
        </h3>
        <div className="flex items-center justify-center mt-1 space-x-2">
          <p className="text-lg font-bold text-gray-900">${price.toFixed(2)}</p>
          {originalPrice && originalPrice > price && (
            <p className="text-sm line-through text-gray-500">
              ${originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
