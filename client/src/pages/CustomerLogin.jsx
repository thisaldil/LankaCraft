import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken(); // Firebase JWT

      localStorage.setItem("customerToken", token);
      localStorage.setItem("customerName", user.displayName);
      localStorage.setItem("customerEmail", user.email);
      localStorage.setItem("customerPhoto", user.photoURL);

      navigate("/"); // redirect to customer landing page
    } catch (err) {
      console.error(err);
      setError("Google login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4 text-center">
        <h2 className="text-2xl font-bold">Login as Customer</h2>
        {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg w-full"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default CustomerLogin;
