import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { 
  Booking, 
  CreateBookingRequest,
  PaginatedResponse,
  ApiResponse 
} from '../api/types';

class BookingService {
  // Get user's bookings
  async getBookings(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Booking>> {
    const response = await apiClient.get<PaginatedResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.LIST,
      { params: { page, limit } }
    );
    return response.data;
  }

  // Get booking by ID
  async getBookingById(id: string): Promise<Booking> {
    const response = await apiClient.get<Booking>(
      API_ENDPOINTS.BOOKINGS.DETAIL(id)
    );
    return response.data;
  }

  // Create new booking
  async createBooking(bookingData: CreateBookingRequest): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      bookingData
    );
    return response.data;
  }

  // Update booking
  async updateBooking(id: string, bookingData: Partial<CreateBookingRequest>): Promise<Booking> {
    const response = await apiClient.put<Booking>(
      API_ENDPOINTS.BOOKINGS.UPDATE(id),
      bookingData
    );
    return response.data;
  }

  // Cancel booking
  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      API_ENDPOINTS.BOOKINGS.CANCEL(id),
      { reason }
    );
    return response.data;
  }

  // Get available booking slots
  async getAvailableSlots(
    date: string, 
    type?: 'counseling' | 'prayer' | 'meeting'
  ): Promise<{ date: string; slots: { time: string; available: boolean }[] }> {
    const response = await apiClient.get(
      API_ENDPOINTS.BOOKINGS.AVAILABLE_SLOTS,
      { params: { date, type } }
    );
    return response.data;
  }

  // Confirm booking (admin/leader only)
  async confirmBooking(id: string): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/confirm`
    );
    return response.data;
  }

  // Complete booking (admin/leader only)
  async completeBooking(id: string, notes?: string): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/complete`,
      { notes }
    );
    return response.data;
  }

  // Reschedule booking
  async rescheduleBooking(
    id: string, 
    newDate: string, 
    newTime: string
  ): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/reschedule`,
      { newDate, newTime }
    );
    return response.data;
  }

  // Add notes to booking (admin/leader only)
  async addBookingNotes(id: string, notes: string): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/notes`,
      { notes }
    );
    return response.data;
  }

  // Get upcoming bookings
  async getUpcomingBookings(limit: number = 5): Promise<Booking[]> {
    const response = await apiClient.get<Booking[]>(
      `${API_ENDPOINTS.BOOKINGS.LIST}/upcoming`,
      { params: { limit } }
    );
    return response.data;
  }

  // Get past bookings
  async getPastBookings(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Booking>> {
    const response = await apiClient.get<PaginatedResponse<Booking>>(
      `${API_ENDPOINTS.BOOKINGS.LIST}/past`,
      { params: { page, limit } }
    );
    return response.data;
  }

  // Get booking statistics (admin/leader only)
  async getBookingStats(): Promise<{
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    completed: number;
    thisMonth: number;
  }> {
    const response = await apiClient.get(
      `${API_ENDPOINTS.BOOKINGS.LIST}/stats`
    );
    return response.data;
  }

  // Check if time slot is available
  async checkSlotAvailability(
    date: string, 
    time: string, 
    type: 'counseling' | 'prayer' | 'meeting'
  ): Promise<{ available: boolean; reason?: string }> {
    const response = await apiClient.get(
      `${API_ENDPOINTS.BOOKINGS.AVAILABLE_SLOTS}/check`,
      { params: { date, time, type } }
    );
    return response.data;
  }

  // Send booking reminder
  async sendReminder(id: string): Promise<{ sent: boolean }> {
    const response = await apiClient.post(
      `${API_ENDPOINTS.BOOKINGS.DETAIL(id)}/reminder`
    );
    return response.data;
  }

  // Get booking calendar view
  async getBookingCalendar(
    month: string, // Format: YYYY-MM
    type?: 'counseling' | 'prayer' | 'meeting'
  ): Promise<{ 
    date: string; 
    bookings: Booking[]; 
    availableSlots: number;
  }[]> {
    const response = await apiClient.get(
      `${API_ENDPOINTS.BOOKINGS.LIST}/calendar`,
      { params: { month, type } }
    );
    return response.data;
  }
}

// Create singleton instance
export const bookingService = new BookingService();
export default bookingService;
