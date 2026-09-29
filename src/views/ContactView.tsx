import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', queryType: 'General', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', phone: '', queryType: 'General', message: '' });
    }, 4000);
  };

  const offices = [
    {
      city: 'Mumbai (Head Office)',
      address: 'BFX Towers, Dalal Marg, Fort, Mumbai - 400 001, Maharashtra',
      phone: '+91-22-2272-1233 / 1234',
      email: 'corp.comm@bfxindia.com',
    },
    {
      city: 'New Delhi (Northern Regional Office)',
      address: 'Indraprastha Financial Center, Barakhamba Road, Connaught Place, New Delhi - 110 001',
      phone: '+91-11-4152-4400',
      email: 'delhi.office@bfxindia.com',
    },
    {
      city: 'Kolkata (Eastern Regional Office)',
      address: 'Bengal Financial Hub, Salt Lake Sector V, Kolkata - 700 091, West Bengal',
      phone: '+91-33-2282-1361',
      email: 'kolkata.office@bfxindia.com',
    },
    {
      city: 'Chennai (Southern Regional Office)',
      address: 'Mount Financial Chambers, Anna Salai, Chennai - 600 002, Tamil Nadu',
      phone: '+91-44-2841-5141',
      email: 'chennai.office@bfxindia.com',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
        <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
          Contact Bharat Financial Exchange
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Registered Headquarters, Regional Investor Centers, and Helpdesk Support
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900">Exchange Helpdesk & Inquiry</h2>
          <p className="text-xs text-slate-500">
            For listing inquiries, membership compliance, or trading infrastructure queries
          </p>

          {sent ? (
            <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950 text-sm">Message Transmitted</h3>
              <p className="text-xs text-emerald-800">
                Your communication has been dispatched to the appropriate department desk.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Department / Query Type
                  </label>
                  <select
                    value={form.queryType}
                    onChange={e => setForm({ ...form, queryType: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="General">General Inquiries</option>
                    <option value="Listing">Company Listing & IPO</option>
                    <option value="Membership">Trading Membership</option>
                    <option value="MarketData">Market Data Feed API</option>
                    <option value="Media">Media & Press Relations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Message Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Detail your inquiry or service request..."
                  className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#002b5b] hover:bg-[#003875] text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>

        {/* Toll-free & Regional Centers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#002b5b] text-white p-5 rounded-xl space-y-3 text-xs">
            <h3 className="font-bold text-sm text-sky-300">Toll Free Investor Care</h3>
            <div className="text-xl font-mono-nums font-black">1800-22-BFX (239)</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Available 08:30 to 18:30 IST on all trading days for assistance in English, Hindi, and regional languages.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">Regional Offices</h3>
            <div className="space-y-3.5 divide-y divide-slate-100">
              {offices.map((off, i) => (
                <div key={i} className="pt-2 first:pt-0 space-y-1">
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-sky-600" />
                    <span>{off.city}</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{off.address}</p>
                  <div className="text-[11px] text-slate-500 font-mono-nums flex gap-3">
                    <span>{off.phone}</span>
                    <span>·</span>
                    <span>{off.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
