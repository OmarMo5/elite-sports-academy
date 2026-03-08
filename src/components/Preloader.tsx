import { useState, useEffect } from "react";
import { Trophy } from "lucide-react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-foreground flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 animate-glow-pulse">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="font-heading font-bold text-2xl text-background">Champions</h2>
        <p className="text-[11px] font-subheading text-gold uppercase tracking-[0.3em] mt-1">Sports Academy</p>
        <div className="mt-6 w-32 h-1 bg-background/10 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gold rounded-full animate-[slide-right_1.5s_ease-in-out_infinite]" 
               style={{ width: "40%", animation: "slide-right 1.5s ease-in-out infinite" }} />
        </div>
      </div>
      <style>{`
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
