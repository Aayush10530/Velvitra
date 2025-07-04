import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Create Razorpay order
export const createRazorpayOrder = async (data: {
  amount: number;
  currency: string;
  tourId: string;
  bookingDetails: any;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-razorpay-order`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error;
  }
};

// Verify Razorpay payment
export const verifyRazorpayPayment = async (data: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  tourId: string;
  bookingDetails: any;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-razorpay-payment`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    throw error;
  }
};

// Create Stripe payment intent
export const createStripePaymentIntent = async (data: {
  amount: number;
  currency: string;
  tourId: string;
  bookingDetails: any;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-stripe-payment-intent`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    throw error;
  }
};

// Create booking record
export const createBooking = async (data: {
  tourId: string;
  bookingDetails: any;
  paymentDetails: any;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-booking`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// User Registration
export const registerUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw error.response?.data || error.message;
  }
};

// User Login
export const loginUser = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error logging in user:', error);
    throw error.response?.data || error.message;
  }
};

// User Logout
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error: any) {
    console.error('Error logging out user:', error);
    throw error.response?.data || error.message;
  }
};

// Fetch user bookings
export const getUserBookings = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings/my-bookings`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user bookings:', error);
    throw error.response?.data || error.message;
  }
}; 