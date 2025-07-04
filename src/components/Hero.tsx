import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2000')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Hero Content */}
      <div className="container-custom relative h-full flex flex-col justify-center">
        <div className="max-w-3xl animate-fade-in [animation-delay:300ms]">
          <h1 className="text-white heading-xl mb-4 font-cinzel">
            Velvitra
          </h1>
          <p className="text-white/90 text-lg md:text-xl mb-8 font-cormorant font-bold">
            Walk the Path of Emperors
          </p>
          <p className="text-white/90 text-base md:text-lg mb-8 font-cormorant italic font-semibold">
            Inspired by the timeless elegance of velvet trails and imperial journeys, Velvitra crafts experiences that echo the footsteps of royalty. Each journey is thoughtfully curated to blend history, luxury, and exclusivity, inviting you to walk where emperors once roamed and to discover the grandeur of a bygone era—reimagined for the discerning traveler.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#tours"
              className="btn-primary inline-flex items-center justify-center"
            >
              Explore Our Tours
              <ArrowRight className="ml-2" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
