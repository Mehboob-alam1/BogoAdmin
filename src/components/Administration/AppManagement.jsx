import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import smal from "../../assets/smal.png";   // customer avatar
import smalll from "../../assets/smalll.png"; // merchant avatar

const AppManagement = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [openIndex, setOpenIndex] = useState(null);

  const tabs = [
    { id: "customers", label: "Customers App", avatar: smal },
    { id: "merchants", label: "merchants app", avatar: smalll },
  ];

  const menuItems = [
    { 
      title: "About us",
      content: "Our platform is built to make logistics and fleet operations simple, secure, and transparent. Customers can easily manage tasks in real-time." 
    },
    { 
      title: "R.o.u",
      content: "Rules of Use ensure fairness, safety, and compliance. Every customer and merchant is expected to follow these guidelines strictly." 
    },
    { 
      title: "FAQ",
      content: "Find answers to the most commonly asked questions about accounts, orders, payments, and app features." 
    },
  ];

  const toggleParagraph = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      {/* Card */}
      <div className="w-full max-w-2xl bg-[#171717] rounded-2xl shadow-lg p-6">
        {/* Tabs */}
        <div className="flex w-full rounded-lg overflow-hidden border border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 transition text-lg font-medium ${
                activeTab === tab.id
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 text-white"
              }`}
            >
              <img
                src={tab.avatar}
                alt={tab.label}
                className="w-9 h-9 rounded-full"
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">About us</h2>

          <div className="space-y-2">
            {menuItems.map((item, i) => (
              <div key={i}>
                {/* Button Row */}
                <div
                  onClick={() => toggleParagraph(i)}
                  className="flex items-center justify-between border-b border-gray-700 py-5 px-3 cursor-pointer hover:bg-gray-800 transition rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-lg">
                      i
                    </div>
                    <span className="text-base md:text-lg">{item.title}</span>
                  </div>
                  {openIndex === i ? (
                    <ChevronDown className="text-gray-400 w-6 h-6" />
                  ) : (
                    <ChevronRight className="text-gray-400 w-6 h-6" />
                  )}
                </div>

                {/* Paragraph (expand/collapse) */}
                {openIndex === i && (
                  <p className="mt-3 mb-4 text-gray-300 text-sm md:text-base px-3">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppManagement;
