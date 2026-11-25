"use client";

import { useState, FormEvent, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Plane,
  Truck,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Send,
  Phone,
  Mail,
  ArrowRight,
  Package,
  FileText,
  Clock,
  Sparkles,
  Luggage,
  Store,
  Box,
  MessageSquare,
  Weight,
  Loader2,
  Check,
  XCircle,
  Layers,
  PhoneCall,
  Warehouse,
  Calculator,
  PackageCheck,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-toastify";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

// Indian States for Rate Estimator & Origin
const INDIAN_STATES = [
  { value: "PB", label: "Punjab (Amritsar, Jalandhar, Ludhiana, Chandigarh)" },
  { value: "DL", label: "Delhi NCR (New Delhi, Noida, Gurugram)" },
  { value: "HR", label: "Haryana (Ambala, Karnal, Panipat)" },
  { value: "GJ", label: "Gujarat (Ahmedabad, Surat, Vadodara, Rajkot)" },
  { value: "BOM", label: "Maharashtra (Mumbai, Pune, Nagpur)" },
  { value: "KA", label: "Karnataka (Bengaluru, Mysuru)" },
  { value: "TS", label: "Telangana (Hyderabad, Secunderabad)" },
  { value: "TN", label: "Tamil Nadu (Chennai, Coimbatore)" },
  { value: "RJ", label: "Rajasthan (Jaipur, Jodhpur, Udaipur)" },
  { value: "UP", label: "Uttar Pradesh (Lucknow, Kanpur, Agra)" },
  { value: "WB", label: "West Bengal (Kolkata)" },
  { value: "KL", label: "Kerala (Kochi, Trivandrum, Kozhikode)" },
  { value: "AP", label: "Andhra Pradesh (Visakhapatnam, Vijayawada)" },
  { value: "MP", label: "Madhya Pradesh (Indore, Bhopal)" },
  { value: "OTHER", label: "Other States & Union Territories across India" },
];

// Canadian Provinces
const PROVINCES = [
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

// Popular Indian Pickup Cities
const POPULAR_PICKUP_CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Punjab: Amritsar, Ludhiana, Jalandhar",
  "Chandigarh",
  "Ahmedabad",
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Kolkata",
  "Kochi",
];

// Popular Canadian Delivery Cities
const POPULAR_DELIVERY_CITIES = [
  "Toronto, Brampton and Mississauga",
  "Vancouver and Surrey",
  "Calgary",
  "Edmonton",
  "Winnipeg",
  "Montreal",
  "Ottawa",
  "Halifax",
  "Regina and Saskatoon",
];

// 11 Exact FAQs from dcw-website-india-canada.html
const I2C_FAQS = [
  {
    q: "Is DCW's India-to-Canada service available now?",
    a: "We're launching door-to-door shipping from India to Canada. Send an enquiry now and we'll contact you with a quote and booking details for your route.",
  },
  {
    q: "Where in India can you pick up from?",
    a: "Anywhere in India, subject to service availability. Add your city and PIN code to the enquiry form and we'll confirm the pickup.",
  },
  {
    q: "Where in Canada do you deliver?",
    a: "Anywhere in Canada. Shipments are delivered through our delivery partners, including UPS, and the recipient receives a UPS tracking number for the Canadian leg.",
  },
  {
    q: "How long does shipping from India to Canada take?",
    a: "It depends on the shipping method, the pickup location and the delivery address. We give you an estimated timeline with your quote. Timelines can't be guaranteed, because customs inspections can add time.",
  },
  {
    q: "How much does it cost to ship from India to Canada?",
    a: "Pricing depends on origin, destination, weight, size, shipment type and the services you need. We offer competitive rates and send a clear written quote before anything ships. Regular shippers can ask about volume-based pricing.",
  },
  {
    q: "Will duties and taxes be charged in Canada?",
    a: "They may be. The Canada Border Services Agency (CBSA) assesses duties and taxes on imported goods. Gifts worth CAD 60 or less, sent by a friend or relative abroad with a gift card or note, may be imported through the courier program without duty or taxes; other shipments may be charged. Duties and taxes are only included in your price if your quote says so.",
  },
  {
    q: "What can't I send from India to Canada?",
    a: "Weapons, cannabis, counterfeit goods and other prohibited items can't be sent. Food, plants, seeds, meat, dairy, medicines and some cosmetics are restricted and may need permits or be refused. Check the shipping requirements on this page and ask us about anything you're unsure of.",
  },
  {
    q: "Do you handle commercial shipments as well as personal parcels?",
    a: "Yes. We handle personal parcels and gifts as well as commercial goods and e-commerce orders. Commercial shipments need a commercial invoice, and some goods need permits or extra documents.",
  },
  {
    q: "Who clears my shipment through Canadian customs?",
    a: "Customs clearance is handled through our partner customs brokerage, and DCW coordinates it for you. If any goods are restricted, we tell you right away.",
  },
  {
    q: "Can I track my shipment?",
    a: "Yes. The Canadian delivery leg is tracked with a UPS tracking number.",
  },
  {
    q: "How do I book?",
    a: "Send the enquiry form on this page, message us on WhatsApp at (672) 968-3390, call us, or email info@dcwsolution.ca. We reply with a written quote and the next steps.",
  },
];

// Interactive Shipment Progress Simulation
const STAGES = [
  {
    pill: "Picked up",
    title: "Picked up in Ludhiana, Punjab",
    sub: "Collected by our partner in India",
  },
  {
    pill: "Departed India",
    title: "Departed India",
    sub: "International transit to Canada",
  },
  {
    pill: "Arrived in Canada",
    title: "Arrived in Toronto (YYZ)",
    sub: "Received by DCW",
  },
  {
    pill: "Released",
    title: "Clearance coordinated",
    sub: "Through our partner customs brokerage",
  },
  {
    pill: "Out for delivery",
    title: "Out for delivery in Brampton, ON",
    sub: "UPS tracking number shared",
  },
];

const WA_I2C =
  "https://wa.me/16729683390?text=" +
  encodeURIComponent("Hi DCW, I'd like help shipping from India to Canada.");

export default function IndiaToCanadaPage() {
  // Rate Estimator State
  const [calcWeight, setCalcWeight] = useState("");
  const [calcState, setCalcState] = useState("");
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState("");
  const [calcResult, setCalcResult] = useState<any>(null);

  // Quote Request Form State
  const [pickupLocation, setPickupLocation] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [province, setProvince] = useState("");
  const [shipmentType, setShipmentType] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [boxL, setBoxL] = useState("");
  const [boxW, setBoxW] = useState("");
  const [boxH, setBoxH] = useState("");
  const [shippingMethod, setShippingMethod] = useState("Not sure");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Active stage simulation for shipment card
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % STAGES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = (typeToSelect?: string) => {
    if (typeToSelect) setShipmentType(typeToSelect);
    const formElement = document.getElementById("i2c-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCalculateRate = async (e: FormEvent) => {
    e.preventDefault();
    setCalcError("");
    setCalcResult(null);

    if (!calcWeight || Number(calcWeight) <= 0) {
      setCalcError("Please enter a valid shipment weight in KG.");
      return;
    }
    if (!calcState) {
      setCalcError("Please select the pickup state in India.");
      return;
    }

    setCalcLoading(true);
    try {
      const { data } = await api.post("/rates/calculate", {
        weight: Number(calcWeight),
        state: calcState,
      });
      if (data.success) {
        setCalcResult(data.data);
      }
    } catch (err: any) {
      setCalcError(
        err.response?.data?.error ||
          "Could not fetch rate calculation. Please contact our team directly for an accurate quote."
      );
    } finally {
      setCalcLoading(false);
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Please agree so we can reply to your quote.");
      return;
    }

    setLoading(true);
    try {
      const messageBody = `[India-to-Canada Quote Request]
Pickup in India: ${pickupLocation} ${pinCode ? `(PIN: ${pinCode})` : ""}
Delivery in Canada: ${deliveryCity}, ${province}
Shipment Type: ${shipmentType}
Approx Weight: ${weightKg} KG`;

      await api.post("/contact", {
        name: name.trim(),
        company: "Individual",
        email: email.trim(),
        phone: phone.trim(),
        service: "India to Canada Shipping",
        message: messageBody,
      });

      const ref = `DCW-IC-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(ref);
      toast.success("Quote request sent! Our specialist will reply promptly.");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.response?.data?.error ||
          "Could not submit quote. Please message us on WhatsApp or call (672) 968-3390."
      );
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
    <div className="min-h-screen bg-[#eef1f0] text-[#0b2f3a] font-[Archivo] flex flex-col antialiased selection:bg-[#f05a28] selection:text-white">
      <Navbar />

      {/* HERO SECTION: Branded hero imagery with dark teal linear gradient overlay */}
      <section
        className="relative pt-6 sm:pt-8 lg:pt-8 pb-12 sm:pb-16 bg-cover bg-no-repeat overflow-hidden text-white"
        style={{
          backgroundImage: "url('/images/hero-banner.webp')",
          backgroundPosition: "center 45%",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(11, 47, 58, 0.96) 0%, rgba(11, 47, 58, 0.90) 55%, rgba(0, 0, 0, 0.75) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#a9c2c6]">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/#services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <span className="text-white">India to Canada shipping</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#ffd100] bg-white/10 px-3.5 py-1.5 rounded-full backdrop-blur-sm border border-white/15">
                <Sparkles size={14} className="text-[#ffd100]" />
                Specialized Trade Corridor: India ➔ Canada
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-white leading-[1.12] tracking-tight">
              Door to Door <br className="hidden sm:inline" />
              Shipping from <span className="text-[#ffd100]">India to Canada</span>
            </h1>

            {/* Lead text */}
            <p className="text-[#d5dcdb] text-base sm:text-lg leading-relaxed max-w-2xl">
              Your trusted freight partner for India–Canada shipments. We arrange
              pickup anywhere in India, coordinate customs clearance when your
              shipment lands, and deliver it anywhere in Canada, with one DCW
              contact throughout.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                type="button"
                onClick={() => scrollToForm()}
                className="inline-flex items-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white px-7 py-3.5 rounded-xl font-black text-sm sm:text-base transition-all duration-200 shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Get a quote</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={WA_I2C}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={19} />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="#quote-estimator"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white border border-white/20 px-5 py-3.5 rounded-xl font-bold text-sm backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5"
              >
                <Calculator size={18} className="text-[#ffd100]" />
                <span>Rate Estimator</span>
              </a>
            </div>
          </div>

          {/* Interactive Live Shipment Progress Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#0b2f3a] rounded-3xl border border-[#d5dcdb] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0b2f3a] via-[#f05a28] to-[#0b2f3a]" />

              <div className="flex items-start justify-between gap-3 mb-6 mt-1">
                <div>
                  <span className="font-mono text-xl sm:text-2xl font-black text-[#0b2f3a] tracking-wider block">
                    DCW-IN 30418
                  </span>
                  <span className="text-xs text-[#51626a] font-medium">
                    Example shipment · Ludhiana to Brampton
                  </span>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#1f8a5b]/15 text-[#1f8a5b] border border-[#1f8a5b]/30">
                  {STAGES[activeStage].pill}
                </span>
              </div>

              <ol className="space-y-4 relative border-l-2 border-[#d5dcdb] ml-3.5 pl-5">
                {STAGES.map((s, idx) => {
                  const isDone = idx <= activeStage;
                  const isNow = idx === activeStage;
                  return (
                    <li key={s.title} className="relative transition-all duration-300">
                      <span
                        className={`absolute -left-[29px] top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                          isDone
                            ? "bg-[#0b2f3a] border-[#0b2f3a] text-white"
                            : "bg-white border-[#d5dcdb]"
                        } ${isNow ? "ring-4 ring-[#f05a28]/25 border-[#f05a28]" : ""}`}
                      >
                        {isDone && <CheckCircle2 size={12} />}
                      </span>
                      <strong
                        className={`block text-xs sm:text-sm font-bold ${
                          isNow ? "text-[#f05a28]" : "text-[#0b2f3a]"
                        }`}
                      >
                        {s.title}
                      </strong>
                      <span className="text-xs text-[#51626a] block mt-0.5">
                        {s.sub}
                      </span>
                    </li>
                  );
                })}
              </ol>

              <div className="mt-6 pt-4 border-t border-dashed border-[#d5dcdb] flex items-center justify-between text-xs text-[#51626a]">
                <span>Door-to-door corridor</span>
                <span className="font-bold text-[#0b2f3a]">
                  Vancouver (YVR) &amp; Toronto (YYZ)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Shipping Options */}
      <section id="opts" className="py-16 sm:py-20">
        <div className="wrap space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Comprehensive Logistics
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2f3a]">
              India to Canada shipping options
            </h2>
            <p className="text-sm sm:text-base text-[#51626a] leading-relaxed">
              Choose what fits your shipment. Not sure? Pick &ldquo;Not sure&rdquo;
              in the form and we&apos;ll recommend an option.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Card 1: Personal Parcels */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d5dcdb] shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#f05a28]/40 transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                    <Luggage size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#f05a28]/10 text-[#c2410c] px-3 py-1 rounded-full">
                    Families &amp; Students
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0b2f3a]">
                    Personal parcels
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1 font-medium">
                    Best for families, students and gifts
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a] pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Clothing, gifts, documents and personal items</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Picked up from your door anywhere in India</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Delivered to the recipient&apos;s door anywhere in Canada</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm("Personal parcel")}
                className="w-full mt-6 text-center bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                Get a quote
              </button>
            </div>

            {/* Card 2: Commercial & E-commerce */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d5dcdb] shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#f05a28]/40 transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                    <Store size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#0b2f3a]/10 text-[#0b2f3a] px-3 py-1 rounded-full">
                    Exporters &amp; Brands
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0b2f3a]">
                    Commercial and e-commerce shipments
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1 font-medium">
                    Best for exporters and online sellers
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a] pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Samples, inventory and online orders</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Recurring volumes with tailored, volume-based pricing</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Commercial invoice and any permits checked before dispatch</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm("Commercial goods")}
                className="w-full mt-6 text-center bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                Get a quote
              </button>
            </div>

            {/* Card 3: Larger Cargo */}
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d5dcdb] shadow-sm flex flex-col justify-between hover:shadow-lg hover:border-[#f05a28]/40 transition-all duration-200">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                    <Plane size={24} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#1f8a5b]/10 text-[#1f8a5b] px-3 py-1 rounded-full">
                    Pallets &amp; Bulk
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-black text-[#0b2f3a]">
                    Larger cargo
                  </h3>
                  <p className="text-xs text-[#51626a] mt-1 font-medium">
                    Best for larger consignments
                  </p>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a] pt-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Received at Vancouver (YVR) or Toronto (YYZ)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Deconsolidation and sorting on arrival</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Storage in Vancouver or Toronto; first 3 days free</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Air cargo; sea freight availability on request</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => scrollToForm("Larger cargo")}
                className="w-full mt-6 text-center bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-xs sm:text-sm py-3.5 px-4 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
              >
                Get a quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: How Shipping Works - Full Bleed Dark Band */}
      <section
        id="how"
        className="bg-gradient-to-br from-[#0b2f3a] via-[#14434f] to-[#071f26] text-white py-16 sm:py-24 border-y border-white/10"
      >
        <div className="wrap space-y-10">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#ffd100]">
              Transparent Pipeline
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              How it works
            </h2>
            <p className="text-sm sm:text-base text-[#a9c2c6]">
              From your enquiry to the recipient&apos;s door, one DCW team keeps
              the shipment moving.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Step 1 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#f05a28] block">1</span>
                <div className="h-0.5 bg-white/20 my-3" />
                <h3 className="text-base font-bold text-white">Request a quote</h3>
                <p className="text-xs text-[#a9c2c6] leading-relaxed mt-2">
                  Tell us what you&apos;re sending, from where and to where. You
                  get a clear written quote.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#ffd100]">Fast response</span>
            </div>

            {/* Step 2 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#f05a28] block">2</span>
                <div className="h-0.5 bg-white/20 my-3" />
                <h3 className="text-base font-bold text-white">Pickup in India</h3>
                <p className="text-xs text-[#a9c2c6] leading-relaxed mt-2">
                  We arrange collection anywhere in India, subject to service
                  availability.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#ffd100]">Any PIN code</span>
            </div>

            {/* Step 3 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#f05a28] block">3</span>
                <div className="h-0.5 bg-white/20 my-3" />
                <h3 className="text-base font-bold text-white">
                  International transit
                </h3>
                <p className="text-xs text-[#a9c2c6] leading-relaxed mt-2">
                  Your shipment travels to Canada. Scheduled air linehaul to YVR
                  and YYZ gateways.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#ffd100]">Air Linehaul</span>
            </div>

            {/* Step 4 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#f05a28] block">4</span>
                <div className="h-0.5 bg-white/20 my-3" />
                <h3 className="text-base font-bold text-white">Customs clearance</h3>
                <p className="text-xs text-[#a9c2c6] leading-relaxed mt-2">
                  Coordinated through our partner customs brokerage. Restricted
                  goods are flagged to you right away.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#ffd100]">CBSA Compliance</span>
            </div>

            {/* Step 5 */}
            <div className="bg-white/5 border border-white/15 rounded-2xl p-6 backdrop-blur-sm space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-4xl font-black text-[#f05a28] block">5</span>
                <div className="h-0.5 bg-white/20 my-3" />
                <h3 className="text-base font-bold text-white">Delivery in Canada</h3>
                <p className="text-xs text-[#a9c2c6] leading-relaxed mt-2">
                  Delivered anywhere in Canada through partners including UPS,
                  with a tracking number.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#ffd100]">UPS Tracking</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Rate Estimator for India-to-Canada Shipments */}
      {/* REQUIREMENT: For India-to-Canada shipment quotations, use "Contact Us" as the only CTA */}
      <section id="quote-estimator" className="py-16 sm:py-20">
        <div className="wrap space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Instant Planning Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a]">
              Estimate India to Canada Shipping Rates
            </h2>
            <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
              Select your pickup state in India and enter your parcel weight to
              view indicative rates. All formal quotations are finalized by our
              logistics desk.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#d5dcdb] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form */}
              <form
                onSubmit={handleCalculateRate}
                className="lg:col-span-5 bg-[#eef1f0]/60 p-6 sm:p-7 rounded-2xl border border-[#d5dcdb] space-y-5"
              >
                <div>
                  <label className="text-[11px] font-bold text-[#51626a] uppercase tracking-wider block mb-1.5">
                    Origin State in India <span className="text-[#f05a28]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]"
                    />
                    <select
                      value={calcState}
                      onChange={(e) => setCalcState(e.target.value)}
                      className="w-full bg-white text-[#0b2f3a] text-xs sm:text-sm font-medium rounded-xl pl-10 pr-6 py-3.5 border border-[#d5dcdb] focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                    >
                      <option value="">Select Pickup State</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#51626a] uppercase tracking-wider block mb-1.5">
                    Shipment Weight (KG) <span className="text-[#f05a28]">*</span>
                  </label>
                  <div className="relative">
                    <Weight
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#51626a]"
                    />
                    <input
                      type="number"
                      min="0.5"
                      step="0.5"
                      value={calcWeight}
                      onChange={(e) => setCalcWeight(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full bg-white text-[#0b2f3a] text-xs sm:text-sm font-medium rounded-xl pl-10 pr-4 py-3.5 border border-[#d5dcdb] focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                    />
                  </div>
                </div>

                {calcError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-xs flex items-center gap-2">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{calcError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={calcLoading}
                  className="w-full bg-[#f05a28] hover:bg-[#c2410c] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {calcLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Calculating...
                    </>
                  ) : (
                    <>Get Estimate</>
                  )}
                </button>
              </form>

              {/* Results / Status Box */}
              <div className="lg:col-span-7">
                {!calcResult && !calcLoading && (
                  <div className="bg-[#eef1f0]/40 rounded-2xl p-10 border border-dashed border-[#d5dcdb] text-center space-y-3">
                    <PackageCheck size={44} className="text-[#51626a]/40 mx-auto" />
                    <h4 className="font-bold text-[#0b2f3a] text-base">
                      Ready to Calculate Rate
                    </h4>
                    <p className="text-xs sm:text-sm text-[#51626a] max-w-sm mx-auto">
                      Choose your origin state and enter your parcel weight to view
                      indicative CAD pricing and transit estimates.
                    </p>
                  </div>
                )}

                {calcLoading && (
                  <div className="bg-[#eef1f0]/40 rounded-2xl p-12 border border-[#d5dcdb] text-center space-y-3">
                    <Loader2 size={36} className="text-[#f05a28] animate-spin mx-auto" />
                    <p className="text-xs font-bold text-[#51626a]">
                      Calculating pricing for India ➔ Canada lane...
                    </p>
                  </div>
                )}

                {calcResult && (
                  <div className="bg-white rounded-2xl border-2 border-[#f05a28] p-6 sm:p-8 shadow-lg space-y-6">
                    <div className="flex items-center justify-between border-b border-[#d5dcdb] pb-4">
                      <div className="flex items-center gap-2 text-[#1f8a5b]">
                        <CheckCircle2 size={18} />
                        <span className="font-bold text-sm text-[#0b2f3a]">
                          Rate Calculation Available
                        </span>
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-wider bg-[#f05a28]/10 text-[#f05a28] px-3 py-1 rounded-full">
                        India ➔ Canada
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-[#eef1f0] p-3.5 rounded-xl">
                        <span className="text-[10px] text-[#51626a] uppercase font-bold block">
                          Zone
                        </span>
                        <strong className="text-[#0b2f3a] text-sm">
                          {calcResult.zone}
                        </strong>
                      </div>
                      <div className="bg-[#eef1f0] p-3.5 rounded-xl">
                        <span className="text-[10px] text-[#51626a] uppercase font-bold block">
                          Weight
                        </span>
                        <strong className="text-[#0b2f3a] text-sm">
                          {calcResult.weight} KG
                        </strong>
                      </div>
                      <div className="bg-[#eef1f0] p-3.5 rounded-xl">
                        <span className="text-[10px] text-[#51626a] uppercase font-bold block">
                          Rate / KG
                        </span>
                        <strong className="text-[#0b2f3a] text-sm">
                          {formatCAD(calcResult.pricePerKg)}
                        </strong>
                      </div>
                      <div className="bg-[#eef1f0] p-3.5 rounded-xl">
                        <span className="text-[10px] text-[#51626a] uppercase font-bold block">
                          Est. Transit
                        </span>
                        <strong className="text-[#0b2f3a] text-sm">
                          {calcResult.transitTime || "4–7 Business Days"}
                        </strong>
                      </div>
                    </div>

                    <div className="bg-[#0b2f3a] text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <span className="text-white/60 text-[11px] font-semibold uppercase tracking-wider block">
                          Total Estimated Cost
                        </span>
                        <span className="text-2xl sm:text-3xl font-black text-white">
                          {formatCAD(calcResult.totalPrice)}
                        </span>
                        <span className="text-white/50 text-xs block mt-0.5">
                          Includes airport recovery &amp; UPS delivery handover
                        </span>
                      </div>

                      {/* ONLY CTA for India-to-Canada quotations is "Contact Us" */}
                      <button
                        type="button"
                        onClick={() => scrollToForm()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white font-black text-sm py-3.5 px-8 rounded-xl shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <span>Contact Us</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#51626a] leading-relaxed">
                      * Rates are indicative and exclude CBSA statutory customs
                      duties, applicable Canadian taxes (GST/HST), and remote postal
                      code surcharges if applicable. Contact our team to confirm
                      final quotation and schedule your pickup.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose DCW - Full Bleed White Band */}
      <section id="why" className="bg-white py-16 sm:py-20 border-y border-[#d5dcdb]">
        <div className="wrap space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              The DCW Advantage
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2f3a]">
              Why choose DCW for India-to-Canada shipping?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                One point of contact
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                From pickup in India to delivery in Canada, you deal with one DCW
                team instead of several providers.
              </p>
            </div>

            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Customs clearance coordinated
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                Clearance is handled through our partner customs brokerage, and we
                keep you updated until your goods are released.
              </p>
            </div>

            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <Truck size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Canada-wide delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                Delivered anywhere in Canada through our delivery partners,
                including UPS, with a tracking number for the recipient.
              </p>
            </div>

            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <Layers size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Warehousing in Vancouver and Toronto
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                If goods need to be held, sorted, relabelled or repacked, we can
                store them. The first 3 days are free.
              </p>
            </div>

            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <PackageCheck size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Experience with courier imports
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                We processed more than 27,000 shipments in our first year,
                handling time-sensitive courier and cargo imports.
              </p>
            </div>

            <div className="bg-[#eef1f0]/60 rounded-2xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                <Calculator size={20} />
              </div>
              <h3 className="text-lg font-black text-[#0b2f3a]">
                Competitive rates, clear quotes
              </h3>
              <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed">
                Pricing tailored to your shipment, with volume-based rates for
                regular shippers and no vague estimates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Requirements */}
      <section id="reqs" className="py-16 sm:py-20">
        <div className="wrap space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Customs Compliance
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2f3a]">
              Shipping requirements
            </h2>
            <p className="text-sm text-[#51626a]">
              Prepare these before your pickup to avoid delays at the border.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <h3 className="text-base font-black text-[#0b2f3a]">Documents</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#51626a] list-disc pl-5 pt-1">
                <li>Sender and recipient names, full addresses and phone numbers</li>
                <li>A list of contents with an honest description and value for each item</li>
                <li>
                  For commercial shipments, a commercial invoice. A Canada
                  Customs Invoice may also be needed for higher-value or dutiable
                  goods.
                </li>
                <li>
                  Permits or certificates for regulated goods, such as food,
                  plants or health products
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                  <Box size={18} />
                </div>
                <h3 className="text-base font-black text-[#0b2f3a]">Packaging</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#51626a] list-disc pl-5 pt-1">
                <li>Use a strong box, fill empty space and seal every seam</li>
                <li>Remove old labels and barcodes from reused boxes</li>
                <li>Keep packaged food sealed in its original, labelled packaging</li>
                <li>Tell us before sending anything with lithium batteries</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                  <ShieldCheck size={18} />
                </div>
                <h3 className="text-base font-black text-[#0b2f3a]">Customs in Canada</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#51626a] list-disc pl-5 pt-1">
                <li>The CBSA decides on duties, taxes and inspections for every shipment</li>
                <li>
                  Gifts worth CAD 60 or less, sent by a friend or relative with
                  a gift card or note, may enter through the courier program
                  without duty or taxes
                </li>
                <li>Declare true values: under-declaring can cause delays or penalties</li>
                <li>Clearance is coordinated through our partner customs brokerage</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-7 border border-[#d5dcdb] shadow-sm space-y-3 hover:border-[#f05a28]/40 transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center">
                  <AlertCircle size={18} />
                </div>
                <h3 className="text-base font-black text-[#0b2f3a]">
                  Restricted and prohibited items
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-[#51626a] list-disc pl-5 pt-1">
                <li>Not allowed: weapons and replicas, cannabis, counterfeit goods</li>
                <li>
                  Restricted: meat, dairy, fresh fruit and vegetables, plants and
                  seeds, medicines and some cosmetics
                </li>
                <li>
                  Restricted items may need permits from agencies such as the
                  CFIA or Health Canada, or may be refused
                </li>
                <li>DCW&apos;s full prohibited items list (to be confirmed)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Permitted vs Restricted Visual Checklist - Full Bleed White Band */}
      <section className="bg-white py-16 sm:py-20 border-y border-[#d5dcdb]">
        <div className="wrap space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Admissible Cargo Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] mt-1">
              What Can &amp; Cannot Be Shipped into Canada
            </h2>
            <p className="text-xs sm:text-sm text-[#51626a] mt-1 leading-relaxed">
              To avoid CBSA customs holds or confiscation, please review the
              admissible cargo guidelines:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1f8a5b]/5 border border-[#1f8a5b]/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#1f8a5b]">
                <CheckCircle2 size={20} />
                <h3 className="font-black text-base text-[#0b2f3a]">
                  Permitted &amp; Commonly Shipped
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a]">
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Personal Wardrobe &amp; Textiles:</strong> Sarees,
                    suits, winter jackets, blankets, linens, and shoes.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Packaged Dry Foods:</strong> Factory-sealed sweets,
                    spices, pulses, dry fruits, and confectionery with
                    ingredient labels.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Books &amp; Study Materials:</strong> Academic
                    textbooks, notebooks, certificates, and religious texts.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Handicrafts &amp; Gifts:</strong> Brassware, wooden
                    carvings, and decorative household items.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={16} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                  <span>
                    <strong>Commercial Samples:</strong> Hardware samples,
                    garment fabric swatches, and manufactured prototypes.
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                <XCircle size={20} />
                <h3 className="font-black text-base text-[#0b2f3a]">
                  Restricted or Strictly Prohibited
                </h3>
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a]">
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Meat, Poultry &amp; Dairy:</strong> Raw foods, ghee,
                    paneer, or products containing uncertified animal derivatives.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Seeds, Soil &amp; Plants:</strong> Agricultural seeds,
                    bulbs, live plants, and untreated soil (CFIA prohibited).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Flammables &amp; Hazmat:</strong> Perfumes with
                    alcohol, aerosol sprays, lighters, fireworks, and loose batteries.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Medicines &amp; Prescription Drugs:</strong> Without
                    Health Canada compliant import permits and doctor prescriptions.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Cash, Gold &amp; Unregistered Valuables:</strong> Hard
                    currency, bearer bonds, and untaxed bullion.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: Popular Routes */}
      <section id="routes" className="py-16 sm:py-20">
        <div className="wrap space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Active Trade Corridors
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2f3a]">
              Popular routes from India to Canada
            </h2>
            <p className="text-xs sm:text-sm text-[#51626a]">
              We pick up anywhere in India and deliver anywhere in Canada, subject
              to service availability. Common routes include:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-3xl p-8 sm:p-10 border border-[#d5dcdb] shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#f05a28]" />
                <h3 className="text-lg font-bold text-[#0b2f3a]">Pickup in India</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {POPULAR_PICKUP_CITIES.map((c) => (
                  <li
                    key={c}
                    className="text-xs sm:text-sm border border-[#d5dcdb] rounded-full px-3.5 py-1.5 bg-[#eef1f0]/60 text-[#0b2f3a] font-medium"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Truck size={18} className="text-[#1f8a5b]" />
                <h3 className="text-lg font-bold text-[#0b2f3a]">Delivery in Canada</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {POPULAR_DELIVERY_CITIES.map((c) => (
                  <li
                    key={c}
                    className="text-xs sm:text-sm border border-[#d5dcdb] rounded-full px-3.5 py-1.5 bg-[#eef1f0]/60 text-[#0b2f3a] font-medium"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: FAQs - Centered, Symmetrical 2-Column Grid */}
      <section id="faq" className="bg-white py-16 sm:py-24 border-y border-[#d5dcdb]">
        <div className="wrap space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3.5 py-1.5 rounded-full">
              Frequently asked questions
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#0b2f3a] mt-2">
              India to Canada shipping: frequently asked questions
            </h2>
            <p className="text-xs sm:text-sm text-[#51626a] max-w-xl mx-auto">
              Clear answers about rates, CBSA customs, pickup, delivery, and documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-start">
            {/* Column 1 */}
            <div className="space-y-4">
              {I2C_FAQS.slice(0, 6).map((faq) => (
                <details
                  key={faq.q}
                  className="group border border-[#d5dcdb] rounded-2xl p-5 sm:p-6 bg-[#eef1f0]/40 transition-all shadow-sm open:bg-white open:shadow-md"
                >
                  <summary className="font-bold text-sm sm:text-base text-[#0b2f3a] cursor-pointer flex items-center justify-between list-none">
                    <span>{faq.q}</span>
                    <span className="text-[#f05a28] font-black text-xl transition-transform duration-200 group-open:rotate-45 shrink-0 ml-4">
                      +
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed mt-3.5 pt-3.5 border-t border-[#d5dcdb]/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              {I2C_FAQS.slice(6).map((faq) => (
                <details
                  key={faq.q}
                  className="group border border-[#d5dcdb] rounded-2xl p-5 sm:p-6 bg-[#eef1f0]/40 transition-all shadow-sm open:bg-white open:shadow-md"
                >
                  <summary className="font-bold text-sm sm:text-base text-[#0b2f3a] cursor-pointer flex items-center justify-between list-none">
                    <span>{faq.q}</span>
                    <span className="text-[#f05a28] font-black text-xl transition-transform duration-200 group-open:rotate-45 shrink-0 ml-4">
                      +
                    </span>
                  </summary>
                  <p className="text-xs sm:text-sm text-[#51626a] leading-relaxed mt-3.5 pt-3.5 border-t border-[#d5dcdb]/70">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Request an India-to-Canada Quote Form & Prefer to Talk */}
      {/* REQUIREMENT: For India-to-Canada shipment quotations, use "Contact Us" as the only CTA */}
      <section id="i2c-form" className="py-12 sm:py-16">
        <div className="wrap max-w-6xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[11px] font-black uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              Direct Quotation
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a] pt-1">
              Request an India-to-Canada quote
            </h2>
            <p className="text-xs sm:text-sm text-[#51626a]">
              Takes about a minute. We reply with a written quote.
            </p>
          </div>

          {/* 2-COLUMN GRID WITH MATCHING EQUAL HEIGHT AT ALL COSTS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: COMPACT FORM */}
            <form
              onSubmit={handleFormSubmit}
              className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 border border-[#d5dcdb] shadow-sm flex flex-col justify-between space-y-4"
            >
              {submittedRef && (
                <div className="p-3 rounded-xl bg-[#1f8a5b]/10 border border-[#1f8a5b]/30 text-[#1f8a5b] text-xs sm:text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>
                    Quote request sent! Reference: <strong>{submittedRef}</strong>. Our specialist will reply shortly.
                  </span>
                </div>
              )}

              {/* Row 1: Pickup in India & PIN code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Pickup in India (city, state) <span className="text-[#f05a28]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ludhiana, Punjab"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    PIN code <span className="text-[10px] font-normal lowercase">(opt)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="6 digits"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>
              </div>

              {/* Row 2: Delivery in Canada & Province */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Delivery in Canada (city) <span className="text-[#f05a28]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brampton"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Province or territory <span className="text-[#f05a28]">*</span>
                  </label>
                  <select
                    required
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  >
                    <option value="">Select Province</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 3: Shipment Type & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Category <span className="text-[#f05a28]">*</span>
                  </label>
                  <select
                    required
                    value={shipmentType}
                    onChange={(e) => setShipmentType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  >
                    <option value="">Select Category</option>
                    {[
                      "Personal parcel",
                      "Gift",
                      "Documents",
                      "Commercial goods",
                      "E-commerce orders",
                      "Larger cargo",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Weight (kg) <span className="text-[#f05a28]">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    required
                    placeholder="e.g. 15.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>
              </div>

              {/* Row 4: Sender Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Your name <span className="text-[#f05a28]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jaspreet Kaur"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                    Email address <span className="text-[#f05a28]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#51626a] block mb-1">
                  Phone / WhatsApp <span className="text-[10px] font-normal lowercase">(opt)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (604) 555-0123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#d5dcdb] text-sm focus:outline-none focus:ring-2 focus:ring-[#f05a28]"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="iConsent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="w-4 h-4 rounded border-[#d5dcdb] text-[#f05a28] focus:ring-[#f05a28]"
                  />
                  <label htmlFor="iConsent" className="text-[11px] text-[#51626a]">
                    DCW may contact me.{" "}
                    <Link href="/privacy-policy" className="underline hover:text-[#0b2f3a]">
                      Privacy policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 bg-[#f05a28] hover:bg-[#c2410c] text-white font-black text-sm py-2.5 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-orange-500/25 active:translate-y-0 disabled:opacity-50 cursor-pointer"
                >
                  <Send size={15} />
                  <span>{loading ? "Submitting..." : "Contact Us for Quote"}</span>
                </button>
              </div>
            </form>

            {/* RIGHT: PREFER TO TALK PANEL (MATCHING EXACT CONTAINER HEIGHT) */}
            <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-8 border border-[#d5dcdb] shadow-sm flex flex-col justify-between">
              {/* Header & WhatsApp */}
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-[#f05a28] block mb-1">
                    Direct Assistance
                  </span>
                  <h3 className="text-2xl font-black text-[#0b2f3a]">
                    Prefer to talk?
                  </h3>
                  <p className="text-sm text-[#51626a] mt-1 leading-relaxed">
                    Get quick answers and advice from our Canada dispatch specialists.
                  </p>
                </div>

                <a
                  href={WA_I2C}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#1f8a5b] hover:bg-[#186f49] text-white font-bold text-sm sm:text-base py-3.5 px-5 rounded-xl transition shadow-sm hover:shadow-md"
                >
                  <WhatsAppIcon size={19} />
                  <span>Get assistance on WhatsApp</span>
                </a>

                <div className="space-y-2 pt-2 text-sm text-[#51626a] bg-[#eef1f0]/50 p-4 rounded-xl border border-[#d5dcdb]/70">
                  <p className="flex items-center justify-between">
                    <span className="font-bold text-[#0b2f3a]">Phone:</span>{" "}
                    <a href="tel:+16729683390" className="hover:underline font-semibold text-[#0b2f3a]">
                      (672) 968-3390
                    </a>
                  </p>
                  <p className="flex items-center justify-between">
                    <span className="font-bold text-[#0b2f3a]">Email:</span>{" "}
                    <a href="mailto:info@dcwsolution.ca" className="hover:underline font-semibold text-[#0b2f3a]">
                      info@dcwsolution.ca
                    </a>
                  </p>
                  <p className="text-xs text-[#51626a] pt-1 border-t border-[#d5dcdb]/60 flex items-center justify-between">
                    <span>Working hours:</span>
                    <span className="font-medium">Mon–Fri, 9 am – 5 pm PT</span>
                  </p>
                </div>
              </div>

              {/* What happens next */}
              <div className="border-t border-[#d5dcdb] pt-5 mt-4 space-y-3">
                <h4 className="font-black text-xs sm:text-sm uppercase tracking-wider text-[#0b2f3a]">
                  What happens next
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#51626a]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Review shipment specifications</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Clear written quote with next steps</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={17} className="text-[#1f8a5b] shrink-0 mt-0.5" />
                    <span>Confirm India pickup &amp; documents</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: Other Services - Full Bleed Symmetrical 3-Card Band */}
      <section className="bg-white py-16 sm:py-20 border-t border-[#d5dcdb]">
        <div className="wrap space-y-8">
          <div className="max-w-2xl space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-[#f05a28]">
              Cross-Functional Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2f3a]">
              Other services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/#services"
              className="bg-[#eef1f0]/60 hover:bg-[#eef1f0] border border-[#d5dcdb] hover:border-[#f05a28]/40 rounded-2xl p-6 transition-all duration-200 group block"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center mb-4 group-hover:bg-[#f05a28] group-hover:text-white transition-colors">
                <ShieldCheck size={20} />
              </div>
              <strong className="block text-base font-black text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors">
                Customs Clearance
              </strong>
              <span className="text-xs text-[#51626a] block mt-1.5 leading-relaxed">
                Courier, cargo and e-commerce clearance, coordinated across Canadian ports of entry.
              </span>
            </Link>

            <Link
              href="/#services"
              className="bg-[#eef1f0]/60 hover:bg-[#eef1f0] border border-[#d5dcdb] hover:border-[#f05a28]/40 rounded-2xl p-6 transition-all duration-200 group block"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center mb-4 group-hover:bg-[#f05a28] group-hover:text-white transition-colors">
                <Warehouse size={20} />
              </div>
              <strong className="block text-base font-black text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors">
                Warehousing
              </strong>
              <span className="text-xs text-[#51626a] block mt-1.5 leading-relaxed">
                Storage, sorting and relabelling in Vancouver and Toronto. First 3 days free.
              </span>
            </Link>

            <Link
              href="/#services"
              className="bg-[#eef1f0]/60 hover:bg-[#eef1f0] border border-[#d5dcdb] hover:border-[#f05a28]/40 rounded-2xl p-6 transition-all duration-200 group block"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0b2f3a]/5 text-[#f05a28] flex items-center justify-center mb-4 group-hover:bg-[#f05a28] group-hover:text-white transition-colors">
                <Truck size={20} />
              </div>
              <strong className="block text-base font-black text-[#0b2f3a] group-hover:text-[#f05a28] transition-colors">
                Transportation &amp; Distribution
              </strong>
              <span className="text-xs text-[#51626a] block mt-1.5 leading-relaxed">
                Delivery to homes and commercial businesses across Canada via UPS with live tracking.
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 11: CTA Band */}
      <section className="bg-[#f05a28] text-white py-14">
        <div className="wrap flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Have a shipment coming in? Get a quote in two minutes.
            </h2>
            <p className="text-xs sm:text-sm text-white/90">
              Prefer to talk? Call{" "}
              <a href="tel:+16729683390" className="underline font-bold">
                (672) 968-3390
              </a>{" "}
              or email{" "}
              <a href="mailto:info@dcwsolution.ca" className="underline font-bold">
                info@dcwsolution.ca
              </a>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => scrollToForm()}
            className="shrink-0 bg-white hover:bg-[#eef1f0] text-[#0b2f3a] font-black text-sm px-8 py-3.5 rounded-xl transition cursor-pointer shadow-md"
          >
            Contact Us
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
