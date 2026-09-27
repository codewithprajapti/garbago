import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { PlannerView } from './components/planner/PlannerView';
import { ResultView } from './components/planner/ResultView';
import { GarbaFinderView } from './components/garba/GarbaFinderView';
import { GarbaDetailModal } from './components/garba/GarbaDetailModal';
import { OutfitAIView } from './components/outfit/OutfitAIView';
import { MyPlansView } from './components/plans/MyPlansView';
import { ProfileView } from './components/profile/ProfileView';
import { AhmedabadGuideView } from './components/guide/AhmedabadGuideView';
import { GarbaEvent, PlannerResult, SavedPlan, OutfitLook } from './types';
import { MOCK_EVENTS } from './lib/data/mockEvents';
import { generateFallbackPlan } from './lib/ai/fallbackPlan';

// Seed initial default plan for immediate rich demo
const DEFAULT_INITIAL_PLAN: PlannerResult = generateFallbackPlan({
  location: 'SG Highway & Clubs corridor',
  date: 'Saturday, 18 Oct 2025',
  nightNumber: 8,
  groupSize: '3-5',
  vibes: ['Traditional Garba'],
  budgetPerPerson: 1200,
  foodPreference: 'Gujarati Traditional',
  travelMode: 'personal'
});

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentPlan, setCurrentPlan] = useState<PlannerResult>(DEFAULT_INITIAL_PLAN);
  const [selectedEvent, setSelectedEvent] = useState<GarbaEvent | null>(null);
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>(() => {
    try {
      const stored = localStorage.getItem('garbago_saved_plans');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse saved plans from localStorage:', e);
    }
    // Default initial seed
    return [
      {
        id: 'plan-ashtami-default',
        title: 'Traditional Garba Night in Ahmedabad',
        date: 'Saturday, 18 Oct 2025',
        groupSizeLabel: '3–5 Friends',
        budgetPerPerson: 1250,
        totalCost: 6250,
        vibeLabel: 'Traditional Garba',
        location: 'SG Highway & Clubs corridor',
        result: DEFAULT_INITIAL_PLAN,
        createdAt: new Date().toISOString()
      }
    ];
  });

  // Sync saved plans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('garbago_saved_plans', JSON.stringify(savedPlans));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [savedPlans]);

  // Handle URL navigation synchronization
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/^\//, '');
      if (path === 'planner') setCurrentTab('plan-my-night');
      else if (path === 'planner/result') setCurrentTab('planner-result');
      else if (path === 'garba') setCurrentTab('garba-finder');
      else if (path === 'outfit') setCurrentTab('outfit-ai');
      else if (path === 'plans') setCurrentTab('my-plans');
      else if (path === 'profile') setCurrentTab('profile');
      else if (path === 'guide') setCurrentTab('ahmedabad-guide');
      else setCurrentTab('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let route = '/';
    if (tab === 'plan-my-night') route = '/planner';
    else if (tab === 'planner-result') route = '/planner/result';
    else if (tab === 'garba-finder') route = '/garba';
    else if (tab === 'outfit-ai') route = '/outfit';
    else if (tab === 'my-plans') route = '/plans';
    else if (tab === 'profile') route = '/profile';
    else if (tab === 'ahmedabad-guide') route = '/guide';

    window.history.pushState({}, '', route);
  };

  const handlePlanGenerated = (result: PlannerResult) => {
    setCurrentPlan(result);
    navigateTo('planner-result');
  };

  const handleSavePlan = (plan: PlannerResult) => {
    const newSaved: SavedPlan = {
      id: `plan-${Date.now()}`,
      title: plan.title,
      date: plan.date,
      groupSizeLabel: plan.groupSize,
      budgetPerPerson: plan.budget.total,
      totalCost: plan.budget.totalGroup,
      vibeLabel: plan.vibe,
      location: plan.location,
      result: plan,
      createdAt: new Date().toISOString()
    };
    setSavedPlans(prev => [newSaved, ...prev.filter(p => p.title !== plan.title)]);
  };

  const handleDeletePlan = (planId: string) => {
    setSavedPlans(prev => prev.filter(p => p.id !== planId));
  };

  const handleSelectEvent = (event: GarbaEvent | string) => {
    if (typeof event === 'string') {
      const found = MOCK_EVENTS.find(e => e.id === event);
      if (found) setSelectedEvent(found);
    } else {
      setSelectedEvent(event);
    }
  };

  const handleAddEventToPlan = (event: GarbaEvent) => {
    const updatedPlan: PlannerResult = {
      ...currentPlan,
      venueHighlight: {
        name: event.name,
        area: event.area,
        price: event.price,
        image: event.image
      },
      matchScore: event.matchScore
    };
    setCurrentPlan(updatedPlan);
    handleSavePlan(updatedPlan);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-[#1b1c1a]">
      {/* Top Header */}
      <Header
        currentTab={currentTab}
        onNavigate={navigateTo}
        onOpenSearch={() => navigateTo('garba-finder')}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={navigateTo}
            onSelectEvent={handleSelectEvent}
          />
        )}

        {currentTab === 'plan-my-night' && (
          <PlannerView
            onPlanGenerated={handlePlanGenerated}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'planner-result' && (
          <ResultView
            plan={currentPlan}
            onNavigate={navigateTo}
            onSavePlan={handleSavePlan}
            onRegenerate={async () => {
              try {
                const response = await fetch('/api/planner/generate', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    location: currentPlan.location,
                    date: currentPlan.date,
                    groupSize: currentPlan.groupCount,
                    budget: currentPlan.budget.total,
                    garbaStyle: currentPlan.vibe,
                    foodPreference: 'Gujarati Traditional',
                    transportation: 'Personal Vehicle',
                  }),
                });
                if (response.ok) {
                  const refreshed = await response.json();
                  setCurrentPlan(refreshed);
                  return;
                }
              } catch (e) {
                console.error('Regenerate API error, falling back:', e);
              }
              const regenerated = generateFallbackPlan({
                location: currentPlan.location,
                date: currentPlan.date,
                nightNumber: 8,
                groupSize: (currentPlan.groupCount > 6 ? '6-10' : currentPlan.groupCount > 2 ? '3-5' : 'duo') as any,
                vibes: [currentPlan.vibe],
                budgetPerPerson: currentPlan.budget.total,
                foodPreference: 'Gujarati Traditional',
                travelMode: 'personal'
              });
              setCurrentPlan(regenerated);
            }}
          />
        )}

        {currentTab === 'garba-finder' && (
          <GarbaFinderView
            onSelectEvent={handleSelectEvent}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'outfit-ai' && (
          <OutfitAIView
            onNavigate={navigateTo}
            onSaveOutfit={(look) => {
              console.log('Saved outfit look:', look.title);
            }}
          />
        )}

        {currentTab === 'my-plans' && (
          <MyPlansView
            savedPlans={savedPlans}
            onViewPlan={(plan) => {
              setCurrentPlan(plan);
              navigateTo('planner-result');
            }}
            onDeletePlan={handleDeletePlan}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            savedPlans={savedPlans}
            onViewPlan={(plan) => {
              setCurrentPlan(plan);
              navigateTo('planner-result');
            }}
            onSelectEvent={handleSelectEvent}
            onNavigate={navigateTo}
          />
        )}

        {currentTab === 'ahmedabad-guide' && (
          <AhmedabadGuideView
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Global Event Details Modal */}
      <GarbaDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onAddToPlan={handleAddEventToPlan}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onNavigate={navigateTo}
      />

      {/* Footer */}
      <Footer onNavigate={navigateTo} />
    </div>
  );
}
