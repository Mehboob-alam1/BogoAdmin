import React, { useState } from "react";
import { Settings, Trash2, Plus } from "lucide-react";

export default function Reservation() {
  const [activeTab, setActiveTab] = useState("Regular");

  const tabs = ["Regular", "Student", "Company", "Free trial"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white px-6 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div>
          <p className="text-green-400 font-medium tracking-wide">
            Flexible Pricing
          </p>
          <h1 className="text-3xl md:text-4xl font-bold mt-2 leading-snug">
            Choose the right fit for your business
          </h1>
        </div>

        {/* Top Right Section */}
        <div className="flex flex-wrap gap-4">
          {/* Chart 1 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-48 shadow-lg hover:scale-105 transition">
            <p className="text-sm text-gray-400 mb-2">Category</p>
            <img
              src="https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Used','Expired','Verified'],datasets:[{data:[60,20,20]}]}}"
              alt="Category Chart"
              className="w-full"
            />
          </div>

          {/* Chart 2 */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 w-48 shadow-lg hover:scale-105 transition">
            <p className="text-sm text-gray-400 mb-2">Regular</p>
            <img
              src="https://quickchart.io/chart?c={type:'doughnut',data:{labels:['Used','Expired','Verified'],datasets:[{data:[70,15,15]}]}}"
              alt="Regular Chart"
              className="w-full"
            />
          </div>

          {/* Settings */}
          <button className="bg-green-500 text-black flex items-center gap-2 px-6 py-4 rounded-xl font-semibold shadow-md hover:bg-green-400 hover:scale-105 transition">
            <Settings size={22} /> Plan Settings
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2 rounded-md font-medium transition ${
              activeTab === tab
                ? "bg-green-500 text-black shadow-lg"
                : "bg-neutral-800 hover:bg-neutral-700"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-green-400 rounded-full"></span>
            )}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-10">
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition hover:scale-110 shadow-md">
          <Trash2 size={20} />
        </button>
        <button className="p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition hover:rotate-90 shadow-md">
          ⚙️
        </button>
        <button className="px-5 py-2 rounded-md bg-yellow-500 text-black font-semibold flex items-center gap-2 hover:bg-yellow-400 hover:scale-105 shadow-md transition">
          <Plus size={18} /> Add category
        </button>
      </div>

      {/* Form Section */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
        <div>
          <label className="block text-gray-400 mb-2">Specific Countries</label>
          <input
            type="text"
            placeholder="USA, Canada, UK"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Currency Name</label>
          <input
            type="text"
            placeholder="USD"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-gray-400 mb-2">Currency Symbol</label>
          <input
            type="text"
            placeholder="$"
            className="w-full bg-neutral-900 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>
    </div>
  );
}
