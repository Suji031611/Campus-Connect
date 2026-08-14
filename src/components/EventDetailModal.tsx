import React from 'react';
import { CampusEvent } from '../types';

interface EventDetailModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleRegister: (eventId: string) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onToggleRegister,
}) => {
  if (!isOpen || !event) return null;

  const handleDownloadIcs = () => {
    alert(`Exported .ics calendar invite for "${event.title}". Added to device schedule!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-2xl w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Banner image */}
        <div className="h-48 sm:h-56 -mt-6 -mx-6 sm:-mt-8 sm:-mx-8 mb-6 relative overflow-hidden rounded-t-xl">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover grayscale-[15%]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-md bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] bg-[#E8E4DE] text-black/70 px-2.5 py-1 rounded border border-black/10">
              {event.categoryLabel || event.category}
            </span>
            <span className={`font-sans text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded border ${
              event.isRegistered ? 'bg-[#FFFFFF] text-[#8F2222] border-[#8F2222]/30' : 'bg-[#F4F1ED] text-black/60 border-black/10'
            }`}>
              {event.isRegistered ? '✓ Registration Recorded' : 'Registration Open'}
            </span>
          </div>

          <h3 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#1A1A1A] leading-tight">
            {event.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
            <div className="flex items-center gap-3 p-3.5 bg-[#F4F1ED] rounded-md border border-black/10">
              <span className="material-symbols-outlined text-black/50 text-[22px]">calendar_today</span>
              <div>
                <p className="font-sans text-[9px] text-black/40 uppercase font-bold tracking-wider">Date & Time</p>
                <p className="font-sans text-[12px] font-semibold text-[#1A1A1A]">{event.dateRange} • {event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 bg-[#F4F1ED] rounded-md border border-black/10">
              <span className="material-symbols-outlined text-black/50 text-[22px]">location_on</span>
              <div>
                <p className="font-sans text-[9px] text-black/40 uppercase font-bold tracking-wider">Location</p>
                <p className="font-sans text-[12px] font-semibold text-[#1A1A1A] italic">{event.location}</p>
              </div>
            </div>
          </div>

          <div>
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] text-black/40 block mb-1">
              Colloquium Synopsis
            </span>
            <p className="font-sans text-[13px] text-black/65 leading-relaxed">
              {event.description}
            </p>
          </div>

          <div className="bg-[#E8E4DE]/60 border border-black/10 p-3.5 rounded-md flex items-center justify-between font-sans text-[12px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-black/50 text-[18px]">account_balance</span>
              <span className="font-medium text-[#1A1A1A]">Organized by {event.organizer}</span>
            </div>
            <button
              onClick={handleDownloadIcs}
              className="text-[#1A1A1A] font-semibold uppercase tracking-wider text-[10px] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">event</span>
              <span>Export iCal</span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-5 mt-6 border-t border-black/10">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 hover:bg-[#E8E4DE] transition-colors cursor-pointer"
          >
            Dismiss
          </button>
          <button
            onClick={() => {
              onToggleRegister(event.id);
              onClose();
            }}
            className={`px-6 py-3 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold transition-all shadow-xs cursor-pointer ${
              event.isRegistered
                ? 'bg-[#FFFFFF] text-[#8F2222] border border-[#8F2222]/30 hover:bg-[#8F2222] hover:text-white'
                : 'bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80'
            }`}
          >
            {event.isRegistered ? 'Revoke RSVP' : 'Register Inscription'}
          </button>
        </div>
      </div>
    </div>
  );
};
