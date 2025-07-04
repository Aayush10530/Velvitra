import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Plus, Minus, ArrowLeft, Clock, Users, MapPin, Star, Info, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import HotelSelection from "@/components/HotelSelection";
import { Separator } from "@/components/ui/separator";

// Tour data (moved from ToursPage for now, should be in a separate data file)
const tourPackages = [
  {
    id: "imperial-agra-day-tour",
    title: "Imperial Agra Day Tour",
    description: "Experience the grandeur of Agra's most iconic monuments in a single day. Visit the Taj Mahal, Agra Fort, and other historical sites with our expert guides.",
    image: "/heritage-uploads/taj fort.jpg",
    rating: 4.9,
    reviews: 128,
    tags: ["best-seller", "day-tour"],
    price: 195,
    highlights: [
      "Skip-the-line entry to Taj Mahal",
      "Expert local guide",
      "Luxury AC vehicle",
      "Lunch at a heritage restaurant",
      "Hotel pickup and drop-off"
    ]
  },
  {
    id: "royal-mughal-heritage",
    title: "Royal Mughal Heritage Tour",
    description: "Immerse yourself in the rich Mughal history of Agra with this comprehensive 2-day tour. Explore the city's most magnificent monuments and hidden gems.",
    image: "/heritage-uploads/all.jpg",
    rating: 4.8,
    reviews: 95,
    tags: ["multi-day", "heritage"],
    price: 250,
    highlights: [
      "Extended 2-day exploration",
      "Sunrise and sunset views",
      "Heritage walk in old Agra",
      "Traditional dinner experience",
      "Luxury accommodation included"
    ]
  },
  {
    id: "taj-mahal-by-moonlight",
    title: "Taj Mahal by Moonlight",
    description: "Witness the ethereal beauty of the Taj Mahal under the moonlight during special night viewing sessions, a rare and magical experience.",
    image: "/lovable-uploads/38db1722-ab1f-44d2-bfc1-95605b191003.png",
    rating: 4.9,
    reviews: 156,
    tags: ["special-access", "romantic"],
    price: 220,
    highlights: [
      "Exclusive night viewing access",
      "Professional photography session",
      "Romantic dinner setup",
      "Private guide",
      "Luxury transportation"
    ]
  },
  {
    id: "taj-mahal-sunrise-tour",
    title: "Taj Mahal Sunrise Tour",
    description: "Experience the magic of the Taj Mahal at dawn, when the first rays of sunlight illuminate the marble monument, creating a breathtaking golden glow.",
    image: "/heritage-uploads/taj rise.jpg",
    rating: 4.9,
    reviews: 124,
    tags: ["best-seller", "sunrise"],
    price: 179,
    highlights: [
      "Beat the crowds with early morning access",
      "Witness the changing colors of the Taj at sunrise",
      "Expert historical commentary from our guides",
      "Perfect lighting conditions for photography"
    ]
  },
  {
    id: "romantic-taj-experience",
    title: "Romantic Taj Experience for Couples",
    description: "A special tour designed exclusively for couples to experience the eternal monument of love with romantic elements and private moments.",
    image: "/heritage-uploads/romantic-taj-couples.jpg",
    rating: 4.9,
    reviews: 89,
    tags: ["romantic", "couples"],
    price: 299,
    highlights: [
      "Private viewing of the Taj Mahal",
      "Romantic photo session",
      "Couple's spa treatment",
      "Candlelight dinner",
      "Luxury hotel stay"
    ]
  },
  {
    id: "agra-food-culture-walk",
    title: "Agra Food & Culture Walk",
    description: "Explore the culinary traditions and cultural heritage of Agra, from street food specialties to local artisan workshops.",
    image: "/heritage-uploads/food-culture.jpg",
    rating: 4.7,
    reviews: 67,
    tags: ["food", "cultural"],
    price: 1999,
    highlights: [
      "Local food tasting tour",
      "Visit to traditional markets",
      "Cooking demonstration",
      "Cultural performances",
      "Local guide"
    ]
  },
  {
    id: "mughal-gardens-nature-tour",
    title: "Mughal Gardens & Nature Tour",
    description: "Discover the lush Mughal gardens and natural landscapes around Agra that showcase the dynasty's appreciation for horticulture and design.",
    image: "/heritage-uploads/mughal-gardens.jpg",
    rating: 4.6,
    reviews: 45,
    tags: ["nature", "gardens"],
    price: 2499,
    highlights: [
      "Visit to Mehtab Bagh",
      "Botanical garden tour",
      "Bird watching",
      "Nature photography",
      "Picnic lunch"
    ]
  },
  {
    id: "photography-masterclass-tour",
    title: "Photography Masterclass Tour",
    description: "Perfect your photography skills with our expert guides who will help you capture stunning images of Agra's monuments from the best angles.",
    image: "/heritage-uploads/photography-tour.jpg",
    rating: 4.8,
    reviews: 78,
    tags: ["photography", "learning"],
    price: 3999,
    highlights: [
      "Professional photography guidance",
      "Access to exclusive viewpoints",
      "Equipment provided",
      "Photo editing workshop",
      "Digital photo album"
    ]
  }
];

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [adultCount, setAdultCount] = useState(1);
  const [childCount, setChildCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showHotelBooking, setShowHotelBooking] = useState(false);
  const [hotelBooking, setHotelBooking] = useState<any | null>(null);

  // Find the tour details from our tour packages
  const tourDetails = tourPackages.find(tour => {
    // Convert both to lowercase and remove any spaces for comparison
    const tourId = tour.id.toLowerCase().replace(/\s+/g, '-');
    const paramId = id?.toLowerCase().replace(/\s+/g, '-');
    console.log('Comparing tour IDs:', { tourId, paramId, originalId: tour.id, originalParamId: id });
    return tourId === paramId;
  });

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Log all available tour IDs for debugging
    console.log('Available tour IDs:', tourPackages.map(t => t.id));
    console.log('Current URL param ID:', id);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAdultCountChange = (increment: boolean) => {
    if (increment) {
      setAdultCount(prev => prev + 1);
    } else {
      setAdultCount(prev => (prev > 1 ? prev - 1 : 1));
    }
  };

  const handleChildCountChange = (increment: boolean) => {
    if (increment) {
      setChildCount(prev => prev + 1);
    } else {
      setChildCount(prev => (prev > 0 ? prev - 1 : 0));
    }
  };

  const calculateTotal = () => {
    if (!tourDetails) return 0;
    const tourTotal = tourDetails.price * adultCount;
    const hotelTotal = hotelBooking ? hotelBooking.price : 0;
    return tourTotal + hotelTotal;
  };

  const handleProceedToPayment = () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    // TODO: Implement payment flow
    toast.success("Proceeding to payment...");
  };

  const handleHotelSelection = (hotelId: string, roomId: string, checkIn: Date, checkOut: Date, roomPrice: number) => {
    setHotelBooking({
      hotelId,
      roomId,
      checkIn,
      checkOut,
      price: roomPrice
    });
    setShowHotelBooking(false); // Hide the hotel selection after booking
  };

  const handleRemoveHotelStay = () => {
    setHotelBooking(null);
    setShowHotelBooking(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!tourDetails) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ThemedNavbar />
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Tour Not Found</h1>
          <p className="text-muted-foreground mb-6">The tour you're looking for doesn't exist.</p>
          <Button 
            onClick={() => navigate('/tours')}
            className="bg-accent hover:bg-accent/90"
          >
            Back to Tours
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ThemedNavbar />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900">
        <img
          src={tourDetails.image}
          alt={tourDetails.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70">
          <div className="container-custom h-full flex items-center">
            <div className="text-white">
              <Button
                variant="outline"
                className="mb-6 bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => navigate('/tours')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Tours
              </Button>
              <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
                {tourDetails.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Star className="text-yellow-400 fill-yellow-400 mr-1" size={16} />
                  <span>{tourDetails.rating}</span>
                  <span className="text-gray-400 ml-1">({tourDetails.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1" size={16} />
                  <span>{tourDetails.highlights[0]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12">
        {/* Mobile Back Button */}
        <div className="lg:hidden mb-6">
          <Button
            onClick={() => navigate('/tours')}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tours
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tour Details */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                Tour Overview
              </h2>
              <p className="text-gray-600 mb-6">{tourDetails.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start gap-3">
                  <Clock className="text-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Duration</h3>
                    <p className="text-gray-600">{tourDetails.highlights[0]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="text-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Group Size</h3>
                    <p className="text-gray-600">Small groups of 2-8 people</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="text-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Location</h3>
                    <p className="text-gray-600">Agra, Uttar Pradesh, India</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Info className="text-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-900">Tour Type</h3>
                    <p className="text-gray-600">
                      {tourDetails.tags?.includes("best-seller") ? "Best Seller" :
                       tourDetails.tags?.includes("romantic") ? "Couples Special" :
                       tourDetails.tags?.includes("special") ? "Special Tour" : "Standard Tour"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-playfair font-bold text-gray-900">
                  Tour Highlights
                </h3>
                <ul className="space-y-2">
                  {tourDetails.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2"></div>
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Booking Form */}
            <Card className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Book Your Tour
              </h2>
              
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Select Date
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guest Count */}
              <div className="space-y-4 mt-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number of Adults (Above 11)
                  </label>
                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdultCount(Math.max(0, adultCount - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{adultCount}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdultCount(adultCount + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <Info size={16} />
                  Free cancellation up to 24 hours before the tour
                </p>
              </div>
            </Card>

            {/* Hotel Booking Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Hotel Stay
              </h2>
              {!showHotelBooking && !hotelBooking ? (
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowHotelBooking(true)}
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  Add Hotel Stay
                </Button>
              ) : (
                <div>
                  {hotelBooking ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Hotel:</span>
                        <span>{hotelBooking.hotelId}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Room:</span>
                        <span>{hotelBooking.roomId}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Check-in:</span>
                        <span>{hotelBooking.checkIn?.toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between text-gray-600">
                        <span>Check-out:</span>
                        <span>{hotelBooking.checkOut?.toLocaleDateString()}</span>
                      </div>
                      <Button variant="outline" onClick={handleRemoveHotelStay}>
                        Remove Hotel Stay
                      </Button>
                    </div>
                  ) : (
                    <HotelSelection
                      onHotelSelect={handleHotelSelection}
                      onRemoveHotelStay={handleRemoveHotelStay}
                    />
                  )}
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${calculateTotal()}</span>
                </div>
                <Button
                  className="w-full mt-6"
                  onClick={handleProceedToPayment}
                  disabled={!date}
                >
                  Proceed to Payment
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Receipt */}
          <div className="space-y-8">
            <Card className="p-6 sticky top-24">
              <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-6">
                Booking Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tour Price (per adult)</span>
                  <span>${tourDetails.price}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Number of Adults</span>
                  <span>{adultCount}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Duration</span>
                  <span>{tourDetails.highlights[0]}</span>
                </div>
                {date && (
                  <div className="flex justify-between text-gray-600">
                    <span>Selected Date</span>
                    <span>{format(date, "PPP")}</span>
                  </div>
                )}
                {hotelBooking && (
                  <>
                    <div className="flex justify-between text-gray-600">
                      <span>Hotel Stay</span>
                      <span>${hotelBooking.price}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Check-in</span>
                      <span>{hotelBooking.checkIn?.toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Check-out</span>
                      <span>{hotelBooking.checkOut?.toLocaleDateString()}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total Amount</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;