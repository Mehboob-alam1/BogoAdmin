import React, { useState } from "react";

export default function Promotion() {
  const [beds, setBeds] = useState(1);
  const [options, setOptions] = useState({
    Restaurant: true,
    Parking: true,
    Sauna: false,
    Garden: true,
    Terrace: true,
    Shower: true,
    FreeWifi: true,
    Waterpark: true,
    Beach: true,
    SwimmingPool: true,
    View: true,
    Pets: true,
    Heating: true,
    FlatTV: true,
    Dining: true,
    FrontDesk: true,
    Jacuzzi: true,
    Bar: true,
  });

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-6">
      <div className="bg-[#1e1e1e] text-white w-full max-w-5xl rounded-2xl p-6 grid grid-cols-2 gap-6 shadow-lg">
        {/* Top Section */}
        <div className="col-span-2">
          <div className="flex gap-3 mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative">
                <img
                  src="https://picsum.photos/120"
                  alt="preview"
                  className="w-28 h-20 rounded-lg object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-purple-600 p-1 rounded-full text-xs">
                  +
                </span>
              </div>
            ))}
          </div>
          <input
            type="text"
            placeholder="write description"
            className="w-full p-3 rounded-lg bg-[#2a2a2a] outline-none text-gray-300"
          />
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          {/* Room Name */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl">
            <label className="block mb-2">Select the room name</label>
            <select className="w-full p-3 rounded-lg bg-[#1e1e1e] text-gray-300">
              <option>Select Room</option>
            </select>
          </div>

          {/* Price */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl">
            <label className="block mb-2">Price</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="00.00"
                className="w-full p-3 rounded-lg bg-[#1e1e1e] text-gray-300"
              />
              <span className="text-gray-400">DA</span>
            </div>
          </div>

          {/* Size */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl">
            <label className="block mb-2">Size</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="50"
                className="w-full p-3 rounded-lg bg-[#1e1e1e] text-gray-300"
              />
              <span className="text-gray-400">m²</span>
            </div>
          </div>

          {/* Bed Type */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl">
            <label className="block mb-2">Bed Type</label>
            <select className="w-full p-3 rounded-lg bg-[#1e1e1e] text-gray-300">
              <option>Single</option>
              <option>Double</option>
              <option>King</option>
            </select>
          </div>

          {/* Number of Beds */}
          <div className="bg-[#2a2a2a] p-4 rounded-xl flex justify-between items-center">
            <span>Number of beds</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBeds(beds > 1 ? beds - 1 : 1)}
                className="bg-[#1e1e1e] px-3 py-1 rounded-lg"
              >
                -
              </button>
              <span className="px-3 py-1 bg-[#1e1e1e] rounded-lg">{beds}</span>
              <button
                onClick={() => setBeds(beds + 1)}
                className="bg-[#1e1e1e] px-3 py-1 rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="bg-[#2a2a2a] p-4 rounded-xl">
            <div className="flex justify-between items-center mb-3">
              <span>Option</span>
              <span className="text-green-500">Suggestions</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(options).map((key) => (
                <div
                  key={key}
                  onClick={() => toggleOption(key)}
                  className={`flex justify-between items-center px-3 py-2 rounded-lg cursor-pointer ${
                    options[key] ? "bg-green-600" : "bg-[#1e1e1e]"
                  }`}
                >
                  <span>{key.replace(/([A-Z])/g, " $1")}</span>
                  {options[key] ? "✔" : ""}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="col-span-2 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 px-16 py-3 rounded-full text-black font-semibold">
            save
          </button>
        </div>
      </div>
    </div>
  );
}
