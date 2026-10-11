import PageShell from "@/components/PageShell";
import Team from "@/components/Team";

export default function TeamPage() {
  return (
    <PageShell
      index="04 · Team"
      title={<>Who picks <em className="pf-serif font-normal italic" style={{ color: "var(--pf-acid)" }}>up</em>.</>}
      lede="Three people, one shared inbox. You reach the founders directly — no associate screen, no committee between you and a decision."
    >
      <Team />
    </PageShell>
  );
}
