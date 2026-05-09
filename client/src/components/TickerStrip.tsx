const ITEMS = [
  "Pre-seed", "Seed", "Developer tools", "Applied AI", "Infrastructure",
  "Open core", "B2B SaaS", "London · Dublin · Berlin", "First cheques £250K–£2M",
  "Founder-first", "Quiet capital", "Patient timelines", "100% reply rate · 7 days",
];

export default function TickerStrip() {
  return (
    <section className="relative overflow-hidden border-y" style={{ borderColor: "var(--prf-rule-strong)", background: "var(--prf-ink)", color: "var(--prf-bone)" }}>
      <div className="relative py-4">
        <div className="prf-ticker">
          {[...ITEMS, ...ITEMS].map((it, i) => (
            <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap text-[12.5px]" style={{ fontFamily: "var(--prf-mono)" }}>
              <span style={{ color: "rgba(255,255,255,0.50)" }}>·</span>
              <span style={{ color: "rgba(255,255,255,0.86)", textTransform: "uppercase", letterSpacing: "0.18em" }}>{it}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
