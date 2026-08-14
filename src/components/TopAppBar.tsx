import React, { useState } from 'react';
import { UserProfile, Announcement, NavTab } from '../types';

interface TopAppBarProps {
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  announcements: Announcement[];
  onNavigate: (tab: NavTab) => void;
  onOpenNewNote: () => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  user,
  searchQuery,
  onSearchChange,
  announcements,
  onNavigate,
  onOpenNewNote,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header
      id="top-app-bar"
      className="h-20 w-full md:w-[calc(100%-280px)] fixed top-0 right-0 z-40 bg-[#F4F1ED]/90 backdrop-blur-md flex justify-between items-center px-6 md:px-10 border-b border-black/10 transition-all duration-200"
    >
      {/* Mobile brand title */}
      <div className="md:hidden flex items-center gap-2.5">
        <span className="font-serif text-[22px] font-normal tracking-tight text-[#1A1A1A]">CampusConnect</span>
        <span className="font-sans text-[9px] uppercase tracking-widest text-black/40 border border-black/10 px-1.5 py-0.5 rounded">Ed.</span>
      </div>

      {/* Search Bar with Editorial Framing */}
      <div className="hidden md:flex flex-1 max-w-lg relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-black/40 text-[18px]">
          search
        </span>
        <input
          id="global-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search curriculum, dispatches, archives & dialogues..."
          className="w-full h-11 bg-[#E8E4DE]/50 border border-black/10 rounded-lg pl-11 pr-4 font-sans text-[13px] text-[#1A1A1A] placeholder:text-black/40 focus:outline-none focus:border-black/40 focus:bg-[#FFFFFF] transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        )}
      </div>

      <div className="flex-1 md:hidden"></div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Note Button with Editorial Style */}
        <button
          id="topbar-new-note-btn"
          onClick={onOpenNewNote}
          className="hidden sm:flex items-center gap-2 px-4 py-2 border border-black/20 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#F4F1ED] transition-all"
        >
          <span className="material-symbols-outlined text-[15px]">edit_note</span>
          <span>Draft Note</span>
        </button>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            id="notifications-toggle-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative text-[#1A1A1A] border border-black/10 hover:bg-[#E8E4DE]/60 rounded-full p-2.5 transition-all duration-150"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#8F2222] ring-2 ring-[#F4F1ED]"></span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div
              id="notifications-popover"
              className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FFFFFF] rounded-xl shadow-modal border border-black/10 p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div className="flex items-baseline gap-2">
                  <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/40">Dispatch</span>
                  <h4 className="font-serif text-[18px] font-normal text-[#1A1A1A]">Campus Bulletins</h4>
                </div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-widest bg-[#E8E4DE] text-[#1A1A1A] px-2 py-0.5 rounded border border-black/10">
                  {announcements.length} New
                </span>
              </div>

              <div className="divide-y divide-black/5 max-h-72 overflow-y-auto custom-scrollbar my-2">
                {announcements.map((ann) => (
                  <div key={ann.id} className="py-3 hover:bg-[#F4F1ED]/70 rounded-md px-2 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-black/50">
                        {ann.tag}
                      </span>
                      <span className="font-sans text-[10px] text-black/40 italic">{ann.date}</span>
                    </div>
                    <p className="font-serif text-[15px] font-medium text-[#1A1A1A] leading-snug">{ann.title}</p>
                    <p className="font-sans text-[12px] text-black/60 line-clamp-1 mt-1">{ann.summary}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('dashboard');
                }}
                className="w-full mt-2 py-2.5 text-center font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] bg-[#F4F1ED] hover:bg-[#E8E4DE] rounded-md transition-colors border border-black/10"
              >
                View Academic Timeline
              </button>
            </div>
          )}
        </div>

        {/* Profile Avatar & Menu */}
        <div className="relative">
          <button
            id="profile-menu-btn"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="w-10 h-10 rounded-full overflow-hidden border border-black/20 hover:border-black transition-colors focus:ring-1 focus:ring-black"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Profile Menu Popover */}
          {showProfileMenu && (
            <div
              id="profile-popover"
              className="absolute right-0 mt-3 w-68 bg-[#FFFFFF] rounded-xl shadow-modal border border-black/10 p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center gap-3.5 pb-4 border-b border-black/10">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover border border-black/10"
                  referrerPolicy="no-referrer"
                />
                <div className="overflow-hidden">
                  <h4 className="font-serif text-[16px] font-medium text-[#1A1A1A] truncate">{user.name}</h4>
                  <p className="font-sans text-[11px] text-black/50 truncate">{user.email}</p>
                  <span className="inline-block mt-1 font-sans text-[9px] uppercase tracking-wider font-semibold text-black/60 bg-[#E8E4DE] px-2 py-0.5 rounded border border-black/10">
                    ID: {user.studentId}
                  </span>
                </div>
              </div>

              <div className="py-2.5 space-y-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('timetable');
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-[12px] text-black/70 hover:text-[#1A1A1A] hover:bg-[#F4F1ED] rounded-md flex items-center gap-2.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-black/40">badge</span>
                  <span>Student Credentials & Schedule</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('settings');
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-[12px] text-black/70 hover:text-[#1A1A1A] hover:bg-[#F4F1ED] rounded-md flex items-center gap-2.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-black/40">tune</span>
                  <span>Preferences & Settings</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('support');
                  }}
                  className="w-full px-3 py-2 text-left font-sans text-[12px] text-black/70 hover:text-[#1A1A1A] hover:bg-[#F4F1ED] rounded-md flex items-center gap-2.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-black/40">help_center</span>
                  <span>Faculty & Dispatch Desk</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
