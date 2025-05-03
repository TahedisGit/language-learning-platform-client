import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-left hover:text-blue-400"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/admin/questions")}
            className="text-left hover:text-blue-400"
          >
            Manage Questions
          </button>
          <button
            onClick={() => navigate("manage-packages")}
            className="text-left hover:text-blue-400"
          >
            Manage Packages
          </button>
          <button
            onClick={() => navigate("/admin/bundles")}
            className="text-left hover:text-blue-400"
          >
            Manage Bundles
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="text-left hover:text-blue-400"
          >
            User Management
          </button>
          <button
            onClick={() => navigate("/admin/analytics")}
            className="text-left hover:text-blue-400"
          >
            Analytics
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-10 text-sm bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
