import Image from 'next/image';
import { Truck } from 'lucide-react';

export default function DeliveryServices() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
           <Image src="/images/loading-dock.jpg" alt="Delivery Service" fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-[var(--brand-blue)] mb-6 flex items-center gap-2">
            <Truck className="w-8 h-8" /> Seamless Delivery
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            We ensure your inventory is in safe hands from our warehouse to your final destination. Our fleet and team are equipped to handle your cargo with the utmost care.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/delivery-man.jpg" alt="Delivery Man" fill className="object-cover object-top" />
            </div>
            <div className="relative h-48 rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/delivery-crew.jpg" alt="Delivery Crew" fill className="object-cover object-center" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}