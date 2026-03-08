import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Star, Users, Filter, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { sports } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🏊", "🤸", "⚽", "🏀", "🥋", "⛸️", "🎨", "🥊", "🏃", "💪"].map((icon, i) => (
          <span key={i} className={`absolute text-4xl md:text-6xl opacity-10 ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`} style={{ top: `${10 + i * 8}%`, left: `${5 + i * 9}%`, animationDelay: `${i * 0.5}s` }}>{icon}</span>
        ))}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
          {t("programs.heroTitle")} <span className="text-gold">{t("programs.heroHighlight")}</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("programs.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const ProgramsGrid = () => {
  const [filter, setFilter] = useState<string>("All");
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();

  const skillOptions = [
    { key: "All", label: t("programs.all") },
    { key: "Beginner", label: t("programs.beginner") },
    { key: "Intermediate", label: t("programs.intermediate") },
    { key: "Advanced", label: t("programs.advanced") },
    { key: "Competitive", label: t("programs.competitive") },
  ];
  const filtered = filter === "All" ? sports : sports.filter((s) => s.skillLevels.includes(filter));

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2 mb-10 justify-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {skillOptions.map((opt) => (
            <button key={opt.key} onClick={() => setFilter(opt.key)} className={`px-4 py-2 rounded-full text-sm font-subheading font-medium transition-all ${filter === opt.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>{opt.label}</button>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((sport, i) => (
            <div key={sport.id} className={`group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms`, perspective: "1000px" }}>
              <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-card group-hover:scale-[1.02]" style={{ transformStyle: "preserve-3d" }}>
                <div className={`h-1.5 bg-primary`} />
                <CardContent className="p-6" dir={isRTL ? "rtl" : "ltr"}>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300 inline-block">{sport.icon}</span>
                    <span className="text-xs font-subheading font-semibold bg-primary/10 text-primary rounded-full px-3 py-1">{sport.ageGroup}</span>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-2">{sport.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{sport.description}</p>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {t("programs.studentsLabel")}</span>
                      <span className="font-subheading font-semibold text-foreground">{sport.students}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1"><Zap className="w-3.5 h-3.5" /> {t("programs.intensity")}</span>
                      <span className="font-subheading font-semibold text-foreground">{sport.intensity}</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>{t("programs.enrollment")}</span>
                        <span>{Math.round((sport.students / 1000) * 100)}%</span>
                      </div>
                      <Progress value={isVisible ? (sport.students / 1000) * 100 : 0} className="h-2" />
                    </div>
                  </div>
                  <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
                    <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Star className="w-3.5 h-3.5 text-gold" /><span>{sport.coach}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Calendar className="w-3.5 h-3.5 text-primary" /><span>{sport.schedule}</span>
                    </div>
                    <p className="text-accent-green font-semibold text-xs mt-2">🏅 {sport.achievements}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-4">
                    {sport.skillLevels.map((level) => (
                      <span key={level} className="text-xs bg-secondary text-muted-foreground rounded-full px-2 py-0.5">{level}</span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/membership">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-subheading rounded-xl px-8 animate-glow-pulse">
              {t("cta.enrollNow")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const Programs = () => (
  <main>
    <HeroSection />
    <ProgramsGrid />
  </main>
);

export default Programs;
