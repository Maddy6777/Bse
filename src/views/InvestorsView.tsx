import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HelpCircle, 
  BookOpen, 
  FileText, 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';

export const InvestorsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'education' | 'grievance' | 'charter' | 'faqs'>('education');
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    pan: '',
    email: '',
    brokerName: '',
    subject: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setComplaintForm({ name: '', pan: '', email: '', brokerName: '', subject: '', details: '' });
    }, 4000);
  };

  const faqs = [
    {
      q: 'What are the normal market trading hours on Bharat Financial Exchange (BFX)?',
      a: 'The pre-open session takes place from 09:00 to 09:15 IST. Regular continuous trading occurs from 09:15 to 15:30 IST from Monday to Friday, excluding published exchange holidays. Post-closing session runs from 15:40 to 16:00 IST.',
    },
    {
      q: 'What is the settlement cycle followed for Equity Cash transactions?',
      a: 'BFX follows the T+1 rolling settlement framework for all listed equities, where trades executed on Day T are settled on the next working day. An optional T+0 instant settlement facility is also operational for eligible top-500 counters.',
    },
    {
      q: 'What is the Investor Protection Fund (IPF) and how does it safeguard retail investors?',
      a: 'The Investor Protection Fund (IPF) at BFX is administered by an independent Trust to compensate bona fide investors in the event of default or insolvency of a Trading Member, up to a statutory ceiling of ₹25 Lakhs per client.',
    },
    {
      q: 'How does the online dispute resolution and grievance redressal mechanism work?',
      a: 'Investors can file complaints directly through the SEBI Complaints Redress System (SCORES 2.0) or BFX Investor Services Cell. An amicable resolution is targeted within 21 working days, failing which the dispute can be escalated to Online Dispute Resolution (ODR) conciliation.',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-slate-900 tracking-tight font-display">
              Investor Corner & Services Center
            </h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Investor First
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Financial literacy resources, rights charter, risk disclosures, and statutory grievance redressal mechanisms
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start md:self-auto">
          {[
            { id: 'education', label: 'Market Basics' },
            { id: 'grievance', label: 'File Grievance' },
            { id: 'charter', label: 'Investor Charter' },
            { id: 'faqs', label: 'FAQs & Help' },
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

      {/* 1. MARKET BASICS TAB */}
      {activeTab === 'education' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Understanding Demat & Trading Accounts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Learn how a Trading Account enables order entry while a Demat Account (held with CDSL/NSDL) acts as your electronic safe custody for shares, bonds, and ETFs.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Order Types: Limit vs Market vs Stop-Loss</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Discover the difference between Market Orders (executed immediately at prevailing price) and Limit Orders (executed strictly at your preferred price or better).
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Corporate Actions & Ex-Date Timelines</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understand why share prices adjust on the Ex-Date and how entitlement to dividends, bonus shares, and stock splits is determined by the Record Date.
              </p>
            </div>
          </div>

          {/* Golden Rules of Investing Card */}
          <div className="bg-[#002b5b] text-white p-6 rounded-xl space-y-3">
            <h3 className="text-base font-bold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-400" />
              Golden Rules for Retail Investors in Capital Markets
            </h3>
            <ul className="text-xs text-slate-200 space-y-2 list-disc list-inside leading-relaxed">
              <li>Always deal with SEBI-registered intermediaries (Stock Brokers, Depository Participants).</li>
              <li>Ensure your mobile number and email ID are updated in both your Demat and Trading account records.</li>
              <li>Never share your trading login credentials, OTPs, or Demat power of attorney with unverified advisors.</li>
              <li>Read all scheme information documents, offer documents (RHP), and financial disclosures thoroughly.</li>
              <li>Avoid relying on unsolicited stock tips received on social media and messaging channels.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 2. GRIEVANCE REDRESSAL TAB */}
      {activeTab === 'grievance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Lodge an Investor Complaint / Grievance
              </h2>
              <p className="text-xs text-slate-500">
                Direct submission to BFX Investor Services Cell for time-bound resolution
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-950 text-sm">Grievance Registered Successfully</h3>
                <p className="text-xs text-emerald-800 font-mono-nums">
                  Reference Token: <strong>#BFX-INV-2026-{Math.floor(10000 + Math.random() * 90000)}</strong>
                </p>
                <p className="text-xs text-slate-600">
                  You will receive an official acknowledgment and response on your registered email within 3 working days.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitComplaint} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Investor Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={complaintForm.name}
                      onChange={e => setComplaintForm({ ...complaintForm, name: e.target.value })}
                      placeholder="As per PAN card"
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      PAN Number
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={10}
                      value={complaintForm.pan}
                      onChange={e => setComplaintForm({ ...complaintForm, pan: e.target.value.toUpperCase() })}
                      placeholder="ABCDE1234F"
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 font-mono-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={complaintForm.email}
                      onChange={e => setComplaintForm({ ...complaintForm, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Trading Member / Broker Name
                    </label>
                    <input
                      type="text"
                      required
                      value={complaintForm.brokerName}
                      onChange={e => setComplaintForm({ ...complaintForm, brokerName: e.target.value })}
                      placeholder="e.g. Zerodha / Groww / HDFC Sec"
                      className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Subject / Category of Dispute
                  </label>
                  <select
                    value={complaintForm.subject}
                    onChange={e => setComplaintForm({ ...complaintForm, subject: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Non-receipt of funds/payout">Non-receipt of funds / payout</option>
                    <option value="Non-receipt of securities">Non-receipt of shares / securities</option>
                    <option value="Unauthorized trades">Unauthorized trades</option>
                    <option value="Excessive brokerage charge">Excessive brokerage charge</option>
                    <option value="Corporate action non-credit">Dividend / Corporate Action non-credit</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={complaintForm.details}
                    onChange={e => setComplaintForm({ ...complaintForm, details: e.target.value })}
                    placeholder="Provide trade dates, order numbers, and summary of the issue..."
                    className="w-full p-2 border border-slate-300 rounded-lg text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#002b5b] hover:bg-[#003875] text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Grievance to BFX Cell</span>
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs space-y-3">
              <h3 className="font-bold text-slate-900">Alternative Escalation Channels</h3>
              <p className="text-slate-600 leading-relaxed">
                If your grievance is not redressed by the trading member within 30 calendar days, you may approach:
              </p>
              <div className="space-y-2 pt-1 font-medium">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">SEBI SCORES 2.0 Portal</div>
                  <div className="text-[11px] text-slate-500">Centralized web-based grievance redressal system of SEBI</div>
                  <a href="https://scores.sebi.gov.in" target="_blank" rel="noreferrer" className="text-sky-700 text-[11px] font-bold hover:underline inline-flex items-center gap-1 mt-1">
                    Visit SCORES 2.0 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-900">SMART ODR Portal</div>
                  <div className="text-[11px] text-slate-500">Online dispute resolution conciliation and arbitration</div>
                  <span className="text-sky-700 text-[11px] font-bold inline-flex items-center gap-1 mt-1">
                    smartodr.in
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. INVESTOR CHARTER */}
      {activeTab === 'charter' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4 text-xs leading-relaxed text-slate-700">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b">
            Investor Charter in respect of Recognized Stock Exchanges
          </h2>
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Vision & Mission</h3>
            <p>
              To protect the interests of investors in securities and to promote the development of, and to regulate the securities market through time-tested surveillance, integrity, transparency, and technological prowess.
            </p>
            <h3 className="font-bold text-sm text-slate-900 pt-2">Rights of Investors</h3>
            <ul className="list-disc list-inside space-y-1.5">
              <li>Right to get fair and transparent pricing through automated matching mechanisms.</li>
              <li>Right to receive contract notes from stock brokers within 24 hours of trade execution.</li>
              <li>Right to receive funds and securities payout strictly within the stipulated settlement timelines.</li>
              <li>Right to access corporate announcements, financial statements, and shareholding patterns on a non-discriminatory basis.</li>
              <li>Right to register grievances through the Exchange mechanism and seek conciliation under SEBI guidelines.</li>
            </ul>
          </div>
        </div>
      )}

      {/* 4. FAQS TAB */}
      {activeTab === 'faqs' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-base font-bold text-slate-900 pb-2 border-b">
            Frequently Asked Questions by Market Participants
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-bold text-xs text-slate-900 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="p-4 bg-white text-xs text-slate-600 leading-relaxed border-t border-slate-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
