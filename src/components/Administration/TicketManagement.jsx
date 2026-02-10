// =============================
// File: src/components/Administration/TicketManagement.jsx
// =============================
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search as SearchIcon } from "lucide-react";
import CARD1_IMG from "../../assets/cut.png";
import CARD4_IMG from "../../assets/set.png";

/* ----------------- DEMO DATA ----------------- */
const users = [
  { id:1, name:"Ava Jenkins", email:"ava.jenkins@mail.com", phone:"0987654321",
    avatar:"https://randomuser.me/api/portraits/women/44.jpg", plan:"Free",
    totalTickets:10, offerRedemptions:5, bogoRedemptions:25, ticketsRedeemed:35 },
  { id:2, name:"Noah Patel", email:"noah.patel@mail.com", phone:"0987654321",
    avatar:"https://randomuser.me/api/portraits/men/32.jpg", plan:"PREMIUM",
    totalTickets:15, offerRedemptions:2, bogoRedemptions:5, ticketsRedeemed:20 },
  { id:3, name:"Mia Alvarez", email:"mia.alvarez@mail.com", phone:"0987654321",
    avatar:"https://randomuser.me/api/portraits/women/65.jpg", plan:"PREMIUM",
    totalTickets:30, offerRedemptions:2, bogoRedemptions:33, ticketsRedeemed:63 },
  { id:4, name:"Liam Brown", email:"liam.brown@mail.com", phone:"0987654321",
    avatar:"https://randomuser.me/api/portraits/men/83.jpg", plan:"Free trial",
    totalTickets:12, offerRedemptions:1, bogoRedemptions:1, ticketsRedeemed:26 },
  { id:5, name:"Sofia Khan", email:"sofia.khan@mail.com", phone:"0987654321",
    avatar:"https://randomuser.me/api/portraits/women/21.jpg", plan:"Free",
    totalTickets:22, offerRedemptions:20, bogoRedemptions:5, ticketsRedeemed:30 },
];

const COLORS = {
  green: "#8ED26E",
  yellow: "#F59E0B",
  purple: "#7C3AED",
  red: "#ef4444",
  teal: "#10b981",
};

export default function TicketManagement() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const { offersChart, accountsChart } = useMemo(() => {
    const totalOffer = users.reduce((s, u) => s + u.offerRedemptions, 0);
    const totalBogo = users.reduce((s, u) => s + u.bogoRedemptions, 0);

    const premium = users.filter((u) => u.plan.toLowerCase().includes("premium")).length;
    const free = users.length - premium;

    return {
      offersChart: [
        { name: "25% discount", value: totalOffer, color: COLORS.yellow },
        { name: "Buy one get one", value: totalBogo, color: COLORS.red },
      ],
      accountsChart: [
        { name: "Free account", value: free, color: COLORS.teal },
        { name: "PREMIUM", value: premium, color: COLORS.purple },
      ],
    };
  }, []);

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q)
    );
  }, [search]);

  const goSettings = () => navigate("/dashboard/ticket-management/auto-ticket-delivery");

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-4 space-y-4">
        {/* ======================= TOP CARDS ======================= */}
        <div className="flex gap-3">
          {/* Card 1 */}
          <div
            className="relative rounded-md border border-white/10 p-3 flex items-center"
            style={{ width: 280, height: 186, background: COLORS.green }}
          >
            <img src={CARD1_IMG} alt="ticket" className="h-28 w-32 object-contain" />
            <div className="absolute top-3 right-3 text-3xl font-extrabold">5K</div>
            <div className="absolute bottom-3 right-3 text-xs opacity-90">Ticket management</div>
          </div>

          {/* Card 2 */}
          <DonutCard3D
            width={283}
            height={186}
            radiusPx={5}
            titleTop="10%"
            titleRight="tickets"
            data={offersChart}
            locatorText="locator"
          />

          {/* Card 3 */}
          <DonutCard3D
            width={285}
            height={196}
            radiusPx={5}
            titleTop="10%"
            titleRight="ENTERPRISE"
            data={accountsChart}
            locatorText="locator"
          />

          {/* Card 4 → Navigate to Auto Ticket Delivery */}
          <div
            role="button"
            tabIndex={0}
            onClick={goSettings}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goSettings()}
            className="rounded-md border border-white/10 p-3 flex flex-col items-center justify-between cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white/20"
            style={{ width: 280, height: 186, background: "#292929" }}
            aria-label="Open Ticket Settings"
          >
            <img src={CARD4_IMG} alt="settings" className="h-40 w-40 object-contain" />
            <div className="text-sm opacity-80 mt-2">Ticket Settings</div>
          </div>
        </div>

        {/* ======================= SEARCH + SEND ======================= */}
        <div className="flex items-center gap-3">
          <div className="w-[260px]">
            <div className="h-11 rounded-full bg-[#151515] border border-white/10 flex items-center px-4">
              <SearchIcon size={16} className="opacity-60 mr-2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search users"
                className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
              />
            </div>
          </div>

          <div className="flex-1" />
          <button type="button" className="h-11 px-5 rounded-full bg-[#FFB020] text-white font-semibold flex items-center gap-2">
            <span className="text-lg leading-none">+</span>
            <span>send ticket</span>
          </button>
        </div>

        {/* ======================= TABLE ======================= */}
        <div className="rounded-md bg-[#1a1a1a] border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#292929] text-white/80">
                <Th className="pl-4"><HeaderWithArrows label="FULL NAME" /></Th>
                <Th><HeaderWithArrows label="Total Tickets" /></Th>
                <Th><HeaderWithArrows label="Offer Redemptions" /></Th>
                <Th><HeaderWithArrows label="BOGO Redemptions" /></Th>
                <Th><HeaderWithArrows label="Tickets Redeemed" /></Th>
                <Th><HeaderWithArrows label="Status" /></Th>
                <Th className="pr-4 text-center"><HeaderWithArrows label="Action" /></Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {rows.map((u) => (
                <tr key={u.id} className="hover:bg-white/5">
                  <Td className="pl-4 bg-[#181818]">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="" className="h-12 w-12 rounded-md object-cover" />
                      <div>
                        <div className="font-semibold">{u.name}</div>
                        <div className="text-[11px] opacity-70">{u.email}</div>
                        <div className="text-[11px] opacity-50">{u.phone}</div>
                      </div>
                    </div>
                  </Td>
                  <Td mono className="bg-[#212121]">{pad2(u.totalTickets)}</Td>
                  <Td mono className="bg-[#292929]">
                    {pad2(u.offerRedemptions)} <span className="opacity-60">25% discount</span>
                  </Td>
                  <Td mono className="bg-[#181818]">
                    {pad2(u.bogoRedemptions)} <span className="opacity-60">Buy one get one</span>
                  </Td>
                  <Td mono className="bg-[#292929]">All {pad2(u.ticketsRedeemed)}</Td>
                  <Td className="bg-[#181818]">{u.plan}</Td>
                  <Td className="pr-4 bg-[#292929]">
                    <div className="w-full flex justify-end">
                      <button
                        type="button"
                        className="h-9 w-16 rounded-full bg-white text-black grid place-items-center" // fixed bg:white → bg-white
                        onClick={goSettings}
                        aria-label={`Open settings for ${u.name}`}
                      >
                        <span className="text-base">➜</span>
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- small components ---------- */
function HeaderWithArrows({ label }) {
  return (
    <div className="flex flex-col items-center leading-tight select-none">
      <span className="text-[10px] -mb-0.5">↑↓</span>
      <span className="whitespace-nowrap">{label}</span>
    </div>
  );
}

function DonutCard3D({ width, height, radiusPx = 5, titleTop, titleRight, data, locatorText }) {
  const renderLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
    const RAD = Math.PI / 180;
    const r2 = outerRadius + 22;
    const x2 = cx + r2 * Math.cos(-midAngle * RAD);
    const y2 = cy + r2 * Math.sin(-midAngle * RAD);
    return (
      <g>
        <circle cx={x2} cy={y2} r="3" fill="#fff" />
        <text x={x2} y={y2} fill="#fff" fontSize="10" textAnchor="middle" dominantBaseline="middle">
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  return (
    <div
      className="relative border border-white/10 p-3"
      style={{ width, height, background: "#292929", borderRadius: radiusPx }}
    >
      <div className="flex items-center justify-between text-[12px] mb-1">
        <span className="opacity-50">{titleTop}</span>
        <span className="opacity-80">{titleRight}</span>
      </div>
      <div style={{ width: "100%", height: height - 58 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={32}
              outerRadius={66}
              startAngle={90}
              endAngle={-290}
              isAnimationActive={false}
              labelLine={false}
              label={renderLabel}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={d.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-1 text-[11px] opacity-85">
        {data.map((d, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
            <span>{d.name}</span>
          </span>
        ))}
      </div>
      <div className="absolute right-2 bottom-2 text-[10px] opacity-70">{locatorText}</div>
    </div>
  );
}

const Th = ({ children, className = "" }) => (
  <th className={`text-left px-4 py-3 whitespace-nowrap font-semibold ${className}`}>{children}</th>
);
const Td = ({ children, className = "", mono = false }) => (
  <td className={`px-4 py-3 align-top ${mono ? "font-mono" : ""} ${className}`}>{children}</td>
);

function pad2(n) {
  return String(n).padStart(2, "0");
}
