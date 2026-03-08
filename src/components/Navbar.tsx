import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Trophy, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const navKeys = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/about" },
  { key: "nav.programs", href: "/programs" },
  { key: "nav.branches", href: "/branches" },
  { key: "nav.membership", href: "/membership" },
  { key: "nav.events", href: "/events" },
  { key: "nav.gallery", href: "/gallery" },
  { key: "nav.contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const location = useLocation();
  const { t, lang, setLang, isRTL } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className={`hidden sm:block ${isRTL ? "text-right" : ""}`}>
              <span className="font-heading font-bold text-lg text-foreground leading-tight block">
                {lang === "ar" ? "الأبطال" : "Champions"}
              </span>
              <span className="text-[10px] font-subheading text-gold uppercase tracking-[0.2em] leading-none">
                {lang === "ar" ? "أكاديمية رياضية" : "Sports Academy"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden lg:flex items-center gap-1 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navKeys.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-heading font-bold transition-all duration-300 ${
                  location.pathname === link.href
                    ? "bg-gold text-primary shadow-md"
                    : "text-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-lg"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="h-9 px-2.5 rounded-lg flex items-center gap-1.5 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all text-xs font-heading font-bold"
              aria-label="Toggle language"
            >
              <Languages className="w-4 h-4" />
              <span>{lang === "en" ? "عربي" : "EN"}</span>
            </button>

            <button
              onClick={() => setDark(!dark)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-primary/10 hover:text-primary transition-all"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link to="/membership" className="hidden md:block">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground font-subheading font-semibold rounded-xl animate-glow-pulse">
                {t("nav.joinNow")}
              </Button>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-foreground/70 hover:bg-primary/10 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/98 backdrop-blur-md border-t border-border px-4 py-4 space-y-1">
          {navKeys.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block px-4 py-3 rounded-xl text-sm font-heading font-bold transition-all duration-300 ${
                location.pathname === link.href
                  ? "bg-gold text-primary shadow-md"
                  : "text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {t(link.key)}
            </Link>
          ))}
          <Link to="/membership" className="block pt-2">
            <Button className="w-full bg-primary text-primary-foreground font-subheading font-semibold rounded-xl">
              {t("nav.joinNow")}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
