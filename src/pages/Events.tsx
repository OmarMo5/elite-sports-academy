import { useState } from "react";
import { Calendar, MapPin, Users, Trophy, Medal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { upcomingEvents, pastEvents } from "@/data/mockData";
import { useScrollAnimation, useAnimatedCounter } from "@/hooks/useScrollAnimation";

const HeroSection = () => (
  <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
    <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
      <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
        Events & <span className="text-gold">Competitions</span>
      </h1>
      <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">
        From local inter-branch tournaments to national championships — see where our athletes compete and shine.
      </p>
    </div>
    <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
  </section>
);

const MedalStat = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const { ref, isVisible } = useScrollAnimation();
  const count = useAnimatedCounter(value, 1500, isVisible);
  return (
    <div ref={ref} className="text-center">
      <div className={`font-heading font-black text-3xl ${color}`}>{count}</div>
      <p className="text-muted-foreground text-xs font-subheading">{label}</p>
    </div>
  );
};

const EventsPage = () => {
  const { ref, isVisible } = useScrollAnimation();
  const totalGold = pastEvents.reduce((s, e) => s + (e.results?.gold || 0), 0);
  const totalSilver = pastEvents.reduce((s, e) => s + (e.results?.silver || 0), 0);
  const totalBronze = pastEvents.reduce((s, e) => s + (e.results?.bronze || 0), 0);

  return (
    <main>
      <HeroSection />

      {/* Achievement Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <MedalStat label="Gold Medals" value={totalGold} color="text-gold" />
            <MedalStat label="Silver Medals" value={totalSilver} color="text-muted-foreground" />
            <MedalStat label="Bronze Medals" value={totalBronze} color="text-accent-red" />
          </div>
        </div>
      </section>

      {/* Events Tabs */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10">
              <TabsTrigger value="upcoming" className="font-subheading">Upcoming</TabsTrigger>
              <TabsTrigger value="past" className="font-subheading">Past Events</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div ref={ref} className="space-y-4">
                {upcomingEvents.map((event, i) => (
                  <Card key={event.id} className={`border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500 bg-card ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 100}ms` }}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-accent-green/10 text-accent-green rounded-full px-2 py-0.5 font-subheading font-semibold">{event.sport}</span>
                          </div>
                          <h3 className="font-heading font-bold text-lg text-foreground">{event.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{event.participants} participants</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {pastEvents.map((event, i) => (
                  <Card key={event.id} className="border-border/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300 bg-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                          <Trophy className="w-6 h-6 text-gold" />
                        </div>
                        <div className="flex-1">
                          <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5 font-subheading font-semibold">{event.sport}</span>
                          <h3 className="font-heading font-bold text-lg text-foreground mt-1">{event.title}</h3>
                          <p className="text-muted-foreground text-sm mt-1">{event.description}</p>
                          <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{event.date}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span>
                          </div>
                        </div>
                        {event.results && (
                          <div className="flex gap-3 md:border-l md:border-border md:pl-4">
                            <div className="text-center"><span className="font-heading font-bold text-lg text-gold">{event.results.gold}</span><p className="text-[10px] text-muted-foreground">🥇</p></div>
                            <div className="text-center"><span className="font-heading font-bold text-lg text-muted-foreground">{event.results.silver}</span><p className="text-[10px] text-muted-foreground">🥈</p></div>
                            <div className="text-center"><span className="font-heading font-bold text-lg text-accent-red">{event.results.bronze}</span><p className="text-[10px] text-muted-foreground">🥉</p></div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
