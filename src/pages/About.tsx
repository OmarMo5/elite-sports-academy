import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Users, Target, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { milestones, coaches, testimonials, stats } from "@/data/mockData";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";

const HeroSection = () => (
  <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {["🏊", "🎾", "🏆", "⚽"].map((icon, i) => (
        <span
          key={i}
          className={`absolute text-5xl md:text-7xl opacity-10 ${i % 2 === 0 ? "animate-float" : "animate-float-reverse"}`}
          style={{ top: `${20 + i * 15}%`, left: `${10 + i * 20}%`, animationDelay: `${i * 0.6}s` }}
        >
          {icon}
        </span>
      ))}
    </div>
    <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
      <div className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-subheading font-semibold mb-6 border border-gold/20">
        🏆 Our Story
      </div>
      <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto">
        10+ Years of <span className="text-gold">Excellence</span> in Sports Training
      </h1>
      <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">
        From a single swimming pool in Cairo to 8 branches across Egypt — discover the journey that built Egypt's premier sports academy.
      </p>
    </div>
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 120" fill="none" className="w-full">
        <path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" />
      </svg>
    </div>
  </section>
);

const StorySection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
              Where It All <span className="text-primary">Began</span>
            </h2>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
              <p>
                Champions Sports Academy was founded in 2014 by a group of passionate athletes and educators who shared a vision: to create a world-class sports training environment right here in Egypt.
              </p>
              <p>
                What started as a small swimming and tennis program in Maadi, Cairo, has grown into Egypt's most comprehensive multi-sport academy, with 8 branches serving over 2,500 students.
              </p>
              <p>
                Our mission is simple — to develop well-rounded athletes who excel not just in their sport, but in character, discipline, and leadership. Every child who walks through our doors is a future champion.
              </p>
            </div>
            <div className="flex gap-4 mt-8">
              <Link to="/programs">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-subheading rounded-xl">
                  Our Programs <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Users className="w-6 h-6" />, label: "Students", value: "2,500+" },
              { icon: <Award className="w-6 h-6" />, label: "Medals Won", value: "150+" },
              { icon: <Target className="w-6 h-6" />, label: "Programs", value: "6" },
              { icon: <ExternalLink className="w-6 h-6" />, label: "Branches", value: "8" },
            ].map((item, i) => (
              <Card key={i} className="border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 text-primary">
                    {item.icon}
                  </div>
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
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Our Journey</h2>
          <p className="text-muted-foreground mt-2 font-subheading">A decade of milestones and achievements</p>
        </div>
        <div ref={ref} className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`relative flex items-start mb-10 transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold border-2 border-primary -translate-x-1/2 mt-2 z-10" />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10"}`}>
                <span className="font-heading font-bold text-gold text-sm">{m.year}</span>
                <h4 className="font-subheading font-semibold text-foreground text-lg">{m.title}</h4>
                <p className="text-muted-foreground text-sm mt-1">{m.description}</p>
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
  return (
    <div
      className="group cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className="relative w-full h-72 transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "" }}
      >
        {/* Front */}
        <div className="absolute inset-0 rounded-xl bg-card border border-border/50 shadow-sm p-6 flex flex-col items-center justify-center" style={{ backfaceVisibility: "hidden" }}>
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-2xl text-primary mb-4">
            {coach.avatar}
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground">{coach.name}</h3>
          <p className="text-muted-foreground text-sm font-subheading">{coach.role}</p>
          <p className="text-primary text-xs mt-2 font-subheading">{coach.experience} experience</p>
          <p className="text-muted-foreground text-xs mt-3 opacity-60">Click to flip →</p>
        </div>
        {/* Back */}
        <div className="absolute inset-0 rounded-xl bg-primary text-primary-foreground p-6 flex flex-col justify-center" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-sm leading-relaxed mb-4 text-primary-foreground/90">{coach.bio}</p>
          <div className="space-y-1">
            {coach.certifications.map((cert) => (
              <span key={cert} className="inline-block text-xs bg-primary-foreground/20 rounded-full px-2 py-0.5 mr-1 mb-1">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CoachesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Meet Our Coaches</h2>
          <p className="text-muted-foreground mt-2 font-subheading">World-class expertise, dedicated mentorship</p>
        </div>
        <div ref={ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {coaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AwardsSection = () => {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollAnimation();
  const awards = [
    { title: "Best Sports Academy in Egypt", year: "2023", org: "Egyptian Sports Federation" },
    { title: "Excellence in Youth Development", year: "2022", org: "Ministry of Youth & Sports" },
    { title: "Top Swimming Program", year: "2024", org: "African Aquatics Association" },
    { title: "Community Impact Award", year: "2021", org: "Cairo Governorate" },
    { title: "Innovation in Sports Training", year: "2023", org: "Arab Sports Council" },
  ];

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Awards & Recognition</h2>
          <p className="text-muted-foreground mt-2 font-subheading">Recognized for excellence across the region</p>
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
            <button onClick={() => setCurrent((c) => (c - 1 + awards.length) % awards.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {awards.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-gold w-6" : "bg-border"}`} />
              ))}
            </div>
            <button onClick={() => setCurrent((c) => (c + 1) % awards.length)} className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">Press & Testimonials</h2>
          <p className="text-muted-foreground mt-2 font-subheading">What people are saying about Champions Academy</p>
        </div>
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {testimonials.slice(0, 3).map((t, i) => (
            <Card key={i} className="border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300 bg-card" style={{ transitionDelay: `${i * 100}ms` }}>
              <CardContent className="p-6">
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-heading font-bold text-primary text-sm">{t.avatar}</div>
                  <div>
                    <p className="font-subheading font-semibold text-foreground text-sm">{t.name}</p>
                    <p className="text-muted-foreground text-xs">{t.role}</p>
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
