import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import IndiaCanadaBanner from "../components/IndiaCanadaBanner";
import IndiaCanadaSection from "../components/IndiaCanadaSection";
import ServicesSection from "../components/ServicesSection";
import DeliveryServices from "../components/DeliveryServices";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import TrustSection from "../components/TrustSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <IndiaCanadaBanner />
      <ServicesSection />
      <IndiaCanadaSection />
      <DeliveryServices />
      <TrustSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
