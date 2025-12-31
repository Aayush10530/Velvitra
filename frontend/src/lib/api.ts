import axios from 'axios';
import type {
  CreateRazorpayOrderData,
  VerifyRazorpayPaymentData,
  CreateStripePaymentIntentData,
  CreateBookingData,
  UserRegistrationData,
  UserLoginData,
  ApiResponse,
  Booking
} from '@/types/api';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create Razorpay order
export const createRazorpayOrder = async (data: CreateRazorpayOrderData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-razorpay-order`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (data: VerifyRazorpayPaymentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-razorpay-payment`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

// Create Stripe payment intent
export const createStripePaymentIntent = async (data: CreateStripePaymentIntentData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-stripe-payment-intent`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw error;
  }
};

// Create booking record
export const createBooking = async (data: CreateBookingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-booking`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// User Registration
export const registerUser = async (data: UserRegistrationData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data;
  } catch (error: unknown) {
    console.error('Error registering user:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Registration failed';
  }
};

// User Login
export const loginUser = async (data: UserLoginData): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error: unknown) {
    console.error('Error logging in user:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Login failed';
  }
};

// User Logout
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error: unknown) {
    console.error('Error logging out user:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Logout failed';
  }
};

// Forgot Password
export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error: unknown) {
    console.error('Error requesting password reset:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Failed to request password reset';
  }
};

// Reset Password
export const resetPassword = async (token: string, password: string): Promise<ApiResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error: unknown) {
    console.error('Error resetting password:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Failed to reset password';
  }
};

// Fetch user bookings
export const getUserBookings = async (token: string): Promise<ApiResponse<Booking[]>> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching user bookings:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Failed to fetch bookings';
  }
}; 