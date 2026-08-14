import React, { useState } from 'react';
import { Assignment } from '../types';

interface AssignmentSubmitModalProps {
  assignment: Assignment | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (assignmentId: string, fileName: string) => void;
}

export const AssignmentSubmitModal: React.FC<AssignmentSubmitModalProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  if (!isOpen || !assignment) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsDone(true);
      const fname = selectedFile ? selectedFile.name : `${assignment.course.toLowerCase()}_solution_submission.pdf`;
      onSubmitSuccess(assignment.id, fname);
      setTimeout(() => {
        setIsDone(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-modal border border-black/15 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex justify-between items-baseline pb-4 mb-4 border-b border-black/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-sans text-[9px] font-bold uppercase tracking-wider bg-[#E8E4DE] text-[#1A1A1A] px-2 py-0.5 rounded border border-black/10">
                {assignment.course}
              </span>
              <span className="font-sans text-[11px] text-black/40 italic">Academic Assessment</span>
            </div>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">
              Submit Assignment
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-md hover:bg-[#F4F1ED] flex items-center justify-center text-black/40 hover:text-black cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {isDone ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-[#1A1A1A] text-[#F4F1ED] rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <span className="material-symbols-outlined text-[28px]">check</span>
            </div>
            <h4 className="font-serif text-[22px] font-normal text-[#1A1A1A]">Assessment Submitted</h4>
            <p className="font-sans text-[12px] text-black/60">
              Your submission timestamp and digital signature have been recorded in the faculty ledger.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h4 className="font-serif text-[17px] font-medium text-[#1A1A1A] mb-1">
                {assignment.title}
              </h4>
              <p className="font-sans text-[12px] text-black/60 leading-relaxed">
                {assignment.description}
              </p>
            </div>

            <div className="bg-[#F4F1ED] border border-black/10 p-3 rounded-md font-sans text-[12px] flex items-center justify-between">
              <span className="text-black/60 font-medium">Due Deadline:</span>
              <span className="font-bold text-[#8F2222]">{assignment.dueText}</span>
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-2">
                Manuscript File (.pdf, .zip, .docx)
              </label>
              <div className="border-2 border-dashed border-black/20 rounded-lg p-6 text-center hover:border-black transition-colors bg-[#F4F1ED]/40">
                <input
                  type="file"
                  id="assignment-file-input"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="assignment-file-input" className="cursor-pointer block space-y-2">
                  <div className="w-9 h-9 rounded-md bg-[#E8E4DE] text-[#1A1A1A] border border-black/10 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[20px]">upload_file</span>
                  </div>
                  <p className="font-sans text-[13px] font-medium text-[#1A1A1A]">
                    {selectedFile ? selectedFile.name : 'Select or drop academic file'}
                  </p>
                  <p className="font-sans text-[11px] text-black/40 italic">Maximum payload: 25MB</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
                Instructor Remarks (Optional)
              </label>
              <textarea
                rows={2}
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="Include any compilation flags or explanatory notes..."
                className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3 py-2 font-sans text-[12px] text-[#1A1A1A] focus:outline-none focus:border-black"
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
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-md font-sans text-[11px] uppercase tracking-[0.2em] font-semibold bg-[#1A1A1A] text-[#F4F1ED] hover:bg-black/80 transition-colors shadow-xs cursor-pointer flex items-center gap-2"
              >
                {isSubmitting && <span className="material-symbols-outlined animate-spin text-[14px]">progress_activity</span>}
                <span>{isSubmitting ? 'Uploading...' : 'Confirm Submission'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
