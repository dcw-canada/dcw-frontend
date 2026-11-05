'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

type Inquiry = {
  _id: string;
  name: string;
  email: string;
  message: string;
};

type Service = {
  _id: string;
  title: string;
  description: string;
  image?: string;
};

export default function AdminPanel() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<{ title: string; description: string; image: string }>({
    title: '',
    description: '',
    image: 'default.jpg',
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from Fastify backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const inqRes = await api.get('/inquiries');
        const srvRes = await api.get('/services');
        setInquiries(inqRes.data);
        setServices(srvRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/services', newService);
      setServices([...services, res.data]);
      setNewService({ title: '', description: '', image: 'default.jpg' });
      alert('Service added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add service');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-xl font-bold text-[var(--brand-blue)]">Loading Admin Data...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--brand-blue)]">DCW Admin Dashboard</h1>
          <Link href="/" className="text-blue-600 hover:underline font-medium">← Back to Website</Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Inquiries Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Recent Contact Inquiries</h2>
            {inquiries.length === 0 ? <p className="text-gray-500">No inquiries yet. Try submitting one from the home page!</p> : (
              <ul className="space-y-4 max-h-[500px] overflow-y-auto">
                {inquiries.map((inq: any) => (
                  <li key={inq._id} className="border-b pb-2">
                    <p className="font-semibold text-gray-800">{inq.name} <span className="text-sm font-normal text-gray-500">({inq.email})</span></p>
                    <p className="text-sm text-gray-600 mt-1">{inq.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Add Service Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Manage Services</h2>
            <form onSubmit={handleAddService} className="mb-6 space-y-3">
              <input 
                type="text" placeholder="Service Title (e.g., Freight Forwarding)" required
                className="w-full border p-2 rounded focus:outline-[var(--brand-blue)]"
                value={newService.title} onChange={(e) => setNewService({...newService, title: e.target.value})}
              />
              <textarea 
                placeholder="Description" required rows={3}
                className="w-full border p-2 rounded focus:outline-[var(--brand-blue)]"
                value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})}
              />
              <button type="submit" className="bg-[var(--brand-blue)] text-white px-4 py-2 rounded hover:bg-blue-900 w-full transition font-bold">
                Add New Service
              </button>
            </form>

            <h3 className="font-bold text-gray-700 mb-2">Current Services in DB:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {services.map((srv: any) => (
                <li key={srv._id} className="text-gray-600">{srv.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}