import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import adsImg from "../../assets/ads.png";
import vectorIcon from "../../assets/Vector.png";
import companyLogo from "../../assets/com.png";

/* ======= DEMO COMPANIES (20 rows) ======= */
const AD_TYPES = [
  "Homepage Ad",
  "Top Category Ad",
  "Keywords Ad",
  "Suggested offers",
  "Inside Offers",
];

const ads = Array.from({ length: 20 }, (_, i) => {
  const t = AD_TYPES[i % AD_TYPES.length];
  const dollars = 100 + i * 10; // just demo price increments
  return {
    id: i + 1,
    company: `Company ${i + 1}`,
    email: `company${i + 1}@mail.com`,
    phone: `0300-12345${i}`,
    adType: t,
    duration: "FROM 12/12/2023 TO 12/12/2023",
    region: ["Region A", "Region B", "Region C"][i % 3],
    target: ["All the clients", "Returning clients", "New clients"][i % 3],
    price: `$${dollars}`, // string
    status: ["Active", "Completed", "Pending"][i % 3],
  };
});

/* ======= Helpers ======= */
const parsePrice = (s) => {
  if (!s) return 0;
  const n = Number(String(s).replace(/[^0-9.]/g, ""));
  return isNaN(n) ? 0 : n;
};
const currency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/* Colors used in chart/legend (fixed order like screenshot) */
const TYPE_COLORS = {
  "Top Category Ad": "#10b981",   // green
  "Keywords Ad": "#ef4444",       // red/orange
  "Suggested offers": "#7C3AED",  // purple
  "Homepage Ad": "#F59E0B",       // yellow
  "Inside Offers": "#3B82F6",     // blue
};

export default function AdsManagement() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* ====== Live metrics from ads (revenue + shares) ====== */
  const { totals, cardStats, spentData } = useMemo(() => {
    const totalRevenue = ads.reduce((acc, a) => acc + parsePrice(a.price), 0);

    // revenue per type
    const revByType = AD_TYPES.reduce((m, t) => {
      m[t] = ads.filter((a) => a.adType === t).reduce((s, a) => s + parsePrice(a.price), 0);
      return m;
    }, {});

    // card data (value=revenue, growth=% share of total revenue)
    const pct = (val) => (totalRevenue ? (val / totalRevenue) * 100 : 0);

    const cardStats = {
      total: { title: "Total ads", value: currency(totalRevenue), share: 100 },
      homepage: {
        title: "Homepage Ad",
        value: currency(revByType["Homepage Ad"] || 0),
        share: pct(revByType["Homepage Ad"] || 0),
      },
      topCategory: {
        title: "Top Category Ad",
        value: currency(revByType["Top Category Ad"] || 0),
        share: pct(revByType["Top Category Ad"] || 0),
      },
      keywords: {
        title: "Keywords Ad",
        value: currency(revByType["Keywords Ad"] || 0),
        share: pct(revByType["Keywords Ad"] || 0),
      },
      suggested: {
        title: "Suggested offers",
        value: currency(revByType["Suggested offers"] || 0),
        share: pct(revByType["Suggested offers"] || 0),
      },
      inside: {
        title: "Inside Offers",
        value: currency(revByType["Inside Offers"] || 0),
        share: pct(revByType["Inside Offers"] || 0),
      },
    };

    // Spant chart data (counts -> % labels)
    const order = [
      "Top Category Ad",
      "Keywords Ad",
      "Suggested offers",
      "Homepage Ad",
      "Inside Offers",
    ];
    const spentData = order.map((key) => {
      const count = ads.filter((a) => a.adType === key).length;
      return {
        name: key,
        value: count,
        color: TYPE_COLORS[key],
      };
    });

    return {
      totals: { totalRevenue },
      cardStats,
      spentData,
    };
  }, []);

  /* ===== Filter rows by search ===== */
  const filteredAds = useMemo(
    () =>
      ads.filter(
        (a) =>
          a.company.toLowerCase().includes(search.toLowerCase()) ||
          a.adType.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  /* ===== Navigate to Keyword details ===== */
  const goToKeywordDetails = (adCandidate) => {
    const keywordsRow =
      filteredAds.find((x) => x.adType.toLowerCase().includes("keywords")) ||
      ads.find((x) => x.adType.toLowerCase().includes("keywords")) ||
      adCandidate ||
      filteredAds[0] ||
      ads[0];

    if (!keywordsRow) return;
    navigate(`/dashboard/ads-management/keywords/${keywordsRow.id}`, {
      state: { ad: keywordsRow },
    });
  };

  /* ===== Cards (built from live stats) ===== */
  const stackedTriples = [
    [
      { title: cardStats.total.title, value: cardStats.total.value, share: cardStats.total.share },
      { title: cardStats.keywords.title, value: cardStats.keywords.value, share: cardStats.keywords.share },
    ],
    [
      { title: cardStats.homepage.title, value: cardStats.homepage.value, share: cardStats.homepage.share },
      { title: cardStats.suggested.title, value: cardStats.suggested.value, share: cardStats.suggested.share },
    ],
    [
      { title: cardStats.topCategory.title, value: cardStats.topCategory.value, share: cardStats.topCategory.share },
      { title: cardStats.inside.title, value: cardStats.inside.value, share: cardStats.inside.share },
    ],
  ];

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white">
      {/* 🔒 Max width exactly 1200 */}
      <div className="mx-auto max-w-[1200px] px-4 py-5 space-y-6">
        {/* ===== CARDS ===== */}
        <div className="space-y-0">
          <div className="flex gap-3">
            {/* 3 stacked columns */}
            {stackedTriples.map((pair, i) => (
              <div key={i} className="flex flex-col" style={{ width: 215 }}>
                {/* top */}
                <StatCard
                  title={pair[0].title}
                  value={pair[0].value}
                  growth={`${pair[0].share.toFixed(1)}%`}
                  growthLabel="of total"
                  width={215}
                  height={134}
                />
                <div style={{ height: 5 }} />
                {/* bottom (if Keywords, make clickable) */}
                <div
                  className={pair[1].title.toLowerCase().includes("keywords") ? "cursor-pointer" : ""}
                  onClick={
                    pair[1].title.toLowerCase().includes("keywords")
                      ? () => goToKeywordDetails()
                      : undefined
                  }
                >
                  <StatCard
                    title={pair[1].title}
                    value={pair[1].value}
                    growth={`${pair[1].share.toFixed(1)}%`}
                    growthLabel="of total"
                    width={215}
                    height={128}
                  />
                </div>
              </div>
            ))}

            {/* Pending card */}
            <PendingCard width={215} height={276} />

            {/* Spant chart (built from ads counts) */}
            <SpentCard width={290} height={276} data={spentData} />
          </div>
        </div>

        {/* ===== FILTERS ===== */}
        <div className="flex items-center mt-3">
          <div className="flex gap-3 flex-1">
            <div className="w-[300px]">
              <div className="h-11 rounded-full bg-[#151515] border border-white/10 flex items-center px-3">
                <Search size={16} className="opacity-60 mr-2" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
                />
              </div>
            </div>
            <select className="h-11 rounded-md bg-[#151515] border border-white/10 px-3 text-sm">
              <option>Target</option>
            </select>
            <select className="h-11 rounded-md bg-[#151515] border border-white/10 px-3 text-sm">
              <option>Ads type</option>
            </select>
            <select className="h-11 rounded-md bg-[#151515] border border-white/10 px-3 text-sm">
              <option>Region</option>
            </select>
            <select className="h-11 rounded-md bg-[#151515] border border-white/10 px-3 text-sm">
              <option>Status</option>
            </select>
          </div>
          <button className="ml-auto h-11 w-11 rounded-full bg-[#6d4aff] grid place-items-center">
            <img src={vectorIcon} alt="action" className="h-4 w-4" />
          </button>
        </div>

        {/* ===== TABLE ===== */}
        <div className="rounded-lg bg-[#1a1a1a] border border-white/10">
          <table className="w-full text-sm table-fixed">
            <colgroup>
              <col style={{ width: "20%" }} />
              <col style={{ width: "12%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "8%" }} />
              <col style={{ width: "12%" }} />
            </colgroup>

            <thead>
              <tr className="bg-[#292929] text-white/80">
                <Th>Company</Th>
                <Th>Ads type</Th>
                <Th>
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-[10px] -mb-0.5">↑↓</span>
                    <span>Duration</span>
                  </div>
                </Th>
                <Th>Region</Th>
                <Th>Target</Th>
                <Th>
                  <div className="flex flex-col items-center leading-tight">
                    <span className="text-[10px] -mb-0.5">↑↓</span>
                    <span>Price</span>
                  </div>
                </Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10">
              {filteredAds.map((a) => (
                <tr key={a.id} className="hover:bg-white/5">
                  {/* Company */}
                  <Td className="bg-[#212121]">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={companyLogo}
                        alt="logo"
                        className="h-10 w-10 rounded-full object-contain bg-white/10 p-1 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{a.company}</div>
                        <div className="text-[11px] opacity-70 truncate">{a.email}</div>
                        <div className="text-[11px] opacity-50 truncate">{a.phone}</div>
                      </div>
                    </div>
                  </Td>

                  {/* Ads type */}
                  <Td className="bg-[#181818] truncate">{a.adType}</Td>

                  {/* Duration */}
                  <Td className="bg-[#212121]">
                    <div className="whitespace-normal leading-tight text-[13px]">{a.duration}</div>
                  </Td>

                  {/* Region */}
                  <Td className="bg-[#181818] truncate">{a.region}</Td>

                  {/* Target */}
                  <Td className="bg-[#212121] truncate">{a.target}</Td>

                  {/* Price */}
                  <Td className="bg-[#181818] truncate">{a.price}</Td>

                  {/* Status */}
                  <Td className="bg-[#212121] truncate">{a.status}</Td>

                  {/* Action */}
                  <Td className="bg-[#181818]">
                    <div className="flex items-center justify-center gap-2">
                      <SquareIconBtn
                        bg="#8BC255"
                        title="View"
                        onClick={() => goToKeywordDetails(a)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" stroke="white" strokeWidth="2" />
                          <circle cx="12" cy="12" r="3" fill="white" />
                        </svg>
                      </SquareIconBtn>

                      <SquareIconBtn bg="#FACC15" title="Block">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </SquareIconBtn>

                      <SquareIconBtn bg="#FF5A3D" title="Delete">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M3 6h18M9 6V4h6v2m-1 14H10a 2 2 0 0 1-2-2V6h8v12a2 2 0 0 1-2 2Z" stroke="white" strokeWidth="2" />
                        </svg>
                      </SquareIconBtn>
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

/* ================== Sub-components ================== */
function StatCard({ title, value, growth, growthLabel = "of total", width = 232, height = 134 }) {
  return (
    <div
      className="rounded-[6px] border border-white/10 p-4 flex flex-col justify-between"
      style={{ width, height, background: "#292929" }}
    >
      <div className="text-sm truncate">{title}</div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs px-2 py-0.5 rounded bg-green-600/20 text-green-400">
            {growth}
          </span>
          <span className="text-xs opacity-60">{growthLabel}</span>
        </div>
      </div>
    </div>
  );
}

function PendingCard({ width = 232, height = 276 }) {
  return (
    <div
      className="rounded-[6px] border border-white/10 flex flex-col items-center justify-between"
      style={{ width, height, background: "#292929" }}
    >
      <img src={adsImg} alt="ads" className="w-24 h-24 object-contain mt-5" />
      <div className="text-sm mb-2">Pending Ads</div>
      <div className="w-[180px] mb-6">
        <button className="w-full h-12 rounded-full bg-[#ff7a2c] text-white font-semibold flex items-center justify-between px-5">
          <span className="text-lg leading-none">30</span>
          <span className="text-xl leading-none">›</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Spant Chart (centered + compact legend bottom row) ---------- */
function SpentCard({ width = 323, height = 276, data }) {
  const renderArcLabel = ({ cx, cy, midAngle, outerRadius, percent }) => {
    const RAD = Math.PI / 180;
    const r1 = outerRadius + 2;
    const r2 = outerRadius + 16;
    const x1 = cx + r1 * Math.cos(-midAngle * RAD);
    const y1 = cy + r1 * Math.sin(-midAngle * RAD);
    const x2 = cx + r2 * Math.cos(-midAngle * RAD);
    const y2 = cy + r2 * Math.sin(-midAngle * RAD);

    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        <circle cx={x2} cy={y2} r="4" fill="#ffffff" />
        <text
          x={x2 + 12 * Math.cos(-midAngle * RAD)}
          y={y2 + 12 * Math.sin(-midAngle * RAD)}
          fill="#ffffff"
          fontSize="12"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {Math.round(percent * 100)}%
        </text>
      </g>
    );
  };

  return (
    <div
      className="rounded-[6px] border border-white/10 flex flex-col items-center"
      style={{ width, height, background: "#292929" }}
    >
      <div className="text-sm font-semibold mt-3">Spant Chart</div>

      {/* Chart perfectly centered vertically in remaining space */}
      <div style={{ width: "100%", height: height - 80 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={86}
              startAngle={90}
              endAngle={-270}
              labelLine={false}
              label={renderArcLabel}
              isAnimationActive={false}
            >
              {data.map((e, i) => (
                <Cell key={i} fill={e.color} />
              ))}
            </Pie>

            {/* inner grey rim + dark center */}
            <Pie data={[{ v: 1 }]} dataKey="v" cx="50%" cy="50%" innerRadius={40} outerRadius={58} fill="#2A2A2A" stroke="none" />
            <Pie data={[{ v: 1 }]} dataKey="v" cx="50%" cy="50%" innerRadius={0}  outerRadius={50} fill="#141414" stroke="none" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Compact legend in a single row at bottom */}
      <div className="flex flex-wrap justify-center gap-3 px-3 pb-3 text-[11px] leading-none opacity-85">
        {data.map((d, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: d.color }}
            />
            <span>{d.name}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const Th = ({ children, className = "" }) => (
  <th className={`text-left px-6 py-3 whitespace-nowrap font-semibold ${className}`}>{children}</th>
);
const Td = ({ children, className = "" }) => (
  <td className={`px-3 py-3 align-top text-white ${className}`}>{children}</td>
);

function SquareIconBtn({ bg, title, children, onClick }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="h-9 w-9 grid place-items-center rounded-[12px] shadow-sm"
      style={{ background: bg }}
    >
      {children}
    </button>
  );
}
