import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultView = queryParams.get("view") || "login";
  const isInventory = queryParams.get("source") === "inventory";

  const [view, setView] = useState(defaultView); // login | register | reset
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("seller");

  useEffect(() => {
    if (isInventory) setView("login");
  }, [isInventory]);

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setOtp("");
    setNewPassword("");
    setError("");
    setSuccess("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/admin/adminLogin", {
        username,
        password,
      });

      // Check role match
      if (isInventory && res.data.role !== "inventory") {
        setError("Access denied. Not an inventory account.");
        setLoading(false);
        return;
      }

      if (!isInventory && res.data.role !== "seller") {
        setError("Access denied. Not a seller account.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("adminUsername", res.data.username);
      localStorage.setItem("adminEmail", res.data.email);
      localStorage.setItem("role", res.data.role);

      setSuccess("Login successful");
      navigate("/seller/manage-products");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/registerAdmin",
        {
          username,
          email,
          password,
          role,
        }
      );
      setSuccess(res.data.message);
      setView("login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/admin/requestOtp", {
        email,
      });
      setSuccess(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "OTP request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/changePassword",
        {
          username,
          otp,
          newPassword,
        }
      );
      setSuccess(res.data.message);
      setView("login");
    } catch (err) {
      setError(err.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.shutterstock.com/shutterstock/videos/1089087377/thumb/1.jpg?ip=x480')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 backdrop-blur-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-2">
          {view === "login" &&
            (isInventory ? "Inventory Login" : "Seller Login")}
          {view === "register" && "Register Admin"}
          {view === "reset" && "Reset Password"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {success && (
          <p className="text-green-500 text-sm text-center">{success}</p>
        )}

        {view === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-md transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {view === "register" && !isInventory && (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <select
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              {/* <option value="inventory">Inventory</option> */}
            </select>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}

        {view === "reset" && (
          <div className="space-y-4">
            <form onSubmit={handleRequestOtp}>
              <input
                type="email"
                placeholder="Enter email to get OTP"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md mb-2"
                required
              />
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
              >
                Send OTP
              </button>
            </form>
            <form onSubmit={handleChangePassword} className="space-y-2">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
              >
                Change Password
              </button>
            </form>
          </div>
        )}

        <div className="text-center text-sm text-gray-700 pt-2 space-x-4">
          {view !== "login" && (
            <button
              onClick={() => {
                setView("login");
                resetFields();
              }}
              className="text-blue-500"
            >
              Login
            </button>
          )}
          {!isInventory && view !== "register" && (
            <button
              onClick={() => {
                setView("register");
                resetFields();
              }}
              className="text-green-600"
            >
              Register
            </button>
          )}
          {view !== "reset" && (
            <button
              onClick={() => {
                setView("reset");
                resetFields();
              }}
              className="text-yellow-600"
            >
              Forgot Password?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
