import { HardHat, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t bg-primary text-primary-foreground">
    <div className="container py-12 grid gap-8 md:grid-cols-3">
      <div>
        <div className="flex items-center gap-2 font-display text-xl font-bold mb-4">
          <HardHat className="h-6 w-6" />
          CivilPro
        </div>
        <p className="text-sm opacity-80 leading-relaxed">
          Professional civil engineering services — from concept to completion. Delivering excellence in construction management, infrastructure, and quantity surveying.
        </p>
      </div>

      <div>
        <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
        <nav className="flex flex-col gap-2 text-sm opacity-80">
          <Link to="/" className="hover:opacity-100 transition-opacity">Home</Link>
          <Link to="/about" className="hover:opacity-100 transition-opacity">About</Link>
          <Link to="/resume" className="hover:opacity-100 transition-opacity">Resume</Link>
          <Link to="/testimonials" className="hover:opacity-100 transition-opacity">Testimonials</Link>
          <Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link>
        </nav>
      </div>

      <div>
        <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
        <div className="flex flex-col gap-3 text-sm opacity-80">
          <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +1 (555) 123-4567</div>
          <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> info@civilpro.com</div>
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 123 Engineering Ave, City</div>
        </div>
      </div>
    </div>

    <div className="border-t border-primary-foreground/20">
      <div className="container py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} CivilPro. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
