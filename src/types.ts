export type NavTab = 
  | 'dashboard'
  | 'study-hub'
  | 'timetable'
  | 'assignments'
  | 'events'
  | 'community'
  | 'campus-services'
  | 'settings'
  | 'support';

export interface UserProfile {
  name: string;
  firstName: string;
  email: string;
  studentId: string;
  major: string;
  semester: string;
  avatarUrl: string;
  attendanceRate: number;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'class' | 'deadline' | 'break' | 'workshop' | 'event';
  status: 'past' | 'current' | 'upcoming';
  deadlineBadge?: string;
  courseCode?: string;
  instructor?: string;
  actionText?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  courseName: string;
  dueText: string;
  dueDate: string;
  status: 'due-today' | 'due-soon' | 'submitted' | 'graded';
  grade?: string;
  description: string;
  submissionRequirements?: string;
  submittedFile?: string;
  submittedAt?: string;
}

export interface Announcement {
  id: string;
  tag: string;
  tagColor: 'primary' | 'tertiary' | 'secondary' | 'error';
  title: string;
  summary: string;
  fullContent?: string;
  date: string;
  author: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Workshops' | 'Hackathons' | 'Cultural' | 'Sports';
  categoryLabel: string;
  dateRange: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  imageUrl: string;
  isRegistered: boolean;
  isBookmarked: boolean;
  isFeatured?: boolean;
  badge?: string;
  capacity?: number;
  registeredCount?: number;
}

export interface Comment {
  id: string;
  author: string;
  avatarUrl?: string;
  initials?: string;
  timeAgo: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  author: string;
  avatarUrl?: string;
  initials?: string;
  timeAgo: string;
  category: 'Academics' | 'Clubs' | 'Events' | 'Campus Life' | 'Technology';
  title: string;
  content: string;
  likes: number;
  isLiked: boolean;
  commentsCount: number;
  comments: Comment[];
  isBookmarked?: boolean;
}

export interface StudyResource {
  id: string;
  title: string;
  subject: string;
  subjectCategory: 'Computer Science' | 'Mathematics' | 'Physics' | 'Engineering' | 'Humanities';
  type: 'pdf' | 'video' | 'doc';
  addedDate: string;
  sizeOrDuration: string;
  downloadsCount: number;
  viewsCount: number;
  isBookmarked: boolean;
  contributors: Array<{ name: string; avatar?: string }>;
  viewedAgo?: string;
  description?: string;
  fileUrl?: string;
}

export interface QuickNote {
  id: string;
  title: string;
  content: string;
  courseTag?: string;
  createdAt: string;
  color?: string;
}

export interface CampusServiceItem {
  id: string;
  title: string;
  category: 'Dining' | 'Library' | 'Transport' | 'IT Helpdesk' | 'Health';
  description: string;
  statusText: string;
  statusType: 'success' | 'warning' | 'info';
  icon: string;
  actionLabel: string;
}
