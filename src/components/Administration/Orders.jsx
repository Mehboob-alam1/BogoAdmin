// Orders – wired to Firebase Realtime Database
import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";
import { watchOrders, updateOrderStatus } from "../../services/firebaseDb";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = watchOrders((list) => {
      setOrders(list.map((o) => ({
        ...o,
        createdAtStr: o.createdAt ? new Date(o.createdAt).toLocaleString() : "—",
      })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const setStatus = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
    } catch (e) {
      console.error(e);
      alert("Failed to update order");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-semibold mb-6">Orders (Firebase Realtime DB)</h1>
      {loading ? (
        <p className="text-gray-400">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">No orders yet. Orders from the app will appear here.</p>
      ) : (
        <div className="space-y-4 max-w-5xl">
          {orders.map((o) => (
            <div key={o.id} className="bg-neutral-900 rounded-2xl p-6 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Order #{o.id.slice(-8)}</p>
                  <p className="font-medium">{o.userEmail || o.userId}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {Array.isArray(o.items) ? o.items.length : 0} item(s) • Total: {o.totalAmount != null ? `${o.totalAmount} $` : "—"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{o.createdAtStr}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    o.status === "confirmed" || o.status === "delivered" ? "bg-green-900/50 text-green-300" :
                    o.status === "cancelled" ? "bg-red-900/50 text-red-300" : "bg-yellow-900/50 text-yellow-300"
                  }`}>
                    {o.status || "pending"}
                  </span>
                  {o.status === "pending" && (
                    <>
                      <button
                        onClick={() => setStatus(o.id, "confirmed")}
                        className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-600 flex items-center gap-1"
                      >
                        <Check size={18} /> Accept
                      </button>
                      <button
                        onClick={() => setStatus(o.id, "cancelled")}
                        className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 flex items-center gap-1"
                      >
                        <X size={18} /> Reject
                      </button>
                    </>
                  )}
                  {o.status === "confirmed" && (
                    <button
                      onClick={() => setStatus(o.id, "delivered")}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-600"
                    >
                      Mark delivered
                    </button>
                  )}
                </div>
              </div>
              {Array.isArray(o.items) && o.items.length > 0 && (
                <ul className="mt-3 pt-3 border-t border-neutral-700 text-sm text-gray-400">
                  {o.items.map((item, i) => (
                    <li key={i}>{item.productName} × {item.quantity} @ {item.unitPrice} $</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
