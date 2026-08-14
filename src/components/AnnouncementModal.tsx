import React from 'react';
import { Announcement } from '../types';

interface AnnouncementModalProps {
  announcement: Announcement | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementModal: React.FC<AnnouncementModalProps> = ({
  announcement,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !announcement) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-start pb-4 mb-4 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded border border-black/10 bg-[#E8E4DE] text-[#1A1A1A]">
              {announcement.tag}
            </span>
            <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A] mt-2 leading-snug">
              {announcement.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 font-sans text-[11px] text-black/40 italic">
            <span className="material-symbols-outlined text-[15px]">calendar_today</span>
            <span>Promulgated: {announcement.date}</span>
          </div>

          <div className="bg-[#F4F1ED] p-4 rounded-lg border border-black/10">
            <p className="font-sans text-[13px] text-[#1A1A1A] leading-relaxed">
              {announcement.summary}
            </p>
          </div>

          <p className="font-sans text-[12px] text-black/60 leading-relaxed italic">
            Please consult the Department of Student Affairs (Founders Hall, Room 102) for inquiries or accommodations.
          </p>
        </div>

        <div className="flex justify-end pt-4 mt-4 border-t border-black/10">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 transition-colors shadow-xs cursor-pointer"
          >
            Acknowledged
          </button>
        </div>
      </div>
    </div>
  );
};
