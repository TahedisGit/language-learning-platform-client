// src/pages/admin/Dashboard.jsx
import React from "react";

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin 👋</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">142</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Packages</h2>
          <p className="text-2xl font-bold text-blue-600">7</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Bundles</h2>
          <p className="text-2xl font-bold text-blue-600">3</p>
        </div>
      </div>
    </div>
  );
}
