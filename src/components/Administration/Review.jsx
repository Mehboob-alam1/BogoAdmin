import React, { useMemo, useState } from "react";
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  Info,
  Image as ImageIcon,
  ArrowRight,
  X,
} from "lucide-react";
import comLogo from "../../assets/com.png";

// === PNG icons (your assets) ===
import AllIcon from "../../assets/rev-a.png";
import BestIcon from "../../assets/rev-b.png";
import BadIcon from "../../assets/rev-c.png";
import BannedIcon from "../../assets/rev-d.png";

/* ================= DEMO DATA (24 customers, 25 reviews) ================ */
const customers = Array.from({ length: 24 }).map((_, i) => {
  const id = i + 1;
  return {
    id: `c${id}`,
    name:
      [
        "Nur Khan","Kate Lau","Aishwarya Kumar","Marías Fernanda","Alex Robert",
        "Liam Brown","Emma Wilson","Olivia Miller","Noah Davis","Mia Clark",
        "Ava Lewis","Ethan Hall","Sophia Young","James King","Lucas Scott",
        "Amelia Reed","Benjamin Cox","Harper Gray","Evelyn Ross","Daniel Green",
        "Chloe Wood","Henry Ward","Layla Reed","Ivy Stone"
      ][i] || `User ${id}`,
    email: `user${id}@mail.com`,
    img: `https://i.pravatar.cc/100?img=${(id % 70) + 1}`,
  };
});

const seed = [
  { id: "r1", type: "all",    customerId: "c1",  category: "Category", store: "Store Name", comment: "I bought it 3 weeks ago and now come back just to say \"Awesome\"! I really enjoy it.", stars: 5, account: "PREMIUM", datetime: "12/07/2023 13:58:05", status: "accepted" },
  { id: "r2", type: "best",   customerId: "c2",  category: "Category", store: "Store Name", comment: "Amazing quality!", stars: 5, account: "PREMIUM", datetime: "12/07/2023 13:58:05", status: "accepted" },
  { id: "r3", type: "bad",    customerId: "c3",  category: "Category", store: "Store Name", comment: "Not good quality.", stars: 1, account: "FREE", datetime: "12/07/2023 13:58:05", status: "banned" },
  { id: "r4", type: "banned", customerId: "c4",  category: "Category", store: "Store Name", comment: "Spam review detected.", stars: 0, account: "FREE", datetime: "12/07/2023 13:58:05", status: "banned" },
  { id: "r5", type: "all",    customerId: "c5",  category: "Category", store: "Store Name", comment: "Good overall.", stars: 4, account: "FREE", datetime: "12/07/2023 13:58:05", status: "accepted" },
];

const generated = Array.from({ length: 20 }).map((_, i) => {
  const idx = i + 6;
  const t = ["all","best","bad","banned"][i % 4];
  const comments = [
    "Great product. Love it!",
    "I bought it 3 weeks ago and now come back just to say \"Awesome\"! I really enjoy it.",
    "Good overall.",
    "Misunderstanding in review."
  ];
  const status = t === "banned" || t === "bad" ? "banned" : "accepted";
  return {
    id: `r${idx}`,
    type: t,
    customerId: `c${((i % 24) + 1)}`,
    category: "Category",
    store: "Store Name",
    comment: comments[i % comments.length],
    stars: (i % 5) + 1,
    account: i % 2 ? "PREMIUM" : "FREE",
    datetime: "12/07/2023 13:58:05",
    status
  };
});
const reviews = [...seed, ...generated];

/* ============================ COMPONENT ============================ */
const Review = () => {
  // same behavior as before
  const [activeFilter, setActiveFilter] = useState(null); // null | all | best | bad | banned
  const [hasClickedCard, setHasClickedCard] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [rateFilter, setRateFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const onPick = (type) => {
    setActiveFilter(type);
    setHasClickedCard(true);
    if (type === "banned") {
      const firstBanned = reviews.find((r) => r.type === "banned" || r.status === "banned");
      setSelectedId(firstBanned ? firstBanned.id : null);
    } else {
      setSelectedId(null);
    }
  };

  const filteredRows = useMemo(() => {
    let list = reviews.filter((r) =>
      !activeFilter || activeFilter === "all" ? true : r.type === activeFilter
    );
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((r) => {
        const c = customers.find((x) => x.id === r.customerId);
        return (
          r.comment.toLowerCase().includes(q) ||
          r.store.toLowerCase().includes(q) ||
          c?.name.toLowerCase().includes(q) ||
          c?.email.toLowerCase().includes(q)
        );
      });
    }
    if (rateFilter !== "all") list = list.filter((r) => String(r.stars) === rateFilter);
    if (accountFilter !== "all") list = list.filter((r) => r.account === accountFilter);
    if (categoryFilter !== "all") list = list.filter((r) => r.category === categoryFilter);
    return list;
  }, [activeFilter, search, rateFilter, accountFilter, categoryFilter]);

  const selected = useMemo(
    () => (selectedId ? reviews.find((r) => r.id === selectedId) : null),
    [selectedId]
  );
  const selectedCustomer = selected
    ? customers.find((c) => c.id === selected.customerId)
    : null;

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white/90">
      <div className="mx-auto w-full max-w-[1280px] px-4">

        {/* ===== Cards (unchanged, only icons bigger) ===== */}
        <div className="mt-6 grid grid-cols-4 gap-5">
          <TopCard title="All Review" icon={AllIcon}   active={activeFilter === "all"}    onClick={() => onPick("all")} />
          <TopCard title="Best seller reviews" icon={BestIcon} active={activeFilter === "best"}   onClick={() => onPick("best")} />
          <TopCard title="Bad seller reviews"  icon={BadIcon}  active={activeFilter === "bad"}    onClick={() => onPick("bad")} />
          <TopCard title="Banned Review"       icon={BannedIcon}active={activeFilter === "banned"} onClick={() => onPick("banned")} />
        </div>

        {/* ===== Filters visible after click (unchanged layout) ===== */}
        {hasClickedCard && (
          <div className="mt-6 flex items-center gap-4">
            {/* search left — uses lucide Search icon now */}
            <div className="flex-1">
              <div className="h-11 rounded-full bg-[#151515] border border-white/10 flex items-center px-3">
                <Search size={16} className="mr-1 opacity-60" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search"
                  className="bg-transparent outline-none text-sm w-full placeholder:text-white/40"
                />
              </div>
            </div>

            {/* dropdowns right */}
            <div className="flex items-center gap-3">
              <SelectBox
                value={rateFilter}
                onChange={setRateFilter}
                label="reviews rate"
                options={[{v:"all",t:"All"},{v:"5",t:"5★"},{v:"4",t:"4★"},{v:"3",t:"3★"},{v:"2",t:"2★"},{v:"1",t:"1★"}]}
              />
              <SelectBox
                value={accountFilter}
                onChange={setAccountFilter}
                label="ACCOUNT"
                options={[{v:"all",t:"All"},{v:"PREMIUM",t:"PREMIUM"},{v:"FREE",t:"FREE"}]}
              />
              <SelectBox
                value={categoryFilter}
                onChange={setCategoryFilter}
                label="Category"
                options={[{v:"all",t:"All"},{v:"Category",t:"Category"}]}
              />
            </div>
          </div>
        )}

        {/* ===== Table (unchanged colors, behavior) ===== */}
        <section className="mt-6 rounded-lg bg-[#1a1a1a] border border-white/5 overflow-hidden">
          <div className="overflow-visible">
            <table className="min-w-full text-sm table-fixed">
              <colgroup>
                <col style={{ width: "20%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "34%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "4%" }} />
                <col style={{ width: "2%" }} />
              </colgroup>
              <thead>
                <tr className="bg-[#292929] text-white">
                  <Th>FULL NAME</Th>
                  <Th>Category</Th>
                  <Th>Store</Th>
                  <Th>Comment</Th>
                  <Th>ACCOUNT</Th>
                  <Th>on the date</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRows.map((r) => {
                  const c = customers.find((x) => x.id === r.customerId) || customers[0];
                  return (
                    <tr key={r.id} className="cursor-pointer" onClick={() => setSelectedId(r.id)}>
                      <Td className="bg-[#292929] text-white whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <img src={c.img} alt={c.name} className="h-12 w-12 rounded-md object-cover" />
                          <div className="flex flex-col">
                            <div className="font-semibold leading-tight">{c.name}</div>
                            <div className="text-[11px] text-white/80 leading-tight">{c.email}</div>
                            <div className="text-[11px] text-white/60 leading-tight">0987654321</div>
                          </div>
                        </div>
                      </Td>
                      <Td className="bg-black text-white whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span>Category</span>
                          <RatingPill value={(r.stars ? (r.stars * 1.0).toFixed(1) : "4.4")} />
                        </div>
                      </Td>
                      <Td className="bg-[#292929] text-white whitespace-nowrap">{r.store}</Td>
                      <Td className="bg-[#171717] text-white whitespace-normal break-words">
                        <div className="flex items-start justify-between gap-4">
                          <p className="leading-snug">{r.comment}</p>
                          <div className="pt-0.5 shrink-0"><StarIcons count={r.stars} /></div>
                        </div>
                      </Td>
                      <Td className="bg-[#292929] text-white whitespace-nowrap">{r.account}</Td>
                      <Td className="bg-black text-white whitespace-nowrap">{r.datetime}</Td>
                      <Td className="bg-[#292929] text-white whitespace-nowrap">{r.status}</Td>
                      <Td className="bg-[#171717] text-white whitespace-nowrap">
                        <ActionArrowButton />
                      </Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== Detail Panel (unchanged layout; icons now lucide) ===== */}
        {selected && selectedCustomer && (
          <ReviewDetail
            review={selected}
            customer={selectedCustomer}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </div>
  );
};

/* ============================ DETAIL PANEL ============================ */
function ReviewDetail({ review, customer, onClose }) {
  return (
    <section className="mt-1 rounded-2xl  p-5 ">
      {/* Merchant header */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#242424]">
        <div className="flex items-center gap-2 " >
          <div className="h-8 w-10 rounded-lg bg-white grid place-items-center text-black font-bold"><img src={comLogo} alt="" /></div>
          <div>
            <div className="font-semibold">Hotel ibis</div>
            <div className="text-xs opacity-70">hotel@mail.com</div>
            <div className="text-xs opacity-50">0987654321</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {[Phone, Mail, MessageCircle, Info].map((Icon, i) => (
            <span key={i} className="h-9 w-9 grid place-items-center rounded-full bg-[#313131]">
              <Icon size={16} />
            </span>
          ))}
        </div>
      </div>

      {/* Customer pill */}
      <div className="mt-5 p-6 rounded-2xl bg-[#242424] flex items-center w-150 justify-between ml-60">
        <div className="flex items-center gap-3 ">
          <img src={customer.img} alt={customer.name} className="h-10 w-10 rounded-full object-cover" />
          <div>
            <div className="font-semibold">{customer.name}</div>
            <div className="text-xs opacity-70">Buyer</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[Phone, Mail, ImageIcon, Info].map((Icon, i) => (
            <span key={i} className="h-9 w-9 grid place-items-center rounded-full bg-[#313131]">
              <Icon size={16} />
            </span>
          ))}
        </div>
      </div>

      {/* Rating block */}
      <div className="mt-5 rounded-2xl bg-[#242424] p-5">
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-80">Customer Rating</div>
          <div className="text-xs opacity-60">{review.datetime}</div>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-semibold">{review.stars}.0</span>
          <StarIcons count={review.stars} />
        </div>

        {/* Customer Comment */}
        <div className="mt-4 rounded-xl bg-[#2b2b2b] p-4">
          <div className="text-xs font-semibold opacity-80 mb-2">Customer’s Comment:</div>
          <div className="text-sm opacity-90">{review.comment}</div>
        </div>

        {/* Merchant Text (kept same placeholder) */}
        <div className="mt-3 rounded-xl bg-[#ff6b4a] p-4 text-black">
          <div className="text-xs font-semibold mb-1">Merchant’s Text:</div>
          <div className="text-sm">
            We contacted the customer to clarify the issue and noticed the review was not completely
            authentic. This is being submitted to our moderation team.
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap items-center gap-22">
        <button className="px-9 h-15 rounded-full bg-[#ff5a40] text-white font-medium">Ban Customer</button>
        <button className="px-9 h-15 rounded-full bg-[#22c55e] text-white font-medium">Unban</button>
        <button className="px-9 h-15 rounded-full bg-[#fbbf24] text-white font-medium">Ban Comment</button>
        <button onClick={onClose} className="ml-auto px-5 h-11 rounded-full bg-white/10 text-white flex items-center gap-1">
          <X size={16}/> Close
        </button>
      </div>
    </section>
  );
}

/* ============================ PRIMITIVES ============================ */

const TopCard = ({ title, icon, active, onClick }) => {
  const bg = active ? "#8BC255" : "#292929"; // active green; else dark
  return (
    <button
      onClick={onClick}
      className="rounded-[6.94px] overflow-hidden shadow-sm border border-white/5 text-left"
      style={{ height: 126, background: bg }}
    >
      <div className="h-full w-full flex items-center gap-4 px-4">
        {icon ? <img src={icon} alt="icon" className="h-20 w-20" /> : null}
        <div className={`text-[16px] mt-1 ${active ? "underline" : ""}`}>{title}</div>
      </div>
    </button>
  );
};

const SelectBox = ({ value, onChange, label, options }) => (
  <div>
    <div className="h-11 min-w-[190px] rounded-md bg-[#151515] border border-white/10 flex items-center justify-between px-4 text-sm">
      <span className="opacity-90 select-none">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-transparent outline-none w-[90px]">
        {options.map((o) => (
          <option key={o.v} value={o.v} className="bg-[#151515]">{o.t}</option>
        ))}
      </select>
    </div>
  </div>
);

const Th = ({ children, className = "" }) => (
  <th className={`text-left px-4 py-3 whitespace-nowrap font-semibold ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }) => (
  <td className={`px-4 py-4 align-top ${className}`}>{children}</td>
);

// keeping star look same (not replaced with font icon to preserve fill behavior)
const StarIcons = ({ count = 0 }) => {
  const items = new Array(5).fill(0).map((_, i) => i < count);
  return (
    <div className="flex items-center gap-1">
      {items.map((filled, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" className={filled ? "text-yellow-400" : "text-white/20"}>
          <path fill="currentColor" d="m12 17.27l6.18 3.73l-1.64-7.03L21.5 9.24l-7.19-.62L12 2L9.69 8.62L2.5 9.24l4.96 4.73L5.82 21z"/>
        </svg>
      ))}
    </div>
  );
};

const RatingPill = ({ value = "4.4" }) => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] rounded-full bg-[#2b2b2b] text-[#f59e0b] border border-[#f59e0b33]">
    {/* small star stays as svg for the numeric pill look */}
    <svg width="12" height="12" viewBox="0 0 24 24"><path fill="currentColor" d="m12 17.27l6.18 3.73l-1.64-7.03L21.5 9.24l-7.19-.62L12 2L9.69 8.62L2.5 9.24l4.96 4.73L5.82 21z"/></svg>
    {value}
  </span>
);

const ActionArrowButton = () => (
  <button className="h-10 px-5 rounded-full bg-white text-black font-medium inline-flex items-center justify-center">
    <ArrowRight size={18} />
  </button>
);

export default Review;
