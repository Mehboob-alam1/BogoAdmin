import React from "react";
import lighting from "../../assets/lightning.png";
import light from "../../assets/light.png";
import lighingg from "../../assets/lightninggg.png";
import box from "../../assets/boxone.png";
import boxx from "../../assets/boxtwo.png";
import boxxx from "../../assets/boxth.png"

const rewards = [
  { xp: "200XP", img: lighting, price: "200 DA" },
  { xp: "300XP", img: light, price: "300 DA" },
  { xp: "500XP", img: lighingg, price: "500 DA" },
  { xp: "1200XP", img: box, price: "1000 DA" },
  { xp: "2000XP", img: boxx, price: "2000 DA" },
  { xp: "3500XP", img: boxxx, price: "2000 DA" },

];

export default function XPpointManagement() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
        {rewards.map((reward, index) => (
          <div
            key={index}
            className="bg-[#1f1f1f] rounded-xl p-15 flex flex-col items-center shadow-lg"
          >
            {/* XP */}
            <div className="flex justify-between w-full items-center mb-2 px-15">
              <span className="text-white font-semibold">{reward.xp}</span>
              <button className="text-gray-400 hover:text-white">⟳</button>
            </div>

            {/* Image */}
            <img
              src={reward.img}
              alt={reward.xp}
              className="h-38 w-38 object-cover mb-3"
            />

            {/* Price Button */}
            <button className="bg-green-500 text-black font-bold py-2 px-6 rounded-full hover:bg-green-400 transition">
              {reward.price}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
