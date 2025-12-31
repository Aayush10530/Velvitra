
import { useState } from "react";
import { Car, Users, ArrowRight, CheckCircle2, CircleDollarSign } from "lucide-react";

const TaxiBooking = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const vehicles = [
    {
      id: "sedan",
      type: "Premium Sedan",
      description: "Luxury sedan with ample comfort for couples and small families",
      capacity: "1-3 people",
      price: "$49 per day",
      features: ["Air conditioning", "Leather seats", "Professional chauffeur", "Bottled water"],
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000"
    },
    {
      id: "suv",
      type: "Luxury SUV",
      description: "Spacious SUV providing comfort for families and small groups",
      capacity: "4-6 people",
      price: "$79 per day",
      features: ["Air conditioning", "Leather seats", "Professional chauffeur", "Bottled water", "Extra luggage space"],
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000"
    },
    {
      id: "minivan",
      type: "Luxury Minivan",
      description: "Premium minivan for larger groups with maximum comfort",
      capacity: "7-10 people",
      price: "$129 per day",
      features: ["Air conditioning", "Premium seating", "Professional chauffeur", "Bottled water", "Extra luggage space", "Entertainment system"],
      image: "https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000"
    }
  ];

  return (
    <section id="taxi" className="section-padding bg-primary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium fade-in">
            Luxury Transportation
          </span>
          <h2 className="heading-lg mt-2 mb-6 fade-in">
            Premium Vehicle Services
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 fade-in"></div>
          <p className="text-lg fade-in">
            Travel in style with our fleet of luxury vehicles. Each comes with a professional, 
            English-speaking chauffeur familiar with Agra's heritage sites and best routes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <div 
              key={vehicle.id} 
              className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all fade-in ${
                selectedVehicle === vehicle.id ? "ring-2 ring-accent" : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedVehicle(vehicle.id)}
            >
              <div className="relative h-48">
                <img 
                  src={vehicle.image} 
                  alt={vehicle.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full font-medium text-sm">
                  {vehicle.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <Car className="text-accent" size={18} />
                  <h3 className="font-playfair text-xl font-semibold">{vehicle.type}</h3>
                </div>
                
                <div className="flex items-center gap-2 text-sm mb-4">
                  <Users size={16} />
                  <span>{vehicle.capacity}</span>
                </div>
                
                <p className="mb-4 text-gray-700">{vehicle.description}</p>
                
                <div className="space-y-2 mb-6">
                  {vehicle.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="text-accent" size={16} />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <CircleDollarSign size={18} />
                    <span>{vehicle.price}</span>
                  </div>
                  <button className={`btn-primary py-2 inline-flex items-center ${
                    selectedVehicle === vehicle.id ? "bg-gold" : ""
                  }`}>
                    {selectedVehicle === vehicle.id ? "Selected" : "Select"}
                    {selectedVehicle !== vehicle.id && <ArrowRight size={16} className="ml-2" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary inline-flex items-center">
            Book Transportation
            <ArrowRight className="ml-2" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TaxiBooking;
