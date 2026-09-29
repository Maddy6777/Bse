import React, { useState } from 'react';
import { 
  PieChart, 
  Search, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

export const MutualFundsView: React.FC = () => {
  const [filterType, setFilterType] = useState<'All' | 'ETF' | 'IndexFund' | 'Equity'>('All');

  const funds = [
    {
      symbol: 'BFX50BEES',
      name: 'Nippon India ETF BFX 50 BeES',
      category: 'ETF',
      nav: 268.45,
      change: 1.48,
      pChange: 0.55,
      aumCr: 32450.00,
      ter: '0.04%',
      returns1Y: '+24.8%',
      returns3Y: '+16.2%',
    },
    {
      symbol: 'BANKBEES',
      name: 'Nippon India ETF Bank BeES',
      category: 'ETF',
      nav: 592.10,
      change: 6.25,
      pChange: 1.07,
      aumCr: 14890.00,
      ter: '0.18%',
      returns1Y: '+18.5%',
      returns3Y: '+14.9%',
    },
    {
      symbol: 'GOLDBEES',
      name: 'Nippon India ETF Gold BeES',
      category: 'ETF',
      nav: 68.20,
      change: 0.32,
      pChange: 0.47,
      aumCr: 12400.00,
      ter: '0.78%',
      returns1Y: '+29.4%',
      returns3Y: '+18.1%',
    },
    {
      symbol: 'ITBEES',
      name: 'ICICI Prudential IT ETF',
      category: 'ETF',
      nav: 42.15,
      change: -0.18,
      pChange: -0.42,
      aumCr: 4120.00,
      ter: '0.22%',
      returns1Y: '+32.1%',
      returns3Y: '+12.4%',
    },
    {
      symbol: 'HDFCBF50',
      name: 'HDFC Index Fund - BFX 50 Plan',
      category: 'IndexFund',
      nav: 245.80,
      change: 1.35,
      pChange: 0.55,
      aumCr: 18500.00,
      ter: '0.20%',
      returns1Y: '+24.5%',
      returns3Y: '+16.0%',
    },
    {
      symbol: 'SBIBFXSNX',
      name: 'SBI SENSEX Index Fund Direct Growth',
      category: 'IndexFund',
      nav: 382.40,
      change: 2.24,
      pChange: 0.59,
      aumCr: 21900.00,
      ter: '0.19%',
      returns1Y: '+23.9%',
      returns3Y: '+15.8%',
    },
  ];

  const filtered = funds.filter(f => filterType === 'All' || f.category === filterType);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Exchange Traded Funds (ETFs) & Mutual Funds
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              BFX StAR MF Platform
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time listed ETFs on index benchmarks, gold, sectoral themes, and direct mutual fund redemption feeds
          </p>
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'All', label: 'All Funds & ETFs' },
            { id: 'ETF', label: 'Exchange Traded Funds' },
            { id: 'IndexFund', label: 'Index Funds' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setFilterType(t.id as any)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                filterType === t.id
                  ? 'bg-[#002b5b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse font-mono-nums">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <th className="py-3 px-4 font-sans">Scheme / ETF Name</th>
                <th className="py-3 px-3 font-sans">Category</th>
                <th className="py-3 px-3 text-right">NAV / Market Price (₹)</th>
                <th className="py-3 px-3 text-right">Change</th>
                <th className="py-3 px-3 text-right">Expense Ratio (TER)</th>
                <th className="py-3 px-3 text-right">AUM (₹ Cr)</th>
                <th className="py-3 px-3 text-right">1-Year Return</th>
                <th className="py-3 px-3 text-right">3-Year CAGR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(f => {
                const pos = f.change >= 0;
                return (
                  <tr key={f.symbol} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-sans">
                      <div className="font-bold text-slate-900">{f.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono-nums">{f.symbol}</div>
                    </td>
                    <td className="py-3.5 px-3 font-sans">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {f.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-black text-slate-900">
                      ₹{f.nav.toFixed(2)}
                    </td>
                    <td className={`py-3.5 px-3 text-right font-bold ${pos ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {pos ? '+' : ''}{f.change.toFixed(2)} ({f.pChange.toFixed(2)}%)
                    </td>
                    <td className="py-3.5 px-3 text-right text-slate-600">{f.ter}</td>
                    <td className="py-3.5 px-3 text-right text-slate-900 font-bold">
                      {f.aumCr.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-3 text-right font-bold text-emerald-600">{f.returns1Y}</td>
                    <td className="py-3.5 px-3 text-right font-bold text-emerald-600">{f.returns3Y}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
