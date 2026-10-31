import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesSection from '@/components/ServicesSection';
import DeliveryServices from '@/components/DeliveryServices';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <ServicesSection />
      <DeliveryServices />
      <ContactSection />
      <Footer />
    </main>
  );
}