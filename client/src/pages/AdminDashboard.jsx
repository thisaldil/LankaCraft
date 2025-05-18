import { Link, Outlet, useLocation } from "react-router-dom";

const sidebarLinks = [
  { label: "🛍️ Manage Products", path: "/seller/manage-products" },
  { label: "➕ Add New Product", path: "/seller/add-product" },
];

const AdminDashboard = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-amber-800">LankaCraft Seller</h1>
        <nav className="space-y-3 text-sm">
          {sidebarLinks.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className={`block px-3 py-2 rounded hover:bg-amber-100 transition ${
                pathname === path
                  ? "bg-amber-50 text-amber-700 font-medium"
                  : "text-gray-800"
              }`}
            >
              {label}
            </Link>
          ))}
          <hr className="my-3" />
          <Link
            to="/"
            className="block text-red-600 hover:text-red-800 text-sm"
          >
            ← Back to Store
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
