import { useEffect, useRef } from "react";
import ThemedNavbar from "../../components/ThemedNavbar";
import { Check, ArrowLeft, Car, Shield, Clock, Users, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const TransportationPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fleet = [
    {
      id: 1,
      name: "Luxury Sedan",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000",
      capacity: "3-4 passengers",
      features: [
        "Premium leather seats",
        "Climate control",
        "Entertainment system",
        "WiFi connectivity"
      ],
      description: "Perfect for small groups or couples seeking comfort and style."
    },
    {
      id: 2,
      name: "Premium SUV",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000",
      capacity: "6-7 passengers",
      features: [
        "Spacious interior",
        "Third-row seating",
        "Advanced safety features",
        "Premium sound system"
      ],
      description: "Ideal for families or small groups looking for extra space and comfort."
    },
    {
      id: 3,
      name: "Luxury Van",
      image: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000",
      capacity: "12-14 passengers",
      features: [
        "Executive seating",
        "Multiple climate zones",
        "Entertainment system",
        "Luggage space"
      ],
      description: "Perfect for larger groups or corporate tours requiring maximum comfort."
    }
  ];

  const features = [
    "Professional, experienced chauffeurs",
    "Air-conditioned vehicles",
    "Regular maintenance and safety checks",
    "Flexible scheduling and booking",
    "Complimentary bottled water",
    "Free WiFi in all vehicles",
    "Child safety seats available",
    "24/7 customer support",
    "GPS tracking for safety",
    "Luxury amenities and comfort features",
    "Multiple vehicle options for different group sizes",
    "Door-to-door service"
  ];

  return (
    <div ref={mainRef} className="min-h-screen">
      <ThemedNavbar />
      
      {/* Back to Home Button */}
      <div className="container-custom pt-24">
        <Link 
          to="/" 
          className="inline-flex items-center text-accent hover:text-accent/80 transition-colors font-medium mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={16} />
          Back to Home
        </Link>
      </div>
      
      {/* Hero Section */}
      <section className="pb-16 bg-primary/30">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-xl mb-6">Luxury Transportation</h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg mb-8">
              Travel in comfort and style with our premium fleet of vehicles. Our professional 
              chauffeurs ensure a safe, comfortable, and luxurious journey throughout your stay in Agra.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">Why Choose Our Transportation?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="h-6 w-6 text-accent shrink-0 mt-1" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-16 bg-primary/30">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Our Premium Fleet</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fleet.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-2">{vehicle.name}</h3>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-accent" />
                      <span>{vehicle.capacity}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-accent" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-lg mb-6">Experience Luxury Travel in Agra</h2>
            <p className="text-lg mb-8">
              Our premium fleet of vehicles ensures a comfortable, safe, and luxurious journey 
              throughout your stay in Agra. Contact us to learn more about our transportation services.
            </p>
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TransportationPage; 