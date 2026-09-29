import React, { useState } from 'react';
import { 
  MAJOR_INDICES, 
  STOCKS_DATA, 
  MOCK_IPOS, 
  MOCK_ANNOUNCEMENTS, 
  MOCK_NEWS 
} from '../data/mockMarketData';
import { StockChart } from '../components/StockChart';
import { MarketIndex, Stock } from '../types/market';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ChevronRight, 
  Building2, 
  Activity, 
  BarChart2, 
  ShieldCheck, 
  FileText, 
  Clock, 
  Calendar,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const [selectedIndex, setSelectedIndex] = useState<MarketIndex>(MAJOR_INDICES[0]);
  const [dashboardTab, setDashboardTab] = useState<'gainers' | 'losers' | 'active' | 'high52' | 'low52' | 'shockers'>('gainers');

  // Filter stocks for each dashboard category
  const topGainers = [...STOCKS_DATA].sort((a, b) => b.pChange - a.pChange).slice(0, 5);
  const topLosers = [...STOCKS_DATA].sort((a, b) => a.pChange - b.pChange).slice(0, 5);
  const mostActive = [...STOCKS_DATA].sort((a, b) => b.valueCr - a.valueCr).slice(0, 5);
  const week52High = STOCKS_DATA.filter(s => s.is52WHigh || s.high >= s.high52 * 0.98).slice(0, 5);
  const week52Low = STOCKS_DATA.filter(s => s.is52WLow || s.low <= s.low52 * 1.05).slice(0, 5);
  const volumeShockers = STOCKS_DATA.filter(s => s.isVolumeShocker || s.volume > 15000000).slice(0, 5);

  const getDashboardData = (): Stock[] => {
    switch (dashboardTab) {
      case 'gainers':
        return topGainers;
      case 'losers':
        return topLosers;
      case 'active':
        return mostActive;
      case 'high52':
        return week52High.length > 0 ? week52High : topGainers.slice(0, 4);
      case 'low52':
        return week52Low.length > 0 ? week52Low : topLosers.slice(0, 4);
      case 'shockers':
        return volumeShockers.length > 0 ? volumeShockers : mostActive.slice(0, 4);
      default:
        return topGainers;
    }
  };

  const currentDashboardList = getDashboardData();

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. HERO / MARKET OVERVIEW SECTION */}
      <section className="space-y-4">
        {/* Section Title & Live Status Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#002b5b] text-white">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black text-slate-900 tracking-tight">
                  Market Overview
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Market is Open
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Live trading session · Normal Equity Market (Rolling T+1 / T+0 Settlement)
              </p>
            </div>
          </div>

          {/* Advances / Declines Bar */}
          <div className="flex items-center gap-4 text-xs font-mono-nums">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Advances:</span>
              <strong className="text-emerald-600 font-bold">1,842</strong>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Declines:</span>
              <strong className="text-rose-600 font-bold">1,120</strong>
            </div>
            <div className="flex items-center gap-1.5 hidden sm:flex">
              <span className="text-slate-500 text-[11px]">Unchanged:</span>
              <strong className="text-slate-600 font-bold">94</strong>
            </div>
            <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden flex">
              <div className="bg-emerald-500 h-full" style={{ width: '60%' }} />
              <div className="bg-rose-500 h-full" style={{ width: '40%' }} />
            </div>
          </div>
        </div>

        {/* Hero Grid: Index Cards Left, Interactive Chart Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Index Selector Cards */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Select Benchmark Index
            </div>
            <div className="space-y-2">
              {MAJOR_INDICES.slice(0, 5).map(idx => {
                const isSelected = selectedIndex.id === idx.id;
                const isPositive = idx.change >= 0;
                return (
                  <button
                    key={idx.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`w-full p-3 rounded-xl border text-left transition-all duration-150 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#002b5b] text-white border-[#002b5b] shadow-md ring-2 ring-[#002b5b]/20'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200 shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                          {idx.name}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {idx.category}
                        </span>
                      </div>
                      <div className="text-[11px] opacity-80 mt-0.5 font-mono-nums">
                        Open: {idx.open.toFixed(1)} · High: {idx.high.toFixed(1)}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono-nums font-black text-base">
                        {idx.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </div>
                      <div
                        className={`font-mono-nums font-bold text-xs flex items-center justify-end ${
                          isSelected
                            ? isPositive
                              ? 'text-emerald-300'
                              : 'text-rose-300'
                            : isPositive
                            ? 'text-emerald-600'
                            : 'text-rose-600'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {idx.change.toFixed(2)} ({idx.pChange.toFixed(2)}%)
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => onNavigate('indices')}
              className="w-full py-2 text-xs font-semibold text-[#002b5b] bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors flex items-center justify-center gap-1 border border-slate-200 cursor-pointer"
            >
              <span>Explore All 12 Indices & Sectoral Benchmarks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Column: Large Interactive Market Chart */}
          <div className="lg:col-span-7">
            <StockChart
              title={selectedIndex.name}
              basePrice={selectedIndex.current}
              isPositive={selectedIndex.change >= 0}
              height={380}
            />
          </div>
        </div>
      </section>

      {/* 2. MARKET DASHBOARD: GAINERS, LOSERS, ACTIVE, 52W */}
      <section className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-[#002b5b]" />
              Market Dashboard
            </h2>
            <p className="text-xs text-slate-500">
              Live market movers, turnover leaders, and volume anomalies across BFX Equities
            </p>
          </div>

          {/* Segmented Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto text-xs font-semibold">
            {[
              { id: 'gainers', label: 'Top Gainers' },
              { id: 'losers', label: 'Top Losers' },
              { id: 'active', label: 'Most Active' },
              { id: 'high52', label: '52 Week High' },
              { id: 'low52', label: '52 Week Low' },
              { id: 'shockers', label: 'Volume Shockers' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setDashboardTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-all cursor-pointer ${
                  dashboardTab === tab.id
                    ? 'bg-[#002b5b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* High-density Table */}
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase text-[11px] tracking-wider">
                <th className="py-2.5 px-3">Company & Symbol</th>
                <th className="py-2.5 px-3">Sector</th>
                <th className="py-2.5 px-3 text-right">LTP (₹)</th>
                <th className="py-2.5 px-3 text-right">Change (₹)</th>
                <th className="py-2.5 px-3 text-right">% Change</th>
                <th className="py-2.5 px-3 text-right">Volume (Shares)</th>
                <th className="py-2.5 px-3 text-right">Turnover (₹ Cr)</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono-nums">
              {currentDashboardList.map(stock => {
                const isPositive = stock.change >= 0;
                return (
                  <tr
                    key={stock.symbol}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onNavigate('stock-detail', stock.symbol)}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 font-sans group-hover:text-[#002b5b] flex items-center gap-1.5">
                        <span>{stock.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-sans">
                        {stock.symbol} · ISIN: {stock.isin}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-sans">
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
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                          isPositive
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {stock.pChange.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700">
                      {stock.volume.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-700">
                      {stock.valueCr.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3 px-3 text-center" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => onNavigate('stock-detail', stock.symbol)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#002b5b] bg-slate-100 hover:bg-[#002b5b] hover:text-white rounded transition-colors font-sans"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="pt-2 flex justify-between items-center text-xs text-slate-500 border-t border-slate-100">
          <span>Showing top 5 {dashboardTab} counters</span>
          <button
            onClick={() => onNavigate('stocks')}
            className="text-[#002b5b] font-bold hover:underline flex items-center gap-1"
          >
            <span>View All Listed Stocks</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* 3. PRIMARY MARKET SECTIONS: IPO & DERIVATIVES HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IPO Center Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-sky-50 text-sky-700">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Primary Market & IPOs</h3>
                  <p className="text-[11px] text-slate-500">Live & upcoming public issues on BFX</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('ipo')}
                className="text-xs font-semibold text-[#002b5b] hover:underline flex items-center gap-0.5"
              >
                IPO Calendar <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {MOCK_IPOS.slice(0, 2).map(ipo => (
                <div
                  key={ipo.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-xs text-slate-900">{ipo.companyName}</div>
                      <div className="text-[11px] text-slate-500">
                        Issue Size: ₹{ipo.issueSizeCr} Cr · Price: {ipo.priceBand}
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                      {ipo.status}
                    </span>
                  </div>

                  {/* Subscription Meter */}
                  <div className="mt-2.5 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono-nums">
                      <span className="text-slate-500">Subscription Status:</span>
                      <strong className="text-sky-700">{ipo.subscription.total}x Subscribed</strong>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="bg-sky-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, ipo.subscription.total * 5)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono-nums pt-0.5">
                      <span>QIB: {ipo.subscription.qib}x</span>
                      <span>NII: {ipo.subscription.nii}x</span>
                      <span>Retail: {ipo.subscription.retail}x</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('ipo')}
            className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#002b5b] font-bold rounded-lg text-xs transition-colors"
          >
            Browse All Ongoing & Upcoming IPOs
          </button>
        </div>

        {/* Derivatives & Option Chain Snapshot Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Equity Derivatives (F&O)</h3>
                  <p className="text-[11px] text-slate-500">BFX 50 Index Options & Strike Heatmap</p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('derivatives')}
                className="text-xs font-semibold text-[#002b5b] hover:underline flex items-center gap-0.5"
              >
                Full Option Chain <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-2.5 text-center font-mono-nums">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Spot Price</div>
                <div className="text-sm font-black text-slate-900">25,215.40</div>
                <div className="text-[10px] text-emerald-600 font-bold">+148.85</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans">PCR (OI)</div>
                <div className="text-sm font-black text-slate-900">1.18</div>
                <div className="text-[10px] text-emerald-600 font-bold">Bullish Bias</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-400 uppercase font-sans">Max Pain</div>
                <div className="text-sm font-black text-slate-900">25,200</div>
                <div className="text-[10px] text-slate-500">Weekly Expiry</div>
              </div>
            </div>

            {/* Strike quick preview */}
            <div className="text-[11px] space-y-1.5 pt-1">
              <div className="flex justify-between font-bold text-slate-400 text-[10px] uppercase border-b pb-1">
                <span>Call LTP</span>
                <span>Strike Price</span>
                <span>Put LTP</span>
              </div>
              {[
                { call: '232.40', strike: '25,100', put: '128.50', itm: 'call' },
                { call: '164.50', strike: '25,200 (ATM)', put: '174.00', itm: 'atm' },
                { call: '108.20', strike: '25,300', put: '232.80', itm: 'put' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-1 font-mono-nums">
                  <span className="text-emerald-700 font-bold">₹{row.call}</span>
                  <span className="font-black text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                    {row.strike}
                  </span>
                  <span className="text-rose-700 font-bold">₹{row.put}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigate('derivatives')}
            className="w-full mt-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#002b5b] font-bold rounded-lg text-xs transition-colors"
          >
            Launch Interactive Option Chain & Open Interest Tool
          </button>
        </div>
      </div>

      {/* 4. NEWS & REGULATORY ANNOUNCEMENTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Market News */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Market News & Dispatches</h3>
              <p className="text-[11px] text-slate-500">Live commentary from the trading floor</p>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-semibold text-[#002b5b] hover:underline"
            >
              All News
            </button>
          </div>

          <div className="space-y-3.5">
            {MOCK_NEWS.map(news => (
              <div key={news.id} className="group border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                  <span className="font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                    {news.category}
                  </span>
                  <span>·</span>
                  <span>{news.source}</span>
                  <span>·</span>
                  <span>{news.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#002b5b] transition-colors leading-snug cursor-pointer">
                  {news.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                  {news.summary}
                </p>
                <div className="mt-1.5 flex gap-1">
                  {news.relatedSymbols.map(sym => (
                    <button
                      key={sym}
                      onClick={() => onNavigate('stock-detail', sym)}
                      className="text-[10px] font-mono-nums font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-1.5 py-0.5 rounded transition-colors"
                    >
                      {sym}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Corporate Announcements */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Regulatory Filings</h3>
              <p className="text-[11px] text-slate-500">Real-time exchange disclosures</p>
            </div>
            <button
              onClick={() => onNavigate('announcements')}
              className="text-xs font-semibold text-[#002b5b] hover:underline"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {MOCK_ANNOUNCEMENTS.slice(0, 4).map(ann => (
              <div key={ann.id} className="p-2.5 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                  <span className="font-bold font-mono-nums text-[#002b5b] bg-slate-100 px-1.5 py-0.5 rounded">
                    {ann.symbol}
                  </span>
                  <span>{ann.time}</span>
                </div>
                <div className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                  {ann.title}
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1 text-sky-700">
                    <FileText className="w-3 h-3" />
                    {ann.attachmentName}
                  </span>
                  <span>{ann.fileSize}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
