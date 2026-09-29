import React from 'react';
import { TICKER_ITEMS } from '../data/mockMarketData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MarketTickerProps {
  onSelectTicker?: (symbol: string) => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({ onSelectTicker }) => {
  return (
    <div className="bg-[#001f3f] text-white border-b border-[#0a2e5c] text-xs py-2 overflow-hidden select-none relative z-10 shadow-inner">
      <div className="flex items-center">
        {/* Fixed label on left */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 bg-[#001429] text-sky-400 font-semibold uppercase tracking-wider text-[10px] shrink-0 border-r border-[#0a2e5c] z-10 shadow-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          BFX TICKER
        </div>

        {/* Marquee Ticker Track */}
        <div className="overflow-hidden w-full relative">
          <div className="animate-marquee flex items-center gap-6 whitespace-nowrap">
            {/* Duplicated list for seamless infinite loop */}
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => {
              const isPositive = item.isPositive;
              return (
                <button
                  key={`${item.symbol}-${index}`}
                  onClick={() => onSelectTicker && onSelectTicker(item.symbol)}
                  className="flex items-center gap-2 px-2 py-0.5 hover:bg-[#002e5d]/60 rounded cursor-pointer transition-colors duration-150 text-left focus:outline-none"
                >
                  <span className="font-semibold text-slate-200 hover:text-white tracking-wide">{item.symbol}</span>
                  <span className="font-mono-nums font-medium text-slate-100">{item.value}</span>
                  <span
                    className={`font-mono-nums font-semibold flex items-center text-[11px] ${
                      isPositive ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {isPositive ? (
                      <TrendingUp className="w-3 h-3 inline mr-0.5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 inline mr-0.5" />
                    )}
                    {item.change} ({item.pChange})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
