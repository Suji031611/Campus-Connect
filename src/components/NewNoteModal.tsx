import React, { useState } from 'react';
import { QuickNote } from '../types';

interface NewNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveNote: (note: Omit<QuickNote, 'id' | 'createdAt'>) => void;
}

export const NewNoteModal: React.FC<NewNoteModalProps> = ({
  isOpen,
  onClose,
  onSaveNote,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [courseTag, setCourseTag] = useState('CS301');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    onSaveNote({
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      courseTag,
    });
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-1">
              Scholarly Scratchpad
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Create Marginalia Note</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Subject Tag
            </label>
            <select
              value={courseTag}
              onChange={(e) => setCourseTag(e.target.value)}
              className="w-full bg-[#F4F1ED] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="CS301">CS301 • Algorithm Design</option>
              <option value="MATH202">MATH202 • Linear Algebra</option>
              <option value="PHYS105">PHYS105 • General Physics</option>
              <option value="ENG205">ENG205 • Tech Writing</option>
              <option value="General">General Campus Life</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Note Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dynamic Programming Recurrence formulas"
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Expository Notes & Formulas
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write thoughts, key formulas, reminders..."
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
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
              Record Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
