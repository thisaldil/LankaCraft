import { useState, useEffect } from "react";
import axios from "axios";

const API_URI = import.meta.env?.VITE_API_URI ?? "http://localhost:5000";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalSales: 0,
      totalOrders: 0,
      totalProducts: 0,
      pendingOrders: 0,
    },
    recentOrders: [],
    topProducts: [],
    monthlySales: [],
    isLoading: true,
    error: null,
  });

  // Mock data for demonstration
  const mockData = {
    stats: {
      totalSales: 125750,
      totalOrders: 48,
      totalProducts: 36,
      pendingOrders: 7,
    },
    recentOrders: [
      {
        id: "ORD-7839",
        customer: "Samantha Perera",
        date: "2025-05-18",
        amount: 4200,
        status: "Delivered",
      },
      {
        id: "ORD-7838",
        customer: "Malik Fernando",
        date: "2025-05-17",
        amount: 3500,
        status: "Processing",
      },
      {
        id: "ORD-7837",
        customer: "Priya De Silva",
        date: "2025-05-17",
        amount: 7800,
        status: "Shipped",
      },
      {
        id: "ORD-7836",
        customer: "David Kumar",
        date: "2025-05-16",
        amount: 2600,
        status: "Pending",
      },
      {
        id: "ORD-7835",
        customer: "Ayesha Wickramasinghe",
        date: "2025-05-15",
        amount: 5200,
        status: "Delivered",
      },
    ],
    topProducts: [
      {
        id: "PRD-112",
        name: "Traditional Batik Wall Hanging",
        sold: 17,
        revenue: 25500,
        stock: 8,
      },
      {
        id: "PRD-098",
        name: "Handwoven Reed Basket",
        sold: 14,
        revenue: 21000,
        stock: 12,
      },
      {
        id: "PRD-154",
        name: "Silver Filigree Earrings",
        sold: 12,
        revenue: 18000,
        stock: 5,
      },
      {
        id: "PRD-076",
        name: "Coconut Shell Craft Bowl",
        sold: 11,
        revenue: 16500,
        stock: 9,
      },
    ],
    monthlySales: [
      { month: "Jan", sales: 52000 },
      { month: "Feb", sales: 58000 },
      { month: "Mar", sales: 61000 },
      { month: "Apr", sales: 54000 },
      { month: "May", sales: 63000 },
      { month: "Jun", sales: 59000 },
      { month: "Jul", sales: 68000 },
      { month: "Aug", sales: 72000 },
      { month: "Sep", sales: 76000 },
      { month: "Oct", sales: 82000 },
      { month: "Nov", sales: 96000 },
      { month: "Dec", sales: 110000 },
    ],
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // For demonstration, using mock data instead of actual API call
        // In production, you would use:
        // const response = await axios.get(`${API_URI}/dashboard`);
        // setDashboardData({ ...response.data, isLoading: false });

        // Simulate API delay
        setTimeout(() => {
          setDashboardData({ ...mockData, isLoading: false });
        }, 800);
      } catch (error) {
        setDashboardData((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load dashboard data",
        }));
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data configuration for sales trend
  const salesChartConfig = {
    data: dashboardData.monthlySales,
    height: 200,
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (value) => {
    return `Rs. ${value.toLocaleString()}`;
  };

  if (dashboardData.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (dashboardData.error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-red-700">{dashboardData.error}</p>
          </div>
        </div>
      </div>
    );
  }

  const { stats, recentOrders, topProducts, monthlySales } = dashboardData;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-400 rounded-lg shadow-lg p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome back, John!</h2>
            <p className="text-amber-100">
              Here's what's happening with your store today.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white text-amber-600 hover:bg-amber-50 font-medium py-2 px-4 rounded-lg shadow-sm transition-colors duration-150 flex items-center">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {formatCurrency(stats.totalSales)}
              </h3>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-amber-600"
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
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-sm font-medium text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              8.2%
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalOrders}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-blue-600"
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
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-sm font-medium text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              5.3%
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.totalProducts}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-purple-600"
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
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-sm font-medium text-amber-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </svg>
              2.1%
            </span>
            <span className="text-sm text-gray-500 ml-2">from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Orders
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">
                {stats.pendingOrders}
              </h3>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="flex items-center text-sm font-medium text-green-600">
              <svg
                className="w-3 h-3 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              12.5%
            </span>
            <span className="text-sm text-gray-500 ml-2">
              orders shipped faster
            </span>
          </div>
        </div>
      </div>

      {/* Charts and Recent Orders Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Sales Overview
              </h3>
              <div className="relative inline-block text-left">
                <select className="block appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500">
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Last 6 Months</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6">
            {/* SVG Chart - In a real app you would use a chart library like Recharts */}
            <div className="h-64 w-full">
              <svg className="w-full h-full" viewBox="0 0 800 300">
                <path
                  d={`M 50 250 ${monthlySales
                    .map((item, index) => {
                      const x = 50 + index * 60;
                      const y = 250 - item.sales / 1200;
                      return `L ${x} ${y}`;
                    })
                    .join(" ")}`}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="3"
                />
                {monthlySales.map((item, index) => {
                  const x = 50 + index * 60;
                  const y = 250 - item.sales / 1200;
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="4" fill="#f59e0b" />
                      {/* X-axis labels */}
                      <text
                        x={x}
                        y="270"
                        textAnchor="middle"
                        fontSize="12"
                        fill="#6b7280"
                      >
                        {item.month}
                      </text>
                    </g>
                  );
                })}
                {/* Y-axis */}
                <line
                  x1="50"
                  y1="250"
                  x2="50"
                  y2="50"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
                {/* X-axis */}
                <line
                  x1="50"
                  y1="250"
                  x2="750"
                  y2="250"
                  stroke="#e5e7eb"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="flex justify-center mt-4 space-x-8">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Current Year</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600">Previous Year</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Orders
              </h3>
              <a
                href="/seller/orders"
                className="text-sm font-medium text-amber-600 hover:text-amber-700"
              >
                View All
              </a>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 hover:bg-gray-50 transition duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-gray-100 rounded-md p-2.5">
                      <svg
                        className="w-5 h-5 text-gray-500"
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
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">
                        {order.customer}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.id} • {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(order.amount)}
                    </span>
                    <span
                      className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Top Selling Products
            </h3>
            <a
              href="/seller/manage-products"
              className="text-sm font-medium text-amber-600 hover:text-amber-700"
            >
              Manage Products
            </a>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Product
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Units Sold
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Revenue
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Stock
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                        <svg
                          className="w-6 h-6"
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
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.sold} units
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(product.revenue)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        product.stock > 10
                          ? "bg-green-100 text-green-800"
                          : product.stock > 5
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.stock} in stock
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a
                      href={`/seller/edit-product/${product.id}`}
                      className="text-amber-600 hover:text-amber-900 mr-4"
                    >
                      Edit
                    </a>
                    <a
                      href={`/seller/view-product/${product.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg shadow-lg p-6 text-white flex items-center">
          <div className="p-3 bg-white bg-opacity-30 rounded-full mr-4">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">Add New Product</h4>
            <p className="text-sm text-purple-100 mt-1">
              Upload your craft creations
            </p>
          </div>
          <a href="/seller/add-product" className="ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white flex items-center">
          <div className="p-3 bg-white bg-opacity-30 rounded-full mr-4">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">Process Orders</h4>
            <p className="text-sm text-blue-100 mt-1">
              {stats.pendingOrders} pending orders
            </p>
          </div>
          <a href="/seller/orders" className="ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-lg shadow-lg p-6 text-white flex items-center">
          <div className="p-3 bg-white bg-opacity-30 rounded-full mr-4">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium">View Analytics</h4>
            <p className="text-sm text-green-100 mt-1">Performance insights</p>
          </div>
          <a href="/seller/analytics" className="ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
