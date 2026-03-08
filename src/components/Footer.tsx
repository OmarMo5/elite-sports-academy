import { Link } from "react-router-dom";
import { Trophy, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t, lang, isRTL } = useLanguage();

  const navKeys = [
    { key: "nav.about", href: "/about" },
    { key: "nav.programs", href: "/programs" },
    { key: "nav.branches", href: "/branches" },
    { key: "nav.membership", href: "/membership" },
    { key: "nav.events", href: "/events" },
    { key: "nav.gallery", href: "/gallery" },
    { key: "nav.contact", href: "/contact" },
  ];

  const sportsKeys = [
    "sport.swimming", "sport.tennis", "sport.football",
    "sport.basketball", "sport.gymnastics", "sport.martialArts",
  ];

  return (
    <footer className="bg-foreground text-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-heading font-bold text-lg block leading-tight">
                  {lang === "ar" ? "الأبطال" : "Champions"}
                </span>
                <span className="text-[10px] font-subheading text-gold uppercase tracking-[0.2em]">
                  {lang === "ar" ? "أكاديمية رياضية" : "Sports Academy"}
                </span>
              </div>
            </div>
            <p className="text-background/60 text-sm leading-relaxed">
              {t("footer.description")}
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
            <h4 className="font-subheading font-semibold mb-4 text-gold">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              {navKeys.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block text-sm text-background/60 hover:text-gold transition-colors"
                >
                  {t(l.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-subheading font-semibold mb-4 text-gold">{t("footer.ourSports")}</h4>
            <div className="space-y-2 text-sm text-background/60">
              {sportsKeys.map((key) => (
                <p key={key}>{t(key)}</p>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-subheading font-semibold mb-4 text-gold">{t("footer.contactUs")}</h4>
            <div className="space-y-3 text-sm text-background/60">
              <div className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
                <span>15 Street 9, Maadi, Cairo, Egypt</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Phone className="w-4 h-4 shrink-0 text-gold" />
                <span dir="ltr">+20 2 2345 6789</span>
              </div>
              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                <Mail className="w-4 h-4 shrink-0 text-gold" />
                <span>info@championsacademy.eg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
          <p>{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
