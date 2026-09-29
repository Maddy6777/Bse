import React, { useState } from 'react';
import { MOCK_IPOS } from '../data/mockMarketData';
import { IPOItem } from '../types/market';
import { 
  Layers, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  AlertCircle, 
  Download, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export const IpoView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Ongoing' | 'Upcoming' | 'Listed' | 'Calendar'>('Ongoing');
  const [selectedIpo, setSelectedIpo] = useState<IPOItem | null>(null);
  const [bidModalOpen, setBidModalOpen] = useState(false);
  const [bidQuantityLots, setBidQuantityLots] = useState(1);
  const [upiId, setUpiId] = useState('');
  const [bidSuccess, setBidSuccess] = useState(false);

  const filteredIpos = MOCK_IPOS.filter(ipo => {
    if (activeTab === 'Calendar') return true;
    return ipo.status === activeTab;
  });

  const handleOpenBid = (ipo: IPOItem) => {
    setSelectedIpo(ipo);
    setBidQuantityLots(1);
    setBidSuccess(false);
    setBidModalOpen(true);
  };

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    setBidSuccess(true);
    setTimeout(() => {
      setBidSuccess(false);
      setBidModalOpen(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Primary Market & IPO Central
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              ASBA / UPI 2.0 Enabled
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track new equity listings, bidding schedules, live subscription numbers, and listing day debuts on BFX
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'Ongoing', label: 'Current / Open (2)' },
            { id: 'Upcoming', label: 'Upcoming (2)' },
            { id: 'Listed', label: 'Recently Listed (2)' },
            { id: 'Calendar', label: 'IPO Calendar' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#002b5b] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main IPO Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIpos.map(ipo => {
          const isOngoing = ipo.status === 'Ongoing';
          const isListed = ipo.status === 'Listed';

          return (
            <div
              key={ipo.id}
              className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all space-y-4"
            >
              <div>
                {/* Card Top: Name & Status */}
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-mono-nums font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                      {ipo.symbol}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-1">{ipo.companyName}</h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Issue Type: {ipo.issueType}
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded ${
                      isOngoing
                        ? 'bg-emerald-100 text-emerald-800'
                        : isListed
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ipo.status}
                  </span>
                </div>

                {/* Key Issue Details Grid */}
                <div className="grid grid-cols-2 gap-3 py-3 font-mono-nums text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Issue Size</div>
                    <div className="font-bold text-slate-900 mt-0.5">₹{ipo.issueSizeCr.toFixed(2)} Cr</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Price Band</div>
                    <div className="font-bold text-slate-900 mt-0.5">{ipo.priceBand}</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Lot Size</div>
                    <div className="font-bold text-slate-900 mt-0.5">{ipo.lotSize} Shares</div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-sans uppercase">Min Investment</div>
                    <div className="font-bold text-slate-900 mt-0.5">
                      ₹{ipo.minInvestment.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Dates Timeline */}
                <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200 text-xs space-y-1.5 font-mono-nums">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Bidding Period:</span>
                    <strong className="text-slate-800">{ipo.openDate} – {ipo.closeDate}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-sans">Listing Date:</span>
                    <strong className="text-sky-700">{ipo.listingDate} (on BFX)</strong>
                  </div>
                </div>

                {/* Subscription Progress Bars (if Ongoing or Listed) */}
                {ipo.subscription.total > 0 && (
                  <div className="mt-3 space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs font-mono-nums">
                      <span className="text-slate-600 font-semibold font-sans">Overall Subscription:</span>
                      <strong className="text-[#002b5b] font-bold text-sm">
                        {ipo.subscription.total}x Subscribed
                      </strong>
                    </div>

                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, ipo.subscription.total * 4)}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-500 font-mono-nums pt-1">
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span>QIB: <strong>{ipo.subscription.qib}x</strong></span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span>NII: <strong>{ipo.subscription.nii}x</strong></span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded border border-slate-100">
                        <span>Retail: <strong>{ipo.subscription.retail}x</strong></span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Listing Gain Badge if listed */}
                {isListed && ipo.listingPrice && (
                  <div className="mt-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex justify-between items-center text-xs font-mono-nums">
                    <div>
                      <div className="text-[10px] text-emerald-800 font-sans uppercase">Listing Day Price</div>
                      <div className="font-black text-emerald-900 text-sm">₹{ipo.listingPrice.toFixed(2)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-800 font-sans uppercase">Listing Gain</div>
                      <div className="font-black text-emerald-700 text-sm">+{ipo.listingGainsPct}%</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex gap-3">
                {isOngoing ? (
                  <button
                    onClick={() => handleOpenBid(ipo)}
                    className="flex-1 py-2.5 bg-[#002b5b] hover:bg-[#003875] text-white font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Apply via UPI / ASBA</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Viewing Red Herring Prospectus (RHP) for ${ipo.companyName}`)}
                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#002b5b] font-bold rounded-lg text-xs transition-colors border border-slate-200 cursor-pointer"
                  >
                    View Offer Document (RHP)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bidding Modal */}
      {bidModalOpen && selectedIpo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-slate-900 text-base">IPO Retail Application</h3>
                <p className="text-xs text-slate-500">ASBA via UPI Mandate · SEBI Validated</p>
              </div>
              <button
                onClick={() => setBidModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {bidSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-sm">UPI Mandate Request Sent</h4>
                <p className="text-xs text-slate-500">
                  Please approve the UPI mandate of ₹{(bidQuantityLots * selectedIpo.minInvestment).toLocaleString('en-IN')} on your UPI App (GPay, PhonePe, BHIM).
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceBid} className="space-y-4 text-xs">
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">{selectedIpo.companyName}</div>
                  <div className="flex justify-between text-slate-600 font-mono-nums">
                    <span>Cut-off Price: ₹{selectedIpo.maxPrice}</span>
                    <span>Lot Size: {selectedIpo.lotSize} Shares</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Number of Lots (Max 13 for Retail)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="13"
                    value={bidQuantityLots}
                    onChange={e => setBidQuantityLots(Math.max(1, Number(e.target.value)))}
                    className="w-full p-2 border border-slate-300 rounded-lg font-mono-nums font-bold text-slate-900"
                  />
                  <div className="text-[11px] text-slate-500 mt-1 font-mono-nums">
                    Total Shares: {bidQuantityLots * selectedIpo.lotSize} shares
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Enter Virtual Payment Address (UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank or yourname@ibl"
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-mono-nums"
                  />
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono-nums flex justify-between items-center">
                  <span className="text-slate-600 font-sans">Total Amount Blocked:</span>
                  <span className="font-black text-slate-900 text-sm">
                    ₹{(bidQuantityLots * selectedIpo.minInvestment).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Submit Bid Application
                  </button>
                  <button
                    type="button"
                    onClick={() => setBidModalOpen(false)}
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
