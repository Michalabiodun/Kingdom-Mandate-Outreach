import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  User,
  ApiResponse 
} from '../api/types';

class AuthService {
  // Login user
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register new user
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    
    if (response.success && response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Continue with logout even if API call fails
      console.error('Logout API call failed:', error);
    } finally {
      this.clearAuthData();
      window.location.href = '/login';
    }
  }

  // Refresh access token
  async refreshToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.clearAuthData();
      return null;
    }

    try {
      const response = await apiClient.post<{ token: string }>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );
      
      if (response.success && response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuthData();
    }
    
    return null;
  }

  // Verify email
  async verifyEmail(token: string): Promise<boolean> {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.VERIFY_EMAIL,
      { token }
    );
    return response.success;
  }

  // Forgot password
  async forgotPassword(email: string): Promise<boolean> {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { email }
    );
    return response.success;
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const response = await apiClient.post(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      { token, newPassword }
    );
    return response.success;
  }

  // Get current user
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // Update current user
  updateCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    const user = this.getCurrentUser();
    return !!(token && user);
  }

  // Get auth token
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Clear all auth data
  private clearAuthData(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  // Check if user has specific role
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  // Check if user is admin
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  // Check if user is leader or admin
  isLeader(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'leader' || user?.role === 'admin';
  }
}

// Create singleton instance
export const authService = new AuthService();
export default authService;
