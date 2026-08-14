import React, { useState } from 'react';
import { UserProfile } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [showIdCard, setShowIdCard] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ name, firstName: name.split(' ')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-1">
              Account Preferences
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Scholar Profile & Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Digital Student ID preview toggle */}
          <div className="bg-[#F4F1ED] p-4 rounded-lg border border-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#1A1A1A] text-[22px]">badge</span>
              <div>
                <h4 className="font-serif text-[15px] font-normal text-[#1A1A1A]">Academic Credential Pass</h4>
                <p className="font-sans text-[11px] text-black/50 italic">Digital archive & laboratory NFC authorized</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowIdCard(!showIdCard)}
              className="font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A] hover:underline cursor-pointer"
            >
              {showIdCard ? 'Collapse ID' : 'Examine Pass'}
            </button>
          </div>

          {showIdCard && (
            <div className="bg-[#1A1A1A] text-[#F4F1ED] p-6 rounded-lg shadow-surface-2 border border-black/20 animate-in fade-in duration-200">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-sans text-[9px] font-bold uppercase tracking-[0.25em] text-[#E8E4DE]/60 block">
                    CampusConnect Scholar Credential
                  </span>
                  <h4 className="font-serif text-[22px] font-normal mt-1 text-[#F4F1ED]">{user.name}</h4>
                  <p className="font-sans text-[12px] text-[#F4F1ED]/70 italic mt-0.5">{user.major} • {user.year}</p>
                </div>
                <div className="w-12 h-12 rounded overflow-hidden border border-white/20">
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover grayscale" />
                </div>
              </div>
              <div className="flex justify-between items-end text-xs font-mono pt-4 border-t border-white/10">
                <div>
                  <p className="text-[#F4F1ED]/40 text-[9px] uppercase tracking-wider">MATRICULATION ID</p>
                  <p className="font-bold text-sm text-[#F4F1ED]">{user.studentId}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#F4F1ED]/40 text-[9px] uppercase tracking-wider">VALIDITY</p>
                  <p className="font-bold text-sm text-[#F4F1ED]">06/2028</p>
                </div>
              </div>
            </div>
          )}

          {/* Profile form */}
          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Legal / Campus Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              University Email Address
            </label>
            <input
              type="email"
              disabled
              value={user.email}
              className="w-full bg-[#F4F1ED] border border-black/10 rounded-md px-3.5 py-2 font-sans text-[13px] text-black/40 cursor-not-allowed"
            />
          </div>

          {/* Notification toggles */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif text-[15px] font-normal text-[#1A1A1A]">Discourse & Bulletin Dispatches</h4>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="font-sans text-[12px] text-black/70">Academic Deadline Reminders & Due Dates</span>
              <input
                type="checkbox"
                checked={pushAlerts}
                onChange={(e) => setPushAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-black"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer py-1">
              <span className="font-sans text-[12px] text-black/70">Campus Administration & Emergency Bulletins</span>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded accent-black"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 hover:bg-[#E8E4DE] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 transition-colors shadow-xs cursor-pointer"
            >
              Update Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
