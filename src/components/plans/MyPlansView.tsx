import React, { useState } from 'react';
import {
  Bookmark,
  Calendar,
  Users,
  MapPin,
  Trash2,
  Share2,
  ExternalLink,
  Sparkles,
  QrCode,
  X,
  Plus
} from 'lucide-react';
import { SavedPlan, PlannerResult } from '../../types';

interface MyPlansViewProps {
  savedPlans: SavedPlan[];
  onViewPlan: (plan: PlannerResult) => void;
  onDeletePlan: (planId: string) => void;
  onNavigate: (tab: string) => void;
}

export const MyPlansView: React.FC<MyPlansViewProps> = ({
  savedPlans,
  onViewPlan,
  onDeletePlan,
  onNavigate
}) => {
  const [selectedPlanForQR, setSelectedPlanForQR] = useState<SavedPlan | null>(null);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fbf9f6] text-[#1b1c1a] py-8 md:py-12">
      {/* Share QR Modal */}
      {selectedPlanForQR && (
        <div className="fixed inset-0 z-50 bg-[#0e0024]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-[#ccc4d0]/40">
            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-sm font-bold text-[#0e0024]">
                Share {selectedPlanForQR.title}
              </span>
              <button
                onClick={() => setSelectedPlanForQR(null)}
                className="text-[#4a454f] hover:text-[#0e0024] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 bg-[#f5f3f0] rounded-xl flex flex-col items-center">
              <QrCode className="w-40 h-40 text-[#0e0024]" />
              <p className="font-mono text-xs font-bold text-[#0e0024] mt-2">
                GG-ITIN-{selectedPlanForQR.id.slice(-6).toUpperCase()}
              </p>
              <span className="text-[11px] text-[#a14000] font-semibold mt-1">
                Scan to load group itinerary & venue passes
              </span>
            </div>
            <p className="text-xs text-[#4a454f]">
              Syncs with all revelers in your group with offline verification.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2a114b] text-[#ffe088] font-label-sm text-label-sm font-bold">
              <Bookmark className="w-3.5 h-3.5 text-[#cca830]" />
              <span>Personal Passbook • Ahmedabad Navratri 2025</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-[#0e0024] font-bold">
              My Saved Plans
            </h1>
            <p className="font-body-md text-body-md text-[#4a454f] max-w-xl">
              Access your personalized Navratri night schedules, pass vouchers, budget summaries, and group coordination links.
            </p>
          </div>

          <button
            onClick={() => onNavigate('plan-my-night')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fd6b0f] text-white font-label-md text-sm font-bold shadow-md hover:bg-[#e05a05] transition-all cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Another Night</span>
          </button>
        </div>

        {/* Saved Plans List or Empty State */}
        {savedPlans.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-[#ccc4d0]/30 shadow-sm space-y-4 my-8 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#f5f3f0] flex items-center justify-center mx-auto text-3xl shadow-inner">
              🪔
            </div>
            <h3 className="font-headline-sm text-xl font-bold text-[#0e0024]">
              No saved plans yet
            </h3>
            <p className="text-sm text-[#4a454f] max-w-md mx-auto leading-relaxed">
              Tell GarbaGo what kind of Navratri night you want. In less than 10 seconds, our AI will orchestrate your passes, traffic routing, and midnight food trail!
            </p>
            <button
              onClick={() => onNavigate('plan-my-night')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#fd6b0f] text-white font-label-md text-sm font-bold shadow-md hover:bg-[#e05a05] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>✨ Plan My Navratri</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPlans.map(planItem => (
              <div
                key={planItem.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#ccc4d0]/30 flex flex-col justify-between"
              >
                {/* Top Banner Accent */}
                <div className="p-5 bg-gradient-to-r from-[#2a114b] to-[#0e0024] text-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-[10px] bg-[#fd6b0f] text-white px-2.5 py-0.5 rounded-full font-bold uppercase">
                      {planItem.vibeLabel}
                    </span>
                    <span className="text-xs text-[#ffe088] font-bold">
                      {planItem.result.matchScore}% Match
                    </span>
                  </div>
                  <h3 className="font-title-lg text-lg text-white font-bold truncate">
                    {planItem.title}
                  </h3>
                  <p className="text-xs text-[#eddcff] flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#ffe088]" />
                    <span>{planItem.date}</span>
                  </p>
                </div>

                {/* Details Body */}
                <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2.5 text-xs text-[#4a454f]">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Users className="w-4 h-4 text-[#a14000]" />
                        <span>Gathering:</span>
                      </span>
                      <span className="font-bold text-[#0e0024]">{planItem.groupSizeLabel}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5 font-medium">
                        <MapPin className="w-4 h-4 text-[#a14000]" />
                        <span>Hub / Area:</span>
                      </span>
                      <span className="font-bold text-[#0e0024] truncate max-w-[160px]">
                        {planItem.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#ccc4d0]/20">
                      <span className="text-sm text-[#4a454f] font-semibold">Estimated Budget:</span>
                      <div className="text-right">
                        <span className="font-title-md text-base font-bold text-[#a14000]">
                          ₹{planItem.budgetPerPerson.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-[#4a454f] block">/ person</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#ccc4d0]/20 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onDeletePlan(planItem.id)}
                      className="p-2 text-[#4a454f] hover:text-[#ba1a1a] rounded-lg hover:bg-[#efeeeb] transition-colors cursor-pointer"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setSelectedPlanForQR(planItem)}
                      className="p-2 text-[#4a454f] hover:text-[#0e0024] rounded-lg hover:bg-[#efeeeb] transition-colors cursor-pointer"
                      title="Share QR Pass"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onViewPlan(planItem.result)}
                      className="flex-1 py-2 px-4 bg-[#0e0024] text-white hover:bg-[#2a114b] rounded-xl font-label-md text-xs font-bold transition-all text-center cursor-pointer shadow-sm"
                    >
                      View Itinerary
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
