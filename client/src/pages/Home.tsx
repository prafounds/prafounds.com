import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Thesis from "@/components/Thesis";
import Process from "@/components/Process";
import Dispatches from "@/components/Dispatches";
import Team from "@/components/Team";
import Apply from "@/components/Apply";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    // Transparent, not --pf-bg: the page background is painted on <body> and
    // the WebGL layer sits between them. An opaque fill here would hide it.
    <div className="min-h-screen" style={{ color: "var(--pf-text)" }}>
      <SiteNav />
      <main>
        <Hero />
        <Marquee />
        <Thesis />
        <Process />
        <Dispatches />
        <Team />
        <Apply />
      </main>
      <SiteFooter />
    </div>
  );
}
