import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { 
  Testimonial, 
  CreateTestimonialRequest,
  PaginatedResponse,
  ApiResponse 
} from '../api/types';

class TestimonialService {
  // Get all testimonials with pagination
  async getTestimonials(
    page: number = 1, 
    limit: number = 10,
    category?: string
  ): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<PaginatedResponse<Testimonial>>(
      API_ENDPOINTS.TESTIMONIALS.LIST,
      { params: { page, limit, category } }
    );
    return response.data;
  }

  // Get featured testimonials
  async getFeaturedTestimonials(limit: number = 5): Promise<Testimonial[]> {
    const response = await apiClient.get<Testimonial[]>(
      API_ENDPOINTS.TESTIMONIALS.FEATURED,
      { params: { limit } }
    );
    return response.data;
  }

  // Get testimonial by ID
  async getTestimonialById(id: string): Promise<Testimonial> {
    const response = await apiClient.get<Testimonial>(
      API_ENDPOINTS.TESTIMONIALS.DETAIL(id)
    );
    return response.data;
  }

  // Create new testimonial
  async createTestimonial(testimonialData: CreateTestimonialRequest): Promise<Testimonial> {
    const response = await apiClient.post<Testimonial>(
      API_ENDPOINTS.TESTIMONIALS.CREATE,
      testimonialData
    );
    return response.data;
  }

  // Update testimonial
  async updateTestimonial(
    id: string, 
    testimonialData: Partial<CreateTestimonialRequest>
  ): Promise<Testimonial> {
    const response = await apiClient.put<Testimonial>(
      API_ENDPOINTS.TESTIMONIALS.UPDATE(id),
      testimonialData
    );
    return response.data;
  }

  // Delete testimonial
  async deleteTestimonial(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.TESTIMONIALS.DELETE(id));
  }

  // Approve testimonial (admin/leader only)
  async approveTestimonial(id: string): Promise<Testimonial> {
    const response = await apiClient.post<Testimonial>(
      API_ENDPOINTS.TESTIMONIALS.APPROVE(id)
    );
    return response.data;
  }

  // Feature/unfeature testimonial (admin/leader only)
  async toggleFeatureTestimonial(id: string): Promise<{ featured: boolean }> {
    const response = await apiClient.post<{ featured: boolean }>(
      `${API_ENDPOINTS.TESTIMONIALS.DETAIL(id)}/feature`
    );
    return response.data;
  }

  // Get user's testimonials
  async getUserTestimonials(
    userId?: string, 
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<PaginatedResponse<Testimonial>>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/user`,
      { params: { userId, page, limit } }
    );
    return response.data;
  }

  // Like/unlike testimonial
  async toggleLikeTestimonial(id: string): Promise<{ liked: boolean; likesCount: number }> {
    const response = await apiClient.post<{ liked: boolean; likesCount: number }>(
      `${API_ENDPOINTS.TESTIMONIALS.DETAIL(id)}/like`
    );
    return response.data;
  }

  // Report testimonial
  async reportTestimonial(id: string, reason: string): Promise<{ reported: boolean }> {
    const response = await apiClient.post<{ reported: boolean }>(
      `${API_ENDPOINTS.TESTIMONIALS.DETAIL(id)}/report`,
      { reason }
    );
    return response.data;
  }

  // Get testimonial categories
  async getTestimonialCategories(): Promise<{ name: string; count: number }[]> {
    const response = await apiClient.get<{ name: string; count: number }[]>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/categories`
    );
    return response.data;
  }

  // Search testimonials
  async searchTestimonials(
    query: string,
    page: number = 1,
    limit: number = 10,
    category?: string
  ): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<PaginatedResponse<Testimonial>>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/search`,
      { params: { query, page, limit, category } }
    );
    return response.data;
  }

  // Get pending testimonials (admin/leader only)
  async getPendingTestimonials(
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<PaginatedResponse<Testimonial>>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/pending`,
      { params: { page, limit } }
    );
    return response.data;
  }

  // Get reported testimonials (admin/leader only)
  async getReportedTestimonials(
    page: number = 1, 
    limit: number = 10
  ): Promise<PaginatedResponse<Testimonial>> {
    const response = await apiClient.get<PaginatedResponse<Testimonial>>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/reported`,
      { params: { page, limit } }
    );
    return response.data;
  }

  // Get testimonial statistics (admin/leader only)
  async getTestimonialStats(): Promise<{
    total: number;
    published: number;
    pending: number;
    reported: number;
    featured: number;
    thisMonth: number;
  }> {
    const response = await apiClient.get<{
      total: number;
      published: number;
      pending: number;
      reported: number;
      featured: number;
      thisMonth: number;
    }>(
      `${API_ENDPOINTS.TESTIMONIALS.LIST}/stats`
    );
    return response.data;
  }

  // Share testimonial
  async shareTestimonial(id: string, platform: 'email' | 'social'): Promise<{ shareUrl: string }> {
    const response = await apiClient.post<{ shareUrl: string }>(
      `${API_ENDPOINTS.TESTIMONIALS.DETAIL(id)}/share`,
      { platform }
    );
    return response.data;
  }
}

// Create singleton instance
export const testimonialService = new TestimonialService();
export default testimonialService;
