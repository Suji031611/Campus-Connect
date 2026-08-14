import React, { useState } from 'react';
import { CampusEvent } from '../types';

interface EventsViewProps {
  events: CampusEvent[];
  onToggleRegister: (eventId: string) => void;
  onToggleBookmark: (eventId: string) => void;
  onOpenEventDetails: (event: CampusEvent) => void;
  searchQuery: string;
}

export const EventsView: React.FC<EventsViewProps> = ({
  events,
  onToggleRegister,
  onToggleBookmark,
  onOpenEventDetails,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('Anytime');
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>('All Organizers');

  const filteredEvents = events.filter((evt) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      evt.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesOrganizer =
      selectedOrganizer === 'All Organizers' ||
      evt.organizer.toLowerCase().includes(selectedOrganizer.toLowerCase());

    const matchesSearch =
      !searchQuery ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesOrganizer && matchesSearch;
  });

  const featuredEvent = filteredEvents.find((e) => e.isFeatured) || filteredEvents[0];
  const regularEvents = filteredEvents.filter((e) => e.id !== featuredEvent?.id);

  const handleShare = (event: CampusEvent) => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `${event.title} - ${event.dateRange} at ${event.location}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(`${event.title}: ${event.dateRange} at ${event.location}`);
      alert(`Event link copied for: ${event.title}`);
    }
  };

  return (
    <div id="events-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Campus Gazette & Gatherings
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Colloquiums & Assemblies
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Campus Events & Colloquia
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Find workshops, symposiums, hackathons, and student society forums.
          </p>
        </div>
      </div>

      {/* Filters Bento Box */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-[#FFFFFF] p-6 rounded-xl border border-black/10 shadow-2xs">
        {/* Category Buttons */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-sans text-[9px] font-bold text-black/40 mb-2 uppercase tracking-[0.2em]">
            Classification
          </label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Workshops', 'Hackathons', 'Cultural', 'Sports'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-md font-sans text-[10px] uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#F4F1ED]'
                    : 'bg-[#F4F1ED] text-black/70 hover:bg-[#E8E4DE] border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Date Filter */}
        <div className="col-span-1">
          <label className="block font-sans text-[9px] font-bold text-black/40 mb-2 uppercase tracking-[0.2em]">
            Time Horizon
          </label>
          <select
            value={selectedDateFilter}
            onChange={(e) => setSelectedDateFilter(e.target.value)}
            className="w-full bg-[#F4F1ED] border border-black/15 rounded-md py-2 px-3 font-sans text-[11px] text-[#1A1A1A] uppercase tracking-wider focus:outline-none focus:border-black font-medium cursor-pointer"
          >
            <option>Anytime</option>
            <option>Today</option>
            <option>This Week</option>
            <option>This Weekend</option>
            <option>Next Week</option>
          </select>
        </div>

        {/* Club/Organizer Filter */}
        <div className="col-span-1">
          <label className="block font-sans text-[9px] font-bold text-black/40 mb-2 uppercase tracking-[0.2em]">
            Host Society
          </label>
          <select
            value={selectedOrganizer}
            onChange={(e) => setSelectedOrganizer(e.target.value)}
            className="w-full bg-[#F4F1ED] border border-black/15 rounded-md py-2 px-3 font-sans text-[11px] text-[#1A1A1A] uppercase tracking-wider focus:outline-none focus:border-black font-medium cursor-pointer"
          >
            <option>All Organizers</option>
            <option>Computer Science Society</option>
            <option>Arts Council</option>
            <option>Design Society</option>
            <option>Sports Union</option>
            <option>Career & Alumni Relations</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Event Hero Card (Spans full width) */}
        {featuredEvent && (
          <div className="col-span-1 lg:col-span-2 relative rounded-xl overflow-hidden group border border-black/15 shadow-surface-1 min-h-[380px] sm:min-h-[420px] flex flex-col justify-end">
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full transition-transform duration-700 group-hover:scale-105 grayscale-[15%]"
              style={{ backgroundImage: `url('${featuredEvent.imageUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Top Badge */}
            <div className="absolute top-5 right-5 flex gap-2">
              <span className="bg-[#FFFFFF] text-[#1A1A1A] px-3 py-1 rounded font-sans text-[9px] uppercase tracking-[0.2em] font-bold shadow-xs">
                {featuredEvent.isRegistered ? '✓ Registration Recorded' : 'Open for Registration'}
              </span>
            </div>

            {/* Card Content Overlay */}
            <div className="relative p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
              <div className="text-[#F4F1ED] max-w-2xl">
                <div className="flex flex-wrap items-center gap-3 mb-2 font-sans text-[12px] text-[#E8E4DE] uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    <span>{featuredEvent.dateRange}</span>
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/40" />
                  <span className="flex items-center gap-1.5 italic font-serif">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    <span>{featuredEvent.location}</span>
                  </span>
                </div>

                <h3 className="font-serif text-[28px] sm:text-[36px] md:text-[42px] font-normal text-white mb-2 leading-tight">
                  {featuredEvent.title}
                </h3>

                <p className="font-sans text-[13px] text-white/80 mb-4 leading-relaxed line-clamp-2">
                  {featuredEvent.description}
                </p>

                <div className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest text-[#E8E4DE]">
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[12px]">account_balance</span>
                  </span>
                  <span>{featuredEvent.organizer}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleShare(featuredEvent)}
                  className="bg-white/15 hover:bg-white/30 backdrop-blur-xs text-white w-11 h-11 rounded-md flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  aria-label="Share"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>

                <button
                  onClick={() => onToggleBookmark(featuredEvent.id)}
                  className="bg-white/15 hover:bg-white/30 backdrop-blur-xs text-white w-11 h-11 rounded-md flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  aria-label="Bookmark"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: featuredEvent.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    bookmark
                  </span>
                </button>

                <button
                  onClick={() => onOpenEventDetails(featuredEvent)}
                  className="flex-1 md:flex-none bg-[#FFFFFF] text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3 rounded-md hover:bg-[#E8E4DE] transition-all text-center shadow-xs cursor-pointer min-w-[140px]"
                >
                  {featuredEvent.isRegistered ? 'Manage RSVP' : 'Register Now'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Regular Event Cards */}
        {regularEvents.map((event) => (
          <div
            key={event.id}
            className="bg-[#FFFFFF] rounded-xl overflow-hidden border border-black/10 hover:border-black/30 hover:shadow-surface-1 transition-all duration-300 flex flex-col group shadow-2xs"
          >
            {/* Image Banner */}
            <div className="h-48 relative overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[15%]"
                referrerPolicy="no-referrer"
              />
              {event.badge && (
                <div className="absolute top-3 right-3">
                  <span className="bg-[#1A1A1A] text-[#F4F1ED] px-2.5 py-1 rounded font-sans text-[9px] font-bold uppercase tracking-wider">
                    {event.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col flex-1 justify-between">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-black/40 block mb-1">
                      {event.categoryLabel}
                    </span>
                    <h3
                      onClick={() => onOpenEventDetails(event)}
                      className="font-serif text-[20px] font-normal text-[#1A1A1A] hover:italic transition-all cursor-pointer leading-tight"
                    >
                      {event.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => onToggleBookmark(event.id)}
                    className="text-black/40 hover:text-black transition-colors p-1 cursor-pointer"
                    aria-label="Bookmark"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: event.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                <div className="space-y-2 mb-6 font-sans text-[12px] text-black/60">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-black/40">schedule</span>
                    <span>{event.dateRange} • {event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 italic">
                    <span className="material-symbols-outlined text-[16px] text-black/40">location_on</span>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-black/40">account_balance</span>
                    <span>{event.organizer}</span>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-black/10 flex items-center gap-3">
                <button
                  onClick={() => handleShare(event)}
                  className="bg-[#F4F1ED] hover:bg-[#E8E4DE] text-[#1A1A1A] w-10 h-10 rounded-md border border-black/10 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Share"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>

                {event.isRegistered ? (
                  <button
                    onClick={() => onToggleRegister(event.id)}
                    className="flex-1 bg-[#E8E4DE] text-[#1A1A1A] border border-black/20 font-sans text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2.5 rounded-md hover:bg-[#DCD7CF] transition-colors text-center h-10 flex items-center justify-center cursor-pointer shadow-2xs"
                  >
                    ✓ Registered (Cancel)
                  </button>
                ) : event.category === 'Workshops' ? (
                  <button
                    onClick={() => onOpenEventDetails(event)}
                    className="flex-1 bg-[#F4F1ED] hover:bg-[#E8E4DE] border border-black/15 text-[#1A1A1A] font-sans text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2.5 rounded-md transition-colors text-center h-10 flex items-center justify-center cursor-pointer"
                  >
                    View Details
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleRegister(event.id)}
                    className="flex-1 bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2.5 rounded-md hover:bg-black/80 transition-colors text-center h-10 flex items-center justify-center shadow-xs cursor-pointer"
                  >
                    Register Now
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
