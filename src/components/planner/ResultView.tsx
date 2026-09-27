import React, { useState } from 'react';
import {
  Bookmark,
  Share2,
  RefreshCw,
  QrCode,
  MapPin,
  Clock,
  CreditCard,
  Lightbulb,
  Utensils,
  Car,
  Check,
  AlertTriangle,
  Music,
  CheckCircle2,
  Download,
  X,
  Copy,
  Send,
  Sparkles
} from 'lucide-react';
import { PlannerResult } from '../../types';

interface ResultViewProps {
  plan: PlannerResult;
  onNavigate: (tab: string) => void;
  onSavePlan: (plan: PlannerResult) => void;
  onRegenerate: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  plan,
  onNavigate,
  onSavePlan,
  onRegenerate
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [showPassModal, setShowPassModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleSave = () => {
    onSavePlan(plan);
    showToast('Plan committed to your Navratri Passbook!');
  };

  const handleRegenerateClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 800);
    onRegenerate();
    showToast('AI regenerated itinerary with updated traffic models');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShowShareModal(false);
    showToast('Itinerary link copied to clipboard!');
  };

  const handleShareWhatsApp = () => {
    setShowShareModal(false);
    showToast('Opening WhatsApp with Night plan details...');
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 bg-[#0e0024] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#cca830]/40 transition-all duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#ffe088]" />
          <span className="font-label-lg text-label-lg">{toastMessage}</span>
        </div>
      )}

      {/* Share Plan Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-[#0e0024]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-[#ccc4d0]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#0e0024] font-headline-sm text-headline-sm font-bold">
                <Share2 className="w-5 h-5 text-[#fd6b0f]" />
                <span>Share Night Plan</span>
              </div>
              <button
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#4a454f] hover:text-[#0e0024] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="font-body-md text-body-md text-[#4a454f]">
              Send this full Ahmedabad Navratri plan to your Garba group with pass QR and timing coordination.
            </p>
            <div className="p-4 bg-[#f5f3f0] rounded-xl flex items-center justify-center flex-col text-center border border-[#ccc4d0]/30">
              <div className="p-3 bg-white rounded-xl shadow-sm mb-2">
                <QrCode className="w-24 h-24 text-[#0e0024]" />
              </div>
              <span className="font-label-sm text-label-sm text-[#4a454f] uppercase tracking-wider font-bold">
                Scan to sync itinerary in GarbaGo
              </span>
            </div>
            <div className="space-y-2.5">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#0e0024] text-white rounded-xl font-label-lg text-label-lg hover:bg-[#2a114b] transition-colors cursor-pointer font-bold"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Group Link</span>
              </button>
              <button
                onClick={handleShareWhatsApp}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#fd6b0f] text-white rounded-xl font-label-lg text-label-lg hover:bg-[#e05a05] transition-colors cursor-pointer font-bold shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Share directly to WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customize Modal */}
      {showCustomizeModal && (
        <div className="fixed inset-0 z-50 bg-[#0e0024]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-[#ccc4d0]/40">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                Customize Itinerary
              </h3>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="w-8 h-8 rounded-full bg-[#efeeeb] flex items-center justify-center text-[#4a454f] hover:text-[#0e0024] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-[#4a454f] mb-1 font-bold">
                  Group Size
                </label>
                <div className="flex gap-2">
                  <span className="px-4 py-2 rounded-lg bg-[#0e0024] text-white font-label-md text-label-md font-bold">
                    {plan.groupSize || '3-5 Friends'}
                  </span>
                </div>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-[#4a454f] mb-1 font-bold">
                  Post-Midnight Food Stop
                </label>
                <select className="w-full bg-[#f5f3f0] p-3 rounded-lg font-body-md text-body-md text-[#0e0024] border border-[#ccc4d0]/40 focus:outline-none">
                  <option>Manek Chowk (Heritage Pols)</option>
                  <option>Sindhu Bhavan Road (SBR Modern Cafes)</option>
                  <option>Law Garden Street Food Lanes</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="px-4 py-2 rounded-lg bg-[#efeeeb] font-label-md text-label-md text-[#0e0024] cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCustomizeModal(false);
                  showToast('Itinerary tuned to your custom preferences');
                }}
                className="px-5 py-2 rounded-lg bg-[#fd6b0f] text-white font-label-md text-label-md hover:bg-[#e05a05] cursor-pointer font-bold shadow-md"
              >
                Recalculate Night
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pass QR Enlarged Modal */}
      {showPassModal && (
        <div className="fixed inset-0 z-50 bg-[#0e0024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#ccc4d0]/40">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-[#0e0024] font-bold">VIP Venue Pass</span>
              <button
                onClick={() => setShowPassModal(false)}
                className="text-[#4a454f] hover:text-[#0e0024] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-[#f5f3f0] rounded-xl flex flex-col items-center">
              <QrCode className="w-48 h-48 text-[#0e0024]" />
              <p className="font-mono text-sm font-bold text-[#0e0024] mt-2">
                GG-AMDV-8849-2025
              </p>
              <span className="text-xs text-[#a14000] font-semibold mt-1">
                Gate 2 • Fast-Track Turnstile Access
              </span>
            </div>
            <p className="text-xs text-[#4a454f]">
              Present this pass barcode directly at the venue scanner. Valid for offline entry.
            </p>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 space-y-8">
        {/* Screen Breadcrumb & Header Action Strip */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-label-md text-label-md text-[#4a454f] mb-1">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-[#0e0024] transition-colors cursor-pointer"
              >
                Home
              </button>
              <span>›</span>
              <button
                onClick={() => onNavigate('plan-my-night')}
                className="hover:text-[#0e0024] transition-colors cursor-pointer"
              >
                AI Planner
              </button>
              <span>›</span>
              <span className="text-[#a14000] font-bold">Night 8 Itinerary</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#0e0024] tracking-tight font-bold">
              Your Navratri Night
            </h1>
            <p className="font-body-md text-body-md text-[#4a454f] mt-0.5 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#fd6b0f]"></span>
              {plan.date} • Ahmedabad • {plan.groupSize} • {plan.vibe} Vibe
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#0e0024] font-label-lg text-label-lg transition-colors shadow-sm cursor-pointer font-bold"
            >
              <Bookmark className="w-4 h-4 text-[#a14000]" />
              <span>Save Plan</span>
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#efeeeb] hover:bg-[#eae8e5] text-[#0e0024] font-label-lg text-label-lg transition-colors shadow-sm cursor-pointer font-bold"
            >
              <Share2 className="w-4 h-4 text-[#a14000]" />
              <span>Share Plan</span>
              <span className="bg-[#0e0024] text-[#ffe088] font-label-sm text-label-sm px-1.5 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <QrCode className="w-3 h-3" />
                QR
              </span>
            </button>
            <button
              onClick={handleRegenerateClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#2a114b] text-[#eddcff] hover:bg-[#0e0024] hover:text-white transition-all shadow-sm cursor-pointer font-bold"
            >
              <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
              <span>Regenerate</span>
            </button>
          </div>
        </div>

        {/* 1. Premium AI-Generated Overview Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0e0024] text-white shadow-xl border border-[#cca830]/30">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#fd6b0f]/15 blur-3xl pointer-events-none"></div>
          <div className="absolute left-1/3 -bottom-20 w-96 h-96 rounded-full bg-[#cca830]/10 blur-3xl pointer-events-none"></div>

          {/* Mirror-work Abhala pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
            height="100%"
            width="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern height="40" id="abhala-grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 20 0 L 40 20 L 20 40 L 0 20 Z" fill="none" stroke="currentColor" strokeWidth="1.2"></path>
                <circle cx="20" cy="20" fill="currentColor" r="3"></circle>
              </pattern>
            </defs>
            <rect fill="url(#abhala-grid)" height="100%" width="100%"></rect>
          </svg>

          <div className="relative z-10 p-6 md:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#2a114b] border border-white/10 px-3.5 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#ffe088]" />
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#eddcff] font-bold">
                  Curated by Amdavad Cultural Neural Core
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg md:text-[36px] md:leading-[44px] tracking-tight text-white font-bold">
                {plan.title}
              </h2>
              <p className="font-body-lg text-body-lg text-[#eddcff]/90 leading-relaxed">
                {plan.summary}
              </p>

              {/* Quick Meta Strip */}
              <div className="pt-2 flex flex-wrap items-center gap-3 md:gap-4 text-[#eddcff] font-label-md text-label-md">
                <div className="flex items-center gap-1.5 bg-[#2a114b]/80 px-3.5 py-1.5 rounded-lg border border-white/10">
                  <MapPin className="w-4 h-4 text-[#fd6b0f]" />
                  <span>{plan.venueHighlight?.name || 'Karnavati Club & Heritage Arena'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#2a114b]/80 px-3.5 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-[#ffe088]" />
                  <span>6:30 PM – 12:30 AM</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#2a114b]/80 px-3.5 py-1.5 rounded-lg border border-white/10">
                  <CreditCard className="w-4 h-4 text-[#cca830]" />
                  <span className="font-bold text-white">
                    ₹{plan.budget?.total?.toLocaleString('en-IN') || '1,250'} / Person
                  </span>
                </div>
              </div>
            </div>

            {/* AI Match Score Badge */}
            <div className="shrink-0 lg:w-72 bg-[#2a114b]/90 border border-white/15 rounded-2xl p-6 shadow-md flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-3 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="rgba(237, 220, 255, 0.15)"
                    strokeWidth="7"
                  ></circle>
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="#cca830"
                    strokeDasharray="264"
                    strokeDashoffset="15.8"
                    strokeLinecap="round"
                    strokeWidth="7"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-title-lg text-title-lg font-bold text-[#ffe088] leading-none">
                    {plan.matchScore || 94}%
                  </span>
                  <span className="font-label-sm text-label-sm text-[#eddcff] uppercase tracking-wider font-bold">
                    AI Match
                  </span>
                </div>
              </div>
              <span className="font-title-md text-title-md text-white font-bold">
                Flawless Synchrony
              </span>
              <p className="font-body-sm text-body-sm text-[#eddcff]/80 mt-1.5 leading-normal">
                Optimized for minimal traffic delay, authentic 3-Taali Garba rounds, and verified midnight food spots.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Editorial Atmosphere Visual Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group relative rounded-xl overflow-hidden shadow-sm h-56 bg-[#f5f3f0] border border-[#ccc4d0]/30">
            <img
              alt="Karnavati Cultural Arena"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src={plan.venueHighlight?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXHq4CZBcbKQinCgMBHCySjWcxXSZMAouil7chPMgL40hFkPRr1EFh8hHODnCpW1DsIo4uyxWKqg60Nw1LLKAOVBGUSY9NXvkC2PCsKRZBASDE3PI2kdgxpsqFQj_FjpfqFIQvGMZ8ieZ0G7ofIWZgBNPHVQTiAycxKsYfmnSSssWOMhnMnQ_FlId61vt7p1RFSC9uIvnUPnAJlasSuqp5bfxxSvHpavyy6kwQ293IXPHkuu1ci8R1'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024]/90 via-[#0e0024]/30 to-transparent p-5 flex flex-col justify-end">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#ffe088] font-bold">
                Venue Atmosphere
              </span>
              <h3 className="font-title-md text-title-md text-white font-bold">
                {plan.venueHighlight?.name || 'Shankus & Karnavati Cultural Arena'}
              </h3>
              <p className="font-body-sm text-body-sm text-[#eddcff]">
                Authentic clay ground with live brass percussion & Dhol rings.
              </p>
            </div>
          </div>

          <div className="group relative rounded-xl overflow-hidden shadow-sm h-56 bg-[#f5f3f0] border border-[#ccc4d0]/30">
            <img
              alt="Manek Chowk Heritage Food Haven"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpi-NAdup7pvDfXefdzTVFh57k1LtK8pGaH2A9vwOs07yTFkbAJoEfB1UWJ5Fd9osfiio_wXZJ6tSNW95MJU-2U2_YgGutOdkfjiSLs_mIPuNcdNbSMfvCjzJ6mAYEB5RCmSzK0Li2xOjijxXY8Aec1B1wJ3eHlI7FYppwdWzlpSA1S6s8lBP1R6RwROtoGUvmvnk5wA-CTIkz7dcQtDF9MXpKEQfgeBJh9ZTcjWmQv0PdRz5DEKWQ"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024]/90 via-[#0e0024]/30 to-transparent p-5 flex flex-col justify-end">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#ffe088] font-bold">
                Midnight Gastronomy
              </span>
              <h3 className="font-title-md text-title-md text-white font-bold">
                Manek Chowk Heritage Food Haven
              </h3>
              <p className="font-body-sm text-body-sm text-[#eddcff]">
                Hot Kesar Dry Fruit Milk, piping Kadhi, and fresh Fafda-Jalebi.
              </p>
            </div>
          </div>
        </div>

        {/* 3. Main Section: Detailed Itinerary Timeline */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#a14000] font-bold">
                Step-By-Step Schedule
              </span>
              <h2 className="font-headline-md text-headline-md text-[#0e0024] font-bold">
                Synchronized Night Timeline
              </h2>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-[#efeeeb] px-3.5 py-1.5 rounded-full font-label-md text-label-md text-[#4a454f]">
              <MapPin className="w-4 h-4 text-[#fd6b0f]" />
              <span>Ahmedabad Traffic Monitored Live</span>
            </div>
          </div>

          {/* Timeline Canvas */}
          <div className="relative pl-6 md:pl-10 space-y-6 before:absolute before:left-3 md:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-[#ccc4d0]/40">
            {plan.itinerary.map((item, idx) => {
              const nodeColors = [
                'bg-[#fd6b0f] ring-[#ffdbcc]',
                'bg-[#cca830] ring-[#ffe088]',
                'bg-[#fd6b0f] ring-[#ffdbcc]',
                'bg-[#735c00] ring-[#ffe088]',
                'bg-[#6b538f] ring-[#eddcff]'
              ];
              const nodeClass = nodeColors[idx % nodeColors.length];

              return (
                <div key={idx} className="relative group">
                  {/* Timeline Illuminated Node */}
                  <div className="absolute -left-6 md:-left-10 top-1.5 w-6 md:w-10 flex items-center justify-center">
                    <span className={`w-3.5 h-3.5 rounded-full ${nodeClass} ring-4`}></span>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-[#ccc4d0]/30">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 bg-[#f5f3f0]/50 -mx-6 -mt-6 p-6 rounded-t-xl border-b border-[#ccc4d0]/20">
                      <div className="flex items-center gap-3">
                        <span className="font-title-lg text-title-lg font-bold text-[#a14000]">
                          {item.time}
                        </span>
                        <span className="bg-[#ffdbcc] text-[#351000] font-label-sm text-label-sm px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                          {item.phase}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#4a454f] font-label-md text-label-md">
                        <MapPin className="w-4 h-4 text-[#735c00]" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                          {item.title}
                        </h3>
                        {item.costPerPerson && (
                          <span className="text-[#a14000] font-title-md text-title-md font-bold">
                            ₹{item.costPerPerson} / person
                          </span>
                        )}
                      </div>
                      <p className="font-body-md text-body-md text-[#4a454f] leading-relaxed">
                        {item.description}
                      </p>

                      {/* AI Tip block */}
                      {item.tip && (
                        <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#f5f3f0] text-[#0e0024] border border-[#ccc4d0]/20">
                          <Lightbulb className="w-5 h-5 text-[#cca830] shrink-0 mt-0.5" />
                          <div className="text-body-sm font-body-sm">
                            <strong className="font-title-md text-[14px]">AI Tip:</strong> {item.tip}
                          </div>
                        </div>
                      )}

                      {/* Fast reservation badge */}
                      {item.badge && (
                        <div className="flex items-center gap-2 text-[#4a454f] font-label-sm text-label-sm">
                          <Check className="w-4 h-4 text-[#735c00]" />
                          <span>{item.badge}</span>
                        </div>
                      )}

                      {/* Pass QR Visual Card */}
                      {item.isPass && (
                        <div className="p-4 rounded-xl bg-[#efeeeb] flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#ccc4d0]/30 mt-3">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <QrCode className="w-10 h-10 text-[#0e0024]" />
                            </div>
                            <div>
                              <span className="font-title-md text-title-md text-[#0e0024] font-bold">
                                Group Pass: {plan.groupSize}
                              </span>
                              <p className="font-label-sm text-label-sm text-[#4a454f] font-mono">
                                ID: {item.passCode || 'GG-AMDV-8849-2025'}
                              </p>
                              <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-[#735c00] font-semibold">
                                Gate 2 • Fast-Track VIP Entry
                              </span>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowPassModal(true)}
                            className="px-4 py-2 bg-[#0e0024] text-white rounded-lg font-label-md text-label-md hover:bg-[#2a114b] transition-colors shadow-sm cursor-pointer font-bold"
                          >
                            View Pass Details
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Two-Column Grid: Budget Breakdown & AI Smart Intel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Budget Breakdown Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-6">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#a14000] font-bold">
                Financial Clarity
              </span>
              <h3 className="font-headline-md text-headline-md text-[#0e0024] font-bold">
                Estimated Budget Breakdown
              </h3>
              <p className="font-body-sm text-body-sm text-[#4a454f]">
                Calculated per reveler with group discounts applied
              </p>
            </div>

            {/* Budget Visual Progress Rows */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center font-label-md text-label-md mb-1.5 font-bold">
                  <span className="text-[#1b1c1a] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0e0024]"></span>
                    Entry Pass ({plan.venueHighlight?.name?.split(' ')[0] || 'Karnavati'})
                  </span>
                  <span className="text-[#0e0024]">₹{plan.budget?.entry || 500}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#efeeeb] overflow-hidden">
                  <div className="h-full bg-[#0e0024] rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center font-label-md text-label-md mb-1.5 font-bold">
                  <span className="text-[#1b1c1a] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fd6b0f]"></span>
                    Food & Dinner
                  </span>
                  <span className="text-[#0e0024]">₹{plan.budget?.food || 400}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#efeeeb] overflow-hidden">
                  <div className="h-full bg-[#fd6b0f] rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center font-label-md text-label-md mb-1.5 font-bold">
                  <span className="text-[#1b1c1a] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#cca830]"></span>
                    Travel, Shuttles & Parking
                  </span>
                  <span className="text-[#0e0024]">₹{plan.budget?.travel || 200}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#efeeeb] overflow-hidden">
                  <div className="h-full bg-[#cca830] rounded-full" style={{ width: '16%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center font-label-md text-label-md mb-1.5 font-bold">
                  <span className="text-[#1b1c1a] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6b538f]"></span>
                    Extras & Manek Chowk Snacks
                  </span>
                  <span className="text-[#0e0024]">₹{plan.budget?.extras || 150}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#efeeeb] overflow-hidden">
                  <div className="h-full bg-[#6b538f] rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>

            {/* Total Cardlet */}
            <div className="bg-[#f5f3f0] p-5 rounded-xl space-y-3 border border-[#ccc4d0]/20">
              <div className="flex items-baseline justify-between">
                <span className="font-body-md text-body-md text-[#4a454f]">Estimated Per Person:</span>
                <span className="font-headline-lg text-headline-lg font-bold text-[#a14000]">
                  ₹{plan.budget?.total?.toLocaleString('en-IN') || '1,250'}
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 text-[#4a454f] font-label-md text-label-md border-t border-[#ccc4d0]/20">
                <span>Total for {plan.groupSize}:</span>
                <span className="font-bold text-[#0e0024] text-[17px]">
                  ₹{(plan.budget?.totalGroup || (plan.budget?.total || 1250) * 4).toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-[#735c00] font-label-sm text-label-sm">
                <CheckCircle2 className="w-4 h-4 text-[#cca830]" />
                <span>Guaranteed Best Pass Rates via GarbaGo AI Engine</span>
              </div>
            </div>
          </div>

          {/* Right Column: AI Intel & Recommendations (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Card 1: Entry & Footwear Protocol */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#ffe088] text-[#241a00]">
                  <Sparkles className="w-5 h-5 text-[#735c00]" />
                </div>
                <h4 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  AI Cue: Entry & Footwear Protocol
                </h4>
              </div>
              <p className="font-body-md text-body-md text-[#4a454f] leading-relaxed">
                Arrive strictly by <strong className="text-[#0e0024] font-bold">8:15 PM</strong> to evade peak turnstile queues at Gate 3. Keep comfortable footwear for extended Garba rounds — authentic traditional Mojdis with padded insoles will safeguard arches during the fast 3-Taali tempo.
              </p>
            </div>

            {/* Card 2: Traffic Alert */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#ffdbcc] text-[#351000]">
                  <AlertTriangle className="w-5 h-5 text-[#a14000]" />
                </div>
                <h4 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Navratri Traffic & Valet Alert
                </h4>
              </div>
              <p className="font-body-md text-body-md text-[#4a454f] leading-relaxed">
                {plan.trafficAlert || 'Designated valet parking is available via Gate 2. Expect heavy SG Highway congestion between 11:30 PM and 1:00 AM; our dynamic routing engine advises returning via internal Bodakdev roads.'}
              </p>
            </div>

            {/* Card 3: Music & Singer Intel */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#eddcff] text-[#260c47]">
                  <Music className="w-5 h-5 text-[#2a114b]" />
                </div>
                <h4 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Music & Singer Intel
                </h4>
              </div>
              <p className="font-body-md text-body-md text-[#4a454f] leading-relaxed">
                {plan.musicIntel || 'Live orchestral performance tonight featuring celebrated folk revival artists in the spirit of Atul Purohit & Bhoomi Trivedi — 100% acoustic Gujarati Dhol, Shehnai, and high-energy Sanedo anthems.'}
              </p>
            </div>
          </div>
        </div>

        {/* 5. Bottom Actions Sticky Bar */}
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md border border-[#ccc4d0]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fd6b0f]/15 flex items-center justify-center text-[#a14000]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-title-md text-title-md text-[#0e0024] font-bold">
                Night 8 Itinerary Ready
              </div>
              <div className="font-body-sm text-body-sm text-[#4a454f]">
                Synchronized for {plan.groupSize} • Digital passes accessible offline
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowCustomizeModal(true)}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-[#efeeeb] text-[#0e0024] font-label-lg text-label-lg hover:bg-[#eae8e5] transition-colors cursor-pointer font-bold"
            >
              Customize Itinerary
            </button>
            <button
              onClick={() => showToast('Preparing high-resolution PDF and WhatsApp card...')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#2a114b] text-[#eddcff] font-label-lg text-label-lg hover:bg-[#0e0024] hover:text-white transition-all cursor-pointer font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Export WhatsApp / PDF</span>
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#fd6b0f] text-white font-label-lg text-label-lg hover:bg-[#e05a05] transition-all shadow-md cursor-pointer font-bold"
            >
              <Bookmark className="w-4 h-4" />
              <span>Save to My Plans</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
