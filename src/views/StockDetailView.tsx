import React, { useState } from 'react';
import { Stock, HistoricalPrice } from '../types/market';
import { STOCKS_DATA, SAMPLE_HISTORICAL_DATA, MOCK_ANNOUNCEMENTS, MOCK_NEWS, MOCK_CORPORATE_ACTIONS } from '../data/mockMarketData';
import { StockChart } from '../components/StockChart';
import { OrderBook } from '../components/OrderBook';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Building2, 
  Download, 
  FileText, 
  Calendar, 
  Layers, 
  DollarSign, 
  PieChart, 
  Clock, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface StockDetailViewProps {
  symbol: string;
  onBack: () => void;
  onSelectStock: (symbol: string) => void;
}

export const StockDetailView: React.FC<StockDetailViewProps> = ({
  symbol,
  onBack,
  onSelectStock,
}) => {
  const stock = STOCKS_DATA.find(s => s.symbol === symbol) || STOCKS_DATA[0];
  const [activeTab, setActiveTab] = useState<
    'overview' | 'chart' | 'financials' | 'shareholding' | 'corporate-actions' | 'announcements' | 'news' | 'historical'
  >('overview');
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [buyOrderModalOpen, setBuyOrderModalOpen] = useState(false);
  const [orderQuantity, setOrderQuantity] = useState(10);
  const [orderType, setOrderType] = useState<'MARKET' | 'LIMIT'>('MARKET');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const isPositive = stock.change >= 0;

  // Filter announcements, news, corporate actions for this symbol
  const stockAnnouncements = MOCK_ANNOUNCEMENTS.filter(a => a.symbol === stock.symbol);
  const stockNews = MOCK_NEWS.filter(n => n.relatedSymbols.includes(stock.symbol));
  const stockCorpActions = MOCK_CORPORATE_ACTIONS.filter(c => c.symbol === stock.symbol);

  // Peer stocks in the same sector
  const peers = STOCKS_DATA.filter(s => s.sector === stock.sector && s.symbol !== stock.symbol).slice(0, 4);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setBuyOrderModalOpen(false);
    }, 2000);
  };

  const handleDownloadHistoricalCSV = () => {
    const headers = ['Date,Open,High,Low,Close,Volume,TurnoverCr'];
    const rows = SAMPLE_HISTORICAL_DATA.map(
      h => `"${h.date}",${h.open},${h.high},${h.low},${h.close},${h.volume},${h.turnoverCr}`
    );
    const blob = new Blob([headers.concat(rows).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${stock.symbol}_Historical_Data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-[#002b5b] hover:underline cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Securities Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsWatchlisted(!isWatchlisted)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isWatchlisted
                ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isWatchlisted ? 'fill-amber-500 text-amber-500' : ''}`} />
            <span>{isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}</span>
          </button>

          <button
            onClick={() => setBuyOrderModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#002b5b] hover:bg-[#003875] text-white font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>Simulate Order</span>
          </button>
        </div>
      </div>

      {/* Primary Quote Header Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight font-display">
                {stock.name}
              </h1>
              <span className="font-mono-nums text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                {stock.symbol}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
                {stock.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1.5 flex-wrap">
              <span>ISIN: <strong className="text-slate-700 font-mono-nums">{stock.isin}</strong></span>
              <span>·</span>
              <span>Sector: <strong className="text-slate-700">{stock.sector}</strong></span>
              <span>·</span>
              <span>Industry: <strong className="text-slate-700">{stock.industry}</strong></span>
            </div>
          </div>

          {/* Right Price Block */}
          <div className="text-left md:text-right">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              Last Traded Price (LTP)
            </div>
            <div className="flex items-baseline gap-2 md:justify-end">
              <span className="text-3xl font-black font-mono-nums text-slate-900 tracking-tight">
                ₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div
              className={`font-mono-nums text-xs font-bold flex items-center md:justify-end gap-1 mt-0.5 ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              <span>
                {isPositive ? '+' : ''}
                {stock.change.toFixed(2)} ({stock.pChange.toFixed(2)}%)
              </span>
              <span className="text-slate-400 font-normal">· As on 15:30 IST</span>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono-nums text-xs">
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Prev Close</div>
            <div className="font-bold text-slate-800">₹{stock.previousClose.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Open</div>
            <div className="font-bold text-slate-800">₹{stock.open.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Day High</div>
            <div className="font-bold text-emerald-600">₹{stock.high.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Day Low</div>
            <div className="font-bold text-rose-600">₹{stock.low.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">52W High</div>
            <div className="font-bold text-slate-800">₹{stock.high52.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">52W Low</div>
            <div className="font-bold text-slate-800">₹{stock.low52.toFixed(2)}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Volume</div>
            <div className="font-bold text-slate-800">{stock.volume.toLocaleString('en-IN')}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
            <div className="text-[10px] text-slate-400 font-sans uppercase">Turnover (₹ Cr)</div>
            <div className="font-bold text-slate-800">{stock.valueCr.toFixed(1)}</div>
          </div>
        </div>

        {/* Secondary Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono-nums text-xs pt-1 border-t border-slate-100">
          <div>
            <span className="text-[11px] text-slate-400 font-sans">Market Cap: </span>
            <strong className="text-slate-800">₹{stock.marketCapCr.toLocaleString('en-IN')} Cr</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-sans">P/E Ratio: </span>
            <strong className="text-slate-800">{stock.pe.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-sans">P/B Ratio: </span>
            <strong className="text-slate-800">{stock.pb.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-sans">TTM EPS: </span>
            <strong className="text-slate-800">₹{stock.eps.toFixed(2)}</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-sans">Dividend Yield: </span>
            <strong className="text-slate-800">{stock.dividendYield.toFixed(2)}%</strong>
          </div>
          <div>
            <span className="text-[11px] text-slate-400 font-sans">Beta (1Y): </span>
            <strong className="text-slate-800">{stock.beta.toFixed(2)}</strong>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-1.5 overflow-x-auto">
        <div className="flex items-center gap-1 text-xs font-semibold whitespace-nowrap">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'chart', label: 'Technical Chart' },
            { id: 'financials', label: 'Financials' },
            { id: 'shareholding', label: 'Shareholding Pattern' },
            { id: 'corporate-actions', label: `Corporate Actions (${stockCorpActions.length})` },
            { id: 'announcements', label: `Announcements (${stockAnnouncements.length})` },
            { id: 'news', label: `News (${stockNews.length})` },
            { id: 'historical', label: 'Historical Data' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#002b5b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB CONTENT PANELS */}
      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Chart Preview & Technical Stats */}
          <div className="lg:col-span-8 space-y-6">
            <StockChart
              title={`${stock.name} (${stock.symbol})`}
              basePrice={stock.ltp}
              isPositive={isPositive}
              height={340}
            />

            {/* Peer Comparison Table */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">
                Peer Comparison ({stock.sector})
              </h3>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs border-collapse font-mono-nums">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
                      <th className="py-2 px-3 font-sans">Company</th>
                      <th className="py-2 px-3 text-right">LTP (₹)</th>
                      <th className="py-2 px-3 text-right">% Change</th>
                      <th className="py-2 px-3 text-right">P/E</th>
                      <th className="py-2 px-3 text-right">P/B</th>
                      <th className="py-2 px-3 text-right">Mkt Cap (₹ Cr)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {/* Current Stock */}
                    <tr className="bg-sky-50/50 font-bold">
                      <td className="py-2.5 px-3 font-sans text-sky-900 flex items-center gap-1">
                        <span>{stock.symbol} (This Stock)</span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-900">₹{stock.ltp.toFixed(2)}</td>
                      <td className={`py-2.5 px-3 text-right ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {stock.pChange.toFixed(2)}%
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-700">{stock.pe.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-700">{stock.pb.toFixed(1)}</td>
                      <td className="py-2.5 px-3 text-right text-slate-900">{stock.marketCapCr.toLocaleString('en-IN')}</td>
                    </tr>
                    {peers.map(p => (
                      <tr
                        key={p.symbol}
                        className="hover:bg-slate-50 cursor-pointer"
                        onClick={() => onSelectStock(p.symbol)}
                      >
                        <td className="py-2.5 px-3 font-sans text-slate-800 hover:text-[#002b5b]">
                          {p.name} ({p.symbol})
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-900">₹{p.ltp.toFixed(2)}</td>
                        <td className={`py-2.5 px-3 text-right ${p.change >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {p.pChange.toFixed(2)}%
                        </td>
                        <td className="py-2.5 px-3 text-right text-slate-700">{p.pe.toFixed(1)}</td>
                        <td className="py-2.5 px-3 text-right text-slate-700">{p.pb.toFixed(1)}</td>
                        <td className="py-2.5 px-3 text-right text-slate-700">{p.marketCapCr.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right: Order Book & Technical Range */}
          <div className="lg:col-span-4 space-y-6">
            <OrderBook ltp={stock.ltp} />

            {/* Trading Parameters & Circuit Limits */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs text-xs space-y-3">
              <h4 className="font-bold text-slate-900 pb-2 border-b border-slate-200">
                Trading Parameters & Circuit Limits
              </h4>
              <div className="space-y-2 font-mono-nums">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-sans">Upper Circuit (10%):</span>
                  <span className="font-bold text-emerald-700">₹{(stock.previousClose * 1.10).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-sans">Lower Circuit (10%):</span>
                  <span className="font-bold text-rose-700">₹{(stock.previousClose * 0.90).toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-sans">Face Value:</span>
                  <span className="font-bold text-slate-800">₹{stock.faceValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500 font-sans">Tick Size:</span>
                  <span className="font-bold text-slate-800">₹0.05</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500 font-sans">Settlement Cycle:</span>
                  <span className="font-bold text-slate-800 font-sans">T+1 Rolling / T+0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TECHNICAL CHART TAB */}
      {activeTab === 'chart' && (
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Full Technical Canvas</h3>
              <p className="text-xs text-slate-500">Multi-timeframe candlestick and area charts with volume histogram</p>
            </div>
          </div>
          <StockChart
            title={`${stock.name} Interactive Financial Chart`}
            basePrice={stock.ltp}
            isPositive={isPositive}
            height={500}
          />
        </div>
      )}

      {/* 3. FINANCIALS TAB */}
      {activeTab === 'financials' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">
              Consolidated Financial Performance (₹ in Crores)
            </h3>
            <p className="text-xs text-slate-500">Quarterly and Annual audited disclosures filed with BFX</p>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse font-mono-nums">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <th className="py-2.5 px-3 font-sans">Financial Indicator</th>
                  <th className="py-2.5 px-3 text-right">Q1 FY27</th>
                  <th className="py-2.5 px-3 text-right">Q4 FY26</th>
                  <th className="py-2.5 px-3 text-right">Q3 FY26</th>
                  <th className="py-2.5 px-3 text-right">Q2 FY26</th>
                  <th className="py-2.5 px-3 text-right">YoY Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-800">Total Revenue / Sales</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">58,420.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">55,190.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">53,400.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">50,810.00</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+14.9%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-700">Operating Expenses</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">42,150.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">40,110.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">38,900.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">37,200.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">+13.3%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-bold text-slate-800">EBITDA</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">16,270.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">15,080.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">14,500.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">13,610.00</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+19.5%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-700">Depreciation & Interest</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">4,120.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">3,980.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">3,850.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">3,720.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-600">+10.7%</td>
                </tr>
                <tr className="bg-slate-50 font-bold">
                  <td className="py-2.5 px-3 font-sans text-sky-950">Net Profit (PAT)</td>
                  <td className="py-2.5 px-3 text-right text-emerald-700 font-black">9,180.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">8,350.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">7,980.00</td>
                  <td className="py-2.5 px-3 text-right text-slate-900">7,420.00</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600">+23.7%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-sans font-semibold text-slate-700">Reported EPS (₹)</td>
                  <td className="py-2.5 px-3 text-right font-bold text-slate-900">{stock.eps.toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{(stock.eps * 0.94).toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{(stock.eps * 0.89).toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-slate-700">{(stock.eps * 0.83).toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">+20.5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. SHAREHOLDING PATTERN */}
      {activeTab === 'shareholding' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">Shareholding Pattern</h3>
            <p className="text-xs text-slate-500">Ownership distribution filed as of quarter ending Sep 2026</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Visual Breakdown Bar */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-[#002b5b]"></span>
                    Promoter & Promoter Group
                  </span>
                  <span className="font-mono-nums font-bold text-slate-900">50.48%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-[#002b5b] h-full" style={{ width: '50.48%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-sky-500"></span>
                    Foreign Institutional Investors (FII)
                  </span>
                  <span className="font-mono-nums font-bold text-slate-900">22.15%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-sky-500 h-full" style={{ width: '22.15%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-emerald-500"></span>
                    Domestic Institutional Investors (DII) / MFs
                  </span>
                  <span className="font-mono-nums font-bold text-slate-900">16.32%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: '16.32%' }} />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-xs bg-amber-500"></span>
                    Public & Retail Investors
                  </span>
                  <span className="font-mono-nums font-bold text-slate-900">11.05%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full" style={{ width: '11.05%' }} />
                </div>
              </div>
            </div>

            {/* Regulatory Summary Box */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 text-xs space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pledge of Promoter Shares</span>
              </div>
              <p className="text-slate-600 text-xs leading-relaxed">
                Zero shares pledged by the promoter or promoter group (0.00% of total share capital), demonstrating strong corporate governance.
              </p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1">
                <div>Total Floating Shares: <strong className="text-slate-800 font-mono-nums">3,382,450,000</strong></div>
                <div>FII Net Trend: <strong className="text-emerald-700 font-semibold">+0.85% increased in last quarter</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. CORPORATE ACTIONS TAB */}
      {activeTab === 'corporate-actions' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">Corporate Actions History</h3>
            <p className="text-xs text-slate-500">Historical dividends, bonuses, stock splits, and rights issues</p>
          </div>

          {stockCorpActions.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No recent corporate actions recorded for {stock.symbol} in this cycle.
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse font-mono-nums">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                    <th className="py-2.5 px-3 font-sans">Purpose</th>
                    <th className="py-2.5 px-3 font-sans">Details</th>
                    <th className="py-2.5 px-3">Ex-Date</th>
                    <th className="py-2.5 px-3">Record Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {stockCorpActions.map(action => (
                    <tr key={action.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-sans font-bold text-[#002b5b]">
                        {action.purpose}
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-800">{action.details}</td>
                      <td className="py-3 px-3 font-bold text-slate-900">{action.exDate}</td>
                      <td className="py-3 px-3 text-slate-700">{action.recordDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* 6. ANNOUNCEMENTS TAB */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">Exchange Announcements & Filings</h3>
            <p className="text-xs text-slate-500">Mandatory SEBI Listing Regulations (LODR) submissions</p>
          </div>

          <div className="space-y-3">
            {stockAnnouncements.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No new announcements submitted today for {stock.symbol}.
              </div>
            ) : (
              stockAnnouncements.map(ann => (
                <div key={ann.id} className="p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded text-[11px]">
                      {ann.category}
                    </span>
                    <span className="font-mono-nums">{ann.date} at {ann.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 leading-snug">{ann.title}</h4>
                  <p className="text-xs text-slate-600 mt-2">{ann.summary}</p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-sky-700 font-semibold cursor-pointer hover:underline">
                      <FileText className="w-3.5 h-3.5" />
                      {ann.attachmentName} ({ann.fileSize})
                    </span>
                    <span className="text-[11px] text-slate-400">Verified by BFX Listing Dept</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 7. NEWS TAB */}
      {activeTab === 'news' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-base font-bold text-slate-900">Associated News Coverage</h3>
            <p className="text-xs text-slate-500">Institutional headlines & broker research commentary</p>
          </div>

          <div className="space-y-3">
            {stockNews.length === 0 ? (
              <div className="py-8 text-center text-slate-500 text-xs">
                No recent tagged media bulletins for this counter.
              </div>
            ) : (
              stockNews.map(item => (
                <div key={item.id} className="p-4 rounded-lg border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded text-[10px]">
                      {item.category}
                    </span>
                    <span>·</span>
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{item.time}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600">{item.summary}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 8. HISTORICAL DATA TAB */}
      {activeTab === 'historical' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Historical Price Quotes</h3>
              <p className="text-xs text-slate-500">Official daily closing prices and exchange volumes</p>
            </div>
            <button
              onClick={handleDownloadHistoricalCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#002b5b] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 self-start sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV</span>
            </button>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse font-mono-nums">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
                  <th className="py-2.5 px-3 font-sans">Date</th>
                  <th className="py-2.5 px-3 text-right">Open (₹)</th>
                  <th className="py-2.5 px-3 text-right">High (₹)</th>
                  <th className="py-2.5 px-3 text-right">Low (₹)</th>
                  <th className="py-2.5 px-3 text-right">Close (₹)</th>
                  <th className="py-2.5 px-3 text-right">Shares Traded</th>
                  <th className="py-2.5 px-3 text-right">Turnover (₹ Cr)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SAMPLE_HISTORICAL_DATA.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">{h.date}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">₹{h.open.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right text-emerald-600 font-bold">₹{h.high.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right text-rose-600 font-bold">₹{h.low.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right font-black text-slate-900">₹{h.close.toFixed(2)}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{h.volume.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-right text-slate-700">{h.turnoverCr.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Simulated Order Execution Modal */}
      {buyOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">Exchange Order Entry</h3>
                <p className="text-xs text-slate-500">Order Routing · BFX Equities Segment</p>
              </div>
              <button
                onClick={() => setBuyOrderModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {orderSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">Order Successfully Transmitted</h4>
                <p className="text-xs text-slate-500 font-mono-nums">
                  Executed {orderQuantity} shares of {stock.symbol} at ₹{stock.ltp.toFixed(2)} (Trade ID: #BFX-{Math.floor(100000 + Math.random() * 900000)})
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono-nums">
                  <div>
                    <div className="font-bold text-slate-900 font-sans">{stock.name}</div>
                    <div className="text-[11px] text-slate-500">{stock.symbol} · Cash Segment</div>
                  </div>
                  <div className="text-right">
                    <div className="font-black text-base text-slate-900">₹{stock.ltp.toFixed(2)}</div>
                    <div className="text-[10px] text-emerald-600 font-bold">LTP</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Order Product
                    </label>
                    <select className="w-full p-2 border border-slate-300 rounded-lg bg-white">
                      <option>CNC (Delivery)</option>
                      <option>MIS (Intraday)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Order Type
                    </label>
                    <select
                      value={orderType}
                      onChange={e => setOrderType(e.target.value as any)}
                      className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                    >
                      <option value="MARKET">Market</option>
                      <option value="LIMIT">Limit</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Quantity (Shares)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={orderQuantity}
                    onChange={e => setOrderQuantity(Number(e.target.value))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono-nums font-bold text-slate-900"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono-nums flex justify-between items-center">
                  <span className="text-slate-600">Estimated Total Capital:</span>
                  <span className="font-black text-slate-900 text-sm">
                    ₹{(orderQuantity * stock.ltp).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Confirm Buy Order
                  </button>
                  <button
                    type="button"
                    onClick={() => setBuyOrderModalOpen(false)}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
