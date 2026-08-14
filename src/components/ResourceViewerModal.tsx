import React from 'react';
import { StudyResource } from '../types';

interface ResourceViewerModalProps {
  resource: StudyResource | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (res: StudyResource) => void;
}

export const ResourceViewerModal: React.FC<ResourceViewerModalProps> = ({
  resource,
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-start pb-4 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider bg-[#E8E4DE] text-[#1A1A1A] px-2.5 py-0.5 rounded border border-black/10">
                {resource.subject}
              </span>
              <span className="font-sans text-[11px] text-black/40 italic">
                {resource.type.toUpperCase()} • {resource.sizeOrDuration}
              </span>
            </div>
            <h3 className="font-serif text-[24px] sm:text-[28px] font-normal text-[#1A1A1A] leading-tight">
              {resource.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Viewer Simulation */}
        <div className="my-6">
          {resource.type === 'video' ? (
            <div className="rounded-lg overflow-hidden bg-black aspect-video relative flex flex-col items-center justify-center text-white shadow-surface-2 group">
              <span className="material-symbols-outlined text-[54px] text-white/90 group-hover:scale-110 transition-transform cursor-pointer">
                play_circle
              </span>
              <p className="mt-3 font-serif text-[16px] text-white/90">
                Playing: {resource.title} ({resource.sizeOrDuration})
              </p>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/70 font-sans">
                <span>00:00 / 45:00</span>
                <span className="bg-white/20 px-2 py-0.5 rounded text-white font-mono text-[10px]">1080p 60fps</span>
              </div>
            </div>
          ) : (
            <div className="bg-[#F4F1ED] rounded-lg p-6 border border-black/10 space-y-4 text-[13px] text-black/70">
              <div className="flex items-center justify-between pb-3 border-b border-black/10 font-sans text-black/60">
                <span className="font-bold text-[11px] uppercase tracking-[0.15em]">Manuscript Folio (Folio 1 of 14)</span>
                <span className="font-sans text-[11px] italic">Verified Faculty Archive</span>
              </div>
              <div className="space-y-3 leading-relaxed bg-[#FFFFFF] p-5 rounded-md border border-black/10 shadow-2xs font-sans text-[#1A1A1A]">
                <h4 className="font-serif text-[18px] font-normal text-[#1A1A1A]">{resource.title}</h4>
                <p className="font-sans text-[13px] text-black/65 leading-relaxed">
                  {resource.description || 'Comprehensive notes and textbook summaries prepared for student revision and exam readiness.'}
                </p>
                <div className="p-3.5 bg-[#F4F1ED] rounded-md border border-black/5 text-[12px] space-y-1.5">
                  <p className="font-sans text-[10px] font-bold uppercase tracking-wider text-black/50">Core Scholarly Content:</p>
                  <ul className="list-disc list-inside text-black/70 space-y-1 font-sans">
                    <li>Core mathematical theorems and formal definitions</li>
                    <li>Asymptotic runtime complexity analysis (O, Ω, Θ notation)</li>
                    <li>Step-by-step worked practice problem solutions</li>
                    <li>Common midterm exam pitfalls and memory techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/10">
          <div className="flex items-center gap-2">
            <span className="font-sans text-[11px] text-black/40 uppercase tracking-wider font-semibold">Archivist:</span>
            <span className="font-serif text-[14px] text-[#1A1A1A]">
              {resource.contributors.map((c) => c.name).join(', ')}
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 hover:bg-[#E8E4DE] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={() => onDownload(resource)}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 transition-colors shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Download Manuscript</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
