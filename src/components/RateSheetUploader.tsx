"use client";

import { useState, useEffect } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../lib/api"; // Your exact axios instance

export default function RateSheetUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(
    null,
  );
  const [current, setCurrent] = useState<any>(null);

  const loadCurrent = async () => {
    try {
      // Hits: http://localhost:5000/api/rates
      const { data } = await api.get("/rates");
      if (data.success) {
        setCurrent(data.rateSheet);
      }
    } catch (err: any) {
      if (err.response?.status === 404) {
        setCurrent(null); // No data yet — perfectly normal
      } else {
        console.error("Failed to fetch current rate sheet", err);
      }
    }
  };

  useEffect(() => {
    loadCurrent();
  }, []);

  const handleSubmit = async () => {
    if (!file) return;
    setBusy(true);
    setResult(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      // Hits: http://localhost:5000/api/rates/upload
      const { data } = await api.post("/rates/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        setResult({
          ok: true,
          msg: `Replaced rate sheet — ${data.summary.zones} zones, ${data.summary.rates} rates imported.`,
        });
        toast.success("Rate sheet imported successfully!");
        setFile(null);
        await loadCurrent();
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg =
        err.response?.data?.error || err.message || "Upload failed";
      setResult({ ok: false, msg: errorMsg });
      toast.error(errorMsg);
    } finally {
      setBusy(false);
    }
  };

  const handleClear = async () => {
    if (!confirm("Delete the current rate sheet? This cannot be undone."))
      return;
    setBusy(true);
    try {
      await api.delete("/rates");
      setCurrent(null);
      setResult({ ok: true, msg: "Rate sheet cleared." });
      toast.success("Rate sheet cleared.");
    } catch (err: any) {
      console.error(err);
      setResult({ ok: false, msg: "Failed to clear data." });
      toast.error("Failed to clear data.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload card */}
      <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
        <h2 className="text-xl font-black text-[#0b2f3a] mb-1 flex items-center gap-2">
          <FileSpreadsheet size={20} className="text-[#f05a28]" />
          Upload Rate Sheet (.xlsx)
        </h2>
        <p className="text-xs text-[#51626a] mb-6">
          Uploading a new file <b>replaces all existing rate sheet data</b>. Old
          zones and rates are deleted and re-imported automatically.
        </p>

        <label className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-[#d5dcdb] rounded-xl cursor-pointer hover:border-[#f05a28] transition bg-[#eef1f0]/30">
          <UploadCloud size={20} className="text-[#51626a]" />
          <span className="text-sm text-[#51626a]">
            {file ? file.name : "Choose an Excel file…"}
          </span>
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </label>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleSubmit}
            disabled={!file || busy}
            className="bg-[#f05a28] hover:bg-[#c2410c] disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-bold px-5 py-2.5 rounded-xl transition shadow-md flex items-center gap-2"
          >
            {busy ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <UploadCloud size={16} />
            )}
            {busy ? "Importing…" : "Upload & Replace"}
          </button>

          {current && (
            <button
              onClick={handleClear}
              disabled={busy}
              className="text-red-600 hover:bg-red-50 border border-red-200 text-sm font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <Trash2 size={15} /> Clear Data
            </button>
          )}
        </div>

        {result && (
          <div
            className={`mt-4 flex items-start gap-2 text-sm px-4 py-3 rounded-xl border ${
              result.ok
                ? "bg-green-50 text-green-800 border-green-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {result.ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {result.msg}
          </div>
        )}
      </div>

      {/* Current data preview */}
      {current ? (
        <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Active Rate Sheet
              </h3>
              <p className="text-xs text-[#51626a]">
                Uploaded {new Date(current.uploadedAt).toLocaleString()} •{" "}
                {current.rates.length} rates across {current.zones.length} zones
              </p>
            </div>
            <span className="bg-[#1f8a5b]/10 text-[#1f8a5b] border border-[#1f8a5b]/20 text-xs font-bold px-3 py-1 rounded-full">
              Active
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {current.zones.map((z: any, i: number) => (
              <div key={i} className="p-3 bg-[#eef1f0] rounded-lg text-xs">
                <div className="font-bold text-[#0b2f3a]">{z.name}</div>
                <div className="text-[#51626a] mt-1">
                  {z.states.join(" · ")}
                </div>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#d5dcdb] max-h-[500px]">
            <table className="w-full text-sm">
              <thead className="bg-[#0b2f3a] text-white sticky top-0">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Weight Slab
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Zone
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {current.rates.map((r: any, i: number) => (
                  <tr
                    key={i}
                    className="border-t border-[#d5dcdb]/60 hover:bg-[#eef1f0]/50"
                  >
                    <td className="px-4 py-2 font-medium text-[#0b2f3a]">
                      {r.slabLabel}
                    </td>
                    <td className="px-4 py-2 text-[#51626a]">{r.zoneName}</td>
                    <td className="px-4 py-2 text-right font-mono text-[#f05a28] font-semibold">
                      ${r.pricePerKg}
                    </td>
                    <td className="px-4 py-2 text-right text-[#51626a]">
                      {r.unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-2xl border border-[#d5dcdb] shadow-sm text-center py-16">
          <FileSpreadsheet className="w-12 h-12 text-[#d5dcdb] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#0b2f3a]">
            No Rate Sheet Active
          </h3>
          <p className="text-sm text-[#51626a] max-w-sm mx-auto mt-1">
            Upload an Excel file above to populate the rate sheet. This will
            display the zones and bulk rates here.
          </p>
        </div>
      )}
    </div>
  );
}
