'use client';
import { useState } from 'react';
import axios from 'axios';
import { Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      // CONNECTING TO FASTIFY BACKEND
      await axios.post('http://localhost:5000/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-[var(--brand-blue)] mb-4">Get in Touch</h2>
          <p className="text-gray-600">Ready to streamline your supply chain? Send us a message and our team will get back to you shortly.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-50 p-8 rounded-xl shadow-sm border">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" required
                className="w-full border p-3 rounded-md focus:outline-[var(--brand-blue)]"
                value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" required
                className="w-full border p-3 rounded-md focus:outline-[var(--brand-blue)]"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              required rows={4}
              className="w-full border p-3 rounded-md focus:outline-[var(--brand-blue)]"
              value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>
          <button 
            type="submit" disabled={status === 'loading'}
            className="w-full bg-[var(--brand-blue)] text-white font-bold py-3 rounded-md hover:bg-blue-900 transition flex items-center justify-center gap-2"
          >
            {status === 'loading' ? 'Sending...' : <><Send size={18} /> Send Message</>}
          </button>
          
          {status === 'success' && <p className="text-green-600 text-center font-medium">Message sent successfully! We will contact you soon.</p>}
          {status === 'error' && <p className="text-red-600 text-center font-medium">Something went wrong. Please try again.</p>}
        </form>
      </div>
    </section>
  );
}