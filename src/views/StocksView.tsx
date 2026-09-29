import React, { useState, useMemo } from 'react';
import { STOCKS_DATA } from '../data/mockMarketData';
import { Stock } from '../types/market';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  TrendingUp, 
  TrendingDown, 
  ExternalLink,
  Download,
  Building2
} from 'lucide-react';

interface StocksViewProps {
  onSelectStock: (symbol: string) => void;
}

export const StocksView: React.FC<StocksViewProps> = ({ onSelectStock }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [sortField, setSortField] = useState<keyof Stock>('marketCapCr');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const pageSize = 12;

  // Unique sectors
  const sectors = useMemo(() => {
    const list = Array.from(new Set(STOCKS_DATA.map(s => s.sector)));
    return ['All', ...list];
  }, []);

  // Filtered and sorted stocks
  const filteredStocks = useMemo(() => {
    return STOCKS_DATA.filter(stock => {
      const matchSearch =
        stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
        stock.name.toLowerCase().includes(search.toLowerCase()) ||
        stock.sector.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        selectedCategory === 'All' || stock.category === selectedCategory;

      const matchSec =
        selectedSector === 'All' || stock.sector === selectedSector;

      return matchSearch && matchCat && matchSec;
    }).sort((a, b) => {
      const valA = a[sortField] ?? 0;
      const valB = b[sortField] ?? 0;
      if (typeof valA === 'string' && typeof valB === 'string') {
        return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return sortOrder === 'asc'
        ? Number(valA) - Number(valB)
        : Number(valB) - Number(valA);
    });
  }, [search, selectedCategory, selectedSector, sortField, sortOrder]);

  const totalPages = Math.ceil(filteredStocks.length / pageSize) || 1;
  const paginatedStocks = filteredStocks.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: keyof Stock) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Symbol,Company Name,Sector,LTP,Change,Percent Change,Volume,Market Cap Cr,PE,52W High,52W Low'];
    const rows = filteredStocks.map(
      s =>
        `"${s.symbol}","${s.name}","${s.sector}",${s.ltp},${s.change},${s.pChange},${s.volume},${s.marketCapCr},${s.pe},${s.high52},${s.low52}`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `BFX_Equity_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Equity Securities Directory
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
              Cash Market
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time quotes, technical ranges, valuation multiples, and institutional trading metrics
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#002b5b] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by symbol, company name, or sector..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002b5b] text-slate-900 placeholder:text-slate-400"
            />
          </div>

          {/* Market Cap Category Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={e => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002b5b] text-slate-800 bg-white"
            >
              <option value="All">All Market Caps</option>
              <option value="LargeCap">Large Cap (Top 100)</option>
              <option value="MidCap">Mid Cap (101 - 250)</option>
              <option value="SmallCap">Small Cap (251+)</option>
            </select>
          </div>

          {/* Sector Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedSector}
              onChange={e => {
                setSelectedSector(e.target.value);
                setPage(1);
              }}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002b5b] text-slate-800 bg-white"
            >
              {sectors.map(sec => (
                <option key={sec} value={sec}>
                  {sec === 'All' ? 'All Sectors' : sec}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-1.5 pt-1 overflow-x-auto text-[11px] font-semibold text-slate-600">
          <span className="text-slate-400 font-normal mr-1">Quick Filter:</span>
          {['All', 'LargeCap', 'MidCap', 'SmallCap'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setPage(1);
              }}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#002b5b] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat === 'All' ? 'All Equities' : cat}
            </button>
          ))}
          <span className="ml-auto text-slate-400 font-mono-nums">
            Total {filteredStocks.length} Securities
          </span>
        </div>
      </div>

      {/* Main Stock Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[11px] tracking-wider select-none">
                <th
                  className="py-3 px-3.5 cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('symbol')}
                >
                  <div className="flex items-center gap-1">
                    <span>Company & Symbol</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('sector')}
                >
                  <div className="flex items-center gap-1">
                    <span>Sector</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('ltp')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>LTP (₹)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('change')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Change</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('pChange')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>% Chg</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Day's Range (L - H)</th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('volume')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Volume</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('marketCapCr')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Mkt Cap (₹ Cr)</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort('pe')}
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>P/E</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-3 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-nums">
              {paginatedStocks.map(stock => {
                const isPositive = stock.change >= 0;
                const dayRange = stock.high - stock.low || 1;
                const dayProgress = Math.min(100, Math.max(0, ((stock.ltp - stock.low) / dayRange) * 100));

                return (
                  <tr
                    key={stock.symbol}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectStock(stock.symbol)}
                  >
                    <td className="py-3 px-3.5 font-sans">
                      <div className="font-bold text-slate-900 group-hover:text-[#002b5b] flex items-center gap-1.5">
                        <span>{stock.name}</span>
                        <span className="text-[10px] font-semibold px-1 py-0.2 rounded bg-slate-100 text-slate-600">
                          {stock.category}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono-nums">
                        {stock.symbol} · {stock.isin}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-slate-600 font-sans text-xs">
                      {stock.sector}
                    </td>

                    <td className="py-3 px-3 text-right font-black text-slate-900">
                      ₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td
                      className={`py-3 px-3 text-right font-bold ${
                        isPositive ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {stock.change.toFixed(2)}
                    </td>

                    <td className="py-3 px-3 text-right">
                      <span
                        className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {stock.pChange.toFixed(2)}%
                      </span>
                    </td>

                    {/* Day Range Visual */}
                    <td className="py-3 px-3 text-center min-w-[130px]">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>{stock.low.toFixed(1)}</span>
                        <span>{stock.high.toFixed(1)}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#002b5b] rounded-full"
                          style={{ width: `${dayProgress}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3 px-3 text-right text-slate-700">
                      {stock.volume.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-700 font-bold">
                      {stock.marketCapCr.toLocaleString('en-IN', { minimumFractionDigits: 1 })}
                    </td>

                    <td className="py-3 px-3 text-right text-slate-700">
                      {stock.pe.toFixed(1)}
                    </td>

                    <td className="py-3 px-3 text-center font-sans" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => onSelectStock(stock.symbol)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#002b5b] bg-slate-100 hover:bg-[#002b5b] hover:text-white rounded transition-colors inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredStocks.length)} of{' '}
            {filteredStocks.length} entries
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx + 1)}
                className={`w-7 h-7 rounded font-semibold text-xs transition-colors ${
                  page === idx + 1
                    ? 'bg-[#002b5b] text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-2.5 py-1 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed font-semibold"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
