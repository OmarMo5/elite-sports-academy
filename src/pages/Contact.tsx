import { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
      <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
        <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
          {t("contact.heroTitle")} <span className="text-gold">{t("contact.heroHighlight")}</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">{t("contact.heroSubtitle")}</p>
      </div>
      <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
    </section>
  );
};

const ContactPage = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: t("contact.fillRequired"), variant: "destructive" });
      return;
    }
    toast({ title: t("contact.messageSent"), description: t("contact.messageSentDesc") });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const contactFAQ = [1, 2, 3, 4].map((i) => ({
    q: t(`contactFaq.${i}.q`),
    a: t(`contactFaq.${i}.a`),
  }));

  return (
    <main>
      <HeroSection />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`} dir={isRTL ? "rtl" : "ltr"}>
            <Card className="border-border/50 bg-card">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">{t("contact.sendMessage")}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="font-subheading font-medium text-foreground">{t("contact.name")} *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">{t("membership.email")} *</Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">{t("membership.phone")}</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" dir="ltr" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">{t("contact.message")} *</Label>
                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 min-h-[120px]" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-subheading font-semibold">
                    {t("contact.sendBtn")} <Send className={`w-4 h-4 ${isRTL ? "mr-1" : "ml-1"}`} />
                  </Button>
                </form>
              </CardContent>
            </Card>
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">{t("contact.contactInfo")}</h2>
                <div className="space-y-4">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, label: t("contact.mainOffice"), value: "15 Street 9, Maadi, Cairo, Egypt" },
                    { icon: <Phone className="w-5 h-5" />, label: t("membership.phone"), value: "+20 2 2345 6789" },
                    { icon: <Mail className="w-5 h-5" />, label: t("membership.email"), value: "info@championsacademy.eg" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 group ${isRTL ? "flex-row-reverse text-right" : ""}`}>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-subheading font-semibold text-foreground text-sm">{item.label}</p>
                        <p className="text-muted-foreground text-sm" dir={item.label === t("membership.phone") ? "ltr" : undefined}>{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-subheading font-semibold text-foreground mb-3">{t("contact.followUs")}</h3>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"><Icon className="w-4 h-4" /></a>
                  ))}
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-border/50 h-48 bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm font-subheading">{t("contact.interactiveMap")}</p>
                  <p className="text-muted-foreground text-xs">{t("contact.mapReady")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-foreground">{t("contact.quickHelp")}</h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {contactFAQ.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border border-border/50 rounded-xl bg-card px-4">
                <AccordionTrigger className="text-sm font-subheading font-semibold text-foreground hover:text-primary">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
