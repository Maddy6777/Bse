import React, { useState } from 'react';
import { STOCKS_DATA } from '../data/mockMarketData';
import { 
  Building2, 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  FileText,
  ShieldCheck 
} from 'lucide-react';

interface CompaniesViewProps {
  onSelectStock: (symbol: string) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({ onSelectStock }) => {
  const [search, setSearch] = useState('');

  const filtered = STOCKS_DATA.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Listed Companies Directory
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
              Corporate Registry
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Directory of corporate issuers admitted to dealings on the Mainboard and SME platforms of BFX
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search company name, symbol, or sector..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <th className="py-3 px-4">Company Name</th>
                <th className="py-3 px-3">Symbol</th>
                <th className="py-3 px-3">ISIN Code</th>
                <th className="py-3 px-3">Sector & Industry</th>
                <th className="py-3 px-3 text-right">Market Cap (₹ Cr)</th>
                <th className="py-3 px-3 text-center">Compliance</th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-nums">
              {filtered.map(stock => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => onSelectStock(stock.symbol)}
                >
                  <td className="py-3.5 px-4 font-sans font-bold text-slate-900">
                    {stock.name}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-[#002b5b]">{stock.symbol}</td>
                  <td className="py-3.5 px-3 text-slate-600 text-[11px]">{stock.isin}</td>
                  <td className="py-3.5 px-3 font-sans text-slate-700">{stock.sector}</td>
                  <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                    {stock.marketCapCr.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                  </td>
                  <td className="py-3.5 px-3 text-center font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      Compliant
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-center font-sans" onClick={e => e.stopPropagation()}>
                    <button
                      onClick={() => onSelectStock(stock.symbol)}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#002b5b] bg-slate-100 hover:bg-[#002b5b] hover:text-white rounded transition-colors inline-flex items-center gap-1"
                    >
                      <span>Profile</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
