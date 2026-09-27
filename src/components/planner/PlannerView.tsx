import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Activity,
  Palette,
  MapPin,
  Utensils,
  Car,
  ChevronDown,
  ArrowRight,
  Loader2,
  AlertCircle,
  Users
} from 'lucide-react';
import { PlannerFormState, GroupSize, PlannerResult } from '../../types';

interface PlannerViewProps {
  onPlanGenerated: (result: PlannerResult) => void;
  onNavigate: (tab: string) => void;
}

export const PlannerView: React.FC<PlannerViewProps> = ({ onPlanGenerated, onNavigate }) => {
  const [formData, setFormData] = useState<PlannerFormState>({
    location: 'SG Highway & Clubs corridor',
    date: 'Saturday, 18 Oct 2025',
    nightNumber: 8,
    groupSize: '3-5',
    vibes: ['Traditional Garba'],
    budgetPerPerson: 1200,
    foodPreference: 'Gujarati Traditional',
    travelMode: 'personal'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('Analyzing Ahmedabad venue congestion...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleVibe = (vibeName: string) => {
    setFormData(prev => {
      const exists = prev.vibes.includes(vibeName);
      if (exists) {
        // keep at least 1 vibe
        if (prev.vibes.length <= 1) return prev;
        return { ...prev, vibes: prev.vibes.filter(v => v !== vibeName) };
      } else {
        return { ...prev, vibes: [...prev.vibes, vibeName] };
      }
    });
  };

  const handleGroupSize = (size: GroupSize) => {
    setFormData(prev => ({ ...prev, groupSize: size }));
  };

  const handleCreatePlan = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    const steps = [
      'Connecting to Ahmedabad Festive Neural Engine...',
      'Auditing live pass availability across Bodakdev & SG Highway...',
      'Synthesizing traffic-smart routes & Manek Chowk food trail...',
      'Polishing your personalized Navratri itinerary...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx]);
      }
    }, 600);

    try {
      const payload = {
        ...formData,
        budget: formData.budgetPerPerson,
        garbaStyle: formData.vibes[0] || 'Traditional Garba',
        transportation: formData.travelMode === 'personal' ? 'Personal Vehicle / Car' : 'Cab / Rickshaw',
      };

      const response = await fetch('/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      clearInterval(interval);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to generate itinerary`);
      }

      const data: PlannerResult = await response.json();
      setIsLoading(false);
      onPlanGenerated(data);
    } catch (err: any) {
      clearInterval(interval);
      console.error('Plan generation failed, fallback will be used:', err);
      // Fallback is handled automatically or by retry
      setErrorMsg('Network notice: Generating high-fidelity local plan...');
      setTimeout(async () => {
        // Fetch with fallback endpoint or direct generateFallbackPlan
        const { generateFallbackPlan } = await import('../../lib/ai/fallbackPlan.ts');
        const fallback = generateFallbackPlan(formData);
        setIsLoading(false);
        onPlanGenerated(fallback);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] relative pb-28">
      {/* Loading Modal Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-[#0e0024]/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center text-white">
          <div className="relative mb-6">
            <div className="w-20 h-20 rounded-full border-4 border-[#fd6b0f]/30 border-t-[#fd6b0f] animate-spin flex items-center justify-center"></div>
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              🪔
            </div>
          </div>
          <span className="px-3.5 py-1 rounded-full bg-[#fd6b0f]/20 border border-[#fd6b0f]/30 text-[#ffe088] font-label-sm text-label-sm tracking-wide uppercase font-bold mb-3">
            ✨ AI Co-Pilot Processing
          </span>
          <h3 className="font-headline-md text-headline-md text-white font-bold mb-2">
            Creating Your Perfect Navratri Night
          </h3>
          <p className="font-body-md text-body-md text-[#eddcff]/80 max-w-md transition-all">
            {loadingStep}
          </p>
        </div>
      )}

      {/* Subtle Festive Ambient Top Bar */}
      <div className="w-full bg-[#f5f3f0] border-b border-[#ccc4d0]/40">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Header Block */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a114b] text-[#ffe088] text-label-sm font-label-sm tracking-wide shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#cca830]" />
                <span>Ahmedabad AI Engine v2.4 • Real-time Venue & Traffic Data</span>
              </div>
              <h1 className="font-display-lg text-display-lg-mobile sm:text-display-lg text-[#0e0024] tracking-tight">
                Plan Your Perfect Navratri
              </h1>
              <p className="font-body-lg text-body-lg text-[#4a454f]">
                Tell us a little about your night. Our AI will curate authentic passes, traffic-smart routes, and heritage food trails for you.
              </p>
            </div>

            {/* Quick Live Indicator Pill Box */}
            <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-[#ccc4d0]/40 shadow-sm self-start lg:self-auto">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fd6b0f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fd6b0f]"></span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#a14000] font-bold">
                  Amdavad Sync Live
                </span>
                <span className="font-label-md text-label-md text-[#1b1c1a]">
                  Maha Ashtami Pass Inventory: 84% Filled
                </span>
              </div>
            </div>
          </div>

          {/* Segmented Progress Indicator */}
          <div className="pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Step 1 */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-[#fd6b0f]/30 ring-1 ring-[#fd6b0f]/20 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#fd6b0f] text-white flex items-center justify-center font-label-md text-label-md shrink-0 shadow-md font-bold">
                  01
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-[#a14000] uppercase tracking-wider font-bold">
                    Active
                  </span>
                  <span className="font-title-md text-title-md text-[#0e0024] truncate font-bold">
                    Your Night
                  </span>
                </div>
                <CheckCircle2 className="ml-auto text-[#a14000] w-5 h-5 hidden sm:block" />
              </div>

              {/* Step 2 */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-[#ccc4d0]/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#2a114b] text-[#ffe088] flex items-center justify-center font-label-md text-label-md shrink-0 font-bold">
                  02
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-[#4a454f] uppercase tracking-wider font-bold">
                    Selected
                  </span>
                  <span className="font-title-md text-title-md text-[#0e0024] truncate font-bold">
                    Your Vibe
                  </span>
                </div>
                <span className="ml-auto text-[#cca830] text-sm hidden sm:block font-bold">🎵</span>
              </div>

              {/* Step 3 */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-[#ccc4d0]/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eae8e5] text-[#0e0024] flex items-center justify-center font-label-md text-label-md shrink-0 font-bold">
                  03
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-[#4a454f] uppercase tracking-wider font-bold">
                    Budget
                  </span>
                  <span className="font-title-md text-title-md text-[#0e0024] truncate font-bold">
                    ₹ & Dining
                  </span>
                </div>
                <span className="ml-auto text-[#7b7580] text-sm hidden sm:block">💳</span>
              </div>

              {/* Step 4 */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-xl shadow-sm border border-[#ccc4d0]/30 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eae8e5] text-[#0e0024] flex items-center justify-center font-label-md text-label-md shrink-0 font-bold">
                  04
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-label-sm text-[#4a454f] uppercase tracking-wider font-bold">
                    Generated
                  </span>
                  <span className="font-title-md text-title-md text-[#0e0024] truncate font-bold">
                    AI Itinerary
                  </span>
                </div>
                <Sparkles className="ml-auto text-[#7b7580] w-5 h-5 hidden sm:block" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Planner Workspace (2 Column Grid) */}
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Inputs (7 cols desktop) */}
          <div className="lg:col-span-7 space-y-10">
            {/* STEP 1 SECTION: YOUR NIGHT & GATHERING */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ccc4d0]/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#ccc4d0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0e0024] text-[#ffe088] flex items-center justify-center shadow-inner">
                    <Calendar className="w-4 h-4 text-[#cca830]" />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-[#a14000] uppercase font-bold tracking-widest">
                      Step 01
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                      Your Night & Gathering
                    </h2>
                  </div>
                </div>
                <span className="text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-[#ffdbcc] text-[#351000] font-bold">
                  Required
                </span>
              </div>

              {/* Date and Area Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Location Selector */}
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-[#0e0024] font-bold">
                    Target Festive Hub
                  </label>
                  <div className="relative">
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="w-full h-[52px] px-4 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/40 text-[#1b1c1a] font-body-md text-body-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd6b0f] appearance-none transition-all cursor-pointer font-medium"
                    >
                      <option>SG Highway & Clubs corridor</option>
                      <option>Sindhu Bhavan Road (SBR)</option>
                      <option>Bodakdev & Vastrapur precinct</option>
                      <option>Heritage Walled City & Manek Chowk</option>
                      <option>Satellite & Prahladnagar</option>
                      <option>Gandhinagar Border & Koba</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#4a454f] pointer-events-none" />
                  </div>
                  <p className="font-body-sm text-body-sm text-[#4a454f] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#735c00]" />
                    <span>Ahmedabad city center radius: 12 km</span>
                  </p>
                </div>

                {/* Date Display */}
                <div className="space-y-2">
                  <label className="block font-label-md text-label-md text-[#0e0024] font-bold">
                    Navratri Night
                  </label>
                  <div className="w-full h-[52px] px-4 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/40 text-[#1b1c1a] flex items-center justify-between shadow-sm cursor-pointer hover:bg-[#efeeeb] transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-[#fd6b0f]">✨</span>
                      <span className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Saturday, 18 Oct 2025
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm bg-[#ffe088] text-[#241a00] px-2.5 py-0.5 rounded-full font-bold">
                      Maha Ashtami
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-[#4a454f]">
                    Night 8: Auspicious traditional dress colors & Aarti focus
                  </p>
                </div>
              </div>

              {/* Group Size Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-md text-label-md text-[#0e0024] font-bold">
                    Who are you revelling with?
                  </label>
                  <span className="font-label-sm text-label-sm text-[#a14000] font-bold">
                    Auto-calculates bulk venue pass discount
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  {(
                    [
                      { key: 'solo', label: 'Solo', sub: '1 Person' },
                      { key: 'duo', label: 'Duo', sub: 'Couple / 2' },
                      { key: '3-5', label: '3–5', sub: 'Friends' },
                      { key: '6-10', label: '6–10', sub: 'Family & Pal' },
                      { key: '10+', label: '10+', sub: 'Big Mandal' }
                    ] as const
                  ).map(item => {
                    const isSelected = formData.groupSize === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleGroupSize(item.key)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all text-center cursor-pointer relative ${
                          isSelected
                            ? 'bg-[#0e0024] text-white shadow-md'
                            : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#1b1c1a]'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute -top-2 bg-[#fd6b0f] text-white font-label-sm text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Selected
                          </span>
                        )}
                        <span className={`font-title-md text-title-md font-bold ${isSelected ? 'text-[#ffe088]' : ''}`}>
                          {item.label}
                        </span>
                        <span className={`font-label-sm text-label-sm ${isSelected ? 'text-[#eddcff]' : 'text-[#4a454f]'}`}>
                          {item.sub}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* STEP 2 SECTION: YOUR VIBE */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ccc4d0]/30 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#ccc4d0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0e0024] text-[#ffe088] flex items-center justify-center shadow-inner">
                    <span className="text-sm">🪘</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-[#a14000] uppercase font-bold tracking-widest">
                      Step 02
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                      Your Garba Atmosphere & Vibe
                    </h2>
                  </div>
                </div>
                <span className="text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-[#efeeeb] text-[#4a454f] font-semibold">
                  Choose 1 or more
                </span>
              </div>

              {/* Vibe Selection Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    name: 'Traditional Garba',
                    icon: '🪔',
                    desc: 'Authentic 3-taali, live acoustic dhol rhythms, pure devotional sanctity & traditional circle choreography.',
                    tags: ['Strictly Ethnic Attire', 'Authentic Taal']
                  },
                  {
                    name: 'Modern / DJ',
                    icon: '🎧',
                    desc: 'Energetic Dandiya EDM remixes, massive stadium laser rigs, fast-paced electronic folk beats.',
                    tags: ['Concert Acoustics']
                  },
                  {
                    name: 'Family Friendly',
                    icon: '👨‍👩‍👧‍👦',
                    desc: 'Spacious lawn rings, tiered senior seating, safe clean play areas for children and relaxed parking access.',
                    tags: ['Seating Guaranteed']
                  },
                  {
                    name: 'Friends & Circles',
                    icon: '🎉',
                    desc: 'Endless stamina rounds until 2:30 AM, synchronized circle groups, and late-night highway chai hops.',
                    tags: ['Late Night Entry']
                  },
                  {
                    name: 'Sheri Garba (Pol)',
                    icon: '🏛️',
                    desc: 'Intimate, zero-commercialized heritage garba held in 400-year-old carved wooden Pols of Old Amdavad.',
                    tags: ['Old City Heritage', 'Free Entry']
                  },
                  {
                    name: 'Premium Club Passes',
                    icon: '👑',
                    desc: 'Karnavati, Rajpath & YMCA exclusive pass access, celebrity singers, air-cooled lounges, and valet lanes.',
                    tags: ['VIP Hospitality']
                  }
                ].map(vibe => {
                  const isSelected = formData.vibes.includes(vibe.name);
                  return (
                    <div
                      key={vibe.name}
                      onClick={() => toggleVibe(vibe.name)}
                      className={`relative p-4 rounded-xl cursor-pointer transition-all border ${
                        isSelected
                          ? 'bg-[#2a114b] text-white shadow-md border-[#fd6b0f]/50 scale-[1.01]'
                          : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#1b1c1a] border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{vibe.icon}</span>
                          <h3 className={`font-title-md text-title-md font-bold ${isSelected ? 'text-[#ffe088]' : 'text-[#0e0024]'}`}>
                            {vibe.name}
                          </h3>
                        </div>
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-[#fd6b0f]" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-[#ccc4d0]"></div>
                        )}
                      </div>
                      <p className={`mt-2 font-body-sm text-body-sm leading-relaxed ${isSelected ? 'text-[#eddcff]' : 'text-[#4a454f]'}`}>
                        {vibe.desc}
                      </p>
                      <div className="mt-3 flex gap-1.5 flex-wrap">
                        {vibe.tags.map(t => (
                          <span
                            key={t}
                            className={`font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              isSelected
                                ? 'bg-[#0e0024] text-[#ffe088]'
                                : 'bg-white text-[#4a454f] border border-[#ccc4d0]/30'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* STEP 3 SECTION: BUDGET & LOGISTICS */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ccc4d0]/30 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#ccc4d0]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0e0024] text-[#ffe088] flex items-center justify-center shadow-inner">
                    <span className="text-sm">💰</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-[#a14000] uppercase font-bold tracking-widest">
                      Step 03
                    </span>
                    <h2 className="font-headline-sm text-headline-sm text-[#0e0024] font-bold">
                      Budget & Night Logistics
                    </h2>
                  </div>
                </div>
                <span className="text-label-sm font-label-sm px-2.5 py-1 rounded-full bg-[#ffdbcc] text-[#351000] font-bold">
                  Per Person Basis
                </span>
              </div>

              {/* Interactive Budget Slider */}
              <div className="space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <label className="font-label-md text-label-md text-[#0e0024] font-bold">
                      Approx. Budget per person
                    </label>
                    <p className="font-body-sm text-body-sm text-[#4a454f]">
                      Includes venue pass, parking & midnight refreshment buffer
                    </p>
                  </div>
                  <div className="flex items-baseline gap-1 bg-[#efeeeb] px-4 py-2 rounded-xl">
                    <span className="font-headline-sm text-headline-sm text-[#a14000] font-bold">
                      ₹{formData.budgetPerPerson.toLocaleString('en-IN')}
                    </span>
                    <span className="font-body-sm text-body-sm text-[#4a454f]">/ person</span>
                  </div>
                </div>

                {/* Range Input Slider */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min="500"
                    max="5000"
                    step="100"
                    value={formData.budgetPerPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, budgetPerPerson: Number(e.target.value) }))}
                    className="w-full h-2.5 bg-[#eae8e5] rounded-lg appearance-none cursor-pointer accent-[#fd6b0f]"
                  />
                  <div className="flex justify-between items-center pt-2 font-label-sm text-label-sm text-[#4a454f]">
                    <div className="flex flex-col items-start">
                      <span className="font-bold text-[#0e0024]">₹500</span>
                      <span className="text-[10px]">Community / Sheri</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[#a14000]">₹1,200</span>
                      <span className="text-[10px] text-[#a14000] font-semibold">Popular Amdavad</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-bold text-[#0e0024]">₹2,500</span>
                      <span className="text-[10px]">Club Arenas</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-bold text-[#0e0024]">₹5,000+</span>
                      <span className="text-[10px]">VIP Lounges</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Food Preference */}
              <div className="space-y-3 pt-2">
                <label className="block font-label-md text-label-md text-[#0e0024] font-bold">
                  Midnight Feast Preference
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {[
                    'Gujarati Traditional',
                    'Jain Friendly',
                    'Farali Fasting',
                    'Pure Vegetarian',
                    'Any Authentic Amdavadi midnight stall (Manek Chowk style)'
                  ].map((option, idx) => {
                    const isSelected = formData.foodPreference === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, foodPreference: option }))}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all text-left cursor-pointer ${
                          idx === 4 ? 'sm:col-span-2' : ''
                        } ${
                          isSelected
                            ? 'bg-[#0e0024] text-white shadow-sm font-bold'
                            : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#1b1c1a]'
                        }`}
                      >
                        <span className={`font-label-md text-label-md ${isSelected ? 'text-[#ffe088]' : ''}`}>
                          {option}
                        </span>
                        {isSelected && <span className="w-2 h-2 rounded-full bg-[#fd6b0f]"></span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Travel Mode */}
              <div className="space-y-3 pt-2">
                <label className="block font-label-md text-label-md text-[#0e0024] font-bold">
                  Travel & Arrival Logistics
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, travelMode: 'personal' }))}
                    className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer shadow-sm transition-all border ${
                      formData.travelMode === 'personal'
                        ? 'bg-[#efeeeb] border-[#fd6b0f]/50'
                        : 'bg-[#f5f3f0] hover:bg-[#efeeeb] border-transparent'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#fd6b0f] text-white flex items-center justify-center">
                      <Car className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-label-md text-label-md font-bold text-[#0e0024]">
                        Personal Car / Scooter
                      </span>
                      <span className="font-body-sm text-body-sm text-[#4a454f] truncate">
                        AI will auto-suggest designated parking bays
                      </span>
                    </div>
                    {formData.travelMode === 'personal' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#a14000]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#ccc4d0]"></div>
                    )}
                  </div>

                  <div
                    onClick={() => setFormData(prev => ({ ...prev, travelMode: 'cab' }))}
                    className={`flex items-center gap-3 p-3.5 rounded-xl cursor-pointer shadow-sm transition-all border ${
                      formData.travelMode === 'cab'
                        ? 'bg-[#efeeeb] border-[#fd6b0f]/50'
                        : 'bg-[#f5f3f0] hover:bg-[#efeeeb] border-transparent'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#2a114b] text-white flex items-center justify-center">
                      <span className="text-sm">🚕</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-label-md text-label-md font-bold text-[#0e0024]">
                        Cab / Rickshaw
                      </span>
                      <span className="font-body-sm text-body-sm text-[#4a454f] truncate">
                        Drop-off zones outside heavy SG traffic
                      </span>
                    </div>
                    {formData.travelMode === 'cab' ? (
                      <CheckCircle2 className="w-5 h-5 text-[#a14000]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[#ccc4d0]"></div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Live AI Co-Pilot Assistant (5 cols desktop) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* AI Assistant Showcase Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#2a114b] to-[#0e0024] text-white p-6 sm:p-7 shadow-xl relative overflow-hidden border border-white/10">
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-[#fd6b0f]/15 blur-2xl pointer-events-none"></div>
              <div className="absolute -left-12 bottom-0 w-44 h-44 rounded-full bg-[#cca830]/15 blur-xl pointer-events-none"></div>

              {/* Header badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-[#fd6b0f] text-white flex items-center justify-center shadow-md">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#ffe088] font-bold">
                      Real-Time Synthesis
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-white font-bold">
                      AI Co-pilot Insights
                    </h3>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm bg-white/15 text-[#ffe088] px-2.5 py-1 rounded-full font-bold">
                  Night 8 Model
                </span>
              </div>

              {/* Dynamic Predictions */}
              <div className="mt-5 space-y-3.5">
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                  <Clock className="w-4 h-4 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <p className="font-label-md text-label-md text-[#ffe088] font-bold">
                      Peak Entry Queue Window
                    </p>
                    <p className="font-body-sm text-body-sm text-[#eddcff]">
                      SG Highway & Bodakdev entries will experience peak congestion between{' '}
                      <strong className="text-white">8:45 PM – 9:30 PM</strong>. Arrive at 8:15 PM for effortless parking.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-[#ffe088] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <p className="font-label-md text-label-md text-[#ffe088] font-bold">
                      High Match Venues Found
                    </p>
                    <p className="font-body-sm text-body-sm text-[#eddcff]">
                      3 traditional venues around Bodakdev & SBR match your ₹{formData.budgetPerPerson.toLocaleString('en-IN')} budget and friends group configuration with 96% accuracy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                  <Activity className="w-4 h-4 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <div className="space-y-1 text-xs">
                    <p className="font-label-md text-label-md text-[#ffe088] font-bold">
                      Predicted Garba Dance Energy
                    </p>
                    <div className="flex items-center gap-3 pt-0.5">
                      <div className="bg-[#0e0024]/60 px-2.5 py-1 rounded-lg border border-white/10">
                        <span className="font-headline-sm text-[15px] text-[#ffe088] font-bold">~4,800</span>
                        <span className="font-label-sm text-[9px] text-[#eddcff] block uppercase">Taali Steps</span>
                      </div>
                      <div className="bg-[#0e0024]/60 px-2.5 py-1 rounded-lg border border-white/10">
                        <span className="font-headline-sm text-[15px] text-[#ffdbcc] font-bold">~650 kcal</span>
                        <span className="font-label-sm text-[9px] text-[#eddcff] block uppercase">Energy Burn</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-xl backdrop-blur-sm">
                  <Palette className="w-4 h-4 text-[#ffe088] shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs">
                    <p className="font-label-md text-label-md text-[#ffe088] font-bold">
                      Recommended Ashtami Wardrobe
                    </p>
                    <p className="font-body-sm text-body-sm text-[#eddcff]">
                      Night 8 honors Mahagauri: <strong className="text-white">Royal Purple (Jamli)</strong> or radiant Peacock Blue attire is highly revered across classic venues tonight.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence Meter */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center font-label-sm text-label-sm">
                  <span className="text-[#eddcff]">Engine Pass Match Confidence</span>
                  <span className="text-[#ffe088] font-bold">98.4%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#0e0024] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#fd6b0f] via-[#cca830] to-[#fd6b0f] w-[98%] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Venue Spotlight Card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ccc4d0]/30">
              <div className="relative h-44 w-full">
                <img
                  alt="Bodakdev Heritage Garba Ground"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFgP3Arqv2G1Xw8lW1U4W7gtMOBQE8HJFaS1tjgk3ZqYo9t3vjpgAPTP6kayh3QKGBkOVutmlF3vlQlhQyUN8bfhx2GZGkUAOI-MWuRNdnhWoV2IKX_5K2CoxpPCLqCVdqYAP48etDtgG5T6WgrsWsfsEbteYm9GiXMlh7efZD1FIzxMcowN1CIrI5PfSEOZqe_K_-qnzGI2u6gsd47M8oV0UBw2tSBf_lhanGCr2pbQ6jn_QUt0Z9"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024]/90 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <span className="font-label-sm text-label-sm bg-[#fd6b0f] text-white px-2 py-0.5 rounded-full font-bold uppercase">
                      Trending Tonight
                    </span>
                    <p className="font-title-md text-title-md font-bold mt-1">
                      Bodakdev Heritage Garba Ground
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-[#1b1c1a]">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-[#a14000]" />
                  <span>Near Judges Bungalow Rd</span>
                </div>
                <span className="font-label-md text-label-md text-[#a14000] font-bold">
                  ₹1,100 / pass
                </span>
              </div>
            </div>

            {/* Manek Chowk Midnight Route Teaser */}
            <div className="p-4 rounded-2xl bg-[#f5f3f0] border border-[#ccc4d0]/30 shadow-sm flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#ffe088] text-[#241a00] flex items-center justify-center shrink-0 text-xl font-bold">
                🍽️
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-label-sm uppercase font-bold text-[#a14000]">
                  Amdavad Tradition
                </span>
                <h4 className="font-title-md text-title-md text-[#0e0024] font-bold">
                  Post-Garba Midnight Fafda & Jalebi
                </h4>
                <p className="font-body-sm text-body-sm text-[#4a454f] truncate">
                  Auto-included route stop for 1:30 AM cravings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <aside
        aria-label="Selected Night Summary"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#ccc4d0]/40 shadow-[0_-8px_24px_-4px_rgba(14,0,36,0.12)]"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Summary Pills */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
            <span className="hidden md:inline-flex font-label-sm text-label-sm uppercase tracking-wider text-[#a14000] font-bold">
              Your Night Spec:
            </span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#efeeeb] font-label-md text-label-md text-[#0e0024] font-semibold">
              <Users className="w-3.5 h-3.5 text-[#a14000]" />
              <span>{formData.groupSize} Guests</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#efeeeb] font-label-md text-label-md text-[#0e0024] font-semibold">
              <span className="text-xs">💃</span>
              <span>{formData.vibes[0] || 'Traditional'}</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#efeeeb] font-label-md text-label-md text-[#0e0024] font-semibold">
              <span className="text-xs">₹</span>
              <span>₹{formData.budgetPerPerson.toLocaleString('en-IN')} / person</span>
            </div>
          </div>

          {/* Action CTA Button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleCreatePlan}
              disabled={isLoading}
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#fd6b0f] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_20px_-2px_rgba(253,107,15,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-5 h-5" />
              <span>Create My Navratri</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};
