import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Terms & Conditions | DCW Solutions Inc.",
  description: "Terms and conditions governing freight handling, courier imports, customs clearance coordination, and warehousing services by DCW Solutions Inc.",
};

export default function TermsAndConditionsPage() {
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
              Terms &amp; Conditions
            </h1>
            <p className="text-sm text-[#51626a] mt-2">
              Effective Date: November 2026
            </p>
          </div>

          <div className="space-y-8 text-[#14434f] leading-relaxed text-[16px]">
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing this website, requesting quotes, or engaging DCW Solutions Inc. (&quot;DCW&quot;, &quot;we&quot;, &quot;us&quot;) for logistics, warehousing, customs clearance coordination, or cargo handling services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services or website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                2. Nature of Services
              </h2>
              <p className="mb-3">
                DCW Solutions Inc. provides logistics management, freight forwarding facilitation, bonded/non-bonded warehouse storage, sorting, and final-mile distribution within Canada. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li>
                  <strong className="text-[#0b2f3a]">Customs Clearance Coordination:</strong> DCW acts as an administrative coordinator connecting importers with licensed Canadian customs brokers. Official declarations, tariff classifications, and duty remittances are executed pursuant to Canada Border Services Agency (CBSA) statutory standards.
                </li>
                <li>
                  <strong className="text-[#0b2f3a]">Carrier &amp; Courier Handover:</strong> Domestic last-mile shipments are fulfilled via established logistics carriers (such as UPS, Canada Post, or regional drayage carriers). Transit guarantees and liabilities are subject to carrier-specific service terms.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                3. Customer Responsibilities &amp; Documentation
              </h2>
              <p className="mb-3">The shipper, importer, or partner is solely responsible for:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li>Providing accurate and complete Commercial Invoices, Air Waybills (AWB), Packing Lists, and Certificates of Origin.</li>
                <li>Declaring correct valuations (Value for Duty) and tariff codes in good faith.</li>
                <li>Ensuring cargo contains no prohibited, contraband, or counterfeit goods under Canadian law.</li>
                <li>Settling applicable import duties, GST/HST, customs brokerage disbursement fees, and demurrage/storage charges in a timely manner.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                4. Rates, Quotations &amp; Payments
              </h2>
              <p>
                Rates provided via online calculators or formal estimates are calculated based on supplied dimensions, weight, and classification at the time of quotation. Final invoiced amounts may vary if actual audited weight, volume, or customs requirements differ upon arrival at our Vancouver or Toronto facilities. Invoices must be paid in Canadian Dollars (CAD) within the terms specified on the commercial invoice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                5. Limitation of Liability
              </h2>
              <p>
                DCW Solutions Inc. exercises reasonable operational diligence in receiving, handling, and storing goods. However, to the maximum extent permitted by applicable Canadian law, DCW is not liable for indirect, consequential, or delay-related damages arising from customs inspection holds, border delays, airline flight cancellations, weather disruptions, or force majeure events. Cargo insurance is strongly recommended for all high-value shipments.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                6. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms and Conditions shall be governed by, and construed in accordance with, the laws of the Province of British Columbia and the federal laws of Canada applicable therein. Any legal proceeding arising hereunder shall be instituted exclusively in the courts of British Columbia, Canada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                7. Contact Information
              </h2>
              <div className="mt-4 p-5 bg-[#eef1f0] rounded-xl border border-[#d5dcdb] text-sm space-y-1">
                <div className="font-bold text-[#0b2f3a]">DCW Solutions Inc.</div>
                <div>Legal &amp; Compliance Dept: <a href="mailto:info@dcwsolution.ca" className="text-[#f05a28] font-semibold hover:underline">info@dcwsolution.ca</a></div>
                <div>Phone: <a href="tel:+16729683390" className="text-[#0b2f3a] font-semibold hover:underline">(672) 968-3390</a></div>
                <div>Vancouver, BC, Canada</div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

