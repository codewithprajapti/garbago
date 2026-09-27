import React from 'react';
import {
  Compass,
  Utensils,
  Moon,
  Car,
  Phone,
  Shield,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { MOCK_FOOD_ITEMS } from '../../lib/data/mockFood';

interface AhmedabadGuideViewProps {
  onNavigate: (tab: string) => void;
}

export const AhmedabadGuideView: React.FC<AhmedabadGuideViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] py-8 md:py-12">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a114b] text-[#ffe088] font-label-sm text-label-sm font-bold">
            <Compass className="w-3.5 h-3.5 text-[#cca830]" />
            <span>Amdavad Cultural & Culinary Guide • Navratri 2025</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#0e0024] font-bold">
            Ahmedabad Navratri Guide
          </h1>
          <p className="font-body-md text-body-md text-[#4a454f] max-w-2xl">
            Everything you need for navigating the cultural capital during the world's longest dance festival: midnight food havens, heritage pol customs, and traffic-smart routes.
          </p>
        </div>

        {/* 1. Midnight Manek Chowk Food Trail */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-[#ccc4d0]/30">
            <div>
              <span className="text-xs uppercase font-bold text-[#a14000] tracking-wider">
                Post-Garba Gastronomy
              </span>
              <h2 className="font-headline-md text-xl font-bold text-[#0e0024]">
                Midnight Manek Chowk Food Map
              </h2>
            </div>
            <span className="text-xs text-[#4a454f]">
              Open from 10:00 PM until 3:30 AM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_FOOD_ITEMS.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ccc4d0]/30 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-[#0e0024]">
                  <img
                    alt={item.name}
                    src={item.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 right-4 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] bg-[#fd6b0f] px-2 py-0.5 rounded-full font-bold uppercase">
                        {item.category}
                      </span>
                      <h3 className="font-title-md text-base font-bold mt-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#ffe088] font-medium">{item.gujaratiName}</p>
                    </div>
                    <span className="text-sm font-bold text-[#ffe088]">
                      ~₹{item.pricePerPerson}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between text-xs text-[#4a454f]">
                  <p className="leading-relaxed">{item.description}</p>
                  <div className="p-2.5 bg-[#f5f3f0] rounded-xl text-[#0e0024] font-semibold flex items-center gap-1.5">
                    <span className="text-[#a14000]">✨ Must Try:</span>
                    <span>{item.mustTry}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#735c00] pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.location}
                    </span>
                    <span className="font-semibold">{item.timing}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Sheri Garba Traditions & Heritage Pols */}
        <section className="bg-gradient-to-br from-[#2a114b] to-[#0e0024] rounded-3xl p-8 text-white relative overflow-hidden space-y-6">
          <div className="space-y-2 relative z-10 max-w-2xl">
            <span className="text-xs uppercase font-bold text-[#ffe088] tracking-widest">
              UNESCO World Heritage City
            </span>
            <h2 className="font-headline-md text-2xl font-bold text-white">
              The Soul of Ahmedabad: Sheri Garba in the Pols
            </h2>
            <p className="font-body-md text-sm text-[#eddcff] leading-relaxed">
              Before the advent of grand commercial clubs and stadium lights, Garba lived exclusively in the tight-knit community courtyards (Chowks) of Old Ahmedabad. Here is how to experience this sacred tradition respectfully:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 space-y-1.5">
              <span className="text-2xl">🦶</span>
              <h4 className="font-title-md text-sm font-bold text-[#ffe088]">
                Barefoot Sanctity
              </h4>
              <p className="text-xs text-[#eddcff] leading-relaxed">
                Step inside the concentric circle barefoot out of reverence to the central Garbi (Mataji's sacred oil lamp).
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 space-y-1.5">
              <span className="text-2xl">🪔</span>
              <h4 className="font-title-md text-sm font-bold text-[#ffe088]">
                Midnight Aarti
              </h4>
              <p className="text-xs text-[#eddcff] leading-relaxed">
                Arrive between 11:30 PM and 12:00 AM to join the solemn, synchronized singing of the Jai Adhya Shakti Aarti.
              </p>
            </div>

            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10 space-y-1.5">
              <span className="text-2xl">🙏</span>
              <h4 className="font-title-md text-sm font-bold text-[#ffe088]">
                Aavjo Hospitality
              </h4>
              <p className="text-xs text-[#eddcff] leading-relaxed">
                Local pol mandalis will warmly welcome you. Modest Indian attire and quiet respect are cherished.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Traffic, Parking & Travel Logistics */}
        <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ccc4d0]/30 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-[#a14000] tracking-wider">
              Logistics & Transit
            </span>
            <h3 className="font-headline-md text-xl font-bold text-[#0e0024]">
              SG Highway & SBR Traffic Blueprint
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#4a454f]">
            <div className="p-4 bg-[#f5f3f0] rounded-xl space-y-1 border border-[#ccc4d0]/20">
              <span className="font-bold text-[#0e0024] text-sm block">
                Peak Arrival: 8:15 PM – 9:30 PM
              </span>
              <p>
                Bottlenecks occur at Iscon Cross Road, Pakwan Flyover, and SBR Junction. Take Sardar Patel Ring Road to bypass club traffic.
              </p>
            </div>

            <div className="p-4 bg-[#f5f3f0] rounded-xl space-y-1 border border-[#ccc4d0]/20">
              <span className="font-bold text-[#0e0024] text-sm block">
                Midnight Exit: 12:30 AM – 2:00 AM
              </span>
              <p>
                SG Highway service lanes face bumper-to-bumper egress. Cab pick-up zones are restricted to designated bays 200m from main club gates.
              </p>
            </div>
          </div>

          {/* Assistance Hotlines */}
          <div className="p-4 bg-[#efeeeb] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#fd6b0f]" />
              <div className="text-xs">
                <span className="font-bold text-[#0e0024] block">
                  Official Ahmedabad Navratri Helpline
                </span>
                <span className="text-[#4a454f]">+91 79 2658 9000 (Passes & Event Support)</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#a14000]" />
              <div className="text-xs">
                <span className="font-bold text-[#0e0024] block">
                  She Team & Safety Control
                </span>
                <span className="text-[#4a454f]">Toll Free: 1091 / 112 (24/7 Mobile Patrols)</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
