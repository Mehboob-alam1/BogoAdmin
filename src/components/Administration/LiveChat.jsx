import React, { useEffect, useMemo, useState } from "react";
import {
  Mail,
  Send,
  Star,
  Clock,
  Trash2,
  Plus,
  ChevronDown,
  Paperclip,
  ArrowLeft,
} from "lucide-react";

/* ========= API CLIENT (stubs) ========= */
// Set in .env: VITE_API_BASE_URL=https://api.example.com
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

async function api(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
  // handle empty
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : {};
}

/* === API wrappers (replace endpoints to match your backend) === */
async function fetchMessages({ tab, folder }) {
  if (!BASE_URL) return DEMO_MESSAGES.filter((m) => m.tab === tab).filter((m) =>
    folder === "important" ? m.flags?.important : m.folder === folder
  );
  // example: /messages?tab=customers&folder=inbox
  return api(`/messages?tab=${encodeURIComponent(tab)}&folder=${encodeURIComponent(folder)}`);
}

async function fetchMessageById(id) {
  if (!BASE_URL) return DEMO_MESSAGES.find((m) => m.id === id) || null;
  return api(`/messages/${encodeURIComponent(id)}`);
}

async function sendMessage(payload) {
  if (!BASE_URL) {
    // demo optimistic echo
    return {
      id: `local-${Date.now()}`,
      folder: "sent",
      tab: payload.tab || "customers",
      from: "You",
      email: payload.from || "you@bogo.app",
      subject: payload.subject,
      body: payload.body,
      time: new Date().toLocaleString(),
      attachments: [],
      flags: { important: payload.priority === "major" },
    };
  }
  return api("/messages", { method: "POST", body: payload });
}

/* ---------------- DEMO DATA fallback ---------------- */
const DEMO_MESSAGES = [
  {
    id: "m1",
    folder: "inbox",
    tab: "customers",
    from: "Grace Collin",
    email: "grace@workmail.com",
    subject: "Proposal for Implementing a Remote Work Policy",
    body:
      "Dear Team,\n\nI hope this email finds you well. Over the past year, our team has been working remotely..." +
      "\n\nBest regards,\nGrace",
    time: "Sep 06, 2025 • 09:42",
    attachments: ["proposal.pdf", "timeline.xlsx"],
    flags: { important: true },
  },
  {
    id: "m2",
    folder: "sent",
    tab: "merchants",
    from: "You",
    email: "you@bogo.app",
    subject: "Thanks for your partnership",
    body: "Hello partner!\nSharing next quarter plan.",
    time: "Sep 03, 2025 • 16:22",
    attachments: [],
    flags: { important: false },
  },
];

/* ================= ROOT ================= */
export default function LiveChat() {
  const [screen, setScreen] = useState("inbox"); // inbox | compose

  // inbox states
  const [activeTab, setActiveTab] = useState("customers"); // customers | merchants | investors
  const [activeFolder, setActiveFolder] = useState("inbox"); // inbox | sent | important | snooze | trash
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  // compose
  const [form, setForm] = useState({
    customer: "",
    sendTo: "",
    mission: "",
    workIn: "",
    subject: "",
    priority: "major",
    body: "",
  });
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState("");

  /* ---- Load list when tab/folder changes ---- */
  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setListLoading(true);
      setListError("");
      try {
        const rows = await fetchMessages({ tab: activeTab, folder: activeFolder });
        if (!ignore) {
          setList(rows);
          // select first if needed
          setSelectedId((prev) => prev || rows[0]?.id || null);
        }
      } catch (e) {
        if (!ignore) setListError(String(e?.message || e));
      } finally {
        if (!ignore) setListLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [activeTab, activeFolder]);

  /* ---- Load detail when selectedId changes ---- */
  useEffect(() => {
    if (!selectedId) {
      setSelected(null);
      return;
    }
    let ignore = false;
    const run = async () => {
      setDetailLoading(true);
      setDetailError("");
      try {
        const row = await fetchMessageById(selectedId);
        if (!ignore) setSelected(row);
      } catch (e) {
        if (!ignore) setDetailError(String(e?.message || e));
      } finally {
        if (!ignore) setDetailLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  /* ---- Send handler ---- */
  const handleSend = async () => {
    setSendLoading(true);
    setSendError("");
    try {
      const payload = {
        tab: activeTab,
        to: form.sendTo,
        customer: form.customer,
        mission: form.mission,
        workIn: form.workIn,
        subject: form.subject,
        priority: form.priority,
        body: form.body,
      };
      const created = await sendMessage(payload);

      // Optimistic: if in Sent + current tab, prepend
      if (activeFolder === "sent" && created?.tab === activeTab) {
        setList((prev) => [created, ...prev]);
      }
      // reset
      setForm({
        customer: "",
        sendTo: "",
        mission: "",
        workIn: "",
        subject: "",
        priority: "major",
        body: "",
      });
      setScreen("inbox");
    } catch (e) {
      setSendError(String(e?.message || e));
    } finally {
      setSendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl grid place-items-center bg-[#ffe2a7]">
            <Mail className="text-black" size={22} />
          </div>
          <div>
            <div className="text-xl font-semibold">
              {screen === "compose" ? "team messages sent" : "Receiving messages sent to bogo"}
            </div>
            <div className="text-xs opacity-60">
              {BASE_URL ? "connected to API" : "demo mode (no API base URL)"}
            </div>
          </div>
          <div className="ml-auto">
            {screen === "compose" && (
              <button
                onClick={() => setScreen("inbox")}
                className="inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white/10"
              >
                <ArrowLeft size={16} /> back to inbox
              </button>
            )}
          </div>
        </div>

        {screen === "compose" ? (
          <ComposeForm
            form={form}
            setForm={setForm}
            onSend={handleSend}
            loading={sendLoading}
            error={sendError}
          />
        ) : (
          <InboxScreen
            activeTab={activeTab}
            setActiveTab={(v) => {
              setActiveTab(v);
              setSelectedId(null);
            }}
            activeFolder={activeFolder}
            setActiveFolder={(v) => {
              setActiveFolder(v);
              setSelectedId(null);
            }}
            list={list}
            listLoading={listLoading}
            listError={listError}
            selected={selected}
            detailLoading={detailLoading}
            detailError={detailError}
            setSelectedId={setSelectedId}
            openCompose={() => setScreen("compose")}
          />
        )}
      </div>
    </div>
  );
}

/* ================= INBOX SCREEN ================= */
function InboxScreen({
  activeTab,
  setActiveTab,
  activeFolder,
  setActiveFolder,
  list,
  listLoading,
  listError,
  selected,
  detailLoading,
  detailError,
  setSelectedId,
  openCompose,
}) {
  const TabBtn = ({ label, value }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-5 h-12 rounded-t-lg border-b-2 ${
        activeTab === value
          ? "border-[#8BC255] bg-[#1c1c1c]"
          : "border-transparent hover:bg-[#1c1c1c]"
      }`}
    >
      {label}
    </button>
  );

  const FolderBtn = ({ icon: Icon, label, value }) => (
    <button
      onClick={() => setActiveFolder(value)}
      className={`w-full flex items-center gap-3 px-3 h-10 rounded-md text-sm ${
        activeFolder === value
          ? "bg-white/10 text-white"
          : "text-white/70 hover:bg-white/5"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-end gap-3">
        <TabBtn label="Customers" value="customers" />
        <TabBtn label="Merchants" value="merchants" />
        <TabBtn label="Investor partner" value="investors" />
        <button
          onClick={openCompose}
          className="ml-auto inline-flex items-center gap-2 h-12 px-5 rounded-lg bg-[#ffc526] text-black"
        >
          <Plus size={16} /> new message
        </button>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-[220px_360px_minmax(0,1fr)] gap-4">
        {/* Folders */}
        <aside className="rounded-lg bg-[#1a1a1a] border border-white/10 p-3">
          <div className="text-sm font-semibold mb-2 opacity-80">Inbox</div>
          <div className="space-y-2">
            <FolderBtn icon={Mail} label="Inbox" value="inbox" />
            <FolderBtn icon={Send} label="Sent emails" value="sent" />
            <FolderBtn icon={Star} label="Important emails" value="important" />
            <FolderBtn icon={Clock} label="Snooze" value="snooze" />
            <FolderBtn icon={Trash2} label="Trash" value="trash" />
          </div>
        </aside>

        {/* List */}
        <section className="rounded-lg bg-[#1a1a1a] border border-white/10 overflow-hidden">
          <div className="px-3 py-2 text-xs opacity-60 flex items-center justify-between border-b border-white/10">
            <span>{activeFolder}</span>
            <span>
              {listLoading ? "Loading…" : listError ? "Error" : `${list.length} messages`}
            </span>
          </div>

          {listError ? (
            <div className="p-4 text-sm text-red-300">Error: {listError}</div>
          ) : listLoading ? (
            <div className="p-4 text-sm opacity-70">Loading messages…</div>
          ) : (
            <div className="divide-y divide-white/10">
              {list.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedId(m.id)}
                  className="w-full text-left p-3 flex gap-3 hover:bg-white/5"
                >
                  <div className="h-10 w-10 rounded-full bg-[#333] grid place-items-center text-sm">
                    {m.from?.[0]}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold truncate">{m.from}</div>
                      <div className="text-[11px] opacity-60 shrink-0">{m.time}</div>
                    </div>
                    <div className="truncate text-sm opacity-90">{m.subject}</div>
                    <div className="truncate text-xs opacity-60">
                      {(m.body || "").replace(/\n/g, " ")}
                    </div>
                  </div>
                </button>
              ))}
              {list.length === 0 && !listLoading && (
                <div className="p-6 text-sm opacity-70">No messages in this folder.</div>
              )}
            </div>
          )}
        </section>

        {/* Reader */}
        <section className="rounded-lg bg-[#1a1a1a] border border-white/10 overflow-hidden flex flex-col">
          {detailError ? (
            <div className="p-6 text-sm text-red-300">Error: {detailError}</div>
          ) : detailLoading ? (
            <div className="p-6 text-sm opacity-70">Loading message…</div>
          ) : !selected ? (
            <div className="p-6 opacity-70 text-sm">Select a message to read</div>
          ) : (
            <>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-10 w-10 rounded-full bg-[#333] grid place-items-center text-sm">
                      {selected.from?.[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold truncate">{selected.from}</div>
                      <div className="text-xs opacity-60 truncate">{selected.email}</div>
                    </div>
                  </div>
                  <div className="text-xs opacity-60">{selected.time}</div>
                </div>
                <div className="mt-3 text-base font-semibold">{selected.subject}</div>
              </div>

              <div className="p-4 space-y-4 flex-1 overflow-auto">
                <pre className="whitespace-pre-wrap text-sm leading-6 opacity-90">
                  {selected.body}
                </pre>
                {selected.attachments?.length ? (
                  <div className="pt-2">
                    <div className="text-xs opacity-60 mb-2">Attachment</div>
                    <div className="flex flex-wrap gap-2">
                      {selected.attachments.map((a) => (
                        <span
                          key={a}
                          className="inline-flex items-center gap-2 px-3 h-8 rounded-full bg-white/10 text-xs"
                        >
                          <Paperclip size={14} /> {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* mini composer (reply) — wire to your API if needed */}
              <div className="p-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <input
                    className="flex-1 h-10 rounded-md bg-[#0f0f0f] border border-white/10 px-3 text-sm outline-none"
                    placeholder="Type message..."
                  />
                  <button className="h-10 px-4 rounded-md bg-[#6d4aff] text-sm inline-flex items-center gap-2">
                    <Send size={14} /> Send
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

/* ================= COMPOSE FORM ================= */
function ComposeForm({ form, setForm, onSend, loading, error }) {
  const Field = ({ label, children }) => (
    <label className="block">
      <span className="text-[12px] opacity-80">{label}</span>
      {children}
    </label>
  );
  const Input = (props) => (
    <input
      {...props}
      className="w-full h-11 rounded-xl bg-[#151515] border border-white/10 px-3 outline-none text-sm"
    />
  );

  return (
    <div className="rounded-lg bg-[#1a1a1a] border border-white/10 p-5">
      {error ? <div className="mb-3 text-sm text-red-300">Error: {error}</div> : null}
      <div className="grid grid-cols-2 gap-5">
        <Field label="Customer">
          <Input value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} />
        </Field>
        <Field label="work in">
          <Input value={form.workIn} onChange={(e) => setForm({ ...form, workIn: e.target.value })} />
        </Field>

        <Field label="send to">
          <Input value={form.sendTo} onChange={(e) => setForm({ ...form, sendTo: e.target.value })} />
        </Field>
        <Field label="Subject">
          <Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        </Field>

        <Field label="the mission">
          <Input value={form.mission} onChange={(e) => setForm({ ...form, mission: e.target.value })} />
        </Field>

        <Field label="Priority">
          <div className="h-11 rounded-xl bg-[#151515] border border-white/10 px-3 flex items-center justify-between">
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="bg-transparent outline-none text-sm w-full"
            >
              <option value="major">major</option>
              <option value="normal">normal</option>
              <option value="low">low</option>
            </select>
            <ChevronDown size={16} className="opacity-70" />
          </div>
        </Field>
      </div>

      <div className="mt-5">
        <textarea
          rows={6}
          className="w-full rounded-2xl bg-[#151515] border border-white/10 p-4 outline-none text-sm"
          placeholder="Write your message..."
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onSend}
          disabled={loading}
          className="h-12 px-10 rounded-full bg-[#8BC255] text-black font-medium disabled:opacity-60"
        >
          {loading ? "sending…" : "send"}
        </button>
      </div>
    </div>
  );
}
