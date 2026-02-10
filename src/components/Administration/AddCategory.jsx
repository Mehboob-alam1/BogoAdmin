import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa6";
import { addCategory } from "../../services/firebaseDb";

/* Local tokens (same palette you’re using) */
const C = {
  bg: "#0F1115",
  surface: "#14171C",
  border: "#242A32",
  text: "#D7DBE0",
  textMuted: "#97A0AA",
  primary: "#8BC255",
  danger: "#FF6A3D",
};

export default function AddCategory({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    country: "All countries",
    currency: "USD",
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const handleSave = async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      await addCategory({ name: form.name.trim(), sortOrder: 0, isActive: true });
      setForm((s) => ({ ...s, name: "" }));
      alert("Category saved. It will appear in the app.");
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen w-full" style={{ background: C.bg }}>
      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-white text-[28px] font-semibold">Add new category</h1>
          <div className="flex items-center gap-3">
            <button
              className="h-11 px-6 rounded-2xl text-white font-medium disabled:opacity-50"
              style={{ background: C.primary }}
              onClick={handleSave}
              disabled={saving || !form.name.trim()}
            >
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              onClick={onBack}
              className="w-11 h-11 rounded-2xl grid place-items-center"
              style={{ background: C.danger }}
              title="Back / Delete"
            >
              <RiDeleteBin6Line size={18} color="#fff" />
            </button>
          </div>
        </div>

        {/* Top inputs (3 columns) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <CapsuleField
            label="NAme category"
            value={form.name}
            placeholder="doctor"
            onChange={(e) => set("name", e.target.value)}
          />
          <CapsuleSelect
            label="specific countries"
            value={form.country}
            options={["All countries", "USA", "UK", "Germany", "France", "India"]}
            onChange={(v) => set("country", v)}
          />
          <CapsuleCurrency
            label="Currency"
            value={form.currency}
            options={["USD", "EUR", "GBP", "PKR", "INR", "AED"]}
            onChange={(v) => set("currency", v)}
          />
        </div>

        {/* Three dashed tiles */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((i) => (
            <Tile key={i} />
          ))}
        </div>

        <p className="mt-6 text-xs" style={{ color: C.textMuted }}>
          Add three subscriptions
        </p>
      </div>
    </div>
  );
}

/* ------- small atoms used above ------- */
const pill = {
  height: 56,
  borderRadius: 16,
  border: `1px solid ${C.border}`,
  background: "#151820",
  color: C.text,
};

function CapsuleField({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs mb-1" style={{ color: C.textMuted }}>{label}</span>
      <div className="flex items-center" style={{ ...pill, padding: "0 16px" }}>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
      </div>
    </div>
  );
}

function CapsuleSelect({ label, value, options = [], onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs mb-1" style={{ color: C.textMuted }}>{label}</span>
      <div className="flex items-center justify-between" style={{ ...pill, padding: "0 16px" }}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none w-full"
        >
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <FaChevronDown className="opacity-70" />
      </div>
    </div>
  );
}

function CapsuleCurrency({ label, value, options = [], onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs mb-1" style={{ color: C.textMuted }}>{label}</span>
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-between flex-1" style={{ ...pill, padding: "0 16px" }}>
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent outline-none w-full"
          >
            {options.map((o) => <option key={o}>{o}</option>)}
          </select>
          <FaChevronDown className="opacity-70" />
        </div>
        <div
          className="w-12 h-12 rounded-2xl grid place-items-center"
          style={{ background: "#2A2F36", border: `1px solid ${C.border}` }}
          title="Currency symbol"
        >
          $
        </div>
      </div>
    </div>
  );
}

function Tile() {
  return (
    <div
      className="rounded-xl"
      style={{
        border: `1px dashed ${C.border}`,
        background: "#101418",
        minHeight: 320,
      }}
    >
      <div className="h-full w-full p-6">
        <div
          className="h-[130px] w-[130px] mx-auto mt-16 rounded-lg grid place-items-center"
          style={{ border: `2px dashed ${C.border}` }}
        >
          <div className="h-12 w-12 rounded-full grid place-items-center" style={{ background: "#2A2F36" }}>
            <FiPlus color="#D7DBE0" size={22} />
          </div>
        </div>
        <p className="mt-6 text-center text-sm" style={{ color: C.textMuted }}>
          Add new category
        </p>
      </div>
    </div>
  );
}
