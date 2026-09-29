/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MarketTicker } from './components/MarketTicker';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';

// Views
import { HomeView } from './views/HomeView';
import { StocksView } from './views/StocksView';
import { StockDetailView } from './views/StockDetailView';
import { IndicesView } from './views/IndicesView';
import { DerivativesView } from './views/DerivativesView';
import { IpoView } from './views/IpoView';
import { MarketDataView } from './views/MarketDataView';
import { CorporateActionsView } from './views/CorporateActionsView';
import { AnnouncementsView } from './views/AnnouncementsView';
import { InvestorsView } from './views/InvestorsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { CompaniesView } from './views/CompaniesView';
import { MutualFundsView } from './views/MutualFundsView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedStockSymbol, setSelectedStockSymbol] = useState<string>('RELIANCE');
  const [selectedIndexSymbol, setSelectedIndexSymbol] = useState<string>('SENSEX');
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab, selectedStockSymbol]);

  // Global keyboard listener for search modal (Ctrl+K or Cmd+K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (tab: string, param?: string) => {
    if (tab === 'stock-detail') {
      if (param) setSelectedStockSymbol(param);
      setCurrentTab('stock-detail');
      return;
    }
    if (tab === 'indices') {
      if (param) setSelectedIndexSymbol(param);
      setCurrentTab('indices');
      return;
    }
    if (tab === 'markets') {
      setCurrentTab('stocks');
      return;
    }
    if (tab === 'regulations') {
      setCurrentTab('announcements');
      return;
    }
    if (tab === 'resources') {
      setCurrentTab('investors');
      return;
    }
    setCurrentTab(tab);
  };

  const handleSelectTicker = (tickerSymbol: string) => {
    if (tickerSymbol.includes('SENSEX') || tickerSymbol.includes('50') || tickerSymbol.includes('BANKEX') || tickerSymbol.includes('IT')) {
      handleNavigate('indices', tickerSymbol.replace('BFX ', ''));
    } else {
      handleNavigate('market-data');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f6f9] text-[#1e293b]">
      {/* 1. Top Multi-Level Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />

      {/* 2. Horizontally Scrolling Market Ticker */}
      <MarketTicker onSelectTicker={handleSelectTicker} />

      {/* 3. Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView onNavigate={handleNavigate} />
        )}

        {currentTab === 'stocks' && (
          <StocksView
            onSelectStock={sym => {
              setSelectedStockSymbol(sym);
              setCurrentTab('stock-detail');
            }}
          />
        )}

        {currentTab === 'stock-detail' && (
          <StockDetailView
            symbol={selectedStockSymbol}
            onBack={() => setCurrentTab('stocks')}
            onSelectStock={sym => {
              setSelectedStockSymbol(sym);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'indices' && (
          <IndicesView
            initialIndexSymbol={selectedIndexSymbol}
            onSelectIndexStock={sym => {
              setSelectedStockSymbol(sym);
              setCurrentTab('stock-detail');
            }}
          />
        )}

        {currentTab === 'derivatives' && (
          <DerivativesView />
        )}

        {currentTab === 'ipo' && (
          <IpoView />
        )}

        {currentTab === 'market-data' && (
          <MarketDataView />
        )}

        {currentTab === 'corporate-actions' && (
          <CorporateActionsView />
        )}

        {currentTab === 'announcements' && (
          <AnnouncementsView />
        )}

        {currentTab === 'investors' && (
          <InvestorsView />
        )}

        {currentTab === 'companies' && (
          <CompaniesView
            onSelectStock={sym => {
              setSelectedStockSymbol(sym);
              setCurrentTab('stock-detail');
            }}
          />
        )}

        {currentTab === 'mutual-funds' && (
          <MutualFundsView />
        )}

        {currentTab === 'about' && (
          <AboutView />
        )}

        {currentTab === 'contact' && (
          <ContactView />
        )}
      </main>

      {/* 4. Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectStock={sym => {
          setSelectedStockSymbol(sym);
          setCurrentTab('stock-detail');
        }}
        onSelectIndex={sym => {
          setSelectedIndexSymbol(sym);
          setCurrentTab('indices');
        }}
        onSelectIpo={() => {
          setCurrentTab('ipo');
        }}
      />

      {/* 5. Institutional Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
