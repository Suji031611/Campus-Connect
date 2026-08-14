import React, { useState } from 'react';
import { INITIAL_SERVICES } from '../data/mockData';

export const CampusServicesView: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleAction = (serviceId: string) => {
    setActiveModal(serviceId);
  };

  return (
    <div id="campus-services-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Campus Amenities & Operations
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Student Auxiliary Services
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Campus Facilities
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Dining menus, study pod bookings, live transit shuttles, and IT helpdesk.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {INITIAL_SERVICES.map((srv) => (
          <div
            key={srv.id}
            className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 border border-black/10 hover:border-black/30 hover:shadow-surface-1 transition-all flex flex-col justify-between shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-md bg-[#E8E4DE] text-[#1A1A1A] border border-black/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">{srv.icon}</span>
                </div>
                <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] bg-[#F4F1ED] border border-black/10 text-black/70 px-2.5 py-1 rounded">
                  {srv.category}
                </span>
              </div>

              <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A] mb-2 leading-tight">
                {srv.title}
              </h3>

              <p className="font-sans text-[13px] text-black/60 mb-5 leading-relaxed">
                {srv.description}
              </p>

              <div className="flex items-center gap-2 font-sans text-[11px] font-semibold text-black/70 mb-6 bg-[#E8E4DE]/50 border border-black/10 p-3 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-black/60">verified</span>
                <span>{srv.statusText}</span>
              </div>
            </div>

            <button
              onClick={() => handleAction(srv.id)}
              className="w-full bg-[#1A1A1A] hover:bg-black/80 text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold py-3.5 rounded-md transition-all cursor-pointer text-center active:scale-98 shadow-xs"
            >
              {srv.actionLabel}
            </button>
          </div>
        ))}
      </div>

      {/* Modal for Service Interaction */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-0.5">
                  Auxiliary Request
                </span>
                <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A]">Campus Service Portal</h3>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4 font-sans text-[13px] text-black/70 leading-relaxed">
              <p className="font-medium text-[#1A1A1A]">
                Request confirmed and processed for student record.
              </p>
              <div className="bg-[#E8E4DE]/60 border border-black/10 p-4 rounded-lg space-y-2.5 text-[12px]">
                <div className="flex justify-between">
                  <span className="text-black/50 font-medium">Session Status:</span>
                  <span className="font-bold text-[#1A1A1A]">Active & Connected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50 font-medium">Matriculation ID:</span>
                  <span className="font-bold text-[#1A1A1A]">CS2026-8942</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50 font-medium">Data Gateway:</span>
                  <span className="font-bold text-[#1A1A1A]">Campus Academic Cloud</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full mt-6 bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold py-3.5 rounded-md hover:bg-black/80 transition-colors cursor-pointer"
            >
              Dismiss Notice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
