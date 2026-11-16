"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronDown, HelpCircle, ArrowRight, MessageSquare, Phone } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "What does DCW stand for and what core services do you provide?",
      a: "DCW stands for Delivery, Clearance, and Warehousing. We specialize in international courier import handling, customs clearance coordination through licensed Canadian customs brokerage partners, bonded & non-bonded warehousing in Vancouver and Toronto, and Canada-wide last-mile delivery via UPS.",
    },
    {
      q: "How does customs clearance coordination work?",
      a: "We act as your single administrative point of contact. Once your air waybill (AWB) and cargo manifest arrive in Canada, we coordinate documentation directly with our customs brokerage partner, review commercial invoices and HS codes, and ensure timely electronic clearance submission to CBSA (Canada Border Services Agency) — typically within 24–48 hours.",
    },
    {
      q: "Can international courier companies partner with DCW as their Canadian agent?",
      a: "Yes. International courier companies, freight forwarders, and 3PLs partner with DCW to handle their inbound Canadian consolidations. We recover bags/cargo from the terminal, arrange bonded transfer, coordinate clearance, de-consolidate, and inject shipments into the UPS domestic delivery network.",
    },
    {
      q: "Where are DCW warehousing facilities located in Canada?",
      a: "We operate and coordinate warehousing hubs in Vancouver (serving YVR airport and Pacific container ports) and Toronto (serving YYZ airport and Eastern distribution corridors). We offer sorting, repacking, labeling, cross-docking, and palletizing services.",
    },
    {
      q: "How are last-mile deliveries across Canada handled?",
      a: "Domestic final-mile delivery across all Canadian provinces and territories is handled through our preferred partnership with UPS, complete with end-to-end tracking numbers provided directly to you and your consignees.",
    },
    {
      q: "What documentation is required to clear imports into Canada?",
      a: "Standard requirements include a Commercial Invoice (specifying description of goods, quantity, country of origin, unit value, and currency), an Air Waybill (AWB) or Bill of Lading (BOL), and a detailed Packing List. Specific commodities (such as food, cosmetics, or medical devices) may require supplementary regulatory permits.",
    },
    {
      q: "How can I request a formal shipping quote or consultation?",
      a: "You can request a quote online using our dedicated quote request form, estimate import tariffs using our interactive Cost Estimator, or book a consultation call directly with our operations dispatch team at (672) 968-3390.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-4xl py-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f05a28] bg-[#f05a28]/10 px-3 py-1 rounded-full">
              Frequently Asked Questions
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight mt-3">
              Help &amp; Logistics FAQs
            </h1>
            <p className="text-[#51626a] text-sm sm:text-base mt-3 leading-relaxed">
              Find quick answers regarding Canadian courier imports, customs clearance coordination, warehousing terms, and delivery partner handovers.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl border border-[#d5dcdb] hover:border-[#b0bcba] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none transition-colors duration-150 hover:bg-[#fafafa]"
                  >
                    <span className="text-base sm:text-lg font-bold text-[#0b2f3a] pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#f05a28] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 text-sm sm:text-base text-[#51626a] leading-relaxed border-t border-[#d5dcdb]/40 mt-1 animate-in fade-in duration-200">
                      <p className="pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions card */}
          <div className="bg-[#eef1f0] p-8 rounded-2xl border border-[#d5dcdb] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#0b2f3a]">Still have specific questions?</h3>
              <p className="text-xs sm:text-sm text-[#51626a] mt-1">Our operations desk is on standby to assist with customs queries or transit schedules.</p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link
                href="/book-a-call"
                className="bg-[#0b2f3a] hover:bg-[#14434f] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-md flex items-center gap-2"
              >
                <Phone size={14} /> Book a Call
              </Link>
              <Link
                href="/request-a-quote"
                className="bg-[#f05a28] hover:bg-[#c2410c] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm hover:shadow-orange-500/25 flex items-center gap-2"
              >
                <MessageSquare size={14} /> Ask Team
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

