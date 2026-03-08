import { Link } from "react-router-dom";
import { Trophy, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg block leading-tight">Champions</span>
                <span className="text-[10px] font-subheading text-gold uppercase tracking-[0.2em]">Sports Academy</span>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              Egypt's premier sports academy. Forging champions since 2014 with world-class coaching and facilities.
            </p>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-subheading font-semibold mb-4 text-gold">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Programs", "Branches", "Membership", "Events", "Gallery", "Contact"].map((l) => (
                <Link
                  key={l}
                  to={`/${l.toLowerCase()}`}
                  className="block text-sm text-background/60 hover:text-gold transition-colors"
                >
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-subheading font-semibold mb-4 text-gold">Our Sports</h4>
            <div className="space-y-2 text-sm text-background/60">
              {["Swimming", "Tennis", "Football", "Basketball", "Gymnastics", "Martial Arts"].map((s) => (
                <p key={s}>{s}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-subheading font-semibold mb-4 text-gold">Contact Us</h4>
            <div className="space-y-3 text-sm text-background/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>15 Street 9, Maadi, Cairo, Egypt</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <span>+20 2 2345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>info@championsacademy.eg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <p>© 2024 Champions Sports Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
