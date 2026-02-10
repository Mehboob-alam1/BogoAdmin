// import React from "react";
// import logo from "../assets/logo.png"; // Easistar logo
// import signinImage from "../assets/signin.png"; // Right side illustration

// export default function Otp() {
//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
//       {/* Left Section - OTP Verification */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16">
//         <div className="w-full max-w-md bg-[#0d0d0d] p-6 sm:p-8 rounded-xl shadow-lg text-white">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-6">
//             <img src={logo} alt="Easistar Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
//             <span className="font-semibold text-lg sm:text-xl">Easistar</span>
//           </div>

//           {/* Back Arrow */}
//           <button
//             aria-label="Go back"
//             className="mb-6 text-gray-500 hover:text-gray-300 text-lg sm:text-xl"
//           >
//             ←
//           </button>

//           {/* Title */}
//           <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
//             OTP Verification
//           </h1>
//           <p className="text-gray-400 mb-6 text-sm sm:text-base">
//             We will send OTP Verification to your account from email
//           </p>

//           {/* OTP Input */}
//           <label className="block mb-2 text-sm">Code OTP</label>
//           <div className="flex justify-between gap-3 mb-6">
//             {[...Array(4)].map((_, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength="1"
//                 className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-semibold rounded border border-gray-700 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             ))}
//           </div>

//           {/* Submit Button */}
//           <button className="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-3 rounded text-sm sm:text-base">
//             Sign In
//           </button>

//           {/* Footer */}
//           <p className="text-gray-600 text-[10px] sm:text-xs text-center mt-10">
//             ©2022 Managerin All Right Reserved.
//           </p>
//         </div>
//       </div>

//       {/* Right Side - Image */}
//       <div className="hidden md:flex flex-1 items-center justify-center p-6">
//         <img
//           src={signinImage}
//           alt="OTP Verification Visual"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       </div>
//     </div>
//   );
// }
