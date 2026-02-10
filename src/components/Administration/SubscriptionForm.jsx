// src/components/Administration/SubscriptionForm.jsx
import React, { useState } from "react";

/* --- Tokens --- */
const COLORS = {
  bg: "#0F1115",
  haloBg: "#0F1115",
  border: "#29303a",
  haloBorder: "rgba(88,104,179,0.25)",
  text: "#E6EBF2",
  muted: "#97A0AA",
  primary: "#8BC255",
  orange: "#ff6a3d",
};

/* --- Exact sizes (as given) --- */
const SPEC = {
  fieldW: 226,
  fieldH: 92,
  pillW_price: 96,
  pillW_discount: 97,
  pillH: 92,
  radius: 35,
  padX: 20,
  padY: 16,
  gap: 10,
  // Information rows
  infoW: 1004,
  infoH: 92,
  infoRadius: 35,
};

export default function SubscriptionForm({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    price: "10900",
    priceCurrency: "DA",
    discount: "10900",
    discountCurrency: "DA",
    coupon: "",
    durationValue: "6",
    durationUnit: "months",
    freePlan: "Yes",
    category: "Regular",
    popularity: "POPULAR",
    infos: [
      "Number of individuals: One",
      "Number of offers: Unlimited",
      "Number of days: 7 days a week",
    ],
    excludes: [],
  });

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  return (
    <div className="min-h-screen w-full" style={{ background: COLORS.bg }}>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-white text-[20px] font-bold">Subscriptions</h1>
          <button
            onClick={onBack}
            className="h-10 px-4 rounded-xl bg-[#1b2026] text-white hover:bg-[#20262d]"
          >
            Back
          </button>
        </div>

        {/* --------- ROW 1: fixed-size capsules (no scroll) --------- */}
        <div className="flex flex-wrap items-start overflow-x-hidden" style={{ gap: SPEC.gap }}>
          {/* Name */}
          <div className="flex-none">
            <CapsuleInput
              label="Subscriptions"
              styleBox={fixedBox(SPEC.fieldW, SPEC.fieldH)}
              inputStyle={{ padding: `0 ${SPEC.padX}px` }}
              value={form.name}
              placeholder="NAme Subscriptions"
              onChange={(e) => set("name", e.target.value)}
            />
          </div>

          {/* Price WITH inner DA pill */}
          <div className="flex-none">
            <CapsuleWithPill
              label="price"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              pillText={form.priceCurrency}
              pillWidth={SPEC.pillW_price}
              showCaret={false}
            />
          </div>

          {/* Discount WITH inner DA pill */}
          <div className="flex-none">
            <CapsuleWithPill
              label="discount"
              value={form.discount}
              onChange={(e) => set("discount", e.target.value)}
              pillText={form.discountCurrency}
              pillWidth={SPEC.pillW_discount}
              showCaret
            />
          </div>

          {/* Coupon */}
          <div className="flex-none">
            <CapsuleInput
              label="Coupon"
              styleBox={fixedBox(SPEC.fieldW, SPEC.fieldH)}
              inputStyle={{ padding: `0 ${SPEC.padX}px` }}
              value={form.coupon}
              onChange={(e) => set("coupon", e.target.value)}
            />
          </div>
        </div>

        {/* --------- ROW 2: duration / free plan / category / popularity --------- */}
        <div className="mt-4 flex flex-wrap items-start" style={{ gap: SPEC.gap }}>
          <div className="flex-none">
            <CapsuleDuration
              label="duration"
              valueNumber={form.durationValue}
              valueUnit={form.durationUnit}
              onChange={(num, unit) => {
                set("durationValue", num);
                set("durationUnit", unit);
              }}
            />
          </div>

          <div className="flex-none">
            <CapsuleSelect
              label="Free Plan"
              value={form.freePlan}
              options={["Yes", "No"]}
              onChange={(v) => set("freePlan", v)}
            />
          </div>

          <div className="flex-none">
            <CapsuleSelect
              label="category"
              value={form.category}
              options={["Regular", "Student", "Company", "Free Trial"]}
              onChange={(v) => set("category", v)}
              showLock
            />
          </div>

          <div className="flex-none">
            <CapsuleSelect
              label="popularity"
              value={form.popularity}
              options={["POPULAR", "NORMAL", "HIDDEN"]}
              onChange={(v) => set("popularity", v)}
            />
          </div>
        </div>

        {/* --------- Information (fixed 1004×92 rows) --------- */}
        <div className="mt-6 space-y-3">
          <FieldLabel>information</FieldLabel>

          {form.infos.map((it, i) => (
            <InfoRow
              key={i}
              value={it}
              onChange={(val) => {
                const c = [...form.infos];
                c[i] = val;
                set("infos", c);
              }}
              onRemove={() => {
                const c = [...form.infos];
                c.splice(i, 1);
                set("infos", c);
              }}
            />
          ))}

          {/* Add info */}
          <div className="flex items-center gap-3 pt-1">
            <RoundIcon
              bg={COLORS.primary}
              fg="#0b0f14"
              label="+"
              onClick={() => set("infos", [...form.infos, ""])}
            />
            <span className="text-xs" style={{ color: COLORS.muted }}>
              Add new information
            </span>
          </div>

          {/* Exclude */}
          <div className="pt-4">
            <FieldLabel>Exclude</FieldLabel>
            {form.excludes.map((ex, i) => (
              <InfoRow
                key={i}
                value={ex}
                onChange={(val) => {
                  const c = [...form.excludes];
                  c[i] = val;
                  set("excludes", c);
                }}
                onRemove={() => {
                  const c = [...form.excludes];
                  c.splice(i, 1);
                  set("excludes", c);
                }}
              />
            ))}

            <div className="flex items-center gap-3 pt-1">
              <RoundIcon
                bg={COLORS.orange}
                fg="#fff"
                label="–"
                onClick={() => set("excludes", [...form.excludes, ""])}
              />
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="mt-8 flex justify-end">
          <button
            className="h-12 w-48 rounded-full text-black font-medium"
            style={{ background: COLORS.primary }}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------- Helpers & Atoms ----------------- */

function fixedBox(w, h) {
  return {
    width: w,
    height: h,
    borderRadius: SPEC.radius,
    borderWidth: 1,
    padding: `${SPEC.padY}px ${SPEC.padX}px`,
    background: COLORS.haloBg,
    borderColor: COLORS.haloBorder,
    boxShadow:
      "inset 0 0 0 1px rgba(41,48,58,0.7), 0 0 0 1px rgba(88,104,179,0.12)",
    display: "flex",
    alignItems: "center",
    position: "relative",
  };
}

const FieldLabel = ({ children }) => (
  <div className="mb-2 text-xs font-semibold" style={{ color: COLORS.muted }}>
    {children}
  </div>
);

/** Plain capsule field */
function CapsuleInput({ label, styleBox, inputStyle, ...props }) {
  return (
    <div className="flex flex-col flex-none">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" style={styleBox}>
        <input
          {...props}
          className="w-full bg-transparent outline-none"
          style={{ color: COLORS.text, height: "100%", ...inputStyle }}
        />
      </div>
    </div>
  );
}

/** Capsule with an inner right currency pill */
function CapsuleWithPill({
  label,
  value,
  onChange,
  pillText = "DA",
  pillWidth = 96,
  showCaret = false,
}) {
  const boxStyle = fixedBox(SPEC.fieldW, SPEC.fieldH);
  return (
    <div className="flex flex-col flex-none">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" style={boxStyle}>
        <input
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none"
          style={{
            color: COLORS.text,
            height: "100%",
            paddingLeft: SPEC.padX,
            paddingRight: pillWidth + SPEC.padX + 4,
          }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 grid place-items-center text-sm"
          style={{
            right: 2,
            width: pillWidth,
            height: SPEC.pillH,
            borderRadius: SPEC.radius,
            borderWidth: 1,
            padding: `${SPEC.padY}px ${SPEC.padX}px`,
            background: "#2A2F36",
            color: COLORS.text,
            borderColor: COLORS.border,
          }}
        >
          <div className="flex items-center gap-2">
            <span>{pillText}</span>
            {showCaret && <span className="opacity-60">▾</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Duration inside a single capsule (226×92) */
function CapsuleDuration({ label, valueNumber, valueUnit, onChange }) {
  const boxStyle = fixedBox(SPEC.fieldW, SPEC.fieldH);
  return (
    <div className="flex flex-col flex-none">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" style={boxStyle}>
        <div className="flex items-center w-full gap-3">
          <input
            value={valueNumber}
            onChange={(e) => onChange(e.target.value, valueUnit)}
            className="h-12 w-20 rounded-[18px] px-4 outline-none"
            style={{
              background: COLORS.haloBg,
              color: COLORS.text,
              border: `1px solid ${COLORS.haloBorder}`,
              boxShadow:
                "inset 0 0 0 1px rgba(41,48,58,0.7), 0 0 0 1px rgba(88,104,179,0.12)",
            }}
          />
          <div
            className="h-12 flex-1 rounded-[18px] px-4 flex items-center justify-between border"
            style={{
              background: COLORS.haloBg,
              color: COLORS.text,
              borderColor: COLORS.haloBorder,
              boxShadow:
                "inset 0 0 0 1px rgba(41,48,58,0.7), 0 0 0 1px rgba(88,104,179,0.12)",
            }}
          >
            <select
              value={valueUnit}
              onChange={(e) => onChange(valueNumber, e.target.value)}
              className="bg-transparent outline-none w-full"
              style={{ color: COLORS.text }}
            >
              <option>months</option>
              <option>years</option>
              <option>days</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Capsule select (Yes/No, Category, Popularity) */
function CapsuleSelect({ label, value, options = [], onChange, showLock = false }) {
  const boxStyle = fixedBox(SPEC.fieldW, SPEC.fieldH);
  return (
    <div className="flex flex-col flex-none">
      <FieldLabel>{label}</FieldLabel>
      <div className="relative" style={boxStyle}>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent outline-none w-full h-full"
          style={{ color: COLORS.text, padding: `0 ${SPEC.padX}px` }}
        >
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          {showLock && (
            <span
              className="inline-block h-2 w-2 rounded-full"
              title="locked"
              style={{ background: "#5b616b" }}
            />
          )}
          <span className="opacity-60">▾</span>
        </div>
      </div>
    </div>
  );
}

/** Information / Exclude row — EXACT 1004×92, radius 35, padding 16/20 */
function InfoRow({ value, onChange, onRemove }) {
  return (
    <div
      className="flex items-center gap-2 border"
      style={{
        width: SPEC.infoW,
        maxWidth: "100%",
        height: SPEC.infoH,
        borderRadius: SPEC.infoRadius,
        padding: `${SPEC.padY}px ${SPEC.padX}px`,
        background: COLORS.haloBg,
        borderColor: COLORS.haloBorder,
        boxShadow:
          "inset 0 0 0 1px rgba(41,48,58,0.7), 0 0 0 1px rgba(88,104,179,0.12)",
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent outline-none"
        style={{ color: COLORS.text }}
      />
      <button
        onClick={onRemove}
        className="h-8 w-8 rounded-lg grid place-items-center"
        style={{ background: "#2a1212" }}
        title="remove"
      >
        <span className="text-[#ff8a8a] text-lg">×</span>
      </button>
    </div>
  );
}

function RoundIcon({ bg, fg, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-8 h-8 rounded-full grid place-items-center"
      style={{ background: bg, color: fg }}
    >
      <span className="text-base leading-none">{label}</span>
    </button>
  );
}
