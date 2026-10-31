export default function Footer() {
  return (
    <footer className="bg-[var(--brand-blue)] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">DCW Solutions Inc.</h2>
        <p className="mb-6 text-gray-300">Delivery. Clearance. Warehousing.</p>
        <div className="flex justify-center gap-4 mb-10">
           <a href="mailto:info@dcwsolution.ca" className="bg-[var(--brand-yellow)] text-black px-6 py-2 rounded font-bold hover:bg-yellow-400 transition">Email Us</a>
        </div>
        <p className="text-sm text-gray-400">© 2024 DCW Solutions Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}