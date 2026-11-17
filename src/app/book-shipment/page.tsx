"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  User,
  MapPin,
  Package,
  FileText,
  Loader2,
  Plus,
  Trash2,
  Download,
} from "lucide-react";
import api from "@/lib/api";
import { jsPDF } from "jspdf";

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

const CANADIAN_PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

export default function BookShipmentPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState<any>(null);

  const [shipper, setShipper] = useState({
    shipperName: "",
    shipperPhone: "",
    shipperEmail: "",
    shipperAddress: "",
    shipperCity: "",
    shipperState: "",
    shipperPincode: "",
  });
  const [receiver, setReceiver] = useState({
    receiverName: "",
    receiverPhone: "",
    receiverEmail: "",
    receiverAddress: "",
    receiverCity: "",
    receiverState: "",
    receiverZipcode: "",
    receiverCountry: "Canada",
  });
  const [boxes, setBoxes] = useState([
    {
      id: 1,
      weightKg: 1,
      lengthCm: 10,
      widthCm: 10,
      heightCm: 10,
      productDescription: "",
      hsnCode: "",
    },
  ]);
  const [contentDescription, setContentDescription] =
    useState("Personal Effects");
  const [rateResult, setRateResult] = useState<any>(null);

  const addBox = () =>
    setBoxes([
      ...boxes,
      {
        id: Date.now(),
        weightKg: 1,
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        productDescription: "",
        hsnCode: "",
      },
    ]);
  const removeBox = (id: number) => {
    if (boxes.length > 1) setBoxes(boxes.filter((b) => b.id !== id));
  };
  const updateBox = (id: number, field: string, value: any) =>
    setBoxes(boxes.map((b) => (b.id === id ? { ...b, [field]: value } : b)));

  const totalWeight = boxes.reduce(
    (sum, b) => sum + Number(b.weightKg || 0),
    0,
  );
  const totalVolWt = boxes.reduce(
    (sum, b) =>
      sum +
      (Number(b.lengthCm || 0) *
        Number(b.widthCm || 0) *
        Number(b.heightCm || 0)) /
        5000,
    0,
  );
  const chargeableWeight = Math.ceil(Math.max(totalWeight, totalVolWt));

  const handleCalculateRate = async () => {
    if (!shipper.shipperState)
      return setError("Please select the pickup state in India.");
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/rates/calculate", {
        weight: chargeableWeight,
        state: shipper.shipperState,
      });
      if (data.success) {
        setRateResult(data.data);
        setStep(4);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to calculate rate.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmBooking = async () => {
    setError("");
    setLoading(true);
    try {
      const { data } = await api.post("/bookings", {
        shipper,
        receiver,
        boxes,
        rateDetails: rateResult,
        totalAmount: rateResult.totalPrice,
      });
      if (data.success) {
        setBookingSuccess(data.booking);
        setStep(5);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to confirm booking.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const pdf = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    let cursorY = 0;

    // ---- Brand palette ----
    const NAVY: [number, number, number] = [11, 47, 58]; // #0b2f3a
    const ORANGE: [number, number, number] = [240, 90, 40]; // #f05a28
    const GREEN: [number, number, number] = [31, 138, 91]; // #1f8a5b
    const GOLD: [number, number, number] = [255, 209, 0]; // #ffd100
    const GRAY: [number, number, number] = [81, 98, 106]; // #51626a
    const LIGHT: [number, number, number] = [238, 241, 240]; // #eef1f0
    const BORDER: [number, number, number] = [213, 220, 219]; // #d5dcdb
    const WHITE: [number, number, number] = [255, 255, 255];

    // ---- Helpers ----
    const setFill = (c: [number, number, number]) =>
      pdf.setFillColor(c[0], c[1], c[2]);
    const setDraw = (c: [number, number, number]) =>
      pdf.setDrawColor(c[0], c[1], c[2]);
    const setTxt = (c: [number, number, number]) =>
      pdf.setTextColor(c[0], c[1], c[2]);

    const drawHeader = () => {
      // Navy band
      setFill(NAVY);
      pdf.rect(0, 0, pageWidth, 38, "F");
      // Orange accent stripe
      setFill(ORANGE);
      pdf.rect(0, 38, pageWidth, 2, "F");

      // Brand mark
      setFill(ORANGE);
      pdf.roundedRect(margin, 10, 12, 12, 2, 2, "F");
      setTxt(WHITE);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text("S", margin + 4, 18);

      // Title
      setTxt(WHITE);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(18);
      pdf.text("Shipment Booking Summary", margin + 18, 18);

      // Subtitle
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      setTxt([170, 190, 195]);
      pdf.text("India  →  Canada  |  International Courier", margin + 18, 24);

      // AWB pill (right side)
      const awbText = String(bookingSuccess?.awbNo || "N/A");
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      const awbLabelW = pdf.getTextWidth("AWB NO.");
      pdf.setFontSize(11);
      pdf.setFont("helvetica", "bold");
      const awbValW = pdf.getTextWidth(awbText);
      const pillW = Math.max(awbLabelW, awbValW) + 12;
      const pillX = pageWidth - margin - pillW;
      setFill(GOLD);
      pdf.roundedRect(pillX, 10, pillW, 12, 2, 2, "F");
      setTxt(NAVY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(6.5);
      pdf.text("AWB NO.", pillX + pillW / 2, 14.5, { align: "center" });
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10);
      pdf.text(awbText, pillX + pillW / 2, 19.5, { align: "center" });

      cursorY = 48;
    };

    const ensureSpace = (h: number) => {
      if (cursorY + h > pageHeight - 20) {
        drawFooter();
        pdf.addPage();
        drawHeader();
      }
    };

    const drawFooter = () => {
      const y = pageHeight - 12;
      setDraw(BORDER);
      pdf.setLineWidth(0.3);
      pdf.line(margin, y - 4, pageWidth - margin, y - 4);
      setTxt(GRAY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.text("Thank you for shipping with us.", margin, y);
      pdf.text(
        `Generated ${new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}`,
        pageWidth - margin,
        y,
        { align: "right" },
      );
    };

    const sectionTitle = (
      title: string,
      accent: [number, number, number] = ORANGE,
    ) => {
      ensureSpace(14);
      // accent bar
      setFill(accent);
      pdf.roundedRect(margin, cursorY - 1, 2.2, 8, 1, 1, "F");
      setTxt(NAVY);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.text(title.toUpperCase(), margin + 6, cursorY + 5);
      setDraw(BORDER);
      pdf.setLineWidth(0.2);
      pdf.line(margin + 6, cursorY + 8, pageWidth - margin, cursorY + 8);
      cursorY += 13;
    };

    const infoCard = (
      x: number,
      y: number,
      w: number,
      h: number,
      title: string,
      lines: string[],
      accent: [number, number, number],
    ) => {
      // card background
      setFill(LIGHT);
      pdf.roundedRect(x, y, w, h, 2.5, 2.5, "F");
      // accent left edge
      setFill(accent);
      pdf.roundedRect(x, y, 2.2, h, 1, 1, "F");
      // title
      setTxt(accent);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text(title.toUpperCase(), x + 6, y + 6);
      // lines
      setTxt(NAVY);
      let ly = y + 12;
      lines.forEach((line, i) => {
        pdf.setFont("helvetica", i === 0 ? "bold" : "normal");
        pdf.setFontSize(i === 0 ? 9.5 : 8.5);
        if (i > 0) setTxt(GRAY);
        const wrapped = pdf.splitTextToSize(line, w - 12);
        wrapped.forEach((wl: string) => {
          pdf.text(wl, x + 6, ly);
          ly += i === 0 ? 5 : 4;
        });
        if (i === 0) ly += 0.5;
      });
    };

    // ================= BUILD =================
    drawHeader();

    // ---- Address cards side by side ----
    const cardGap = 6;
    const cardW = (contentWidth - cardGap) / 2;
    const shipperLines = [
      shipper.shipperName || "—",
      shipper.shipperPhone || "",
      [
        shipper.shipperAddress,
        shipper.shipperCity,
        INDIAN_STATES.find((s) => s.value === shipper.shipperState)?.label ||
          shipper.shipperState,
        shipper.shipperPincode,
      ]
        .filter(Boolean)
        .join(", ") || "—",
    ].filter(Boolean);

    const receiverLines = [
      receiver.receiverName || "—",
      receiver.receiverPhone || "",
      [
        receiver.receiverAddress,
        receiver.receiverCity,
        receiver.receiverState,
        receiver.receiverZipcode,
        receiver.receiverCountry,
      ]
        .filter(Boolean)
        .join(", ") || "—",
    ].filter(Boolean);

    const cardH = 34;
    infoCard(
      margin,
      cursorY,
      cardW,
      cardH,
      "Pickup — India",
      shipperLines,
      ORANGE,
    );
    infoCard(
      margin + cardW + cardGap,
      cursorY,
      cardW,
      cardH,
      "Delivery — Canada",
      receiverLines,
      NAVY,
    );
    cursorY += cardH + 10;

    // ---- Packages ----
    sectionTitle("Packages");
    boxes.forEach((box, index) => {
      ensureSpace(24);
      const rowH = 20;
      // row bg
      setFill(LIGHT);
      pdf.roundedRect(margin, cursorY, contentWidth, rowH, 2, 2, "F");
      // box number circle
      setFill(NAVY);
      pdf.circle(margin + 8, cursorY + rowH / 2, 4, "F");
      setTxt(WHITE);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(8);
      pdf.text(String(index + 1), margin + 8, cursorY + rowH / 2 + 1.2, {
        align: "center",
      });

      // data columns
      const col1 = margin + 16;
      const col2 = margin + 70;
      const col3 = margin + 115;

      // Weight
      setTxt(GRAY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text("WEIGHT", col1, cursorY + 7);
      setTxt(NAVY);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.text(`${box.weightKg} kg`, col1, cursorY + 13);

      // Dimensions
      setTxt(GRAY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text("DIMENSIONS (L×W×H)", col2, cursorY + 7);
      setTxt(NAVY);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9.5);
      pdf.text(
        `${box.lengthCm} × ${box.widthCm} × ${box.heightCm} cm`,
        col2,
        cursorY + 13,
      );

      // Description
      setTxt(GRAY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text("PRODUCT DESCRIPTION", col3, cursorY + 7);
      setTxt(NAVY);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      const desc = box.productDescription || "—";
      const descLines = pdf.splitTextToSize(
        desc,
        pageWidth - margin - col3 - 2,
      );
      pdf.text(descLines[0] || "—", col3, cursorY + 13);

      // HSN small under description if present
      if (box.hsnCode) {
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(7.5);
        setTxt(GRAY);
        pdf.text(`HSN: ${box.hsnCode}`, col3, cursorY + 17.5);
      }

      cursorY += rowH + 4;
    });

    // ---- Customs ----
    cursorY += 2;
    sectionTitle("Customs Declaration", GREEN);
    ensureSpace(12);
    setFill(LIGHT);
    pdf.roundedRect(margin, cursorY, contentWidth, 12, 2, 2, "F");
    setTxt(GRAY);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.text("CONTENT DESCRIPTION", margin + 5, cursorY + 4.5);
    setTxt(NAVY);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9.5);
    pdf.text(contentDescription || "—", margin + 5, cursorY + 9.5);
    cursorY += 18;

    // ---- Rate breakdown (dark card) ----
    if (rateResult) {
      sectionTitle("Rate Breakdown");
      ensureSpace(52);

      const rateH = 46;
      setFill(NAVY);
      pdf.roundedRect(margin, cursorY, contentWidth, rateH, 3, 3, "F");

      // left: metrics
      const lx = margin + 8;
      const rows = [
        ["Chargeable Weight", `${chargeableWeight} KG`],
        ["Zone", String(rateResult.zone)],
        ["Rate per KG", `CA$ ${rateResult.pricePerKg}`],
      ];
      setTxt([170, 190, 195]);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text("SHIPMENT METRICS", lx, cursorY + 7);
      let ry = cursorY + 14;
      rows.forEach(([label, val]) => {
        setTxt([190, 205, 210]);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8.5);
        pdf.text(label, lx, ry);
        setTxt(WHITE);
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8.5);
        pdf.text(val, lx + 55, ry);
        ry += 6;
      });

      // divider
      setDraw([40, 80, 90]);
      pdf.setLineWidth(0.3);
      pdf.line(
        margin + contentWidth / 2,
        cursorY + 8,
        margin + contentWidth / 2,
        cursorY + rateH - 8,
      );

      // right: total
      const rx = margin + contentWidth / 2 + 8;
      setTxt([170, 190, 195]);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text("TOTAL AMOUNT", rx, cursorY + 7);
      setTxt(GOLD);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(22);
      pdf.text(
        `CA$ ${Number(rateResult.totalPrice).toFixed(2)}`,
        rx,
        cursorY + 20,
      );
      setTxt([170, 190, 195]);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      pdf.text("All applicable charges included", rx, cursorY + 27);

      // small gold badge
      setFill(GREEN);
      pdf.roundedRect(rx, cursorY + 31, 30, 7, 1.5, 1.5, "F");
      setTxt(WHITE);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7);
      pdf.text("CONFIRMED", rx + 15, cursorY + 35.5, { align: "center" });

      cursorY += rateH + 8;
    }

    // ---- Closing note ----
    ensureSpace(16);
    setFill(LIGHT);
    pdf.roundedRect(margin, cursorY, contentWidth, 14, 2, 2, "F");
    setFill(GREEN);
    pdf.circle(margin + 7, cursorY + 7, 2, "F");
    setTxt(NAVY);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    pdf.text("What's next?", margin + 12, cursorY + 5.5);
    setTxt(GRAY);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(8);
    pdf.text(
      "Our team will contact you shortly to schedule pickup. Keep this document for your records.",
      margin + 12,
      cursorY + 10.5,
    );
    cursorY += 18;

    drawFooter();

    const awbNo = String(bookingSuccess?.awbNo || "details").replace(
      /[^a-z0-9_-]/gi,
      "-",
    );
    pdf.save(`shipment-booking-${awbNo}.pdf`);
  };

  const inp =
    "w-full bg-[#f8f9fa] text-[#0b2f3a] text-sm font-medium rounded-xl px-4 py-3.5 focus:outline-none border border-[#d5dcdb] placeholder:text-[#51626a] focus:border-[#f05a28] focus:ring-2 focus:ring-[#f05a28]/10 hover:border-[#b0bcba] transition-all duration-200";
  const lbl =
    "block text-xs font-bold text-[#51626a] uppercase tracking-wider mb-2";

  return (
    <div className="min-h-screen bg-[#eef1f0] text-[#0b2f3a] font-[Archivo] flex flex-col antialiased">
      <section className="relative bg-[#0b2f3a] overflow-hidden py-10 px-6">
        <div className="max-w-7xl w-full mx-auto flex flex-col relative z-10 gap-3">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-white/50">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="text-white/30">/</span>
            <span className="text-white">Book Shipment</span>
          </div>
          <h1 className="text-[36px] md:text-[44px] font-black text-white leading-tight">
            Book a Shipment (India → Canada)
          </h1>
        </div>
      </section>

      <main className="flex-grow max-w-5xl w-full mx-auto px-6 py-12">
        {step <= 4 && (
          <div className="bg-white rounded-2xl p-6 mb-8 border border-[#d5dcdb] shadow-sm overflow-x-auto">
            <div className="flex items-center justify-between min-w-[500px]">
              {[
                { num: 1, label: "Pickup (India)", icon: MapPin },
                { num: 2, label: "Delivery (Canada)", icon: User },
                { num: 3, label: "Packages", icon: Package },
                { num: 4, label: "Review", icon: FileText },
              ].map((s, idx) => {
                const isDone = step > s.num;
                const isActive = step === s.num;
                return (
                  <div
                    key={s.num}
                    className="flex items-center flex-1 last:flex-none"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#f05a28] text-white shadow-md ring-4 ring-[#f05a28]/20"
                            : isDone
                              ? "bg-[#1f8a5b] text-white"
                              : "bg-[#eef1f0] text-[#51626a]"
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                      </div>
                      <div>
                        <div
                          className={`text-[10px] uppercase font-extrabold ${isActive ? "text-[#f05a28]" : "text-[#51626a]"}`}
                        >
                          Step {s.num}
                        </div>
                        <div
                          className={`text-xs font-bold ${isActive ? "text-[#0b2f3a]" : "text-[#51626a]"}`}
                        >
                          {s.label}
                        </div>
                      </div>
                    </div>
                    {idx < 3 && (
                      <div
                        className={`h-0.5 flex-1 mx-4 rounded-full ${isDone ? "bg-[#1f8a5b]" : "bg-[#d5dcdb]"}`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-600 text-sm font-semibold shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0" /> {error}
          </div>
        )}

        {step === 1 && (
          <div className="bg-white rounded-3xl p-8 border border-[#d5dcdb] shadow-sm">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#d5dcdb]">
              <div className="w-10 h-10 rounded-xl bg-[#f05a28]/10 flex items-center justify-center text-[#f05a28]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0b2f3a]">
                  Pickup Details (India)
                </h2>
                <p className="text-xs text-[#51626a]">
                  Where should we pick up the shipment?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={lbl}>Contact Name *</label>
                <input
                  type="text"
                  value={shipper.shipperName}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperName: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>
              <div>
                <label className={lbl}>Phone *</label>
                <input
                  type="tel"
                  value={shipper.shipperPhone}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperPhone: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. +91 98765 43210"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl}>Address *</label>
                <input
                  type="text"
                  value={shipper.shipperAddress}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperAddress: e.target.value })
                  }
                  className={inp}
                  placeholder="House / Flat No., Street, Landmark..."
                />
              </div>
              <div>
                <label className={lbl}>City *</label>
                <input
                  type="text"
                  value={shipper.shipperCity}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperCity: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. Mumbai"
                />
              </div>
              <div>
                <label className={lbl}>State *</label>
                <select
                  value={shipper.shipperState}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperState: e.target.value })
                  }
                  className={inp}
                >
                  <option value="">Select State</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={lbl}>Pincode *</label>
                <input
                  type="text"
                  value={shipper.shipperPincode}
                  onChange={(e) =>
                    setShipper({ ...shipper, shipperPincode: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. 400001"
                />
              </div>
            </div>
            <div className="flex justify-end pt-6 mt-6 border-t border-[#d5dcdb]">
              <button
                onClick={() => {
                  if (
                    !shipper.shipperName ||
                    !shipper.shipperPhone ||
                    !shipper.shipperState ||
                    !shipper.shipperCity
                  ) {
                    setError("Please fill required pickup fields.");
                    return;
                  }
                  setError("");
                  setStep(2);
                }}
                className="group bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25 flex items-center gap-2"
              >
                Next: Delivery Details{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-3xl p-8 border border-[#d5dcdb] shadow-sm">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#d5dcdb]">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a] flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0b2f3a]">
                  Delivery Details (Canada)
                </h2>
                <p className="text-xs text-[#51626a]">
                  Who is receiving the shipment?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={lbl}>Contact Name *</label>
                <input
                  type="text"
                  value={receiver.receiverName}
                  onChange={(e) =>
                    setReceiver({ ...receiver, receiverName: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. John Doe"
                />
              </div>
              <div>
                <label className={lbl}>Phone *</label>
                <input
                  type="tel"
                  value={receiver.receiverPhone}
                  onChange={(e) =>
                    setReceiver({ ...receiver, receiverPhone: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. +1 416 555 0199"
                />
              </div>
              <div className="sm:col-span-2">
                <label className={lbl}>Address *</label>
                <input
                  type="text"
                  value={receiver.receiverAddress}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      receiverAddress: e.target.value,
                    })
                  }
                  className={inp}
                  placeholder="Street address, Apt, Suite..."
                />
              </div>
              <div>
                <label className={lbl}>City *</label>
                <input
                  type="text"
                  value={receiver.receiverCity}
                  onChange={(e) =>
                    setReceiver({ ...receiver, receiverCity: e.target.value })
                  }
                  className={inp}
                  placeholder="e.g. Toronto"
                />
              </div>
              <div>
                <label className={lbl}>Province *</label>
                <select
                  value={receiver.receiverState}
                  onChange={(e) =>
                    setReceiver({ ...receiver, receiverState: e.target.value })
                  }
                  className={inp}
                >
                  <option value="">Select Province</option>
                  {CANADIAN_PROVINCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={lbl}>Postal Code *</label>
                <input
                  type="text"
                  value={receiver.receiverZipcode}
                  onChange={(e) =>
                    setReceiver({
                      ...receiver,
                      receiverZipcode: e.target.value,
                    })
                  }
                  className={inp}
                  placeholder="e.g. M5V 2T6"
                />
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#d5dcdb]">
              <button
                onClick={() => setStep(1)}
                className="group bg-[#eef1f0] hover:bg-[#d5dcdb] text-[#0b2f3a] font-bold text-sm py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />{" "}
                Back
              </button>
              <button
                onClick={() => {
                  if (
                    !receiver.receiverName ||
                    !receiver.receiverPhone ||
                    !receiver.receiverCity ||
                    !receiver.receiverZipcode
                  ) {
                    setError("Please fill required delivery fields.");
                    return;
                  }
                  setError("");
                  setStep(3);
                }}
                className="group bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25 flex items-center gap-2"
              >
                Next: Packages{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white rounded-3xl p-8 border border-[#d5dcdb] shadow-sm">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#d5dcdb]">
              <div className="w-10 h-10 rounded-xl bg-[#ffd100]/20 flex items-center justify-center text-[#0b2f3a]">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0b2f3a]">
                  Package Details
                </h2>
                <p className="text-xs text-[#51626a]">
                  Enter box dimensions and weight to calculate rates.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              {boxes.map((box, idx) => (
                <div
                  key={box.id}
                  className="bg-[#eef1f0]/50 p-5 rounded-2xl border border-[#d5dcdb]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-[#0b2f3a] text-sm">
                      Box #{idx + 1}
                    </span>
                    {boxes.length > 1 && (
                      <button
                        onClick={() => removeBox(box.id)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-[#51626a] mb-1 block">
                        Weight (KG)
                      </label>
                      <input
                        type="number"
                        value={box.weightKg}
                        onChange={(e) =>
                          updateBox(box.id, "weightKg", e.target.value)
                        }
                        className={inp}
                        min="0.1"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#51626a] mb-1 block">
                        Length (CM)
                      </label>
                      <input
                        type="number"
                        value={box.lengthCm}
                        onChange={(e) =>
                          updateBox(box.id, "lengthCm", e.target.value)
                        }
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#51626a] mb-1 block">
                        Width (CM)
                      </label>
                      <input
                        type="number"
                        value={box.widthCm}
                        onChange={(e) =>
                          updateBox(box.id, "widthCm", e.target.value)
                        }
                        className={inp}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-[#51626a] mb-1 block">
                        Height (CM)
                      </label>
                      <input
                        type="number"
                        value={box.heightCm}
                        onChange={(e) =>
                          updateBox(box.id, "heightCm", e.target.value)
                        }
                        className={inp}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addBox}
              className="mt-4 text-xs font-bold text-[#f05a28] bg-[#f05a28]/10 hover:bg-[#f05a28]/20 px-4 py-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Add Another Box
            </button>
            <div className="mt-6">
              <label className={lbl}>Content Description (for customs)</label>
              <input
                type="text"
                value={contentDescription}
                onChange={(e) => setContentDescription(e.target.value)}
                className={inp}
                placeholder="e.g. Personal clothes, gifts..."
              />
            </div>
            <div className="flex justify-between items-center pt-6 mt-8 border-t border-[#d5dcdb]">
              <button
                onClick={() => setStep(2)}
                className="group bg-[#eef1f0] hover:bg-[#d5dcdb] text-[#0b2f3a] font-bold text-sm py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />{" "}
                Back
              </button>
              <button
                onClick={handleCalculateRate}
                disabled={loading || chargeableWeight <= 0}
                className="group bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-orange-500/25 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Calculating...
                  </>
                ) : (
                  <>
                    Calculate Rate{" "}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 4 && rateResult && (
          <div className="bg-white rounded-3xl p-8 border border-[#d5dcdb] shadow-sm">
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-[#d5dcdb]">
              <div className="w-10 h-10 rounded-xl bg-[#1f8a5b]/10 flex items-center justify-center text-[#1f8a5b]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#0b2f3a]">
                  Review & Confirm
                </h2>
                <p className="text-xs text-[#51626a]">
                  Check your details before confirming the booking.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#eef1f0] p-5 rounded-2xl">
                <h3 className="text-xs font-bold text-[#51626a] uppercase mb-2">
                  Pickup (India)
                </h3>
                <p className="font-bold text-[#0b2f3a]">
                  {shipper.shipperName}
                </p>
                <p className="text-sm text-[#51626a]">
                  {shipper.shipperAddress}, {shipper.shipperCity},{" "}
                  {shipper.shipperState} {shipper.shipperPincode}
                </p>
                <p className="text-sm text-[#51626a] mt-1">
                  {shipper.shipperPhone}
                </p>
              </div>
              <div className="bg-[#eef1f0] p-5 rounded-2xl">
                <h3 className="text-xs font-bold text-[#51626a] uppercase mb-2">
                  Delivery (Canada)
                </h3>
                <p className="font-bold text-[#0b2f3a]">
                  {receiver.receiverName}
                </p>
                <p className="text-sm text-[#51626a]">
                  {receiver.receiverAddress}, {receiver.receiverCity},{" "}
                  {receiver.receiverState} {receiver.receiverZipcode}
                </p>
                <p className="text-sm text-[#51626a] mt-1">
                  {receiver.receiverPhone}
                </p>
              </div>
            </div>
            <div className="bg-[#0b2f3a] rounded-2xl p-6 text-white mb-8">
              <h3 className="text-sm font-bold text-white/60 uppercase mb-4">
                Rate Breakdown
              </h3>
              <div className="flex justify-between text-sm mb-2">
                <span>Chargeable Weight</span>
                <span className="font-mono">{chargeableWeight} KG</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Zone</span>
                <span className="font-mono">{rateResult.zone}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Rate per KG</span>
                <span className="font-mono">CA${rateResult.pricePerKg}</span>
              </div>
              <div className="flex justify-between text-xl font-black pt-4 border-t border-white/20 mt-4 text-[#ffd100]">
                <span>Total Amount</span>
                <span>CA${rateResult.totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-6 border-t border-[#d5dcdb]">
              <button
                onClick={() => setStep(3)}
                className="group bg-[#eef1f0] hover:bg-[#d5dcdb] text-[#0b2f3a] font-bold text-sm py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />{" "}
                Back
              </button>
              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="group bg-[#1f8a5b] hover:bg-[#166b46] text-white font-bold text-sm py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md hover:shadow-green-600/25 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    Confirm Booking{" "}
                    <CheckCircle2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 5 && bookingSuccess && (
          <div className="bg-white rounded-3xl p-12 border border-[#d5dcdb] shadow-sm text-center">
            <div className="w-20 h-20 bg-[#1f8a5b]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#1f8a5b]" />
            </div>
            <h2 className="text-3xl font-black text-[#0b2f3a] mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-[#51626a] mb-6">
              Your shipment has been successfully created and is now pending
              pickup.
            </p>
            <div className="bg-[#eef1f0] inline-block px-8 py-4 rounded-2xl mb-8">
              <p className="text-xs font-bold text-[#51626a] uppercase mb-1">
                AWB Tracking Number
              </p>
              <p className="text-2xl font-black text-[#f05a28] tracking-wider">
                {bookingSuccess.awbNo}
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Link
                href="/"
                className="bg-[#0b2f3a] hover:bg-[#14434f] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md"
              >
                Back to Home
              </Link>
              <button
                onClick={handleDownloadPdf}
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-md inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
