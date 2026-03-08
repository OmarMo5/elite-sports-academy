import { useState } from "react";
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { branches } from "@/data/mockData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useToast } from "@/hooks/use-toast";

const HeroSection = () => (
  <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-foreground">
    <div className="container mx-auto px-4 text-center relative z-10 pt-24 pb-16">
      <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-primary-foreground leading-tight mb-4">
        Get in <span className="text-gold">Touch</span>
      </h1>
      <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto font-body">
        Have a question? We'd love to hear from you. Reach out and we'll respond within 24 hours.
      </p>
    </div>
    <div className="absolute bottom-0 left-0 right-0"><svg viewBox="0 0 1440 120" fill="none" className="w-full"><path d="M0,80 C360,120 720,40 1440,80 L1440,120 L0,120 Z" fill="hsl(var(--background))" /></svg></div>
  </section>
);

const ContactPage = () => {
  const { toast } = useToast();
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Message Sent! ✉️", description: "Thank you for reaching out. We'll get back to you soon." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  const contactFAQ = [
    { q: "What are your operating hours?", a: "Our branches are open Saturday–Thursday, 8:00 AM – 9:00 PM. Friday hours are 2:00 PM – 8:00 PM." },
    { q: "Can I book a trial session?", a: "Yes! We offer one free trial session for any sport. Contact us to schedule." },
    { q: "How do I reach a specific branch?", a: "Each branch has a direct phone line listed on our Branches page, or you can call our main line." },
    { q: "Do you offer transport services?", a: "Some branches offer shuttle services within a 5km radius. Contact the branch directly for details." },
  ];

  return (
    <main>
      <HeroSection />

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div ref={ref} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Form */}
            <Card className="border-border/50 bg-card">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label className="font-subheading font-medium text-foreground">Name *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" placeholder="Your name" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">Email *</Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" placeholder="your@email.com" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">Phone</Label>
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" placeholder="+20 xxx xxxx" />
                  </div>
                  <div>
                    <Label className="font-subheading font-medium text-foreground">Message *</Label>
                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1 min-h-[120px]" placeholder="How can we help?" />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-subheading font-semibold">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, label: "Main Office", value: "15 Street 9, Maadi, Cairo, Egypt" },
                    { icon: <Phone className="w-5 h-5" />, label: "Phone", value: "+20 2 2345 6789" },
                    { icon: <Mail className="w-5 h-5" />, label: "Email", value: "info@championsacademy.eg" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-subheading font-semibold text-foreground text-sm">{item.label}</p>
                        <p className="text-muted-foreground text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-subheading font-semibold text-foreground mb-3">Follow Us</h3>
                <div className="flex gap-3">
                  {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200">
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-xl overflow-hidden border border-border/50 h-48 bg-secondary flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm font-subheading">Interactive Map</p>
                  <p className="text-muted-foreground text-xs">Google Maps integration ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-foreground">Quick Help</h2>
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
