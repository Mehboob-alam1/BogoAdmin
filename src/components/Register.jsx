// import React, { useState } from "react";
// import logo from "../assets/logo.png"; // Easistar logo
// import eyeIcon from "../assets/Eye Open.png"; // Eye icon
// import dashboardImage from "../assets/signin.png"; // Right side illustration

// export default function Register() {
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
//       {/* Left Section */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16">
//         <div className="w-full max-w-md bg-[#0d0d0d] p-6 sm:p-8 rounded-xl shadow-lg">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-6">
//             <img
//               src={logo}
//               alt="Easistar Logo"
//               className="w-7 h-7 sm:w-8 sm:h-8"
//             />
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
//           <h1 className="text-xl sm:text-2xl font-bold mb-2">Register Account</h1>
//           <p className="text-gray-400 text-sm mb-6">Let&apos;s create your account</p>

//           {/* Email Input */}
//           <label className="block mb-1 text-sm">Email</label>
//           <input
//             type="email"
//             placeholder="example@email.com"
//             className="w-full p-3 mb-5 rounded border border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
//           />

//           {/* Password Input */}
//           <label className="block mb-1 text-sm">Password</label>
//           <div className="relative mb-4">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Input your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 rounded border border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
//             />
//             <button
//               type="button"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//               className="absolute inset-y-0 right-3 flex items-center text-gray-400"
//             >
//               <img src={eyeIcon} alt="Toggle visibility" className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Terms & Privacy */}
//           <div className="flex items-start text-xs text-gray-400 mb-6 ">
//             <input
//               type="checkbox"
//               id="terms"
//               className="mr-2 mt-1 accent-green-500"
//             />
//             <label htmlFor="terms">
//               By creating your account, you agree to our{" "}
//               <a href="#" className="text-green-500 hover:underline">
//                 Terms and Conditions
//               </a>{" "}
//               &{" "}
//               <a href="#" className="text-green-500 hover:underline">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>

//           {/* Create Button */}
//           <button className="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-3 rounded mb-6 text-sm sm:text-base">
//             Create
//           </button>

//           {/* Login Link */}
//           <p className="text-gray-400 text-xs sm:text-sm text-center">
//             Already have an account?{" "}
//             <a href="#" className="text-green-500 hover:underline">
//               Login
//             </a>
//           </p>

//           {/* Footer */}
//           <p className="text-gray-600 text-[10px] sm:text-xs text-center mt-10">
//             ©2022 Managerin All Right Reserved.
//           </p>
//         </div>
//       </div>

//       {/* Right Section - Dashboard Image */}
//       <div className="hidden md:flex flex-1 items-center justify-center p-6">
//         <img
//           src={dashboardImage}
//           alt="Dashboard Visual"
//           className="w-full h-full object-cover rounded-lg"
//         />
//       </div>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";


import logo from "../assets/logo.png";
import eyeIcon from "../assets/Eye Open.png";
import dashboardImage from "../assets/signin.png";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save extra user info in Realtime Database
      await set(ref(db, "users/" + user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-black text-white">
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 md:p-12 lg:p-16">
        <div className="w-full max-w-md bg-[#0d0d0d] p-6 sm:p-8 rounded-xl shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Easistar Logo" className="w-7 h-7 sm:w-8 sm:h-8" />
            <span className="font-semibold text-lg sm:text-xl">Easistar</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold mb-2">Register Account</h1>
          <p className="text-gray-400 text-sm mb-6">Let&apos;s create your account</p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          {/* Email Input */}
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="w-full p-3 mb-5 rounded border border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <label className="block mb-1 text-sm">Password</label>
          <div className="relative mb-4">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Input your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded border border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400"
            >
              <img src={eyeIcon} alt="Toggle visibility" className="w-5 h-5" />
            </button>
          </div>

          {/* Create Button */}
          <button
            onClick={handleRegister}
            className="w-full bg-green-500 hover:bg-green-600 transition text-black font-semibold py-3 rounded mb-6 text-sm sm:text-base"
          >
            Create
          </button>

          {/* Login Link */}
          <p className="text-gray-400 text-xs sm:text-sm text-center">
            Already have an account?{" "}
            <Link to="/" className="text-green-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center p-6">
        <img src={dashboardImage} alt="Dashboard Visual" className="w-full h-full object-cover rounded-lg" />
      </div>
    </div>
  );
}
