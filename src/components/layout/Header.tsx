import React from 'react';
import { Sparkles, MapPin, Search } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, onOpenSearch }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0024]/95 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(14,0,36,0.35)]">
      <div className="h-20 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 shrink-0 text-left focus:outline-none cursor-pointer"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#2a114b] border border-[#cca830]/40 shadow-inner">
            <span className="text-[#cca830] text-xl">🪔</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-white tracking-tight font-bold">
              GarbaGo
            </span>
            <span className="font-label-sm text-label-sm text-[#cca830] uppercase tracking-wider hidden sm:block">
              AI Navratri Companion • Ahmedabad
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'home'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('plan-my-night')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'plan-my-night' || currentTab === 'planner-result'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Plan My Night
          </button>
          <button
            onClick={() => onNavigate('garba-finder')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'garba-finder'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Garba Finder
          </button>
          <button
            onClick={() => onNavigate('outfit-ai')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'outfit-ai'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Outfit AI
          </button>
          <button
            onClick={() => onNavigate('my-plans')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'my-plans'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            My Plans
          </button>
          <button
            onClick={() => onNavigate('ahmedabad-guide')}
            className={`font-label-lg text-label-lg transition-colors py-1.5 px-3 rounded-lg cursor-pointer ${
              currentTab === 'ahmedabad-guide'
                ? 'bg-[#2a114b] text-[#eddcff] font-bold shadow-sm'
                : 'text-[#eddcff]/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Ahmedabad Guide
          </button>
        </nav>

        {/* Right Action Icons & City Status */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:flex items-center gap-2 bg-[#2a114b] px-3.5 py-1.5 rounded-full border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#cca830]" />
            <span className="font-label-sm text-label-sm text-[#eddcff]">
              Ahmedabad, GJ • Navratri 2025 Live
            </span>
          </div>

          <button
            aria-label="Search Venues and Passes"
            onClick={onOpenSearch || (() => onNavigate('garba-finder'))}
            className="w-9 h-9 rounded-full bg-[#2a114b] flex items-center justify-center text-[#eddcff] hover:text-white hover:bg-[#3b1d54] transition-colors cursor-pointer"
            type="button"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('plan-my-night')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#fd6b0f] text-white px-4 py-2 rounded-lg font-label-lg text-label-lg hover:bg-[#e05a05] transition-all shadow-[0_4px_16px_-2px_rgba(253,107,15,0.4)] cursor-pointer"
            type="button"
          >
            <Sparkles className="w-4 h-4" />
            <span>Plan Night</span>
          </button>

          {/* User Profile Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            className="shrink-0 block ring-2 ring-[#cca830]/40 rounded-full hover:ring-[#cca830] transition-all cursor-pointer overflow-hidden w-9 h-9"
            title="User Profile"
          >
            <img
              alt="Aastha Patel Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuABFdihCH2LoB6tft8AtutPObJ_OxjqOQf4bWs-bKn6tvuB2CQEwRIcQkYnAjelYPvC3ue9H5mAicYU0OZKEIwGqaYplo9CGwZ8X7y3MzU-T1vwDi1kTtcNfrR4aRU7q00IPzoU2PG16vpU44iRFMteSPoBTJAohxVA4n6os_aWgO00nNLfHSsxf_vXn4G4DxhQ--QiOPPldGU9R_OqebjQmjPy0AvddLKoyt_rcUQqPbdHTTG6ADT5"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
