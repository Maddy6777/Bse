import React, { useState } from 'react';
import { MOCK_CORPORATE_ACTIONS } from '../data/mockMarketData';
import { CorporateAction } from '../types/market';
import { 
  Building2, 
  Calendar, 
  Search, 
  Filter, 
  Download, 
  Award, 
  Percent, 
  DollarSign, 
  CheckCircle 
} from 'lucide-react';

export const CorporateActionsView: React.FC = () => {
  const [filterPurpose, setFilterPurpose] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredActions = MOCK_CORPORATE_ACTIONS.filter(act => {
    const matchPurpose = filterPurpose === 'All' || act.purpose === filterPurpose;
    const matchSearch =
      act.symbol.toLowerCase().includes(search.toLowerCase()) ||
      act.companyName.toLowerCase().includes(search.toLowerCase());
    return matchPurpose && matchSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Corporate Actions & Entitlements
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              Shareholder Rights
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official records of Dividends, Bonus Issues, Stock Splits, Rights Offerings, and Board Meeting agendas
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Filter by company name or stock symbol..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div className="md:col-span-4">
            <select
              value={filterPurpose}
              onChange={e => setFilterPurpose(e.target.value)}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg bg-white text-slate-800"
            >
              <option value="All">All Corporate Actions</option>
              <option value="Dividend">Dividends Only</option>
              <option value="Bonus">Bonus Issues</option>
              <option value="Stock Split">Stock Splits</option>
              <option value="Rights">Rights Issues</option>
              <option value="Board Meeting">Board Meetings</option>
            </select>
          </div>
        </div>

        {/* Quick Purpose Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-semibold text-slate-600 pt-1">
          {['All', 'Dividend', 'Bonus', 'Stock Split', 'Rights', 'Board Meeting'].map(p => (
            <button
              key={p}
              onClick={() => setFilterPurpose(p)}
              className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                filterPurpose === p
                  ? 'bg-[#002b5b] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <th className="py-3 px-4">Company Name & Symbol</th>
                <th className="py-3 px-3">Purpose</th>
                <th className="py-3 px-4">Entitlement Details</th>
                <th className="py-3 px-3">Ex-Date</th>
                <th className="py-3 px-3">Record Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-nums">
              {filteredActions.map(action => (
                <tr key={action.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-sans">
                    <div className="font-bold text-slate-900">{action.companyName}</div>
                    <div className="text-[11px] text-slate-500 font-mono-nums">{action.symbol}</div>
                  </td>
                  <td className="py-3 px-3 font-sans">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-[11px] font-bold ${
                        action.purpose === 'Dividend'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : action.purpose === 'Bonus'
                          ? 'bg-sky-50 text-sky-800 border border-sky-200'
                          : action.purpose === 'Stock Split'
                          ? 'bg-purple-50 text-purple-800 border border-purple-200'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      {action.purpose}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-800 font-medium">
                    {action.details}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">{action.exDate}</td>
                  <td className="py-3 px-3 text-slate-600">{action.recordDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
