import { PlusIcon, MinusIcon, XIcon } from "lucide-react";
import { useCart } from "../../pages/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-200 rounded-md overflow-hidden mb-4 sm:mb-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className="flex-1 sm:ml-6">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="mr-4">Color: {item.color}</span>
                <span>Size: {item.size}</span>
              </div>
            </div>
            <button
              type="button"
              className="sm:hidden text-gray-400 hover:text-gray-500"
              onClick={handleRemove}
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Remove</span>
            </button>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-500 focus:outline-none"
                onClick={decreaseQuantity}
                disabled={item.quantity <= 1}
              >
                <MinusIcon className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </button>
              <span className="px-4 py-1 text-center w-10">
                {item.quantity}
              </span>
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-gray-500 focus:outline-none"
                onClick={increaseQuantity}
              >
                <PlusIcon className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </button>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-gray-500">
                ${item.price.toFixed(2)} each
              </p>
              <p className="text-lg font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              className="hidden sm:block ml-4 text-gray-400 hover:text-gray-500"
              onClick={handleRemove}
            >
              <XIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
