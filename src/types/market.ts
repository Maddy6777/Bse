export interface Stock {
  symbol: string;
  name: string;
  isin: string;
  sector: string;
  industry: string;
  ltp: number; // Last Traded Price
  change: number;
  pChange: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  valueCr: number; // Turnover in ₹ Crores
  marketCapCr: number;
  pe: number;
  pb: number;
  eps: number;
  dividendYield: number;
  high52: number;
  low52: number;
  faceValue: number;
  beta: number;
  sparkline: number[];
  category: 'LargeCap' | 'MidCap' | 'SmallCap';
  isGainer?: boolean;
  isLoser?: boolean;
  is52WHigh?: boolean;
  is52WLow?: boolean;
  isVolumeShocker?: boolean;
}

export interface MarketIndex {
  id: string;
  name: string;
  symbol: string;
  current: number;
  change: number;
  pChange: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  high52: number;
  low52: number;
  pe: number;
  pb: number;
  divYield: number;
  advances: number;
  declines: number;
  unchanged: number;
  sparkline: number[];
  category: 'Broad' | 'Sectoral' | 'Thematic';
}

export interface OptionContract {
  strikePrice: number;
  callOI: number;
  callChgOI: number;
  callVolume: number;
  callIV: number;
  callLTP: number;
  callNetChg: number;
  callBid: number;
  callAsk: number;
  putLTP: number;
  putNetChg: number;
  putIV: number;
  putVolume: number;
  putChgOI: number;
  putOI: number;
  putBid: number;
  putAsk: number;
}

export interface IPOItem {
  id: string;
  companyName: string;
  symbol: string;
  status: 'Ongoing' | 'Upcoming' | 'Listed';
  issueSizeCr: number;
  priceBand: string;
  minPrice: number;
  maxPrice: number;
  openDate: string;
  closeDate: string;
  listingDate: string;
  lotSize: number;
  minInvestment: number;
  subscription: {
    qib: number;
    nii: number;
    retail: number;
    total: number;
  };
  issueType: '100% Book Built' | 'Fixed Price';
  leadManagers: string[];
  listingPrice?: number;
  listingGainsPct?: number;
}

export interface CorporateAction {
  id: string;
  symbol: string;
  companyName: string;
  purpose: 'Dividend' | 'Bonus' | 'Stock Split' | 'Rights' | 'AGM/EGM' | 'Board Meeting';
  details: string;
  exDate: string;
  recordDate: string;
  dividendAmount?: number;
  ratio?: string;
}

export interface Announcement {
  id: string;
  symbol: string;
  companyName: string;
  title: string;
  category: 'Financial Results' | 'Board Meeting' | 'Acquisitions' | 'Regulatory' | 'Investor Meet' | 'Corporate';
  time: string;
  date: string;
  attachmentName: string;
  fileSize: string;
  summary: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  time: string;
  category: 'Market Wrap' | 'Corporate' | 'Economy' | 'Commodities' | 'Policy';
  summary: string;
  relatedSymbols: string[];
}

export interface HistoricalPrice {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  turnoverCr: number;
}
