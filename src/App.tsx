/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  INITIAL_USER,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_ASSIGNMENTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_STUDY_RESOURCES,
  INITIAL_EVENTS,
  INITIAL_COMMUNITY_POSTS,
} from './data/mockData';
import {
  NavTab,
  UserProfile,
  StudyResource,
  CampusEvent,
  Assignment,
  CommunityPost,
  Announcement,
  QuickNote,
} from './types';

// Components
import { SideNavBar } from './components/SideNavBar';
import { TopAppBar } from './components/TopAppBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DashboardView } from './components/DashboardView';
import { StudyHubView } from './components/StudyHubView';
import { EventsView } from './components/EventsView';
import { CommunityView } from './components/CommunityView';
import { TimetableView } from './components/TimetableView';
import { AssignmentsView } from './components/AssignmentsView';
import { CampusServicesView } from './components/CampusServicesView';

// Modals
import { NewNoteModal } from './components/NewNoteModal';
import { AssignmentSubmitModal } from './components/AssignmentSubmitModal';
import { ResourceViewerModal } from './components/ResourceViewerModal';
import { EventDetailModal } from './components/EventDetailModal';
import { NewPostModal } from './components/NewPostModal';
import { UploadResourceModal } from './components/UploadResourceModal';
import { AnnouncementModal } from './components/AnnouncementModal';
import { SettingsModal } from './components/SettingsModal';
import { SupportModal } from './components/SupportModal';

export default function App() {
  // Navigation & User State
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [searchQuery, setSearchQuery] = useState('');

  // Core Data Collections
  const [timelineEvents] = useState(INITIAL_TIMELINE_EVENTS);
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [announcements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [resources, setResources] = useState<StudyResource[]>(INITIAL_STUDY_RESOURCES);
  const [events, setEvents] = useState<CampusEvent[]>(INITIAL_EVENTS);
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [quickNotes, setQuickNotes] = useState<QuickNote[]>([]);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal Control States
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [activeSubmitAssignment, setActiveSubmitAssignment] = useState<Assignment | null>(null);
  const [activeResource, setActiveResource] = useState<StudyResource | null>(null);
  const [activeEventModal, setActiveEventModal] = useState<CampusEvent | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [isUploadResourceOpen, setIsUploadResourceOpen] = useState(false);
  const [activeAnnouncement, setActiveAnnouncement] = useState<Announcement | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Handlers for interactive actions
  const handleToggleEventRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const newState = !evt.isRegistered;
          showToast(
            newState
              ? `✓ You registered for ${evt.title}`
              : `Registration cancelled for ${evt.title}`
          );
          return { ...evt, isRegistered: newState };
        }
        return evt;
      })
    );
  };

  const handleToggleEventBookmark = (eventId: string) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const newState = !evt.isBookmarked;
          showToast(
            newState ? `Saved ${evt.title} to bookmarks` : `Removed from bookmarks`
          );
          return { ...evt, isBookmarked: newState };
        }
        return evt;
      })
    );
  };

  const handleToggleResourceBookmark = (resourceId: string) => {
    setResources((prev) =>
      prev.map((res) => {
        if (res.id === resourceId) {
          const newState = !res.isBookmarked;
          showToast(
            newState ? `Bookmarked "${res.title}"` : `Removed from saved resources`
          );
          return { ...res, isBookmarked: newState };
        }
        return res;
      })
    );
  };

  const handleToggleLikePost = (postId: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId: string, content: string) => {
    setCommunityPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            author: user.name,
            content,
            timeAgo: 'Just now',
          };
          return {
            ...post,
            comments: [...post.comments, newComment],
            commentsCount: post.comments.length + 1,
          };
        }
        return post;
      })
    );
    showToast('Reply published to discussion.');
  };

  const handleCreatePost = (newPostData: Omit<CommunityPost, 'id' | 'likes' | 'comments' | 'commentsCount' | 'isLiked' | 'timeAgo'>) => {
    const created: CommunityPost = {
      ...newPostData,
      id: `post-${Date.now()}`,
      timeAgo: 'Just now',
      likes: 0,
      comments: [],
      commentsCount: 0,
      isLiked: false,
    };
    setCommunityPosts((prev) => [created, ...prev]);
    showToast('Question published to Campus Community!');
  };

  const handleSaveQuickNote = (noteData: Omit<QuickNote, 'id' | 'createdAt'>) => {
    const note: QuickNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: 'Just now',
    };
    setQuickNotes((prev) => [note, ...prev]);
    showToast(`Quick note saved: "${note.title}"`);
  };

  const handleSubmitAssignmentSuccess = (assignmentId: string, fileName: string) => {
    setAssignments((prev) =>
      prev.map((asg) => {
        if (asg.id === assignmentId) {
          return {
            ...asg,
            status: 'submitted' as const,
            submittedFile: fileName,
          };
        }
        return asg;
      })
    );
    showToast(`Assignment successfully submitted!`);
  };

  const handleUploadResource = (resourceData: Omit<StudyResource, 'id' | 'addedDate' | 'isBookmarked'>) => {
    const newRes: StudyResource = {
      ...resourceData,
      id: `res-${Date.now()}`,
      addedDate: 'Today',
      isBookmarked: false,
    };
    setResources((prev) => [newRes, ...prev]);
    showToast(`Shared "${newRes.title}" with campus.`);
  };

  const handleDownloadResource = (resource: StudyResource) => {
    showToast(`Downloading: ${resource.title} (${resource.sizeOrDuration})`);
  };

  const recommendedEvent = events.find((e) => e.id === 'evt-3') || events[0];
  const unreadAssignmentsCount = assignments.filter((a) => a.status === 'due-today' || a.status === 'due-soon').length;

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col antialiased">
      {/* Desktop Side Navigation */}
      <SideNavBar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'settings') {
            setIsSettingsOpen(true);
          } else if (tab === 'support') {
            setIsSupportOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        unreadAssignmentsCount={unreadAssignmentsCount}
      />

      {/* Top Application Bar */}
      <TopAppBar
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        announcements={announcements}
        onNavigate={setCurrentTab}
        onOpenNewNote={() => setIsNewNoteOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 md:ml-[280px] pt-20 pb-24 md:pb-12 px-4 sm:px-6 md:px-8 max-w-7xl">
        {currentTab === 'dashboard' && (
          <DashboardView
            user={user}
            timelineEvents={timelineEvents}
            assignments={assignments}
            announcements={announcements}
            recommendedEvent={recommendedEvent}
            onOpenNewNote={() => setIsNewNoteOpen(true)}
            onOpenSubmitModal={(asg) => setActiveSubmitAssignment(asg)}
            onToggleEventRsvp={handleToggleEventRsvp}
            onNavigate={setCurrentTab}
            onOpenAnnouncement={(ann) => setActiveAnnouncement(ann)}
            onFocusSearch={() => {
              const input = document.getElementById('global-search-input');
              input?.focus();
            }}
          />
        )}

        {currentTab === 'study-hub' && (
          <StudyHubView
            resources={resources}
            onOpenResource={(res) => setActiveResource(res)}
            onToggleBookmark={handleToggleResourceBookmark}
            onOpenUploadModal={() => setIsUploadResourceOpen(true)}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'events' && (
          <EventsView
            events={events}
            onToggleRegister={handleToggleEventRsvp}
            onToggleBookmark={handleToggleEventBookmark}
            onOpenEventDetails={(evt) => setActiveEventModal(evt)}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'community' && (
          <CommunityView
            posts={communityPosts}
            user={user}
            onToggleLike={handleToggleLikePost}
            onAddComment={handleAddComment}
            onOpenNewPostModal={() => setIsNewPostOpen(true)}
            onOpenGuidelines={() => showToast('Campus Guidelines: Maintain respectful and positive student discourse.')}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'timetable' && <TimetableView />}

        {currentTab === 'assignments' && (
          <AssignmentsView
            assignments={assignments}
            onOpenSubmitModal={(asg) => setActiveSubmitAssignment(asg)}
            searchQuery={searchQuery}
          />
        )}

        {currentTab === 'campus-services' && <CampusServicesView />}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        assignmentsCount={unreadAssignmentsCount}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#1A1A1A] text-[#F4F1ED] px-5 py-3 rounded-lg shadow-modal border border-black/20 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 font-sans text-[13px]">
          <span className="material-symbols-outlined text-[#E8E4DE] text-[18px]">info</span>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <NewNoteModal
        isOpen={isNewNoteOpen}
        onClose={() => setIsNewNoteOpen(false)}
        onSaveNote={handleSaveQuickNote}
      />

      <AssignmentSubmitModal
        assignment={activeSubmitAssignment}
        isOpen={!!activeSubmitAssignment}
        onClose={() => setActiveSubmitAssignment(null)}
        onSubmitSuccess={handleSubmitAssignmentSuccess}
      />

      <ResourceViewerModal
        resource={activeResource}
        isOpen={!!activeResource}
        onClose={() => setActiveResource(null)}
        onDownload={handleDownloadResource}
      />

      <EventDetailModal
        event={activeEventModal}
        isOpen={!!activeEventModal}
        onClose={() => setActiveEventModal(null)}
        onToggleRegister={handleToggleEventRsvp}
      />

      <NewPostModal
        isOpen={isNewPostOpen}
        onClose={() => setIsNewPostOpen(false)}
        onAddPost={handleCreatePost}
      />

      <UploadResourceModal
        isOpen={isUploadResourceOpen}
        onClose={() => setIsUploadResourceOpen(false)}
        onUpload={handleUploadResource}
      />

      <AnnouncementModal
        announcement={activeAnnouncement}
        isOpen={!!activeAnnouncement}
        onClose={() => setActiveAnnouncement(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        user={user}
        onUpdateUser={(updated) => {
          setUser((prev) => ({ ...prev, ...updated }));
          showToast('Profile and preferences updated.');
        }}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
      />
    </div>
  );
}
