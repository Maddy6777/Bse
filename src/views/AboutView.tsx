import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Cpu, 
  Globe2, 
  History, 
  Users, 
  CheckCircle2 
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Hero */}
      <div className="bg-[#002b5b] text-white p-8 rounded-2xl shadow-sm space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
          ESTABLISHED 1888 · OVER A CENTURY OF MARKET LEADERSHIP
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
          Bharat Financial Exchange (BFX)
        </h1>
        <p className="text-slate-200 text-sm max-w-3xl leading-relaxed">
          As one of Asia’s oldest and most prestigious securities exchanges, BFX provides an institutional-grade, transparent, and ultra-low latency marketplace for equities, debt, derivatives, mutual funds, and currency instruments.
        </p>
      </div>

      {/* Key Milestones & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl font-black font-mono-nums text-[#002b5b]">1888</div>
          <h3 className="font-bold text-slate-900 text-sm">Founded in Mumbai</h3>
          <p className="text-slate-500 leading-relaxed">Established as the Native Share and Stock Brokers trading pavilion on Dalal Street.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl font-black font-mono-nums text-[#002b5b]">6 Microsecs</div>
          <h3 className="font-bold text-slate-900 text-sm">Ultra-Low Latency</h3>
          <p className="text-slate-500 leading-relaxed">High-performance matching engine executing over 500 million orders per trading day.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl font-black font-mono-nums text-[#002b5b]">5,400+</div>
          <h3 className="font-bold text-slate-900 text-sm">Listed Enterprises</h3>
          <p className="text-slate-500 leading-relaxed">The broadest capital formation platform powering India's multi-trillion dollar economy.</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="text-2xl font-black font-mono-nums text-[#002b5b]">100M+</div>
          <h3 className="font-bold text-slate-900 text-sm">Registered Investors</h3>
          <p className="text-slate-500 leading-relaxed">Connecting retail savers, mutual funds, domestic institutions, and global foreign funds.</p>
        </div>
      </div>

      {/* Corporate Governance & Tech Architecture */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            Market Integrity & Surveillance
          </h2>
          <p>
            BFX operates a multi-layered real-time market surveillance mechanism utilizing pattern recognition and anomaly detection algorithms to identify unusual price-volume behaviors, insider activity, and market manipulation attempts.
          </p>
          <p>
            All trading members adhere strictly to SEBI regulations, capital adequacy norms, segregation of client collateral, and cyber security framework directives.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-sky-600" />
            Exchange Technology & Co-Location
          </h2>
          <p>
            The BFX automated trading architecture incorporates Tier IV fault-tolerant data center infrastructure with synchronous hot-standby disaster recovery facilities situated in distinct seismic zones.
          </p>
          <p>
            Co-location facilities at the primary data center provide high-frequency market participants with 10Gbps low-latency connectivity for direct market access (DMA) and algorithmic order processing.
          </p>
        </div>
      </div>
    </div>
  );
};
