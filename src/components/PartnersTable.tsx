"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Mail,
  Phone,
  Trash2,
  Save,
  ChevronDown,
  Building2,
  Plane,
  Truck,
  Boxes,
  Globe2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";

type Partner = {
  _id: string;
  businessType: string;
  estimatedMonthlyVolume: string;
  headquartersCountry: string;
  originLanes: string;
  primaryService: string;
  additionalDetails: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  status: "new" | "contacted" | "in-negotiation" | "approved" | "rejected";
  adminNotes: string;
  createdAt: string;
};

const businessIcon = (type: string) => {
  const map: Record<string, any> = {
    "courier-co": Truck,
    "freight-forwarder": Plane,
    "3pl-provider": Building2,
    "ecommerce-aggregator": Boxes,
  };
  return map[type] || Building2;
};

const volumeLabels: Record<string, string> = {
  starter: "< 100 / mo",
  "100-500": "100 – 500 / mo",
  "500-2000": "500 – 2,000 / mo",
  enterprise: "2,000+ / mo",
};

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-purple-100 text-purple-700 border-purple-200",
  "in-negotiation": "bg-amber-100 text-amber-700 border-amber-200",
  approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rejected: "bg-red-100 text-red-600 border-red-200",
};

export default function PartnersTable() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editNotes, setEditNotes] = useState<Record<string, string>>({});

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/partners");
      setPartners(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load partner applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await api.patch(`/partners/${id}`, { status });
      setPartners((prev) => prev.map((p) => (p._id === id ? data : p)));
      toast.success("Status updated");
    } catch {
      toast.error("Could not update status");
    }
  };

  const saveNotes = async (id: string) => {
    try {
      const { data } = await api.patch(`/partners/${id}`, {
        adminNotes: editNotes[id] ?? "",
      });
      setPartners((prev) => prev.map((p) => (p._id === id ? data : p)));
      toast.success("Notes saved");
    } catch {
      toast.error("Could not save notes");
    }
  };

  const deletePartner = async (id: string) => {
    if (!confirm("Delete this partner application permanently?")) return;
    try {
      await api.delete(`/partners/${id}`);
      setPartners((prev) => prev.filter((p) => p._id !== id));
      toast.success("Application deleted");
    } catch {
      toast.error("Could not delete application");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
        <div className="flex items-center justify-between pb-6 border-b border-[#d5dcdb]">
          <div>
            <h2 className="text-2xl font-black text-[#0b2f3a]">
              Partner Applications
            </h2>
            <p className="text-xs text-[#51626a] mt-0.5">
              {partners.length} total · B2B shipping partnership applications
            </p>
          </div>
          <button
            onClick={fetchPartners}
            disabled={loading}
            className="bg-[#0b2f3a] hover:bg-[#14434f] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {partners.length === 0 && !loading && (
          <div className="py-16 text-center text-sm text-[#51626a]">
            No partner applications yet. They will appear here as soon as businesses submit the form.
          </div>
        )}

        <div className="divide-y divide-[#d5dcdb]">
          {partners.map((p) => {
            const Icon = businessIcon(p.businessType);
            const isOpen = expanded === p._id;

            return (
              <div key={p._id} className="py-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#0b2f3a] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#ffd100]" />
                  </div>

                  <div className="flex-1 min-w-[220px]">
                    <div className="font-bold text-sm text-[#0b2f3a]">
                      {p.companyName}{" "}
                      <span className="text-xs font-medium text-[#51626a]">
                        · {p.contactName}
                      </span>
                    </div>
                    <div className="text-xs text-[#51626a] mt-0.5">
                      {p.headquartersCountry} → Canada ·{" "}
                      {volumeLabels[p.estimatedMonthlyVolume] || p.estimatedMonthlyVolume}
                    </div>
                  </div>

                  <div className="text-xs text-[#51626a] min-w-[120px]">
                    {new Date(p.createdAt).toLocaleString()}
                  </div>

                  <select
                    value={p.status}
                    onChange={(e) => updateStatus(p._id, e.target.value)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-lg border cursor-pointer ${statusColors[p.status]}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in-negotiation">In Negotiation</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>

                  <button
                    onClick={() => setExpanded(isOpen ? null : p._id)}
                    className="text-xs font-bold text-[#f05a28] hover:text-[#c2410c] flex items-center gap-1"
                  >
                    Details{" "}
                    <ChevronDown
                      size={14}
                      className={isOpen ? "rotate-180 transition" : "transition"}
                    />
                  </button>
                </div>

                {isOpen && (
                  <div className="mt-4 ml-14 bg-[#eef1f0]/60 rounded-xl p-5 border border-[#d5dcdb] space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Business Type
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">{p.businessType}</div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Monthly Volume
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">
                          {volumeLabels[p.estimatedMonthlyVolume] || p.estimatedMonthlyVolume}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Origin Lanes
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">{p.originLanes || "—"}</div>
                      </div>
                      <div>
                        <div className="font-bold uppercase text-[#14434f] tracking-wider">
                          Primary Service
                        </div>
                        <div className="mt-1 text-[#0b2f3a]">{p.primaryService}</div>
                      </div>
                    </div>

                    {p.additionalDetails && (
                      <div className="text-xs">
                        <div className="font-bold uppercase text-[#14434f] tracking-wider mb-1">
                          Operational Notes
                        </div>
                        <p className="text-[#0b2f3a] whitespace-pre-wrap">
                          {p.additionalDetails}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 text-xs">
                      <a
                        href={`mailto:${p.email}`}
                        className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#d5dcdb] font-bold text-[#0b2f3a] hover:border-[#f05a28]"
                      >
                        <Mail size={13} /> {p.email}
                      </a>
                      <a
                        href={`tel:${p.phone}`}
                        className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#d5dcdb] font-bold text-[#0b2f3a] hover:border-[#f05a28]"
                      >
                        <Phone size={13} /> {p.phone}
                      </a>
                      <span className="inline-flex items-center gap-1.5 bg-white px-3 py-2 rounded-lg border border-[#d5dcdb] font-bold text-[#0b2f3a]">
                        <Globe2 size={13} /> {p.headquartersCountry}
                      </span>
                    </div>

                    <div>
                      <div className="text-xs font-bold uppercase text-[#14434f] tracking-wider mb-1">
                        Internal Notes
                      </div>
                      <textarea
                        rows={2}
                        value={editNotes[p._id] ?? p.adminNotes ?? ""}
                        onChange={(e) =>
                          setEditNotes({ ...editNotes, [p._id]: e.target.value })
                        }
                        placeholder="Add internal notes for this partner..."
                        className="w-full text-xs p-3 rounded-lg border border-[#d5dcdb] focus:outline-none focus:ring-2 focus:ring-[#f05a28] bg-white"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => saveNotes(p._id)}
                          className="inline-flex items-center gap-1.5 bg-[#1f8a5b] hover:bg-[#176e48] text-white text-xs font-bold px-3 py-2 rounded-lg"
                        >
                          <Save size={13} /> Save Notes
                        </button>
                        <button
                          onClick={() => deletePartner(p._id)}
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