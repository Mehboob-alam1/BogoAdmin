// =============================
// File: src/App.jsx
// =============================
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUser } from "./services/firebaseDb";

// ===== Administration Screens =====
import RoleManagement from "./components/Administration/RoleManagement";
import Customers from "./components/Administration/Customers";
import Merchants from "./components/Administration/Merchants";
import Product from "./components/Administration/Product";
import Promotion from "./components/Administration/Promotion";
import Payment from "./components/Administration/Payment";
import Orders from "./components/Administration/Orders";
import Reservation from "./components/Administration/Reservation";
import Subscriptions from "./components/Administration/Subscriptions";
import LiveChat from "./components/Administration/LiveChat";
import Contact from "./components/Administration/Contact";
import Review from "./components/Administration/Review";
import Notification from "./components/Administration/Notification";
import Report from "./components/Administration/Report";
import AdsManagement from "./components/Administration/AdsManagement";
import TicketManagement from "./components/Administration/TicketManagement";
import Affiliate from "./components/Administration/Affiliate";
import XPpointManagement from "./components/Administration/XPpointManagement";
import AppManagement from "./components/Administration/AppManagement";
import OffersManagement from "./components/Administration/OffersManagement";
import Newmerchants from "./components/Administration/Newmerchants";
import KeywordAdDetails from "./components/Administration/KeywordAdDetails";
import AutoTicketDelivery from "./components/Administration/AutoTicketDelivery";
// ===== Dashboard Shell & Home =====
import DashboardHome from "./components/Administration/DashboardHome";
import Dashboard from "./components/Administration/Dashboard";

// ===== Auth Screens =====
import SignIn from "./components/SignIn";
import Forgot from "./components/Forgot";
import Register from "./components/Register";

function ProtectedRoute({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return user ? children : <Navigate to="/" />;
}

/** Admin only: same as ProtectedRoute but also requires isAdmin === true in Firebase /users/{uid}. */
function AdminRoute({ children }) {
  const [user, setUser] = React.useState(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (!u) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      try {
        const profile = await getUser(u.uid);
        setIsAdmin(profile?.isAdmin === true);
      } catch {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (!user) return <Navigate to="/" />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">Access denied</h1>
          <p className="text-gray-400 mb-4">Only administrators can access the dashboard.</p>
          <a href="/" className="text-green-500 hover:underline">Back to sign in</a>
        </div>
      </div>
    );
  }
  return children;
}

/** If user is already signed in, redirect to dashboard instead of showing SignIn. */
function PublicRoute({ children }) {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return user ? <Navigate to="/dashboard" replace /> : children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ===== Auth Routes (redirect to dashboard if already signed in) ===== */}
        <Route path="/" element={<PublicRoute><SignIn /></PublicRoute>} />
          <Route path="/forgot" element={<Forgot />} /> 
        <Route path="/register" element={<Register />} />

        {/* ===== Admin-only Dashboard (website): requires isAdmin in Firebase ===== */}
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        >
          {/* Default home inside dashboard */}
          <Route index element={<DashboardHome />} />

          {/* Top-level admin modules */}
          <Route path="role-management" element={<RoleManagement />} />
          <Route path="customers" element={<Customers />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="product" element={<Product />} />
          <Route path="newmerchants" element={<Newmerchants />} />
          <Route path="promotion" element={<Promotion />} />
          <Route path="payment" element={<Payment />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reservation" element={<Reservation />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="live-chat" element={<LiveChat />} />
          <Route path="contact" element={<Contact />} />
          <Route path="review" element={<Review />} />
          <Route path="notification" element={<Notification />} />
          <Route path="report" element={<Report />} />
          {/* <Route path="/forgot" element={<Forgot />} /> */}


          {/* Ads Management + nested detail route */}
          <Route path="ads-management" element={<AdsManagement />} />
          <Route path="ads-management/keywords/:id" element={<KeywordAdDetails />} />

          {/* Ticket Management + Auto Ticket Delivery detail */}
            <Route path="ticket-management" element={<TicketManagement />} />
        <Route
          path="ticket-management/auto-ticket-delivery"
          element={<AutoTicketDelivery />}
        />

          <Route path="affiliate" element={<Affiliate />} />
          <Route path="xp-management" element={<XPpointManagement />} />
          <Route path="app-management" element={<AppManagement />} />
          <Route path="offers-management" element={<OffersManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}