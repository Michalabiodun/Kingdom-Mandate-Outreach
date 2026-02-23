// Main services export file
// Import all services for easy access

// API Client
export { default as apiClient } from './api/client';
export * from './api/types';
export * from './api/endpoints';

// Service Classes
export { default as authService } from './auth/authService';
export { default as sermonService } from './sermons/sermonService';
export { default as bookingService } from './bookings/bookingService';
export { default as testimonialService } from './testimonials/testimonialService';
export { default as userService } from './users/userService';

// Environment variables helper
export const API_CONFIG = {
  BASE_URL: (process.env.NEXT_PUBLIC_API_URL as string) || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;
