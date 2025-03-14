import React from "react";
import { useCart } from "../../pages/CartContext";
import { ArrowRightIcon } from "lucide-react";

const OrderSummary = ({ subtotal, tax, shipping, discount, total }) => {
  const { state, applyCoupon } = useCart();

  const handleCouponSubmit = (e) => {
    e.preventDefault();
    applyCoupon(state.couponCode);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      </div>
      <div className="p-6 border-b border-gray-200">
        <form onSubmit={handleCouponSubmit}>
          <label
            htmlFor="coupon"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Apply Discount Code
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              id="coupon"
              name="coupon"
              value={state.couponCode}
              onChange={(e) => applyCoupon(e.target.value)}
              className="flex-1 min-w-0 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter code"
            />
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between text-base text-gray-600">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-base text-green-600">
            <p>Discount</p>
            <p>-${discount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between text-base text-gray-600">
          <p>Tax</p>
          <p>${tax.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-base text-gray-600">
          <p>Shipping</p>
          <p>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-medium text-gray-900">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Including taxes and shipping
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
