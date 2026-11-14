"use client";

import { useState, FormEvent } from "react";
import {
  ArrowUpRight,
  Loader2,
  PackageCheck,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Weight,
  Info,
} from "lucide-react";
import api from "@/lib/api";

const INDIAN_STATES = [
  { value: "PB", label: "Punjab" },
  { value: "HR", label: "Haryana" },
  { value: "RJ", label: "Rajasthan" },
  { value: "GJ", label: "Gujarat" },
  { value: "BOM", label: "Maharashtra (Mumbai)" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "DL", label: "Delhi" },
  { value: "KA", label: "Karnataka" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TS", label: "Telangana" },
  { value: "WB", label: "West Bengal" },
  { value: "KL", label: "Kerala" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "OTHER", label: "Other (Rest of India)" },
];

export default function GetQuotePage() {
  const [weight, setWeight] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!weight || Number(weight) <= 0)
      return setError("Please enter a valid weight.");
    if (!state) return setError("Please select the origin state.");

    setLoading(true);
    try {
      const { data } = await api.post("/rates/calculate", {
        weight: Number(weight),
        state,
      });
      if (data.success) setResult(data.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to calculate rate.");
    } finally {
      setLoading(false);
    }
  };

  const formatCAD = (amount: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: "CAD",
    }).format(amount);

  return (
    <div className="min-h-screen bg-[#eef1f0] text-[#0b2f3a] font-[Archivo] flex flex-col antialiased">
      <section className="relative bg-[#0b2f3a] overflow-hidden min-h-[200px] flex items-center py-12 px-6">
        <div className="max-w-7xl w-full mx-auto flex flex-col relative z-10 gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
            <a href="/" className="hover:text-white transition-colors duration-200">
              Home
            </a>
            <span className="text-white/30">/</span>
            <span className="text-white">Get a Quote</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-black text-white leading-tight">
            India to Canada Shipping Rates
          </h1>
        </div>
      </section>

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-white rounded-[2rem] p-8 shadow-sm border border-[#d5dcdb] flex flex-col">
            <div className="mb-6">
              <div className="border border-[#f05a28]/50 text-[#f05a28] bg-[#f05a28]/10 rounded-full px-4 py-1 text-[11px] font-black w-fit mb-4">
                Instant Rate Estimator
              </div>
              <h2 className="text-3xl font-black text-[#0b2f3a]">
                Calculate your shipment
              </h2>
            </div>

            <form onSubmit={handleCalculate} className="flex flex-col gap-5">
              <div>
                <label className="text-[11px] font-bold text-[#51626a] uppercase ml-1 mb-1 block">
                  Origin State (India)
                </label>
                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]"
                  />
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-white text-[#0b2f3a] text-sm font-medium rounded-xl pl-10 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 focus:border-[#f05a28] appearance-none border border-[#d5dcdb] hover:border-[#b0bcba] cursor-pointer transition-all duration-200"
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#51626a] pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#51626a] uppercase ml-1 mb-1 block">
                  Shipment Weight (KG)
                </label>
                <div className="relative">
                  <Weight
                    size={16}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]"
                  />
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g. 5.5"
                    className="w-full bg-white text-[#0b2f3a] text-sm font-medium rounded-xl pl-10 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-[#f05a28]/20 focus:border-[#f05a28] border border-[#d5dcdb] hover:border-[#b0bcba] transition-all duration-200"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group bg-[#f05a28] hover:bg-[#c2410c] disabled:opacity-60 text-white font-bold text-sm py-4 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />{" "}
                    Calculating...
                  </>
                ) : (
                  <>
                    Calculate Rate <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            {!result && !loading && (
              <div className="bg-white rounded-[2rem] p-14 flex flex-col items-center justify-center text-center gap-4 flex-1 shadow-sm border border-[#d5dcdb]">
                <PackageCheck size={56} className="text-[#d5dcdb]" />
                <div>
                  <p className="text-[#0b2f3a] font-bold text-lg">
                    Ready to calculate
                  </p>
                  <p className="text-[#51626a] text-sm mt-1 max-w-sm">
                    Select your state and enter the weight to see instant bulk
                    shipping rates to Canada.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="bg-white rounded-[2rem] p-14 flex flex-col items-center justify-center gap-4 flex-1 shadow-sm border border-[#d5dcdb]">
                <Loader2 size={44} className="text-[#f05a28] animate-spin" />
                <p className="text-[#51626a] text-sm font-medium">
                  Fetching live rates from database...
                </p>
              </div>
            )}

            {result && (
              <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-white rounded-[2rem] border-2 border-[#f05a28] p-8 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#f05a28]/10 rounded-bl-full -z-10 opacity-50" />
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 size={20} className="text-[#f05a28]" />
                    <h3 className="font-black text-[#0b2f3a] text-lg">
                      Quote Calculated Successfully
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#eef1f0] p-4 rounded-xl transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-[10px] text-[#51626a] uppercase font-bold mb-1">
                        Origin Zone
                      </p>
                      <p className="font-bold text-[#0b2f3a]">{result.zone}</p>
                    </div>
                    <div className="bg-[#eef1f0] p-4 rounded-xl transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-[10px] text-[#51626a] uppercase font-bold mb-1">
                        Weight Slab
                      </p>
                      <p className="font-bold text-[#0b2f3a]">
                        {result.slabLabel}
                      </p>
                    </div>
                    <div className="bg-[#eef1f0] p-4 rounded-xl transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-[10px] text-[#51626a] uppercase font-bold mb-1">
                        Rate / KG
                      </p>
                      <p className="font-bold text-[#0b2f3a]">
                        {formatCAD(result.pricePerKg)}
                      </p>
                    </div>
                    <div className="bg-[#eef1f0] p-4 rounded-xl transition-transform duration-200 hover:-translate-y-0.5">
                      <p className="text-[10px] text-[#51626a] uppercase font-bold mb-1">
                        Transit Time
                      </p>
                      <p className="font-bold text-[#0b2f3a] text-sm">
                        {result.transitTime.split(" ").slice(0, 3).join(" ")}...
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#0b2f3a] p-6 rounded-2xl">
                    <div>
                      <p className="text-white/60 text-xs font-semibold mb-1 uppercase tracking-wider">
                        Total Estimated Cost
                      </p>
                      <p className="text-3xl font-black text-white">
                        {formatCAD(result.totalPrice)}
                      </p>
                      <p className="text-white/50 text-xs mt-1">
                        For {result.weight} KG shipping to Canada
                      </p>
                    </div>
                    <a
                      href="/book-shipment"
                      className="group shrink-0 bg-[#f05a28] hover:bg-[#c2410c] text-white font-black text-sm py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 shadow-md hover:shadow-orange-500/25 w-full md:w-auto justify-center"
                    >
                      Book Shipment <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
