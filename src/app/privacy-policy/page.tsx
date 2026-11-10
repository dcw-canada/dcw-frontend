import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy Policy | DCW Solutions Inc.",
  description: "Learn how DCW Solutions Inc. collects, uses, and safeguards your personal and freight shipment information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-4xl py-12">
          <div className="mb-8 pb-6 border-b border-[#d5dcdb]">
            <Link
              href="/"
              className="text-xs font-bold uppercase tracking-wider text-[#f05a28] hover:underline inline-block mb-3"
            >
              ← Back to Home
            </Link>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b2f3a] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#51626a] mt-2">
              Last updated: November 2026
            </p>
          </div>

          <div className="space-y-8 text-[#14434f] leading-relaxed text-[16px]">
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                1. Introduction
              </h2>
              <p>
                DCW Solutions Inc. (&quot;DCW&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect personal and operational information when you visit our website, utilize our customs clearance coordination, warehousing, cargo handling, and last-mile delivery services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                2. Information We Collect
              </h2>
              <p className="mb-3">
                To coordinate freight logistics and provide accurate rate calculations, we may collect the following information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li>
                  <strong className="text-[#0b2f3a]">Contact Details:</strong> Full name, company name, email address, physical address, and telephone number.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Shipment Documentation:</strong> Commercial invoices, air waybills (AWB), bill of lading (BOL), packing lists, Harmonized System (HS) codes, and cargo descriptions required for customs clearance coordination with Canada Border Services Agency (CBSA) licensed partners.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Digital Communications:</strong> Inquiries submitted through our website contact forms, WhatsApp messaging, or email correspondence.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Technical Usage Data:</strong> IP addresses, browser types, and usage patterns collected via standard web logs to maintain website security and optimize performance.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                3. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information exclusively for legitimate business purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li>Preparing and coordinating customs clearance, warehousing, and delivery dispatches.</li>
                <li>Generating accurate landed-cost estimations and shipping quotes.</li>
                <li>Communicating status alerts, transit milestones, and tracking notices.</li>
                <li>Fulfilling legal, tax, and customs documentation retention requirements under Canadian federal regulations.</li>
                <li>Improving our freight operational workflows and customer service standards.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                4. Disclosure of Information
              </h2>
              <p>
                We do not sell, rent, or trade your personal information. We only share shipment-related information with verified third-party partners strictly necessary to complete your delivery chain:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a] mt-3">
                <li>
                  <strong className="text-[#0b2f3a]">Customs Brokerage Partners:</strong> Licensed Canadian customs brokers handling clearance filings.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Freight &amp; Delivery Carriers:</strong> Courier services (such as UPS), air cargo handlers, and drayage transport teams fulfilling transport legs.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Regulatory Authorities:</strong> CBSA, Transport Canada, or other government authorities where mandated by law.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                5. Data Security &amp; Retention
              </h2>
              <p>
                We employ physical, technical, and administrative safeguards to protect your personal and commercial data against unauthorized access, loss, or disclosure. Shipment records are retained only as long as required to fulfill logistics services and adhere to Canadian customs and commercial auditing laws.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                6. Your Privacy Rights
              </h2>
              <p>
                Under applicable Canadian privacy legislation (including PIPEDA), you have the right to request access to the personal data we hold about you, request corrections to inaccurate records, or inquire about our data management practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                7. Contact Our Privacy Officer
              </h2>
              <p>
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our team:
              </p>
              <div className="mt-4 p-5 bg-[#eef1f0] rounded-xl border border-[#d5dcdb] text-sm space-y-1">
                <div className="font-bold text-[#0b2f3a]">DCW Solutions Inc.</div>
                <div>Email: <a href="mailto:info@dcwsolution.ca" className="text-[#f05a28] font-semibold hover:underline">info@dcwsolution.ca</a></div>
                <div>Phone: <a href="tel:+16729683390" className="text-[#0b2f3a] font-semibold hover:underline">(672) 968-3390</a></div>
                <div>Headquarters: Vancouver, British Columbia, Canada</div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

