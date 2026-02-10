// src/components/Administration/Subscriptions.jsx
import React, { useMemo, useState } from "react";
import SubscriptionForm from "./SubscriptionForm";
import AddCategory from "./AddCategory"; // ✅ same folder import

// Images (assets)
import boya from "../../assets/boya.png";
import boyc from "../../assets/boyc.png";
import set from "../../assets/set.png";

// Icons (react-icons)
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";

/* =============================
   Tokens
============================= */
const BAppColors = {
  bg: "#0F1115",
  surface: "#14171C",
  border: "#242A32",
  text: "#D7DBE0",
  textMuted: "#97A0AA",
  primary: "#8BC255",
  primaryMuted: "#6FA33C",
  purple: "#7C3AED",
  yellow: "#FBBF24",
  orange: "#FB923C",
  success: "#22C55E",
  warn: "#F59E0B",
};

/* =============================
   Primitives
============================= */
const Card = ({ className = "", children, style, onClick, role, tabIndex }) => (
  <div
    className={`rounded-[5px] border ${className}`}
    style={{ borderColor: BAppColors.border, background: BAppColors.surface, ...style }}
    onClick={onClick}
    role={role}
    tabIndex={tabIndex}
  >
    {children}
  </div>
);

const Dot = ({ color }) => (
  <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
);

function NeonButton({ label, onClick, className = "w-full h-10" }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl text-white text-[13px] font-medium bg-[#673AB3] shadow-[0_0_0_2px_#58D6FF,0_0_10px_2px_#58D6FF] ${className}`}
    >
      {label}
    </button>
  );
}

const RoundIconButton = ({ bg, Icon, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className="w-11 h-11 rounded-2xl grid place-items-center shadow-md"
    style={{ background: bg }}
  >
    <Icon size={16} color="#fff" />
  </button>
);

/* =============================
   Donut
============================= */
const Donut = ({ size = 120, thickness = 16, segments = [], centerText }) => {
  const radius = (size - thickness) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#232933" strokeWidth={thickness} />
      {segments.map((seg, idx) => {
        const len = (seg.value / 100) * circumference;
        const dasharray = `${len} ${circumference - len}`;
        const el = (
          <circle
            key={idx}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={thickness}
            strokeDasharray={dasharray}
            strokeDashoffset={-offset}
            strokeLinecap="round"
          />
        );
        offset += len;
        return el;
      })}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#E6EBF2"
        fontSize="14"
        fontWeight="700"
      >
        {centerText ?? segments.reduce((a, b) => a + b.value, 0)}
      </text>
    </svg>
  );
};

/* =============================
   Live data hook (stub)
============================= */
function useLiveMetrics() {
  const [state] = useState({
    customers: 50,
    merchants: 50,
    studentBreakdown: { verified: 90, banned: 0, notVerified: 10 },
    regularBreakdown: { premium: 10, banned: 0, verified: 80, notVerified: 10 },
  });
  return state;
}

/* =============================
   Filter Bar
============================= */
function FilterBar({ active, onChange, onAddCategory }) {
  const tabs = ["Regular", "Student", "company", "free trial"];

  return (
    <div className="col-span-14 -mt--2 flex items-center gap-3">
      <div className="flex items-center gap-3">
        {tabs.map((t) => {
          const isActive = active === t;
          return (
            <button
              key={t}
              onClick={() => onChange(t)}
              className="h-15 px-11 rounded-lg border text-sm font-medium transition"
              style={{
                background: isActive ? BAppColors.primary : "transparent",
                color: isActive ? "#000" : "#d7dbe0",
                borderColor: isActive ? "transparent" : BAppColors.border,
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-3 md:gap-4">
        <RoundIconButton bg="#FF6A3D" Icon={RiDeleteBin6Line} onClick={() => {}} ariaLabel="Delete" />
        <RoundIconButton bg={BAppColors.purple} Icon={LuSettings2} onClick={() => {}} ariaLabel="Settings" />
        <button
          onClick={onAddCategory} // 🔑 yahi se AddCategory open hoga
          className="h-11 px-6 rounded-2xl text-white font-medium"
          style={{ background: BAppColors.yellow }}
        >
          Add category
        </button>
      </div>
    </div>
  );
}

/* =============================
   Pricing Card
============================= */
function PlanCard({ title, priceLabel, per, note, features, badge, onManage, containerStyle }) {
  return (
    <Card className="p-6 flex flex-col" style={{ minHeight: 520, ...containerStyle }}>
      <div className="flex items-center justify-between mb-7">
        <div className="flex items-center gap-3">
          {badge && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#f9c74f] text-black">
              POPULAR
            </span>
          )}
        </div>
      </div>
      <div className="mb-1 text-[#97A0AA] text-xs uppercase tracking-wide">{title}</div>
      <div className="mb-2 text-[#97A0AA] text-xs">{note}</div>
      <div className="flex items-end gap-1 mb-4">
        <span className="text-2xl font-extrabold text-white">{priceLabel}</span>
        <span className="text-xs text-[#97A0AA]">99</span>
        <span className="text-xs text-[#97A0AA]"> {per}</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full" style={{ background: BAppColors.primary }} />
            <span className="text-[13px] text-[#C9D1DB]">{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto">
        <NeonButton label="Subscription management" onClick={onManage} />
      </div>
    </Card>
  );
}

/* =============================
   Overview Screen
============================= */
function OverviewScreen({ onOpenManage, onOpenAddCategory }) {
  const metrics = useLiveMetrics();
  const [activeTab, setActiveTab] = useState("Regular");
  const [actor, setActor] = useState("customers");

  const studentSegments = useMemo(
    () => [
      { value: metrics.studentBreakdown.notVerified, color: BAppColors.warn },
      { value: 10, color: BAppColors.orange },
      { value: metrics.studentBreakdown.verified, color: BAppColors.purple },
      { value: metrics.studentBreakdown.banned, color: BAppColors.success },
    ],
    [metrics]
  );

  const regularSegments = useMemo(
    () => [
      { value: metrics.regularBreakdown.notVerified, color: BAppColors.warn },
      { value: 10, color: BAppColors.orange },
      { value: metrics.regularBreakdown.verified, color: BAppColors.primary },
      { value: metrics.regularBreakdown.premium, color: BAppColors.success },
    ],
    [metrics]
  );

  const sSmall = { width: 141, height: 186, borderRadius: 5 };
  const sLarge = { width: 286, height: 186, borderRadius: 5 };

  const plans =
    actor === "customers"
      ? [
          { title: "normal", price: "$29", per: "per month" },
          { title: "ENTERPRICE", price: "$149", per: "per 6 month", badge: "POPULAR" },
          { title: "ENTERPRICE", price: "$240", per: "per 12 month" },
        ]
      : [
          { title: "normal", price: "$99", per: "per 6 month" },
          { title: "ENTERPRICE", price: "$149", per: "per 12 month" },
          { title: "PRO", price: "$199", per: "per 12 month" },
        ];

  return (
    <div className="min-h-screen w-full" style={{ background: BAppColors.bg }}>
      <div className="mx-auto max-w-6xl px-4 pt-6">
        {/* Five cards in one row */}
        <div className="flex flex-nowrap gap-4 items-stretch overflow-x-auto">
          <Card
            className="p-3 cursor-pointer"
            style={{ ...sSmall, background: actor === "customers" ? BAppColors.primary : BAppColors.surface }}
            onClick={() => setActor("customers")}
            role="button"
            tabIndex={0}
          >
            <div className="h-full w-full flex flex-col items-center">
              <div className="text-[22px] font-bold" style={{ color: actor === "customers" ? "#000" : "#fff" }}>
                {metrics.customers}
              </div>
              <div className="text-xs mt-1" style={{ color: actor === "customers" ? "#000" : BAppColors.textMuted }}>
                Customers
              </div>
              <img src={boyc} alt="customers" className="mt-auto object-contain" style={{ width: 114, height: 104, borderRadius: 12 }} />
            </div>
          </Card>

          <Card
            className="p-3 cursor-pointer"
            style={{ ...sSmall, background: actor === "merchants" ? BAppColors.primary : BAppColors.surface }}
            onClick={() => setActor("merchants")}
            role="button"
            tabIndex={0}
          >
            <div className="h-full w-full flex flex-col items-center">
              <div className="text-[22px] font-bold" style={{ color: actor === "merchants" ? "#000" : "#fff" }}>
                {metrics.merchants}
              </div>
              <div className="text-xs mt-1" style={{ color: actor === "merchants" ? "#000" : BAppColors.textMuted }}>
                merchants
              </div>
              <img src={boya} alt="merchants" className="mt-auto object-contain" style={{ width: 114, height: 124, borderRadius: 12 }} />
            </div>
          </Card>

          <Card className="p-4 flex items-center justify-between" style={sLarge}>
            <div>
              <div className="text-xs" style={{ color: BAppColors.textMuted, fontWeight: 600 }}>student</div>
              <div className="mt-1 flex items-center gap-2">
                <Dot color={BAppColors.purple} /> <span className="text-xs text-[#BFC7D2]">verified</span>
              </div>
            </div>
            <Donut segments={studentSegments} size={110} thickness={16} centerText={metrics.studentBreakdown.verified} />
          </Card>

          <Card className="p-4 flex items-center justify-between" style={sLarge}>
            <div>
              <div className="text-xs" style={{ color: BAppColors.textMuted, fontWeight: 600 }}>Regular</div>
              <div className="mt-1 flex items-center gap-2">
                <Dot color={BAppColors.primary} /> <span className="text-xs text-[#BFC7D2]">verified</span>
              </div>
            </div>
            <Donut segments={regularSegments} size={110} thickness={16} centerText={metrics.regularBreakdown.verified} />
          </Card>

          <Card className="p-4 flex items-center justify-center" style={sLarge}>
            <div className="text-center">
              <img src={set} alt="" />
              <div className="mt-2 text-xs" style={{ color: BAppColors.textMuted }}>Plan Settings</div>
            </div>
          </Card>
        </div>

        {/* Filter Bar */}
        <div className="mt-4">
          <FilterBar
            active={activeTab}
            onChange={setActiveTab}
            onAddCategory={onOpenAddCategory} // ✅ pass handler
          />
        </div>
      </div>

      {/* Pricing */}
      <div className="mx-auto max-w-6xl px-4 mt-4">
        <div className="mb-4">
          <div className="text-xs text-[#97A0AA]">Flexible Pricing</div>
          <h2 className="mt-1 text-white text-[16px] font-semibold">
            Choose the right fit for <br className="sm:hidden" /> your business
          </h2>
        </div>

        <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${3}, minmax(0,1fr))` }}>
          {(actor === "customers"
            ? [
                { title: "normal", price: "$29", per: "per month" },
                { title: "ENTERPRICE", price: "$149", per: "per 6 month", badge: "POPULAR" },
                { title: "ENTERPRICE", price: "$240", per: "per 12 month" },
              ]
            : [
                { title: "normal", price: "$99", per: "per 6 month" },
                { title: "ENTERPRICE", price: "$149", per: "per 12 month" },
                { title: "PRO", price: "$199", per: "per 12 month" },
              ]
          ).map((p, idx) => (
            <PlanCard
              key={idx}
              title={p.title}
              badge={p.badge}
              priceLabel={p.price}
              per={p.per}
              note="Regular"
              features={[
                "Number of individuals: One",
                "Number of offers: Unlimited",
                "Number of days: 7 days a week",
              ]}
              onManage={onOpenManage}
            />
          ))}
        </div>
      </div>

      <footer className="h-10" />
    </div>
  );
}

/* =============================
   App (screen switch)
============================= */
export default function Subscriptions() {
  const [screen, setScreen] = useState("overview"); // 'overview' | 'manage' | 'addCategory'

  if (screen === "manage") return <SubscriptionForm onBack={() => setScreen("overview")} />;
  if (screen === "addCategory") return <AddCategory onBack={() => setScreen("overview")} />;

  return (
    <OverviewScreen
      onOpenManage={() => setScreen("manage")}
      onOpenAddCategory={() => setScreen("addCategory")} // 🔑 opens AddCategory
    />
  );
}
