import React, { useState, useEffect } from 'react';
import { Search, X, TrendingUp, Building2, FileText, ArrowRight } from 'lucide-react';
import { STOCKS_DATA, MAJOR_INDICES, MOCK_IPOS } from '../data/mockMarketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStock: (symbol: string) => void;
  onSelectIndex: (symbol: string) => void;
  onSelectIpo: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectStock,
  onSelectIndex,
  onSelectIpo,
}) => {
  const [query, setQuery] = useState('');

  // Listen to keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Toggle or open
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredStocks = STOCKS_DATA.filter(
    s =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase())
  );

  const filteredIndices = MAJOR_INDICES.filter(
    idx =>
      idx.symbol.toLowerCase().includes(query.toLowerCase()) ||
      idx.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search equities, indices, sectorals, IPOs (e.g. RELIANCE, BANKEX, BHARATSEMI)..."
            className="w-full text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4">
          {/* Indices Section */}
          {filteredIndices.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Market Indices ({filteredIndices.length})
              </div>
              <div className="space-y-1">
                {filteredIndices.map(idx => (
                  <button
                    key={idx.id}
                    onClick={() => {
                      onSelectIndex(idx.symbol);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-sky-50 text-sky-700">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs">{idx.name}</div>
                        <div className="text-[11px] text-slate-500">Category: {idx.category} Index</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-nums font-bold text-xs text-slate-900">
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
            </div>
          )}

          {/* Equities Section */}
          {filteredStocks.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                Stocks & Equities ({filteredStocks.length})
              </div>
              <div className="space-y-1">
                {filteredStocks.map(stock => (
                  <button
                    key={stock.symbol}
                    onClick={() => {
                      onSelectStock(stock.symbol);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-100 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-indigo-50 text-indigo-700">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs flex items-center gap-2">
                          <span>{stock.symbol}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            · {stock.sector}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600">{stock.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono-nums font-bold text-xs text-slate-900">
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
            </div>
          )}

          {filteredStocks.length === 0 && filteredIndices.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching listings found for "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">ESC</kbd> to close</span>
            <span>Use <kbd className="px-1.5 py-0.5 bg-white border border-slate-300 rounded font-mono text-[10px]">Tab</kbd> to browse</span>
          </div>
          <button
            onClick={() => {
              onSelectIpo();
              onClose();
            }}
            className="text-sky-700 font-semibold hover:underline flex items-center gap-1"
          >
            Check Live IPOs <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
