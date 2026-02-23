// API Endpoint definitions
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },

  // Users
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    UPLOAD_AVATAR: '/users/avatar',
    DELETE_ACCOUNT: '/users/delete',
  },

  // Sermons
  SERMONS: {
    LIST: '/sermons',
    DETAIL: (id: string) => `/sermons/${id}`,
    CREATE: '/sermons',
    UPDATE: (id: string) => `/sermons/${id}`,
    DELETE: (id: string) => `/sermons/${id}`,
    SEARCH: '/sermons/search',
    SERIES: '/sermons/series',
    SERIES_DETAIL: (id: string) => `/sermons/series/${id}`,
    SPEAKERS: '/sermons/speakers',
    SPEAKER_DETAIL: (id: string) => `/sermons/speakers/${id}`,
  },

  // Bookings
  BOOKINGS: {
    LIST: '/bookings',
    CREATE: '/bookings',
    DETAIL: (id: string) => `/bookings/${id}`,
    UPDATE: (id: string) => `/bookings/${id}`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
    AVAILABLE_SLOTS: '/bookings/available-slots',
  },

  // Testimonials
  TESTIMONIALS: {
    LIST: '/testimonials',
    CREATE: '/testimonials',
    DETAIL: (id: string) => `/testimonials/${id}`,
    UPDATE: (id: string) => `/testimonials/${id}`,
    DELETE: (id: string) => `/testimonials/${id}`,
    APPROVE: (id: string) => `/testimonials/${id}/approve`,
    FEATURED: '/testimonials/featured',
  },

  // Prayer Requests
  PRAYER_REQUESTS: {
    LIST: '/prayer-requests',
    CREATE: '/prayer-requests',
    DETAIL: (id: string) => `/prayer-requests/${id}`,
    UPDATE: (id: string) => `/prayer-requests/${id}`,
    DELETE: (id: string) => `/prayer-requests/${id}`,
    PRAY_FOR: (id: string) => `/prayer-requests/${id}/pray`,
  },

  // Growth & Progress
  GROWTH: {
    DASHBOARD: '/growth/dashboard',
    PROGRESS: '/growth/progress',
    MILESTONES: '/growth/milestones',
    ACHIEVEMENTS: '/growth/achievements',
    STATS: '/growth/stats',
  },

  // Library Resources
  LIBRARY: {
    RESOURCES: '/library/resources',
    CATEGORIES: '/library/categories',
    FAVORITES: '/library/favorites',
    DOWNLOAD: (id: string) => `/library/resources/${id}/download`,
  },

  // Community
  COMMUNITY: {
    MEMBERS: '/community/members',
    EVENTS: '/community/events',
    GROUPS: '/community/groups',
    DISCUSSIONS: '/community/discussions',
    ANNOUNCEMENTS: '/community/announcements',
  },

  // Notifications
  NOTIFICATIONS: {
    LIST: '/notifications',
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: '/notifications/read-all',
    SETTINGS: '/notifications/settings',
    UPDATE_SETTINGS: '/notifications/settings',
  },

  // Upload
  UPLOAD: {
    IMAGE: '/upload/image',
    DOCUMENT: '/upload/document',
    VIDEO: '/upload/video',
    AUDIO: '/upload/audio',
  },
} as const;
