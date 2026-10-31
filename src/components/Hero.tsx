import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center mt-20">
      <Image src="/images/warehouse.jpg" alt="DCW Warehouse" fill priority className="object-cover brightness-50" />
      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Delivery. Clearance. Warehousing.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          At DCW Solutions Inc, we provide exceptional logistics services tailored to meet your business needs.
        </p>
        <a href="#contact" className="bg-[var(--brand-yellow)] text-gray-900 px-8 py-3 rounded-md font-bold text-lg hover:bg-yellow-400 transition">
          Get a Quote
        </a>
      </div>
    </section>
  );
}