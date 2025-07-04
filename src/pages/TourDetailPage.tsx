import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import ThemedNavbar from "@/components/ThemedNavbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Clock, Calendar, Bed, DollarSign, Info, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TourHighlights from "@/components/TourHighlights";
import BookingCalendar from "@/components/BookingCalendar";

// Tour data - this would typically come from a database
const tourData = [
  {
    id: "taj-mahal-sunrise-tour",
    title: "Taj Mahal Sunrise Tour",
    description: "Experience the magic of the Taj Mahal at dawn, when the first rays of sunlight illuminate the marble monument, creating a breathtaking golden glow.",
    longDescription: "Enjoy a serene morning as you witness the Taj Mahal changing colors with the rising sun. This private tour provides ample time for photography and peaceful contemplation of this wonder of the world. Our expert guide will share detailed insights about the monument's history, architecture, and the love story behind its creation.",
    image: "/heritage-uploads/taj rise.jpg",
    rating: 4.9,
    reviews: 124,
    timing: "6:00 AM - 9:00 AM",
    accommodation: "Guide (25+ years of experience), Entry tickets, Personalized Ride Services",
    price: 179,
    people: "1-3",
    tags: ["best-seller"],
    highlights: [
      "Beat the crowds with early morning access",
      "Witness the changing colors of the Taj at sunrise",
      "Expert historical commentary from our guides",
      "Perfect lighting conditions for photography",
      "Complimentary hotel pickup and drop-off",
      "Small group size for personalized experience"
    ]
  },
  {
    id: "royal-mughal-heritage",
    title: "Royal Mughal Heritage Tour",
    description: "Immerse yourself in the rich history of the Mughal Empire with visits to all major monuments in Agra, accompanied by expert historical commentary.",
    longDescription: "This comprehensive tour takes you through the magnificent Mughal heritage of Agra. Visit the iconic Taj Mahal, the impressive Agra Fort, the beautiful Itimad-ud-Daulah (Baby Taj), the Sikandra and the stunning redstone city of Fatehpur Sikri. Our knowledgeable guide will narrate fascinating stories of the Mughal era, bringing history to life as you explore these architectural marvels.",
    image: "/heritage-uploads/all.jpg",
    rating: 4.8,
    reviews: 98,
    timing: "8:00 AM - 5:00 PM",
    accommodation: "Expert historian guide, All entry tickets, Luxury air-conditioned vehicle, Lunch at traditional restaurant",
    price: 250,
    people: "2-6",
    tags: [],
    highlights: [
      "Visit all major Mughal monuments in one day",
      "Insights into the architecture and history",
      "Lunch at a traditional restaurant",
      "Luxury air-conditioned transportation",
      "Skip-the-line entry tickets included",
      "Complimentary bottled water throughout the day"
    ]
  },
  {
    id: "taj-mahal-by-moonlight",
    title: "Taj Mahal by Moonlight",
    description: "Witness the ethereal beauty of the Taj Mahal under the moonlight during special night viewing sessions, a rare and magical experience.",
    longDescription: "Experience the Taj Mahal in a completely different light - moonlight. This exclusive tour is available only on full moon nights and few days before and after. The marble mausoleum takes on an ethereal glow in the moonlight, creating a magical atmosphere that few tourists get to experience. Our guide will share stories and legends that add to the mystical experience.",
    image: "/lovable-uploads/38db1722-ab1f-44d2-bfc1-95605b191003.png",
    rating: 5.0,
    reviews: 56,
    timing: "8:30 PM - 10:30 PM (Available only on full moon nights)",
    accommodation: "Special night entry permits, Expert guide, Luxury transfer service",
    price: 220,
    people: "1-4",
    tags: [],
    highlights: [
      "Exclusive night viewing of the Taj Mahal",
      "Mystical atmosphere under moonlight",
      "Smaller crowds than daytime visits",
      "Special night photography opportunities",
      "Rare experience only available on select nights",
      "Expert guidance on night photography techniques"
    ]
  },
  {
    id: "imperial-agra-day-tour",
    title: "Imperial Agra Day Tour",
    description: "Our most authentic experience visiting the two most iconic monuments of Agra with expert historical insights and plenty of time for photography.",
    longDescription: "Experience the grandeur of Agra's most iconic monuments in a single day. Visit the Taj Mahal, Agra Fort, and other historical sites with our expert guides. This comprehensive tour provides in-depth insights into the Mughal architecture and history while ensuring you have ample time for photography and exploration.",
    image: "/heritage-uploads/taj fort.jpg",
    rating: 4.7,
    reviews: 45,
    tags: ["best-tour"],
    price: 195,
    people: "2-8",
    highlights: [
      "In-depth tour of the Taj Mahal and Agra Fort",
      "Professional photography guidance",
      "Historical insights from expert guides",
      "Comfortable, air-conditioned transportation",
      "Skip-the-line entry tickets",
      "Lunch at a heritage restaurant"
    ]
  },
  {
    id: "romantic-taj-experience",
    title: "Romantic Taj Experience for Couples",
    description: "A special tour designed exclusively for couples to experience the eternal monument of love with romantic elements and private moments.",
    longDescription: "Create unforgettable memories with your loved one at the world's most romantic monument. This exclusive tour includes private viewing of the Taj Mahal, a romantic photo session, couple's spa treatment, candlelight dinner, and luxury hotel stay. Perfect for honeymooners or couples celebrating special occasions.",
    image: "/heritage-uploads/romantic-taj-couples.jpg",
    rating: 4.9,
    reviews: 89,
    timing: "Flexible timing based on your preference",
    accommodation: "Luxury hotel stay, Private guide, Luxury transportation, All entry tickets",
    price: 7999,
    people: "2",
    tags: ["romantic", "couples"],
    highlights: [
      "Private viewing of the Taj Mahal",
      "Romantic photo session",
      "Couple's spa treatment",
      "Candlelight dinner",
      "Luxury hotel stay"
    ]
  }
];

const TourDetailPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      // Scroll to top when component mounts
      window.scrollTo(0, 0);
      // Find the tour with the matching id
      const foundTour = tourData.find(t => t.id === id);
      if (foundTour) {
        setTour(foundTour);
      } else {
        setError("Tour not found");
      }
    } catch (err) {
      setError("An error occurred while loading the tour");
      console.error(err);
    }
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ThemedNavbar />
      
      <section className="pt-32 pb-16">
        <div className="container-custom">
          <Link 
            to="/tours"
            className="inline-flex items-center mb-8 text-accent hover:text-accent/80 transition-colors"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Tours
          </Link>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <article className="w-full">
              <div className="h-[400px] rounded-xl overflow-hidden mb-6">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              
              <h1 className="font-playfair text-4xl font-bold mb-4">{tour.title}</h1>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                 <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor"/>
                 <span>{tour.rating} ({tour.reviews} reviews)</span>
              </div>

              <p className="text-lg text-gray-700 mb-6 leading-relaxed">{tour.longDescription}</p>

              <h2 className="font-playfair text-2xl font-semibold mb-4">Tour Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 mb-8">
                 <div className="flex items-center gap-2">
                     <Clock size={20} className="text-accent"/>
                     <span>{tour.timing}</span>
                 </div>
                  <div className="flex items-center gap-2">
                     <Users size={20} className="text-accent"/>
                     <span>Group Size: {tour.people}</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <Bed size={20} className="text-accent"/>
                     <span>{tour.accommodation}</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <DollarSign size={20} className="text-accent"/>
                     <span>Price: ₹{tour.price} per person</span>
                 </div>
              </div>

              <h2 className="font-playfair text-2xl font-semibold mb-4">Highlights</h2>
              <TourHighlights highlights={tour.highlights} />
            </article>
            
            <aside className="w-full">
              <Card className="p-6 shadow-lg">
                <CardContent className="p-0">
                  <h3 className="font-playfair text-xl font-semibold mb-4">Book This Tour</h3>
                  <BookingCalendar tourId={tour.id} />
                  <Button 
                    className="w-full mt-6 h-12 text-lg bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-[1.02]"
                    onClick={() => navigate(`/tour/${tour.id}/book`)}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
      
      <Footer />

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 md:hidden">
        <Button 
          className="w-full"
          onClick={() => navigate(`/tour/${id}/book`)}
        >
          Book Now
        </Button>
      </div>

      <div className="hidden md:block">
        <Button 
          className="w-full"
          onClick={() => navigate(`/tour/${id}/book`)}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default TourDetailPage;
