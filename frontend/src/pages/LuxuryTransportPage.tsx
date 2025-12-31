import { motion } from "framer-motion";
import { Car, Shield, Clock, Users, MapPin, Star } from "lucide-react";
import ThemedNavbar from "../components/ThemedNavbar";
import Footer from "../components/Footer";

const LuxuryTransportPage = () => {
  const vehicles = [
    {
      name: "Honda Amaze",
      description: "Ultimate luxury sedan with premium comfort and advanced technology",
      features: ["Leather interior", "Climate control", "Premium sound system", "WiFi hotspot"],
      image: "/heritage-uploads/",
      capacity: "2 passengers"
    },
    {
      name: "Toyota Innova",
      description: "Luxury SUV combining comfort with off-road capability",
      features: ["Panoramic roof", "Air suspension", "Terrain response system", "Premium audio"],
      image: "/heritage-uploads/agra fort.jpg",
      capacity: "5 passengers"
    },
    {
      name: "Urbania",
      description: "Premium MPV offering spacious comfort for groups",
      features: ["Captain seats", "Privacy glass", "Entertainment system", "Climate control"],
      image: "/heritage-uploads/mehtab bagh.jpg",
      capacity: "7 passengers"
    }
  ];

  const services = [
    {
      icon: <Car className="w-6 h-6" />,
      title: "Premium Fleet",
      description: "Modern, well-maintained luxury vehicles for your comfort"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Professional Drivers",
      description: "Experienced, courteous drivers with local expertise"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Service",
      description: "Round-the-clock availability for your convenience"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Group Transport",
      description: "Spacious vehicles for family and group travel"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Custom Routes",
      description: "Flexible itineraries tailored to your schedule"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "VIP Experience",
      description: "Premium amenities and personalized service"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ThemedNavbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img
            src="/heritage-uploads/car.jpg"
            alt="Luxury Transportation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-playfair font-bold mb-4"
          >
            Luxury Transportation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl max-w-2xl mx-auto"
          >
            Experience premium comfort and style with our luxury vehicle services
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12"
          >
            Our Premium Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-accent mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12"
          >
            Our Luxury Fleet
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                    <span className="text-accent font-medium flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {vehicle.capacity}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">{vehicle.description}</p>
                  <ul className="space-y-2">
                    {vehicle.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <span className="text-accent mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent text-white">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold mb-6"
          >
            Ready to Experience Luxury Travel?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg mb-8 max-w-2xl mx-auto"
          >
            Contact us to book your premium transportation service and enjoy a truly luxurious journey.
          </motion.p>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-block bg-white text-accent px-8 py-3 rounded-md font-semibold hover:bg-opacity-90 transition-colors"
          >
            Contact Us
          </motion.a>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LuxuryTransportPage; 