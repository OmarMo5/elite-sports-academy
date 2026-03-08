import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { stats, milestones, sports, upcomingEvents, testimonials } from "@/data/mockData";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

/* ─── Hero ─── */
const Hero = () => {
  const { t, isRTL } = useLanguage();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🏊", "🎾", "⚽", "🏀", "🤸", "🥋"].map((icon, i) => (
          <span key={i} className={`absolute text-4xl md:text-6xl opacity-10 ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`} style={{ top: `${15 + i * 12}%`, left: `${5 + i * 15}%`, animationDelay: `${i * 0.8}s` }}>{icon}</span>
        ))}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={`p-${i}`} className="absolute w-1 h-1 bg-gold/30 rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animation: `float-slow ${4 + Math.random() * 4}s ease-in-out infinite`, animationDelay: `${Math.random() * 3}s` }} />
        ))}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-subheading font-semibold mb-6 backdrop-blur-sm border border-gold/20">
          {t("hero.badge")}
        </div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-7xl text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
          {t("hero.title1")}{" "}
          <span className="text-gold">{t("hero.titleHighlight")}</span>
          <br />
          {t("hero.title2")}
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-body">
          {t("hero.subtitle")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/membership">
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 font-subheading font-bold rounded-xl text-base px-8 animate-glow-pulse">
              {t("nav.joinNow")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
            </Button>
          </Link>
          <Link to="/programs">
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-subheading rounded-xl text-base px-8">
              {t("hero.exploreProgramsBtn")}
            </Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

/* ─── Stats ─── */
const StatItem = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  const count = useAnimatedCounter(value, 2000, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className="font-heading font-black text-4xl md:text-5xl text-primary">{count}{suffix}</div>
      <p className="text-muted-foreground text-sm mt-1 font-subheading">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const statLabels = [t("stats.years"), t("stats.branches"), t("stats.students"), t("stats.awards")];
  return (
    <section ref={ref} className="py-16 bg-background">
      <div className={`container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        {stats.map((s, i) => (
          <StatItem key={s.label} label={statLabels[i]} value={s.value} suffix={s.suffix} />
        ))}
      </div>
    </section>
  );
};

/* ─── Timeline ─── */
const Timeline = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("timeline.title")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("timeline.subtitle")}</p>
        </div>
        <div ref={ref} className="relative max-w-3xl mx-auto">
          <div className={`absolute ${isRTL ? "right-4 md:right-1/2" : "left-4 md:left-1/2"} top-0 bottom-0 w-0.5 bg-primary/20`} />
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`relative flex items-start mb-10 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`absolute ${isRTL ? "right-4 md:right-1/2" : "left-4 md:left-1/2"} w-3 h-3 rounded-full bg-gold border-2 border-primary ${isRTL ? "translate-x-1/2" : "-translate-x-1/2"} mt-2 z-10`} />
              <div className={`${isRTL ? "mr-10 md:mr-0" : "ml-10 md:ml-0"} md:w-1/2 ${i % 2 === 0 ? (isRTL ? "md:pl-10 md:text-left" : "md:pr-10 md:text-right") : (isRTL ? "md:pr-10 md:text-right" : "md:pl-10")}`}>
                <span className="font-heading font-bold text-gold text-sm">{m.year}</span>
                <h4 className="font-subheading font-semibold text-foreground text-lg">{t(`milestone.${m.year}.title`)}</h4>
                <p className="text-muted-foreground text-sm mt-1">{t(`milestone.${m.year}.desc`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Featured Sports ─── */
const SportsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("sports.title")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("sports.subtitle")}</p>
        </div>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sports.map((sport, i) => (
            <div key={sport.id} className={`group transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 100}ms`, perspective: "1000px" }}>
              <Card className="overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-card" style={{ transformStyle: "preserve-3d" }}>
                <CardContent className="p-6" dir={isRTL ? "rtl" : "ltr"}>
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{sport.icon}</div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-1">{sport.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{sport.description}</p>
                  <div className="space-y-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Star className="w-3.5 h-3.5 text-gold" /><span>{sport.coach}</span>
                    </div>
                    <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? "flex-row-reverse" : ""}`}>
                      <Calendar className="w-3.5 h-3.5 text-primary" /><span>{sport.schedule}</span>
                    </div>
                    <p className="text-accent-green font-semibold text-xs mt-2">🏅 {sport.achievements}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/programs">
            <Button variant="outline" className="rounded-xl font-subheading border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              {t("sports.viewAll")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─── Events Carousel ─── */
const EventsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("events.title")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("events.subtitle")}</p>
        </div>
        <div ref={ref} className={`relative max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Card className="overflow-hidden border-border/50 bg-card">
            <CardContent className="p-8 text-center min-h-[200px] flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-subheading font-semibold mb-3 mx-auto">{upcomingEvents[current].sport}</span>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{upcomingEvents[current].title}</h3>
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{upcomingEvents[current].date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{upcomingEvents[current].location}</span>
              </div>
              <p className="text-muted-foreground text-sm">{upcomingEvents[current].description}</p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setCurrent((c) => (c - 1 + upcomingEvents.length) % upcomingEvents.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-2">{upcomingEvents.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`} />))}</div>
            <button onClick={() => setCurrent((c) => (c + 1) % upcomingEvents.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Testimonials ─── */
const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("testimonials.title")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("testimonials.subtitle")}</p>
        </div>
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((te, i) => (
            <Card key={i} className={`border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-500 bg-card ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <CardContent className="p-6" dir={isRTL ? "rtl" : "ltr"}>
                <Quote className="w-8 h-8 text-gold/30 mb-3" />
                <p className="text-foreground/80 text-sm leading-relaxed mb-4">{t(`testimonial.${i + 1}.text`)}</p>
                <div className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">{te.avatar}</div>
                  <div>
                    <p className="font-subheading font-semibold text-foreground text-sm">{te.name}</p>
                    <p className="text-muted-foreground text-xs">{te.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── CTA ─── */
const CTASection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary/80 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {["🏊", "🎾", "⚽"].map((icon, i) => (
          <span key={i} className="absolute text-8xl animate-float-slow" style={{ top: `${20 + i * 25}%`, right: `${5 + i * 10}%`, animationDelay: `${i}s` }}>{icon}</span>
        ))}
      </div>
      <div ref={ref} className={`container mx-auto px-4 text-center relative z-10 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">{t("cta.title")}</h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8 font-body">{t("cta.subtitle")}</p>
        <Link to="/membership">
          <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 font-subheading font-bold rounded-xl text-base px-10 animate-glow-pulse">
            {t("cta.enrollNow")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
          </Button>
        </Link>
      </div>
    </section>
  );
};

/* ─── Homepage ─── */
const Index = () => (
  <main>
    <Hero />
    <StatsSection />
    <Timeline />
    <SportsSection />
    <EventsSection />
    <TestimonialsSection />
    <CTASection />
  </main>
);

export default Index;
