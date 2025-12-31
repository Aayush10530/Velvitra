import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RoomType {
  name: string;
  price: number;
  description: string;
}

interface HotelCardProps {
  name: string;
  description: string;
  images: string[];
  roomTypes: RoomType[];
  distanceFromMonument: string;
}

const HotelCard: React.FC<HotelCardProps> = ({ name, description, images, roomTypes, distanceFromMonument }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden mb-8">
      <CardHeader className="p-0 relative">
        <img 
          src={images[currentImageIndex]}
          alt={name}
          className="w-full h-80 object-cover"
        />
        {images.length > 1 && (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={prevImage} 
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
            >
              &lt;
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={nextImage} 
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white hover:bg-opacity-75"
            >
              &gt;
            </Button>
          </>
        )}
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-3xl font-bold mb-2">{name}</CardTitle>
        <p className="text-gray-600 text-sm mb-4">{distanceFromMonument} from major monuments</p>
        <p className="text-gray-700 mb-6">{description}</p>

        <h3 className="text-2xl font-semibold mb-4">Room Types & Pricing</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roomTypes.map((room, index) => (
            <div key={index} className="border p-4 rounded-md">
              <h4 className="text-xl font-medium mb-1">{room.name}</h4>
              <p className="text-lg font-bold text-primary mb-2">${room.price.toFixed(2)} / night</p>
              <p className="text-gray-600">{room.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard; 