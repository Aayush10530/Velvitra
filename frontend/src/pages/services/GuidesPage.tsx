import { useEffect, useRef } from "react";
import ThemedNavbar from "../../components/ThemedNavbar";
import { Check, Star, Award, Globe, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const GuidesPage = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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
      quote: "Every corner of the Taj has a story. I love bringing those stories to life for my guests.",
      rating: 4.9,
      reviews: 156
    },
    {
      id: 2,
      name: "Priya Sharma",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      experience: "12 years",
      languages: ["English", "Hindi", "German", "Spanish"],
      specialization: "Art History",
      certification: "Archaeological Survey of India",
      quote: "I believe in creating immersive experiences that go beyond dates and facts to reveal the beauty of our heritage.",
      rating: 4.8,
      reviews: 142
    },
    {
      id: 3,
      name: "Mohammed Ali",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=400",
      experience: "10 years",
      languages: ["English", "Hindi", "Arabic", "Japanese"],
      specialization: "Historical Photography",
      certification: "Ministry of Tourism, Government of India",
      quote: "I specialize in helping photography enthusiasts capture the perfect shots while understanding the history behind them.",
      rating: 4.9,
      reviews: 128
    }
  ];

  const features = [
    "Government-certified professional guides",
    "Extensive knowledge of Mughal history and architecture",
    "Multilingual capabilities (English, French, Spanish, German, Japanese, and more)",
    "Personalized attention and flexible scheduling",
    "Expert photography guidance",
    "Deep understanding of local culture and traditions",
    "Access to exclusive areas and viewpoints",
    "Comprehensive historical context and storytelling",
    "Exceptional customer service and satisfaction focus",
    "Proven track record of exceeding visitor expectations",
    "Intuitive understanding of diverse tourist needs",
    "Ability to adapt tours based on visitor preferences"
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
            <h1 className="heading-xl mb-6">Licensed Tour Guides</h1>
            <div className="w-20 h-1 bg-accent mx-auto mb-8"></div>
            <p className="text-lg mb-8">
              Experience Agra's magnificent monuments through the eyes of our expert guides. 
              Each guide brings years of experience, deep knowledge, and a passion for sharing 
              the rich history of the Mughal era.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-center mb-12">Why Choose Our Guides?</h2>
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

      {/* Guides Section */}
      <section className="py-16 bg-primary/30">
        <div className="container-custom">
          <h2 className="heading-lg text-center mb-12">Meet Our Expert Guides</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-80 overflow-hidden">
                  <img 
                    src={guide.image} 
                    alt={guide.name} 
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-playfair text-xl font-semibold">{guide.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="font-medium">{guide.rating}</span>
                      <span className="text-sm text-muted-foreground">({guide.reviews})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-accent" />
                      <span>{guide.experience} Experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-accent" />
                      <span>{guide.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-accent" />
                      <span>{guide.specialization}</span>
                    </div>
                  </div>

                  <blockquote className="text-muted-foreground italic mb-6">
                    "{guide.quote}"
                  </blockquote>

                  <Link 
                    to={`/contact?guide=${guide.id}`}
                    className="btn-primary w-full text-center"
                  >
                    Book This Guide
                  </Link>
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
            <h2 className="heading-lg mb-6">Ready to Experience Agra with Our Expert Guides?</h2>
            <p className="text-lg mb-8">
              Book your tour today and let our knowledgeable guides bring the rich history of 
              the Taj Mahal and Agra's monuments to life.
            </p>
            <Link to="/contact" className="btn-primary">
              Book Your Tour
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GuidesPage; 