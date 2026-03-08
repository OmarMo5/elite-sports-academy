import { useState } from "react";
import { Check, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { membershipPlans, testimonials } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
          {t("membership.heroTitle1")} <span className="text-gold">{t("membership.heroHighlight")}</span> {t("membership.heroTitle2")}
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("membership.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const PricingSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  return (
    <section className="py-20 bg-background">
      <div ref={ref} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {membershipPlans.map((plan, i) => (
            <Card key={plan.id} className={`relative overflow-hidden border-border/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card ${plan.highlighted ? "border-gold ring-2 ring-gold/30 scale-105" : ""} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} style={{ transitionDelay: `${i * 150}ms` }}>
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gold text-gold-foreground text-center text-xs font-subheading font-bold py-1.5">{t("membership.mostPopular")}</div>
              )}
              <CardContent className={`p-8 ${plan.highlighted ? "pt-12" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-heading font-black text-4xl text-primary">{plan.price.toLocaleString()}</span>
                  <span className="text-muted-foreground text-sm mx-1">EGP/{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm text-foreground/80 ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                      <Check className="w-4 h-4 text-accent-green shrink-0 mt-0.5" /><span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full rounded-xl font-subheading font-semibold ${plan.highlighted ? "bg-gold text-gold-foreground hover:bg-gold/90 animate-glow-pulse" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
                  {t("cta.enrollNow")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const EnrollForm = () => {
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({ parentName: "", childName: "", email: "", phone: "", sport: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.email || !formData.childName) {
      toast({ title: t("membership.fillFields"), variant: "destructive" });
      return;
    }
    toast({ title: t("membership.appSubmitted"), description: t("membership.appSubmittedDesc") });
    setFormData({ parentName: "", childName: "", email: "", phone: "", sport: "" });
  };

  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-foreground">{t("membership.quickEnrollment")}</h2>
          <p className="text-muted-foreground mt-2 font-subheading">{t("membership.quickEnrollmentSub")}</p>
        </div>
        <Card className="border-border/50 bg-card">
          <CardContent className="p-8" dir={isRTL ? "rtl" : "ltr"}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="font-subheading font-medium text-foreground">{t("membership.parentName")} *</Label>
                <Input value={formData.parentName} onChange={(e) => setFormData({ ...formData, parentName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-subheading font-medium text-foreground">{t("membership.childName")} *</Label>
                <Input value={formData.childName} onChange={(e) => setFormData({ ...formData, childName: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-subheading font-medium text-foreground">{t("membership.email")} *</Label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-subheading font-medium text-foreground">{t("membership.phone")}</Label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-1" dir="ltr" />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-subheading font-semibold">
                {t("membership.submitApp")} <ArrowRight className={`w-4 h-4 ${isRTL ? "mr-1 rotate-180" : "ml-1"}`} />
              </Button>
            </form>
          </CardContent>
        </Card>
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
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-foreground">{t("membership.memberStories")}</h2>
        </div>
        <div ref={ref} className={`grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {testimonials.slice(0, 4).map((te, i) => (
            <Card key={i} className="border-border/50 bg-card hover:shadow-lg transition-all duration-300">
              <CardContent className="p-5" dir={isRTL ? "rtl" : "ltr"}>
                <div className="flex items-center gap-1 mb-2">{[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />)}</div>
                <p className="text-foreground/80 text-sm italic mb-3">"{t(`testimonial.${i + 1}.text`)}"</p>
                <p className="font-subheading font-semibold text-foreground text-sm">{te.name} · <span className="text-muted-foreground font-normal">{te.role}</span></p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useLanguage();
  const faqItems = [1, 2, 3, 4, 5].map((i) => ({
    q: t(`memberFaq.${i}.q`),
    a: t(`memberFaq.${i}.a`),
  }));
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl text-foreground">{t("membership.faqTitle")}</h2>
        </div>
        <div ref={ref} className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl bg-card px-4">
                <AccordionTrigger className="text-sm font-subheading font-semibold text-foreground hover:text-primary">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const Membership = () => (
  <main>
    <HeroSection />
    <PricingSection />
    <EnrollForm />
    <TestimonialsSection />
    <FAQSection />
  </main>
);

export default Membership;
