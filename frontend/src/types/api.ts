// API Types for Velvitra
export interface BookingDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfTravelers: number;
  travelDate: string;
  specialRequests?: string;
  hotelId?: string;
  roomType?: string;
}

export interface PaymentDetails {
  paymentId: string;
  paymentMethod: 'razorpay' | 'stripe';
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface CreateRazorpayOrderData {
  amount: number;
  currency: string;
  tourId: string;
  bookingDetails: BookingDetails;
}

export interface VerifyRazorpayPaymentData {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
  tourId: string;
  bookingDetails: BookingDetails;
}

export interface CreateStripePaymentIntentData {
  amount: number;
  currency: string;
  tourId: string;
  bookingDetails: BookingDetails;
}

export interface CreateBookingData {
  tourId: string;
  bookingDetails: BookingDetails;
  paymentDetails: PaymentDetails;
}

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  tourId: string;
  userId: string;
  bookingDetails: BookingDetails;
  paymentDetails: PaymentDetails;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}