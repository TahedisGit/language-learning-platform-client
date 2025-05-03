import React, { useState, useEffect } from "react";
import { confirmPasswordReset, getAuth } from "firebase/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const auth = getAuth();
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!oobCode) {
      setError("Invalid or missing reset token.");
    }
  }, [oobCode]);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("Password has been reset successfully!");

      // Send the new password to MongoDB to update it
      const userEmail = prompt("Please type your email again:");
      if (userEmail) {
        await axios.put(
          "https://language-learning-platform-server.onrender.com/update-password",
          {
            email: userEmail,
            newPassword,
          }
        );
        setStatus((prev) => prev + "Password also updated in MongoDB.");
      }
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. The link may be expired or invalid.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Reset Your Password
      </h2>
      <form onSubmit={handleReset} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Reset Password
        </button>
      </form>

      {status && <p className="text-sm text-green-600 mt-4">{status}</p>}
      {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default ResetPassword;
