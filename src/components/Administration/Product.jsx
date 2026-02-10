// src/components/Administration/Products.jsx – wired to Firebase Realtime Database
import React, { useMemo, useState, useEffect } from "react";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import brandLogo from "../../assets/com.png";
import para from "../../assets/para.png";
import parb from "../../assets/parb.png";
import { watchProducts, addProduct, updateProduct, deleteProduct } from "../../services/firebaseDb";

const C = {
  bg: "#0F1115",
  surface: "#14171C",
  surface2: "#292929",
  border: "#242A32",
  text: "#D7DBE0",
  textMuted: "#98A2B3",
  primary: "#8BC255",
  warning: "#F59E0B",
  purple: "#7C3AED",
  orange: "#FB923C",
  success: "#22C55E",
  cyan: "#58D6FF",
};

const Card = ({ style, className = "", children }) => (
  <div className={`border rounded-[5px] ${className}`} style={{ borderColor: C.border, background: C.surface, ...style }}>
    {children}
  </div>
);

/* tiny badge EXACT size for Book / Timing / Visit */
const TinyBadge = ({ text, bg }) => (
  <span
    className="inline-flex items-center justify-center select-none"
    style={{
      width: 62.5896,
      height: 15.6474,
      borderRadius: 10.42,
      background: bg,
      color: "#FFFFFF",
      fontSize: 10,
      lineHeight: "10px",
      fontWeight: 600,
      textTransform: "capitalize",
    }}
  >
    {text}
  </span>
);

function Donut({ size = 140, thickness = 18, segments = [], center, sub }) {
  const r = (size - thickness) / 2;
  const c = size / 2;
  const circ = 2 * Math.PI * r;
  let off = 0;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="#232933" strokeWidth={thickness} />
        {segments.map((s, i) => {
          const len = (s.value / 100) * circ;
          const dash = `${len} ${circ - len}`;
          const el = (
            <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={s.color} strokeWidth={thickness} strokeDasharray={dash} strokeDashoffset={-off} strokeLinecap="round" />
          );
          off += len;
          return el;
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div className="text-white font-bold text-[18px] leading-none">{center}</div>
        {sub && <div className="text-[11px]" style={{ color: C.textMuted }}>{sub}</div>}
      </div>
    </div>
  );
}

function AddProductForm({ onAdded }) {
  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [price, setPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      await addProduct({
        name: name.trim(),
        categoryId: categoryName.trim() || "general",
        categoryName: categoryName.trim() || "General",
        price: parseFloat(price) || 0,
        isActive: true,
      });
      setName("");
      setCategoryName("");
      setPrice("");
      onAdded();
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <span className="text-sm text-white font-medium">Add product (Firebase):</span>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="h-9 px-3 rounded bg-[#151820] text-white text-sm w-40 border border-[#242A32]" />
      <input placeholder="Category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} className="h-9 px-3 rounded bg-[#151820] text-white text-sm w-32 border border-[#242A32]" />
      <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="h-9 px-3 rounded bg-[#151820] text-white text-sm w-24 border border-[#242A32]" />
      <button type="submit" disabled={saving} className="h-9 px-4 rounded text-sm font-medium text-black" style={{ background: C.primary }}>{saving ? "Saving…" : "Add"}</button>
    </form>
  );
}

export default function Products() {
  const [accountFilter, setAccountFilter] = useState("active");
  const [menuOpen, setMenuOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = watchProducts((list) => {
      setRows(list.map((p) => ({
        id: p.id,
        name: p.name || "—",
        tagline: [p.categoryName, p.merchantName].filter(Boolean).join(" • ") || "—",
        category: p.categoryName || p.categoryId || "—",
        price: p.price != null ? `${p.price} $` : "—",
        book: "normal",
        swing: "normal",
        visit: "once",
        status: p.isActive !== false ? "verified" : "Banned",
        date: p.createdAt ? new Date(p.createdAt).toLocaleString() : "—",
        raw: p,
      })));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const spentSegs = useMemo(
    () => [
      { value: 20, color: C.warning },
      { value: 20, color: C.orange },
      { value: 10, color: C.purple },
      { value: 30, color: C.success },
      { value: 20, color: C.cyan },
    ],
    []
  );
  const verifiedSegs = useMemo(
    () => [
      { value: 10, color: C.warning },
      { value: 10, color: C.orange },
      { value: 70, color: C.primary },
      { value: 10, color: C.success },
    ],
    []
  );

  const GRID = "220px 120px 90px 140px 140px 140px 100px 150px 70px"; // ~1170px
  const headerBg = "#292929";
  const cellBg = [
    "#292929", // Company
    "#171717", // Category
    "#292929", // Price
    "#171717", // Book
    "#292929", // Timing
    "#171717", // Visit
    "#292929", // Status
    "#171717", // Date
    "#292929", // Action
  ];

  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      <div className="mx-auto max-w-[1280px] px-4 py-6">
        {/* ---------- TOP STRIP (unchanged) ---------- */}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2" style={{ width: 401 }}>
            <div className="flex gap-2">
              <Card style={{ width: 197, height: 97, borderRadius: 4.01 }} className="p-3 flex items-center gap-3">
                <img src={parb} alt="accepted" className="h-33 w-18 rounded-lg object-contain" />
                <div>
                  <div className="text-white font-bold text-[18px] leading-none">1500</div>
                  <div className="text-[11px]" style={{ color: C.textMuted }}>Accepted Product</div>
                </div>
              </Card>
              <Card style={{ width: 197, height: 99, borderRadius: 4.01, background: C.surface2 }} className="p-3 flex items-center gap-3">
                <img src={para} alt="pending" className="h-33 w-18 rounded-lg object-contain" />
                <div>
                  <div className="text-white font-bold text-[18px] leading-none">10</div>
                  <div className="text-[11px]" style={{ color: C.textMuted }}>Pending Product</div>
                </div>
              </Card>
            </div>
            <Card style={{ width: 401, height: 177, borderRadius: 5 }} className="p-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] mb-1 flex items-center gap-2" style={{ color: C.textMuted }}>
                  vitrified product
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full text-[11px]" style={{ background: "#1b3822", color: "#fff" }}>ok</span>
                  <span className="px-2 py-1 rounded-full text-[11px]" style={{ background: "#3a1e1e", color: "#fff" }}>banned</span>
                </div>
              </div>
              <Donut size={150} thickness={18} segments={verifiedSegs} center="1500" />
            </Card>
          </div>

          <Card style={{ width: 332, height: 284, borderRadius: 5.68 }} className="p-3 flex items-center justify-between">
            <div className="flex-1">
              <div className="text-[12px] mb-1 text-white">Spent Chart</div>
              <div className="text-[11px]" style={{ color: C.textMuted }}>
                20% hotels • 20% delivery • 10% beauty • 30% entertainment • 20% sport
              </div>
              <div className="mt-4">
                <Donut size={170} thickness={18} segments={useMemo(() => spentSegs, [spentSegs])} center="100%" />
              </div>
            </div>
          </Card>

          <Card style={{ width: 420, height: 284, borderRadius: 5 }} className="p-4">
            <div className="text-[12px] text-white mb-3">Statistic</div>
            <StatRow label="beauty" value={80} color={C.purple} />
            <StatRow label="delivery" value={100} color={C.cyan} />
            <StatRow label="sport" value={50} color={C.orange} />
            <StatRow label="entertainment" value={90} color={C.success} />
            <StatRow label="hotels" value={65} color={C.primary} />
          </Card>
        </div>

        {/* Add Product – Firebase */}
        <div className="mt-4 p-3 rounded-lg" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
          <AddProductForm onAdded={() => {}} />
        </div>

        {/* ---------- FILTER BAR ---------- */}
        <div className="mt-7 flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 h-10 rounded-lg" style={{ width: 240, background: "#151820", border: `1px solid ${C.border}` }}>
            <FiSearch size={16} color={C.textMuted} />
            <input placeholder="Search" className="bg-transparent outline-none text-sm text-white w-full" />
          </div>

          <div className="relative">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              className="h-10 px-4 rounded-lg text-sm flex items-center gap-2"
              style={{ background: "#151820", border: `1px solid ${C.border}`, color: "white" }}
            >
              ACCOUNT <FaChevronDown size={12} />
            </button>
            {menuOpen && (
              <div className="absolute mt-1 w-48 rounded-md overflow-hidden z-10" style={{ background: C.surface, border: `1px solid ${C.border}` }}>
                {[{ key: "active", label: "Active" }, { key: "banned", label: "Banned account" }].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setAccountFilter(opt.key); setMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-[#1b2026]"
                    style={{ color: "#e5e7eb" }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------- TABLE ---------- */}
        <div className="mt-3 rounded-lg overflow-hidden">
          {/* header */}
          <div className="grid items-center px-[10px] h-[60px] rounded-md" style={{ width: "100%", background: "#292929", gridTemplateColumns: GRID }}>
            {["Company Name", "Category", "Price", "Book", "Timing", "Visit", "Status", "Date", "Action"].map((h) => (
              <div key={h} className="text-[12px] text-white">{h}</div>
            ))}
          </div>

          {/* rows – from Firebase */}
          {loading ? (
            <div className="px-4 py-8 text-center" style={{ color: C.textMuted }}>Loading products…</div>
          ) : (
          rows
            .filter((r) => (accountFilter === "active" ? r.status === "verified" : r.status !== "verified"))
            .map((r) => (
              <div key={r.id} className="grid items-stretch" style={{ width: "100%", gridTemplateColumns: GRID }}>
                {[
                  <div className="flex items-center gap-2 h-[56px] px-3">
                    <img src={brandLogo} alt="logo" className="h-10 w-10 rounded-lg object-contain" />
                    <div className="leading-tight">
                      <div className="text-white text-[13px]">{r.name}</div>
                      <div className="text-[11px]" style={{ color: C.textMuted }}>{r.tagline}</div>
                    </div>
                  </div>,
                  <div className="h-[56px] flex items-center px-3 text-[12px] text-white">{r.category}</div>,
                  <div className="h-[56px] flex items-center px-3 text-[12px] text-white">{r.price}</div>,

                  /* Book → #FF5726 */
                  <div className="h-[56px] flex items-center px-3 justify-start">
                    <TinyBadge text={r.book} bg="#FF5726" />
                  </div>,

                  /* Timing → #673AB3 */
                  <div className="h-[56px] flex items-center px-3 justify-start">
                    <TinyBadge text={r.swing} bg="#673AB3" />
                  </div>,

                  /* Visit → #FFC02D */
                  <div className="h-[56px] flex items-center px-3 justify-start">
                    <TinyBadge text={r.visit} bg="#FFC02D" />
                  </div>,

                  <div className="h-[56px] flex items-center px-3 text-[12px] text-white">{r.status}</div>,
                  <div className="h-[56px] flex items-center px-3 text-[12px]" style={{ color: C.textMuted }}>{r.date}</div>,
                  <div className="h-[56px] flex items-center justify-end px-3">
                    <button className="h-9 w-9 rounded-full grid place-items-center" style={{ background: "#FFFFFF", border: `1px solid ${C.border}` }} title="open">
                      <FiArrowRight color="#000" />
                    </button>
                  </div>,
                ].map((cell, idx) => (
                  <div key={idx} className="border-b" style={{ background: cellBg[idx], borderColor: C.border }}>
                    {cell}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value, color }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[12px]" style={{ color: C.textMuted }}>{label}</span>
        <span className="text-[12px] text-white">{value}</span>
      </div>
      <div className="h-2 w-full rounded-full" style={{ background: "#1b2026" }}>
        <div className="h-2 rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}
