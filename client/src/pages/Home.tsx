import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Thesis from "@/components/Thesis";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Voices from "@/components/Voices";
import Dispatches from "@/components/Dispatches";
import Team from "@/components/Team";
import Apply from "@/components/Apply";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "var(--pf-bg)", color: "var(--pf-text)" }}>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Thesis />
        <Portfolio />
        <Process />
        <Voices />
        <Dispatches />
        <Team />
        <Apply />
      </main>
      <SiteFooter />
    </div>
  );
}
