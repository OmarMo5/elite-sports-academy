import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Target, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { milestones, coaches, testimonials } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["🏊", "🎾", "🏆", "⚽"].map((icon, i) => (
          <span key={i} className={`absolute text-5xl md:text-7xl opacity-10 ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`} style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%`, animationDelay: `${i * 0.6}s` }}>{icon}</span>
        ))}
      </div>
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-subheading font-semibold mb-6 border border-gold/20">{t("about.heroBadge")}</div>
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
          {t("about.heroTitle1")} <span className="text-gold">{t("about.heroHighlight")}</span> {t("about.heroTitle2")}
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("about.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const StorySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} dir={isRTL ? "rtl" : "ltr"}>
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              {t("about.storyTitle1")} <span className="text-primary">{t("about.storyHighlight")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>{t("about.storyP1")}</p>
              <p>{t("about.storyP2")}</p>
              <p>{t("about.storyP3")}</p>
            </div>
            <div className="flex gap-4 mt-8">
              <Link to="/programs">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-subheading rounded-xl">
                  {t("about.ourPrograms")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Users className="w-6 h-6" />, label: t("about.students"), value: "2,500+" },
              { icon: <Award className="w-6 h-6" />, label: t("about.medalsWon"), value: "150+" },
              { icon: <Target className="w-6 h-6" />, label: t("about.programs"), value: "6" },
              { icon: <ExternalLink className="w-6 h-6" />, label: t("about.branchesLabel"), value: "8" },
            ].map((item, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">{item.icon}</div>
                  <div className="font-heading font-bold text-2xl text-foreground">{item.value}</div>
                  <p className="text-muted-foreground text-sm font-subheading">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("about.timelineTitle")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("about.timelineSubtitle")}</p>
        </div>
        <div ref={ref} className="relative max-w-3xl mx-auto">
          <div className={`absolute ${isRTL ? "right-4 md:right-1/2" : "left-4 md:left-1/2"} top-0 bottom-0 w-0.5 bg-primary/20`} />
          {milestones.map((m, i) => (
            <div key={m.year} className={`relative flex items-start mb-10 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              <div className={`absolute ${isRTL ? "right-4 md:right-1/2" : "left-4 md:left-1/2"} w-3 h-3 rounded-full bg-gold border-2 border-primary ${isRTL ? "translate-x-1/2" : "-translate-x-1/2"} mt-2 z-10`} />
              <div className={`${isRTL ? "mr-10 md:mr-0" : "ml-10 md:ml-0"} md:w-1/2 ${i % 2 === 0 ? (isRTL ? "md:pl-10" : "md:pr-10 md:text-right") : (isRTL ? "md:pr-10" : "md:pl-10")}`}>
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

const CoachCard = ({ coach }: { coach: typeof coaches[0] }) => {
  const [flipped, setFlipped] = useState(false);
  const { t } = useLanguage();
  return (
    <div className="group cursor-pointer" style={{ perspective: "1000px" }} onClick={() => setFlipped(!flipped)} onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div className="relative w-full h-72 transition-transform duration-500" style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "" }}>
        <div className="absolute inset-0 rounded-xl bg-card border border-border/50 shadow-sm p-6 flex flex-col items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-2xl text-primary mb-4">{coach.avatar}</div>
          <h3 className="font-heading font-bold text-lg text-foreground">{coach.name}</h3>
          <p className="text-muted-foreground text-sm font-subheading">{coach.role}</p>
          <p className="text-primary text-xs mt-2 font-subheading">{coach.experience} experience</p>
          <p className="text-muted-foreground text-xs mt-3 opacity-60">{t("about.clickToFlip")}</p>
        </div>
        <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground p-6 flex flex-col justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-sm leading-relaxed mb-4 text-primary-foreground/90">{coach.bio}</p>
          <div className="space-y-1">
            {coach.certifications.map((cert) => (
              <span key={cert} className="inline-block text-xs bg-primary-foreground/20 rounded-full px-2 py-0.5 mr-1 mb-1">{cert}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoachesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("about.coachesTitle")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("about.coachesSubtitle")}</p>
        </div>
        <div ref={ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {coaches.map((coach) => (<CoachCard key={coach.id} coach={coach} />))}
        </div>
      </div>
    </section>
  );
};

const AwardsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const awards = [1, 2, 3, 4, 5].map((i) => ({
    title: t(`award.${i}.title`),
    year: ["2023", "2022", "2024", "2021", "2023"][i - 1],
    org: t(`award.${i}.org`),
  }));

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("about.awardsTitle")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("about.awardsSubtitle")}</p>
        </div>
        <div ref={ref} className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Card className="border-gold/30 bg-card overflow-hidden">
            <CardContent className="p-8 text-center min-h-[180px] flex flex-col justify-center">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-1">{awards[current].title}</h3>
              <p className="text-gold font-subheading font-semibold text-sm">{awards[current].year}</p>
              <p className="text-muted-foreground text-sm mt-1">{awards[current].org}</p>
            </CardContent>
          </Card>
          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={() => setCurrent((c) => (c - 1 + awards.length) % awards.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><ChevronLeft className="w-4 h-4" /></button>
            <div className="flex gap-2">{awards.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-gold w-6" : "bg-border"}`} />))}</div>
            <button onClick={() => setCurrent((c) => (c + 1) % awards.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t("about.pressTitle")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("about.pressSubtitle")}</p>
        </div>
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {testimonials.slice(0, 3).map((te, i) => (
            <Card key={i} className="border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300 bg-card" style={{ transitionDelay: `${i * 100}ms` }}>
              <CardContent className="p-6" dir={isRTL ? "rtl" : "ltr"}>
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">"{t(`testimonial.${i + 1}.text`)}"</p>
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

const About = () => (
  <main>
    <HeroSection />
    <StorySection />
    <TimelineSection />
    <CoachesSection />
    <AwardsSection />
    <TestimonialsSection />
  </main>
);

export default About;
