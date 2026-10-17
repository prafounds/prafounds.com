import { Reveal } from "./reveal";
import { useApplyDialog } from "./ApplyDialog";

const DETAILS: [string, string][] = [
  ["Stage", "Pre-seed and seed (we sometimes follow on)"],
  ["Geography", "UK · Ireland · Europe · India · remote-friendly"],
  ["Cheque", "£250K — £2M (lead in 2 of 3 deals)"],
  ["Sectors", "Developer tools · applied AI · infrastructure · trust & data"],
];

const INK = "var(--pf-ink)";
const INK_MUTED = "rgba(11, 11, 11, 0.62)";
const INK_LINE = "rgba(11, 11, 11, 0.18)";

/**
 * Where applications are pitched.
 *
 * The form itself no longer lives here - it opens as an overlay from any
 * "send a deck" button on the site. See ApplyDialog.
 */
export default function Apply() {
  const { openApply } = useApplyDialog();

  return (
    <section
      id="apply"
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--pf-acid)", color: INK }}
    >
      <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_minmax(0,0.8fr)] lg:items-start lg:gap-20">
        <Reveal>
          <div className="pf-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]" style={{ color: INK_MUTED }}>
            <span style={{ color: INK }}>05</span>
            <span aria-hidden="true" className="h-px w-8" style={{ background: INK_LINE }} />
            <span>Send a deck</span>
          </div>
          <h2 className="pf-display mt-6 font-medium leading-[1.0] tracking-[-0.018em]" style={{ fontSize: "clamp(42px, 6.5vw, 84px)" }}>
            Reply within{" "}
            <em className="pf-serif font-normal" style={{ fontStyle: "italic" }}>
              seven days.
            </em>
            <br />
            Always.
          </h2>
          <p className="mt-6 max-w-xl text-[17px] leading-relaxed" style={{ color: INK_MUTED }}>
            We read every application. We answer with a real reason — yes or no. We don't
            farm out diligence to associates, and we don't ghost.
          </p>

          {/* The section is named "send a deck"; without the embed it would
              otherwise state the criteria and offer no way to act on them. */}
          <button
            type="button"
            onClick={openApply}
            className="pf-mono mt-10 inline-flex h-12 items-center gap-2 rounded-sm px-6 text-[12px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85"
            style={{ background: INK, color: "var(--pf-acid)" }}
          >
            Send a deck
            <span aria-hidden="true">↗</span>
          </button>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="space-y-3 text-[14px]">
            {DETAILS.map(([k, v]) => (
              <li key={k} className="grid gap-1 border-b pb-3 sm:grid-cols-[100px_1fr] sm:gap-4" style={{ borderColor: INK_LINE }}>
                <span className="pf-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_MUTED }}>
                  {k}
                </span>
                <span style={{ color: INK }}>{v}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
