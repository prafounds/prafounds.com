import { Reveal } from "./reveal";

const DETAILS: [string, string][] = [
  ["Stage", "Pre-seed and seed (we sometimes follow on)"],
  ["Geography", "UK · Ireland · Europe · remote-friendly"],
  ["Cheque", "£250K — £2M (lead in 2 of 3 deals)"],
  ["Sectors", "Developer tools · applied AI · infrastructure · trust & data"],
];

const INK = "var(--pf-ink)";
const INK_MUTED = "rgba(10, 11, 14, 0.62)";
const INK_LINE = "rgba(10, 11, 14, 0.18)";

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label className="pf-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_MUTED }}>
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border bg-white/35 px-3 py-2.5 text-[14px] outline-none transition-colors placeholder:text-black/30 focus:border-black"
        style={{ borderColor: INK_LINE, color: INK }}
      />
    </div>
  );
}

export default function Apply() {
  return (
    <section id="apply" className="relative isolate overflow-hidden py-24 sm:py-32" style={{ background: "var(--pf-acid)", color: INK }}>
      <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:items-start lg:gap-20">
        <Reveal>
          <div className="pf-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]" style={{ color: INK_MUTED }}>
            <span style={{ color: INK }}>07</span>
            <span aria-hidden="true" className="h-px w-8" style={{ background: INK_LINE }} />
            <span>Send a deck</span>
          </div>
          <h2
            className="pf-display mt-6 font-semibold leading-[0.98] tracking-[-0.03em]"
            style={{ fontSize: "clamp(42px, 6.5vw, 84px)" }}
          >
            Reply within{" "}
            <em className="pf-serif font-normal" style={{ fontStyle: "italic" }}>
              seven days.
            </em>
            <br />
            Always.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: INK_MUTED }}>
            We read every email. We answer with a real reason — yes or no. We don't farm
            out diligence to associates, and we don't ghost.
          </p>

          <ul className="mt-10 space-y-3 text-[14px]">
            {DETAILS.map(([k, v]) => (
              <li key={k} className="grid grid-cols-[100px_1fr] gap-4 border-b pb-3" style={{ borderColor: INK_LINE }}>
                <span className="pf-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_MUTED }}>
                  {k}
                </span>
                <span style={{ color: INK }}>{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <form
            className="rounded-sm border p-6 sm:p-7"
            style={{ borderColor: "rgba(10, 11, 14, 0.3)", background: "rgba(255, 255, 255, 0.22)" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-4">
              <Field label="Founder name" placeholder="Maya Ramirez" />
              <Field label="Email" placeholder="you@startup.com" type="email" />
              <Field label="Company / website" placeholder="acme.io · 1-line description" />
              <div>
                <label className="pf-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_MUTED }}>
                  Pitch · 200 words max
                </label>
                <textarea
                  rows={5}
                  placeholder="What you're building, why now, and what you'd want from us."
                  className="mt-2 w-full rounded-sm border bg-white/35 px-3 py-2.5 text-[14px] outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  style={{ borderColor: INK_LINE, color: INK }}
                />
              </div>
              <Field label="Deck link · optional" placeholder="docsend, drive, dropbox, anything" />
              <button
                type="submit"
                className="pf-mono mt-2 inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
                style={{ background: INK, color: "var(--pf-acid)" }}
              >
                Send to a partner →
              </button>
              <p className="pf-mono text-[10px] uppercase tracking-[0.1em]" style={{ color: INK_MUTED }}>
                We reply within 7 days · always · no boilerplate
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
