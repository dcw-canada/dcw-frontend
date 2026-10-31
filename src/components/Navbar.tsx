import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image src="/images/logo.png" alt="DCW Solutions Logo" width={120} height={60} className="object-contain" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/#services" className="text-gray-700 hover:text-[var(--brand-blue)] font-medium transition">Services</Link>
            <Link href="/#contact" className="text-gray-700 hover:text-[var(--brand-blue)] font-medium transition">Contact</Link>
            <Link href="/admin" className="text-white bg-[var(--brand-blue)] px-4 py-2 rounded-md font-semibold hover:bg-blue-900 transition">Admin Panel</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}