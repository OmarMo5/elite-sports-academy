import { useState } from "react";
import { X, Filter } from "lucide-react";
import { galleryImages } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const galleryColors = [
  "from-primary/20 to-primary/5", "from-gold/20 to-gold/5", "from-accent-red/20 to-accent-red/5",
  "from-accent-green/20 to-accent-green/5", "from-primary/30 to-gold/10", "from-accent-red/20 to-primary/10",
];

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
          {t("gallery.heroTitle")} <span className="text-gold">{t("gallery.heroHighlight")}</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("gallery.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const GalleryPage = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  const categories = [
    { key: "All", label: t("gallery.all") },
    { key: "Training", label: t("gallery.training") },
    { key: "Competition", label: t("gallery.competition") },
    { key: "Awards", label: t("gallery.awards") },
  ];
  const filtered = filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter);

  return (
    <main>
      <HeroSection />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center gap-2 mb-10 justify-center">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setFilter(cat.key)} className={`px-4 py-2 rounded-full text-sm font-subheading font-medium transition-all ${filter === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>{cat.label}</button>
            ))}
          </div>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div key={img.id} onClick={() => setLightbox(img.id)} className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 60}ms`, perspective: "800px" }}>
                <div className={`absolute inset-0 bg-gradient-to-br ${galleryColors[i % galleryColors.length]}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30 group-hover:opacity-50 group-hover:scale-110 transition-all duration-300">
                    {img.sport === "Swimming" ? "🏊" : img.sport === "Tennis" ? "🎾" : img.sport === "Football" ? "⚽" : img.sport === "Basketball" ? "🏀" : img.sport === "Gymnastics" ? "🤸" : img.sport === "Martial Arts" ? "🥋" : "🏆"}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
                  <h4 className="font-subheading font-semibold text-sm text-background">{img.title}</h4>
                  <span className="text-background/60 text-xs">{img.category} · {img.sport}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-background/20 flex items-center justify-center text-background hover:bg-background/40 transition-all"><X className="w-5 h-5" /></button>
          <div className="max-w-2xl w-full animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const img = galleryImages.find((g) => g.id === lightbox);
              if (!img) return null;
              const idx = galleryImages.indexOf(img);
              return (
                <div className={`aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${galleryColors[idx % galleryColors.length]} flex items-center justify-center relative`}>
                  <span className="text-9xl opacity-40">{img.sport === "Swimming" ? "🏊" : img.sport === "Tennis" ? "🎾" : img.sport === "Football" ? "⚽" : img.sport === "Basketball" ? "🏀" : img.sport === "Gymnastics" ? "🤸" : img.sport === "Martial Arts" ? "🥋" : "🏆"}</span>
                  <div className="absolute bottom-0 left-0 right-0 bg-foreground/60 p-6 text-background">
                    <h3 className="font-heading font-bold text-xl">{img.title}</h3>
                    <p className="text-background/70 text-sm">{img.category} · {img.sport}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </main>
  );
};

export default GalleryPage;
