import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        "https://language-learning-platform-server.onrender.com/admin/login",
        {
          email,
          password,
        }
      );
      console.log(res);
      if (res.data.success) {
        localStorage.setItem("admin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
        >
          Login
        </button>
        <div className="mb-4 mt-4 text-center">
          <Link to="/">
            <span className="text-blue-600 hover:underline text-sm cursor-pointer">
              <span className="text-blue-800">Not an admin?</span> Back to Home
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
