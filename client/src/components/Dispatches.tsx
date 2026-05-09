const POSTS = [
  { tag: "ESSAY", title: "Why we don't lead in AI agents (yet).", excerpt: "Most agents shipping today look like demoware. Here's what would change our minds.", date: "May · 2026", min: "9 min read" },
  { tag: "MEMO", title: "What 'patient capital' actually costs us.", excerpt: "We hold longer than the median fund. The math, the friction, the founders we lose.", date: "Apr · 2026", min: "12 min read" },
  { tag: "NOTE", title: "First-cheque criteria, made public.", excerpt: "We've put our diligence rubric on the website. Yes — really. No, it doesn't include 'vibes'.", date: "Mar · 2026", min: "5 min read" },
  { tag: "DATA", title: "The new shape of European pre-seed.", excerpt: "Cheque sizes. Geography. Founder ages. We crunched 1,400 deals from 2024-2026.", date: "Feb · 2026", min: "14 min read" },
];

const TAG_TONE: Record<string, string> = {
  ESSAY: "var(--prf-indigo)",
  MEMO: "var(--prf-amber)",
  NOTE: "var(--prf-leaf)",
  DATA: "var(--prf-rose)",
};

export default function Dispatches() {
  return (
    <section id="dispatches" className="relative py-20 sm:py-28" style={{ background: "var(--prf-paper-2)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <div className="grid gap-3 md:grid-cols-[1.4fr_minmax(0,1fr)] md:items-end md:gap-12">
          <h2 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[36px] font-semibold leading-[1.04] tracking-[-0.02em] sm:text-[56px]">
            Dispatches.
          </h2>
          <p style={{ color: "var(--prf-ink-muted)" }} className="text-[14.5px] leading-relaxed">
            Quarterly memos to portfolio + LPs. We make the back-issues public, because most of the work happens between the press releases.
          </p>
        </div>

        <ul className="mt-12 divide-y rounded-md border bg-white" style={{ borderColor: "var(--prf-rule)", borderTopColor: "var(--prf-rule)" }}>
          {POSTS.map((p) => (
            <li key={p.title} className="grid gap-4 p-6 transition-colors hover:bg-prf-paper-2 sm:grid-cols-[110px_1fr_auto] sm:items-center" style={{ borderColor: "var(--prf-rule)" }}>
              <span style={{ fontFamily: "var(--prf-mono)", color: TAG_TONE[p.tag] }} className="text-[10.5px] font-bold uppercase tracking-[0.22em]">
                {p.tag}
              </span>
              <div>
                <h3 style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[22px] font-semibold leading-snug tracking-[-0.01em]">
                  {p.title}
                </h3>
                <p style={{ color: "var(--prf-ink-muted)" }} className="mt-1.5 max-w-prose text-[14px] leading-relaxed">{p.excerpt}</p>
              </div>
              <div className="flex items-baseline gap-3 text-[12px] sm:flex-col sm:items-end" style={{ color: "var(--prf-ink-muted)" }}>
                <span style={{ fontFamily: "var(--prf-mono)" }}>{p.date}</span>
                <span style={{ fontFamily: "var(--prf-mono)" }}>{p.min}</span>
                <span style={{ color: "var(--prf-indigo)" }} className="text-[12.5px] font-semibold">Read →</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
