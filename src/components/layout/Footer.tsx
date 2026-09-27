import React from 'react';
import { Phone, Shield, Bus, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#efeeeb] text-[#4a454f] border-t border-[#ccc4d0]/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2a114b] text-[#cca830] text-sm">
                🪔
              </div>
              <span className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                GarbaGo
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
              The sovereign AI companion for Navratri in Ahmedabad. Curating passes, traditional couture styling, crowd intelligence, and sacred circular revelry across Gujarat.
            </p>
            <div className="flex items-center gap-2 text-[#735c00] font-label-md text-label-md">
              <CheckCircle2 className="w-4 h-4 text-[#cca830]" />
              <span>Aavjo Heritage Initiative 2025</span>
            </div>
          </div>

          {/* Col 2: Festive Discovery */}
          <div className="space-y-3">
            <h4 className="font-title-md text-title-md text-[#0e0024] font-bold">
              Festive Discovery
            </h4>
            <ul className="space-y-2 font-body-sm text-body-sm">
              <li>
                <button
                  onClick={() => onNavigate('garba-finder')}
                  className="hover:text-[#a14000] transition-colors cursor-pointer text-left"
                >
                  Karnavati & Club Venues
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('garba-finder')}
                  className="hover:text-[#a14000] transition-colors cursor-pointer text-left"
                >
                  Sheri & Heritage Pol Garba
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('outfit-ai')}
                  className="hover:text-[#a14000] transition-colors cursor-pointer text-left"
                >
                  Kutchhi Bandhani & Chaniya AI
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ahmedabad-guide')}
                  className="hover:text-[#a14000] transition-colors cursor-pointer text-left"
                >
                  Midnight Manek Chowk Food Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ahmedabad Assistance */}
          <div className="space-y-3">
            <h4 className="font-title-md text-title-md text-[#0e0024] font-bold">
              Ahmedabad Assistance
            </h4>
            <ul className="space-y-2.5 font-body-sm text-body-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#fd6b0f] shrink-0" />
                <span>Passes Hotline: +91 79 2658 9000</span>
              </li>
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#fd6b0f] shrink-0" />
                <span>Festive Safety Control: 1091 / 112</span>
              </li>
              <li className="flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#fd6b0f] shrink-0" />
                <span>Live SG Highway & SP Ring Road Shuttles</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Amdavad Cultural Note */}
          <div className="space-y-3">
            <h4 className="font-title-md text-title-md text-[#0e0024] font-bold">
              Amdavad Cultural Note
            </h4>
            <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
              Celebrated with reverence to Maa Jagdamba. GarbaGo synchronizes authentic Gujarati traditions with precision ambient intelligence so you never miss a beat of the dhol.
            </p>
            <div className="p-3 bg-white/70 border border-[#ccc4d0]/50 rounded-xl">
              <p className="font-label-sm text-label-sm text-[#0e0024] font-semibold">
                Live Festive Status: Day 4 of Navratri • Clear skies 26°C
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-8 border-t border-[#ccc4d0]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-[#4a454f]">
            © 2025 GarbaGo Gujarat. Designed for revelers across Ahmedabad.
          </p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm">
            <span className="text-[#4a454f]">Privacy Framework</span>
            <span className="text-[#4a454f]">Terms of Revelry</span>
            <span className="text-[#4a454f]">Pass Security Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
