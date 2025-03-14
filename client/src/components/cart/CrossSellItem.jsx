import React from "react";
import { PlusIcon } from "lucide-react";
import { useCart } from "../../pages/CartContext";

const CrossSellItem = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      ...item,
      quantity: 1,
      description: "",
      color: "Default",
      size: "One Size",
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-40 w-full object-cover object-center"
        />
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
          <p className="mt-1 text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex items-center p-1.5 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusIcon className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Add to cart</span>
        </button>
      </div>
    </div>
  );
};

export default CrossSellItem;
