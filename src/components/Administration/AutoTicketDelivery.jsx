// =============================
// File: src/components/Administration/AutoTicketDelivery.jsx
// =============================
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TICKET_ICON from "../../assets/cop.png";

/* ---------- UI atoms ---------- */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full shadow-inner transition-colors ${
        checked ? "bg-[#91D363]" : "bg-[#4B4B4B]"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function Stepper({ value, setValue, min = 0, max = 60 }) {
  const inc = () => setValue((v) => Math.min(max, v + 1));
  const dec = () => setValue((v) => Math.max(min, v - 1));
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={dec}
        className="grid place-items-center w-8 h-8 rounded-2xl bg-[#171717] text-white/80 border border-white/10"
        aria-label="Decrease"
      >
        <span className="-mt-[2px] text-lg">▾</span>
      </button>
      <div className="min-w-6 text-center font-semibold text-white">{value}</div>
      <button
        type="button"
        onClick={inc}
        className="grid place-items-center w-8 h-8 rounded-2xl bg-[#171717] text-white/80 border border-white/10"
        aria-label="Increase"
      >
        <span className="-mt-[2px] text-lg">▴</span>
      </button>
    </div>
  );
}

function Pill({ children, style }) {
  return (
    <div
      className="flex items-center justify-between px-5"
      style={{
        background: "#222222",
        height: 110,
        borderRadius: 35,
        border: "1px solid rgba(255,255,255,0.06)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Rule row (collapsible with Date section inside) ---------- */
function RuleRow({ rule, defaultExpanded = false, onChange }) {
  const [enabled, setEnabled] = useState(rule.enabled);
  const [duration, setDuration] = useState(rule.duration);
  const [unit, setUnit] = useState(rule.unit);
  const [condition, setCondition] = useState(rule.condition);
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // condition popover
  const [condOpen, setCondOpen] = useState(false);
  const condRef = useRef(null);
  const CONDITION_OPTIONS = [
    "man",
    "women",
    "Former Paid Account Users",
    "Paid Account Users",
    "Free Account Users",
  ];

  useEffect(() => {
    onChange?.({ enabled, duration, unit, condition, expanded, selectedDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, duration, unit, condition, expanded, selectedDate]);

  useEffect(() => {
    function onDocClick(e) {
      if (condRef.current && !condRef.current.contains(e.target)) setCondOpen(false);
    }
    function onEsc(e) {
      if (e.key === "Escape") setCondOpen(false);
    }
    if (condOpen) {
      document.addEventListener("mousedown", onDocClick);
      document.addEventListener("keydown", onEsc);
    }
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [condOpen]);

  // lightweight 2-week date strip
  const days = useMemo(() => {
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() - (today.getDay() || 7) + 1);
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  }, []);

  return (
    <div
      className="w-full mx-auto transition-all"
      style={{
        width: 1137,
        height: expanded ? 517 : 251,
        background: "#171717",
        borderRadius: 35,
        border: "1px solid rgba(255,255,255,0.06)",
        padding: 24,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-white text-[20px] font-semibold">{rule.title}</div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="grid place-items-center w-8 h-8 rounded-full bg-[#222] text-white/80 border border-white/10"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? "▸" : "▾"}
          </button>
          <Toggle checked={enabled} onChange={setEnabled} />
        </div>
      </div>

      {/* Labels */}
      <div className="hidden md:grid grid-cols-3 text-white/70 text-xs mb-2" style={{ columnGap: 32 }}>
        <div>Name</div>
        <div>Expiration Date</div>
        <div>Condition</div>
      </div>

      {/* Controls row */}
      <div className="flex items-center" style={{ gap: 32 }}>
        {/* Name pill */}
        <Pill style={{ width: 405 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl grid place-items-center" style={{ background: "#673AB3" }}>
              <img src={TICKET_ICON} alt="ticket" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-sm font-medium text-white">{rule.name}</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-lg leading-none">▾</span>
          </div>
        </Pill>

        {/* Expiration group */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <Pill style={{ width: 150 }}>
            <Stepper value={duration} setValue={setDuration} />
          </Pill>
          <Pill style={{ width: 168 }}>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full"
            >
              <option value="months">months</option>
              <option value="days">days</option>
              <option value="years">years</option>
            </select>
            <span className="ml-2 text-lg">▾</span>
          </Pill>
        </div>

        {/* Condition pill with custom popover (opens on ▾) */}
        <div className="relative" style={{ width: 334 }} ref={condRef}>
          <Pill style={{ width: 334 }}>
            <span className="text-sm text-white">{condition}</span>
            <button
              type="button"
              onClick={() => setCondOpen((o) => !o)}
              className="ml-2 grid place-items-center w-7 h-7 rounded-full bg-[#1b1b1b] text-white/80 border border-white/10"
              aria-haspopup="listbox"
              aria-expanded={condOpen}
              aria-label="Open condition menu"
            >
              ▾
            </button>
          </Pill>

          {condOpen && (
            <div
              role="listbox"
              className="absolute left-0 top-[118px] w-full z-20 p-2"
              style={{
                background: "#222222",
                borderRadius: 24,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {CONDITION_OPTIONS.map((opt) => {
                const active = opt === condition;
                return (
                  <button
                    key={opt}
                    role="option"
                    aria-selected={active}
                    type="button"
                    onClick={() => {
                      setCondition(opt);
                      setCondOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-2xl mb-1 ${
                      active ? "bg-[#91D363] text-black" : "bg-transparent text-white"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Last section (only when expanded) */}
      {expanded && (
        <div className="mt-6">
          <div className="text-white/90 text-[14px] font-semibold mb-3">Date</div>
          <div
            className="w-full"
            style={{
              width: 1081.014,
              height: 184.246,
              background: "#222222",
              borderRadius: 36.06,
              border: "1px solid rgba(255,255,255,0.06)",
              padding: 24,
            }}
          >
            <div className="flex items-center justify-between text-xs text-white/70 mb-4">
              <span>Start date</span>
              <span>{selectedDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {days.map((d) => {
                const isSel = d.toDateString() === selectedDate.toDateString();
                return (
                  <button
                    key={d.toISOString()}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`w-10 h-10 rounded-full grid place-items-center text-sm ${
                      isSel ? "bg-[#91D363] text-black" : "bg-[#0F0F0F] text-white"
                    }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="w-full flex justify-end mt-8">
            <button
              type="button"
              className="h-12 px-14 rounded-full font-semibold"
              style={{ background: "#91D363", color: "#0B0B0B" }}
            >
              save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Page ---------- */
export default function AutoTicketDelivery() {
  const navigate = useNavigate();

  // App Usage first (collapsed), Free trial second (expanded with Date + Save)
  const [rules, setRules] = useState([
    {
      id: 1,
      title: "App Usage",
      name: "App Usage",
      duration: 1,
      unit: "months",
      condition: "women",
      enabled: true,
      expanded: false,
    },
    {
      id: 2,
      title: "Free trial ticket",
      name: "Free trial ticket",
      duration: 1,
      unit: "months",
      condition: "man",
      enabled: true,
      expanded: true,
    },
  ]);

  return (
    <div className="min-h-screen w-full text-white" style={{ background: "#0f0f0f" }}>
      <div className="mx-auto max-w-[1330px] px-4 py-6 space-y-5">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-white/80 hover:text-white border border-white/10 rounded-xl px-4 py-2"
          >
            ← Back
          </button>
          <div />
        </div>

        <div className="rounded-3xl border border-white/10" style={{ background: "#101010", padding: 18 }}>
          <h2 className="text-xl font-bold">Auto Ticket Delivery</h2>
        </div>

        <div className="rounded-3xl border border-white/10 p-6 flex flex-col items-center gap-6" style={{ background: "#0b0b0b" }}>
          {rules.map((r) => (
            <RuleRow
              key={r.id}
              rule={r}
              defaultExpanded={r.expanded}
              onChange={(updated) => {
                setRules((prev) => prev.map((x) => (x.id === r.id ? { ...x, ...updated } : x)));
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
