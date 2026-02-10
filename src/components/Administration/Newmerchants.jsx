import { useState } from "react";
import { Plus, Camera } from "lucide-react";

export default function Newmerchants() {
  const [profileImg, setProfileImg] = useState(
    "https://i.pravatar.cc/150?img=10"
  );

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-start">
      {/* Profile Upload */}
      <div className="flex flex-col items-start mb-8 w-full pl-4">
        <div className="relative">
          <img
            src={profileImg}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-600"
          />
          <button className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full">
            <Camera size={18} className="text-white" />
          </button>
        </div>
        <p className="mt-2 text-base text-gray-400">Photo Profile</p>
      </div>

      {/* Form */}
      <form className="w-full max-w-4xl space-y-6">
        <h2 className="text-lg font-medium">employee</h2>

        {/* Row 1 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nickname"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
          <input
            type="text"
            placeholder="Gender"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
        </div>

        {/* Row 4 - Biographical */}
        <textarea
          placeholder="Biographical"
          rows="3"
          className="w-full bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
        ></textarea>

        {/* Row 5 */}
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="page view"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
          <input
            type="text"
            placeholder="enclose"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
          <input
            type="text"
            placeholder="Role"
            className="bg-black border border-gray-700 rounded-2xl px-5 py-4 text-base focus:outline-none"
          />
        </div>

        {/* Add new page */}
        <div className="pl-4">
          <p className="mb-2">Add new page</p>
          <button
            type="button"
            className="bg-green-600 p-3 rounded-full flex items-center justify-center"
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 px-10 py-4 rounded-full text-black font-medium text-base"
          >
            add employee
          </button>
        </div>
      </form>
    </div>
  );
}
