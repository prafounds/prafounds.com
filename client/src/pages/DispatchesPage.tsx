import PageShell from "@/components/PageShell";
import Dispatches from "@/components/Dispatches";

export default function DispatchesPage() {
  return (
    <PageShell
      index="03 · Dispatches"
      title={<>What we <em className="pf-serif font-normal italic" style={{ color: "var(--pf-acid)" }}>publish</em>.</>}
      lede="Quarterly memos to the portfolio, published because the views that shaped a cheque should survive contact with the market."
    >
      <Dispatches />
    </PageShell>
  );
}
