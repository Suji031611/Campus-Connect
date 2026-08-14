import React, { useState } from 'react';
import { CommunityPost, UserProfile } from '../types';

interface CommunityViewProps {
  posts: CommunityPost[];
  user: UserProfile;
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, content: string) => void;
  onOpenNewPostModal: () => void;
  onOpenGuidelines: () => void;
  searchQuery: string;
}

export const CommunityView: React.FC<CommunityViewProps> = ({
  posts,
  user,
  onToggleLike,
  onAddComment,
  onOpenNewPostModal,
  onOpenGuidelines,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post-1': true,
  });
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const categories = [
    'All Topics',
    'Academics',
    'Clubs',
    'Events',
    'Campus Life',
    'Technology',
  ];

  const trendingItems = [
    {
      category: 'Academics',
      title: 'Registration for Fall Semester opens next week: What to expect',
      discussions: '128 discussions',
    },
    {
      category: 'Campus Life',
      title: 'Petition to extend dining hall hours during finals week',
      discussions: '85 discussions',
    },
    {
      category: 'Clubs',
      title: 'Computer Science Society Hackathon team matching',
      discussions: '54 discussions',
    },
    {
      category: 'Events',
      title: 'Guest Speaker: CEO of TechInnovate in the Main Auditorium',
      discussions: '42 discussions',
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All Topics' || post.category === selectedCategory;

    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleSendComment = (postId: string) => {
    const text = replyInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setReplyInputs((prev) => ({ ...prev, [postId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleShare = (post: CommunityPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`CampusConnect discussion: ${post.title}\n${post.content}`);
      alert(`Copied link to discussion: "${post.title}"`);
    }
  };

  return (
    <div id="community-view" className="space-y-8 animate-in fade-in duration-200">
      {/* Editorial Page Header & CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-block px-2.5 py-1 border border-black/15 bg-[#E8E4DE] rounded-full font-sans text-[9px] uppercase tracking-[0.2em] font-semibold text-black/70">
              Student Forum & Discourse
            </span>
            <span className="font-sans text-[11px] text-black/40 italic">
              Campus Dialogue & Inquiries
            </span>
          </div>
          <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[50px] font-normal text-[#1A1A1A] tracking-tight leading-[1.05]">
            Community Forum
          </h2>
          <p className="font-sans text-[13px] uppercase tracking-[0.15em] text-black/50 mt-2 font-medium">
            Connect, discuss, debate, and share knowledge across campus.
          </p>
        </div>

        <button
          id="ask-community-btn"
          onClick={onOpenNewPostModal}
          className="bg-[#1A1A1A] hover:bg-black/80 text-[#F4F1ED] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-3.5 rounded-md flex items-center gap-2 transition-all shadow-xs active:scale-98 whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Publish Inscription</span>
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Feed Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Category Filter Chips */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md font-sans text-[10px] uppercase tracking-[0.15em] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1A1A] text-[#F4F1ED] shadow-2xs'
                    : 'bg-[#FFFFFF] text-black/60 hover:bg-[#E8E4DE] hover:text-black border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Feed */}
          <div className="space-y-5">
            {filteredPosts.map((post) => {
              const isExpanded = expandedComments[post.id];
              return (
                <div
                  key={post.id}
                  className="bg-[#FFFFFF] rounded-xl p-6 sm:p-7 border border-black/10 hover:border-black/30 hover:shadow-surface-1 transition-all duration-200 shadow-2xs"
                >
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-[#E8E4DE] border border-black/10 flex items-center justify-center text-[#1A1A1A] font-sans font-bold text-[12px]">
                        {post.avatarUrl ? (
                          <img
                            src={post.avatarUrl}
                            alt={post.author}
                            className="w-full h-full object-cover grayscale-[10%]"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span>{post.initials || post.author.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-sans text-[13px] font-bold text-[#1A1A1A] leading-tight">
                          {post.author}
                        </h4>
                        <p className="font-sans text-[11px] text-black/40 mt-0.5 italic">
                          {post.timeAgo}
                        </p>
                      </div>
                    </div>

                    <span className="bg-[#E8E4DE] text-[#1A1A1A] border border-black/10 font-sans text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>

                  {/* Post Title & Content */}
                  <h3 className="font-serif text-[22px] font-normal text-[#1A1A1A] mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="font-sans text-[13px] text-black/65 mb-5 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-6 pt-4 border-t border-black/10">
                    <button
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 transition-colors group cursor-pointer font-sans text-[12px] ${
                        post.isLiked ? 'text-[#8F2222] font-bold' : 'text-black/50 hover:text-black'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform"
                        style={{ fontVariationSettings: post.isLiked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        favorite
                      </span>
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => toggleComments(post.id)}
                      className="flex items-center gap-1.5 text-black/50 hover:text-black transition-colors group cursor-pointer font-sans text-[12px]"
                    >
                      <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                        chat_bubble
                      </span>
                      <span>
                        {post.comments.length || post.commentsCount} Comments
                      </span>
                    </button>

                    <button
                      onClick={() => handleShare(post)}
                      className="flex items-center gap-1.5 text-black/50 hover:text-black transition-colors group ml-auto cursor-pointer font-sans text-[12px]"
                    >
                      <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
                        share
                      </span>
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>

                  {/* Expanded Comments Thread */}
                  {isExpanded && (
                    <div className="mt-5 pt-4 border-t border-black/10 space-y-3 bg-[#F4F1ED]/60 p-4 rounded-lg border border-black/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/50">
                          Colloquium Discussion
                        </span>
                        <span className="font-sans text-[11px] text-black/40 italic">
                          {post.comments.length} contributions
                        </span>
                      </div>

                      {post.comments.length === 0 ? (
                        <p className="font-sans text-[12px] text-black/50 italic py-2">
                          No replies recorded yet. Be the first to share an analysis.
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {post.comments.map((comment) => (
                            <div key={comment.id} className="bg-[#FFFFFF] p-3.5 rounded-md border border-black/10 shadow-2xs">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded bg-[#E8E4DE] flex items-center justify-center text-[9px] font-bold text-[#1A1A1A]">
                                    {comment.author.slice(0, 2).toUpperCase()}
                                  </div>
                                  <span className="font-sans text-[12px] font-semibold text-[#1A1A1A]">{comment.author}</span>
                                </div>
                                <span className="font-sans text-[10px] text-black/40 italic">{comment.timeAgo}</span>
                              </div>
                              <p className="font-sans text-[12px] text-black/60 pl-7 leading-relaxed">
                                {comment.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Reply Input */}
                      <div className="flex items-center gap-2 pt-2">
                        <input
                          type="text"
                          value={replyInputs[post.id] || ''}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSendComment(post.id);
                          }}
                          placeholder="Write a formal reply..."
                          className="flex-1 bg-[#FFFFFF] border border-black/15 rounded-md px-3.5 py-2 font-sans text-[12px] text-[#1A1A1A] focus:outline-none focus:border-black"
                        />
                        <button
                          onClick={() => handleSendComment(post.id)}
                          className="bg-[#1A1A1A] text-[#F4F1ED] px-4 py-2 rounded-md font-sans text-[10px] uppercase tracking-[0.15em] font-semibold hover:bg-black/80 transition-colors cursor-pointer shrink-0"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Load More Button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={() => alert('All campus discussions for this semester are loaded.')}
              className="text-[#1A1A1A] font-sans text-[11px] uppercase tracking-[0.15em] font-semibold hover:underline px-6 py-2.5 rounded-md hover:bg-[#E8E4DE] transition-colors cursor-pointer border border-black/10"
            >
              Examine Past Discussions
            </button>
          </div>
        </div>

        {/* Trending & Guidelines Sidebar */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6 shrink-0">
          {/* Trending Box */}
          <div className="bg-[#FFFFFF] rounded-xl p-6 border border-black/10 shadow-2xs">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-black/10">
              <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">
                trending_up
              </span>
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] font-bold text-black/40 block">
                  Campus Curated
                </span>
                <h3 className="font-serif text-[18px] font-normal text-[#1A1A1A]">Trending Topics</h3>
              </div>
            </div>

            <div className="space-y-4">
              {trendingItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCategory(item.category)}
                  className="group cursor-pointer pb-3 border-b border-black/5 last:border-0 last:pb-0"
                >
                  <p className="font-sans text-[9px] font-bold uppercase tracking-wider text-black/40 mb-1">
                    {item.category}
                  </p>
                  <h4 className="font-serif text-[14px] text-[#1A1A1A] group-hover:italic transition-all line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[11px] text-black/40 mt-1 italic">
                    {item.discussions}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Community Guidelines Box */}
          <div className="bg-[#E8E4DE]/60 rounded-xl p-6 border border-black/10 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-black/60 text-[20px]">
                info
              </span>
              <h3 className="font-serif text-[17px] font-normal text-[#1A1A1A]">Campus Standards</h3>
            </div>
            <p className="font-sans text-[12px] text-black/60 mb-4 leading-relaxed">
              Be respectful, maintain scholarly rigor, and help foster an intellectually vibrant university community.
            </p>
            <button
              onClick={onOpenGuidelines}
              className="font-sans text-[10px] uppercase tracking-[0.15em] font-bold text-[#1A1A1A] hover:underline cursor-pointer"
            >
              Review Code of Conduct →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
