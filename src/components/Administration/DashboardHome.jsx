import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts";
import { MoreHorizontal, MessageCircle, Ban } from "lucide-react";

/* ===================== Demo Data ===================== */
const chartData = [
  { month: "Jan", netAmount: 600, paidAmount: 550 },
  { month: "Feb", netAmount: 650, paidAmount: 620 },
  { month: "Mar", netAmount: 700, paidAmount: 680 },
  { month: "Apr", netAmount: 750, paidAmount: 720 },
  { month: "May", netAmount: 800, paidAmount: 770 },
  { month: "Jun", netAmount: 780, paidAmount: 750 },
  { month: "Jul", netAmount: 820, paidAmount: 800 },
  { month: "Aug", netAmount: 600, paidAmount: 580 },
  { month: "Sep", netAmount: 500, paidAmount: 480 },
  { month: "Oct", netAmount: 450, paidAmount: 430 },
  { month: "Nov", netAmount: 500, paidAmount: 470 },
  { month: "Dec", netAmount: 550, paidAmount: 520 },
];

/* Boy / Girl portraits (Unsplash) */
const customers = [
  {
    name: "Seth Daniels",
    username: "@sethdaniels",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=256&q=80",
  },
  {
    name: "Myrtle Perkins",
    username: "@myrtleperkins",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005316-04ae1f6c8f18?w=256&q=80",
  },
  {
    name: "Dominic Baker",
    username: "@dominicbaker",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=256&q=80",
  },
  {
    name: "Ollie Baldwin",
    username: "@olliebaldwin",
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=256&q=80",
  },
];

const newMerchants = [
  {
    name: "Hotel Ibis",
    username: "Hotels",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=256&q=80",
  },
  {
    name: "Foodkite",
    username: "Restaurants",
    avatarUrl:
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=256&q=80",
  },
  {
    name: "Ice French",
    username: "Desserts",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=256&q=80",
  },
  {
    name: "Pizza Megia",
    username: "Restaurants",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=256&q=80",
  },
];

const transactions = [
  { id: "#10023", type: "payment", amount: "+$650.00", status: "Completed", time: "Today, 10:30 AM" },
  { id: "#10024", type: "refund", amount: "-$250.00", status: "Completed", time: "Today, 10:30 AM" },
  { id: "#10025", type: "failed", amount: "+$128.00", status: "Declined", time: "Today, 10:30 AM" },
];

/* ===================== UI Bits ===================== */
const Ring = ({ percent = 75, color = "#22c55e" }) => {
  const size = 60,
    stroke = 6,
    r = (size - stroke) / 2,
    c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#2f2f2f" strokeWidth={stroke} fill="none" />
      <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${dash} ${c - dash}`} />
    </svg>
  );
};

const Avatar = ({ url, alt }) => (
  <div className="h-10 w-10 rounded-full overflow-hidden border border-white/10 bg-white/10">
    {url ? (
      <img src={url} alt={alt} className="h-full w-full object-cover" />
    ) : (
      <div className="h-full w-full grid place-items-center text-lg text-white/80">🙂</div>
    )}
  </div>
);

const PersonRow = ({ item }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex items-center gap-3">
      <Avatar url={item.avatarUrl} alt={item.name} />
      <div>
        <div className="text-white text-sm font-medium">{item.name}</div>
        <div className="text-white/50 text-xs">{item.username}</div>
      </div>
    </div>
    {/* Call icon removed: only Message + Ban */}
    <div className="flex items-center gap-2">
      <button className="h-8 w-8 rounded-full grid place-items-center bg-white/5 border border-white/10 text-white/70 hover:text-white">
        <MessageCircle className="h-4 w-4" />
      </button>
      <button className="h-8 w-8 rounded-full grid place-items-center bg-white/5 border border-white/10 text-white/70 hover:text-white">
        <Ban className="h-4 w-4" />
      </button>
    </div>
  </div>
);

/* gap added between columns, amount centered */
const PaymentRow = ({ tx }) => {
  const tone = tx.type === "payment" ? "green" : tx.type === "refund" ? "amber" : "red";
  const colorMap = {
    green: { bg: "bg-emerald-500/15", dot: "bg-emerald-400" },
    amber: { bg: "bg-amber-500/15", dot: "bg-amber-400" },
    red: { bg: "bg-rose-500/15", dot: "bg-rose-400" },
  }[tone];
  const title = tx.type === "payment" ? "Payment from" : tx.type === "refund" ? "Process refund to" : "Payment failed from";

  return (
    <div className="grid grid-cols-[1fr_140px_120px] gap-x-4 items-center py-3">
      <div className="flex items-start gap-3 pr-3">
        <span className={`h-6 w-6 rounded-full ${colorMap.bg} grid place-items-center`}>
          <span className={`h-2.5 w-2.5 rounded-full ${colorMap.dot}`} />
        </span>
        <div>
          <div className="text-white text-sm">
            {title} <a href="#" className="text-sky-400 hover:underline">{tx.id}</a>
          </div>
          <div className="text-xs text-white/50">{tx.time}</div>
        </div>
      </div>

      {/* amount center */}
      <div className="flex justify-center">
        <span className="font-semibold text-white text-sm">{tx.amount}</span>
      </div>

      <div className="text-right">
        <span className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-medium ${tx.status === "Completed" ? "bg-emerald-900 text-emerald-300" : "bg-rose-900 text-rose-300"}`}>
          {tx.status}
        </span>
      </div>
    </div>
  );
};

/* ===================== Sales Locations (URL flags) ===================== */
const SalesLocations = () => {
  const sales = [
    { rank: 1, name: "United States", total: "12.8K", color: "bg-blue-600", flag: "https://flagcdn.com/us.svg" },
    { rank: 2, name: "China", total: "5.3K", color: "bg-emerald-600", flag: "https://flagcdn.com/cn.svg" },
    { rank: 3, name: "Turkey", total: "2.7K", color: "bg-violet-700", flag: "https://flagcdn.com/tr.svg" },
    { rank: 4, name: "Brazil", total: "1.0K", color: "bg-amber-500", flag: "https://flagcdn.com/br.svg" },
  ];

  const Map = () => {
    const markers = [
      { x: 220, y: 130, label: "United States", flag: "https://flagcdn.com/us.svg", fill: "#2563eb" },
      { x: 585, y: 120, label: "China", flag: "https://flagcdn.com/cn.svg", fill: "#10b981" },
      { x: 500, y: 150, label: "Turkey", flag: "https://flagcdn.com/tr.svg", fill: "#6d28d9" },
      { x: 300, y: 260, label: "Brazil", flag: "https://flagcdn.com/br.svg", fill: "#f59e0b" },
    ];

    return (
      <svg viewBox="0 0 800 400" className="w-full h-[320px]">
        <defs>
          <linearGradient id="bgGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#232323" />
            <stop offset="100%" stopColor="#1f1f1f" />
          </linearGradient>
          <radialGradient id="ping" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="400" rx="16" fill="url(#bgGrad)" />

        {/* continents (stylized) */}
        <g fill="#333" opacity="0.55">
          <path d="M80 90 L290 95 L310 140 L300 180 L260 190 L230 200 L190 190 L150 160 L120 120 Z" />
          <path d="M370 85 L450 90 L470 120 L460 150 L425 160 L390 150 L360 120 Z" />
          <path d="M430 170 L505 175 L510 215 L515 270 L500 305 L470 320 L445 325 L420 315 L400 285 L395 235 L400 195 Z" />
          <path d="M610 285 L680 290 L690 310 L675 325 L640 320 L605 305 Z" />
          <path d="M700 45 L760 50 L770 80 L755 100 L720 95 L695 70 Z" />
          <path d="M585 160 L640 165 L650 195 L635 210 L600 205 L580 185 Z" />
        </g>

        {/* focus regions */}
        <path d="M140 90 L270 95 L280 130 L285 145 L270 165 L245 160 L215 168 L190 175 L160 155 L135 125 Z" fill="#2563eb" opacity="0.9" />
        <path d="M235 230 L300 235 L312 270 L305 305 L285 322 L260 328 L238 322 L220 295 L215 260 Z" fill="#f59e0b" opacity="0.9" />
        <path d="M550 95 L625 100 L642 118 L638 148 L620 165 L595 170 L565 158 L545 132 L540 110 Z" fill="#10b981" opacity="0.9" />
        <path d="M480 118 L522 122 L528 138 L515 149 L490 152 L470 142 L465 125 Z" fill="#6d28d9" opacity="0.9" />

        {markers.map((m, i) => (
          <g key={i}>
            <circle cx={m.x} cy={m.y} r="14" fill={m.fill} opacity="0.9" />
            <circle cx={m.x} cy={m.y} r="28" fill="url(#ping)" />
            <circle cx={m.x} cy={m.y} r="4" fill="#111" />
            <rect x={m.x + 14} y={m.y - 14} rx="8" ry="8" width="135" height="28" fill="#111827" opacity="0.92" />
            <image href={m.flag} x={m.x + 20} y={m.y - 10} width="18" height="12" preserveAspectRatio="xMidYMid slice" />
            <text x={m.x + 44} y={m.y + 2} fontSize="12" fill="#fff">{m.label}</text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="bg-[#1e1e1e] rounded-2xl p-5 mt-6">
      <div className="text-white/80 text-sm mb-3">Sales Locations</div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:pr-6 border-b lg:border-b-0 lg:border-r border-white/10 pb-5 lg:pb-0">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-3xl font-semibold text-white">21.2K</div>
              <div className="text-sm text-white/60 -mt-1">Our customers</div>
            </div>
            <div className="text-emerald-400 text-sm font-medium">↑ 105.23 %</div>
          </div>
          <div className="mt-4 space-y-3">
            {sales.map((s) => (
              <div key={s.rank} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#2e2e2e] grid place-items-center text-xs text-white/80">{s.rank}.</div>
                  <img src={s.flag} alt={`${s.name} flag`} className="h-4 w-6 object-cover rounded-sm" />
                  <span className="text-white text-sm font-medium">{s.name}</span>
                </div>
                <span className={`text-[12px] text-white/90 px-3 py-1 rounded-full ${s.color}`}>{s.total}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 lg:pl-6 pt-5 lg:pt-0">
          <div className="rounded-xl overflow-hidden bg-[#2a2a2a]">
            <Map />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ===================== Page ===================== */
export default function DashboardHome() {
  return (
    <div className="bg-[#222222] text-gray-100 min-h-screen px-3 md:px-4">
      <div className="mx-auto w-full max-w-[1100px] py-4">
        {/* ---------- Analytics Overview ---------- */}
        <div className="bg-[#222222] p-4 sm:p-6 rounded-lg mb-6">
          <h2 className="text-sm text-white/80 mb-4">Analytics Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#171717] p-4 sm:p-5 rounded-2xl">
              <div className="text-gray-400 text-[11px] tracking-widest">SALES</div>
              <div className="text-2xl md:text-3xl font-bold text-white mt-1">$21.2K</div>
              <div className="text-xs text-gray-500 mt-1">($19.2K last year)</div>
              <div className="text-green-400 text-sm mt-3">↑ 105.23 %</div>
            </div>
            <div className="bg-[#171717] p-4 sm:p-5 rounded-2xl">
              <div className="text-gray-400 text-[11px] tracking-widest">PURCHASE</div>
              <div className="text-2xl md:text-3xl font-bold text-white mt-1">$16.0K</div>
              <div className="text-xs text-gray-500 mt-1">($20.1K last year)</div>
              <div className="text-red-400 text-sm mt-3">↓ 20.15 %</div>
            </div>
            <div className="bg-[#171717] p-4 sm:p-5 rounded-2xl">
              <div className="text-gray-400 text-[11px] tracking-widest">RETURN</div>
              <div className="text-2xl md:text-3xl font-bold text-white mt-1">$259.0</div>
              <div className="text-xs text-gray-500 mt-1">($300.5 last year)</div>
              <div className="text-green-400 text-sm mt-3">↑ 15.20 %</div>
            </div>
            <div className="bg-[#171717] p-4 sm:p-5 rounded-2xl">
              <div className="text-gray-400 text-[11px] tracking-widest">MARKETING</div>
              <div className="text-2xl md:text-3xl font-bold text-white mt-1">$13.1K</div>
              <div className="text-xs text-gray-500 mt-1">($10.5K last year)</div>
              <div className="text-green-400 text-sm mt-3">↑ 32.84 %</div>
            </div>
          </div>
        </div>

        {/* ---------- Sales Figures ---------- */}
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Sales Figures</h3>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#2a2a2a] text-xs text-white/80 hover:bg-[#333]">
                <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                free account
              </button>
              <button className="flex items-center gap-2 rounded-full px-3 py-1.5 bg-[#2a2a2a] text-xs text-white/80 hover:bg-[#333]">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                Paid account
              </button>
            </div>
          </div>
          <div className="h-60 sm:h-72 md:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9CA3AF" }} domain={[0, 1000]} ticks={[0, 200, 400, 600, 800, 1000]} />
                <Line type="monotone" dataKey="netAmount" stroke="#7c6cff" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="paidAmount" stroke="#10B981" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ---------- Usage + Downloads ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-[#1e1e1e] rounded-2xl p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Ring percent={75} color="#22c55e" />
                <div>
                  <div className="text-white text-xl font-semibold">75%</div>
                  <div className="text-gray-400 text-sm">Usage rate of offers</div>
                </div>
              </div>
              <div className="text-green-400 text-sm font-medium">↑ 20.15 %</div>
            </div>
            <div className="my-4 h-px bg-white/5" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Ring percent={50} color="#8b5cf6" />
                <div>
                  <div className="text-white text-xl font-semibold">50%</div>
                  <div className="text-gray-400 text-sm">Usage rate of loyalty</div>
                </div>
              </div>
              <div className="text-red-400 text-sm font-medium">↓ 20.15 %</div>
            </div>
          </div>

          <div className="bg-[#1e1e1e] rounded-2xl p-5 md:p-6">
            <div className="h-36 sm:h-44">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ v: 5 }, { v: 8 }, { v: 6 }, { v: 10 }, { v: 13 }, { v: 12 }, { v: 7 }]}>
                  <XAxis hide />
                  <YAxis hide domain={[0, 15]} />
                  <Line type="monotone" dataKey="v" stroke="#7c6cff" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div>
                <div className="text-white text-lg font-semibold">$21.2K</div>
                <div className="text-gray-400 text-sm">new downloads</div>
              </div>
              <div className="text-green-400 text-sm font-medium">↑ 105.23 %</div>
            </div>
          </div>
        </div>

        {/* ---------- New Customers + Transaction History ---------- */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] 2xl:grid-cols-[360px_1fr] gap-6 mt-6">
          <div className="bg-[#1e1e1e] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold">New Customers</div>
              <button className="text-white/60 hover:text-white"><MoreHorizontal className="h-5 w-5" /></button>
            </div>
            <div className="divide-y divide-white/5">
              {customers.map((c, i) => (
                <PersonRow key={i} item={c} />
              ))}
            </div>
            <button className="mt-4 w-full h-9 rounded-full bg-white/5 text-gray-300 text-sm">View more Customers</button>
          </div>

          <div className="bg-[#1e1e1e] rounded-2xl p-5">
            <div className="text-white font-semibold mb-3">Transaction History</div>
            <div className="rounded-lg bg-[#2a2a2a] px-4 py-2 text-[11px] uppercase tracking-wider text-white/70 grid grid-cols-[1fr_140px_120px] gap-x-4">
              <div>Payment Number</div>
              <div className="text-center">Amount</div>
              <div className="text-right">Status</div>
            </div>
            <div className="mt-2 divide-y divide-white/5">
              {transactions.map((tx) => (
                <PaymentRow key={tx.id} tx={tx} />
              ))}
            </div>
            <button className="mt-3 w-full h-9 rounded-full bg-white/5 text-gray-300 text-sm">View All transactions</button>
          </div>
        </div>

        {/* ---------- New merchants + Transaction History ---------- */}
        <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] 2xl:grid-cols-[360px_1fr] gap-6 mt-6">
          <div className="bg-[#1e1e1e] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-semibold">New merchants</div>
              <button className="text-white/60 hover:text-white"><MoreHorizontal className="h-5 w-5" /></button>
            </div>
            <div className="divide-y divide-white/5">
              {newMerchants.map((m, i) => (
                <PersonRow key={i} item={m} />
              ))}
            </div>
            <button className="mt-4 w-full h-9 rounded-full bg-white/5 text-gray-300 text-sm">View more Customers</button>
          </div>

          <div className="bg-[#1e1e1e] rounded-2xl p-5">
            <div className="text-white font-semibold mb-3">Transaction History</div>
            <div className="rounded-lg bg-[#2a2a2a] px-4 py-2 text-[11px] uppercase tracking-wider text-white/70 grid grid-cols-[1fr_140px_120px] gap-x-4">
              <div>Payment Number</div>
              <div className="text-center">Amount</div>
              <div className="text-right">Status</div>
            </div>
            <div className="mt-2 divide-y divide-white/5">
              {transactions.map((tx) => (
                <PaymentRow key={tx.id} tx={tx} />
              ))}
            </div>
            <button className="mt-3 w-full h-9 rounded-full bg-white/5 text-gray-300 text-sm">View All transactions</button>
          </div>
        </div>

        {/* ---------- Sales Locations ---------- */}
        <SalesLocations />
      </div>
    </div>
  );
}