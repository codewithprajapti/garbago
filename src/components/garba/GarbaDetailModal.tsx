import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Car,
  Utensils,
  Shirt,
  Compass,
  Bookmark
} from 'lucide-react';
import { GarbaEvent } from '../../types';

interface GarbaDetailModalProps {
  event: GarbaEvent | null;
  onClose: () => void;
  onAddToPlan: (event: GarbaEvent) => void;
}

export const GarbaDetailModal: React.FC<GarbaDetailModalProps> = ({
  event,
  onClose,
  onAddToPlan
}) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0024]/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#ccc4d0]/40 my-8">
        {/* Header Hero Image */}
        <div className="relative h-64 sm:h-72 w-full bg-[#0e0024]">
          <img
            alt={event.name}
            className="w-full h-full object-cover"
            src={event.image}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0024] via-[#0e0024]/40 to-transparent"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title */}
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fd6b0f] text-white font-label-sm text-xs font-bold uppercase">
                {event.passType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[#ffe088] font-label-sm text-xs font-bold">
                ✨ {event.matchScore}% AI Match
              </span>
            </div>
            <h2 className="font-headline-md text-headline-md text-white font-bold">
              {event.name}
            </h2>
            <p className="font-body-sm text-sm text-[#eddcff]">
              {event.tagline}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 text-[#1b1c1a]">
          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#f5f3f0] rounded-2xl border border-[#ccc4d0]/30">
            <div className="space-y-0.5">
              <span className="text-xs text-[#4a454f] font-semibold block">Pass Price</span>
              <span className="font-title-md text-[#0e0024] font-bold">
                {event.price === 0 ? 'Free Entry' : `₹${event.price}`}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#4a454f] font-semibold block">Timings</span>
              <span className="font-title-md text-[#0e0024] font-bold text-xs truncate">
                {event.time}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#4a454f] font-semibold block">Style</span>
              <span className="font-title-md text-[#0e0024] font-bold text-xs truncate">
                {event.style}
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs text-[#4a454f] font-semibold block">Area</span>
              <span className="font-title-md text-[#a14000] font-bold text-xs truncate">
                {event.area}
              </span>
            </div>
          </div>

          {/* AI Match Insight Box */}
          <div className="p-4 bg-gradient-to-r from-[#2a114b] to-[#0e0024] rounded-2xl text-white space-y-1.5 shadow-md">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ffe088]" />
              <h4 className="font-title-md text-sm font-bold text-[#ffe088]">
                Why this matches you
              </h4>
            </div>
            <p className="font-body-sm text-xs text-[#eddcff] leading-relaxed">
              {event.whyMatches}
            </p>
          </div>

          {/* About & Venue */}
          <div className="space-y-2">
            <h4 className="font-title-md text-base font-bold text-[#0e0024]">
              About This Experience
            </h4>
            <p className="font-body-md text-sm text-[#4a454f] leading-relaxed">
              {event.about}
            </p>
            <div className="flex items-center gap-2 text-xs text-[#735c00] font-semibold pt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.venue} ({event.distance})</span>
            </div>
          </div>

          {/* What to expect checklist */}
          <div className="space-y-2.5">
            <h4 className="font-title-md text-base font-bold text-[#0e0024]">
              What to Expect
            </h4>
            <div className="space-y-2">
              {event.whatToExpect.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4a454f]">
                  <CheckCircle2 className="w-4 h-4 text-[#fd6b0f] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dress code & Logistics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-1">
              <div className="flex items-center gap-2 text-[#0e0024] font-bold text-xs">
                <Shirt className="w-4 h-4 text-[#a14000]" />
                <span>Dress Code & Attire</span>
              </div>
              <p className="text-xs text-[#4a454f] leading-relaxed">
                {event.dressCode}
              </p>
            </div>

            <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-1">
              <div className="flex items-center gap-2 text-[#0e0024] font-bold text-xs">
                <Utensils className="w-4 h-4 text-[#a14000]" />
                <span>Festive Food Court</span>
              </div>
              <p className="text-xs text-[#4a454f] leading-relaxed">
                {event.foodAvailability}
              </p>
            </div>

            <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-1">
              <div className="flex items-center gap-2 text-[#0e0024] font-bold text-xs">
                <Car className="w-4 h-4 text-[#a14000]" />
                <span>Parking & Valet</span>
              </div>
              <p className="text-xs text-[#4a454f] leading-relaxed">
                {event.parkingValet}
              </p>
            </div>

            <div className="p-4 bg-[#f5f3f0] rounded-xl border border-[#ccc4d0]/20 space-y-1">
              <div className="flex items-center gap-2 text-[#0e0024] font-bold text-xs">
                <Compass className="w-4 h-4 text-[#a14000]" />
                <span>Travel & Traffic Alert</span>
              </div>
              <p className="text-xs text-[#4a454f] leading-relaxed">
                {event.travelAdvice}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#ccc4d0]/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#4a454f]">
              Instant confirmation • Direct gate e-pass barcode
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-[#efeeeb] text-[#0e0024] font-label-md text-sm font-bold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onAddToPlan(event);
                  onClose();
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#fd6b0f] text-white font-label-md text-sm font-bold hover:bg-[#e05a05] shadow-md transition-all cursor-pointer"
              >
                <Bookmark className="w-4 h-4" />
                <span>Add to My Plan</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
