import React, { useState } from "react";
import profileImg from "../../assets/ousa.png";
import annaImg from "../../assets/Anna.png";
import jackImg from "../../assets/jack.png";
import shuriImg from "../../assets/Shuri.png";
import janeeImg from "../../assets/janee.png";
import danielImg from "../../assets/daniel.png";

// ------------- Affiliate Card Component -------------
const AffiliateCard = ({ rank, name, sales, amount }) => {
  return (
    <div className="w-[300px] bg-[#181818] rounded-[25px] p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div className="flex justify-between items-center">
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-black text-xs font-bold">
          {rank}
        </div>
        <button className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-500 text-gray-400 text-sm">
          i
        </button>
      </div>

      {/* Middle Section */}
      <div className="flex items-center gap-3 mt-4">
        <img
          src={profileImg}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <p className="text-white font-medium">{name}</p>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-center">
          <p className="text-2xl font-bold">{sales}</p>
          <p className="text-gray-400 text-sm">sale</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{amount} $</p>
          <p className="text-gray-400 text-sm">Amount</p>
        </div>
      </div>
    </div>
  );
};

// ------------- New Affiliate Form -------------
const NewAffiliateForm = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-neutral-900 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Affiliate</h2>
          <button
            onClick={onBack}
            className="bg-red-500 text-white px-4 py-1 rounded-lg"
          >
            Back
          </button>
        </div>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="First name"
          className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none"
        />
        <input
          type="text"
          placeholder="Last name"
          className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none"
        />
        <input
          type="text"
          placeholder="Phone number"
          className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none"
        />

        {/* Country & City */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Country"
            className="bg-[#1e1e1e] rounded-lg p-3 outline-none"
          />
          <input
            type="text"
            placeholder="City"
            className="bg-[#1e1e1e] rounded-lg p-3 outline-none"
          />
        </div>

        {/* Paypal Dropdown */}
        <select className="w-full bg-[#1e1e1e] rounded-lg p-3 outline-none">
          <option>Paypal</option>
          <option>Stripe</option>
        </select>

        {/* Paypal Status */}
        <div className="bg-[#1e1e1e] rounded-lg p-4 space-y-4">
          <p className="text-gray-300 text-sm">Paypal Status</p>
          <div className="flex gap-4">
            <button className="flex-1 bg-green-500 text-black py-2 rounded-lg">
              Active
            </button>
            <button className="flex-1 bg-gray-700 text-white py-2 rounded-lg">
              Deactivate
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Paypal Client ID"
              className="bg-black rounded-lg p-3 outline-none"
            />
            <input
              type="text"
              placeholder="Paypal Client Secret"
              className="bg-black rounded-lg p-3 outline-none"
            />
          </div>
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <span className="mx-2">Or</span>
          </div>
          <button className="w-full bg-green-500 text-black py-2 rounded-lg">
            Connect PayPal
          </button>
        </div>
      </div>
    </div>
  );
};

// ------------- Dashboard Component -------------
const Affiliate = () => {
  const [showForm, setShowForm] = useState(false);

  const bestAffiliates = [
    { name: "Daniel", img: danielImg },
    { name: "Anna", img: annaImg },
    { name: "Shuri", img: shuriImg },
    { name: "Jack", img: jackImg },
    { name: "Janee", img: janeeImg },
  ];

  if (showForm) {
    return <NewAffiliateForm onBack={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      {/* ----------- Top Stats Section ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-900 rounded-[24px] p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-sm">total commissions</p>
          <h2 className="text-2xl font-bold">$198,221</h2>
          <span className="text-red-500 text-xs">12% from last week</span>
        </div>
        <div className="bg-neutral-900 rounded-[24px] p-4 flex flex-col justify-between">
          <p className="text-gray-400 text-sm">paid commissions</p>
          <h2 className="text-2xl font-bold">$18,221</h2>
          <span className="text-red-500 text-xs">5% from last week</span>
        </div>
        <div className="bg-neutral-900 rounded-[24px] p-4">
          <p className="text-gray-400 text-sm mb-2">best affiliate</p>
          <div className="flex flex-wrap gap-4">
            {bestAffiliates.map((affiliate, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center text-xs"
              >
                <img
                  src={affiliate.img}
                  alt={affiliate.name}
                  className="w-10 h-10 rounded-full border-2 border-black"
                />
                <span className="mt-1">{affiliate.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------- Buttons Section ----------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="h-[62px] bg-[#3F51B2] rounded-[35px] flex items-center justify-center text-white font-medium">
          send invite
        </button>
        <button className="h-[62px] bg-[#FFC02D] rounded-[35px] flex items-center justify-center text-black font-medium">
          Advertising signs
        </button>
        <div className="h-[62px] border border-[#212121] bg-neutral-900 rounded-[35px] flex items-center justify-between px-4">
          <span className="text-sm truncate">
            www.boge.com/affiliate/name/send
          </span>
          <button className="bg-neutral-800 px-4 py-1 rounded-[25px] text-sm">
            copie
          </button>
        </div>
      </div>

      {/* ----------- Best Affiliate Section (9 Cards) ----------- */}
      <div className="bg-neutral-900 rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Best affiliate</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 text-black px-4 py-1 rounded-lg"
            >
              + New Affiliates
            </button>
            <button className="bg-red-500 text-white px-4 py-1 rounded-lg">
              pending affiliate 03
            </button>
          </div>
        </div>

        <p className="text-gray-400 text-sm mb-6">Best in a Month</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(9)].map((_, idx) => (
            <AffiliateCard
              key={idx}
              rank={idx + 1}
              name="oussama kemi"
              sales={50}
              amount="100,00"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
