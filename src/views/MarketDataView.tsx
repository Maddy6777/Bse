import React, { useState } from 'react';
import { STOCKS_DATA } from '../data/mockMarketData';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  Search, 
  CheckCircle2, 
  Database, 
  Coins, 
  TrendingUp, 
  ShieldCheck,
  Building
} from 'lucide-react';

export const MarketDataView: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState<'Equity' | 'Derivatives' | 'Currency' | 'Debt' | 'ETFs'>('Equity');
  const [selectedDate, setSelectedDate] = useState('2026-09-28');
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Generate Bhavcopy CSV file for users
  const handleDownloadBhavcopy = () => {
    const headers = ['SYMBOL,SERIES,OPEN,HIGH,LOW,CLOSE,LAST,PREVCLOSE,TOTTRDQTY,TOTTRDVAL,TIMESTAMP,TOTALTRADES,ISIN'];
    const rows = STOCKS_DATA.map(
      s =>
        `${s.symbol},EQ,${s.open.toFixed(2)},${s.high.toFixed(2)},${s.low.toFixed(2)},${s.ltp.toFixed(2)},${s.ltp.toFixed(2)},${s.previousClose.toFixed(2)},${s.volume},${(s.valueCr * 10000000).toFixed(0)},${selectedDate},${Math.floor(s.volume / 85)},${s.isin}`
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BFX_BHAVCOPY_EQ_${selectedDate.replace(/-/g, '')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const filteredItems = STOCKS_DATA.filter(
    s =>
      s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Market Data & Official Bhav Copy
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
              End of Day Dispatches
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official trade logs, settlement files, turnover statistics, and historical archives across all exchange segments
          </p>
        </div>

        <button
          onClick={handleDownloadBhavcopy}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#002b5b] hover:bg-[#003875] rounded-lg transition-colors shadow-xs cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Download Daily Bhavcopy (CSV)</span>
        </button>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Official Bhavcopy file generated and downloaded successfully.</span>
        </div>
      )}

      {/* Segment Selector & Date Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          {/* Segments */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold overflow-x-auto">
            {(['Equity', 'Derivatives', 'Currency', 'Debt', 'ETFs'] as const).map(seg => (
              <button
                key={seg}
                onClick={() => setSelectedSegment(seg)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  selectedSegment === seg
                    ? 'bg-[#002b5b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {seg} Segment
              </button>
            ))}
          </div>

          {/* Date Picker */}
          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="font-semibold text-slate-700">Trade Date:</span>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="py-1 px-2.5 border border-slate-300 rounded-lg text-xs text-slate-900 font-mono-nums"
            />
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Filter by company name or stock symbol..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Bhavcopy Table Display */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800">
            {selectedSegment} Segment Bhavcopy Records for {selectedDate}
          </span>
          <span className="font-mono-nums text-slate-500">
            Total {filteredItems.length} records found
          </span>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse font-mono-nums">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                <th className="py-2.5 px-3 font-sans">Symbol</th>
                <th className="py-2.5 px-3 font-sans">Series</th>
                <th className="py-2.5 px-3 text-right">Open (₹)</th>
                <th className="py-2.5 px-3 text-right">High (₹)</th>
                <th className="py-2.5 px-3 text-right">Low (₹)</th>
                <th className="py-2.5 px-3 text-right">Close (₹)</th>
                <th className="py-2.5 px-3 text-right">Prev Close (₹)</th>
                <th className="py-2.5 px-3 text-right">Total Traded Qty</th>
                <th className="py-2.5 px-3 text-right">Total Turnover (₹ Cr)</th>
                <th className="py-2.5 px-3 text-center">ISIN</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map(stock => (
                <tr key={stock.symbol} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{stock.symbol}</td>
                  <td className="py-2.5 px-3 text-slate-500 font-sans">EQ</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{stock.open.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">{stock.high.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-rose-600 font-bold">{stock.low.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right font-black text-slate-900">{stock.ltp.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">{stock.previousClose.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{stock.volume.toLocaleString('en-IN')}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{stock.valueCr.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-center text-slate-500 text-[11px]">{stock.isin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
