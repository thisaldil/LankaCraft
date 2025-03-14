import React, { useEffect } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummery";
import CrossSellItem from "./CrossSellItem";
import { ArrowLeftIcon, RefreshCwIcon, ArrowRightIcon } from "lucide-react";
import { useCart } from "../../pages/CartContext";
import { useOutletContext } from "react-router-dom";

const CartPage = () => {
  const { state, updateCart } = useCart();
  const { items } = state;
  const { setCartQuantity } = useOutletContext();

  // Calculate the total quantity of items in the cart
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Update the cart quantity in the parent (App.js) when items change
  useEffect(() => {
    setCartQuantity(totalQuantity);
  }, [totalQuantity, setCartQuantity]);

  const crossSellItems = [
    {
      id: 101,
      name: "Leather Wallet",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    },
    {
      id: 102,
      name: "Travel Pouch",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1605733513597-a8f8341084e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    },
    {
      id: 103,
      name: "Keychain",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG10by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 150 ? 0 : 12.99;
  const discount = subtotal * state.discount;
  const total = subtotal + tax + shipping - discount;
  const freeShippingThreshold = 150;
  const amountForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = (subtotal / freeShippingThreshold) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-medium text-gray-900">
                  Shopping Cart
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="px-6 py-4 bg-blue-50">
                {amountForFreeShipping > 0 ? (
                  <div>
                    <p className="text-sm text-blue-700 mb-2">
                      Add{" "}
                      <span className="font-semibold">
                        ${amountForFreeShipping.toFixed(2)}
                      </span>{" "}
                      more to qualify for FREE shipping!
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${freeShippingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Congratulations!</span> Your
                    order qualifies for FREE shipping!
                  </p>
                )}
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                You may also like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crossSellItems.map((item) => (
                  <CrossSellItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              discount={discount}
              total={total}
            />
            <div className="mt-6 bg-white p-4 rounded-lg shadow">
              <h4 className="text-sm font-medium text-gray-900 mb-4">
                Secure Checkout
              </h4>
              <div className="flex justify-between items-center">
                <img
                  src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                  alt="PayPal"
                  className="h-6"
                />
                <img
                  src="https://cdn.pixabay.com/photo/2021/12/08/05/16/visa-6854848_1280.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/24/19/22/mastercard-905862_1280.png"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"
                  alt="American Express"
                  className="h-6"
                />
              </div>
            </div>
            <div className="hidden lg:flex lg:flex-col gap-4 mt-6">
              <button className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <ArrowRightIcon className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>
              <div className="flex gap-4">
                <button className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Continue Shopping
                </button>
                <button
                  onClick={updateCart}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <RefreshCwIcon className="w-5 h-5 mr-2" />
                  Update Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartPage;
