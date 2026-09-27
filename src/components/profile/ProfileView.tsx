import React, { useState } from 'react';
import {
  User,
  MapPin,
  Sparkles,
  Bookmark,
  Heart,
  Shirt,
  Calendar,
  Settings,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { UserProfile, SavedPlan, GarbaEvent, OutfitLook, PlannerResult } from '../../types';
import { MOCK_EVENTS } from '../../lib/data/mockEvents';
import { MOCK_OUTFITS } from '../../lib/data/mockOutfits';

interface ProfileViewProps {
  savedPlans: SavedPlan[];
  onViewPlan: (plan: PlannerResult) => void;
  onSelectEvent: (event: GarbaEvent) => void;
  onNavigate: (tab: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  savedPlans,
  onViewPlan,
  onSelectEvent,
  onNavigate
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'favorites' | 'outfits'>('plans');

  const [profile, setProfile] = useState<UserProfile>({
    name: 'Aastha Patel',
    location: 'Bodakdev, Ahmedabad',
    phone: '+91 98982 44109',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABFdihCH2LoB6tft8AtutPObJ_OxjqOQf4bWs-bKn6tvuB2CQEwRIcQkYnAjelYPvC3ue9H5mAicYU0OZKEIwGqaYplo9CGwZ8X7y3MzU-T1vwDi1kTtcNfrR4aRU7q00IPzoU2PG16vpU44iRFMteSPoBTJAohxVA4n6os_aWgO00nNLfHSsxf_vXn4G4DxhQ--QiOPPldGU9R_OqebjQmjPy0AvddLKoyt_rcUQqPbdHTTG6ADT5',
    preferredVibe: 'Traditional & Heritage Sheri Garba',
    budgetPreference: 1200,
    foodPreference: 'Gujarati Traditional & Farali',
    favoriteEventIds: ['karnavati-club', 'mandvi-ni-pol']
  });

  const favoriteEvents = MOCK_EVENTS.filter(e => profile.favoriteEventIds.includes(e.id));

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] py-8 md:py-12">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#ccc4d0]/30 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden ring-4 ring-[#cca830]/40 shrink-0 shadow-md">
              <img
                alt={profile.name}
                className="w-full h-full object-cover"
                src={profile.avatar}
              />
              <div className="absolute bottom-0 right-0 p-1 bg-[#fd6b0f] rounded-full text-white text-[10px]">
                ✨
              </div>
            </div>

            {/* Profile Info */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="font-headline-md text-2xl font-bold text-[#0e0024]">
                    {profile.name}
                  </h1>
                  <p className="text-xs text-[#a14000] font-bold mt-0.5">
                    Amdavadi Garba Enthusiast • Navratri 2025 Reveler
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f3f0] text-xs font-semibold text-[#0e0024] self-center sm:self-auto border border-[#ccc4d0]/30">
                  <MapPin className="w-3.5 h-3.5 text-[#a14000]" />
                  <span>{profile.location}</span>
                </span>
              </div>

              {/* Preferences Chips */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#efeeeb] text-[11px] font-semibold text-[#0e0024]">
                  🪘 {profile.preferredVibe}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#efeeeb] text-[11px] font-semibold text-[#0e0024]">
                  ₹ ~₹{profile.budgetPreference} / night
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#efeeeb] text-[11px] font-semibold text-[#0e0024]">
                  🍽️ {profile.foodPreference}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-[#ccc4d0]/20 text-center">
            <div className="p-3 bg-[#f5f3f0] rounded-xl">
              <span className="font-headline-sm text-lg font-bold text-[#0e0024] block">
                {savedPlans.length}
              </span>
              <span className="font-label-sm text-[10px] text-[#4a454f] uppercase tracking-wider">
                Nights Planned
              </span>
            </div>
            <div className="p-3 bg-[#f5f3f0] rounded-xl">
              <span className="font-headline-sm text-lg font-bold text-[#a14000] block">
                94%
              </span>
              <span className="font-label-sm text-[10px] text-[#4a454f] uppercase tracking-wider">
                Avg Match Score
              </span>
            </div>
            <div className="p-3 bg-[#f5f3f0] rounded-xl">
              <span className="font-headline-sm text-lg font-bold text-[#735c00] block">
                ~18,500
              </span>
              <span className="font-label-sm text-[10px] text-[#4a454f] uppercase tracking-wider">
                Taali Steps
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-[#ccc4d0]/30 pb-3">
          <button
            onClick={() => setActiveTab('plans')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-[#0e0024] text-white shadow-sm'
                : 'text-[#4a454f] hover:bg-[#efeeeb]'
            }`}
          >
            <Bookmark className="w-4 h-4 text-[#ffe088]" />
            <span>Saved Plans ({savedPlans.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'bg-[#0e0024] text-white shadow-sm'
                : 'text-[#4a454f] hover:bg-[#efeeeb]'
            }`}
          >
            <Heart className="w-4 h-4 text-[#fd6b0f]" />
            <span>Favorite Venues ({favoriteEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('outfits')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'outfits'
                ? 'bg-[#0e0024] text-white shadow-sm'
                : 'text-[#4a454f] hover:bg-[#efeeeb]'
            }`}
          >
            <Shirt className="w-4 h-4 text-[#cca830]" />
            <span>Saved Outfits (2)</span>
          </button>
        </div>

        {/* Tab 1: Saved Plans */}
        {activeTab === 'plans' && (
          <div className="space-y-4">
            {savedPlans.length === 0 ? (
              <div className="p-10 text-center bg-white rounded-2xl border border-[#ccc4d0]/30 space-y-3">
                <span className="text-3xl">🪔</span>
                <p className="text-sm text-[#4a454f]">No saved itineraries yet.</p>
                <button
                  onClick={() => onNavigate('plan-my-night')}
                  className="px-5 py-2 rounded-xl bg-[#fd6b0f] text-white text-xs font-bold"
                >
                  Create Your First Plan
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedPlans.map(p => (
                  <div
                    key={p.id}
                    className="p-5 bg-white rounded-2xl border border-[#ccc4d0]/30 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#a14000] tracking-wider">
                        {p.date}
                      </span>
                      <h4 className="font-title-md text-[#0e0024] font-bold">
                        {p.title}
                      </h4>
                      <p className="text-xs text-[#4a454f]">
                        {p.groupSizeLabel} • ₹{p.budgetPerPerson} / person
                      </p>
                    </div>
                    <button
                      onClick={() => onViewPlan(p.result)}
                      className="px-4 py-2 rounded-xl bg-[#0e0024] text-white text-xs font-bold hover:bg-[#2a114b] cursor-pointer"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Favorite Venues */}
        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {favoriteEvents.map(event => (
              <div
                key={event.id}
                className="p-4 bg-white rounded-2xl border border-[#ccc4d0]/30 shadow-sm flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
                onClick={() => onSelectEvent(event)}
              >
                <img
                  alt={event.name}
                  src={event.image}
                  className="w-20 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-[#a14000]">
                    {event.style}
                  </span>
                  <h4 className="font-title-md text-[#0e0024] font-bold truncate">
                    {event.name}
                  </h4>
                  <p className="text-xs text-[#4a454f] truncate">{event.venue}</p>
                  <span className="text-xs font-bold text-[#0e0024]">
                    {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Saved Outfits */}
        {activeTab === 'outfits' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_OUTFITS.slice(0, 2).map(look => (
              <div
                key={look.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#ccc4d0]/30 shadow-sm"
              >
                <div className="relative h-44 w-full bg-[#0e0024]">
                  <img
                    alt={look.title}
                    src={look.image}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-[10px] bg-[#fd6b0f] px-2 py-0.5 rounded-full font-bold uppercase">
                      {look.occasion}
                    </span>
                    <h4 className="font-title-md text-base font-bold mt-1">
                      {look.title}
                    </h4>
                  </div>
                </div>
                <div className="p-4 space-y-2 text-xs text-[#4a454f]">
                  <p className="line-clamp-2">{look.clothing.join(', ')}</p>
                  <div className="flex gap-2 pt-2">
                    {look.colors.map(c => (
                      <div
                        key={c.name}
                        className="w-5 h-5 rounded-full border border-black/10"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
