import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-playfair font-bold text-2xl mb-6">Velvitra</h3>
            <p className="mb-6 text-white/70 leading-relaxed">
              Crafting exclusive, culturally rich experiences for discerning travelers seeking the true essence of royal India and timeless heritage.
            </p>
            <p className="text-white/70 text-sm mb-6">
              Govt. Approved Tour Operators
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/tours" className="text-white/70 hover:text-white transition-colors">Our Tours</Link>
              </li>
              <li>
                <Link to="#guides" className="text-white/70 hover:text-white transition-colors">Our Guides</Link>
              </li>
              <li>
                <Link to="#testimonials" className="text-white/70 hover:text-white transition-colors">Testimonials</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">Blog</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Popular Tours</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/tour/1" className="text-white/70 hover:text-white transition-colors">Sunrise Taj Tour</Link>
              </li>
              <li>
                <Link to="/tour/2" className="text-white/70 hover:text-white transition-colors">Full Day Heritage Tour</Link>
              </li>
              <li>
                <Link to="/tour/3" className="text-white/70 hover:text-white transition-colors">Moonlight Taj Tour</Link>
              </li>
              <li>
                <Link to="/tour/8" className="text-white/70 hover:text-white transition-colors">Photography Expedition</Link>
              </li>
              <li>
                <Link to="/custom-tour" className="text-white/70 hover:text-white transition-colors">Custom Tour Builder</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-6">Contact Details</h4>
            <ul className="space-y-3">
              <li className="text-white/70 leading-relaxed">
                Heritage Tower, 123 Taj Road
                <br />Agra, Uttar Pradesh 282001
                <br />India
              </li>
              <li>
                <a href="tel:+919876543210" className="text-white/70 hover:text-white transition-colors">+91 98765 43210</a>
              </li>
              <li>
                <a href="mailto:info@velvitra.com" className="text-white/70 hover:text-white transition-colors">info@velvitra.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Velvitra. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-white/70">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="#sitemap" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
