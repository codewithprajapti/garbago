import React from 'react';
import { Home, Sparkles, Compass, Shirt, User } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ currentTab, onNavigate }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0e0024]/95 backdrop-blur-xl border-t border-white/10 shadow-[0_-4px_16px_rgba(14,0,36,0.3)]">
      <nav className="flex items-center justify-around px-2 py-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
            currentTab === 'home'
              ? 'text-[#ffe088] font-bold'
              : 'text-[#eddcff]/70 hover:text-white'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-label-sm text-[10px]">Home</span>
        </button>

        <button
          onClick={() => onNavigate('plan-my-night')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
            currentTab === 'plan-my-night' || currentTab === 'planner-result'
              ? 'text-[#ffe088] font-bold'
              : 'text-[#eddcff]/70 hover:text-white'
          }`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-label-sm text-[10px]">Plan</span>
        </button>

        <button
          onClick={() => onNavigate('garba-finder')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
            currentTab === 'garba-finder'
              ? 'text-[#ffe088] font-bold'
              : 'text-[#eddcff]/70 hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="font-label-sm text-[10px]">Explore</span>
        </button>

        <button
          onClick={() => onNavigate('outfit-ai')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
            currentTab === 'outfit-ai'
              ? 'text-[#ffe088] font-bold'
              : 'text-[#eddcff]/70 hover:text-white'
          }`}
        >
          <Shirt className="w-5 h-5" />
          <span className="font-label-sm text-[10px]">Outfit</span>
        </button>

        <button
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
            currentTab === 'profile'
              ? 'text-[#ffe088] font-bold'
              : 'text-[#eddcff]/70 hover:text-white'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="font-label-sm text-[10px]">Profile</span>
        </button>
      </nav>
    </div>
  );
};
