import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomTourPage from "./pages/CustomTourPage";
import ToursPage from "./pages/ToursPage";
import TourDetailPage from "./pages/TourDetailPage";
import GalleryPage from "./pages/GalleryPage";
import LuxuryTransportPage from "./pages/LuxuryTransportPage";
import GuidesPage from "./pages/services/GuidesPage";
import TransportationPage from "./pages/services/TransportationPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage";
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import HotelsPage from "./pages/HotelsPage";
import BlogPage from "@/pages/BlogPage";
import AdminAvailabilityPage from "./pages/AdminAvailabilityPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-transparent">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/custom-tour" element={<CustomTourPage />} />
            <Route path="/tours" element={<ToursPage />} />
            <Route path="/tour/:id" element={<TourDetailPage />} />
            <Route path="/tour/:id/book" element={<BookingPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/luxury-transport" element={<LuxuryTransportPage />} />
            <Route path="/services/guides" element={<GuidesPage />} />
            <Route path="/services/transportation" element={<TransportationPage />} />
            <Route path="/services/accommodations" element={<HotelsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/admin/availability" element={<AdminAvailabilityPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
