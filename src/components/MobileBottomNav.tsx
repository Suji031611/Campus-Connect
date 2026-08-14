import React from 'react';
import { NavTab } from '../types';

interface MobileBottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  assignmentsCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  assignmentsCount = 2,
}) => {
  const tabs = [
    { id: 'dashboard' as NavTab, label: 'Overview', icon: 'dashboard' },
    { id: 'study-hub' as NavTab, label: 'Hub', icon: 'school' },
    { 
      id: 'assignments' as NavTab, 
      label: 'Tasks', 
      icon: 'assignment', 
      badge: assignmentsCount > 0 ? assignmentsCount : undefined 
    },
    { id: 'events' as NavTab, label: 'Events', icon: 'event' },
    { id: 'community' as NavTab, label: 'Discussions', icon: 'forum' },
  ];

  return (
    <nav
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 left-0 w-full bg-[#F4F1ED]/95 backdrop-blur-lg border-t border-black/10 z-50 px-3 py-1 shadow-surface-1 pb-safe"
    >
      <div className="flex justify-around items-center h-15">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-tab-${tab.id}`}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full relative transition-colors ${
                isActive ? 'text-[#1A1A1A]' : 'text-black/50 hover:text-black'
              }`}
            >
              <div
                className={`flex items-center justify-center transition-all ${
                  isActive ? 'w-10 h-7 bg-[#1A1A1A] text-[#F4F1ED] rounded-md' : 'w-7 h-7'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[19px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {tab.icon}
                </span>
              </div>
              <span className={`font-sans text-[9px] uppercase tracking-wider mt-1 ${isActive ? 'font-bold text-[#1A1A1A]' : 'font-medium'}`}>
                {tab.label}
              </span>

              {tab.badge && (
                <span className="absolute top-1 right-3.5 bg-[#8F2222] text-[#FFFFFF] text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-1 ring-[#F4F1ED]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
