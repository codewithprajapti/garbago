import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Filter,
  ArrowRight,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { GarbaEvent } from '../../types';
import { MOCK_EVENTS } from '../../lib/data/mockEvents';

interface GarbaFinderViewProps {
  onSelectEvent: (event: GarbaEvent) => void;
  onNavigate: (tab: string) => void;
}

export const GarbaFinderView: React.FC<GarbaFinderViewProps> = ({
  onSelectEvent,
  onNavigate
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All');
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [selectedBudget, setSelectedBudget] = useState('All');
  const [familyOnly, setFamilyOnly] = useState(false);

  const areas = ['All', 'SG Highway', 'Bodakdev & Vastrapur', 'Heritage Walled City', 'Gandhinagar Border & Koba'];
  const styles = ['All', 'Traditional', 'Modern', 'Sheri Garba', 'Club'];

  const filteredEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => {
      // Search
      const matchesSearch =
        searchQuery === '' ||
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.style.toLowerCase().includes(searchQuery.toLowerCase());

      // Area filter
      const matchesArea =
        selectedArea === 'All' || event.area.toLowerCase().includes(selectedArea.toLowerCase());

      // Style filter
      const matchesStyle =
        selectedStyle === 'All' || event.style.toLowerCase().includes(selectedStyle.toLowerCase());

      // Budget filter
      let matchesBudget = true;
      if (selectedBudget === 'Free') {
        matchesBudget = event.price === 0;
      } else if (selectedBudget === 'under-1200') {
        matchesBudget = event.price <= 1200;
      } else if (selectedBudget === 'above-1200') {
        matchesBudget = event.price > 1200;
      }

      // Family friendly
      const matchesFamily = !familyOnly || event.tags.some(t => t.toLowerCase().includes('seating') || t.toLowerCase().includes('family'));

      return matchesSearch && matchesArea && matchesStyle && matchesBudget && matchesFamily;
    });
  }, [searchQuery, selectedArea, selectedStyle, selectedBudget, familyOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedArea('All');
    setSelectedStyle('All');
    setSelectedBudget('All');
    setFamilyOnly(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] py-8 md:py-12">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a114b] text-[#ffe088] font-label-sm text-label-sm font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#cca830]" />
              <span>Ahmedabad Venue Radar • 120+ Grounds Active</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#0e0024] font-bold">
              Garba Finder
            </h1>
            <p className="font-body-md text-body-md text-[#4a454f] max-w-xl">
              Discover authentic Garba grounds across Ahmedabad. Filter by traditional taal, crowd intensity, pass tiers, and proximity.
            </p>
          </div>

          <button
            onClick={() => onNavigate('plan-my-night')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fd6b0f] text-white font-label-md text-sm font-bold shadow-md hover:bg-[#e05a05] transition-all cursor-pointer self-start md:self-auto"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI Plan My Night</span>
          </button>
        </div>

        {/* Search & Filters Card */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#ccc4d0]/30 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#4a454f]" />
            <input
              type="text"
              placeholder="Search Garba events, areas or venues (e.g. Karnavati, Bodakdev, Sheri, SBR)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl bg-[#f5f3f0] border border-[#ccc4d0]/40 text-[#1b1c1a] font-body-md text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#fd6b0f] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4a454f] hover:text-[#0e0024]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Pills Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            {/* Area */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-xs font-bold text-[#4a454f] shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#a14000]" />
                Area:
              </span>
              {areas.map(area => (
                <button
                  key={area}
                  onClick={() => setSelectedArea(area)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-label-md cursor-pointer transition-colors whitespace-nowrap ${
                    selectedArea === area
                      ? 'bg-[#0e0024] text-white font-bold'
                      : 'bg-[#f5f3f0] hover:bg-[#efeeeb] text-[#4a454f]'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#ccc4d0]/20">
            {/* Style Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#4a454f] mr-1">Style:</span>
              {styles.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedStyle(s)}
                  className={`px-3 py-1 rounded-lg text-xs font-label-md cursor-pointer transition-colors ${
                    selectedStyle === s
                      ? 'bg-[#2a114b] text-[#ffe088] font-bold'
                      : 'bg-[#f5f3f0] text-[#4a454f] hover:bg-[#efeeeb]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Budget options */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#4a454f]">Budget:</span>
              <button
                onClick={() => setSelectedBudget(selectedBudget === 'Free' ? 'All' : 'Free')}
                className={`px-3 py-1 rounded-lg text-xs font-label-md cursor-pointer ${
                  selectedBudget === 'Free'
                    ? 'bg-[#735c00] text-white font-bold'
                    : 'bg-[#f5f3f0] text-[#4a454f]'
                }`}
              >
                Free / Sheri
              </button>
              <button
                onClick={() => setSelectedBudget(selectedBudget === 'under-1200' ? 'All' : 'under-1200')}
                className={`px-3 py-1 rounded-lg text-xs font-label-md cursor-pointer ${
                  selectedBudget === 'under-1200'
                    ? 'bg-[#735c00] text-white font-bold'
                    : 'bg-[#f5f3f0] text-[#4a454f]'
                }`}
              >
                ≤ ₹1,200
              </button>
              <button
                onClick={() => setSelectedBudget(selectedBudget === 'above-1200' ? 'All' : 'above-1200')}
                className={`px-3 py-1 rounded-lg text-xs font-label-md cursor-pointer ${
                  selectedBudget === 'above-1200'
                    ? 'bg-[#735c00] text-white font-bold'
                    : 'bg-[#f5f3f0] text-[#4a454f]'
                }`}
              >
                ₹1,200+
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#4a454f] uppercase tracking-wider">
            Showing {filteredEvents.length} Garba Venues in Ahmedabad
          </span>
          {(searchQuery || selectedArea !== 'All' || selectedStyle !== 'All' || selectedBudget !== 'All' || familyOnly) && (
            <button
              onClick={clearFilters}
              className="text-xs text-[#a14000] hover:underline font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-[#ccc4d0]/30 space-y-3">
            <span className="text-4xl">🔍</span>
            <h3 className="font-headline-sm text-lg font-bold text-[#0e0024]">
              No Garba events found matching your filter
            </h3>
            <p className="text-sm text-[#4a454f] max-w-sm mx-auto">
              Try resetting your search query or selecting a different area or budget tier.
            </p>
            <button
              onClick={clearFilters}
              className="px-5 py-2 rounded-xl bg-[#0e0024] text-white text-xs font-bold cursor-pointer"
            >
              Show All Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#ccc4d0]/30 flex flex-col justify-between"
              >
                {/* Image & Match Tag */}
                <div className="relative h-48 w-full bg-[#0e0024] overflow-hidden">
                  <img
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={event.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024]/80 via-transparent to-transparent"></div>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="font-label-sm text-[10px] bg-[#fd6b0f] text-white px-2.5 py-0.5 rounded-full font-bold uppercase shadow-sm">
                      {event.isHeritage ? 'Heritage Pol' : event.style}
                    </span>
                    <span className="font-label-sm text-[10px] bg-[#0e0024]/80 backdrop-blur-md border border-white/20 text-[#ffe088] px-2 py-0.5 rounded-full font-bold">
                      {event.matchScore}% Match
                    </span>
                  </div>

                  {/* Price overlay at bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-baseline justify-between text-white">
                    <span className="text-xs text-[#eddcff] font-semibold">{event.area}</span>
                    <span className="font-title-md text-base font-bold text-[#ffe088]">
                      {event.price === 0 ? 'Free' : `₹${event.price}`}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-title-lg text-title-lg text-[#0e0024] font-bold group-hover:text-[#a14000] transition-colors">
                      {event.name}
                    </h3>
                    <p className="font-body-sm text-xs text-[#4a454f] line-clamp-2 leading-relaxed">
                      {event.about}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#ccc4d0]/20 text-xs text-[#4a454f]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#735c00]" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#a14000]" />
                      <span className="truncate">{event.venue}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {event.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="font-label-sm text-[9px] px-2 py-0.5 rounded-md bg-[#f5f3f0] text-[#4a454f] font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-3">
                    <button
                      onClick={() => onSelectEvent(event)}
                      className="w-full py-2.5 rounded-xl bg-[#0e0024] hover:bg-[#2a114b] text-white font-label-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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
