import PageShell from "@/components/PageShell";
import Thesis from "@/components/Thesis";

export default function ThesisPage() {
  return (
    <PageShell
      index="01 · Thesis"
      title={<>Where we <em className="pf-serif font-normal italic" style={{ color: "var(--pf-acid)" }}>look</em>.</>}
      lede="Four shelves we want to fill, and the kind of company we think belongs on each. Pre-seed and seed, UK, Ireland, Europe and India."
    >
      <Thesis />
    </PageShell>
  );
}
