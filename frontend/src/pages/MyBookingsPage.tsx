import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getUserBookings } from '@/lib/api'; // We will create this API function next
import ThemedNavbar from '@/components/ThemedNavbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

interface Booking {
  _id: string;
  tour: {
    _id: string;
    title: string;
    images: string[];
  };
  bookingDate: string;
  numberOfPeople: { adults: number; children: number };
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  specialRequests?: string;
  cancellationReason?: string;
  refundAmount?: number;
  createdAt: string;
}

const MyBookingsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      if (isLoading) return; // Wait for auth to load

      if (!isAuthenticated) {
        setLoadingBookings(false);
        return;
      }

      try {
        setLoadingBookings(true);
        // The API now uses cookies/interceptor, no need to pass token manually if interceptor is set up globally
        // But our interceptor in api.ts handles it.
        const data = await getUserBookings();
        // Note: The new API returns array directly or { data: [] }? 
        // Our backend returns json(bookings) which is an array.
        // Our api.ts returns response.data.

        // Let's assume response.data IS the array based on backend code "res.json(bookings)"
        setBookings(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch bookings:', err);
        setError(err.message || 'Failed to fetch bookings');
        setBookings([]);
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();

  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return <div>Loading user authentication...</div>; // Or a spinner component
  }

  if (!isAuthenticated) {
    return <div>Please log in to view your bookings.</div>; // Or redirect to login
  }

  if (loadingBookings) {
    return <div>Loading your bookings...</div>; // Or a spinner component
  }

  if (error) {
    return <div>Error loading bookings: {error}</div>;
  }

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed' && new Date(b.bookingDate) >= new Date());
  const completedBookings = bookings.filter(b => b.status === 'completed' || (b.status === 'confirmed' && new Date(b.bookingDate) < new Date()));
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  const renderBookingCard = (booking: Booking) => (
    <Card key={booking._id} className="mb-4">
      <CardHeader>
        <CardTitle>{booking.tour.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Date: {format(new Date(booking.bookingDate), 'PPP')}</p>
        <p>Guests: {booking.numberOfPeople.adults} Adults{booking.numberOfPeople.children > 0 ? `, ${booking.numberOfPeople.children} Children` : ''}</p>
        <p>Total Amount: ${booking.totalAmount}</p>
        <p>Status: {booking.status}</p>
        {booking.paymentStatus && <p>Payment Status: {booking.paymentStatus}</p>}
        {booking.cancellationReason && <p>Cancellation Reason: {booking.cancellationReason}</p>}
        {booking.refundAmount > 0 && <p>Refund Amount: ${booking.refundAmount}</p>}
        {/* Add more details or actions here */}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ThemedNavbar />
      <main className="flex-grow container mx-auto px-4 py-32">
        <h1 className="text-4xl font-playfair font-bold mb-12 text-black">My Bookings</h1>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map(renderBookingCard)
            ) : (
              <p>No upcoming bookings.</p>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-4">
            {completedBookings.length > 0 ? (
              completedBookings.map(renderBookingCard)
            ) : (
              <p>No completed bookings.</p>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-4">
            {cancelledBookings.length > 0 ? (
              cancelledBookings.map(renderBookingCard)
            ) : (
              <p>No cancelled bookings.</p>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookingsPage; 