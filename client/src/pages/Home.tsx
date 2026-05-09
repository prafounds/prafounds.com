import EditorialNav from "@/components/EditorialNav";
import Masthead from "@/components/Masthead";
import TickerStrip from "@/components/TickerStrip";
import Thesis from "@/components/Thesis";
import Portfolio from "@/components/Portfolio";
import HowWePartner from "@/components/HowWePartner";
import FounderVoices from "@/components/FounderVoices";
import Dispatches from "@/components/Dispatches";
import Team from "@/components/Team";
import ApplyBlock from "@/components/ApplyBlock";
import ColophonFooter from "@/components/ColophonFooter";

export default function Home() {
  return (
    <div className="min-h-screen text-ink" style={{ background: "var(--prf-paper)" }}>
      <EditorialNav />
      <main>
        <Masthead />
        <TickerStrip />
        <Thesis />
        <Portfolio />
        <HowWePartner />
        <FounderVoices />
        <Dispatches />
        <Team />
        <ApplyBlock />
      </main>
      <ColophonFooter />
    </div>
  );
}
