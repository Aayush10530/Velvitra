import { useEffect, useRef } from "react";
import { User, Car, Hotel, Utensils, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("appear");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".fade-in");
    elements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <User size={32} />,
      title: "Licensed Tour Guides",
      description: "Our guides are certified by the Government of India and possess deep knowledge of Mughal history and architecture.",
      path: "/services/guides",
      features: [
        "Government-certified guides",
        "Expert knowledge of Mughal history",
        "Multilingual capabilities",
        "Personalized attention"
      ]
    },
    {
      icon: <Car size={32} />,
      title: "Luxury Transportation",
      description: "Travel in comfort with our fleet of air-conditioned, chauffeur-driven luxury vehicles.",
      path: "/services/transportation",
      features: [
        "Air-conditioned vehicles",
        "Professional chauffeurs",
        "Flexible scheduling",
        "Comfortable seating"
      ]
    },
    {
      icon: <Hotel size={32} />,
      title: "Premium Stays",
      description: "We partner with the finest accommodations in Agra to ensure your stay matches the luxury of your experience.",
      path: "/services/accommodations",
      features: [
        "Premium hotel partnerships",
        "Best location options",
        "Special rates for guests",
        "Luxury amenities"
      ]
    },
    {
      icon: <Utensils size={32} />,
      title: "Food & Dining Experiences",
      description: "Discover the rich culinary heritage of Agra with our curated dining experiences at the finest restaurants.",
      path: "/services/dining",
      features: [
        "Authentic Mughlai cuisine",
        "Fine dining restaurants",
        "Local food tours",
        "Cooking workshops"
      ]
    }
  ];

  return (
    <section id="services" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium fade-in">
            Our Services
          </span>
          <h2 className="heading-lg mt-2 mb-6 fade-in">
            Experience Agra in Luxury
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 fade-in"></div>
          <p className="text-lg fade-in">
            We provide a comprehensive suite of premium services designed to make your visit to 
            the Taj Mahal and Agra's other treasures as comfortable and enriching as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-primary/30 p-8 rounded-lg hover:shadow-lg transition-all fade-in group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-accent/20 p-4 rounded-full inline-block mb-6 group-hover:bg-accent/30 transition-colors">
                <div className="text-accent-foreground">{service.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features?.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={service.path}
                  className="inline-flex items-center text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
