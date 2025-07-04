import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import HotelCard from '../components/HotelCard';
import ThemedNavbar from '../components/ThemedNavbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const hotels = [
  {
    name: "The Oberoi Amarvilas, Agra",
    description:
      "A luxury hotel offering unparalleled views of the Taj Mahal, located just 600 meters from the monument. Features Mughal-inspired architecture, exquisite dining, and world-class service.",
    images: [
      "/images/hotels/oberoi_amarvilas_1.jpg",
      "/images/hotels/oberoi_amarvilas_2.jpg",
      "/images/hotels/oberoi_amarvilas_3.jpg",
    ],
    roomTypes: [
      { name: "Premier Room", price: 450, description: "Luxurious room with garden or pool view." },
      { name: "Premier Room with Balcony", price: 550, description: "Elegant room with private balcony and garden/pool view." },
      { name: "Executive Suite", price: 800, description: "Spacious suite with living area and city views." },
    ],
    distanceFromMonument: "0.6 km",
  },
  {
    name: "ITC Mughal, a Luxury Collection Resort & Spa, Agra",
    description:
      "Inspired by Mughal architecture, this sprawling resort offers a tranquil escape with lush gardens, award-winning spa, and multiple dining options. Approximately 3 km from the Taj Mahal.",
    images: [
      "/images/hotels/itc_mughal_1.jpg",
      "/images/hotels/itc_mughal_2.jpg",
      "/images/hotels/itc_mughal_3.jpg",
    ],
    roomTypes: [
      { name: "Mughal Room", price: 200, description: "Comfortable room with garden view." },
      { name: "Mughal Chamber", price: 250, description: "Larger room with contemporary amenities." },
      { name: "Presidential Suite", price: 700, description: "Opulent suite with dedicated lounge and butler service." },
    ],
    distanceFromMonument: "3 km",
  },
  {
    name: "Taj Hotel & Convention Centre, Agra",
    description:
      "A modern and expansive hotel close to the Taj Mahal, featuring large rooms, a rooftop infinity pool, and a convention center. Approximately 1.5 km from the Taj Mahal.",
    images: [
      "/images/hotels/taj_convention_1.jpg",
      "/images/hotels/taj_convention_2.jpg",
      "/images/hotels/taj_convention_3.jpg",
    ],
    roomTypes: [
      { name: "Superior Room", price: 150, description: "Comfortable room with all modern amenities." },
      { name: "Deluxe Room", price: 180, description: "Spacious room with city or pool view." },
      { name: "Junior Suite", price: 300, description: "Larger suite with separate living area." },
    ],
    distanceFromMonument: "1.5 km",
  },
  {
    name: "Jaypee Palace Hotel & Convention Centre",
    description:
      "Spread across 25 acres of lush landscaped gardens, this luxurious hotel is a perfect blend of Mughal and contemporary architecture. It is located around 2.5 km from the Taj Mahal.",
    images: [
      "/images/hotels/jaypee_palace_1.jpg",
      "/images/hotels/jaypee_palace_2.jpg",
      "/images/hotels/jaypee_palace_3.jpg",
    ],
    roomTypes: [
      { name: "Deluxe Room", price: 130, description: "Well-appointed room with garden or pool view." },
      { name: "Executive Room", price: 160, description: "Spacious room with upgraded amenities." },
      { name: "Taj Club Room", price: 280, description: "Exclusive access to club lounge and other benefits." },
    ],
    distanceFromMonument: "2.5 km",
  },
  {
    name: "Radisson Hotel Agra",
    description:
      "A contemporary hotel offering comfortable accommodation and modern facilities, including an outdoor pool and multiple dining options. It is approximately 4 km from the Taj Mahal.",
    images: [
      "/images/hotels/radisson_agra_1.jpg",
      "/images/hotels/radisson_agra_2.jpg",
      "/images/hotels/radisson_agra_3.jpg",
    ],
    roomTypes: [
      { name: "Standard Room", price: 100, description: "Comfortable room with essential amenities." },
      { name: "Superior Room", price: 120, description: "Larger room with enhanced features." },
      { name: "Executive Suite", price: 200, description: "Spacious suite with living area and city views." },
    ],
    distanceFromMonument: "4 km",
  },
  {
    name: "Hotel Clarks Shiraz",
    description:
      "One of Agra's oldest and most renowned hotels, offering a blend of traditional hospitality and modern comforts. Located about 2 km from the Taj Mahal.",
    images: [
      "/images/hotels/clarks_shiraz_1.jpg",
      "/images/hotels/clarks_shiraz_2.jpg",
      "/images/hotels/clarks_shiraz_3.jpg",
    ],
    roomTypes: [
      { name: "Standard Room", price: 90, description: "Classic room with garden or city view." },
      { name: "Deluxe Room", price: 110, description: "Recently renovated room with modern decor." },
      { name: "Club Room", price: 180, description: "Spacious room with club lounge access." },
    ],
    distanceFromMonument: "2 km",
  },
];

const HotelsPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <ThemedNavbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-20">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back
        </Button>
        <h1 className="text-4xl font-bold text-center mb-10">Our Partner Hotels</h1>
        <div className="grid gap-8">
          {hotels.map((hotel, index) => (
            <div key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <HotelCard {...hotel} />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelsPage; 