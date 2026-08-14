import React, { useState } from 'react';
import { CommunityPost } from '../types';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPost: (post: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'commentsCount' | 'isLiked' | 'timeAgo'>) => void;
}

export const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onAddPost,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Academics');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onAddPost({
      title: title.trim(),
      content: content.trim(),
      category,
      author: 'Srujana K.',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
              Public Inquiry
            </span>
            <h3 className="font-serif text-[24px] font-normal text-[#1A1A1A]">Publish Forum Inscription</h3>
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
              Topic Discipline
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full bg-[#F4F1ED] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black cursor-pointer"
            >
              <option value="Academics">Academics</option>
              <option value="Clubs">Clubs</option>
              <option value="Events">Events</option>
              <option value="Campus Life">Campus Life</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Inquiry / Discussion Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Best study spots during exam week with power outlets?"
              className="w-full bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[13px] text-[#1A1A1A] focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block font-sans text-[9px] font-bold text-black/40 uppercase tracking-[0.2em] mb-1.5">
              Colloquium Body & Inquiries
            </label>
            <textarea
              rows={4}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Provide background, questions, or specific scholarly requirements..."
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
              Publish Inscription
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
