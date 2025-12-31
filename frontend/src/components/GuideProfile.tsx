
import { useEffect, useRef } from "react";
import { Globe, MessageSquare, Award } from "lucide-react";

const GuideProfile = () => {
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

  const guides = [
    {
      id: 1,
      name: "Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      experience: "15+ years",
      languages: ["English", "Hindi", "French"],
      specialization: "Mughal Architecture",
      certification: "Ministry of Tourism, Government of India",
      quote: "Every corner of the Taj has a story. I love bringing those stories to life for my guests."
    },
    {
      id: 2,
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      experience: "12 years",
      languages: ["English", "Hindi", "German", "Spanish"],
      specialization: "Art History",
      certification: "Archaeological Survey of India",
      quote: "I believe in creating immersive experiences that go beyond dates and facts to reveal the beauty of our heritage."
    },
    {
      id: 3,
      name: "Mohammed Ali",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      experience: "10 years",
      languages: ["English", "Hindi", "Arabic", "Japanese"],
      specialization: "Historical Photography",
      certification: "Ministry of Tourism, Government of India",
      quote: "I specialize in helping photography enthusiasts capture the perfect shots while understanding the history behind them."
    }
  ];

  return (
    <section id="guides" className="section-padding bg-primary/30" ref={sectionRef}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium fade-in">
            Our Team
          </span>
          <h2 className="heading-lg mt-2 mb-6 fade-in">
            Meet Our Expert Guides
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 fade-in"></div>
          <p className="text-lg fade-in">
            Our guides are the heart of our experience, bringing vast knowledge, passion, and friendly professionalism to every tour.
            Each guide is government-certified with years of experience and deep expertise in Agra's historical treasures.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {guides.map((guide, index) => (
            <div 
              key={guide.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-80 overflow-hidden">
                <img 
                  src={guide.image} 
                  alt={guide.name} 
                  className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-playfair text-xl font-semibold mb-2">{guide.name}</h3>
                <p className="text-accent-foreground/70 mb-4">{guide.experience} Experience</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <Globe size={18} className="text-accent-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Languages</h4>
                      <p className="text-sm">{guide.languages.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award size={18} className="text-accent-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Specialization</h4>
                      <p className="text-sm">{guide.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MessageSquare size={18} className="text-accent-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">Quote</h4>
                      <p className="text-sm italic">"{guide.quote}"</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-accent-foreground/70">Certified by</span>
                    <span className="text-sm font-medium">{guide.certification}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideProfile;
