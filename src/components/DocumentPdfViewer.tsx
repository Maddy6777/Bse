import React, { useState, useMemo } from 'react';
import { 
  PDF_CHAPTERS, 
  PDF_DOCUMENT_INFO, 
  DocumentChapter 
} from '../data/pdfDocumentData';
import { 
  BookOpen, 
  Download, 
  Search, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Bookmark, 
  Share2, 
  Sparkles,
  Maximize2,
  Minimize2,
  Printer
} from 'lucide-react';

export const DocumentPdfViewer: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'reader' | 'table-of-contents' | 'quick-rules'>('reader');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  // Active selected chapter
  const currentChapterIndex = PDF_CHAPTERS.findIndex(c => c.id === selectedChapterId);
  const currentChapter = PDF_CHAPTERS[currentChapterIndex] || PDF_CHAPTERS[0];

  // Filter rules across all chapters if searching, or within current chapter
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    const results: { chapterTitle: string; rule: DocumentChapter['rules'][0] }[] = [];

    PDF_CHAPTERS.forEach(ch => {
      ch.rules.forEach(r => {
        if (
          r.title.toLowerCase().includes(query) ||
          r.explanation.toLowerCase().includes(query) ||
          r.takeaway.toLowerCase().includes(query) ||
          r.ruleNo.toLowerCase().includes(query)
        ) {
          results.push({ chapterTitle: ch.title, rule: r });
        }
      });
    });

    return results;
  }, [searchQuery]);

  // Download complete document as a structured readable file
  const handleDownloadDocument = () => {
    let content = `=================================================================\n`;
    content += `${PDF_DOCUMENT_INFO.title}\n`;
    content += `${PDF_DOCUMENT_INFO.subtitle}\n`;
    content += `${PDF_DOCUMENT_INFO.tagline}\n`;
    content += `Document Publication: ${PDF_DOCUMENT_INFO.publicationYear}\n`;
    content += `Heading: ${PDF_DOCUMENT_INFO.heading}\n`;
    content += `=================================================================\n\n`;

    PDF_CHAPTERS.forEach(ch => {
      content += `-----------------------------------------------------------------\n`;
      content += `CHAPTER ${ch.number}: ${ch.title.toUpperCase()} (${ch.pageRange})\n`;
      content += `Summary: ${ch.summary}\n`;
      content += `-----------------------------------------------------------------\n\n`;

      ch.rules.forEach(r => {
        content += `${r.ruleNo}: ${r.title}\n`;
        content += `Simple Explanation: ${r.explanation}\n`;
        if (r.example) {
          content += `Example: ${r.example}\n`;
        }
        content += `Key Takeaway: ${r.takeaway}\n\n`;
      });
      content += `\n`;
    });

    content += `\n=================================================================\n`;
    content += `THANK YOU - End of Official Publication (2026 Edition)\n`;
    content += `=================================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `The_New_Rules_For_Men_2026_Result.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < PDF_CHAPTERS.length - 1) {
      setSelectedChapterId(PDF_CHAPTERS[currentChapterIndex + 1].id);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setSelectedChapterId(PDF_CHAPTERS[currentChapterIndex - 1].id);
    }
  };

  return (
    <div className={`space-y-6 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#f4f6f9] p-6 overflow-y-auto' : ''}`}>
      {/* 1. MANDATORY HEADING AS REQUESTED BY USER */}
      <div className="bg-gradient-to-r from-[#002b5b] via-[#003875] to-[#001f3f] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-[#0a2e5c] relative overflow-hidden">
        {/* Background Decorative Accent */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <BookOpen className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Official Document Repository</span>
          </div>

          {/* Exact Requested Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-display">
            Here is the result of 2026
          </h2>

          <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
            <strong>{PDF_DOCUMENT_INFO.title}</strong> — {PDF_DOCUMENT_INFO.subtitle}. Complete 11-chapter edition covering relationship principles, kitchen fundamentals, professional standards, travel etiquette, style truths, and lifelong character.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadDocument}
              className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Full Document (2026 Edition)</span>
            </button>

            <button
              onClick={() => setActiveTab('table-of-contents')}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg text-xs transition-colors border border-white/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-sky-300" />
              <span>Browse Table of Contents (11 Chapters)</span>
            </button>

            {downloadSuccess && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>Downloaded Successfully!</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. VIEWER NAVIGATION & CONTROLS BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Navigation Mode Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('reader');
              setSearchQuery('');
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'reader' && !searchQuery
                ? 'bg-[#002b5b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Chapter Reader
          </button>

          <button
            onClick={() => {
              setActiveTab('table-of-contents');
              setSearchQuery('');
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'table-of-contents'
                ? 'bg-[#002b5b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Table of Contents
          </button>

          <button
            onClick={() => {
              setActiveTab('quick-rules');
              setSearchQuery('');
            }}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'quick-rules'
                ? 'bg-[#002b5b] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Highlight Rules
          </button>
        </div>

        {/* Search Bar Across Document */}
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search rules, keywords (e.g. cooking, suit, date)..."
              className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#002b5b]"
            />
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 border border-slate-300 rounded-lg hover:bg-slate-50 text-slate-600 cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reader'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 3. SEARCH RESULTS MODE (if query entered) */}
      {searchQuery.trim().length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">
              Search Results for "{searchQuery}" ({searchResults.length} rules found)
            </h3>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-sky-700 hover:underline"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              No matching rules found for "{searchQuery}". Try searching for words like "interview", "wine", "suit", "plan", or "respect".
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.map((res, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-[#002b5b] transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-bold font-mono-nums text-[#002b5b] bg-slate-100 px-2 py-0.5 rounded">
                      {res.rule.ruleNo}
                    </span>
                    <span className="text-slate-400">{res.chapterTitle}</span>
                  </div>

                  <h4 className="font-bold text-xs text-slate-900 leading-snug">
                    {res.rule.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.rule.explanation}
                  </p>

                  <div className="p-2.5 bg-amber-50/80 rounded-lg border border-amber-200/80 text-[11px] text-amber-950 font-medium">
                    <strong>Key Takeaway:</strong> {res.rule.takeaway}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <>
          {/* 4. CHAPTER READER VIEW */}
          {activeTab === 'reader' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Sidebar: Chapters Navigation */}
              <div className="lg:col-span-4 bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-2 max-h-[750px] overflow-y-auto custom-scrollbar">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 pb-1">
                  Table of Chapters
                </div>

                {PDF_CHAPTERS.map(ch => {
                  const isSelected = ch.id === selectedChapterId;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-start justify-between gap-2 cursor-pointer ${
                        isSelected
                          ? 'bg-[#002b5b] text-white shadow-xs'
                          : 'hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                          Chapter {ch.number}
                        </div>
                        <div className="font-bold text-xs mt-0.5">{ch.title}</div>
                        <div className="text-[11px] opacity-75 mt-0.5 font-mono-nums">
                          {ch.pageRange} · {ch.rules.length} Rules
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 mt-1 shrink-0 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  );
                })}
              </div>

              {/* Right Content: Active Chapter Rules & Insights */}
              <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
                {/* Chapter Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Chapter {currentChapter.number} · {currentChapter.pageRange}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 mt-1 font-display">
                      {currentChapter.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      {currentChapter.summary}
                    </p>
                  </div>

                  {/* Previous / Next Controls */}
                  <div className="flex items-center gap-1.5 self-start sm:self-auto">
                    <button
                      onClick={handlePrevChapter}
                      disabled={currentChapterIndex === 0}
                      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-mono-nums font-semibold px-2 text-slate-600">
                      {currentChapterIndex + 1} / {PDF_CHAPTERS.length}
                    </span>
                    <button
                      onClick={handleNextChapter}
                      disabled={currentChapterIndex === PDF_CHAPTERS.length - 1}
                      className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Rules Cards List */}
                <div className="space-y-4">
                  {currentChapter.rules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors space-y-3"
                    >
                      {/* Rule Number & Badge */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 bg-[#002b5b] text-white text-[11px] font-mono-nums font-black rounded-md shadow-xs">
                          {rule.ruleNo}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                          Esquire Guide
                        </span>
                      </div>

                      {/* Rule Title */}
                      <h4 className="text-sm font-black text-slate-900 leading-snug">
                        {rule.title}
                      </h4>

                      {/* Simple Explanation */}
                      <div className="text-xs text-slate-700 leading-relaxed space-y-1">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Simple Explanation
                        </div>
                        <p>{rule.explanation}</p>
                      </div>

                      {/* Example if exists */}
                      {rule.example && (
                        <div className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200/80 space-y-1">
                          <div className="text-[10px] font-bold text-sky-700 uppercase tracking-wider">
                            Real-Life Example
                          </div>
                          <p className="italic">"{rule.example}"</p>
                        </div>
                      )}

                      {/* Key Takeaway Box */}
                      <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200 text-xs text-amber-950 font-medium">
                        <strong className="text-amber-900">Key Takeaway:</strong> {rule.takeaway}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chapter Bottom Pagination Bar */}
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-xs">
                  <button
                    onClick={handlePrevChapter}
                    disabled={currentChapterIndex === 0}
                    className="flex items-center gap-1 font-semibold text-[#002b5b] disabled:opacity-30 disabled:cursor-not-allowed hover:underline cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Chapter</span>
                  </button>

                  <span className="text-slate-500 text-[11px]">
                    Chapter {currentChapter.number} of {PDF_CHAPTERS.length}
                  </span>

                  <button
                    onClick={handleNextChapter}
                    disabled={currentChapterIndex === PDF_CHAPTERS.length - 1}
                    className="flex items-center gap-1 font-semibold text-[#002b5b] disabled:opacity-30 disabled:cursor-not-allowed hover:underline cursor-pointer"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 5. TABLE OF CONTENTS VIEW */}
          {activeTab === 'table-of-contents' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900">
                  Full Table of Contents (Pages 1 to 277)
                </h3>
                <p className="text-xs text-slate-500">
                  Comprehensive 11-topic breakdown from the 2026 result publication
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PDF_CHAPTERS.map(ch => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      setSelectedChapterId(ch.id);
                      setActiveTab('reader');
                    }}
                    className="p-5 rounded-xl border border-slate-200 hover:border-[#002b5b] hover:shadow-sm transition-all cursor-pointer space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-bold text-[#002b5b]">CHAPTER {ch.number}</span>
                        <span className="font-mono-nums">{ch.pageRange}</span>
                      </div>
                      <h4 className="font-bold text-sm text-slate-900 mt-1">{ch.title}</h4>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                        {ch.summary}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-sky-700 font-bold">
                      <span>Read {ch.rules.length} Rules</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. ALL HIGHLIGHT RULES VIEW */}
          {activeTab === 'quick-rules' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-slate-900">
                    Master Rules Repository (2026 Edition)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Curated rules, explanations, and takeaways across all 11 chapters
                  </p>
                </div>
                <button
                  onClick={handleDownloadDocument}
                  className="px-3 py-1.5 bg-[#002b5b] text-white font-bold rounded-lg text-xs hover:bg-[#003875] flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export All</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PDF_CHAPTERS.flatMap(ch => ch.rules.map(r => ({ ...r, chTitle: ch.title }))).map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-slate-400">
                      <span className="font-bold font-mono-nums text-[#002b5b] bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.ruleNo}
                      </span>
                      <span>{item.chTitle}</span>
                    </div>
                    <div className="font-bold text-xs text-slate-900 leading-snug">{item.title}</div>
                    <div className="text-[11px] text-slate-600 leading-relaxed">{item.explanation}</div>
                    <div className="p-2 bg-amber-50 rounded border border-amber-200/80 text-[10px] text-amber-950 font-medium">
                      <strong>Takeaway:</strong> {item.takeaway}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
