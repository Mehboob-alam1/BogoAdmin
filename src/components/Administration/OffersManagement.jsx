import React, { useState } from "react";
import { Check } from "lucide-react";
import laptop from "../../assets/laptop.png";
import hair from "../../assets/hair.png";
import money from "../../assets/money.png";
import men from "../../assets/men.png";
import women from "../../assets/women.png";
import children from "../../assets/children.png";

const OfferManagement = () => {
  const [gender, setGender] = useState(["women", "children"]);
  const [limitedOffer, setLimitedOffer] = useState(true);
  const [preBooking, setPreBooking] = useState(false);

  const toggleGender = (type) => {
    setGender((prev) =>
      prev.includes(type) ? prev.filter((g) => g !== type) : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center p-4 md:p-10">
      <div className="w-full max-w-5xl bg-transparent">
        {/* Write Description */}
        <div className="bg-[#171717] p-4 rounded-xl flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
            <img src={laptop} alt="Laptop" className="w-8 h-8" />
          </div>
          <input
            type="text"
            placeholder="Write Description"
            className="flex-1 bg-[#2a2a2a] text-white text-sm md:text-base rounded-lg px-3 py-2 outline-none"
          />
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Category */}
            <div className="bg-[#171717] rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
                <img src={hair} alt="Category" className="w-6 h-6" />
              </div>
              <select className="flex-1 bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none">
                <option value="">Select Category</option>
                <option value="haircut">Haircut</option>
                <option value="spa">Spa</option>
                <option value="massage">Massage</option>
              </select>
            </div>

            {/* Offer Name */}
            <div className="bg-[#171717] rounded-xl p-4 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Type offer name"
                className="bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none"
              />
              <select className="bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none">
                <option value="">Select</option>
                <option value="special-discount">Special Discount</option>
                <option value="holiday-package">Holiday Package</option>
                <option value="new-year-offer">New Year Offer</option>
              </select>
            </div>

            {/* Price */}
            <div className="bg-[#171717] rounded-xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
                <img src={money} alt="Price" className="w-6 h-6" />
              </div>
              <input
                type="number"
                placeholder="00.00 DA"
                className="flex-1 bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none"
              />
            </div>

            {/* Yes/No */}
            <div className="bg-[#171717] rounded-xl p-4">
              <p className="text-white text-sm mb-3">
                If the customer is alone, will he benefit from the offer now?
              </p>
              <div className="flex gap-4">
                <button className="flex-1 rounded-lg bg-gray-600 text-white py-2">
                  Yes
                </button>
                <button className="flex-1 rounded-lg bg-green-500 text-black py-2">
                  No
                </button>
              </div>
            </div>

            {/* Duration */}
            <div className="bg-[#171717] rounded-xl p-4">
              <select className="w-full bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none">
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </div>

            {/* Pre Booking */}
            <div className="bg-[#171717] rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                  📅
                </div>
                <span className="text-white text-sm">Pre booking required</span>
              </div>
              <div
                onClick={() => setPreBooking(!preBooking)}
                className={`w-12 h-6 rounded-full cursor-pointer flex items-center px-1 ${
                  preBooking ? "bg-green-500 justify-end" : "bg-gray-600"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Gender Options */}
            {[
              { id: "men", label: "For men", img: men },
              { id: "women", label: "For women", img: women },
              { id: "children", label: "For children", img: children },
            ].map((g) => (
              <div
                key={g.id}
                onClick={() => toggleGender(g.id)}
                className="bg-[#171717] rounded-xl p-4 flex justify-between items-center cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                    <img src={g.img} alt={g.label} className="w-8 h-8" />
                  </div>
                  <span className="text-white">{g.label}</span>
                </div>
                {gender.includes(g.id) && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-black" />
                  </div>
                )}
              </div>
            ))}

            {/* Limited Time Offer */}
            <div className="bg-[#171717] rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center">
                  📆
                </div>
                <span className="text-white text-sm">Limited-time offer</span>
              </div>
              <div
                onClick={() => setLimitedOffer(!limitedOffer)}
                className={`w-12 h-6 rounded-full cursor-pointer flex items-center px-1 ${
                  limitedOffer ? "bg-green-500 justify-end" : "bg-gray-600"
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-[#171717] rounded-xl p-4 text-white">
              <p className="text-sm mb-3">January 2023</p>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                  <span key={i} className="text-gray-400">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <span
                    key={day}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${
                      [11, 12, 13].includes(day)
                        ? "bg-green-500 text-black"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>

            {/* Time Picker */}
            <div className="bg-[#171717] rounded-xl p-4 flex gap-4 justify-center text-white">
              <input
                type="number"
                defaultValue="06"
                className="w-16 text-center bg-[#2a2a2a] rounded-lg px-2 py-2 outline-none"
              />
              <input
                type="number"
                defaultValue="30"
                className="w-16 text-center bg-[#2a2a2a] rounded-lg px-2 py-2 outline-none"
              />
              <select className="bg-[#2a2a2a] text-white rounded-lg px-3 py-2 outline-none">
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button className="w-full bg-green-500 text-black py-4 rounded-full text-lg font-semibold hover:bg-green-400">
          Save
        </button>
      </div>
    </div>
  );
};

export default OfferManagement;
