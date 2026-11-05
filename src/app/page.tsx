import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import DeliveryServices from '../components/DeliveryServices';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import EstimateSection from '../components/EstimateSection';
import TrustSection from '../components/TrustSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ServicesSection />
      <DeliveryServices />
      <EstimateSection />
      <TrustSection />
      <ContactSection />
      <Footer />
    </main>
  );
}