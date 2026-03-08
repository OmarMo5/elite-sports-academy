import { useState } from "react";
import { MapPin, Phone, Calendar, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { branches } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute w-3 h-3 rounded-full bg-gold/20 animate-float-slow" style={{ top: `${20 + Math.random() * 60}%`, left: `${10 + Math.random() * 80}%`, animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
          {t("branches.heroTitle")} <span className="text-gold">{t("branches.heroHighlight")}</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("branches.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const EgyptMap = ({ onSelect, selected }: { onSelect: (id: number) => void; selected: number | null }) => {
  const { t } = useLanguage();
  const mapBounds = { minLat: 29.5, maxLat: 31.5, minLng: 29.5, maxLng: 32 };
  const toSvg = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * 500 + 50,
    y: ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * 400 + 50,
  });

  return (
    <svg viewBox="0 0 600 500" className="w-full max-w-lg mx-auto">
      <path d="M50,50 L550,50 L550,450 L300,450 L200,350 L50,350 Z" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="2" rx="10" />
      <text x="300" y="470" textAnchor="middle" className="fill-muted-foreground text-sm font-subheading">{t("branches.egypt")}</text>
      {branches.map((b) => {
        const pos = toSvg(b.lat, b.lng);
        const isSelected = selected === b.id;
        return (
          <g key={b.id} onClick={() => onSelect(b.id)} className="cursor-pointer">
            <circle cx={pos.x} cy={pos.y} r={isSelected ? 18 : 12} fill="hsl(var(--primary) / 0.15)" className="animate-float-slow" />
            <circle cx={pos.x} cy={pos.y} r={isSelected ? 10 : 7} fill={isSelected ? "hsl(var(--gold))" : "hsl(var(--primary))"} stroke="hsl(var(--background))" strokeWidth="2" className="transition-all duration-300" />
            <text x={pos.x} y={pos.y - 16} textAnchor="middle" className="fill-foreground text-[10px] font-subheading font-semibold">{b.name.replace(" Branch", "")}</text>
          </g>
        );
      })}
    </svg>
  );
};

const BranchesPage = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  const selectedBranch = branches.find((b) => b.id === selected);

  return (
    <main>
      <HeroSection />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" dir={isRTL ? "rtl" : "ltr"}>
            <div>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-6 text-center lg:text-start">{t("branches.clickMarker")}</h2>
              <EgyptMap onSelect={setSelected} selected={selected} />
            </div>
            <div>
              {selectedBranch ? (
                <Card className="border-primary/20 bg-card animate-fade-in-scale">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-heading font-bold text-2xl text-foreground">{selectedBranch.name}</h3>
                        <p className="text-primary text-sm font-subheading">{selectedBranch.city}</p>
                      </div>
                      <button onClick={() => setSelected(null)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-all"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="space-y-3 text-sm text-muted-foreground mb-6">
                      <div className={`flex items-start gap-2 ${isRTL ? "flex-row-reverse text-right" : ""}`}><MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" /><span>{selectedBranch.address}</span></div>
                      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}><Phone className="w-4 h-4 text-primary" /><span dir="ltr">{selectedBranch.phone}</span></div>
                      <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}><Calendar className="w-4 h-4 text-primary" /><span>{t("common.est")} {selectedBranch.established}</span></div>
                    </div>
                    <div>
                      <h4 className="font-subheading font-semibold text-foreground text-sm mb-2">{t("branches.availableSports")}</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedBranch.sports.map((s) => (
                          <span key={s} className="text-xs bg-primary/10 text-primary rounded-full px-3 py-1 font-subheading">{s}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <p className="text-muted-foreground text-center lg:text-start font-body">{t("branches.clickMapHint")}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground">{t("branches.allBranches")}</h2>
            <p className="text-muted-foreground mt-2 font-subheading">{t("branches.allBranchesSubtitle")}</p>
          </div>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {branches.map((b, i) => (
              <Card key={b.id} onClick={() => { setSelected(b.id); window.scrollTo({ top: 400, behavior: "smooth" }); }} className={`cursor-pointer border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-2 bg-card ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <CardContent className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3"><MapPin className="w-5 h-5 text-primary" /></div>
                  <h3 className="font-heading font-bold text-foreground">{b.name}</h3>
                  <p className="text-muted-foreground text-xs mt-1">{b.city} · {t("common.est")} {b.established}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {b.sports.slice(0, 3).map((s) => (<span key={s} className="text-[10px] bg-secondary text-muted-foreground rounded-full px-2 py-0.5">{s}</span>))}
                    {b.sports.length > 3 && <span className="text-[10px] text-primary">+{b.sports.length - 3}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BranchesPage;
