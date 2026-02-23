import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { 
  User, 
  ApiResponse,
  UploadResponse 
} from '../api/types';

class UserService {
  // Get user profile
  async getProfile(): Promise<User> {
    const response = await apiClient.get<User>(
      API_ENDPOINTS.USERS.PROFILE
    );
    return response.data;
  }

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<User> {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.USERS.UPDATE_PROFILE,
      profileData
    );
    return response.data;
  }

  // Change password
  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(
      API_ENDPOINTS.USERS.CHANGE_PASSWORD,
      { currentPassword, newPassword }
    );
    return response.data;
  }

  // Upload avatar
  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await apiClient.upload<{ avatarUrl: string }>(
      API_ENDPOINTS.USERS.UPLOAD_AVATAR,
      formData
    );
    return response.data;
  }

  // Delete user account
  async deleteAccount(password: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(
      API_ENDPOINTS.USERS.DELETE_ACCOUNT,
      { password }
    );
    return response.data;
  }

  // Update user preferences
  async updatePreferences(preferences: {
    notifications?: {
      email?: boolean;
      push?: boolean;
      bookings?: boolean;
      sermons?: boolean;
      testimonials?: boolean;
      prayers?: boolean;
      community?: boolean;
    };
    privacy?: {
      profileVisible?: boolean;
      showEmail?: boolean;
      showActivity?: boolean;
    };
  }): Promise<{ success: boolean }> {
    const response = await apiClient.put<{ success: boolean }>(
      `${API_ENDPOINTS.USERS.PROFILE}/preferences`,
      preferences
    );
    return response.data;
  }

  // Get user preferences
  async getPreferences(): Promise<{
    notifications: {
      email: boolean;
      push: boolean;
      bookings: boolean;
      sermons: boolean;
      testimonials: boolean;
      prayers: boolean;
      community: boolean;
    };
    privacy: {
      profileVisible: boolean;
      showEmail: boolean;
      showActivity: boolean;
    };
  }> {
    const response = await apiClient.get<{
      notifications: {
        email: boolean;
        push: boolean;
        bookings: boolean;
        sermons: boolean;
        testimonials: boolean;
        prayers: boolean;
        community: boolean;
      };
      privacy: {
        profileVisible: boolean;
        showEmail: boolean;
        showActivity: boolean;
      };
    }>(
      `${API_ENDPOINTS.USERS.PROFILE}/preferences`
    );
    return response.data;
  }

  // Get user activity
  async getUserActivity(limit: number = 10): Promise<{
    type: 'sermon' | 'testimonial' | 'booking' | 'prayer' | 'community';
    title: string;
    description: string;
    date: string;
    metadata?: any;
  }[]> {
    const response = await apiClient.get<{
      type: 'sermon' | 'testimonial' | 'booking' | 'prayer' | 'community';
      title: string;
      description: string;
      date: string;
      metadata?: any;
    }[]>(
      `${API_ENDPOINTS.USERS.PROFILE}/activity`,
      { params: { limit } }
    );
    return response.data;
  }

  // Get user statistics
  async getUserStats(): Promise<{
    sermonsWatched: number;
    testimonialsGiven: number;
    prayersRequested: number;
    prayersPrayedFor: number;
    bookingsMade: number;
    eventsAttended: number;
    maturityLevel: number;
    joinDate: string;
    lastActiveDate: string;
  }> {
    const response = await apiClient.get<{
      sermonsWatched: number;
      testimonialsGiven: number;
      prayersRequested: number;
      prayersPrayedFor: number;
      bookingsMade: number;
      eventsAttended: number;
      maturityLevel: number;
      joinDate: string;
      lastActiveDate: string;
    }>(
      `${API_ENDPOINTS.USERS.PROFILE}/stats`
    );
    return response.data;
  }

  // Export user data
  async exportUserData(): Promise<{ downloadUrl: string }> {
    const response = await apiClient.get<{ downloadUrl: string }>(
      `${API_ENDPOINTS.USERS.PROFILE}/export`
    );
    return response.data;
  }

  // Deactivate account
  async deactivateAccount(reason?: string): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_ENDPOINTS.USERS.PROFILE}/deactivate`,
      { reason }
    );
    return response.data;
  }

  // Reactivate account
  async reactivateAccount(): Promise<{ success: boolean }> {
    const response = await apiClient.post<{ success: boolean }>(
      `${API_ENDPOINTS.USERS.PROFILE}/reactivate`
    );
    return response.data;
  }
}

// Create singleton instance
export const userService = new UserService();
export default userService;
