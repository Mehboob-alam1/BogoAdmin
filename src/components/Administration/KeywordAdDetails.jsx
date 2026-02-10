// components/Administration/KeywordAdDetails.jsx
import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

// LEFT sidebar logo (your existing one)
import companyLogo from "../../assets/com.png";

/* ====== IMPORT ALL ASSETS PROPERLY ====== */
import storeThumb from "../../assets/pizza.png";
import icUsers     from "../../assets/tim.png";
import icClick     from "../../assets/boya.png";
import icLike      from "../../assets/boks.png";
import icViews     from "../../assets/loc.png";
import icCost      from "../../assets/loc.png";
import icCos      from "../../assets/loc.png";

// import icDuration  from "../../assets/ic-duration.png";
// import icTarget    from "../../assets/ic-target.png";
// import icBurger    from "../../assets/ic-burger.png";
// import icProvince  from "../../assets/ic-province.png";
// import icCity      from "../../assets/ic-city.png";
// import icCost      from "../../assets/loc.png";

export default function KeywordAdDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state } = useLocation();
  const passedAd = state?.ad;

  // Fallback if opened directly
  const ad = useMemo(
    () =>
      passedAd || {
        id,
        company: `Company ${id}`,
        adType: "Homepage Ad",
        email: `company${id}@mail.com`,
        phone: "0300-0000000",
        duration: "FROM 12/12/2023 TO 12/12/2023",
        region: "Ontario",
        target: "All the clients",
        price: "$250",
        status: "Active",
      },
    [id, passedAd]
  );

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">
      <div className="max-w-[1200px] mx-auto px-4 py-3">
        <button onClick={() => nav(-1)} className="mb-4 text-sm text-blue-400 underline">
          Back
        </button>

        <div className="grid grid-cols-12 gap-2">
          {/* LEFT SIDEBAR */}
          <aside className="col-span-3">
            <div className="rounded-xl p-4 bg-[#1a1a1a] border border-white/10">
              <div className="flex items-center gap-3">
                <img src={companyLogo} alt="logo" className="h-14 w-14 rounded-xl bg-white p-2" />
                <div>
                  <div className="text-xs opacity-70">active</div>
                  <div className="font-semibold">{ad.company}</div>
                  <div className="text-xs opacity-60">{ad.adType}</div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#151515] p-4">
                <div className="font-semibold mb-2">info</div>
                <div className="text-xs space-y-1 opacity-80">
                  <div>{ad.company.toLowerCase()}</div>
                  <div>{ad.email}</div>
                  <div>{ad.phone}</div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-[#151515] p-4">
                <div className="font-semibold mb-1">Average Rating</div>
                <div className="flex items-center gap-2">
                  <div>4.0</div>
                  <Stars />
                </div>
                <div className="text-xs opacity-60 mt-1">Average rating of the year</div>
              </div>

              <div className="mt-4 rounded-xl bg-[#151515] p-4">
                <div className="font-semibold mb-2">Information</div>
                <p className="text-xs opacity-70 leading-relaxed">
                  Short description about the advertiser goes here…
                </p>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="col-span-9 space-y-4">
            {/* ===== Header card ===== */}
            <div className="rounded-[22px] bg-[#1a1a1a] border border-white/10 overflow-hidden">
              {/* top row */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-black/30">
                    <img src={storeThumb} alt="thumb" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <div className="text-base font-semibold leading-tight">Store Name</div>
                    <div className="text-xs opacity-80 leading-tight">{ad.adType}</div>
                    <div className="text-[10px] opacity-60 leading-tight">{ad.duration}</div>
                  </div>
                </div>
                <div className="text-[#8be06a] text-2xl font-extrabold tracking-tight">120000 DA</div>
              </div>

              {/* metrics strip */}
              <div className="grid grid-cols-5 bg-[#202020]">
                {[
                  [icUsers, "150", "new costumers", true],
                  [icClick, "500", "clic", false],
                  [icLike, "10", "like", false],
                  [icViews, "3k", "views", false],
                  [icCost, "1.5$", "cost", false],
                ].map(([icon, value, label, highlight], i) => (
                  <div
                    key={i}
                    className={`px-4 py-3 border-r border-black/20 last:border-r-0 ${highlight ? "bg-black/30 rounded-tl-[14px]" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={icon} alt="" className="h-4 w-4 opacity-80" />
                      <span className="font-semibold">{value}</span>
                    </div>
                    <div className="text-[11px] opacity-70 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>

              {/* status row */}
              <div className="px-4 py-3">
                <div className="w-full flex justify-end">
                  <span className="px-3 py-1 rounded-full bg-[#2a2a2a] text-xs text-white/90">Completed</span>
                </div>
              </div>
            </div>

            {/* ===== Start date (interactive) ===== */}
            <StartDateSection />

            {/* ===== Rows (icons left, value chip right) ===== */}
            <DetailRow
              icon={icUsers }
              iconGradient="from-green-400 to-lime-400"
              label="duration"
              rightValue="01 months"
            />

            <DetailRow
              icon={icClick}
              iconGradient="from-yellow-400 to-orange-400"
              label="target"
              rightValue="All the clients"
            />

            {/* burger – big dark input-style bar */}
            <DetailRow
              icon={icLike}
              iconGradient="from-orange-400 to-red-400"
              label="burger"
              big
            />

            <DetailRow
              icon={icLike}
              iconGradient="from-violet-500 to-yellow-400"
              label="Province"
              rightValue={ad.region}
            />

            <DetailRow
              icon={icCost }
              iconGradient="from-purple-600 to-indigo-500"
              label="City"
              rightValue="Toronto"
            />

            {/* Actions */}
            <div className="flex items-center justify-center gap-8 pt-2 text-white">
              <ActionPill color="#FACC15" label="Ban" onClick={() => console.log("ban", ad.id)} />
              <ActionPill color="#FF5A3D" label="reject" onClick={() => console.log("reject", ad.id)} />
              <ActionPill color="#22C55E" label="accepte" onClick={() => console.log("accept", ad.id)} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

/* --------------------- Start date section --------------------- */
function StartDateSection() {
  const week = [
    { d: "M", n: 10, weekend: false },
    { d: "T", n: 11, weekend: false },
    { d: "W", n: 12, weekend: false },
    { d: "T", n: 13, weekend: false },
    { d: "F", n: 14, weekend: false },
    { d: "S", n: 15, weekend: true },
    { d: "S", n: 16, weekend: true },
  ];
  const [sel, setSel] = useState(2);

  return (
    <div className="rounded-[22px] bg-[#1a1a1a] border border-white/10 px-4 py-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/90">Start date</span>
        <span className="text-white/80">12 January 2023</span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {week.map((w, i) => {
          const isSel = sel === i;
          const isWeekend = w.weekend;

          if (isSel) {
            return (
              <button
                key={i}
                onClick={() => setSel(i)}
                className="h-9 min-w-[58px] px-3 rounded-[12px] bg-[#8ED26E] text-black font-semibold grid place-items-center"
              >
                <div className="text-[11px] leading-none">{w.d}</div>
                <div className="text-sm leading-none mt-0.5">{w.n}</div>
              </button>
            );
          }

          return (
            <button
              key={i}
              onClick={() => setSel(i)}
              className="h-9 min-w-[46px] px-2 rounded-[10px] bg-transparent grid place-items-center"
            >
              <div className={`text-[11px] leading-none ${isWeekend ? "text-red-500" : "text-white/60"}`}>{w.d}</div>
              <div className={`text-sm leading-none mt-0.5 ${isWeekend ? "text-red-500" : "text-white"}`}>{w.n}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------- Rows (icon left, value chip right) --------------------- */
function DetailRow({ icon, iconGradient, label, rightValue, big = false }) {
  return (
    <div className="rounded-[22px] bg-[#1a1a1a] border border-white/10 px-3 py-2 flex items-center gap-3">
      {/* left circular icon */}
      <div className={`h-12 w-12 rounded-[16px] bg-gradient-to-br ${iconGradient} p-2`}>
        <div className="h-full w-full rounded-[12px] bg-white/90 grid place-items-center">
          <img src={icon} alt="" className="h-7 w-7 object-contain" />
        </div>
      </div>

      {/* label + big input bar (for burger) */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-white/85">{label}</div>

        {big ? (
          <div className="mt-2 h-14 rounded-[14px] bg-[#0f0f0f] border border-black/40 px-4 grid place-items-center text-sm text-white/80">
            {/* empty dark bar */}
          </div>
        ) : (
          <div className="mt-2 h-0" />
        )}
      </div>

      {/* right value chip (not for big burger bar) */}
      {!big && (
        <div className="shrink-0">
          <div className="h-12 min-w-[140px] px-4 rounded-[16px] bg-[#242424] border border-black/40 grid place-items-center">
            <div className="text-sm text-white/85">{rightValue}</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------- Misc --------------------- */
function Stars() {
  return (
    <div className="flex">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < 4 ? "#fbbf24" : "none"} stroke="#fbbf24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.8 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function ActionPill({ color, label, onClick }) {
  return (
    <button onClick={onClick} className="px-8 py-3 rounded-full font-semibold" style={{ background: color, color: "#0f0f0f" }}>
      {label}
    </button>
  );
}
