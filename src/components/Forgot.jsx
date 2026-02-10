// Forgot.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.png";
import signinImage from "../assets/signin.png";

export default function Forgot() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onBack = () => navigate(-1);

  const handleSubmit = async (e) => {
    e?.preventDefault?.();
    setError("");
    setSuccess("");

    if (!email) {
      setError("Please enter your email to receive a reset link.");
      return;
    }

    try {
      setSubmitting(true);
      await sendPasswordResetEmail(auth, email.trim());
      setSuccess("Password reset link sent! Please check your inbox and spam folder.");
    } catch (err) {
      setError(err?.message || "Unable to send reset email. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Auto-redirect back to Sign In after success
  useEffect(() => {
    if (success) {
      const t = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(t);
    }
  }, [success, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16">
        <div className="w-full max-w-md bg-[#0d0d0d] p-6 sm:p-8 rounded-xl shadow-lg text-white">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Easistar Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="font-semibold text-lg sm:text-xl">Easistar</span>
          </div>

          {/* Back */}
          <button
            aria-label="Go back"
            onClick={onBack}
            className="mb-6 text-gray-500 hover:text-gray-300 text-lg sm:text-xl"
          >
            ←
          </button>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">Forgot Password</h1>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Enter your account email and we'll send you a password reset link.
          </p>

          {error && <p className="text-red-500 text-sm mb-3" role="alert">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-3" role="status">{success}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">Email</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                className="w-full p-3 rounded border border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full transition text-black font-semibold py-3 rounded text-sm sm:text-base ${
                submitting ? "bg-green-600 opacity-70 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {submitting ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <p className="text-gray-600 text-[10px] sm:text-xs text-center mt-10">
            ©2025 Easistar. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex flex-1 items-center justify-center p-6">
        <img src={signinImage} alt="Forgot Password Visual" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
}
