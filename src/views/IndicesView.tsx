import React, { useState } from 'react';
import { MAJOR_INDICES } from '../data/mockMarketData';
import { MarketIndex } from '../types/market';
import { StockChart } from '../components/StockChart';
import { 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  BarChart2, 
  PieChart, 
  Download, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface IndicesViewProps {
  initialIndexSymbol?: string;
  onSelectIndexStock?: (symbol: string) => void;
}

export const IndicesView: React.FC<IndicesViewProps> = ({
  initialIndexSymbol,
  onSelectIndexStock,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<MarketIndex>(
    MAJOR_INDICES.find(idx => idx.symbol === initialIndexSymbol) || MAJOR_INDICES[0]
  );
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Broad' | 'Sectoral'>('All');

  const filteredIndices = MAJOR_INDICES.filter(
    idx => categoryFilter === 'All' || idx.category === categoryFilter
  );

  const isPositive = selectedIndex.change >= 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Benchmark Indices & Sectoral Barometers
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Live Real-Time
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Free-float market capitalization weighted indices tracking Indian capital formation across industry segments
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          {(['All', 'Broad', 'Sectoral'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-[#002b5b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat === 'All' ? 'All 12 Indices' : `${cat} Market`}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Index Detailed Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Chart of Selected Index */}
        <div className="lg:col-span-8">
          <StockChart
            title={`${selectedIndex.name} (${selectedIndex.symbol})`}
            basePrice={selectedIndex.current}
            isPositive={isPositive}
            height={360}
          />
        </div>

        {/* Right: Selected Index Fact Sheet */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
                  {selectedIndex.category} Benchmark
                </span>
                <span className="text-xs text-slate-400 font-mono-nums">Real-time Feed</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 mt-1.5">{selectedIndex.name}</h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-black font-mono-nums text-slate-900">
                  {selectedIndex.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-xs font-bold font-mono-nums ${
                    isPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {selectedIndex.change.toFixed(2)} ({selectedIndex.pChange.toFixed(2)}%)
                </span>
              </div>
            </div>

            {/* Statistics Grid */}
            <div className="space-y-2 text-xs font-mono-nums">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Open:</span>
                <strong className="text-slate-800">{selectedIndex.open.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Day High:</span>
                <strong className="text-emerald-700">{selectedIndex.high.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Day Low:</span>
                <strong className="text-rose-700">{selectedIndex.low.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Previous Close:</span>
                <strong className="text-slate-800">{selectedIndex.prevClose.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">52 Week High:</span>
                <strong className="text-slate-800">{selectedIndex.high52.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">52 Week Low:</span>
                <strong className="text-slate-800">{selectedIndex.low52.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">P/E Multiple:</span>
                <strong className="text-slate-800">{selectedIndex.pe.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500 font-sans">Dividend Yield:</span>
                <strong className="text-slate-800">{selectedIndex.divYield.toFixed(2)}%</strong>
              </div>
            </div>

            {/* Advances / Declines in this Index */}
            <div className="pt-1 space-y-1.5 text-xs font-mono-nums">
              <div className="flex justify-between text-[11px]">
                <span className="text-emerald-600 font-bold">Advances: {selectedIndex.advances}</span>
                <span className="text-rose-600 font-bold">Declines: {selectedIndex.declines}</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{
                    width: `${
                      (selectedIndex.advances / (selectedIndex.advances + selectedIndex.declines || 1)) * 100
                    }%`,
                  }}
                />
                <div
                  className="bg-rose-500 h-full"
                  style={{
                    width: `${
                      (selectedIndex.declines / (selectedIndex.advances + selectedIndex.declines || 1)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-slate-500">
            Computed using free-float market capitalisation method with base date 1978-79.
          </div>
        </div>
      </div>

      {/* Grid of All 12 Indices */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          All Indices ({filteredIndices.length})
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredIndices.map(idx => {
            const isSelected = selectedIndex.id === idx.id;
            const pos = idx.change >= 0;
            return (
              <div
                key={idx.id}
                onClick={() => setSelectedIndex(idx)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'bg-white border-[#002b5b] shadow-md ring-2 ring-[#002b5b]/20'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{idx.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">
                      {idx.category} · {idx.symbol}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-bold font-mono-nums px-1.5 py-0.5 rounded ${
                      pos ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}
                  >
                    {pos ? '+' : ''}
                    {idx.pChange.toFixed(2)}%
                  </span>
                </div>

                <div>
                  <div className="text-xl font-black font-mono-nums text-slate-900">
                    {idx.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </div>
                  <div className={`text-xs font-bold font-mono-nums ${pos ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {pos ? '+' : ''}
                    {idx.change.toFixed(2)} today
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] font-mono-nums text-slate-500">
                  <span>H: {idx.high.toFixed(1)}</span>
                  <span>L: {idx.low.toFixed(1)}</span>
                  <span>PE: {idx.pe.toFixed(1)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
