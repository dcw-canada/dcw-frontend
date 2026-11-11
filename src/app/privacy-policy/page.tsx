import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Privacy Policy | DCW Solutions Inc.",
  description:
    "Learn how DCW Solutions Inc. collects, uses, discloses, protects, and retains personal information in accordance with Canadian privacy laws.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />

      <main className="section section--paper">
        <div className="wrap max-w-4xl py-12">
          {/* Header */}
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
            <p className="text-sm text-[#51626a] mt-2 font-medium">
              DCW Solutions Inc. — Privacy Policy
            </p>
          </div>

          <div className="space-y-8 text-[#14434f] leading-relaxed text-[16px]">
            {/* 1. About this policy */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                1. About this policy
              </h2>
              <p className="mb-3">
                DCW Solutions Inc. (&ldquo;DCW,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy. This policy explains how we collect, use, disclose, protect, and retain personal information through dcwsolution.ca and our shipment booking, tracking, payment, freight forwarding, courier, warehousing, and delivery coordination services. We handle personal information in accordance with applicable Canadian privacy laws, including British Columbia&rsquo;s <em>Personal Information Protection Act</em> and the federal <em>Personal Information Protection and Electronic Documents Act</em> where applicable.
              </p>
              <p>
                DCW is not a licensed customs broker. Customs brokerage services are arranged through ATG Customs Brokers Inc. or another authorized brokerage partner. Brokerage partners also have their own privacy responsibilities.
              </p>
            </section>

            {/* 2. Information we collect */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                2. Information we collect
              </h2>
              <p className="mb-3">Depending on the service, we collect:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li>Sender, recipient, importer, and customer names, addresses, phone numbers, and email addresses.</li>
                <li>Shipment contents, declared values, invoices, tracking details, and pickup and delivery information.</li>
                <li>Powers of attorney, importer numbers, and supporting customs documentation.</li>
                <li>Booking, billing, payment confirmation, and transaction records.</li>
                <li>Communications with us, including inquiries and service instructions.</li>
              </ul>
              <p className="mt-3">
                We receive information through website forms, email, phone, WhatsApp, shipping partners, and shipping software. Information about recipients and importers may be supplied by senders, business customers, or overseas shipping partners. Please provide accurate information and ensure you have authority or another lawful basis to provide information about someone else. We collect only information reasonably needed for the identified purpose.
              </p>
            </section>

            {/* 3. How we use information */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                3. How we use information
              </h2>
              <p className="mb-3">
                We use personal information to book and manage shipments; arrange pickups, transportation, customs clearance, warehousing, and delivery; provide shipment tracking; process payments; communicate service updates; respond to inquiries; resolve delivery issues, claims, and disputes; prevent fraud and unauthorized activity; and meet customs, accounting, and other legal obligations.
              </p>
              <p>
                Where permitted by law and supported by the required consent or another lawful basis, we also use contact details to send promotional emails or WhatsApp messages. Marketing preferences are separate from necessary shipment communications.
              </p>
            </section>

            {/* 4. Consent and choices */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                4. Consent and choices
              </h2>
              <p className="mb-3">
                We explain the purposes for collecting, using, or disclosing personal information and obtain consent where required. The appropriate form of consent depends on the sensitivity of the information, your reasonable expectations, and applicable law. We seek express consent where required and do not treat simply visiting our website as consent to optional marketing or advertising tracking.
              </p>
              <p>
                You may contact <a href="mailto:info@dcwsolution.ca" className="text-[#f05a28] font-semibold hover:underline">info@dcwsolution.ca</a> to withdraw consent, subject to legal or contractual restrictions and reasonable notice. We will explain any effect on our ability to provide requested services. Withdrawal does not require us to delete records that we must lawfully retain.
              </p>
            </section>

            {/* 5. When we share information */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                5. When we share information
              </h2>
              <p className="mb-3">We share information reasonably needed for the relevant purpose with:</p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li><strong className="text-[#0b2f3a]">ATG Customs Brokers Inc.</strong> and other authorized customs brokerage partners, for clearance and related compliance.</li>
                <li><strong className="text-[#0b2f3a]">UPS</strong>, other last-mile delivery partners, airlines, carriers, warehouses, and overseas pickup partners, to transport, handle, store, and deliver shipments.</li>
                <li>Shipping software, website, communications, and other service providers supporting our operations.</li>
                <li><strong className="text-[#0b2f3a]">Moneris</strong>, for payment processing.</li>
                <li><strong className="text-[#0b2f3a]">CBSA</strong>, other customs authorities, regulators, law enforcement, or other parties where required or permitted by law.</li>
              </ul>
              <p className="mt-3">
                We do not sell or rent personal information or share it for another company&rsquo;s independent marketing. We use contractual or other appropriate measures to protect information handled by service providers on our behalf. Carriers, brokers, payment processors, and authorities may also handle information under their own legal obligations and privacy policies.
              </p>
            </section>

            {/* 6. Payments */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                6. Payments
              </h2>
              <p>
                Online payments are processed through our integration with Moneris. DCW does not store payment-card details. We retain transaction and payment confirmation records needed for billing, reconciliation, refunds, and recordkeeping. Please do not send card details by email or WhatsApp.
              </p>
            </section>

            {/* 7. International handling of information */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                7. International handling of information
              </h2>
              <p className="mb-3">
                Information is handled in Canada and may be shared with or accessed by partners in countries from which shipments originate, as needed to arrange pickup, export, transportation, and related services. Information handled outside Canada may be subject to foreign laws and lawful access by courts, regulators, or public authorities.
              </p>
              <p>
                Contact us for information about the international handling associated with your shipment. Legally required customs records remain subject to applicable record-location and access requirements; this policy does not authorize their storage elsewhere contrary to those requirements.
              </p>
            </section>

            {/* 8. How long we keep information */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                8. How long we keep information
              </h2>
              <p className="mb-3">
                We retain information for the purposes for which it was collected and for applicable legal, regulatory, accounting, and dispute-resolution requirements. Retention depends on the type of record and the role in which it is held:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-[#51626a]">
                <li><strong className="text-[#0b2f3a]">Freight-forwarder advance reporting records:</strong> applicable house bill, house bill close message, and supplementary cargo data records are retained for the calendar year in which they were transmitted plus three complete calendar years.</li>
                <li><strong className="text-[#0b2f3a]">Customs brokerage records:</strong> our licensed brokerage partner is responsible for retaining its required brokerage records for six years after importation. DCW retains copies in its possession only for its own documented service and legal needs or where it has undertaken an applicable recordkeeping obligation.</li>
                <li><strong className="text-[#0b2f3a]">Other customer information:</strong> inquiries, routine communications, marketing records, and other information are retained only as long as reasonably needed for their purpose or an applicable legal requirement. Customs retention periods do not automatically apply to every item of personal information.</li>
              </ul>
              <p className="mt-3">
                Records may be kept longer where required by law, an audit, a legal hold, or a continuing claim or dispute. Authorizations may also be retained while active and afterward as required for the transactions they support. Where applicable law requires information used to make a decision directly affecting an individual to be retained for a minimum period, we observe that requirement. When information is no longer needed, we securely delete, destroy, or anonymize it, subject to applicable requirements.
              </p>
            </section>

            {/* 9. Security */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                9. Security
              </h2>
              <p>
                We use safeguards appropriate to the sensitivity of the information and the risks involved. Our email accounts use multi-factor authentication. No transmission or storage system can be guaranteed completely secure. If a privacy breach occurs, we assess it and provide notifications and reports where required by applicable law.
              </p>
            </section>

            {/* 10. Marketing messages */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                10. Marketing messages
              </h2>
              <p className="mb-3">
                We send promotional emails and WhatsApp messages only where we have the consent or other legal basis required by applicable anti-spam laws. You can unsubscribe at no charge by replying &ldquo;OPT OUT&rdquo; to a promotional message or emailing <a href="mailto:info@dcwsolution.ca" className="text-[#f05a28] font-semibold hover:underline">info@dcwsolution.ca</a>. We act on unsubscribe requests without delay and no later than 10 business days after receipt.
              </p>
              <p>
                Unsubscribing from marketing does not stop necessary non-promotional communications about active shipments, payments, claims, or legal obligations. We may retain limited suppression information to ensure we respect your opt-out.
              </p>
            </section>

            {/* 11. Website technologies and third-party services */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                11. Website technologies and third-party services
              </h2>
              <p className="mb-3">
                Our website utilizes standard technical server logs to ensure platform security, verify request integrity, and monitor site availability. We do not deploy optional advertising or behavioural marketing tracking pixels without notice and requisite consent.
              </p>
              <p>
                Our website and communications may link to third-party services. Their handling of information is governed by their own policies. Information we disclose to them remains subject to our obligations under applicable law.
              </p>
            </section>

            {/* 12. Access, corrections, and complaints */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                12. Access, corrections, and complaints
              </h2>
              <p className="mb-3">
                You may request access to or correction of your personal information, ask about our practices, withdraw consent, request deletion, or make a privacy complaint by contacting our Privacy Officer. We may verify your identity using information proportionate to the request. We respond within applicable legal timelines and explain any lawful limits or refusal. Deletion is subject to recordkeeping obligations and other lawful reasons for retention; it is not an unconditional right to erase shipment records.
              </p>
              <p>
                If a concern remains unresolved, you may contact the Office of the Information and Privacy Commissioner for British Columbia or the Office of the Privacy Commissioner of Canada, as applicable.
              </p>
            </section>

            {/* 13. Contact us */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                13. Contact us
              </h2>
              <div className="mt-4 p-6 bg-[#eef1f0] rounded-2xl border border-[#d5dcdb] text-sm space-y-1.5">
                <div className="font-bold text-base text-[#0b2f3a]">Privacy Officer — DCW Solutions Inc.</div>
                <div className="text-[#14434f]">115-6086 Russ Baker Way</div>
                <div className="text-[#14434f]">Richmond, BC V7B 1B4, Canada</div>
                <div className="pt-2">Email: <a href="mailto:info@dcwsolution.ca" className="text-[#f05a28] font-bold hover:underline">info@dcwsolution.ca</a></div>
                <div>Website: <a href="https://dcwsolution.ca" target="_blank" rel="noopener noreferrer" className="text-[#0b2f3a] font-semibold hover:underline">https://dcwsolution.ca</a></div>
              </div>
            </section>

            {/* 14. Changes to this policy */}
            <section>
              <h2 className="text-xl font-bold text-[#0b2f3a] mb-3">
                14. Changes to this policy
              </h2>
              <p>
                We may update this policy to reflect changes in our practices or legal requirements. The current version and effective date will appear on our website. Where required, we provide additional notice or obtain fresh consent before materially changing how we use personal information.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
