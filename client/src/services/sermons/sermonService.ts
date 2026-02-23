import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { 
  Sermon, 
  SermonSeries, 
  SermonSpeaker,
  SearchParams,
  PaginatedResponse,
  ApiResponse 
} from '../api/types';

class SermonService {
  // Get all sermons with pagination and filters
  async getSermons(params?: SearchParams): Promise<PaginatedResponse<Sermon>> {
    const response = await apiClient.get<PaginatedResponse<Sermon>>(
      API_ENDPOINTS.SERMONS.LIST,
      { params }
    );
    return response.data;
  }

  // Get sermon by ID
  async getSermonById(id: string): Promise<Sermon> {
    const response = await apiClient.get<Sermon>(
      API_ENDPOINTS.SERMONS.DETAIL(id)
    );
    return response.data;
  }

  // Search sermons
  async searchSermons(query: string, params?: SearchParams): Promise<PaginatedResponse<Sermon>> {
    const response = await apiClient.get<PaginatedResponse<Sermon>>(
      API_ENDPOINTS.SERMONS.SEARCH,
      { 
        params: { 
          query, 
          ...params 
        } 
      }
    );
    return response.data;
  }

  // Get all sermon series
  async getSermonSeries(): Promise<SermonSeries[]> {
    const response = await apiClient.get<SermonSeries[]>(
      API_ENDPOINTS.SERMONS.SERIES
    );
    return response.data;
  }

  // Get sermon series by ID
  async getSeriesById(id: string): Promise<SermonSeries> {
    const response = await apiClient.get<SermonSeries>(
      API_ENDPOINTS.SERMONS.SERIES_DETAIL(id)
    );
    return response.data;
  }

  // Get all speakers
  async getSpeakers(): Promise<SermonSpeaker[]> {
    const response = await apiClient.get<SermonSpeaker[]>(
      API_ENDPOINTS.SERMONS.SPEAKERS
    );
    return response.data;
  }

  // Get speaker by ID
  async getSpeakerById(id: string): Promise<SermonSpeaker> {
    const response = await apiClient.get<SermonSpeaker>(
      API_ENDPOINTS.SERMONS.SPEAKER_DETAIL(id)
    );
    return response.data;
  }

  // Like/unlike sermon
  async toggleLikeSermon(id: string): Promise<{ liked: boolean; likesCount: number }> {
    const response = await apiClient.post(
      `${API_ENDPOINTS.SERMONS.DETAIL(id)}/like`
    );
    return response.data;
  }

  // Track sermon view
  async trackSermonView(id: string): Promise<void> {
    await apiClient.post(
      `${API_ENDPOINTS.SERMONS.DETAIL(id)}/view`
    );
  }

  // Get related sermons
  async getRelatedSermons(id: string, limit: number = 5): Promise<Sermon[]> {
    const response = await apiClient.get<Sermon[]>(
      `${API_ENDPOINTS.SERMONS.DETAIL(id)}/related`,
      { params: { limit } }
    );
    return response.data;
  }

  // Create new sermon (admin/leader only)
  async createSermon(sermonData: Partial<Sermon>): Promise<Sermon> {
    const response = await apiClient.post<Sermon>(
      API_ENDPOINTS.SERMONS.CREATE,
      sermonData
    );
    return response.data;
  }

  // Update sermon (admin/leader only)
  async updateSermon(id: string, sermonData: Partial<Sermon>): Promise<Sermon> {
    const response = await apiClient.put<Sermon>(
      API_ENDPOINTS.SERMONS.UPDATE(id),
      sermonData
    );
    return response.data;
  }

  // Delete sermon (admin only)
  async deleteSermon(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.SERMONS.DELETE(id));
  }

  // Upload sermon audio/video
  async uploadSermonMedia(
    sermonId: string, 
    mediaType: 'audio' | 'video', 
    file: File
  ): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', mediaType);

    const response = await apiClient.upload(
      `${API_ENDPOINTS.SERMONS.DETAIL(sermonId)}/upload`,
      formData
    );
    return response.data;
  }

  // Get sermon transcript
  async getSermonTranscript(id: string): Promise<string> {
    const response = await apiClient.get<{ transcript: string }>(
      `${API_ENDPOINTS.SERMONS.DETAIL(id)}/transcript`
    );
    return response.data.transcript;
  }

  // Generate sermon transcript (admin/leader only)
  async generateTranscript(id: string): Promise<string> {
    const response = await apiClient.post<{ transcript: string }>(
      `${API_ENDPOINTS.SERMONS.DETAIL(id)}/transcript/generate`
    );
    return response.data.transcript;
  }
}

// Create singleton instance
export const sermonService = new SermonService();
export default sermonService;
