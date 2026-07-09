const ITEMS = [
  "Pre-seed", "Seed", "Developer tools", "Applied AI", "Infrastructure",
  "Open core", "B2B SaaS", "London · Dublin · Berlin", "First cheques £250K–£2M",
  "Founder-first", "Quiet capital", "Patient timelines", "100% reply rate · 7 days",
];

export default function Marquee() {
  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-b py-4"
      style={{ borderColor: "var(--pf-line)", background: "var(--pf-bg-2)" }}
    >
      <div className="pf-marquee">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="pf-mono flex items-center whitespace-nowrap text-[11.5px] uppercase tracking-[0.2em]">
            <span className="mx-6 inline-block h-1.5 w-1.5 rotate-45" style={{ background: "var(--pf-acid)", opacity: 0.7 }} />
            <span style={{ color: "var(--pf-muted)" }}>{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
