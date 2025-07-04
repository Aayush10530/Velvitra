import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Building2, Bed, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { fadeUp, staggerContainer, buttonHover, imageReveal, parallaxEffect } from "@/lib/animations";

const defaultRoomImage = "https://images.unsplash.com/photo-1618773928121-c32242e63f39";

interface Room {
  id: string;
  name: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

interface Hotel {
  id: string;
  name: string;
  description: string;
  image: string;
  rooms: Room[];
}

const hotels: Hotel[] = [
  {
    id: "oberoi-amarvilas",
    name: "The Oberoi Amarvilas, Agra",
    description: "A luxury hotel offering unparalleled views of the Taj Mahal, located just 600 meters from the monument.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    rooms: [
      {
        id: "premier-room",
        name: "Premier Room",
        price: 450,
        capacity: 2,
        amenities: ["Garden View", "Luxury Amenities", "Free WiFi"],
        images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070"]
      },
      {
        id: "premier-balcony",
        name: "Premier Room with Balcony",
        price: 550,
        capacity: 2,
        amenities: ["Private Balcony", "Garden View", "Luxury Amenities"],
        images: ["https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2074"]
      },
      {
        id: "executive-suite",
        name: "Executive Suite",
        price: 800,
        capacity: 3,
        amenities: ["Living Area", "City Views", "Butler Service"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2074"]
      }
    ]
  },
  {
    id: "itc-mughal",
    name: "ITC Mughal, Agra",
    description: "Inspired by Mughal architecture, this sprawling resort offers a tranquil escape with lush gardens.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070",
    rooms: [
      {
        id: "mughal-room",
        name: "Mughal Room",
        price: 200,
        capacity: 2,
        amenities: ["Garden View", "Modern Amenities", "Free WiFi"],
        images: ["https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2074"]
      },
      {
        id: "mughal-chamber",
        name: "Mughal Chamber",
        price: 250,
        capacity: 2,
        amenities: ["Contemporary Design", "Enhanced Amenities", "Free WiFi"],
        images: ["https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=2074"]
      },
      {
        id: "presidential-suite",
        name: "Presidential Suite",
        price: 700,
        capacity: 4,
        amenities: ["Private Lounge", "Butler Service", "Premium Amenities"],
        images: ["https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=2074"]
      }
    ]
  }
];

interface HotelSelectionProps {
  onHotelSelect: (hotelId: string, roomId: string, checkIn: Date, checkOut: Date, roomPrice: number) => void;
  onRemoveHotelStay: () => void;
}

const HotelSelection = ({ onHotelSelect, onRemoveHotelStay }: HotelSelectionProps) => {
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);

  const handleHotelSelect = (hotelId: string) => {
    setSelectedHotel(hotelId);
    setSelectedRoom(null);
  };

  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
  };

  const handleBooking = () => {
    if (selectedHotel && selectedRoom && checkIn && checkOut) {
      const selectedHotelData = hotels.find(h => h.id === selectedHotel);
      const selectedRoomData = selectedHotelData?.rooms.find(r => r.id === selectedRoom);
      if (selectedRoomData) {
        onHotelSelect(selectedHotel, selectedRoom, checkIn, checkOut, selectedRoomData.price);
      }
    }
  };

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div 
        className="flex justify-between items-center"
        variants={fadeUp}
      >
        <h2 className="text-2xl font-bold">Hotel Booking</h2>
        <motion.div
          variants={buttonHover}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            variant="ghost"
            onClick={() => {
              onRemoveHotelStay();
              setSelectedHotel(null);
              setSelectedRoom(null);
              setCheckIn(undefined);
              setCheckOut(undefined);
            }}
            className="transition-all duration-300 hover:shadow-lg"
          >
            Remove Hotel Stay
          </Button>
        </motion.div>
      </motion.div>

      {/* Date Selection */}
      <motion.div 
        className="space-y-4"
        variants={fadeUp}
      >
        <h4 className="text-sm font-medium">Select Dates</h4>
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Calendar
              mode="range"
              selected={{
                from: checkIn,
                to: checkOut
              }}
              onSelect={(range) => {
                setCheckIn(range?.from);
                setCheckOut(range?.to);
              }}
              className="rounded-md border"
              numberOfMonths={3}
              disabled={(date) => date < new Date()}
            />
          </div>
        </div>
        <AnimatePresence>
          {(checkIn || checkOut) && (
            <motion.div 
              className="flex gap-4 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {checkIn && (
                <div>
                  <span className="font-medium">Check-in:</span>{" "}
                  {checkIn.toLocaleDateString()}
                </div>
              )}
              {checkOut && (
                <div>
                  <span className="font-medium">Check-out:</span>{" "}
                  {checkOut.toLocaleDateString()}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Hotel Selection */}
      <motion.div 
        className="space-y-6"
        variants={staggerContainer}
      >
        {hotels.map((hotel) => (
          <motion.div
            key={hotel.id}
            variants={fadeUp}
          >
            <Card
              className={cn(
                "p-1.5 cursor-pointer transition-all duration-300",
                selectedHotel === hotel.id && "ring-2 ring-accent shadow-lg"
              )}
              onClick={() => handleHotelSelect(hotel.id)}
            >
              <div className="flex gap-3 items-center">
                <motion.img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                  variants={imageReveal}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h3 className="text-base font-semibold">{hotel.name}</h3>
                  <p className="text-xs text-gray-600">{hotel.description}</p>
                </div>
              </div>

              <AnimatePresence>
                {selectedHotel === hotel.id && (
                  <motion.div
                    className="mt-2 border-t pt-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4 className="font-medium mb-2">Available Rooms</h4>
                    <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 w-full">
                      {hotel.rooms.map((room) => (
                        <motion.div
                          key={room.id}
                          className={cn(
                            "p-1.5 border rounded-md cursor-pointer relative group flex flex-col transition-all duration-300",
                            selectedRoom === room.id && "border-accent bg-accent/5 shadow-[0_0_15px_rgba(var(--accent),0.3)]"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRoomSelect(room.id);
                            const selectedHotelData = hotels.find(h => h.id === selectedHotel);
                            const selectedRoomData = selectedHotelData?.rooms.find(r => r.id === room.id);
                            if (selectedRoomData && checkIn && checkOut) {
                              onHotelSelect(selectedHotel!, room.id, checkIn, checkOut, selectedRoomData.price);
                              toast.success(`Selected room: ${room.name} for $${selectedRoomData.price}`);
                            } else {
                              toast.error("Please select both check-in and check-out dates.");
                            }
                          }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onMouseEnter={() => setHoveredRoom(room.id)}
                          onMouseLeave={() => setHoveredRoom(null)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium text-xs">{room.name}</h5>
                              <p className="text-xs text-gray-600 mt-1">
                                ${room.price.toLocaleString()} per night
                              </p>
                              <p className="text-xs text-gray-600">
                                {room.capacity} {room.capacity === 1 ? "person" : "people"}
                              </p>
                            </div>
                            <div className="flex-shrink-0 ml-1">
                              {room.images && room.images.length > 0 && (
                                <motion.img
                                  src={room.images[0]}
                                  alt={room.name}
                                  className="w-16 h-16 object-cover rounded-md"
                                  variants={imageReveal}
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              )}
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1 mt-1">
                            {room.amenities.map((amenity, index) => (
                              <motion.span
                                key={index}
                                className="px-1 py-0.5 bg-gray-100 rounded-full text-xs"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                {amenity}
                              </motion.span>
                            ))}
                          </div>

                          {/* Room Images Popup */}
                          <AnimatePresence>
                            {hoveredRoom === room.id && (
                              <motion.div
                                className="absolute z-50 left-0 right-0 top-full mt-0.5 w-full bg-white rounded-lg shadow-xl border p-1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="relative aspect-video rounded-md overflow-hidden">
                                  <motion.img
                                    src={room.images[0] || defaultRoomImage}
                                    alt={room.name}
                                    className="w-full h-full object-cover"
                                    variants={imageReveal}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                  />
                                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <ImageIcon className="w-8 h-8 text-white" />
                                  </div>
                                </div>
                                <p className="text-xs text-gray-600 mt-1 text-center">
                                  {room.name.includes("Suite") ?
                                    "Experience luxury in our spacious suite with premium amenities" :
                                  room.name.includes("Premier") ?
                                    "Enjoy premium comfort with stunning views" :
                                  room.name.includes("Deluxe") ?
                                    "Relax in our elegantly designed deluxe accommodation" :
                                  room.name.includes("Executive") ?
                                    "Business and comfort combined in our executive rooms" :
                                  room.name.includes("Club") ?
                                    "Exclusive access to club lounge and premium services" :
                                  room.name.includes("Standard") ?
                                    "Comfortable and well-appointed standard accommodation" :
                                    "View our beautiful room accommodations"}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default HotelSelection; 