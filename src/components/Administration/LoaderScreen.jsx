import React from "react";
import logoo from "../../assets/Logo.png"; // ✅ apna logo import karo

export default function LoaderScreen() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black z-50">
      {/* Logo with pulse animation */}
      <img
        src={logoo}
        alt="Logo"
        className="w-28 h-28 mb-6 animate-pulse drop-shadow-lg"
      />

      {/* Spinning Ring */}
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <p className="text-green-400 mt-6 text-lg font-semibold tracking-widest animate-bounce">
        Loading Dashboard...
      </p>
    </div>
  );
}



// LoaderScreen.jsx