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
import { supabase } from './supabase';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the auth token
api.interceptors.request.use(async (config) => {
  const { data: { session } } = await supabase.auth.getSession();

  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  }
  return config;
});

// Create Razorpay order
export const createRazorpayOrder = async (data: CreateRazorpayOrderData) => {
  try {
    const response = await api.post(`/create-razorpay-order`, data);
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

// Auth functions removed in favor of Supabase Auth

// Fetch user bookings
export const getUserBookings = async (): Promise<ApiResponse<Booking[]>> => {
  try {
    const response = await api.get(`/bookings/my-bookings`);
    return response.data;
  } catch (error: unknown) {
    console.error('Error fetching user bookings:', error);
    const axiosError = error as { response?: { data?: unknown }; message?: string };
    throw axiosError.response?.data || axiosError.message || 'Failed to fetch bookings';
  }
}; 