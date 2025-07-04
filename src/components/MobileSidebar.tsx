import { useState, useEffect } from "react";
import { X, Home } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const navigate = useNavigate();
  
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background bg-opacity-50">
      <div className="container-custom pt-5 flex flex-col h-full w-1/2">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6 text-xl">
          <a href="/" className="font-medium hover:text-accent transition-colors py-2 flex items-center" onClick={handleHomeClick}>
            <Home size={20} className="mr-2" />
            Home
          </a>
          <NavItem href="#about" onClick={onClose}>About</NavItem>
          <NavItem href="#services" onClick={onClose}>Services</NavItem>
          <NavItem href="/tours" isRoute={true} onClick={onClose}>Tours</NavItem>
          <NavItem href="/custom-tour" isRoute={true} onClick={onClose}>Custom Tour</NavItem>
          <div className="border-t border-border my-4"></div>
          <NavItem href="#testimonials" onClick={onClose}>Testimonials</NavItem>
        </div>
        
        <div className="mt-auto pb-10">
          <a 
            href="#contact" 
            className="btn-primary block text-center py-3"
            onClick={onClose}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ 
  href, 
  children, 
  onClick, 
  isRoute = false,
  icon
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick: () => void;
  isRoute?: boolean;
  icon?: React.ReactNode;
}) => {
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (isRoute) {
      e.preventDefault();
      navigate(href);
    }
    onClick();
  };
  
  return (
    <a 
      href={href}
      className="font-medium hover:text-accent transition-colors py-2 flex items-center" 
      onClick={handleClick}
    >
      {icon}
      {children}
    </a>
  );
};

export default MobileSidebar;
