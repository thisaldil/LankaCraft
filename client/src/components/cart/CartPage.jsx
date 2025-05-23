import React, { useEffect, useState, useRef } from "react";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummery";
import CrossSellItem from "./CrossSellItem";
import { ArrowLeftIcon, RefreshCwIcon, ArrowRightIcon } from "lucide-react";
import { useCart } from "../../pages/CartContext";
import { useOutletContext, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import axios from "axios";

const CartPage = () => {
  const { state, updateCart, clearCart } = useCart();
  const { items } = state;
  const { setCartQuantity } = useOutletContext();
  const navigate = useNavigate();
  const [crossSellItems, setCrossSellItems] = useState([]);
  const [showBankPopup, setShowBankPopup] = useState(false);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const billRef = useRef();
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState("");

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 1000 ? 0 : 12.99;
  const discount = subtotal * state.discount;
  const total = subtotal + tax + shipping - discount;
  const amountForFreeShipping = Math.max(0, 1000 - subtotal);
  const freeShippingProgress = (subtotal / 1000) * 100;

  useEffect(() => {
    setCartQuantity(items.reduce((sum, item) => sum + item.quantity, 0));
    const fetchCrossSellItems = async () => {
      try {
        const res = await fetch("http://localhost:5000/products/discounted");
        const data = await res.json();
        setCrossSellItems(data.slice(0, 3));
      } catch (err) {
        console.error("Failed to load cross-sell items:", err);
      }
    };
    fetchCrossSellItems();
  }, [items, setCartQuantity]);

  useEffect(() => {
    setInvoiceNumber(`INV-${Math.floor(Math.random() * 100000)}`);
  }, []);

  const handleDownloadPDF = async () => {
    const element = billRef.current;
    const opt = {
      margin: 1,
      filename: `Invoice_${invoiceNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    try {
      const pdfBlob = await html2pdf().from(element).set(opt).outputPdf("blob");
      // For download
      html2pdf().from(element).set(opt).save();
      return pdfBlob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return null;
    }
  };

  // Add new function to handle checkout completion
  const handleCheckoutComplete = async () => {
    const token = localStorage.getItem("customerToken");
    const email = localStorage.getItem("customerEmail");

    if (!token || !email) {
      navigate("/CustomerLogin?redirect=cart");
      return;
    }

    if (state.items.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const totalAmount = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const orderPayload = {
        items: state.items.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalAmount,
        shippingAddress: "Sri Lanka", // Optional
      };

      await axios.post("http://localhost:5000/orders/place", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Order placed successfully");
      clearCart();
      navigate("/thank-you");
    } catch (err) {
      console.error("Order placement failed:", err);
      alert("There was an error placing your order.");
    }
  };

  // Add WhatsApp message function
  const sendWhatsAppMessage = () => {
    const phoneNumber = "94752120365"; // Replace with your business WhatsApp number
    const message = `Hi! I have completed my order and need to transfer the payment.
  
Order Details:
Invoice Number: ${invoiceNumber}
Total Amount: Rs. ${total.toFixed(2)}
Date: ${new Date().toLocaleDateString()}

I will send the payment proof shortly. Please confirm my order.

Thank you!`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  // Add email function
  const sendEmailWithInvoice = async () => {
    const subject = `Payment Confirmation Required - Invoice ${invoiceNumber}`;
    const body = `Dear LankaCrafts Team,

I have completed my order checkout and need to transfer the payment for confirmation.

Order Details:
- Invoice Number: ${invoiceNumber}
- Total Amount: Rs. ${total.toFixed(2)}
- Order Date: ${new Date().toLocaleDateString()}
- Items: ${items.length} item(s)

Bank Transfer Details:
Bank: Commercial Bank
Account Name: Thisal Gonsalkorala
Account No: 8015703343

I will transfer the amount and send the payment proof to confirm my order.

Please find the invoice details above.

Best regards,
Customer`;

    const mailtoUrl = `mailto:orders@lankacrafts.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoUrl);
  };

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
                  <p className="text-sm text-blue-700 mb-2">
                    Add{" "}
                    <span className="font-semibold">
                      ${amountForFreeShipping.toFixed(2)}
                    </span>{" "}
                    more to qualify for FREE shipping!
                  </p>
                ) : (
                  <p className="text-sm text-blue-700">
                    <span className="font-semibold">Congratulations!</span> You
                    qualify for FREE shipping!
                  </p>
                )}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${freeShippingProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                You may also like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {crossSellItems.map((item) => (
                  <CrossSellItem key={item._id} item={item} />
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
                  src="https://cdn-icons-png.flaticon.com/512/349/349221.png"
                  alt="Visa"
                  className="h-6"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/349/349228.png"
                  alt="Mastercard"
                  className="h-6"
                />
                <img
                  onClick={() => setShowBankPopup(true)}
                  src="https://cdn-icons-png.flaticon.com/512/349/349225.png"
                  alt="American Express"
                  className="h-6 cursor-pointer"
                />
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-col gap-4 mt-6">
              <button
                onClick={handleCheckoutComplete} // Changed from setShowBillPopup(true)
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRightIcon className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>

              <div className="flex gap-4">
                <button
                  onClick={() => navigate("/products")}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <ArrowLeftIcon className="w-5 h-5 mr-2" />
                  Continue Shopping
                </button>
                <button
                  onClick={updateCart}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <RefreshCwIcon className="w-5 h-5 mr-2" />
                  Update Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {showBillPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden transform animate-slideIn max-h-[90vh] overflow-y-auto">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-200 to-indigo-300 rounded-full opacity-10"></div>
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-10"></div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 group"
                onClick={() => setShowBillPopup(false)}
              >
                <svg
                  className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative z-10" ref={billRef}>
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold">Order Invoice</h2>
                          <p className="text-blue-100 text-sm">
                            Thank you for your purchase!
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-white/20 rounded-lg p-3">
                        <p className="text-sm text-blue-100">Invoice #</p>
                        <p className="text-lg font-bold">{invoiceNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Company Info */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-blue-100 mb-2">
                        From:
                      </h3>
                      <div className="text-white">
                        <p className="font-semibold">LankaCrafts Pvt Ltd</p>
                        <p className="text-sm text-blue-100">
                          123 Craft Street
                        </p>
                        <p className="text-sm text-blue-100">
                          Colombo, Sri Lanka
                        </p>
                        <p className="text-sm text-blue-100">
                          info@lankacrafts.com
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-blue-100 mb-2">
                        Invoice Date:
                      </h3>
                      <p className="text-white">
                        {new Date().toLocaleDateString()}
                      </p>
                      <h3 className="font-semibold text-blue-100 mb-2 mt-3">
                        Payment Status:
                      </h3>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="p-8 space-y-6">
                  {/* Order Summary Card */}
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                        <svg
                          className="w-5 h-5 mr-2 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        Order Summary
                      </h3>
                    </div>
                    <div className="p-6">
                      {/* Items Count */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Total Items
                          </span>
                        </div>
                        <span className="text-gray-900 font-semibold">
                          {items.length} items
                        </span>
                      </div>

                      {/* Subtotal */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Subtotal
                          </span>
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Rs. {subtotal.toFixed(2)}
                        </span>
                      </div>

                      {/* Tax */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-yellow-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Tax (8%)
                          </span>
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Rs. {tax.toFixed(2)}
                        </span>
                      </div>

                      {/* Shipping */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Shipping
                          </span>
                        </div>
                        <span className="text-gray-900 font-semibold">
                          Rs. {shipping.toFixed(2)}
                        </span>
                      </div>

                      {/* Discount */}
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 font-medium">
                            Discount Applied
                          </span>
                        </div>
                        <span className="text-red-600 font-semibold">
                          -Rs. {discount.toFixed(2)}
                        </span>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between py-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-4 mt-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-5 h-5 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h2m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <span className="text-lg font-bold text-gray-800">
                            Total Amount
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">
                          Rs. {total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-green-800">
                        Payment Confirmed
                      </h3>
                    </div>
                    <p className="text-green-700 text-sm">
                      Your payment has been successfully processed. You will
                      receive an email confirmation shortly.
                    </p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Terms & Conditions
                    </h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• All sales are final unless items are defective</li>
                      <li>• Returns accepted within 7 days of delivery</li>
                      <li>• Shipping times may vary based on location</li>
                      <li>• Customer support: support@lankacrafts.com</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="relative z-10 p-6 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex flex-col sm:flex-row gap-3">
                <button
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
                  onClick={handleDownloadPDF}
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download PDF
                </button>

                <button
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
                  onClick={() => setShowBillPopup(false)}
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  Close
                </button>

                <button
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center group"
                  onClick={sendEmailWithInvoice} // Updated function call
                >
                  <svg
                    className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  Email Invoice
                </button>
              </div>
            </div>
          </div>
        )}

        {showPaymentConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden transform animate-slideIn">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full opacity-20"></div>

              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-all duration-200 hover:scale-110 group"
                onClick={() => setShowPaymentConfirmation(false)}
              >
                <svg
                  className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="relative z-10 p-6 text-center">
                {/* Success Icon - Reduced size */}
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Title - Reduced margin */}
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Order Placed Successfully!
                </h2>

                {/* Invoice Info - Reduced padding */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-blue-600 mb-1">Invoice Number</p>
                  <p className="text-lg font-bold text-blue-800">
                    {invoiceNumber}
                  </p>
                  <p className="text-sm text-blue-600 mt-2">Total Amount</p>
                  <p className="text-xl font-bold text-blue-800">
                    Rs. {total.toFixed(2)}
                  </p>
                </div>

                {/* Instructions - Reduced padding */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 text-yellow-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-yellow-800 mb-1">
                        Payment Required
                      </p>
                      <p className="text-xs text-yellow-700">
                        Please transfer the amount and send proof via WhatsApp
                        or email to confirm your order.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bank Details - Reduced padding */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-left">
                  <h3 className="font-semibold text-gray-800 mb-2 text-center text-sm">
                    Bank Transfer Details
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bank:</span>
                      <span className="font-medium">Commercial Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account Name:</span>
                      <span className="font-medium">Thisal Gonsalkorala</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Account No:</span>
                      <span className="font-medium">8015703343</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Reduced spacing and padding */}
                <div className="space-y-2">
                  <button
                    onClick={sendWhatsAppMessage}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488z" />
                    </svg>
                    Send via WhatsApp
                  </button>

                  <button
                    onClick={sendEmailWithInvoice}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send via Email
                  </button>

                  <button
                    onClick={() => {
                      setShowPaymentConfirmation(false);
                      setShowBillPopup(true);
                    }}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-4 rounded-xl border border-gray-300 transition-all duration-200 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View Invoice Again
                  </button>

                  <button
                    onClick={() => {
                      setShowPaymentConfirmation(false);
                      navigate("/products");
                    }}
                    className="w-full text-gray-500 hover:text-gray-700 font-medium py-2 transition-colors duration-200 text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }

          .animate-slideIn {
            animation: slideIn 0.3s ease-out;
          }
        `}</style>
      </main>
    </div>
  );
};

export default CartPage;
