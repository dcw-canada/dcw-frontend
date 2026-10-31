import Image from 'next/image';
import { Box, ShieldCheck } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-[var(--brand-blue)] mb-12">Our Core Services</h2>
      
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
          <div className="relative h-64">
            <Image src="/images/warehouse-team.jpg" alt="Warehousing" fill className="object-cover" />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Box className="text-[var(--brand-blue)]" /> Warehousing
            </h3>
            <p className="text-gray-600 mb-4">
              Our state-of-the-art facilities are strategically located, offering convenient access to major transportation routes, ensuring seamless distribution of your goods.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
          <div className="relative h-64">
            <Image src="/images/customs.jpg" alt="Customs Clearance" fill className="object-cover" />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-[var(--brand-blue)]" /> Customs Clearance
            </h3>
            <p className="text-gray-600 mb-4">
              Our team of experienced professionals is well-versed in the ever-changing customs laws and regulations of different countries, minimizing delays.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}