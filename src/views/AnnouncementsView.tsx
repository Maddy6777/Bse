import React, { useState } from 'react';
import { MOCK_ANNOUNCEMENTS, MOCK_NEWS } from '../data/mockMarketData';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Download, 
  Bell, 
  ExternalLink,
  ShieldCheck,
  Building2,
  Newspaper
} from 'lucide-react';

export const AnnouncementsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'announcements' | 'circulars' | 'news'>('announcements');
  const [search, setSearch] = useState('');

  const filteredAnnouncements = MOCK_ANNOUNCEMENTS.filter(
    a =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase()) ||
      a.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const filteredNews = MOCK_NEWS.filter(
    n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Announcements, Circulars & Market News
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-50 text-sky-800 border border-sky-200">
              Regulatory Repository
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Mandatory corporate submissions under SEBI (Listing Obligations and Disclosure Requirements) Regulations
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
          {[
            { id: 'announcements', label: 'Company Filings' },
            { id: 'circulars', label: 'Exchange Circulars' },
            { id: 'news', label: 'Market Wire News' },
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

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search filings by company, headline, or regulatory subject..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Announcements List */}
      {activeTab === 'announcements' && (
        <div className="space-y-3">
          {filteredAnnouncements.map(ann => (
            <div
              key={ann.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#002b5b] bg-slate-100 px-2 py-0.5 rounded font-mono-nums">
                    {ann.symbol}
                  </span>
                  <span className="font-semibold text-slate-700">{ann.companyName}</span>
                  <span>·</span>
                  <span className="font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-1.5 py-0.5 rounded text-[10px]">
                    {ann.category}
                  </span>
                </div>
                <span className="font-mono-nums">{ann.date} at {ann.time}</span>
              </div>

              <h3 className="font-bold text-sm text-slate-900 leading-snug">{ann.title}</h3>
              <p className="text-xs text-slate-600">{ann.summary}</p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => alert(`Downloading verified PDF filing: ${ann.attachmentName}`)}
                  className="flex items-center gap-1.5 text-sky-700 font-bold hover:underline cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Filing: {ann.attachmentName}</span>
                  <span className="text-slate-400 font-normal">({ann.fileSize})</span>
                </button>
                <span className="text-[11px] text-slate-400 font-mono-nums">Document ID: #LODR-2026-98124</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exchange Circulars List */}
      {activeTab === 'circulars' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs divide-y divide-slate-100">
          {[
            {
              id: 'circ-1',
              num: 'BFX/SURV/2026/142',
              date: '28 Sep 2026',
              subject: 'Graded Surveillance Measure (GSM) - List of Securities moving into Stage II',
              dept: 'Surveillance Department',
              size: '420 KB',
            },
            {
              id: 'circ-2',
              num: 'BFX/CLEARING/2026/089',
              date: '27 Sep 2026',
              subject: 'Clearing and Settlement Holiday on Account of Gandhi Jayanti on 02-Oct-2026',
              dept: 'Clearing & Settlement Corporation',
              size: '185 KB',
            },
            {
              id: 'circ-3',
              num: 'BFX/TECH/2026/210',
              date: '25 Sep 2026',
              subject: 'Mock Trading Session scheduled on Saturday, 03-Oct-2026 for Disaster Recovery site validation',
              dept: 'Trading Technology Operations',
              size: '512 KB',
            },
            {
              id: 'circ-4',
              num: 'BFX/MEMB/2026/045',
              date: '22 Sep 2026',
              subject: 'Mandatory Submission of Internal Audit Report for Half Year ended September 30, 2026',
              dept: 'Membership Compliance',
              size: '340 KB',
            },
          ].map(c => (
            <div key={c.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between text-xs">
              <div>
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <span className="font-mono-nums font-bold text-[#002b5b]">{c.num}</span>
                  <span>·</span>
                  <span>{c.date}</span>
                  <span>·</span>
                  <span className="text-slate-600">{c.dept}</span>
                </div>
                <div className="font-bold text-sm text-slate-900">{c.subject}</div>
              </div>
              <button
                onClick={() => alert(`Downloading circular ${c.num}`)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#002b5b] font-semibold flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF ({c.size})</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map(item => (
            <div key={item.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span className="font-bold text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded uppercase">
                  {item.category}
                </span>
                <span>·</span>
                <span>{item.source}</span>
                <span>·</span>
                <span>{item.time}</span>
              </div>
              <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600">{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
