import React from 'react';
import { NavTab } from '../types';

interface SideNavBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  unreadAssignmentsCount?: number;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  currentTab,
  onSelectTab,
  unreadAssignmentsCount = 2,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Overview', icon: 'dashboard' },
    { id: 'study-hub' as NavTab, label: 'Study Hub', icon: 'school' },
    { id: 'timetable' as NavTab, label: 'Timetable', icon: 'calendar_month' },
    { 
      id: 'assignments' as NavTab, 
      label: 'Assignments', 
      icon: 'assignment', 
      badge: unreadAssignmentsCount > 0 ? unreadAssignmentsCount : undefined 
    },
    { id: 'events' as NavTab, label: 'Events & Culture', icon: 'event' },
    { id: 'community' as NavTab, label: 'Discussions', icon: 'forum' },
    { id: 'campus-services' as NavTab, label: 'Campus Services', icon: 'account_balance' },
  ];

  const bottomItems = [
    { id: 'settings' as NavTab, label: 'Preferences', icon: 'tune' },
    { id: 'support' as NavTab, label: 'Help & Dispatch', icon: 'help_outline' },
  ];

  return (
    <nav 
      id="desktop-side-nav" 
      className="hidden md:flex flex-col h-screen py-8 w-[280px] fixed left-0 top-0 bg-[#F4F1ED] z-50 overflow-y-auto border-r border-black/10 select-none"
    >
      {/* Brand Header with Editorial Masthead styling */}
      <div className="px-8 mb-8 pb-6 border-b border-black/5">
        <span className="block font-sans text-[9px] uppercase tracking-[0.25em] font-semibold text-black/40 mb-1.5">
          Student Life • Vol. XXIV
        </span>
        <div className="flex items-baseline gap-2">
          <h1 className="font-serif text-[28px] font-normal tracking-tight text-[#1A1A1A] leading-none">
            CAMPUS
          </h1>
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-black/60">
            CONNECT
          </span>
        </div>
        <p className="font-serif text-[12px] italic text-black/50 mt-1.5">
          Academic Journal & Community
        </p>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 flex flex-col gap-1 px-4">
        <span className="px-4 font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/35 mb-2">
          Directory
        </span>
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full px-4 py-2.5 rounded-lg flex items-center gap-3 transition-all text-left group relative ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F4F1ED] font-medium shadow-xs'
                  : 'text-black/70 hover:bg-[#E8E4DE]/60 hover:text-[#1A1A1A]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] transition-transform ${
                  isActive ? 'text-[#F4F1ED]' : 'text-black/50 group-hover:text-black'
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className={`text-[13px] font-sans tracking-wide flex-1 ${isActive ? 'font-medium' : ''}`}>
                {item.label}
              </span>

              {item.badge && (
                <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded-full ${
                  isActive 
                    ? 'bg-[#F4F1ED] text-[#1A1A1A]' 
                    : 'bg-[#E8E4DE] text-[#1A1A1A] border border-black/10'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Settings & Support */}
      <div className="mt-auto pt-5 border-t border-black/10 px-4 flex flex-col gap-1">
        <span className="px-4 font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/35 mb-1">
          System
        </span>
        {bottomItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => onSelectTab(item.id)}
              className={`w-full px-4 py-2 rounded-lg flex items-center gap-3 transition-colors text-left ${
                isActive
                  ? 'bg-[#1A1A1A] text-[#F4F1ED] font-medium'
                  : 'text-black/60 hover:bg-[#E8E4DE]/60 hover:text-[#1A1A1A]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[18px] ${
                  isActive ? 'text-[#F4F1ED]' : 'text-black/50'
                }`}
                style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              <span className="text-[13px] font-sans tracking-wide">{item.label}</span>
            </button>
          );
        })}

        <div className="px-4 pt-4 text-[9px] font-sans uppercase tracking-[0.2em] text-black/30 flex justify-between items-center">
          <span>MMXXVI Campus Edition</span>
          <span>Iss. 08</span>
        </div>
      </div>
    </nav>
  );
};
