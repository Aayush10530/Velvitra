import { useEffect, useRef } from "react";

const AboutUs = () => {
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

  return (
    <section id="about" className="section-padding bg-primary/30" ref={sectionRef}>
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-accent-foreground/70 uppercase tracking-wider text-sm font-medium fade-in">Our Story</span>
          <h2 className="heading-lg mt-2 mb-6 fade-in">Heritage Luxury at Its Finest</h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-8 fade-in"></div>
          <p className="text-lg fade-in">
            Taj Heritage was founded by a team of passionate historians, travel enthusiasts, and local experts with a shared vision—to provide 
            discerning travelers with an unparalleled experience of Agra's magnificent monuments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="fade-in">
            <h3 className="heading-md mb-6">Our Vision</h3>
            <p className="mb-6">
              We believe that the true essence of the Taj Mahal and Agra's historical treasures can only be experienced through the lens of 
              knowledgeable guides who understand both the historical significance and the cultural nuances of these incredible monuments.
            </p>
            <p>
              Our luxury tours are designed for those who seek more than just sightseeing—for travelers who desire connection, understanding, and 
              an experience that transcends the ordinary.
            </p>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-lg fade-in">
            <img 
              src="/lovable-uploads/180c80d5-167b-4a09-901e-519cb9255112.png" 
              alt="Agra Fort at sunset" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-playfair text-lg">
                "Every stone has a story; every moment, a memory."
              </p>
            </div>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-lg order-last md:order-none fade-in">
            <img 
              src="https://images.unsplash.com/photo-1524613032530-449a5d94c285?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1000" 
              alt="Guide explaining history" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white font-playfair text-lg">
                "Knowledge transforms monuments into experiences."
              </p>
            </div>
          </div>

          <div className="fade-in">
            <h3 className="heading-md mb-6">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-accent flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </span>
                <div>
                  <h4 className="font-semibold mb-1">Authenticity</h4>
                  <p>We provide historically accurate and culturally sensitive experiences.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-accent flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </span>
                <div>
                  <h4 className="font-semibold mb-1">Excellence</h4>
                  <p>From our guides to our vehicles, we deliver the highest quality of service.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-accent flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </span>
                <div>
                  <h4 className="font-semibold mb-1">Personalization</h4>
                  <p>Each journey is tailored to your interests, pace, and preferences.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 rounded-full bg-accent flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                  <span className="h-2 w-2 rounded-full bg-white"></span>
                </span>
                <div>
                  <h4 className="font-semibold mb-1">Trust & Safety</h4>
                  <p>We prioritize your well-being through comprehensive safety measures while building lasting relationships through transparency and reliability.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
