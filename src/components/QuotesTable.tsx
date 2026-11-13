"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Mail,
  Phone,
  Ship,
  Plane,
  Truck,
  Package,
  Trash2,
  Save,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";

type Quote = {
  _id: string;
  shipmentMode: string;
  originCountry: string;
  destinationCity: string;
  cargoType: string;
  weightKg: string;
  packageCount: string;
  timeline: string;
  specialRequirements: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "in-review" | "quoted" | "closed";
  adminNotes: string;
  createdAt: string;
};

const modeIcon = (mode: string) => {
  const map: Record<string, any> = {
    courier: Package,
    "air-cargo": Plane,
    "ocean-freight": Ship,
    "india-canada": Truck,
    warehousing: Package,
  };
  return map[mode] || Package;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  "in-review": "bg-amber-100 text-amber-700 border-amber-200",
  quoted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
};

export default function QuotesTable() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/quotes");
      setQuotes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await api.patch(`/quotes/${id}`, { status });
      setQuotes((prev) => prev.map((q) => (q._id === id ? data : q)));
      toast.success("Status updated");
    } catch {
      toast.error("Could not update status");
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const { data } = await api.patch(`/quotes/${id}`, {
        adminNotes: editNotes[id] ?? "",
      });
      setQuotes((prev) => prev.map((q) => (q._id === id ? data : q)));
      toast.success("Notes saved");
    } catch {
      toast.error("Could not save notes");
    }
  };

  const deleteQuote = async (id: string) => {
    if (!confirm("Delete this quote permanently?")) return;
    try {
      await api.delete(`/quotes/${id}`);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      toast.success("Quote deleted");
    } catch {
      toast.error("Could not delete quote");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
          <div>
            <h2 className="text-2xl font-black text-[#0b2f3a]">
              Quote Requests
            </h2>
            <p className="text-xs text-[#51626a] mt-0.5">
              {quotes.length} total · All shipment quote submissions
            </p>
          </div>
          <button
            onClick={fetchQuotes}
            disabled={loading}
            className="bg-[#0b2f3a] hover:bg-[#14434f] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {quotes.length === 0 && !loading && (
          <div className="py-16 text-center text-sm text-[#51626a]">
            No quote requests yet. They will appear here as soon as customers
            submit the form.
          </div>
        )}

        <div className="divide-y divide-[#d5dcdb]">
          {quotes.map((q) => {
            const Icon = modeIcon(q.shipmentMode);
            const isOpen = expanded === q._id;

            return (
              <div key={q._id} className="py-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0b2f3a] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#ffd100]" />
                  </div>

                  <div className="flex-1 min-w-[220px]">
                    <div className="font-bold text-sm text-[#0b2f3a]">
                      {q.name}{" "}
                      {q.company && (
                        <span className="text-xs font-medium text-[#51626a]">
                          · {q.company}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-[#51626a] mt-0.5">
                      {q.originCountry} → {q.destinationCity} · {q.cargoType}
                    </div>
                  </div>

                  <div className="text-xs text-[#51626a] min-w-[120px]">
                    {new Date(q.createdAt).toLocaleString()}
                  </div>

                  <select
                    value={q.status}
                    onChange={(e) => updateStatus(q._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer ${statusColors[q.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="in-review">In Review</option>
                    <option value="quoted">Quoted</option>
                    <option value="closed">Closed</option>
                  </select>

                  <button
                    onClick={() => setExpanded(isOpen ? null : q._id)}
                    className="text-xs font-bold text-[#f05a28] hover:text-[#c2410c] flex items-center gap-1"
                  >
                    Details{" "}
                    <ChevronDown
                      size={14}
                      className={
                        isOpen ? "rotate-180 transition" : "transition"
                      }
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 ml-14 bg-[#eef1f0]/60 rounded-xl p-5 border border-[#d5dcdb] space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Mode
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">
                          {q.shipmentMode}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Weight
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">
                          {q.weightKg || "—"}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Packages
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">
                          {q.packageCount || "—"}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Timeline
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">
                          {q.timeline || "—"}
                        </div>
                      </div>
                    </div>

                    {q.specialRequirements && (
                      <div className="text-xs">
                        <div className="font-bold uppercase text-[#14434f] tracking-wider mb-1">
                          Special Requirements
                        </div>
                        <p className="text-[#0b2f3a] whitespace-pre-wrap">
                          {q.specialRequirements}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs">
                      <a
                        href={`mailto:${q.email}`}
                        className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#d5dcdb] font-bold text-[#0b2f3a] hover:border-[#f05a28]"
                      >
                        <Mail size={13} /> {q.email}
                      </a>
                      <a
                        href={`tel:${q.phone}`}
                        className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#d5dcdb] font-bold text-[#0b2f3a] hover:border-[#f05a28]"
                      >
                        <Phone size={13} /> {q.phone}
                      </a>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase text-[#14434f] tracking-wider mb-1">
                        Internal Notes
                      </div>
                      <textarea
                        rows={2}
                        value={editNotes[q._id] ?? q.adminNotes ?? ""}
                        onChange={(e) =>
                          setEditNotes({
                            ...editNotes,
                            [q._id]: e.target.value,
                          })
                        }
                        placeholder="Add internal notes for this quote..."
                        className="w-full text-xs p-3 rounded-lg border border-[#d5dcdb] focus:outline-none focus:ring-2 focus:ring-[#f05a28] bg-white"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveNotes(q._id)}
                          className="inline-flex items-center gap-1.5 bg-[#1f8a5b] hover:bg-[#176e48] text-white text-xs font-bold px-3 py-2 rounded-lg"
                        >
                          <Save size={13} /> Save Notes
                        </button>
                        <button
                          onClick={() => deleteQuote(q._id)}
                          className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-lg border border-red-200"
                        >
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
