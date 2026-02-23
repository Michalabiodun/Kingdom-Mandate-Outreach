# API Services Documentation

This directory contains a comprehensive API service layer for the Kingdom Mandate Outreach application.

## Installation

First, install the required dependencies:

```bash
npm install axios
```

## Environment Variables

Create a `.env` file in your project root:

```env
VITE_API_URL=http://localhost:3001/api
```

## Usage Examples

### Authentication Service

```typescript
import { authService } from '../services';

// Login
const login = async (email: string, password: string) => {
  try {
    const result = await authService.login({ email, password });
    console.log('User logged in:', result.user);
    // Token is automatically stored in localStorage
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Register
const register = async (name: string, email: string, password: string) => {
  try {
    const result = await authService.register({ 
      name, 
      email, 
      password, 
      confirmPassword: password 
    });
    console.log('User registered:', result.user);
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

// Check authentication
const isAuthenticated = authService.isAuthenticated();
const currentUser = authService.getCurrentUser();
```

### Sermon Service

```typescript
import { sermonService } from '../services';

// Get sermons with pagination
const getSermons = async () => {
  try {
    const sermons = await sermonService.getSermons({ 
      page: 1, 
      limit: 10,
      category: 'faith',
      sort: 'newest'
    });
    console.log('Sermons:', sermons.data);
  } catch (error) {
    console.error('Failed to fetch sermons:', error);
  }
};

// Search sermons
const searchSermons = async (query: string) => {
  try {
    const results = await sermonService.searchSermons(query, {
      page: 1,
      limit: 5
    });
    console.log('Search results:', results.data);
  } catch (error) {
    console.error('Search failed:', error);
  }
};

// Get sermon details
const getSermonDetails = async (id: string) => {
  try {
    const sermon = await sermonService.getSermonById(id);
    console.log('Sermon details:', sermon);
    
    // Track view
    await sermonService.trackSermonView(id);
  } catch (error) {
    console.error('Failed to get sermon:', error);
  }
};
```

### Booking Service

```typescript
import { bookingService } from '../services';

// Create a booking
const createBooking = async () => {
  try {
    const booking = await bookingService.createBooking({
      type: 'counseling',
      title: 'Spiritual Guidance Session',
      description: 'Need guidance on spiritual matters',
      date: '2024-03-15',
      time: '14:00',
      duration: 60
    });
    console.log('Booking created:', booking);
  } catch (error) {
    console.error('Booking creation failed:', error);
  }
};

// Get user's bookings
const getUserBookings = async () => {
  try {
    const bookings = await bookingService.getBookings(1, 10);
    console.log('User bookings:', bookings.data);
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
  }
};

// Check available slots
const getAvailableSlots = async (date: string) => {
  try {
    const slots = await bookingService.getAvailableSlots(date, 'counseling');
    console.log('Available slots:', slots.slots);
  } catch (error) {
    console.error('Failed to get slots:', error);
  }
};
```

### Testimonial Service

```typescript
import { testimonialService } from '../services';

// Create testimonial
const createTestimonial = async () => {
  try {
    const testimonial = await testimonialService.createTestimonial({
      content: 'This ministry has transformed my life!',
      category: 'spiritual-growth',
      rating: 5
    });
    console.log('Testimonial created:', testimonial);
  } catch (error) {
    console.error('Testimonial creation failed:', error);
  }
};

// Get featured testimonials
const getFeaturedTestimonials = async () => {
  try {
    const testimonials = await testimonialService.getFeaturedTestimonials(5);
    console.log('Featured testimonials:', testimonials);
  } catch (error) {
    console.error('Failed to fetch testimonials:', error);
  }
};
```

### User Service

```typescript
import { userService } from '../services';

// Get user profile
const getUserProfile = async () => {
  try {
    const profile = await userService.getProfile();
    console.log('User profile:', profile);
  } catch (error) {
    console.error('Failed to get profile:', error);
  }
};

// Update profile
const updateProfile = async () => {
  try {
    const updatedProfile = await userService.updateProfile({
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Profile updated:', updatedProfile);
  } catch (error) {
    console.error('Profile update failed:', error);
  }
};

// Upload avatar
const uploadAvatar = async (file: File) => {
  try {
    const result = await userService.uploadAvatar(file);
    console.log('Avatar uploaded:', result.avatarUrl);
  } catch (error) {
    console.error('Avatar upload failed:', error);
  }
};
```

## React Hook Example

```typescript
// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { authService } from '../services';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const result = await authService.login({ email, password });
    setUser(result.user);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: authService.isAuthenticated() };
};
```

## Error Handling

All API calls are wrapped in try-catch blocks. The API client automatically handles:

- 401 errors (redirects to login)
- Network errors
- Request/response interceptors
- Token refresh

## Response Format

All API responses follow this format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}
```

## Available Endpoints

See `src/services/api/endpoints.ts` for a complete list of all available API endpoints.

## TypeScript Support

All services are fully typed with TypeScript. Import types from `../services/api/types`.

## Development

To add a new service:

1. Create a new file in the appropriate directory
2. Extend the service class with API methods
3. Add types to `api/types.ts`
4. Add endpoints to `api/endpoints.ts`
5. Export from `services/index.ts`
