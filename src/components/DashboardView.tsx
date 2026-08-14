import React from 'react';
import { UserProfile, TimelineEvent, Assignment, Announcement, CampusEvent, NavTab } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  timelineEvents: TimelineEvent[];
  assignments: Assignment[];
  announcements: Announcement[];
  recommendedEvent: CampusEvent;
  onOpenNewNote: () => void;
  onOpenSubmitModal: (assignment: Assignment) => void;
  onToggleEventRsvp: (eventId: string) => void;
  onNavigate: (tab: NavTab) => void;
  onOpenAnnouncement: (announcement: Announcement) => void;
  onFocusSearch: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  timelineEvents,
  assignments,
  announcements,
  recommendedEvent,
  onOpenNewNote,
  onOpenSubmitModal,
  onToggleEventRsvp,
  onNavigate,
  onOpenAnnouncement,
  onFocusSearch,
}) => {
  const currentDateFormatted = 'Friday, August 14, 2026';
  const upcomingDeadlines = assignments.filter((a) => a.status === 'due-today' || a.status === 'due-soon');
  const dueTodayAssignment = assignments.find((a) => a.id === 'asg-1') || assignments[0];

  return (
    <div id="dashboard-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Daily Digest • Vol. XXIV
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Term 1 • Week 6
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Good morning, {user.firstName}.
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium" id="current-date">
            {currentDateFormatted} • Academic Session
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="dashboard-new-note-btn"
            onClick={onOpenNewNote}
            className="bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-md flex items-center gap-2 hover:bg-black/80 transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Compose Note</span>
          </button>

          <button
            id="dashboard-search-btn"
            onClick={onFocusSearch}
            className="border border-black/20 bg-[#FFFFFF] text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.15em] px-4 py-3.5 rounded-md flex items-center justify-center hover:bg-[#E8E4DE]/60 transition-colors shadow-2xs cursor-pointer"
            aria-label="Search"
          >
            <span className="material-symbols-outlined text-[18px]">search</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left / Center Column (8 cols on lg) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* Quick Overview Cards (Editorial Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Card 1: Classes Today */}
            <div 
              onClick={() => onNavigate('timetable')}
              className="bg-[#FFFFFF] p-5 rounded-xl border border-black/10 flex flex-col justify-between hover:border-black/30 hover:shadow-surface-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40">
                  Lectures
                </span>
                <span className="material-symbols-outlined text-black/30 group-hover:text-black transition-colors text-[18px]">
                  school
                </span>
              </div>
              <div>
                <span className="font-serif text-[36px] font-normal text-[#1A1A1A] leading-none">04</span>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 mt-1">
                  Classes Scheduled
                </p>
              </div>
            </div>

            {/* Card 2: Assignments Due */}
            <div 
              onClick={() => onNavigate('assignments')}
              className="bg-[#FFFFFF] p-5 rounded-xl border border-black/10 flex flex-col justify-between hover:border-[#8F2222]/40 hover:shadow-surface-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-[#8F2222]">
                  Deadlines
                </span>
                <span className="material-symbols-outlined text-[#8F2222]/60 group-hover:text-[#8F2222] transition-colors text-[18px]">
                  assignment_late
                </span>
              </div>
              <div>
                <span className="font-serif text-[36px] font-normal text-[#8F2222] leading-none">02</span>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 mt-1">
                  Due This Week
                </p>
              </div>
            </div>

            {/* Card 3: Attendance */}
            <div className="bg-[#FFFFFF] p-5 rounded-xl border border-black/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40">
                  Standing
                </span>
                <span className="material-symbols-outlined text-black/30 text-[18px]">
                  fact_check
                </span>
              </div>
              <div>
                <span className="font-serif text-[36px] font-normal text-[#1A1A1A] leading-none">{user.attendanceRate}%</span>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 mt-1">
                  Attendance Record
                </p>
              </div>
            </div>

            {/* Card 4: Event Today */}
            <div 
              onClick={() => onNavigate('events')}
              className="bg-[#FFFFFF] p-5 rounded-xl border border-black/10 flex flex-col justify-between hover:border-black/30 hover:shadow-surface-1 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40">
                  Campus Life
                </span>
                <span className="material-symbols-outlined text-black/30 group-hover:text-black transition-colors text-[18px]">
                  celebration
                </span>
              </div>
              <div>
                <span className="font-serif text-[36px] font-normal text-[#1A1A1A] leading-none">01</span>
                <p className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 mt-1">
                  Event Today
                </p>
              </div>
            </div>
          </div>

          {/* My Campus Today Timeline (Editorial Journal Style) */}
          <div className="bg-[#FFFFFF] p-6 md:p-8 rounded-xl border border-black/10">
            <div className="flex items-baseline justify-between pb-5 mb-6 border-b border-black/10">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-1">
                  Agenda & Itinerary
                </span>
                <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A] flex items-center gap-2">
                  <span>Today's Chronology</span>
                </h3>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-[#1A1A1A] hover:underline flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>

            <div className="relative pl-6 border-l border-black/15 flex flex-col gap-6 ml-2">
              {/* Timeline Item 1 (Past) */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-black/20 border-2 border-[#FFFFFF]"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-black/40 px-2 py-0.5 bg-[#E8E4DE]/60 rounded mb-1.5 inline-block">
                      08:30 AM
                    </span>
                    <h4 className="font-serif text-[18px] text-black/50 line-through decoration-black/30">
                      Data Structures & Algorithms
                    </h4>
                    <p className="font-sans text-[12px] text-black/40 mt-0.5 flex items-center gap-1 italic">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      <span>Lecture Hall 402, CS Wing</span>
                    </p>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-black/40 border border-black/10 px-2 py-0.5 rounded self-start sm:self-auto">
                    Attended
                  </span>
                </div>
              </div>

              {/* Timeline Item 2 (Current/Upcoming Deadline with Editorial Highlight Card) */}
              <div className="relative">
                <div className="absolute -left-[30px] top-4 w-3 h-3 rounded-full bg-[#8F2222] border-2 border-[#FFFFFF] shadow-2xs"></div>
                <div className="bg-[#E8E4DE]/80 p-5 rounded-lg border border-black/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-[#8F2222] px-2 py-0.5 bg-[#FFFFFF] rounded border border-[#8F2222]/30">
                        Priority Deadline
                      </span>
                      <span className="font-sans text-[11px] text-black/60">10:30 AM Today</span>
                    </div>
                    <h4 className="font-serif text-[22px] font-normal text-[#1A1A1A] leading-tight">
                      Algorithm Analysis Assignment
                    </h4>
                    <p className="font-sans text-[12px] text-black/70 mt-1 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-black/50">upload_file</span>
                      <span>Digital submission required (PDF/ZIP)</span>
                    </p>
                  </div>
                  <button
                    id="submit-now-timeline-btn"
                    onClick={() => onOpenSubmitModal(dueTodayAssignment)}
                    className="bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-md whitespace-nowrap self-start sm:self-center hover:bg-black/80 transition-all cursor-pointer active:scale-98 shadow-xs"
                  >
                    Submit Assignment
                  </button>
                </div>
              </div>

              {/* Timeline Item 3 (Lunch Break) */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-black/40 border-2 border-[#FFFFFF]"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-black/60 px-2 py-0.5 bg-[#E8E4DE]/60 rounded mb-1.5 inline-block">
                      01:00 PM
                    </span>
                    <h4 className="font-serif text-[18px] font-medium text-[#1A1A1A]">
                      Midday Refectory Break
                    </h4>
                    <p className="font-sans text-[12px] text-black/50 mt-0.5 flex items-center gap-1 italic">
                      <span className="material-symbols-outlined text-[14px]">restaurant</span>
                      <span>Main Dining Hall & Commons</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('campus-services')}
                    className="font-sans text-[10px] uppercase tracking-[0.15em] font-semibold text-black/70 hover:text-black hover:underline self-start sm:self-auto"
                  >
                    View Daily Menu →
                  </button>
                </div>
              </div>

              {/* Timeline Item 4 (Workshop) */}
              <div className="relative">
                <div className="absolute -left-[30px] top-1.5 w-3 h-3 rounded-full bg-black/60 border-2 border-[#FFFFFF]"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-black/60 px-2 py-0.5 bg-[#E8E4DE]/60 rounded mb-1.5 inline-block">
                      03:00 PM
                    </span>
                    <h4 className="font-serif text-[18px] font-medium text-[#1A1A1A]">
                      Career Colloquium: Tech Industry Prep
                    </h4>
                    <p className="font-sans text-[12px] text-black/50 mt-0.5 flex items-center gap-1 italic">
                      <span className="material-symbols-outlined text-[14px]">group_work</span>
                      <span>Student Union, Amphitheatre B</span>
                    </p>
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-black/70 bg-[#E8E4DE] px-2.5 py-1 rounded border border-black/10 self-start sm:self-auto">
                    RSVP Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols on lg) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Upcoming Deadlines */}
          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-black/10">
            <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-[#8F2222] block mb-0.5">
                  Action Required
                </span>
                <h3 className="font-serif text-[20px] font-normal text-[#1A1A1A]">
                  Coursework
                </h3>
              </div>
              <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#8F2222] border border-[#8F2222]/30 px-2 py-0.5 rounded">
                {upcomingDeadlines.length} Pending
              </span>
            </div>

            <ul className="flex flex-col gap-3">
              {/* Item 1 */}
              <li
                onClick={() => onOpenSubmitModal(assignments[0])}
                className="p-3.5 bg-[#E8E4DE]/40 rounded-lg border border-black/10 flex items-center justify-between gap-3 hover:bg-[#E8E4DE]/70 transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-black/40 block">CS301 Algorithm Design</span>
                  <h4 className="font-serif text-[16px] font-medium text-[#1A1A1A] truncate">Algorithms PSet 4</h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-sans text-[10px] font-bold text-[#8F2222] bg-[#FFFFFF] border border-[#8F2222]/30 rounded px-2 py-0.5">
                    Today, 10:30 AM
                  </span>
                </div>
              </li>

              {/* Item 2 */}
              <li
                onClick={() => onOpenSubmitModal(assignments[1])}
                className="p-3.5 bg-[#FFFFFF] rounded-lg border border-black/10 flex items-center justify-between gap-3 hover:bg-[#F4F1ED] transition-colors cursor-pointer"
              >
                <div className="flex-1 min-w-0">
                  <span className="font-sans text-[9px] uppercase tracking-wider text-black/40 block">ENG205 Tech Writing</span>
                  <h4 className="font-serif text-[16px] font-medium text-[#1A1A1A] truncate">Research Draft</h4>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-sans text-[10px] text-black/50 italic">Tomorrow</span>
                </div>
              </li>
            </ul>

            <button
              id="view-all-assignments-btn"
              onClick={() => onNavigate('assignments')}
              className="w-full mt-4 py-2.5 font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#1A1A1A] bg-[#F4F1ED] hover:bg-[#E8E4DE] border border-black/10 rounded-md transition-colors cursor-pointer text-center"
            >
              All Assignments Register
            </button>
          </div>

          {/* Announcements / Campus Bulletins */}
          <div className="bg-[#FFFFFF] p-6 rounded-xl border border-black/10">
            <div className="flex items-baseline justify-between pb-4 mb-4 border-b border-black/10">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-0.5">
                  Gazette
                </span>
                <h3 className="font-serif text-[20px] font-normal text-[#1A1A1A]">
                  Dispatches
                </h3>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-widest text-black/40">Weekly</span>
            </div>

            <div className="flex flex-col gap-4">
              {announcements.slice(0, 2).map((ann, idx) => (
                <div
                  key={ann.id}
                  onClick={() => onOpenAnnouncement(ann)}
                  className={`cursor-pointer group ${
                    idx !== 0 ? 'border-t border-black/5 pt-4' : ''
                  }`}
                >
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-black/45">
                    {ann.tag}
                  </span>
                  <h4 className="font-serif text-[16px] font-medium text-[#1A1A1A] mt-1 leading-snug group-hover:italic transition-all">
                    {ann.title}
                  </h4>
                  <p className="font-sans text-[12px] text-black/60 mt-1 line-clamp-2 leading-relaxed">
                    {ann.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Event Card with Obscura / Editorial publication look */}
          <div className="bg-[#E8E4DE] rounded-xl border border-black/10 overflow-hidden relative group">
            <div className="h-38 w-full relative overflow-hidden">
              <img
                src={recommendedEvent.imageUrl}
                alt={recommendedEvent.title}
                className="w-full h-full object-cover grayscale-[20%] group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <span className="absolute top-3 left-3 font-sans text-[9px] font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F4F1ED] px-2.5 py-1 rounded">
                Feature Selection
              </span>
            </div>

            <div className="p-6 relative bg-[#FFFFFF]">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/40 block mb-1">
                Campus Gathering
              </span>
              <h4 className="font-serif text-[20px] font-normal text-[#1A1A1A] leading-tight">
                {recommendedEvent.title}
              </h4>
              <p className="font-sans text-[12px] text-black/60 mt-2 flex items-center gap-1.5 italic">
                <span className="material-symbols-outlined text-[15px] text-black/40">calendar_today</span>
                <span>{recommendedEvent.dateRange}, {recommendedEvent.time}</span>
              </p>
              <button
                id="rsvp-recommended-event-btn"
                onClick={() => onToggleEventRsvp(recommendedEvent.id)}
                className={`mt-5 w-full font-sans text-[11px] uppercase tracking-[0.2em] font-semibold py-3 rounded-md transition-all cursor-pointer ${
                  recommendedEvent.isRegistered
                    ? 'bg-[#E8E4DE] text-[#1A1A1A] border border-black/20 hover:bg-[#DCD7CF]'
                    : 'bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 shadow-xs'
                }`}
              >
                {recommendedEvent.isRegistered ? '✓ Registration Recorded' : 'RSVP for Gathering'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
