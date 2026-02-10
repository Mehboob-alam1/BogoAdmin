import React from "react";
import { Settings, Trash2, Plus } from "lucide-react";

export default function Payment() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
          <p className="text-blue-400 font-medium">Flexible Pricing</p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Choose the right fit for your business
          </h1>
        </div>

        {/* Top Right Section with Charts + Settings */}
        <div className="flex flex-wrap gap-4">
          {/* Chart 1 */}
          <div className="bg-neutral-900 rounded-xl p-4 w-48">
            <p className="text-sm text-gray-400 mb-2">Category</p>
            <img
              src="https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Used','Expired','Verified'],datasets:[{data:[60,20,20]}]}}"
              alt="Category Chart"
              className="w-full"
            />
          </div>

          {/* Chart 2 */}
          <div className="bg-neutral-900 rounded-xl p-4 w-48">
            <p className="text-sm text-gray-400 mb-2">Regular</p>
            <img
              src="https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Used','Expired','Verified'],datasets:[{data:[70,15,15]}]}}"
              alt="Regular Chart"
              className="w-full"
            />
          </div>

          {/* Plan Settings Button */}
          <button className="bg-green-500 text-black flex items-center gap-2 px-6 py-4 rounded-xl font-semibold hover:bg-green-400 transition">
            <Settings size={22} /> Plan Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="px-5 py-2 rounded-md bg-green-500 text-black font-medium">
          Regular
        </button>
        <button className="px-5 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700">
          Student
        </button>
        <button className="px-5 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700">
          Company
        </button>
        <button className="px-5 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700">
          Free trial
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
          <Trash2 size={20} />
        </button>
        <button className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition">
          ⚙️
        </button>
        <button className="px-5 py-2 rounded-md bg-yellow-500 text-black font-semibold flex items-center gap-2">
          <Plus size={18} /> Add category
        </button>
      </div>

      {/* Form Section */}
      <div className="space-y-6 max-w-3xl">
        <div>
          <label className="block text-gray-400 mb-2">Specific Countries</label>
          <input
            type="text"
            placeholder="USD"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Currency Name</label>
          <input
            type="text"
            placeholder="USD"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Currency Symbol</label>
          <input
            type="text"
            placeholder="$"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
