import React, { useState } from "react";
import logo from "../../assets/bogo.png";
import { Link, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  Package,
  Tag,
  CreditCard,
  ShoppingBag,
  Calendar,
  Layers,
  MessageCircle,
  Phone,
  Star,
  Bell,
  FileText,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Search,
  Flag,
  Ticket,
  Gift,
  Smartphone,
  Award,
  Send,
  Mail,
  ChevronDown,
} from "lucide-react";

// Sidebar menu items
const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Role Management", path: "/dashboard/role-management", icon: Flag },
  { name: "Customers", path: "/dashboard/customers", icon: Users },
  { name: "Merchants", path: "/dashboard/merchants", icon: Store },
  { name: "Product", path: "/dashboard/product", icon: Package },
  { name: "Promotion", path: "/dashboard/promotion", icon: Tag },
  { name: "Payment", path: "/dashboard/payment", icon: CreditCard },
  { name: "Orders", path: "/dashboard/orders", icon: ShoppingBag },
  { name: "Reservation", path: "/dashboard/reservation", icon: Calendar },
  { name: "Subscriptions", path: "/dashboard/subscriptions", icon: Layers },
  { name: "Live Chat", path: "/dashboard/live-chat", icon: MessageCircle },
  { name: "Contact", path: "/dashboard/contact", icon: Phone },
  { name: "Review", path: "/dashboard/review", icon: Star },
  { name: "Notification", path: "/dashboard/notification", icon: Bell },
  { name: "Report", path: "/dashboard/report", icon: FileText },
  { name: "Ads Management", path: "/dashboard/ads-management", icon: Megaphone },
  { name: "Ticket Management", path: "/dashboard/ticket-management", icon: Ticket },
  { name: "Affiliate", path: "/dashboard/affiliate", icon: Users },
  { name: "XP point management", path: "/dashboard/xp-management", icon: Award },
  { name: "App Management", path: "/dashboard/app-management", icon: Smartphone },
  { name: "Offers Management", path: "/dashboard/offers-management", icon: Gift },
];

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-[#232323] p-4 flex flex-col transition-all duration-300 relative`}
      >
        {/* Toggle Sidebar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-6 bg-gray-800 rounded-full p-1"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6">
          <img src={logo} alt="logo" />
        </h1>

        {/* Country Selector */}
        <div className="bg-black px--3 py-3 rounded-lg mb-7 text-center text-sm">
          Canada
        </div>

        {/* Sidebar Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-full transition text-white hover:bg-[#8BC255]"
            >
              <item.icon className="w-5 h-5" />
              {isOpen && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* ✅ Top Bar inside Card */}
        <div className="bg-[#212121] border border-black rounded-xl shadow-md p-4 flex justify-between items-center">
          {/* Search Box */}
          <div className="flex items-center bg-black border border-gray-700 px-4 py-2 rounded-full w-96">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none text-sm flex-1"
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {[{ icon: Send }, { icon: Bell, notification: true }, { icon: Mail }].map(
              (item, idx) => (
                <div
                  key={idx}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-600 hover:bg-gray-800 cursor-pointer"
                >
                  <item.icon className="w-5 h-5 text-gray-300" />
                  {item.notification && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </div>
              )
            )}

            {/* Profile */}
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
              <span className="hidden md:inline">Alex Robert</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 👇 Nested Routes Render Here */}
        <Outlet />
      </div>
    </div>
  );
}

// this is done