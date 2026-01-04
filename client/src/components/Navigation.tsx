import { useState, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      )}
    >
      <div className="container-width flex items-center justify-between">
        <div 
          className="text-2xl font-bold font-display tracking-tight text-primary cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          PraFounds<span className="text-accent">.</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Philosophy", id: "philosophy" },
            { label: "Focus", id: "focus" },
            { label: "Support", id: "support" },
            { label: "Pipeline", id: "pipeline" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("pitch")}
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/10"
          >
            Contact
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border p-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-6">
            {[
              { label: "Philosophy", id: "philosophy" },
              { label: "Focus", id: "focus" },
              { label: "Support", id: "support" },
              { label: "Pipeline", id: "pipeline" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-lg font-medium text-left text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("pitch")}
              className="w-full py-4 bg-primary text-primary-foreground text-lg font-medium rounded-sm"
            >
              Pitch PraFounds
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
