import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  originalPrice,
  isOnSale,
}) => {
  return (
    <div className="group relative p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {isOnSale && (
          <div className="absolute top-3 right-3">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full opacity-30 blur-md"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-red-600 text-white px-4 py-1.5 rounded-full shadow-lg border border-red-400 transition-all duration-300">
                <span className="font-semibold tracking-wide text-sm">
                  SALE
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <div className="flex items-center justify-center mt-2 space-x-2">
          <p className="text-xl font-semibold text-gray-900">
            ${price.toFixed(2)}
          </p>
          {originalPrice && (
            <p className="text-md text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
