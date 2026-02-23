// API Response and Request Types

// Base API Response Type
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'leader' | 'admin';
  avatar?: string;
  maturityLevel: number;
  joinedAt: string;
  lastLogin?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Sermon Types
export interface Sermon {
  id: string;
  title: string;
  description: string;
  speaker: string;
  speakerId: string;
  date: string;
  duration: number;
  audioUrl?: string;
  videoUrl?: string;
  transcript?: string;
  thumbnail?: string;
  series?: string;
  seriesId?: string;
  tags: string[];
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface SermonSeries {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  sermons: Sermon[];
  createdAt: string;
}

export interface SermonSpeaker {
  id: string;
  name: string;
  bio?: string;
  avatar?: string;
  sermons: Sermon[];
  totalViews: number;
}

// Booking Types
export interface Booking {
  id: string;
  userId: string;
  type: 'counseling' | 'prayer' | 'meeting';
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  location?: string;
  onlineMeetingUrl?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingRequest {
  type: 'counseling' | 'prayer' | 'meeting';
  title: string;
  description?: string;
  date: string;
  time: string;
  duration: number;
  location?: string;
}

// Testimonial Types
export interface Testimonial {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  category?: string;
  rating?: number;
  isFeatured: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTestimonialRequest {
  content: string;
  category?: string;
  rating?: number;
}

// Prayer Request Types
export interface PrayerRequest {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  isAnonymous: boolean;
  prayerCount: number;
  status: 'active' | 'answered' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrayerRequestRequest {
  title: string;
  content: string;
  isAnonymous?: boolean;
}

// Growth & Progress Types
export interface GrowthProgress {
  userId: string;
  maturityLevel: number;
  milestones: Milestone[];
  achievements: Achievement[];
  stats: GrowthStats;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completedAt?: string;
  targetDate?: string;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
  points: number;
}

export interface GrowthStats {
  prayersPrayed: number;
  sermonsWatched: number;
  testimonialsGiven: number;
  eventsAttended: number;
  daysActive: number;
  totalPoints: number;
}

// Library Types
export interface LibraryResource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'audio' | 'book';
  category: string;
  url?: string;
  downloadUrl?: string;
  thumbnail?: string;
  duration?: number;
  fileSize?: number;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
}

export interface LibraryCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  resourceCount: number;
}

// Community Types
export interface CommunityMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: string;
  joinedAt: string;
  isActive: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  onlineMeetingUrl?: string;
  maxAttendees?: number;
  currentAttendees: number;
  isRegistered: boolean;
  createdAt: string;
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  isMember: boolean;
  thumbnail?: string;
  createdAt: string;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'sermon' | 'testimonial' | 'prayer' | 'community' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: any;
  createdAt: string;
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  bookings: boolean;
  sermons: boolean;
  testimonials: boolean;
  prayers: boolean;
  community: boolean;
}

// Pagination Types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search Types
export interface SearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sort?: 'newest' | 'oldest' | 'popular' | 'alphabetical';
  page?: number;
  limit?: number;
}

// Upload Types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}
