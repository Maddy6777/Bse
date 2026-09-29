import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  FileText, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#001f3f] text-slate-300 text-xs border-t border-[#0a2e5c] mt-16 select-none">
      {/* Risk Disclosure Warning Banner */}
      <div className="bg-[#001429] border-b border-[#0a2e5c] py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center gap-2.5 text-[11px] text-amber-300/90">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 md:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-amber-300">Statutory Risk Disclosure:</strong> Securities, Derivatives and Capital Market investments are subject to market risks. Please read all scheme-related and offer documents carefully before investing. 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses over FY24-FY25 as per SEBI study reports.
          </p>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* Column 1: Exchange Profile */}
        <div className="col-span-2 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-sky-400 to-[#002b5b] p-1 flex items-center justify-center font-bold text-white text-xs">
              BFX
            </div>
            <div>
              <div className="font-black text-white text-base tracking-tight font-display">
                Bharat Financial Exchange
              </div>
              <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                Premier Indian Capital Market · Est. 1888
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            BFX is India’s premier institutional securities exchange providing ultra-low latency trading, real-time index computation, derivatives clearing, and sovereign grade capital formation frameworks.
          </p>
          <div className="pt-2 text-slate-400 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>BFX Towers, Dalal Marg, Fort, Mumbai - 400 001</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Toll Free Investor Care: 1800-22-BFX (239) / +91-22-2272-1234</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>investor.services@bfxindia.com · listings@bfxindia.com</span>
            </div>
          </div>
        </div>

        {/* Column 2: Markets & Products */}
        <div>
          <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-3 text-sky-400">
            Markets
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('stocks')} className="hover:text-white transition-colors cursor-pointer">
                Equity & Cash Market
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('indices')} className="hover:text-white transition-colors cursor-pointer">
                Indices & Benchmarks
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('derivatives')} className="hover:text-white transition-colors cursor-pointer">
                Equity Derivatives (F&O)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('derivatives')} className="hover:text-white transition-colors cursor-pointer">
                Option Chain
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('market-data')} className="hover:text-white transition-colors cursor-pointer">
                Currency & Debt Segment
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('market-data')} className="hover:text-white transition-colors cursor-pointer">
                Exchange Traded Funds (ETFs)
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Corporate & Listings */}
        <div>
          <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-3 text-sky-400">
            Listings & Data
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('ipo')} className="hover:text-white transition-colors cursor-pointer">
                Public Issues (IPO/FPO)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('corporate-actions')} className="hover:text-white transition-colors cursor-pointer">
                Corporate Actions & Dividends
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('announcements')} className="hover:text-white transition-colors cursor-pointer">
                Company Announcements
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('market-data')} className="hover:text-white transition-colors cursor-pointer">
                Daily Bhav Copy
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('market-data')} className="hover:text-white transition-colors cursor-pointer">
                Historical Market Data
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('companies')} className="hover:text-white transition-colors cursor-pointer">
                Listed Companies Directory
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: Investors */}
        <div>
          <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-3 text-sky-400">
            Investors
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors cursor-pointer">
                Investor Grievance (SCORES)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors cursor-pointer">
                Investor Protection Fund (IPF)
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors cursor-pointer">
                Market Basics & Tutorials
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors cursor-pointer">
                Investor Charter
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('investors')} className="hover:text-white transition-colors cursor-pointer">
                KYC & Demat FAQs
              </button>
            </li>
          </ul>
        </div>

        {/* Column 5: Regulations & Institutional */}
        <div>
          <h4 className="font-bold text-white text-xs tracking-wider uppercase mb-3 text-sky-400">
            Exchange
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                About BFX
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                Board & Governance
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('announcements')} className="hover:text-white transition-colors cursor-pointer">
                Exchange Circulars & Bye-Laws
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                Regional Offices
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer">
                Careers at BFX
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors cursor-pointer">
                Media & Press Room
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Compliance */}
      <div className="border-t border-[#0a2e5c] bg-[#001730] py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Bharat Financial Exchange Limited (BFX). All Rights Reserved. Permanent Recognition under Securities Contracts (Regulation) Act.
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-white">Privacy Policy</button>
            <span>·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white">Terms of Use</button>
            <span>·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white">Disclaimer</button>
            <span>·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white">Cyber Security</button>
            <span>·</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
