import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Search, ArrowUpDown } from "lucide-react";
import comLogo from "../../assets/com.png";

/* ---- image imports ---- */
import car1 from "../../assets/a.png"; // top-left card image
import imgD from "../../assets/d.png"; // row2 card1
import imgF from "../../assets/f.png"; // row2 card2
import imgB from "../../assets/b.png"; // row2 card3
import imgC from "../../assets/c.png"; // row2 card4
// import worldMap from "../../assets/top/world-map.png";

/* ================== Chart Data ================== */
const verifiedAccountData = [
  { name: "verified", value: 90, color: "#7C3AED" },
  { name: "Banned", value: 0, color: "#10b981" },
  { name: "Not verified", value: 10, color: "#F59E0B" },
];

const spentChartData = [
  { name: "restaurants", value: 30, color: "#7C3AED" },
  { name: "hotels", value: 10, color: "#22C55E" },
  { name: "beauty", value: 15, color: "#F59E0B" },
  { name: "entertainment", value: 10, color: "#06B6D4" },
  { name: "sport", value: 15, color: "#8B5CF6" },
  { name: "coupon", value: 20, color: "#F97316" },
];

/* ================== Demo Data ================== */
function makeCompanies() {
  const seed = [
    {
      name: "Hotel ibis",
      email: "hotelibis@gmail.com",
      number: "+92 300 1234567",
      logo: "/assets/logos/hotel-ibis.png",
      category: "hotels",
      type: "hotel",
      offers: "100",
      bookings: "25",
      loyalty: "25",
      views: "32k",
      likes: "300",
      profits: "2000 $",
      joinedOn: "12/7/2023 1:50:05 PM",
      status: "verified",
    },
  ];
  const extra = Array.from({ length: 24 }).map((_, i) => {
    const n = i + 2;
    return {
      name: `Company ${n}`,
      email: `company${n}@demo.com`,
      number: `+92 30${(i % 9) + 1} 12${(i % 90) + 10} ${100 + i}`,
      logo: "/assets/logos/company.png",
      category:
        i % 5 === 0 ? "hotels" : i % 2 === 0 ? "restaurants" : "entertainment",
      type: i % 2 === 0 ? "fast food" : i % 3 === 0 ? "games" : "service",
      offers: `${(i + 1) * 7}`,
      bookings: `${(i + 2) * 4}`,
      loyalty: `${(i + 3) * 3}`,
      views: `${(i % 6) * 10 + 20}k`,
      likes: `${(i % 9) * 100 + 100}`,
      profits: `${1200 + i * 37} $`,
      joinedOn: `1/${(i % 12) + 1}/2024 10:${(i % 50) + 10}:05 AM`,
      status:
        i % 3 === 0 ? "verified" : i % 3 === 1 ? "Banned" : "Not verified",
    };
  });
  return seed.concat(extra);
}
const tableData = makeCompanies();

/* ================== Utils ================== */
const normalizeStatus = (s) => {
  const st = String(s || "").trim().toLowerCase();
  if (st.includes("not")) return "Not verified";
  if (st === "verified") return "verified";
  if (st === "banned") return "Banned";
  return s || "—";
};

/* ================== Primitives ================== */
const Card = ({ children, style, className = "" }) => (
  <div
    className={`absolute border border-white/5 shadow-sm overflow-hidden rounded-[5px] ${className}`}
    style={style}
  >
    {children}
  </div>
);
const Dot = ({ className = "bg-white", style }) => (
  <span className={`inline-block h-2 w-2 rounded-full ${className}`} style={style} />
);
const renderPercentLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
  const RAD = Math.PI / 180;
  const r = outerRadius + 14;
  const x = cx + r * Math.cos(-midAngle * RAD);
  const y = cy + r * Math.sin(-midAngle * RAD);
  return (
    <text x={x} y={y} fill="#ccc" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central" fontSize={11}>
      {`${Math.round(percent * 100)}%`}
    </text>
  );
};

/* ================== Card Section (slightly wider) ================== */
function CardSection() {
  const [mapBlue, setMapBlue] = useState(false);

  return (
    <div className="relative w-full h-[300px] mb-6 overflow-x-hidden">
      {/* 1) Best saler */}
      <Card style={{ width: 120, height: 185, left: -16, background: "#FFC02D" }}>
        <div className="h-full w-full grid grid-rows-[1fr_auto]">
          <div className="grid place-items-center">
            <img src={car1} className="h-[120px] object-contain" alt="best" />
          </div>
          <div className="flex items-center justify-between px-3 py-2 text-black">
            <span className="text-sm font-semibold">Best saler</span>
            <button className="grid h-8 w-8 place-items-center rounded-full bg-white/90">▶</button>
          </div>
        </div>
      </Card>

      {/* 2) Top location */}
      <Card style={{ width: 250, height: 185, left: 110, background: "#1f1f1f" }}>
        <div className="p-3 h-full">
          <div className="mb-2 text-white/80 text-sm">Top location</div>
          <button
            type="button"
            onClick={() => setMapBlue((v) => !v)}
            className="relative h-[120px] w-full rounded-lg overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/World_map_-_low_resolution.svg/1024px-World_map_-_low_resolution.svg.png"
              alt="map"
              className={`absolute inset-0 h-full w-full object-cover opacity-90 transition ${mapBlue ? "hue-rotate-180 saturate-150 brightness-110" : ""}`}
            />
            <Dot className="bg-emerald-400" style={{ position: "absolute", left: "34%", top: "42%" }} />
            <Dot className="bg-yellow-400" style={{ position: "absolute", left: "58%", top: "54%" }} />
          </button>
        </div>
      </Card>

      {/* 3) verified account donut */}
      <Card style={{ width: 258, height: 186, left: 370, background: "#1b1b1b" }}>
        <div className="p-3 h-full">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm text-white/80">verified account</span>
            <span className="rounded bg-blue-600 px-2 py-1 text-xs">1174 • 86</span>
          </div>
          <div className="relative h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={verifiedAccountData} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" stroke="none">
                  {verifiedAccountData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                  <Label
                    position="center"
                    content={() => (
                      <g>
                        <text x={0} y={0} textAnchor="middle" dominantBaseline="central" transform="translate(130,58)">
                          <tspan fill="#fff" fontSize="16" fontWeight="700">1500</tspan>
                          <tspan x="130" dy="14" fill="#9ca3af" fontSize="9">count</tspan>
                        </text>
                      </g>
                    )}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute right-2 top-2 text-[10px] text-white/70">10%<br />Not verified</div>
            <div className="absolute left-2 bottom-1 text-[10px] text-white/70">90<br />verified</div>
          </div>
          <div className="mt-1 space-y-0.5 text-[10px]">
            <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full" style={{ background: "#7C3AED" }} /> <span>verified</span></div>
            <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full" style={{ background: "#10b981" }} /> <span>Banned</span></div>
            <div className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full" style={{ background: "#F59E0B" }} /> <span>Not verified</span></div>
          </div>
        </div>
      </Card>

      {/* 4) Spent Chart (wide) */}
      <Card style={{ width: 300, height: 284, left: 640, background: "#1b1b1b" }}>
        <div className="p-3 h-full">
          <div className="mb-2 text-white/80 font-medium">Spent Chart</div>
          <div className="relative h-[170px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={spentChartData} cx="50%" cy="50%" innerRadius={44} outerRadius={66} dataKey="value" labelLine={false} label={renderPercentLabel}>
                  {spentChartData.map((e, i) => (
                    <Cell key={i} fill={e.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-[11px] text-white/70 whitespace-pre-wrap">● restaurants ● hotels ● beauty ● entertainment ● sport ● coupon</div>
        </div>
      </Card>

      {/* 5) Statistic (tall) */}
      <Card style={{ width: 165, height: 284, left: 952, background: "#1b1b1b" }}>
        <div className="p-3 h-full">
          <div className="mb-1 text-sm text-white/80">Statistic</div>
          {[
            { label: "entertain", v: 20, color: "#8B5CF6" },
            { label: "spa", v: 100, color: "#06B6D4" },
            { label: "beauty", v: 100, color: "#F59E0B" },
            { label: "sport", v: 300, color: "#22C55E" },
            { label: "beauty", v: 200, color: "#EF4444" },
            { label: "hotels", v: 300, color: "#22C55E" },
            { label: "coupon", v: 600, color: "#F97316" },
          ].map((s, i) => (
            <div key={i} className="mb-2">
              <div className="mb-1 flex items-center justify-between text-[11px] text-white/70">
                <span>{s.label}</span>
                <span>{s.v}</span>
              </div>
              <div className="h-1 w-full rounded-full bg-white/10">
                <div className="h-1 rounded-full" style={{ width: `${Math.min((s.v / 600) * 100, 100)}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Row 2: d, f, b, c */}
      <Card style={{ width: 160, height: 94, top: 193, left: -16, background: "#8BC255" }}>
        <div className="h-full w-full flex items-center gap-2">
          <img src={imgD} className="h-[88px] -ml-1 object-contain" alt="d" />
          <div className="ml-auto pr-3 text-right">
            <div className="text-white text-lg font-semibold leading-none">1500</div>
            <div className="text-black/90 text-[11px]">All merchants</div>
          </div>
        </div>
      </Card>
      <Card style={{ width: 154, height: 94, top: 193, left: 150, background: "#292929" }}>
        <div className="h-full w-full flex items-center justify-between px-3">
          <img src={imgF} className="h-10 object-contain" alt="f" />
          <div className="text-white text-lg font-semibold">10</div>
        </div>
        <div className="absolute left-3 bottom-2 text-[11px] text-white/75">Banned merchants</div>
      </Card>
      <Card style={{ width: 154, height: 94, top: 193, left: 305, background: "#292929" }}>
        <div className="h-full w-full flex items-center justify-between px-3">
          <img src={imgB} className="h-10 object-contain" alt="b" />
          <div className="text-white text-lg font-semibold">1400</div>
        </div>
        <div className="absolute left-3 bottom-2 text-[11px] text-white/75">verified merchants</div>
      </Card>
      <Card style={{ width: 160, height: 94, top: 193, left: 462, background: "#292929" }}>
        <div className="h-full w-full flex items-center justify-between px-3">
          <img src={imgC} className="h-10 object-contain" alt="c" />
          <div className="text-white text-lg font-semibold">—</div>
        </div>
        <div className="absolute left-3 bottom-2 text-[11px] text-white/75">Active merchants</div>
      </Card>
    </div>
  );
}

/* ================== Filters Row ================== */
function FiltersRow({ status, setStatus }) {
  return (
    <div className="mb-4 flex w-full items-center justify-between gap-3">
      <div className="relative w-[260px]">{/* slightly wider search again */}
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2 pl-10 text-sm placeholder:text-white/40 focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/50" />
      </div>
      <div className="flex items-center gap-3 text-sm">
        <select className="w-[160px] rounded-md border border-white/10 bg-[#1A1A1A] px-3 py-2">
          <option>ACCOUNT</option>
          <option>Active Merchant</option>
          <option>Expired Merchant</option>
          <option>Disconnected Merchant</option>
        </select>
        {/* Status filter - controls table */}
        <select
          className="w-[140px] rounded-md border border-white/10 bg-[#1A1A1A] px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>All</option>
          <option>Not verified</option>
          <option>verified</option>
          <option>Banned</option>
        </select>
        <button className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2">csv</button>
        <button className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2">pdf</button>
        <button className="rounded-full border border-white/10 bg-[#1A1A1A] px-4 py-2">excel</button>
        <button className="rounded-full bg-yellow-500 px-5 py-2 font-semibold text-white hover:bg-yellow-400">+ New Merchant</button>
      </div>
    </div>
  );
}

/* ================== Merchants Table ================== */
function MerchantsTable({ rows }) {
  const ArrowBtn = () => (
    <button type="button" className="grid h-8 w-[58px] place-items-center rounded-full bg-white text-black shadow-sm" aria-label="Open row">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  // stacked header: arrow icon on top, label below
  const SortHeader = ({ label }) => (
    <div className="flex flex-col items-start leading-tight">
      <ArrowUpDown className="h-3.5 w-3.5 text-white/60 -mb-0.5" />
      <div className="text-[10px] uppercase text-white/45">{label}</div>
    </div>
  );

  // total exactly 1100px (narrower than before)
  const COLS = "grid grid-cols-[200px_82px_82px_64px_64px_64px_82px_82px_92px_118px_90px_80px]";

  const BrandCell = ({ row }) => (
    <div className="flex items-center gap-2 px-2 min-w-0 h-full bg-[#1a1a1a]">
      <img
        src={row.logo || comLogo}
        alt="logo"
        className="h-8 w-8 flex-shrink-0 rounded-lg object-cover"
        onError={(e) => {
          try {
            e.currentTarget.src = comLogo;
          } catch (_) {}
        }}
      />
      <div className="min-w-0">
        <div className="truncate text-[11px] font-medium leading-5" title={row.name}>{row.name}</div>
        <div className="text-[9.5px] text-white/55 truncate" title={row.email}>{row.email}</div>
        <div className="text-[9.5px] text-white/55 truncate" title={row.number}>{row.number}</div>
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-white/5 w-full">
      {/* Header */}
      <div className={`${COLS} bg-[#141414] px-2.5 py-4`}>
        <div className="text-[13px] uppercase tracking-wide text-white/105">Company NAME</div>
        <SortHeader label="Category" />
        <SortHeader label="Type" />
        <SortHeader label="Offers" />
        <SortHeader label="Booking" />
        <SortHeader label="Loyalty" />
        <SortHeader label="Views" />
        <SortHeader label="Likes" />
        <SortHeader label="Profits" />
        <SortHeader label="Joined On" />
        <SortHeader label="Status" />
        <SortHeader label="Action" />
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div key={i} className={`${COLS} items-center border-t border-white/10 bg-[#0F0F0F]`}>
          <BrandCell row={row} />
          <div className="h-12 grid place-items-center text-[11px] text-white/60">{row.category}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60 bg-[#1a1a1a]" title={row.type}>{row.type}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">{row.offers}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60 bg-[#1a1a1a]">{row.bookings}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">{row.loyalty}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">{row.views}</div>
          <div className="h-12 grid place-items-center text-[11px] text-white/60">{row.likes}</div>
          <div className="h-12 bg-[#1a1a1a] px-2 py-1.5 flex flex-col items-start justify-center leading-tight">
            <span className="text-[11px]">{row.profits}</span>
            <span className="text-[9.5px] text-emerald-400">↗ 3.7%</span>
          </div>
          <div className="h-12 grid place-items-center text-[9.5px] text-white/55 text-center px-2 break-words" title={row.joinedOn}>{row.joinedOn}</div>
          <div className="h-12 grid place-items-center text-[11px] bg-[#1a1a1a]"><span className="text-white/70">{normalizeStatus(row.status)}</span></div>
          <div className="h-12 grid place-items-end pr-2"><ArrowBtn /></div>
        </div>
      ))}
    </div>
  );
}

/* ================== Page ================== */
export default function Dashboard() {
  const [status, setStatus] = useState("All");

  const filteredRows = tableData.filter((row) => {
    if (status === "All") return true;
    return normalizeStatus(row.status) === status;
  });

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* container widened a bit for card section */}
      <div className="mx-auto w-full max-w-[1180px] px-0 py-4 sm:py-6 relative">
        <CardSection />
        <FiltersRow status={status} setStatus={setStatus} />
        <MerchantsTable rows={filteredRows} />
      </div>
    </div>
  );
}
