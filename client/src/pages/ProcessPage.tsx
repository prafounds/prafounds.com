import PageShell from "@/components/PageShell";
import Process from "@/components/Process";

export default function ProcessPage() {
  return (
    <PageShell
      index="02 · Process"
      title={<>How a <em className="pf-serif font-normal italic" style={{ color: "var(--pf-acid)" }}>yes</em> happens.</>}
      lede="A first reply within seven days, a decision on a cadence you can plan around, and the work that starts after the cheque clears."
    >
      <Process />
    </PageShell>
  );
}
