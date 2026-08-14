import React, { useState } from 'react';
import { StudyResource } from '../types';

interface StudyHubViewProps {
  resources: StudyResource[];
  onOpenResource: (resource: StudyResource) => void;
  onToggleBookmark: (resourceId: string) => void;
  onOpenUploadModal: () => void;
  searchQuery: string;
}

export const StudyHubView: React.FC<StudyHubViewProps> = ({
  resources,
  onOpenResource,
  onToggleBookmark,
  onOpenUploadModal,
  searchQuery,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('All Semesters');
  const [showSemesterDropdown, setShowSemesterDropdown] = useState(false);

  const recentlyViewed = resources.filter((r) => r.viewedAgo);
  
  const filteredResources = resources.filter((res) => {
    const matchesSubject =
      selectedSubject === 'all' ||
      res.subjectCategory.toLowerCase() === selectedSubject.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'video':
        return 'play_circle';
      case 'doc':
      default:
        return 'description';
    }
  };

  return (
    <div id="study-hub-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Academic Library & Archive
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Peer-Reviewed Repository
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Study Hub
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Course compendiums, syllabi, research papers & lecture recordings.
          </p>
        </div>

        <button
          id="upload-resource-btn"
          onClick={onOpenUploadModal}
          className="bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-md hover:bg-black/80 transition-all shadow-xs flex items-center gap-2.5 active:scale-98 cursor-pointer self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">upload</span>
          <span>Deposit Material</span>
        </button>
      </div>

      {/* Filter Tabs & Discipline Selection */}
      <div className="flex items-center gap-2.5 overflow-x-auto hide-scrollbar pb-1 relative">
        <button
          onClick={() => setSelectedSubject('all')}
          className={`px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
            selectedSubject === 'all'
              ? 'bg-[#1A1A1A] text-[#F4F1ED] font-bold shadow-2xs'
              : 'bg-[#FFFFFF] text-black/70 hover:bg-[#E8E4DE] border border-black/10'
          }`}
        >
          <span>All Disciplines</span>
        </button>

        <button
          onClick={() => setSelectedSubject('Computer Science')}
          className={`px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all cursor-pointer ${
            selectedSubject === 'Computer Science'
              ? 'bg-[#1A1A1A] text-[#F4F1ED] font-bold shadow-2xs'
              : 'bg-[#FFFFFF] text-black/70 hover:bg-[#E8E4DE] border border-black/10'
          }`}
        >
          Computer Science
        </button>

        <button
          onClick={() => setSelectedSubject('Mathematics')}
          className={`px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all cursor-pointer ${
            selectedSubject === 'Mathematics'
              ? 'bg-[#1A1A1A] text-[#F4F1ED] font-bold shadow-2xs'
              : 'bg-[#FFFFFF] text-black/70 hover:bg-[#E8E4DE] border border-black/10'
          }`}
        >
          Mathematics
        </button>

        <button
          onClick={() => setSelectedSubject('Physics')}
          className={`px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap transition-all cursor-pointer ${
            selectedSubject === 'Physics'
              ? 'bg-[#1A1A1A] text-[#F4F1ED] font-bold shadow-2xs'
              : 'bg-[#FFFFFF] text-black/70 hover:bg-[#E8E4DE] border border-black/10'
          }`}
        >
          Physics
        </button>

        <div className="w-px h-6 bg-black/10 mx-1 shrink-0"></div>

        <div className="relative shrink-0">
          <button
            onClick={() => setShowSemesterDropdown(!showSemesterDropdown)}
            className="bg-[#FFFFFF] text-black/70 px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] whitespace-nowrap hover:bg-[#E8E4DE] transition-colors border border-black/10 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{selectedSemester}</span>
            <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
          </button>

          {showSemesterDropdown && (
            <div className="absolute left-0 mt-2 w-48 bg-[#FFFFFF] rounded-lg shadow-modal border border-black/10 py-1.5 z-30">
              {['All Semesters', 'Semester 1', 'Semester 2', 'Semester 5', 'Semester 6'].map((sem) => (
                <button
                  key={sem}
                  onClick={() => {
                    setSelectedSemester(sem);
                    setShowSemesterDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 font-sans text-[11px] uppercase tracking-wider hover:bg-[#F4F1ED] transition-colors ${
                    selectedSemester === sem ? 'font-bold text-[#1A1A1A] bg-[#E8E4DE]/50' : 'text-black/70'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recently Consulted Material (Horizontal Carousel) */}
      <div>
        <div className="flex justify-between items-baseline mb-4 pb-2 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-0.5">
              Reading History
            </span>
            <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A]">Recently Consulted</h3>
          </div>
          <span className="font-sans text-[11px] uppercase tracking-[0.15em] font-semibold text-black/60 cursor-pointer hover:underline">
            Complete History →
          </span>
        </div>

        <div className="flex gap-5 overflow-x-auto hide-scrollbar pb-3 snap-x">
          {recentlyViewed.map((res) => (
            <div
              key={res.id}
              onClick={() => onOpenResource(res)}
              className="min-w-[290px] w-[290px] bg-[#FFFFFF] p-5 rounded-xl border border-black/10 shadow-2xs snap-start group hover:border-black/30 hover:shadow-surface-1 transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-md bg-[#E8E4DE] text-[#1A1A1A] border border-black/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">
                      {getIconForType(res.type)}
                    </span>
                  </div>
                  <span className="bg-[#F4F1ED] border border-black/10 px-2.5 py-0.5 rounded font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-black/60">
                    {res.subject}
                  </span>
                </div>

                <h4 className="font-serif text-[17px] font-medium text-[#1A1A1A] line-clamp-2 mb-2 group-hover:italic transition-all leading-snug">
                  {res.title}
                </h4>
              </div>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-black/5">
                <span className="font-sans text-[10px] text-black/40 italic">
                  {res.viewedAgo}
                </span>
                <span className="font-sans text-[10px] uppercase tracking-widest text-black/50 group-hover:text-black transition-colors">
                  Open →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended & Index Resources Grid */}
      <div>
        <div className="flex items-baseline justify-between mb-5 pb-3 border-b border-black/10">
          <div>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block mb-0.5">
              Archive Index
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Curated Academic Resources</h3>
          </div>
          <span className="font-sans text-[11px] uppercase tracking-[0.15em] text-black/45 font-medium">
            {filteredResources.length} items catalogued
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#FFFFFF] rounded-xl border border-black/10 p-6 flex flex-col justify-between shadow-2xs relative overflow-hidden group hover:border-black/30 hover:shadow-surface-1 transition-all"
            >
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-3 items-center">
                    <div className="w-11 h-11 rounded-md bg-[#E8E4DE] text-[#1A1A1A] border border-black/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">
                        {getIconForType(res.type)}
                      </span>
                    </div>
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded font-sans text-[9px] font-bold uppercase tracking-[0.15em] bg-[#F4F1ED] border border-black/10 text-black/70 mb-1">
                        {res.subjectCategory}
                      </span>
                      <p className="font-sans text-[11px] text-black/40 italic">
                        {res.addedDate} • {res.sizeOrDuration}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(res.id);
                    }}
                    className="p-1.5 text-black/40 hover:text-black transition-colors cursor-pointer rounded hover:bg-[#F4F1ED]"
                    aria-label="Bookmark"
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        res.isBookmarked ? 'text-[#1A1A1A]' : 'text-black/30'
                      }`}
                      style={{ fontVariationSettings: res.isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Title */}
                <h4
                  onClick={() => onOpenResource(res)}
                  className="font-serif text-[19px] font-normal text-[#1A1A1A] mb-2 group-hover:italic transition-all leading-snug cursor-pointer"
                >
                  {res.title}
                </h4>

                <p className="font-sans text-[13px] text-black/60 line-clamp-2 mb-5 leading-relaxed">
                  {res.description}
                </p>
              </div>

              {/* Footer with Contributors and Actions */}
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#E8E4DE] border border-black/15 flex items-center justify-center font-sans text-[9px] font-bold text-[#1A1A1A]">
                    {res.contributors[0]?.name?.slice(0, 2) || 'CS'}
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-black/50">
                    {res.contributors[0]?.name || 'Faculty'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {res.type === 'video' ? (
                    <button
                      onClick={() => onOpenResource(res)}
                      className="px-4 py-2 rounded-md bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[10px] uppercase tracking-[0.15em] font-semibold flex items-center gap-1.5 hover:bg-black/80 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                      <span>Screen</span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => onOpenResource(res)}
                        className="px-3 py-1.5 rounded-md border border-black/15 hover:bg-[#F4F1ED] font-sans text-[10px] uppercase tracking-wider font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                        title="Read"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onOpenResource(res)}
                        className="w-8 h-8 rounded-md bg-[#1A1A1A] text-[#F4F1ED] flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
                        title="Download"
                      >
                        <span className="material-symbols-outlined text-[16px]">download</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
