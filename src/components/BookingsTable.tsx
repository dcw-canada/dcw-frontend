"use client";

import { useState, useEffect } from "react";
import {
  Search,
  RefreshCw,
  Trash2,
  Loader2,
  X,
  Eye,
  Plane,
  MapPin,
  Package,
  Calendar,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api";

interface Booking {
  id: string;
  awbNo: string;
  shipper: any;
  receiver: any;
  boxes: any[];
  rateDetails: any;
  totalAmount: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const isBookingStatus = (status: string): status is Booking["status"] =>
  status === "PENDING" || status === "CONFIRMED" || status === "CANCELLED";

export default function BookingsTable() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Booking | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this booking permanently?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings((prev) =>
        prev.filter((b) => b.id !== id && (b as any)._id !== id),
      );
      if (selected?.id === id || (selected as any)?._id === id)
        setSelected(null);
      toast.success("Booking deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete booking.");
    }
  };

  const handleStatusChange = async (id: string, status: Booking["status"]) => {
    try {
      const { data } = await api.patch(`/bookings/${id}`, { status });
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id || (b as any)._id === id ? { ...b, status } : b,
        ),
      );
      if (selected?.id === id || (selected as any)?._id === id) {
        setSelected({ ...selected!, status });
      }
      toast.success(`Booking marked as ${status}.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status.");
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.awbNo.toLowerCase().includes(search.toLowerCase()) ||
      b.shipper?.shipperName?.toLowerCase().includes(search.toLowerCase()) ||
      b.receiver?.receiverName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? b.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

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
            placeholder="Search AWB, Shipper, Receiver..."
            className="pl-8 pr-3 py-2 rounded-lg border border-[#d5dcdb] text-sm w-72 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 focus:border-[#f05a28]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm bg-white"
        >
          <option value="">All statuses</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
        <button
          onClick={fetchBookings}
          className="px-3 py-2 bg-[#eef1f0] hover:bg-[#d5dcdb] rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
        <span className="text-sm text-[#51626a] ml-auto">
          {filteredBookings.length} total bookings
        </span>
      </div>

      {/* Table */}
      <div className="border border-[#d5dcdb] rounded-xl overflow-hidden bg-white">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-[#51626a]">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading…
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="py-16 text-center text-[#51626a]">
            <Package className="w-10 h-10 mx-auto mb-2 opacity-40" />
            No bookings found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#eef1f0] text-[#0b2f3a] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">AWB / Date</th>
                <th className="text-left px-4 py-3">Shipper (India)</th>
                <th className="text-left px-4 py-3">Receiver (Canada)</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => {
                const bId = b.id || (b as any)._id;
                return (
                  <tr
                    key={bId}
                    className="border-t border-[#d5dcdb]/60 hover:bg-[#eef1f0]/50"
                  >
                    <td className="px-4 py-3">
                      <div className="font-mono font-bold text-[#f05a28]">
                        {b.awbNo}
                      </div>
                      <div className="text-xs text-[#51626a] mt-0.5">
                        {formattedDate(b.createdAt)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#0b2f3a]">
                        {b.shipper?.shipperName}
                      </div>
                      <div className="text-xs text-[#51626a]">
                        {b.shipper?.shipperCity}, {b.shipper?.shipperState}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[#0b2f3a]">
                        {b.receiver?.receiverName}
                      </div>
                      <div className="text-xs text-[#51626a]">
                        {b.receiver?.receiverCity}, {b.receiver?.receiverState}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#0b2f3a]">
                      CA${b.totalAmount?.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => {
                          const status = e.target.value;
                          if (isBookingStatus(status)) {
                            handleStatusChange(bId, status);
                          } else {
                            toast.error("Invalid booking status.");
                          }
                        }}
                        className={`text-xs font-bold rounded-full border px-2 py-1 cursor-pointer ${
                          STATUS_STYLES[b.status]
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelected(b)}
                        className="text-xs font-semibold text-[#f05a28] hover:text-[#c2410c] mr-3"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(bId)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-[#0b2f3a]/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#d5dcdb] sticky top-0 bg-white z-10">
              <h2 className="font-bold text-[#0b2f3a]">
                Booking Details —{" "}
                <span className="text-[#f05a28] font-mono">
                  {selected.awbNo}
                </span>
              </h2>
              <button
                onClick={() => setSelected(null)}
                className="text-[#51626a] hover:text-[#0b2f3a]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 text-sm">
              {/* Route */}
              <div className="flex items-center justify-between bg-[#eef1f0] p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-xs text-[#51626a] font-bold uppercase mb-1">
                    Origin
                  </div>
                  <div className="font-bold text-[#0b2f3a]">
                    {selected.shipper?.shipperCity}
                  </div>
                  <div className="text-xs text-[#51626a]">
                    {selected.shipper?.shipperState}, India
                  </div>
                </div>
                <Plane className="w-6 h-6 text-[#f05a28]" />
                <div className="text-center">
                  <div className="text-xs text-[#51626a] font-bold uppercase mb-1">
                    Destination
                  </div>
                  <div className="font-bold text-[#0b2f3a]">
                    {selected.receiver?.receiverCity}
                  </div>
                  <div className="text-xs text-[#51626a]">
                    {selected.receiver?.receiverState}, Canada
                  </div>
                </div>
              </div>

              {/* Shipper & Receiver Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#eef1f0] p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-[#51626a] uppercase mb-1">
                    Shipper
                  </p>
                  <p className="font-bold text-[#0b2f3a]">
                    {selected.shipper?.shipperName}
                  </p>
                  <p className="text-xs text-[#51626a] mt-1">
                    {selected.shipper?.shipperAddress}
                  </p>
                  <p className="text-xs text-[#51626a]">
                    {selected.shipper?.shipperPhone}
                  </p>
                </div>
                <div className="bg-[#eef1f0] p-4 rounded-xl">
                  <p className="text-[10px] font-bold text-[#51626a] uppercase mb-1">
                    Receiver
                  </p>
                  <p className="font-bold text-[#0b2f3a]">
                    {selected.receiver?.receiverName}
                  </p>
                  <p className="text-xs text-[#51626a] mt-1">
                    {selected.receiver?.receiverAddress}
                  </p>
                  <p className="text-xs text-[#51626a]">
                    {selected.receiver?.receiverPhone}
                  </p>
                </div>
              </div>

              {/* Boxes */}
              <div>
                <p className="text-[10px] font-bold text-[#51626a] uppercase mb-2">
                  Packages ({selected.boxes?.length})
                </p>
                <div className="space-y-2">
                  {selected.boxes?.map((b: any, i: number) => (
                    <div
                      key={i}
                      className="flex justify-between text-xs text-[#51626a] bg-[#f8f9fa] px-3 py-2 rounded-lg border border-[#d5dcdb]"
                    >
                      <span className="font-semibold text-[#0b2f3a]">
                        Box #{i + 1}
                      </span>
                      <span>{b.weightKg} KG</span>
                      <span>
                        {b.lengthCm}x{b.widthCm}x{b.heightCm} cm
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rate & Total */}
              <div className="bg-[#0b2f3a] p-5 rounded-xl text-white">
                <div className="flex justify-between text-xs mb-2 text-white/70">
                  <span>Zone</span>
                  <span>{selected.rateDetails?.zone}</span>
                </div>
                <div className="flex justify-between text-xs mb-2 text-white/70">
                  <span>Chargeable Weight</span>
                  <span>{selected.rateDetails?.weight} KG</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-white/20 mt-3">
                  <span>Total Amount</span>
                  <span className="text-[#ffd100]">
                    CA${selected.totalAmount?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#d5dcdb] flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-[#eef1f0] rounded-lg text-sm font-semibold hover:bg-[#d5dcdb]"
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
