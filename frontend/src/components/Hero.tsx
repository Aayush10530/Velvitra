import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const [showContent, setShowContent] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handler for showing content at 25% video duration
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && !showContent && video.duration && video.currentTime >= video.duration * 0.25) {
      setShowContent(true);
    }
  };

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden pt-16">
      {/* Hero Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/The%20Taj.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Hero Content */}
      <div className={`container-custom relative h-full flex flex-col justify-end z-20 transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="max-w-3xl mx-auto flex flex-col items-center mb-12 md:mb-20 animate-fade-in [animation-delay:300ms]">
          <h1 className="text-white heading-xl mb-1 font-cinzel text-center">Velvitra</h1>
          <p className="text-white text-lg md:text-xl mb-8 font-cormorant font-bold text-center">Walk the Path of Emperors</p>
          
          {/* Brief Website Explanation */}
          <div className="text-center mb-8">
            <p className="text-white/90 text-base md:text-lg font-cormorant italic mb-2">
              <b>Your premier gateway to the timeless wonders of Agra</b>
            </p>
            <p className="text-white/90 text-base md:text-lg font-cormorant italic">
              <b>Experience luxury, history, and authentic cultural immersion</b>
            </p>
          </div>
          
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
