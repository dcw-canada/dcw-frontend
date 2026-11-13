"use client";

import { useEffect, useState } from "react";
import {
  Search,
  RefreshCw,
  Trash2,
  Mail,
  Phone,
  Building2,
  Loader2,
  MessageSquare,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";

type InquiryStatus = "NEW" | "CONTACTED" | "QUOTED" | "CLOSED";

interface Inquiry {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_STYLES: Record<InquiryStatus, string> = {
  NEW: "bg-blue-100 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-100 text-amber-700 border-amber-200",
  QUOTED: "bg-purple-100 text-purple-700 border-purple-200",
  CLOSED: "bg-slate-100 text-slate-600 border-slate-200",
};

const SERVICE_LABELS: Record<string, string> = {
  customs: "Customs clearance",
  warehousing: "Warehousing & fulfillment",
  freight: "Freight forwarding",
  delivery: "Courier & final-mile",
  all: "End-to-end package",
};

const STATUS_OPTIONS: InquiryStatus[] = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "CLOSED",
];

export default function ContactInquiriesTable() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [selected, setSelected] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/inquiries", {
        params: {
          status: statusFilter || undefined,
          search: search || undefined,
          page,
          limit: 25,
        },
      });
      setInquiries(data.inquiries || []);
      setTotal(data.total || 0);
      setPages(data.pages || 1);
      setNewCount(data.newCount || 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load inquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1);
      fetchInquiries();
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleUpdate = async (
    id: string,
    patch: Partial<Pick<Inquiry, "status" | "notes">>,
  ) => {
    try {
      const { data } = await api.patch(`/inquiries/${id}`, patch);
      setInquiries((prev) =>
        prev.map((i) => (i.id === id ? { ...i, ...data } : i)),
      );
      if (selected?.id === id) setSelected({ ...selected, ...data });
      toast.success("Inquiry updated.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update inquiry.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry permanently?")) return;
    try {
      await api.delete(`/inquiries/${id}`);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
      setTotal((t) => Math.max(0, t - 1));
      toast.success("Inquiry deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete inquiry.");
    }
  };

  const formattedDate = (iso: string) =>
    new Date(iso).toLocaleString("en-CA", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#51626a]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, message..."
            className="pl-8 pr-3 py-2 rounded-lg border border-[#d5dcdb] text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 focus:border-[#f05a28]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm bg-white"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          onClick={fetchInquiries}
          className="px-3 py-2 bg-[#eef1f0] hover:bg-[#d5dcdb] rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
        {newCount > 0 && (
          <span className="bg-[#f05a28] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {newCount} new
          </span>
        )}
        <span className="text-sm text-[#51626a] ml-auto">
          {total} total {total === 1 ? "inquiry" : "inquiries"}
        </span>
      </div>

      {/* Table */}
      <div className="border border-[#d5dcdb] rounded-xl overflow-hidden bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#51626a]">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
          </div>
        ) : inquiries.length === 0 ? (
          <div className="py-16 text-center text-[#51626a]">
            <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-40" />
            No inquiries found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#eef1f0] text-[#0b2f3a] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Name / Company</th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">Service</th>
                <th className="text-left px-4 py-3">Received</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr
                  key={inq.id}
                  className="border-t border-[#d5dcdb]/60 hover:bg-[#eef1f0]/50"
                >
                  <td className="px-4 py-3">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        handleUpdate(inq.id, {
                          status: e.target.value as InquiryStatus,
                        })
                      }
                      className={`text-xs font-bold rounded-full border px-2 py-1 cursor-pointer ${
                        STATUS_STYLES[inq.status]
                      }`}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[#0b2f3a]">
                      {inq.name}
                    </div>
                    {inq.company && (
                      <div className="text-xs text-[#51626a] flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {inq.company}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`mailto:${inq.email}`}
                      className="flex items-center gap-1 text-[#f05a28] hover:underline text-xs"
                    >
                      <Mail className="w-3 h-3" /> {inq.email}
                    </a>
                    {inq.phone && (
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex items-center gap-1 text-[#51626a] text-xs mt-0.5"
                      >
                        <Phone className="w-3 h-3" /> {inq.phone}
                      </a>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#51626a]">
                    {SERVICE_LABELS[inq.service || ""] || inq.service || "—"}
                  </td>
                  <td className="px-4 py-3 text-xs text-[#51626a] whitespace-nowrap">
                    {formattedDate(inq.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setSelected(inq)}
                      className="text-xs font-semibold text-[#f05a28] hover:text-[#c2410c] mr-3"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && inquiries.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#51626a]">
            Page {page} of {pages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 border border-[#d5dcdb] rounded-lg text-sm disabled:opacity-40 flex items-center gap-1 bg-white hover:bg-[#eef1f0] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="px-3 py-1.5 border border-[#d5dcdb] rounded-lg text-sm disabled:opacity-40 flex items-center gap-1 bg-white hover:bg-[#eef1f0] transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-[#0b2f3a]/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#d5dcdb]">
              <h2 className="font-bold text-[#0b2f3a]">Inquiry details</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-[#51626a] hover:text-[#0b2f3a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 text-sm">
              <div>
                <div className="text-xs text-[#51626a] uppercase font-semibold">
                  From
                </div>
                <div className="font-bold text-[#0b2f3a]">
                  {selected.name}{" "}
                  {selected.company && (
                    <span className="text-[#51626a] font-normal">
                      · {selected.company}
                    </span>
                  )}
                </div>
                <div className="text-xs">
                  <a
                    href={`mailto:${selected.email}`}
                    className="text-[#f05a28] hover:underline"
                  >
                    {selected.email}
                  </a>
                  {selected.phone && <> · {selected.phone}</>}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#51626a] uppercase font-semibold">
                  Service
                </div>
                <div>
                  {SERVICE_LABELS[selected.service || ""] ||
                    selected.service ||
                    "—"}
                </div>
              </div>

              <div>
                <div className="text-xs text-[#51626a] uppercase font-semibold">
                  Message
                </div>
                <div className="bg-[#eef1f0] rounded-lg p-3 text-[#0b2f3a] whitespace-pre-wrap">
                  {selected.message || "—"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-[#51626a] uppercase font-semibold mb-1">
                    Status
                  </div>
                  <select
                    value={selected.status}
                    onChange={(e) => {
                      const status = e.target.value as InquiryStatus;
                      setSelected({ ...selected, status });
                      handleUpdate(selected.id, { status });
                    }}
                    className="w-full border border-[#d5dcdb] rounded-lg px-2 py-1.5 text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div className="text-xs text-[#51626a] uppercase font-semibold mb-1">
                    Received
                  </div>
                  <div className="text-sm py-1.5">
                    {formattedDate(selected.createdAt)}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs text-[#51626a] uppercase font-semibold mb-1">
                  Internal notes
                </div>
                <textarea
                  rows={3}
                  value={selected.notes || ""}
                  onChange={(e) =>
                    setSelected({ ...selected, notes: e.target.value })
                  }
                  onBlur={() =>
                    handleUpdate(selected.id, { notes: selected.notes || "" })
                  }
                  placeholder="Add follow-up notes…"
                  className="w-full border border-[#d5dcdb] rounded-lg px-2 py-1.5 text-sm"
                />
              </div>
            </div>

            <div className="px-5 py-3 border-t border-[#d5dcdb] flex justify-end gap-2">
              <a
                href={`mailto:${selected.email}?subject=Re: Your shipment inquiry`}
                className="px-3 py-2 bg-[#f05a28] hover:bg-[#c2410c] text-white rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Mail className="w-4 h-4" /> Reply by email
              </a>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 bg-[#eef1f0] hover:bg-[#d5dcdb] rounded-lg text-sm font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
