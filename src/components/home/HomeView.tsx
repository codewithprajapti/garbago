import React from 'react';
import {
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
  ArrowRight,
  Zap,
  MapPin,
  Music,
  Users,
  Award,
  Moon,
  ChevronRight
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectEvent: (eventId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onSelectEvent }) => {
  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION WITH CINEMATIC ATMOSPHERE */}
      <section className="relative w-full overflow-hidden bg-[#2a114b] text-white">
        {/* Layered Background Artwork with Warm Scrim & Radial Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Navratri Garba Night in Ahmedabad"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform duration-1000 ease-out"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBRvkZL0ZqLk9MKeOlVWez8i_8hpzHYJyShO9JeAoedzZ2vroW0ZtOchYIGRuj0zNPBL5Wrkj2Ql2JuPsNFvvf3onpvHhUZQWzJGYLd0beE9N1uGj1PezZcBhr-1YM3PuRlV7UjRMfV_WckQ1vUKP7-JGZdFb3oG2Cie2alKnApQNKtd1_2E1VjSgd70n9dmunmym9TbWfiRCyhCtp-SHgKhsy42I_trST2FVEp3krrc6PVjI2fkD7"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024] via-[#2a114b]/80 to-[#0e0024]/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-radial from-[#fd6b0f]/20 via-transparent to-[#0e0024]/95 pointer-events-none"></div>
        </div>

        {/* Radiant Ambient Diya Light Overlays */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#fd6b0f]/25 rounded-full blur-3xl pointer-events-none -translate-x-1/2"></div>
        <div className="absolute bottom-4 right-10 w-80 h-80 bg-[#cca830]/30 rounded-full blur-3xl pointer-events-none"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32 flex flex-col items-center text-center">
          {/* Festival Live Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#cca830]/30 backdrop-blur-md shadow-lg shadow-black/40 mb-6">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#fd6b0f] animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-[#ffe088] tracking-widest uppercase font-bold">
              ✨ Ahmedabad Navratri 2025 • Live AI Planning
            </span>
          </div>

          {/* Main Editorial Headline */}
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-white max-w-4xl tracking-tight leading-tight mb-6">
            Your Perfect Navratri Night, <br className="hidden sm:inline" />
            <span className="italic font-display-lg text-[#ffe088] font-normal">
              Planned by AI.
            </span>
          </h1>

          {/* Supporting Subtitle */}
          <p className="font-body-lg text-body-lg text-[#eddcff]/90 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Discover Garba, food, outfits, and authentic experiences tailored to your rhythm across the cultural capital of Gujarat.
          </p>

          {/* CTA Buttons Block */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14">
            <button
              onClick={() => onNavigate('plan-my-night')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#fd6b0f] text-white font-label-lg text-label-lg font-bold shadow-xl shadow-[#fd6b0f]/30 hover:bg-[#e05a05] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span>✨ Plan My Navratri</span>
            </button>
            <button
              onClick={() => onNavigate('garba-finder')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md text-white font-label-lg text-label-lg font-semibold hover:bg-white/20 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5 text-[#ffe088]" />
              <span>Explore Garba Venues</span>
            </button>
          </div>

          {/* Quick Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-3xl">
            <div className="px-5 py-3 rounded-lg bg-[#0e0024]/70 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2.5 text-white shadow-sm">
              <Calendar className="w-4 h-4 text-[#fd6b0f]" />
              <span className="font-label-md text-label-md tracking-wide">9 Nights of Celebrations</span>
            </div>
            <div className="px-5 py-3 rounded-lg bg-[#0e0024]/70 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2.5 text-white shadow-sm">
              <Compass className="w-4 h-4 text-[#ffe088]" />
              <span className="font-label-md text-label-md tracking-wide">120+ Heritage & Club Venues</span>
            </div>
            <div className="px-5 py-3 rounded-lg bg-[#0e0024]/70 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2.5 text-white shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#fd6b0f]" />
              <span className="font-label-md text-label-md tracking-wide">100% Gujarati Curated</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE PULSE STRIP (AHMEDABAD RAAS RADAR) */}
      <section className="w-full bg-[#eae8e5] border-y border-[#ccc4d0]/50 py-3.5 relative z-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fd6b0f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fd6b0f]"></span>
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#4a454f] font-bold">
                Live Ahmedabad Pulse
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccc4d0]"></span>
              <span className="font-title-md text-title-md text-[#0e0024] font-bold">
                Day 4: Royal Jamli (Purple) Theme
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-[#1b1c1a]">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-[#a14000]">🌤️</span>
                <span>26°C Clear Breezy Amdavad Sky</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-[#a14000]">🚗</span>
                <span>
                  SG Highway: <strong className="text-[#a14000] font-bold">High Rush</strong>
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-[#735c00]">🪔</span>
                <span>
                  Heritage Pols: <strong className="text-[#0e0024] font-bold">Vibrant Aarti 10 PM</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION: PLAN YOUR NIGHT YOUR WAY */}
      <section className="w-full bg-[#fbf9f6] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#a14000] font-label-md text-label-md uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4 text-[#fd6b0f]" />
                <span>Intelligent Festivity</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#0e0024] tracking-tight">
                Plan your night your way
              </h2>
              <p className="font-body-lg text-body-lg text-[#4a454f] max-w-xl">
                AI intelligence paired with authentic Gujarati festival tradition, tuned down to every beat of the dhol.
              </p>
            </div>
            <button
              onClick={() => onNavigate('plan-my-night')}
              className="inline-flex items-center gap-2 text-[#0e0024] font-label-lg text-label-lg hover:text-[#a14000] transition-colors cursor-pointer font-bold"
            >
              <span>Explore all planner tools</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 4 Feature Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CARD 1: Garba Finder */}
            <div
              onClick={() => onNavigate('garba-finder')}
              className="group relative rounded-2xl bg-white p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-[#eae8e5] flex items-center justify-center text-2xl shadow-inner">
                    💃
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#efeeeb] font-label-sm text-label-sm text-[#a14000] font-bold">
                    120+ Venues
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-[#0e0024] mb-1 group-hover:text-[#a14000] transition-colors font-bold">
                    Garba Finder
                  </h3>
                  <p className="font-title-md text-title-md text-[#0e0024] font-medium mb-2">
                    Find your perfect Garba experience.
                  </p>
                  <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
                    Filter by SG Highway, Club, Traditional Sheri Garba, or DJ Dandiya with real-time crowd vibe & live passes.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#ccc4d0]/20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-[#0e0024] group-hover:text-[#a14000] font-bold">
                  <span>View Live Passes</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <Compass className="w-4 h-4 text-[#cca830]" />
              </div>
            </div>

            {/* CARD 2: AI Night Planner */}
            <div
              onClick={() => onNavigate('plan-my-night')}
              className="group relative rounded-2xl bg-white p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-[#fd6b0f]/30 ring-1 ring-[#fd6b0f]/20 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-[#2a114b] flex items-center justify-center text-2xl shadow-inner">
                    ✨
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#2a114b] font-label-sm text-label-sm text-[#ffe088] font-bold">
                    Instant AI Plan
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-[#0e0024] mb-1 group-hover:text-[#a14000] transition-colors font-bold">
                    AI Night Planner
                  </h3>
                  <p className="font-title-md text-title-md text-[#0e0024] font-medium mb-2">
                    Create a personalized itinerary.
                  </p>
                  <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
                    Tell us your group, budget, and music vibe. AI crafts a minute-by-minute night plan with food and transport.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#ccc4d0]/20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-[#fd6b0f] font-bold">
                  <span>Generate Schedule</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <Sparkles className="w-4 h-4 text-[#fd6b0f]" />
              </div>
            </div>

            {/* CARD 3: Outfit AI */}
            <div
              onClick={() => onNavigate('outfit-ai')}
              className="group relative rounded-2xl bg-white p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-[#eae8e5] flex items-center justify-center text-2xl shadow-inner">
                    👗
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#ffdbcc] font-label-sm text-label-sm text-[#7b2f00] font-bold">
                    Smart Styling
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-[#0e0024] mb-1 group-hover:text-[#a14000] transition-colors font-bold">
                    Outfit AI
                  </h3>
                  <p className="font-title-md text-title-md text-[#0e0024] font-medium mb-2">
                    Build your perfect Garba look.
                  </p>
                  <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
                    Curate matching Chaniya Choli, Kediyu, authentic Kutch mirror-work, Bandhani accessories, and color palettes.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#ccc4d0]/20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-[#0e0024] group-hover:text-[#a14000] font-bold">
                  <span>Match Tonight's Color</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[#cca830] text-sm">🎨</span>
              </div>
            </div>

            {/* CARD 4: Food Guide */}
            <div
              onClick={() => onNavigate('ahmedabad-guide')}
              className="group relative rounded-2xl bg-white p-7 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-xl bg-[#eae8e5] flex items-center justify-center text-2xl shadow-inner">
                    🍽️
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#e4e2df] font-label-sm text-label-sm text-[#0e0024] font-bold">
                    Midnight Bites
                  </span>
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-[#0e0024] mb-1 group-hover:text-[#a14000] transition-colors font-bold">
                    Food Guide
                  </h3>
                  <p className="font-title-md text-title-md text-[#0e0024] font-medium mb-2">
                    Navratri-friendly food options.
                  </p>
                  <p className="font-body-sm text-body-sm text-[#4a454f] leading-relaxed">
                    Late-night Manek Chowk Fafda-Jalebi, Kesar Doodh spots, and fasting-friendly Farali delicacies across Ahmedabad.
                  </p>
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#ccc4d0]/20 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-[#0e0024] group-hover:text-[#a14000] font-bold">
                  <span>View Manek Chowk Map</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[#fd6b0f] text-sm">☕</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: MADE FOR AHMEDABAD NAVRATRI (CATEGORIES) */}
      <section className="w-full bg-[#f5f3f0] py-16 lg:py-24 border-t border-[#ccc4d0]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#a14000] font-bold">
              Authentic Amdavad Spirit
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#0e0024]">
              Made for Ahmedabad Navratri
            </h2>
            <p className="font-body-lg text-body-lg text-[#4a454f]">
              Curated experiences across the world's longest dance festival in Amdavad. Every venue carries its own soul.
            </p>
          </div>

          {/* 5 Curated Atmosphere Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Experience 1: Traditional Garba */}
            <div
              onClick={() => onSelectEvent('bodakdev-heritage')}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#0e0024] text-[#ffe088] font-label-sm text-label-sm font-bold">
                    Pure Folklore
                  </span>
                  <Music className="w-5 h-5 text-[#a14000]" />
                </div>
                <h3 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Traditional Garba
                </h3>
                <p className="font-body-sm text-body-sm text-[#4a454f]">
                  Heritage Sheri style, live double Dhol beats, authentic multi-step rhythmic claps, and deeply spiritual Mataji Aarti at midnight.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Live Shehnai
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Barefoot Chants
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ccc4d0]/20 flex items-center justify-between text-[#a14000] font-label-sm text-label-sm font-bold">
                <span>Bhadra & Raipur Pols</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Experience 2: Modern Garba */}
            <div
              onClick={() => onSelectEvent('adani-shantigram')}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#ffdbcc] text-[#351000] font-label-sm text-label-sm font-bold">
                    High Energy
                  </span>
                  <Zap className="w-5 h-5 text-[#fd6b0f]" />
                </div>
                <h3 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Modern Garba
                </h3>
                <p className="font-body-sm text-body-sm text-[#4a454f]">
                  Celebrity Gujarati vocalists, arena-grade dynamic sound engineering, synchronized LED wristbands, and electrifying Dandiya circles.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Adani Shantigram
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    EKA Club
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ccc4d0]/20 flex items-center justify-between text-[#a14000] font-label-sm text-label-sm font-bold">
                <span>SG Highway Arena</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Experience 3: Family-friendly */}
            <div
              onClick={() => onSelectEvent('bodakdev-heritage')}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#efeeeb] text-[#0e0024] font-label-sm text-label-sm font-bold">
                    Comfort & Ease
                  </span>
                  <Users className="w-5 h-5 text-[#735c00]" />
                </div>
                <h3 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Family-friendly
                </h3>
                <p className="font-body-sm text-body-sm text-[#4a454f]">
                  Safe natural lawns, generous monitored parking lots, elder-friendly shaded seating pavilions, and separate safe zones for children.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Dedicated Seating
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Pure Farali Canteen
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ccc4d0]/20 flex items-center justify-between text-[#a14000] font-label-sm text-label-sm font-bold">
                <span>GMDC & University Ground</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Experience 4: Premium Clubs */}
            <div
              onClick={() => onSelectEvent('karnavati-club')}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-[#ccc4d0]/30 cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#ffe088] text-[#241a00] font-label-sm text-label-sm font-bold">
                    Exclusive VIP
                  </span>
                  <Award className="w-5 h-5 text-[#735c00]" />
                </div>
                <h3 className="font-title-lg text-title-lg text-[#0e0024] font-bold">
                  Premium Clubs
                </h3>
                <p className="font-body-sm text-body-sm text-[#4a454f]">
                  Karnavati, Rajpath, YMCA, and Shankus. Immaculate heritage settings with reserved member lounges and priority pass access.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Member Passes
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-[#efeeeb] font-label-sm text-label-sm text-[#4a454f]">
                    Valet Parking
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-[#ccc4d0]/20 flex items-center justify-between text-[#a14000] font-label-sm text-label-sm font-bold">
                <span>SG Highway Club Belt</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Experience 5: Community / Sheri Garba (Spans 2 cols on tablet/desktop) */}
            <div
              onClick={() => onSelectEvent('mandvi-ni-pol')}
              className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#2a114b] to-[#0e0024] text-white rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden cursor-pointer"
            >
              <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-[#fd6b0f]/20 rounded-full blur-2xl pointer-events-none"></div>
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#cca830]/30 text-[#ffe088] font-label-sm text-label-sm font-bold">
                    UNESCO World Heritage Pols
                  </span>
                  <Moon className="w-5 h-5 text-[#ffe088]" />
                </div>
                <h3 className="font-title-lg text-title-lg text-white font-bold">
                  Community / Sheri Garba
                </h3>
                <p className="font-body-sm text-body-sm text-[#eddcff]/90 max-w-xl">
                  Step inside the wooden carved havelis of Old Ahmedabad. Revel in intimate community courtyards with zero commercial pass barriers, genuine hospitality, and century-old sacred traditions.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/10 font-label-sm text-label-sm text-white">
                    Dhal ni Pol
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 font-label-sm text-label-sm text-white">
                    Mandvi ni Pol
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-white/10 font-label-sm text-label-sm text-white">
                    Khadia Chowk
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[#ffe088] relative z-10 font-label-sm text-label-sm font-bold">
                <span>Authentic Amdavad Heritage</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE AI ITINERARY TEASER / MINI PREVIEW */}
      <section className="w-full bg-[#fbf9f6] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Editorial Content */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdbcc] text-[#351000] font-label-sm text-label-sm font-bold">
                <Sparkles className="w-4 h-4 text-[#fd6b0f]" />
                <span>Real-time Ahmedabad Engine</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-[#0e0024] tracking-tight">
                One tap. <br />
                Your whole evening orchestrated.
              </h2>
              <p className="font-body-lg text-body-lg text-[#4a454f] leading-relaxed">
                From styling suggestions matching the night’s celestial hue to dinner recommendations at midnight, GarbaGo removes the chaos from Navratri nights in Ahmedabad.
              </p>
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <p className="font-body-md text-body-md text-[#1b1c1a]">
                    <strong>SG Highway Traffic Sync:</strong> Real-time alerts for parking clearances and shuttle lines.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <p className="font-body-md text-body-md text-[#1b1c1a]">
                    <strong>QR Pass Verification:</strong> Directly scan or access pre-booked passes without network lags.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <p className="font-body-md text-body-md text-[#1b1c1a]">
                    <strong>Manek Chowk Table Tracker:</strong> Real-time rush estimator for late-night fafda-jalebi.
                  </p>
                </div>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('plan-my-night')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0e0024] text-white font-label-lg text-label-lg font-bold hover:bg-[#2a114b] transition-all shadow-md cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#ffe088]" />
                  <span>Build Tonight's Timeline</span>
                </button>
              </div>
            </div>

            {/* Right: Mockup of Night Schedule Card */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#ccc4d0]/30">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#ccc4d0]/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#fd6b0f]/10 flex items-center justify-center text-[#fd6b0f]">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Amdavad Night Itinerary • Day 4
                      </h4>
                      <p className="font-label-sm text-label-sm text-[#4a454f]">
                        Generated for 4 Friends • Club + Manek Chowk Vibe
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#efeeeb] font-label-sm text-label-sm text-[#fd6b0f] font-bold">
                    OPTIMAL
                  </span>
                </div>

                {/* Timeline Entries */}
                <div className="space-y-3.5">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors">
                    <span className="font-label-md text-label-md text-[#a14000] font-bold shrink-0 mt-0.5">
                      08:00 PM
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Attire Prep & Bandhani Fitting
                      </p>
                      <p className="font-body-sm text-body-sm text-[#4a454f]">
                        Day 4 theme: Royal Jamli (Purple). Kutch mirror-work stole suggested.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors">
                    <span className="font-label-md text-label-md text-[#a14000] font-bold shrink-0 mt-0.5">
                      09:30 PM
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Karnavati Club Entry (Early Gates)
                      </p>
                      <p className="font-body-sm text-body-sm text-[#4a454f]">
                        Park at P2 Gate before rush. VIP pass barcode pinned offline.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors">
                    <span className="font-label-md text-label-md text-[#a14000] font-bold shrink-0 mt-0.5">
                      12:15 AM
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Heritage Aarti at Mandvi ni Pol
                      </p>
                      <p className="font-body-sm text-body-sm text-[#4a454f]">
                        Move inward via Nehru Bridge. Traditional brass lamp lighting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-[#f5f3f0] hover:bg-[#efeeeb] transition-colors">
                    <span className="font-label-md text-label-md text-[#a14000] font-bold shrink-0 mt-0.5">
                      01:30 AM
                    </span>
                    <div className="space-y-0.5">
                      <p className="font-title-md text-title-md text-[#0e0024] font-bold">
                        Midnight Feast: Manek Chowk
                      </p>
                      <p className="font-body-sm text-body-sm text-[#4a454f]">
                        Gwalior Dosa, Farali Pattice, and warm saffron Kesar Doodh.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Footer Quick Action */}
                <div className="mt-6 pt-4 border-t border-[#ccc4d0]/20 flex items-center justify-between text-[#4a454f]">
                  <span className="font-label-sm text-label-sm flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#735c00]" />
                    <span>Optimized route saved offline</span>
                  </span>
                  <button
                    onClick={() => onNavigate('plan-my-night')}
                    className="font-label-sm text-label-sm text-[#a14000] hover:underline font-bold cursor-pointer"
                  >
                    Customise Stops
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL BANNER SECTION CTA */}
      <section className="w-full bg-[#f5f3f0] py-16 lg:py-24 border-t border-[#ccc4d0]/30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-[#0e0024] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#fd6b0f]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#cca830]/25 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-3">
                <span className="px-3.5 py-1 rounded-full bg-[#fd6b0f]/20 border border-[#fd6b0f]/30 text-[#ffe088] font-label-sm text-label-sm tracking-wide font-bold">
                  🎉 85,000+ AMDAVADIS READY
                </span>
                <h2 className="font-display-lg text-headline-lg md:text-display-lg text-white tracking-tight">
                  Ready for your Garba night?
                </h2>
                <p className="font-body-lg text-body-lg text-[#eddcff]/90 max-w-xl">
                  Join 85,000+ Amdavadis who plan their Navratri memories with GarbaGo. Don't let sold-out passes and traffic delays spoil the circle.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                <button
                  onClick={() => onNavigate('plan-my-night')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#fd6b0f] text-white font-label-lg text-label-lg font-bold shadow-lg hover:bg-[#e05a05] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Create My Plan</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
