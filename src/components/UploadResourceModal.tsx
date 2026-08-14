import React, { useState } from 'react';
import { StudyResource } from '../types';

interface UploadResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (resource: Omit<StudyResource, 'id' | 'addedDate' | 'isBookmarked'>) => void;
}

export const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('CS301');
  const [subjectCategory, setSubjectCategory] = useState('Computer Science');
  const [type, setType] = useState<'pdf' | 'video' | 'doc'>('pdf');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onUpload({
      title: title.trim(),
      subject,
      subjectCategory,
      type,
      sizeOrDuration: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
      description: description.trim() || 'Uploaded study materials and notes for peer revision.',
      contributors: [{ name: 'Srujana K.' }],
    });

    setTitle('');
    setDescription('');
    setSelectedFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-1">
              Scholarly Repository
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Contribute Academic Resource</h3>
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
              Resource Folio Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Graph Algorithms & Shortest Path Cheat Sheet"
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
                Discipline Area
              </label>
              <select
                value={subjectCategory}
                onChange={(e) => setSubjectCategory(e.target.value)}
                className="w-full bg-[#F4F1ED] border border-black/15 rounded-md px-3 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            <div>
              <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
                Folio Medium
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full bg-[#F4F1ED] border border-black/15 rounded-md px-3 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
              >
                <option value="pdf">PDF Document</option>
                <option value="video">Lecture Video</option>
                <option value="doc">Document / Notes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Abstract & Overview
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Highlight topics covered, key formulas, or practice questions included..."
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
          </div>

          {/* Drag & drop simulated box */}
          <div className="border border-dashed border-black/25 rounded-lg p-5 text-center bg-[#F4F1ED]">
            <input
              type="file"
              id="resource-file-upload"
              onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
              className="hidden"
            />
            <label htmlFor="resource-file-upload" className="cursor-pointer block">
              <span className="material-symbols-outlined text-[24px] text-black/60">cloud_upload</span>
              <p className="font-sans text-[12px] font-semibold text-[#1A1A1A] mt-1">
                {selectedFile ? selectedFile.name : 'Select file or drag & drop (PDF, MP4, DOCX)'}
              </p>
              <p className="font-sans text-[10px] text-black/40 italic mt-0.5">Maximum archive limit: 25 MB</p>
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
              Submit to Repository
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
