import React, { useMemo, useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Search, ArrowUpDown } from "lucide-react";
import { watchUsers, updateUser } from "../../services/firebaseDb";
import boy from "../../assets/boys.png";
import boys from "../../assets/boy.png";

/* ================== Helpers ================== */
const normalizeStatus = (s) => {
  const st = String(s || "")
    .trim()
    .toLowerCase();
  if (st.includes("not")) return "Not verified";
  if (st === "verified") return "verified";
  if (st === "banned") return "Banned";
  return s || "—";
};

const normalizeAccount = (s) => {
  const st = String(s || "")
    .trim()
    .toLowerCase();
  if (st.includes("premium")) return "PREMIUM";
  if (st.includes("free trial")) return "free trial";
  if (st.includes("free")) return "FREE";
  return s;
};

/* ================== Demo Data (customers) ================== */
function makeCustomers() {
  const first = {
    id: 9944564557,
    fullName: "Nur Khan",
    email: "nurkhan@mail.com",
    phone: "0987654321",
    avatar: "https://i.pravatar.cc/100?img=1",
    xp: "2000 XP",
    offers: "25",
    booking: "25",
    loyalty: "25",
    groupOrder: "25",
    account: "PREMIUM",
    offences: "O1",
    joinedOn: "12/7/2023 1:58:05 PM",
    lastLogin: "12/7/2023 1:58:05 PM",
    subscription: "06",
    giftsSent: "01",
    giftsReceived: "01",
    status: "Banned",
    bannedDays: 30,
    dob: "16-12-1999",
    username: "atif000",
    gender: "male",
  };

  const items = Array.from({ length: 24 }).map((_, i) => {
    const n = i + 2;
    return {
      id: 1000000000 + i,
      fullName: [
        "Kate Lau",
        "Marías Fernanda Suárez",
        "Aishwarya Kumar",
        "Moiz Ahmed",
        "Fatima Noor",
        "Adeel Khan",
        "Anna Paul",
        "David Kim",
      ][i % 8],
      email: `user${n}@gmail.com`,
      phone: `0${(987654321 + i).toString().slice(0, 10)}`,
      avatar: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
      xp: `${[150, 200, 250, 50, 100][i % 5]} XP`,
      offers: `${20 + (i % 15)}`,
      booking: `${(i % 10) + 1}`,
      loyalty: `${(i % 10) + 1}`,
      groupOrder: `${(i % 10) + 1}`,
      account: ["FREE", "free trial", "PREMIUM"][i % 3],
      offences: ["O0", "O1", "O3"][i % 3],
      joinedOn: `12/${(i % 7) + 1}/2023 1:58:05 PM`,
      lastLogin: `12/${(i % 7) + 1}/2023 1:58:05 PM`,
      subscription: `${(i % 10) + 1}`.padStart(2, "0"),
      giftsSent: `${(i % 3) + 1}`.padStart(2, "0"),
      giftsReceived: `${(i % 2) + 1}`.padStart(2, "0"),
      status: ["verified", "Banned", "Not verified"][i % 3],
      bannedDays: 30,
      dob: "16-12-1999",
      username: "atif000",
      gender: ["male", "female"][i % 2],
    };
  });
  return [first, ...items];
}

/* ================== Primitives ================== */
const Card = ({ children, style, className = "" }) => (
  <div className={`rounded-[10px] overflow-hidden ${className}`} style={style}>
    {children}
  </div>
);

/* ================== Charts (top section) ================== */
const spentChartData = [
  { name: "restaurants", value: 30, color: "#7C3AED" },
  { name: "hotels", value: 10, color: "#22C55E" },
  { name: "beauty", value: 15, color: "#F59E0B" },
  { name: "entertainment", value: 10, color: "#06B6D4" },
  { name: "sport", value: 15, color: "#8B5CF6" },
  { name: "coupon", value: 20, color: "#F97316" },
];

function CardSection() {
  const genderData = [
    { name: "men", value: 63, color: "#7C3AED" },
    { name: "women", value: 37, color: "#F97316" },
  ];
  const accountDonut = [
    { name: "premium", value: 900, color: "#22C55E" },
    { name: "free", value: 600, color: "#F59E0B" },
  ];
  const verifiedDonut = [
    { name: "verified", value: 900, color: "#22C55E" },
    { name: "Not verified", value: 600, color: "#F59E0B" },
  ];

  return (
    <div className="w-full mb-6">
      <div className="flex gap-3">
        <Card style={{ width: 440, height: 167, background: "#8BC255" }}>
          <div className="h-full w-full flex">
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-white text-[28px] leading-none font-semibold">
                15K
              </div>
              <div className="text-white/90 text-sm mt-2">All Customers</div>
            </div>
            <div
              className="h-full grid place-items-end p-2"
              style={{ width: 180 }}
            >
              <img
                src={boy}
                alt="customers"
                className="h-full object-contain"
              />
            </div>
          </div>
        </Card>
 <Card style={{ width: 234, height: 174, background: "#212121" }}>
      <div className="p-3 h-full relative">
        {/* Title */}
        <div className="text-white text-sm mb-2 font-semibold">customer</div>

        {/* Chart */}
        <div className="relative flex justify-center items-center">
          <ResponsiveContainer
            width={209.51782989501953}
            height={105.51782989501953}
          >
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={31}
                outerRadius={54}
                dataKey="value"
                stroke="none"
                startAngle={70}
                endAngle={450}
              >
                {genderData.map((s, idx) => (
                  <Cell key={idx} fill={s.color} />
                ))}
                {/* Custom Labels */}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null;
                    const { cx, cy } = viewBox;
                    return (
                      <g>
                        {/* Men */}
                        <line
                          x1={cx + 20}
                          y1={cy - 15}
                          x2={cx + 50}
                          y2={cy - 40}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                        <circle
                          cx={cx + 50}
                          cy={cy - 40}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx + 55}
                          y={cy - 40}
                          fill="#fff"
                          fontSize={10}
                          alignmentBaseline="middle"
                        >
                          63% men
                        </text>

                        {/* Women */}
                        <line
                          x1={cx - 30}
                          y1={cy + 15}
                          x2={cx - 70}
                          y2={cy + 5}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                        <circle
                          cx={cx - 70}
                          cy={cy + 5}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx - 125}
                          y={cy + 10}
                          fill="#fff"
                          fontSize={10}
                          alignmentBaseline="middle"
                        >
                          37% women
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        
        <div className="absolute right-2 bottom-6 text-[10px] text-white/80 space-y-1">
          {genderData.map((g) => (
            <div key={g.name} className="flex items-center gap-2">
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: g.color }}
              />
              <span>{g.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>

       <Card style={{ width: 232, height: 174, background: "#212121" }}>
      <div className="p-2 h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div className="text-white/85 text-sm font-semibold">Account</div>
          <div className="text-[10px] text-white/60">Yearly ▾</div>
        </div>

        {/* Chart */}
        <div className="relative" style={{ height: 100 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={accountDonut}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={54}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {accountDonut.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}

                {/* Center Label */}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null;
                    const { cx, cy } = viewBox;

                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="#fff"
                          fontWeight="700"
                          fontSize="14"
                        >
                          1500
                        </text>
                        <text
                          x={cx}
                          y={cy + 12}
                          textAnchor="middle"
                          fill="#9ca3af"
                          fontSize="9"
                        >
                          account
                        </text>

                        {/* Free label */}
                        <line
                          x1={cx + 25}
                          y1={cy - 25}
                          x2={cx + 70}
                          y2={cy - 35}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        <circle
                          cx={cx + 70}
                          cy={cy - 35}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx + 75}
                          y={cy - 35}
                          fill="#fff"
                          fontSize="10"
                          alignmentBaseline="middle"
                        >
                          900 free
                        </text>

                        {/* Premium label */}
                        <line
                          x1={cx - 15}
                          y1={cy + 28}
                          x2={cx - 60}
                          y2={cy + 40}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        <circle
                          cx={cx - 60}
                          cy={cy + 40}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx - 85}
                          y={cy + 40}
                          fill="#fff"
                          fontSize="10"
                          alignmentBaseline="middle"
                        >
                          600 premium
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-1 text-[10px] text-white/80">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#8BC255" }} />
            premium
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#FFC02D" }} />
            free
          </div>
        </div>
      </div>
    </Card>

         <Card style={{ width: 241, height: 173, background: "#212121" }}>
      <div className="p-3 h-full">
        {/* Title */}
        <div className="text-white/85 text-sm mb-2 font-semibold">
          verified account
        </div>

        {/* Chart */}
        <div style={{ height: 100 }} className="relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={verifiedDonut}
                cx="50%"
                cy="50%"
                innerRadius={28}
                outerRadius={54}
                dataKey="value"
                stroke="none"
                startAngle={90}
                endAngle={450}
              >
                {verifiedDonut.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}

                {/* Center Label */}
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox) return null;
                    const { cx, cy } = viewBox;

                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 2}
                          textAnchor="middle"
                          fill="#fff"
                          fontWeight="700"
                          fontSize="14"
                        >
                          1500
                        </text>
                        <text
                          x={cx}
                          y={cy + 12}
                          textAnchor="middle"
                          fill="#9ca3af"
                          fontSize="9"
                        >
                          account
                        </text>

                        {/* Not verified label */}
                        <line
                          x1={cx + 25}
                          y1={cy - 25}
                          x2={cx + 70}
                          y2={cy - 35}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        <circle
                          cx={cx + 70}
                          cy={cy - 35}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx + 75}
                          y={cy - 35}
                          fill="#fff"
                          fontSize="10"
                          alignmentBaseline="middle"
                        >
                          900 Not verified
                        </text>

                        {/* Verified label */}
                        <line
                          x1={cx - 15}
                          y1={cy + 28}
                          x2={cx - 60}
                          y2={cy + 40}
                          stroke="#fff"
                          strokeWidth={1}
                        />
                        <circle
                          cx={cx - 60}
                          cy={cy + 40}
                          r={3}
                          fill="#fff"
                        />
                        <text
                          x={cx - 90}
                          y={cy + 40}
                          fill="#fff"
                          fontSize="10"
                          alignmentBaseline="middle"
                        >
                          600 verified
                        </text>
                      </g>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 mt-2 text-[10px] text-white/80">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#FF5726" }} />
            verified
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "#8BC255" }} />
            Not verified
          </div>
        </div>
      </div>
    </Card>
      </div>

      <div className="flex gap-3 mt-3">
        <Card style={{ width: 440, height: 146, background: "#212121" }}>
          <div className="h-full w-full flex">
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-white text-2xl leading-none">10</div>
              <div className="text-white/80 text-sm mt-1">
                Verified Customers
              </div>
            </div>
            <div
              className="h-full grid place-items-end p-2"
              style={{ width: 160 }}
            >
              <img
                src={boys}
                alt="verified"
                className="h-full object-contain"
              />
            </div>
          </div>
        </Card>

        <Card style={{ width: 440, height: 146, background: "#212121" }}>
          <div className="p-3 h-full">
            <div className="text-white/85 text-sm mb-2">Customers by age</div>
            <div
              className="grid grid-cols-4 gap-3 items-end"
              style={{ height: 110 }}
            >
              {[
                { c: "#ef4444", l: "18-" },
                { c: "#7C3AED", l: "20-24" },
                { c: "#F59E0B", l: "25-29" },
                { c: "#8B5CF6", l: "40+" },
              ].map((meta, i) => (
                <div key={i} className="flex flex-col items-center justify-end">
                  <div
                    className="w-8 rounded-md"
                    style={{
                      height: `${[90, 60, 40, 25][i]}px`,
                      background: meta.c,
                    }}
                  />
                  <div className="text-[10px] text-white/60 mt-1">{meta.l}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card
          style={{
            width: 233,
            height: 146,
            background: "#212121",
            paddingTop: 6.18,
            paddingRight: 11.34,
            paddingBottom: 6.18,
            paddingLeft: 11.34,
          }}
        >
          <div className="text-white/85 text-sm">Right Now</div>
          <div className="mt-1 text-white text-3xl font-semibold leading-none">
            289
          </div>
          <div className="text-[10px] text-white/55 -mt-1 mb-2">
            active users
          </div>
          <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
            <div
              className="h-full"
              style={{ width: `43%`, background: "#F97316" }}
            />
            <div
              className="h-full"
              style={{ width: `57%`, background: "#22C55E" }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-white/70 mt-1">
            <span>43% New Visitor</span>
            <span>57% Returning Visitor</span>
          </div>
        </Card>
<Card
  style={{
    width: 231,
    height: 146,
    background: "#212121",
    paddingTop: 6.18,
    paddingRight: 11.34,
    paddingBottom: 6.18,
    paddingLeft: 11.34,
  }}
>
  <div className="text-white/85 text-sm mb-1">Spent Chart</div>
  <div style={{ height: 100 }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={[
            { name: "Category A", value: 40, color: "#FF5726" },
            { name: "Category B", value: 38, color: "#8BC255" },
            { name: "Unused", value: 22, color: "#353535" },
          ]}
          cx="50%"
          cy="50%"
          innerRadius={42}   // 🔹 inner radius ziada
          outerRadius={50}
          dataKey="value"
          stroke="none"
          labelLine={false}
          label={({ percent, cx, cy, midAngle, innerRadius, outerRadius }) => {
            const radius = innerRadius + (outerRadius - innerRadius) / 2;
            const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
            const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

            return (
              <text
                x={x}
                y={y}
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="9"
              >
                {(percent * 100).toFixed(0)}%
              </text>
            );
          }}
        >
          {[
            { name: "Category A", value: 40, color: "#FF5726" },
            { name: "Category B", value: 38, color: "#8BC255" },
            { name: "Unused", value: 22, color: "#353535" },
          ].map((e, i) => (
            <Cell key={i} fill={e.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  </div>
</Card>


      </div>
    </div>
  );
}

/* ================== Filters Row ================== */
function FiltersRow({
  status,
  setStatus,
  account,
  setAccount,
  searchQuery,
  setSearchQuery,
}) {
  return (
    <div className="mb-4 flex w-full items-center justify-between gap-3">
      <div className="relative w-[260px]">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2 pl-10 text-sm placeholder:text-white/40 focus:outline-none"
          aria-label="Search customers"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
      </div>
        <div className="flex items-center gap-3 text-sm">
        <select
          className="w-[160px] rounded-md border border-white/10 bg-[#1A1A1A] px-3 py-2"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          aria-label="Filter by account type"
        >
          <option>All</option>
          <option>FREE</option>
          <option>PREMIUM</option>
          <option>free trial</option>
        </select>
        <select
          className="w-[140px] rounded-md border border-white/10 bg-[#1A1A1A] px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by role"
        >
          <option>All</option>
          <option>User</option>
          <option>Partner</option>
          <option>Admin</option>
        </select>
        <button
          className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2"
          onClick={() => alert("Export CSV coming soon")}
        >
          csv
        </button>
        <button
          className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2"
          onClick={() => alert("Export PDF coming soon")}
        >
          pdf
        </button>
        <button
          className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2"
          onClick={() => alert("Export Excel coming soon")}
        >
          excel
        </button>
        <button className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-white hover:bg-yellow-400">
          + New Merchant
        </button>
      </div>
    </div>
  );
}

/* ================== Right Drawer: Customer Detail (exact left 323px) ================== */
function CustomerDetailDrawer({ open, customer, onClose, onSubmit }) {
  if (!open || !customer) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-[1100px] max-w-[96vw] bg-[#0F0F0F] border-l border-white/10 shadow-2xl flex">
        <CustomerSidebar customer={customer} />
        <ModerationPanel
          customer={customer}
          onSubmit={onSubmit}
          onClose={onClose}
        />
      </div>
    </div>
  );
}

function CustomerSidebar({ customer }) {
  return (
    <aside className="w-[323px] h-full bg-[#1A1A1A] text-white p-4 pt-6 border-r border-white/10 overflow-y-auto">
      <div className="flex flex-col items-center">
        <img
          src={customer.avatar}
          alt={customer.fullName}
          className="h-[72px] w-[72px] rounded-full object-cover"
        />
        <div className="mt-2 text-[14px] font-semibold">
          {customer.fullName || "Costumer name"}
        </div>
        <div className="text-[11px] text-white/60">
          id {customer.id ?? "9944564557"}
        </div>
      </div>

      <div className="mt-3 flex items-stretch gap-2">
        <div className="flex-1 rounded-[10px] bg-[#FF5A2A] px-3 py-2">
          <div className="text-[12px] leading-4">Banned person</div>
          <div className="text-[11px] text-white/95 mt-1">
            {customer.bannedDays ?? 30} days
          </div>
        </div>
        <button className="rounded-[10px] bg-[#FF5A2A] text-white px-3 py-2 text-[12px] inline-flex items-center gap-1">
          Action
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="mt-3 rounded-[12px] bg-[#222222] border border-white/10">
        {[
          { label: customer.dob ?? "16-12-1999", icon: "🗓️" },
          { label: customer.username ?? "atif000", icon: "👤" },
          { label: customer.gender ?? "male", icon: "♂️" },
          { label: customer.email ?? "email@gmail.com", icon: "✉️" },
          { label: customer.phone ?? "05554454544", icon: "📞" },
        ].map((row, i, arr) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 text-[12px] ${
              i < arr.length - 1 ? "border-b border-white/10" : ""
            }`}
          >
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px]">
              {row.icon}
            </span>
            <span className="truncate">{row.label}</span>
          </div>
        ))}
      </div>

      <MetaItem
        label="Joined On"
        value={customer.joinedOn ?? "12/7/2023 1:58:05 PM"}
        className="mt-[33px]"
      />
      <MetaItem
        label="last login"
        value={customer.lastLogin ?? "12/7/2023 1:58:05 PM"}
      />
      <MetaItem
        label="Subscription number"
        value={customer.subscription ?? "06"}
        chevron
      />
      <MetaItem
        label="The gift sent"
        value={customer.giftsSent ?? "01"}
        chevron
      />
      <MetaItem
        label="The gift received"
        value={customer.giftsReceived ?? "01"}
        chevron
      />
    </aside>
  );
}

function MetaItem({ label, value, chevron = false, className = "" }) {
  return (
    <div
      className={`mt-2 rounded-[12px] bg-[#232323] px-4 py-3 border border-white/10 flex items-center ${className}`}
    >
      <div className="flex-1">
        <div className="text-[11px] text-white/60">{label}</div>
        <div className="text-[12px] text-white/90 mt-1">{value}</div>
      </div>
      {chevron && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 opacity-70"
        >
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

function ModerationPanel({ customer, onSubmit, onClose }) {
  // === State per new spec ===
  const [action, setAction] = useState("Ban"); // 'Ban' | 'Unban / Active'
  const presetOptions = ["24 hours", "7 days", "30 days", "Permanent"];
  const [durationPreset, setDurationPreset] = useState(presetOptions[0]);
  const [manualDuration, setManualDuration] = useState({
    value: "",
    unit: "hours",
  });
  const scopeOptions = [
    "Entire App (user cannot access any service)",
    "Reservations only",
    "Offers / Coupons only",
    "Comments / Reviews only",
  ];
  const [scope, setScope] = useState(scopeOptions[0]);
  const reasonPresets = [
    "Misuse of offers",
    "Suspicious / Fraudulent activity",
    "Misconduct with merchants",
    "Administrative decision",
  ];
  const [reasons, setReasons] = useState([]);
  const [reasonText, setReasonText] = useState("");

  const toggleReason = (r) =>
    setReasons((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    );

  const submit = () => {
    const duration = manualDuration.value
      ? `${manualDuration.value} ${manualDuration.unit}`
      : durationPreset;
    onSubmit?.({ customer, action, duration, scope, reasons, reasonText });
  };

  return (
    <main className="flex-1 h-full text-white p-6 overflow-y-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] text-white/90">Moderation</h2>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          ✕
        </button>
      </div>

      <div className="space-y-3 max-w-[720px]">
        {/* Action */}
        <Accordion title="Action" defaultOpen>
          <div className="flex flex-wrap gap-2">
            {["Ban", "Unban / Active"].map((opt) => (
              <button
                key={opt}
                onClick={() => setAction(opt)}
                className={`px-3 py-2 rounded-md border text-[12px] ${
                  action === opt
                    ? "bg-white text-black border-white"
                    : "bg-[#1a1a1a] border-white/10 text-white/90"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </Accordion>

        {/* Duration */}
        <Accordion title="Duration" defaultOpen>
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-2">
              {presetOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => {
                    setDurationPreset(d);
                    setManualDuration({ value: "", unit: manualDuration.unit });
                  }}
                  className={`px-3 py-2 rounded-md border text-[12px] ${
                    durationPreset === d && !manualDuration.value
                      ? "bg-white text-black border-white"
                      : "bg-[#1a1a1a] border-white/10 text-white/90"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-white/60">or manual input:</div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                placeholder="e.g. 12"
                value={manualDuration.value}
                onChange={(e) =>
                  setManualDuration({
                    ...manualDuration,
                    value: e.target.value,
                  })
                }
                className="w-24 bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-[12px]"
              />
              <select
                value={manualDuration.unit}
                onChange={(e) =>
                  setManualDuration({ ...manualDuration, unit: e.target.value })
                }
                className="bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-[12px]"
              >
                <option value="hours">hours</option>
                <option value="days">days</option>
              </select>
            </div>
          </div>
        </Accordion>

        {/* Scope */}
        <Accordion title="Scope (Where the ban applies)" defaultOpen>
          <div className="grid gap-2">
            {scopeOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer ${
                  scope === opt
                    ? "bg-white/5 border-white/30"
                    : "bg-[#1a1a1a] border-white/10"
                }`}
              >
                <input
                  type="radio"
                  name="scope"
                  checked={scope === opt}
                  onChange={() => setScope(opt)}
                />
                <span className="text-[12px]">{opt}</span>
              </label>
            ))}
          </div>
        </Accordion>

        {/* Reason */}
        <Accordion
          title="Reason (Optional but important for records)"
          defaultOpen
        >
          <div className="grid gap-3">
            <div className="flex flex-wrap gap-2">
              {reasonPresets.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleReason(r)}
                  className={`px-3 py-1.5 rounded-full text-[12px] border ${
                    reasons.includes(r)
                      ? "bg-white text-black border-white"
                      : "bg-[#1a1a1a] border-white/10 text-white/90"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            <textarea
              rows={4}
              placeholder="Free text (optional)"
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-[12px]"
            />
          </div>
        </Accordion>
      </div>

      <div className="flex items-center gap-25 pt-10">
        <button className="whitespace-nowrap px-[50px] py-[20px] rounded-full bg-[#2B2B2B] text-white/90">
          Review Later
        </button>
        <button
          className="whitespace-nowrap px-[50px] py-[20px] rounded-full bg-[#8BC255] text-black font-semibold"
          onClick={submit}
        >
          Reject Ban
        </button>
        <button
          className="whitespace-nowrap px-[50px] py-[20px] rounded-full bg-[#FF5A2A] text-white font-semibold"
          onClick={submit}
        >
          Active
        </button>
      </div>
    </main>
  );
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-[14px] bg-[#2a2a2a] border border-white/5">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2 text-white/90 text-[14px]">
          <span className="inline-block h-2 w-2 rounded-full bg-white/40" />
          {title}
        </div>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
          ▾
        </span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-[12px] text-white/80">{children}</div>
      )}
    </div>
  );
}

/* ================== Table ================== */
function CustomersTable({ rows, onOpen }) {
  const SortHeader = ({ label }) => (
    <div className="flex flex-col items-start leading-tight">
      <ArrowUpDown className="h-3.5 w-3.5 text-sky-300 -mb-0.5" />
      <div className="text-[10px] uppercase text-white/45">{label}</div>
    </div>
  );

  const COLS =
    "grid grid-cols-[220px_70px_70px_70px_70px_86px_110px_80px_160px_90px_84px]";

  const NameCell = ({ row }) => (
    <div className="flex items-center gap-2 px-2 min-w-0 h-full bg-[#1a1a1a]">
      <img
        src={row.avatar || `https://i.pravatar.cc/100?img=12`}
        alt={row.fullName}
        className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
        onError={(e) => {
          e.currentTarget.src = `https://i.pravatar.cc/100?img=64`;
        }}
      />
      <div className="min-w-0">
        <div
          className="truncate text-[11px] font-medium leading-5"
          title={row.fullName}
        >
          {row.fullName}
        </div>
        <div className="text-[9.5px] text-white/55 truncate" title={row.email}>
          {row.email}
        </div>
        <div className="text-[9.5px] text-white/55 truncate" title={row.phone}>
          {row.phone}
        </div>
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-white/5 w-full overflow-x-auto">
      <div className={`${COLS} min-w-[1000px] bg-[#141414] px-2.5 py-4`}>
        <SortHeader label="FULL NAME" />
        <SortHeader label="xp" />
        <SortHeader label="offers" />
        <SortHeader label="BOOKING" />
        <SortHeader label="Loyalty" />
        <SortHeader label="Group order" />
        <SortHeader label="ACCOUNT" />
        <SortHeader label="offences" />
        <SortHeader label="Joined On" />
        <SortHeader label="Status" />
        <SortHeader label="Action" />
      </div>

      {rows.map((row, i) => (
        <div
          key={i}
          className={`${COLS} min-w-[1000px] items-center border-t border-white/10 bg-[#0F0F0F]`}
        >
          <NameCell row={row} />
          <div className="h-12 grid place-items-center text-[11px] text-white/60">
            {row.xp}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60 bg-[#1a1a1a]">
            {row.offers}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">
            {row.booking}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60 bg-[#1a1a1a]">
            {row.loyalty}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">
            {row.groupOrder}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60 bg-[#1a1a1a]">
            {row.account}
          </div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">
            {row.offences}
          </div>
          <div
            className="h-12 grid place-items-center text-[9.5px] text-white/55 text-center px-2 break-words"
            title={row.joinedOn}
          >
            {row.joinedOn}
          </div>
          <div className="h-12 grid place-items-center text-[11px] bg-[#1a1a1a]">
            <span className="text-white/70">{normalizeStatus(row.status)}</span>
          </div>
          <div className="h-12 grid place-items-end pr-2">
            <button
              type="button"
              onClick={() => onOpen(row)}
              className="grid h-8 w-[58px] place-items-center rounded-full bg-white text-black shadow-sm"
              aria-label="Open row"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Map Firebase user to table row shape */
function userToRow(u) {
  const createdAt = u.createdAt ? new Date(u.createdAt).toLocaleString() : "—";
  return {
    id: u.id,
    fullName: u.displayName || (u.email || "").split("@")[0] || "—",
    email: u.email || "—",
    phone: u.phone || "—",
    avatar: u.photoUrl || "https://i.pravatar.cc/100?u=" + (u.id || u.email),
    status: u.isAdmin ? "Admin" : u.isPartner ? "Partner" : "User",
    account: "PREMIUM",
    joinedOn: createdAt,
    lastLogin: createdAt,
    isAdmin: !!u.isAdmin,
    isPartner: !!u.isPartner,
  };
}

/* ================== Page ================== */
export default function MerchantsCustomerScreen() {
  const [status, setStatus] = useState("All");
  const [account, setAccount] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = watchUsers((list) => {
      setUsers(list.map(userToRow));
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const allRows = useMemo(() => users, [users]);

  const filteredRows = allRows.filter((row) => {
    const statusOk =
      status === "All" ? true : (row.status || "").toLowerCase() === status.toLowerCase();
    const accNorm = normalizeAccount(row.account);
    const accountOk = account === "All" ? true : accNorm === account;
    const q = searchQuery.trim().toLowerCase();
    const searchOk = !q
      ? true
      : [row.fullName, row.email, row.phone].some((f) =>
          String(f || "").toLowerCase().includes(q)
        );
    return statusOk && accountOk && searchOk;
  });

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <div className="mx-auto w-full max-w-[1109px] px-0 py-4 sm:py-6 relative">
        <CardSection />
        {loading ? (
          <p className="text-white/70 py-4">Loading users from Firebase…</p>
        ) : null}
        <FiltersRow
          status={status}
          setStatus={setStatus}
          account={account}
          setAccount={setAccount}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <CustomersTable
          rows={filteredRows}
          onOpen={(row) => setSelected(row)}
        />
      </div>

      <CustomerDetailDrawer
        open={!!selected}
        customer={selected}
        onClose={() => setSelected(null)}
        onSubmit={(payload) => console.log("submit", payload)}
      />
    </div>
  );
}
