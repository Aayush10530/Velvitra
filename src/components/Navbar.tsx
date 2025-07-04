import { useState, useEffect } from 'react';
import { Menu, X, Phone, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MobileSidebar from './MobileSidebar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-lg border-b-2 border-gold/80 ${scrolled ? 'bg-white/80 shadow-lg py-3' : 'bg-white/60 py-5'}`}
        style={{ boxShadow: scrolled ? '0 4px 24px 0 rgba(44, 44, 84, 0.08)' : 'none' }}
      >
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className="flex flex-col">
            <span className="font-cinzel font-bold text-2xl text-foreground tracking-tight">Velvitra</span>
            <span className="text-xs text-gold font-cormorant font-bold mt-0.5 tracking-wide">Walk the Path of Emperors</span>
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLinks onHomeClick={handleHomeClick} />
            <a href="#contact" className="flex items-center gap-2 btn-primary shadow-md hover:shadow-lg transition-all">
              <Phone size={16} />
              <span>Reserve Your Experience</span>
            </a>
          </div>
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-foreground"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>
      {/* Luxury Divider for Desktop */}
      <div className="hidden lg:block luxury-divider" />
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

const NavLinks = ({ onHomeClick }: { onHomeClick: (e: React.MouseEvent) => void }) => {
  const links = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Tours', href: '#tours' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <div className="flex gap-8">
      {links.map(link => (
        link.name === 'Home' ? (
          <a
            key={link.name}
            href="/"
            className="font-medium hover:text-gold transition-colors flex items-center gap-1"
            onClick={onHomeClick}
          >
            <Home size={16} />
            {link.name}
          </a>
        ) : link.isRoute ? (
          <Link
            key={link.name}
            to={link.href}
            className="font-medium hover:text-gold transition-colors flex items-center gap-1"
          >
            {link.name}
          </Link>
        ) : (
          <a
            key={link.name}
            href={link.href}
            className="font-medium hover:text-gold transition-colors"
          >
            {link.name}
          </a>
        )
      ))}
    </div>
  );
};

export default Navbar;
