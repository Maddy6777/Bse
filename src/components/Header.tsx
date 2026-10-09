import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Globe, 
  Menu, 
  X, 
  Clock, 
  ExternalLink,
  ChevronDown,
  Building2,
  TrendingUp,
  FileText,
  ShieldAlert,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { STOCKS_DATA, MAJOR_INDICES } from '../data/mockMarketData';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearchModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onOpenSearchModal }) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [langDropdownOpen, setLangDropdownOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Update clock every second in IST format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: DD-MMM-YYYY HH:mm:ss IST
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat('en-GB', options).format(now);
      setTimeStr(`${formatted} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle outside click for search dropdown & lang dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const filteredStocks = searchQuery.trim()
    ? STOCKS_DATA.filter(
        s =>
          s.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.sector.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const filteredIndices = searchQuery.trim()
    ? MAJOR_INDICES.filter(
        idx =>
          idx.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          idx.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'result-2026', label: 'Result 2026 📖' },
    { id: 'markets', label: 'Markets' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'indices', label: 'Indices' },
    { id: 'derivatives', label: 'Derivatives' },
    { id: 'market-data', label: 'Market Data' },
    { id: 'ipo', label: 'IPO' },
    { id: 'mutual-funds', label: 'Mutual Funds' },
    { id: 'investors', label: 'Investors' },
    { id: 'companies', label: 'Companies' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'corporate-actions', label: 'Corporate Actions' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleStockSelect = (symbol: string) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    onNavigate('stock-detail', symbol);
  };

  const handleIndexSelect = (symbol: string) => {
    setSearchQuery('');
    setIsSearchFocused(false);
    onNavigate('indices', symbol);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#002244] text-slate-200 text-[11px] font-medium border-b border-[#0a2e5c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          {/* Left: Market Status & Live Clock */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="font-semibold text-emerald-400 uppercase tracking-wider text-[10px]">
                Market Open
              </span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="hidden md:inline text-slate-300">
                Equity & Derivatives (09:15 - 15:30 IST)
              </span>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-slate-300 font-mono-nums">
              <Clock className="w-3 h-3 text-sky-400" />
              <span>{timeStr || 'Loading Market Time...'}</span>
            </div>
          </div>

          {/* Right: Quick utility links & Language selector */}
          <div className="flex items-center gap-3 sm:gap-4 text-slate-300">
            <button
              onClick={() => onNavigate('investors')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Investor Corner
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button
              onClick={() => onNavigate('about')}
              className="hidden sm:inline hover:text-white transition-colors cursor-pointer"
            >
              Careers
            </button>
            <span className="hidden sm:inline text-slate-600">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hidden sm:inline hover:text-white transition-colors cursor-pointer"
            >
              Help & FAQs
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-700/60 text-slate-200 transition-colors cursor-pointer"
              >
                <Globe className="w-3 h-3 text-sky-400" />
                <span className="text-[10px] uppercase font-bold">{language}</span>
                <ChevronDown className="w-2.5 h-2.5" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white text-slate-800 rounded-md shadow-xl border border-slate-200 py-1 z-50 text-xs">
                  {['English', 'हिन्दी', 'ગુજરાતી', 'मराठी', 'தமிழ்'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-slate-100 flex items-center justify-between transition-colors"
                    >
                      {lang}
                      {language === lang && <span className="text-sky-600 font-bold">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER & SEARCH */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo and Title */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          {/* Stylized Indian Exchange Emblem */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#002b5b] via-[#003875] to-[#001f3f] p-1.5 flex items-center justify-center shadow-md border border-[#0f4c81]/50 group-hover:shadow-sky-900/20 transition-all">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none">
              {/* Central Financial Pillar & Growth Spire */}
              <path
                d="M50 12 L78 30 L78 74 L50 90 L22 74 L22 30 Z"
                stroke="#38bdf8"
                strokeWidth="6"
                fill="#002244"
              />
              <path
                d="M50 24 L68 36 L68 68 L50 78 L32 68 L32 36 Z"
                fill="#e0f2fe"
                opacity="0.15"
              />
              <path
                d="M50 20 L50 78 M36 40 L64 40 M36 55 L64 55 M36 70 L64 70"
                stroke="#f59e0b"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="50" cy="18" r="5" fill="#f59e0b" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black tracking-tight text-[#002b5b] font-display">
                BFX
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-800 border border-amber-500/20">
                EST. 1888
              </span>
            </div>
            <div className="text-[11px] font-semibold text-slate-600 tracking-wider uppercase">
              Bharat Financial Exchange
            </div>
          </div>
        </button>

        {/* Central Search Bar */}
        <div className="flex-1 max-w-xl relative" ref={searchContainerRef}>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search stocks, companies, indices (e.g., RELIANCE, TCS, SENSEX)..."
              className="w-full pl-9.5 pr-16 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#002b5b] focus:border-transparent transition-all shadow-xs"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span className="hidden sm:inline-block text-[10px] font-mono text-slate-400 border border-slate-200 bg-white px-1.5 py-0.5 rounded">
                ⌘K
              </span>
            </div>
          </div>

          {/* Live Search Instant Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-lg shadow-2xl z-50 overflow-hidden text-xs max-h-96 overflow-y-auto">
              {filteredStocks.length === 0 && filteredIndices.length === 0 ? (
                <div className="p-4 text-center text-slate-500">
                  No matching securities or indices found for "{searchQuery}".
                </div>
              ) : (
                <>
                  {filteredIndices.length > 0 && (
                    <div className="p-2 border-b border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        Major Indices
                      </div>
                      {filteredIndices.map(idx => (
                        <button
                          key={idx.id}
                          onClick={() => handleIndexSelect(idx.symbol)}
                          className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-md transition-colors text-left"
                        >
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-sky-600" />
                            <div>
                              <div className="font-semibold text-slate-900">{idx.name}</div>
                              <div className="text-[10px] text-slate-500">{idx.category} Index</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono-nums font-semibold text-slate-900">
                              {idx.current.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                            <div
                              className={`font-mono-nums text-[11px] ${
                                idx.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {idx.change >= 0 ? '+' : ''}
                              {idx.change.toFixed(2)} ({idx.pChange.toFixed(2)}%)
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredStocks.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                        Equity Securities
                      </div>
                      {filteredStocks.map(stock => (
                        <button
                          key={stock.symbol}
                          onClick={() => handleStockSelect(stock.symbol)}
                          className="w-full flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-md transition-colors text-left"
                        >
                          <div>
                            <div className="font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{stock.symbol}</span>
                              <span className="text-[10px] font-normal text-slate-500">
                                · {stock.sector}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-600 truncate max-w-xs">
                              {stock.name}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono-nums font-semibold text-slate-900">
                              ₹{stock.ltp.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </div>
                            <div
                              className={`font-mono-nums text-[11px] ${
                                stock.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {stock.change >= 0 ? '+' : ''}
                              {stock.change.toFixed(2)} ({stock.pChange.toFixed(2)}%)
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Right CTA / Quick Tools */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate('result-2026')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors shadow-xs cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Result 2026</span>
            <span className="sm:hidden">Result</span>
          </button>

          <button
            onClick={() => onNavigate('market-data')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#002b5b] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
          >
            <FileText className="w-3.5 h-3.5 text-[#002b5b]" />
            <span>Bhav Copy</span>
          </button>

          <button
            onClick={() => onNavigate('ipo')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#002b5b] hover:bg-[#003875] rounded-lg transition-colors shadow-xs"
          >
            <span>Live IPOs</span>
            <span className="px-1.5 py-0.2 bg-rose-500 text-[10px] text-white rounded font-bold">2 Open</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 3. PRIMARY HORIZONTAL NAVIGATION BAR */}
      <nav className="hidden xl:block bg-[#002b5b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-0.5 overflow-x-auto whitespace-nowrap py-1">
            {navItems.map(item => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wide rounded transition-all cursor-pointer ${
                    isActive
                      ? 'bg-sky-500 text-white shadow-xs'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 text-white border-b border-slate-800 px-4 py-3 space-y-1">
          <div className="grid grid-cols-2 gap-1.5 py-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  currentTab === item.id
                    ? 'bg-sky-500 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>Market Hours: 09:15 - 15:30 IST</span>
            <button
              onClick={() => {
                onNavigate('market-data');
                setMobileMenuOpen(false);
              }}
              className="text-sky-400 font-semibold flex items-center gap-1"
            >
              Bhavcopy <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
