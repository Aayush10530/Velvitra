
import { useEffect, useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
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

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "United States",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      quote: "Our tour guide Rajesh made the Taj Mahal come alive with stories and historical context I never would have discovered on my own. The private sunrise tour was absolutely magical and worth every penny!"
    },
    {
      id: 2,
      name: "James & Emma Wilson",
      country: "United Kingdom",
      image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      quote: "We've traveled to many UNESCO sites, but our experience with Taj Heritage stands out as the most personalized and informative. Their attention to detail and knowledge of Mughal history transformed our visit."
    },
    {
      id: 3,
      name: "Hiroshi Tanaka",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      quote: "Having a Japanese-speaking guide made all the difference for our family. Mohammed was incredibly knowledgeable and patient, and the luxury vehicle was a welcome comfort in the heat."
    },
    {
      id: 4,
      name: "Clara & Thomas Schmidt",
      country: "Germany",
      image: "https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      quote: "The Moonlight Tour was an unforgettable experience. Seeing the Taj Mahal under the stars gave us a completely different perspective, and our guide's stories made it even more magical."
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section-padding bg-white" ref={sectionRef}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium fade-in">
            Client Stories
          </span>
          <h2 className="heading-lg mt-2 mb-6 fade-in">
            Unforgettable Experiences
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 fade-in"></div>
          <p className="text-lg fade-in">
            Discover what our guests from around the world have to say about their tours with Taj Heritage.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto fade-in">
          <div className="bg-primary/30 rounded-2xl p-8 md:p-12 relative">
            <Quote className="text-accent absolute top-8 left-8 opacity-20" size={60} />
            
            <div className="relative z-10">
              <div className="mb-8 text-lg md:text-xl italic">
                "{testimonials[activeIndex].quote}"
              </div>
              
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-playfair font-semibold text-lg">{testimonials[activeIndex].name}</h4>
                  <p className="text-accent-foreground/70">{testimonials[activeIndex].country}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-4">
            <button 
              onClick={prevTestimonial}
              className="h-10 w-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full ${
                    index === activeIndex ? "bg-accent" : "bg-accent/30"
                  } transition-colors`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="h-10 w-10 rounded-full bg-accent/20 hover:bg-accent flex items-center justify-center transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
