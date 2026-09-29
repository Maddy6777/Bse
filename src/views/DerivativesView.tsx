import React, { useState } from 'react';
import { MOCK_OPTION_CHAIN } from '../data/mockMarketData';
import { OptionContract } from '../types/market';
import { 
  TrendingUp, 
  TrendingDown, 
  Filter, 
  Layers, 
  Info, 
  Calendar, 
  Download,
  AlertCircle
} from 'lucide-react';

export const DerivativesView: React.FC = () => {
  const [underlying, setUnderlying] = useState<'BFX50' | 'BANKEX' | 'RELIANCE'>('BFX50');
  const [expiry, setExpiry] = useState<string>('01 Oct 2026 (Weekly)');
  const [strikeFilter, setStrikeFilter] = useState<string>('All');
  const spotPrice = 25215.40;

  // Totals for analytics
  const totalCallOI = MOCK_OPTION_CHAIN.reduce((acc, row) => acc + row.callOI, 0);
  const totalPutOI = MOCK_OPTION_CHAIN.reduce((acc, row) => acc + row.putOI, 0);
  const pcrRatio = (totalPutOI / (totalCallOI || 1)).toFixed(2);

  const filteredChains = MOCK_OPTION_CHAIN.filter(row => {
    if (strikeFilter === 'NearATM') {
      return Math.abs(row.strikePrice - spotPrice) <= 300;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Equity Derivatives & Live Option Chain
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 border border-indigo-200">
              F&O Segment
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time open interest distribution, implied volatility surfaces, and multi-strike bid/ask analytics
          </p>
        </div>

        {/* Underlying Selector & Expiry */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div>
            <select
              value={underlying}
              onChange={e => setUnderlying(e.target.value as any)}
              className="py-1.5 px-3 text-xs font-bold border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002b5b]"
            >
              <option value="BFX50">BFX 50 Index</option>
              <option value="BANKEX">BFX BANKEX</option>
              <option value="RELIANCE">RELIANCE IND.</option>
            </select>
          </div>

          <div>
            <select
              value={expiry}
              onChange={e => setExpiry(e.target.value)}
              className="py-1.5 px-3 text-xs font-semibold border border-slate-300 rounded-lg bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#002b5b]"
            >
              <option value="01 Oct 2026 (Weekly)">01 Oct 2026 (Weekly Expiry)</option>
              <option value="08 Oct 2026 (Weekly)">08 Oct 2026 (Weekly Expiry)</option>
              <option value="29 Oct 2026 (Monthly)">29 Oct 2026 (Monthly Expiry)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spot Price & F&O Metric Summary Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 font-mono-nums text-xs">
        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Spot Price</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">
            {spotPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold">+148.85 (+0.59%)</div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Put-Call Ratio (PCR)</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">{pcrRatio}</div>
          <div className="text-[10px] text-emerald-600 font-bold">Bullish Bias (&gt; 1.0)</div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Max Pain Strike</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">25,200.00</div>
          <div className="text-[10px] text-slate-500 font-sans">Options Expiry Pin</div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Total Call OI (Shares)</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">
            {(totalCallOI / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[10px] text-slate-500 font-sans">Resistance: 25,500</div>
        </div>

        <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs col-span-2 sm:col-span-1">
          <div className="text-[10px] text-slate-400 uppercase font-sans font-semibold">Total Put OI (Shares)</div>
          <div className="text-lg font-black text-slate-900 mt-0.5">
            {(totalPutOI / 100000).toFixed(1)} Lakhs
          </div>
          <div className="text-[10px] text-slate-500 font-sans">Support: 25,000</div>
        </div>
      </div>

      {/* Option Chain Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Table Top Controls & Legend */}
        <div className="p-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-800">Filter Strikes:</span>
            <button
              onClick={() => setStrikeFilter('All')}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                strikeFilter === 'All' ? 'bg-[#002b5b] text-white' : 'bg-white border text-slate-700'
              }`}
            >
              All Strikes
            </button>
            <button
              onClick={() => setStrikeFilter('NearATM')}
              className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer ${
                strikeFilter === 'NearATM' ? 'bg-[#002b5b] text-white' : 'bg-white border text-slate-700'
              }`}
            >
              ± 300 Pts Around ATM
            </button>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-[#fef9c3] border border-amber-300"></span>
              <span>In The Money (ITM) Shading</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-white border border-slate-300"></span>
              <span>Out of The Money (OTM)</span>
            </div>
          </div>
        </div>

        {/* High-density Option Chain Grid */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-center text-xs border-collapse font-mono-nums">
            <thead>
              {/* Primary Dual Super Header */}
              <tr className="border-b border-slate-300 uppercase text-[11px] font-bold">
                <th colSpan={6} className="py-2 bg-emerald-50 text-emerald-800 border-r border-slate-300">
                  CALL OPTIONS (CE)
                </th>
                <th className="py-2 bg-[#002b5b] text-white px-4 border-r border-slate-300">
                  STRIKE
                </th>
                <th colSpan={6} className="py-2 bg-rose-50 text-rose-800">
                  PUT OPTIONS (PE)
                </th>
              </tr>

              {/* Secondary Column Headers */}
              <tr className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-300 text-[10px] uppercase">
                {/* Calls */}
                <th className="py-2 px-2 text-right">OI</th>
                <th className="py-2 px-2 text-right">Chg OI</th>
                <th className="py-2 px-2 text-right">Volume</th>
                <th className="py-2 px-2 text-right">IV%</th>
                <th className="py-2 px-2 text-right font-bold text-slate-900">LTP (₹)</th>
                <th className="py-2 px-2 text-right border-r border-slate-300">Net Chg</th>

                {/* Strike */}
                <th className="py-2 px-4 bg-slate-200 text-slate-900 font-bold border-r border-slate-300">
                  Strike Price
                </th>

                {/* Puts */}
                <th className="py-2 px-2 text-left font-bold text-slate-900">LTP (₹)</th>
                <th className="py-2 px-2 text-left">Net Chg</th>
                <th className="py-2 px-2 text-left">IV%</th>
                <th className="py-2 px-2 text-left">Volume</th>
                <th className="py-2 px-2 text-left">Chg OI</th>
                <th className="py-2 px-2 text-left">OI</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {filteredChains.map(row => {
                // Call ITM if strike < spot
                const isCallITM = row.strikePrice < spotPrice;
                // Put ITM if strike > spot
                const isPutITM = row.strikePrice > spotPrice;
                const isATM = Math.abs(row.strikePrice - spotPrice) <= 50;

                return (
                  <tr
                    key={row.strikePrice}
                    className={`hover:bg-sky-50/70 transition-colors ${
                      isATM ? 'ring-2 ring-[#002b5b] font-bold z-10 relative' : ''
                    }`}
                  >
                    {/* CALLS SIDE */}
                    <td className={`py-2 px-2 text-right text-slate-600 ${isCallITM ? 'bg-amber-50/70' : ''}`}>
                      {row.callOI.toLocaleString('en-IN')}
                    </td>
                    <td
                      className={`py-2 px-2 text-right ${
                        row.callChgOI >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      } ${isCallITM ? 'bg-amber-50/70' : ''}`}
                    >
                      {row.callChgOI >= 0 ? '+' : ''}
                      {row.callChgOI.toLocaleString('en-IN')}
                    </td>
                    <td className={`py-2 px-2 text-right text-slate-500 ${isCallITM ? 'bg-amber-50/70' : ''}`}>
                      {row.callVolume.toLocaleString('en-IN')}
                    </td>
                    <td className={`py-2 px-2 text-right text-slate-500 ${isCallITM ? 'bg-amber-50/70' : ''}`}>
                      {row.callIV.toFixed(1)}
                    </td>
                    <td
                      className={`py-2 px-2 text-right font-black text-slate-900 ${
                        isCallITM ? 'bg-amber-50/70' : ''
                      }`}
                    >
                      ₹{row.callLTP.toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-2 text-right font-bold border-r border-slate-300 ${
                        row.callNetChg >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      } ${isCallITM ? 'bg-amber-50/70' : ''}`}
                    >
                      {row.callNetChg >= 0 ? '+' : ''}
                      {row.callNetChg.toFixed(2)}
                    </td>

                    {/* STRIKE PRICE CENTER */}
                    <td
                      className={`py-2 px-4 font-black border-r border-slate-300 ${
                        isATM ? 'bg-[#002b5b] text-white shadow-xs' : 'bg-slate-100 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span>{row.strikePrice.toLocaleString('en-IN')}</span>
                        {isATM && <span className="text-[9px] bg-amber-400 text-slate-900 px-1 rounded font-sans">ATM</span>}
                      </div>
                    </td>

                    {/* PUTS SIDE */}
                    <td
                      className={`py-2 px-2 text-left font-black text-slate-900 ${
                        isPutITM ? 'bg-amber-50/70' : ''
                      }`}
                    >
                      ₹{row.putLTP.toFixed(2)}
                    </td>
                    <td
                      className={`py-2 px-2 text-left font-bold ${
                        row.putNetChg >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      } ${isPutITM ? 'bg-amber-50/70' : ''}`}
                    >
                      {row.putNetChg >= 0 ? '+' : ''}
                      {row.putNetChg.toFixed(2)}
                    </td>
                    <td className={`py-2 px-2 text-left text-slate-500 ${isPutITM ? 'bg-amber-50/70' : ''}`}>
                      {row.putIV.toFixed(1)}
                    </td>
                    <td className={`py-2 px-2 text-left text-slate-500 ${isPutITM ? 'bg-amber-50/70' : ''}`}>
                      {row.putVolume.toLocaleString('en-IN')}
                    </td>
                    <td
                      className={`py-2 px-2 text-left ${
                        row.putChgOI >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      } ${isPutITM ? 'bg-amber-50/70' : ''}`}
                    >
                      {row.putChgOI >= 0 ? '+' : ''}
                      {row.putChgOI.toLocaleString('en-IN')}
                    </td>
                    <td className={`py-2 px-2 text-left text-slate-600 ${isPutITM ? 'bg-amber-50/70' : ''}`}>
                      {row.putOI.toLocaleString('en-IN')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between">
          <span>Option contracts lot size for BFX 50: 25 Units · Cash Settled</span>
          <span>Data updated on every trade tick</span>
        </div>
      </div>
    </div>
  );
};
