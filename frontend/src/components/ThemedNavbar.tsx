import { useState, useEffect } from "react";
import { Menu, X, Home, User } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthModal from "./AuthModal";
import { useAuth } from "@/context/AuthContext";

const ThemedNavbar = ({ showNavbar }: { showNavbar?: boolean }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: section } });
    } else {
      document.querySelector(section)?.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    // Handle scrolling when navigating from other pages
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        document.querySelector(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      // Clear the state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Determine navbar visibility and animation
  const isHomePage = location.pathname === '/';
  const shouldShowNavbar = isHomePage ? showNavbar : true;
  const navbarClasses = isHomePage 
    ? `fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        shouldShowNavbar 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-full'
      } ${isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"}`
    : `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`;

  return (
    <>
      <nav className={navbarClasses}>
        <div className="container-custom flex justify-between items-center py-4">
          <div className="flex flex-col">
            <Link to="/" className="text-3xl font-cinzel font-bold text-black">
              Velvitra
            </Link>
            <span className="text-base font-cormorant font-bold tracking-wider text-black">
              Walk the Path of Emperors
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" onClick={handleHomeClick} className="nav-link hover:text-accent transition-colors text-black">
              <Home size={16} />
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="nav-link hover:text-accent transition-colors text-black">
              About
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="nav-link hover:text-accent transition-colors text-black">
              Services
            </a>
            <a href="#tours" onClick={(e) => handleNavClick(e, '#tours')} className="nav-link hover:text-accent transition-colors text-black">
              Tours
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="nav-link hover:text-accent transition-colors text-black">
              Contact
            </a>

            {/* Conditionally render Auth or My Bookings button */}
            {!isLoading && (
              isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground border-accent"
                    onClick={() => navigate('/my-bookings')}
                  >
                    <User size={16} />
                    My Bookings
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-accent hover:text-red-500"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="flex items-center gap-2 bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground border-accent"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User size={16} />
                  Sign In / Register
                </Button>
              )
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Conditionally render Auth or My Bookings button for mobile */}
            {!isLoading && (
              isAuthenticated ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground border-accent"
                     onClick={() => {
                       navigate('/my-bookings');
                       setIsMobileMenuOpen(false);
                     }}
                  >
                     <User size={16} />
                    My Bookings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-accent hover:text-red-500"
                    onClick={() => logout()}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-accent/20 text-accent hover:bg-accent hover:text-accent-foreground border-accent"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  <User size={16} />
                  Sign In / Register
                </Button>
              )
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-background backdrop-blur-lg z-40 transition-transform duration-300 transform ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden pt-20`}
        >
          <div className="container-custom flex flex-col space-y-4 py-8">
            <a
              href="/"
              className="py-3 text-lg border-b border-border text-black flex items-center gap-2"
              onClick={handleHomeClick}
            >
              <Home size={18} />
              Home
            </a>
            <a
              href="#about"
              className="py-3 text-lg border-b border-border text-black"
              onClick={(e) => handleNavClick(e, '#about')}
            >
              About
            </a>
            <a
              href="#services"
              className="py-3 text-lg border-b border-border text-black"
              onClick={(e) => handleNavClick(e, '#services')}
            >
              Services
            </a>
            <a
              href="#tours"
              className="py-3 text-lg border-b border-border text-black"
              onClick={(e) => handleNavClick(e, '#tours')}
            >
              Tours
            </a>
            <a
              href="#contact"
              className="py-3 text-lg border-b border-border text-black"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Contact
            </a>

            {/* My Bookings link in mobile menu when authenticated */}
            {!isLoading && isAuthenticated && (
              <>
                <Link
                  to="/my-bookings"
                  className="py-3 text-lg border-b border-border text-black flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                   <User size={18} />
                  My Bookings
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start py-3 text-lg border-b border-border text-black flex items-center gap-2"
                  onClick={() => logout()}
                >
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  );
};

export default ThemedNavbar;
