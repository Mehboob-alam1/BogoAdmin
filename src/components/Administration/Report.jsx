import React from "react";
import vlc from "../../assets/vlc.png"; 
import mxplay from "../../assets/mxplay.png";
import king from "../../assets/king.png";
import bulb from "../../assets/bulb.png";
import msg from "../../assets/msg.png";
import men from "../../assets/men.png";
import time from "../../assets/time.png";

const Report = () => {
  const stats = [
    { count: "04", title: "Report a problem", color: "bg-green-400", img: vlc },
    { count: "01", title: "Report a violation", color: "bg-gray-900", img: mxplay },
    { count: "00", title: "Membership request", color: "bg-gray-900", img: king },
    { count: "00", title: "Query", color: "bg-gray-900", img: bulb },
    { count: "00", title: "Report", color: "bg-gray-900", img: msg },
  ];

  const messages = [
    { name: "Eten Hunt", time: "1m Ago", text: "Report a problem", active: true, img: men },
    { name: "Emory Konsgard", time: "3m Ago", text: "Report a problem", img: time },
    { name: "Jeremy Zucker", time: "4m Ago", text: "Report a problem", img: men },
    { name: "Nadia Lauren", time: "5m Ago", text: "Report a problem", img: time },
    { name: "Jason Momoa", time: "6m Ago", text: "Report a problem", img: men },
    { name: "Jakob Saris", time: "7m Ago", text: "Report a problem", img: time },
  ];

  return (
    <div className="bg-black min-h-screen text-white p-6">
      {/* ==== Top Cards ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl flex items-center gap-4 text-black ${s.color}`}
          >
            <img
              src={s.img}
              alt={s.title}
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{s.count}</span>
              <span className="text-sm">{s.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ==== Main Content ==== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side Messages */}
        <div className="col-span-1 bg-zinc-900 rounded-xl p-5">
          <h2 className="font-semibold mb-5 text-lg">Messages</h2>
          <div className="space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-lg cursor-pointer ${
                  m.active ? "bg-zinc-700" : "hover:bg-zinc-800"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="w-11 h-11 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.text}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{m.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Form */}
        <div className="col-span-2 bg-zinc-900 rounded-xl p-7">
          {/* Profile Row */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <img
                src={men}
                alt="user"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-lg">Eten Hunt</p>
                <p className="text-sm text-gray-400">Report a problem</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg text-sm">
                Standby mode
              </button>
              <button className="bg-green-500 text-black px-5 py-2 rounded-lg text-sm">
                Compact
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                type="text"
                placeholder="annie macid"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Phone Number</label>
              <input
                type="text"
                placeholder="0550738885"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                placeholder="abcdusaj@gmail.com"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Best time to call</label>
              <input
                type="text"
                placeholder="10:00 AM"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">
                Preferred means of communication
              </label>
              <input
                type="text"
                placeholder="phone number"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Inquiry type</label>
              <input
                type="text"
                placeholder="Report a problem"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm"
              />
            </div>

            <div className="col-span-2">
              <label className="text-sm text-gray-400">
                The nature of the problem
              </label>
              <textarea
                placeholder="bug"
                className="w-full mt-1 p-3 rounded-lg bg-zinc-800 text-sm h-28"
              ></textarea>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-5 mt-8">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg text-sm">
              Send via email
            </button>
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg text-sm">
              Start the conversation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;



