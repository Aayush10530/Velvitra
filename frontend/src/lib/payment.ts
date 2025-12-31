import { createRazorpayOrder, verifyRazorpayPayment, createStripePaymentIntent, createBooking, API_BASE_URL } from './api';

// Razorpay configuration
declare global {
  interface Window {
    Razorpay: any;
  }
}

// Function to load Razorpay script
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

// Initialize Razorpay
export const initializeRazorpay = async () => {
  try {
    await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  } catch (error) {
    console.error('Failed to load Razorpay script:', error);
  }
};

interface BookingDetails {
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
  tourGuideLanguage: string;
  guestsCountry: string;
  groupSize: number;
  paymentMethod: string;
}

interface PaymentOptions {
  amount: number;
  tourId: string;
  bookingDetails: BookingDetails;
}

export async function processRazorpayPayment({ amount, tourId, bookingDetails }: PaymentOptions) {
  try {
    // Create order on backend
    const response = await fetch(`${API_BASE_URL}/payments/create-razorpay-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        tourId,
        bookingDetails
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    const order = await response.json();

    // Initialize Razorpay
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Velvitra',
      description: 'Tour Booking Payment',
      order_id: order.id,
      handler: async function (response: any) {
        try {
          // Verify payment on backend
          const verifyResponse = await fetch(`${API_BASE_URL}/payments/verify-razorpay-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              tourId,
              bookingDetails
            })
          });

          if (!verifyResponse.ok) {
            throw new Error('Payment verification failed');
          }

          // Redirect to success page
          window.location.href = `/booking-success?tourId=${tourId}`;
        } catch (error) {
          console.error('Payment verification failed:', error);
          throw error;
        }
      },
      prefill: {
        name: bookingDetails.name,
        email: bookingDetails.email,
        contact: bookingDetails.phone
      },
      theme: {
        color: '#F59E0B'
      }
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
}

export async function processStripePayment({ amount, tourId, bookingDetails }: PaymentOptions) {
  try {
    // Create payment intent on backend
    const response = await fetch(`${API_BASE_URL}/payments/create-stripe-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        amount,
        currency: 'inr',
        tourId,
        bookingDetails
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const { clientSecret } = await response.json();

    // Initialize Stripe
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          // Card details will be collected by Stripe Elements
        },
        billing_details: {
          name: bookingDetails.name,
          email: bookingDetails.email,
          phone: bookingDetails.phone
        }
      }
    });

    if (error) {
      throw error;
    }

    // Redirect to success page
    window.location.href = `/booking-success?tourId=${tourId}`;
  } catch (error) {
    console.error('Payment processing failed:', error);
    throw error;
  }
}

// Helper function to load Stripe
async function loadStripe(publishableKey: string) {
  const { loadStripe } = await import('@stripe/stripe-js');
  return loadStripe(publishableKey);
} 