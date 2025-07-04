import { useRef } from "react";
import ThemedNavbar from "../components/ThemedNavbar";
import Hero from "../components/Hero";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import TourPackages from "../components/TourPackages";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import InteractiveMap from "../components/InteractiveMap";
import FAQSection from "../components/FAQSection";
import LocalInsights from "../components/LocalInsights";
import NewsletterSignup from "../components/NewsletterSignup";
import BookingCalendar from "../components/BookingCalendar";

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mainRef} className="min-h-screen">
      <ThemedNavbar />
      <Hero />
      <section data-aos="fade-up">
         <AboutUs />
      </section>
      
       <section data-aos="fade-up" data-aos-delay="100">
         <Services />
       </section>
      
      {/* Image Gallery Section */}
      <section className="section-padding bg-white" data-aos="fade-up">
        <div className="container-custom">
          <ImageGallery />
        </div>
      </section>
      
      <section data-aos="fade-up" data-aos-delay="100">
        <TourPackages />
      </section>
      
      {/* Local Insights Section */}
      <section className="section-padding bg-white" data-aos="fade-up">
        <div className="container-custom">
          <LocalInsights />
        </div>
      </section>
      
      {/* Interactive Map Section - Moved here after GuideProfile and before Testimonials */}
      <section className="section-padding bg-muted/30" data-aos="fade-up">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-6" data-aos="fade-up">Explore Agra's Treasures</h2>
            <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="100">
              Discover the locations of Agra's most iconic monuments and plan your perfect visit.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="200">
            <InteractiveMap />
          </div>
        </div>
      </section>
      
      <section data-aos="fade-up">
        <Testimonials />
      </section>
      
      <section data-aos="fade-up" data-aos-delay="100">
        <ContactForm />
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
