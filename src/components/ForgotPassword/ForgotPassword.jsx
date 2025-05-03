import React, { useState, useContext } from "react";
import AuthContext from "../../contexts/authContext";

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage("✅ Password reset email sent! Check your inbox.");
    } catch (err) {
      setError("❌ Failed to send reset email. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Send Reset Link
        </button>

        {message && (
          <p className="text-sm text-center text-green-600">{message}</p>
        )}
        {error && <p className="text-sm text-center text-red-600">{error}</p>}
      </form>

      <p className="text-xs text-gray-500 text-center mt-4">
        You'll receive a secure link to reset your password via Firebase. This
        ensures your identity is verified before updating the password.
      </p>
    </div>
  );
};

export default ForgotPassword;
