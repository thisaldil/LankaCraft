import React, { useState, useEffect } from "react";
import {
  Shield,
  CreditCard,
  Building2,
  Calendar,
  Info,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Sample data, replace this with an API call to your backend later
    const sampleData = {
      bankTransfer: {
        bankName: "Commercial Bank International",
        accountName: "The Travel Site Pty Ltd",
        bsb: "062-000",
        accountNumber: "12345678",
      },
      paymentOptions: [
        {
          title: "Pay in Installments",
          description: "Split your payment into easy monthly installments",
        },
        {
          title: "Deposit & Final Payment",
          description:
            "Pay 20% deposit now and the rest 60 days before sailing",
        },
        {
          title: "Pay in Full",
          description: "Get an additional 5% discount when you pay in full",
        },
      ],
      acceptedMethods: ["Visa", "Mastercard", "American Express", "PayPal"],
    };

    setPaymentDetails(sampleData);
  }, []);

  if (!paymentDetails) {
    return <div>Loading...</div>; // Placeholder while data loads
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="flex items-center text-blue-600 mb-6"
          >
            <span className="mr-2">←</span>back
          </button>

          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">Payment Details</h1>
            <p className="mt-2">
              Secure and flexible payment options for your cruise booking
            </p>
          </div>

          {/* Bank Transfer Details */}
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Bank Transfer Details</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Bank Name</p>
                  <p className="font-medium">
                    {paymentDetails.bankTransfer.bankName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Name</p>
                  <p className="font-medium">
                    {paymentDetails.bankTransfer.accountName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">BSB</p>
                  <p className="font-medium">
                    {paymentDetails.bankTransfer.bsb}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Number</p>
                  <p className="font-medium">
                    {paymentDetails.bankTransfer.accountNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Flexible Payment Options */}
          <div className="p-6 border-b">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">
                Flexible Payment Options
              </h2>
            </div>
            <div className="space-y-4">
              {paymentDetails.paymentOptions.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium">Secure Payments</h3>
                <p className="text-gray-600">
                  All payments are encrypted and processed securely. Your
                  financial information is never stored on our servers.
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="p-6 bg-blue-50">
            <div className="flex items-start space-x-3">
              <Info className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-medium">Need Help?</h3>
                <p className="text-gray-600">
                  Contact our payment support team at 1300 555 444 or email
                  payments@thetravelsite.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
