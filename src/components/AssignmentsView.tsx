import React, { useState } from 'react';
import { Assignment } from '../types';

interface AssignmentsViewProps {
  assignments: Assignment[];
  onOpenSubmitModal: (assignment: Assignment) => void;
  searchQuery: string;
}

export const AssignmentsView: React.FC<AssignmentsViewProps> = ({
  assignments,
  onOpenSubmitModal,
  searchQuery,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');

  const filteredAssignments = assignments.filter((asg) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'pending' && (asg.status === 'due-today' || asg.status === 'due-soon')) ||
      (filter === 'submitted' && asg.status === 'submitted') ||
      (filter === 'graded' && asg.status === 'graded');

    const matchesSearch =
      !searchQuery ||
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.courseName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Assignment['status'], grade?: string) => {
    switch (status) {
      case 'due-today':
        return (
          <span className="bg-[#FFFFFF] text-[#8F2222] border border-[#8F2222]/30 font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
            Due Today
          </span>
        );
      case 'due-soon':
        return (
          <span className="bg-[#E8E4DE] text-black/70 border border-black/15 font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
            Due Soon
          </span>
        );
      case 'submitted':
        return (
          <span className="bg-[#F4F1ED] text-black/60 border border-black/10 font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
            Submitted
          </span>
        );
      case 'graded':
        return (
          <span className="bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
            Grade: {grade || 'Evaluated'}
          </span>
        );
    }
  };

  return (
    <div id="assignments-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Curriculum Assessments
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Academic Term 1
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Coursework & Deadlines
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Track coursework deadlines, problem sets, and faculty evaluations.
          </p>
        </div>

        <span className="border border-[#8F2222]/30 bg-[#FFFFFF] text-[#8F2222] font-sans text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-2.5 rounded-md self-start sm:self-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#8F2222] animate-pulse"></span>
          <span>02 Pending Submissions</span>
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-black/10 pb-3">
        {[
          { id: 'all', label: 'All Tasks' },
          { id: 'pending', label: 'Pending Action' },
          { id: 'submitted', label: 'Submitted' },
          { id: 'graded', label: 'Graded & Reviewed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-md font-sans text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors cursor-pointer ${
              filter === tab.id
                ? 'bg-[#1A1A1A] text-[#F4F1ED]'
                : 'text-black/60 hover:bg-[#E8E4DE] hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 border border-black/10 hover:border-black/30 hover:shadow-surface-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs"
          >
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-sans text-[10px] font-bold uppercase tracking-wider bg-[#E8E4DE] text-[#1A1A1A] px-2.5 py-0.5 rounded border border-black/10">
                  {assignment.course}
                </span>
                <span className="font-sans text-[12px] text-black/50 italic">
                  {assignment.courseName}
                </span>
                {getStatusBadge(assignment.status, assignment.grade)}
              </div>

              <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A] leading-tight">
                {assignment.title}
              </h3>

              <p className="font-sans text-[13px] text-black/60 leading-relaxed">
                {assignment.description}
              </p>

              <div className="flex items-center gap-4 font-sans text-[12px] text-black/50 pt-1">
                <span className="flex items-center gap-1 font-semibold text-[#8F2222]">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  <span>{assignment.dueText}</span>
                </span>
                {assignment.submittedFile && (
                  <span className="flex items-center gap-1 text-black/60 italic">
                    <span className="material-symbols-outlined text-[15px] text-black/40">attach_file</span>
                    <span>{assignment.submittedFile}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              {assignment.status === 'graded' || assignment.status === 'submitted' ? (
                <button
                  onClick={() => onOpenSubmitModal(assignment)}
                  className="bg-[#FFFFFF] border border-black/20 hover:bg-[#E8E4DE] text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.15em] font-semibold px-6 py-3 rounded-md transition-colors cursor-pointer"
                >
                  Review Submission
                </button>
              ) : (
                <button
                  onClick={() => onOpenSubmitModal(assignment)}
                  className="bg-[#1A1A1A] text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-md hover:bg-black/80 transition-all shadow-xs cursor-pointer active:scale-98"
                >
                  Submit Paper
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
