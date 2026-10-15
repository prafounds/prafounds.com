import { Reveal } from "./reveal";

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
 * Where applications are collected.
 *
 * The questions, validation and storage all live in Typeform now - this
 * component only frames and embeds the form. The previous hand-rolled
 * form posted to `/api/applications`; that route and its table still
 * exist server-side but nothing in the client calls them any more.
 *
 * NOTE ON DELIVERY: where a completed response is emailed is a Typeform
 * account setting, not something this code can set. It is configured on
 * the form itself under Connect -> Notifications -> Self notifications.
 * Changing the address here does nothing.
 */
const TYPEFORM_ID = "YhLztiSK";
const TYPEFORM_URL = `https://h9o6fjobcym.typeform.com/to/${TYPEFORM_ID}`;

export default function Apply() {
  return (
    <section
      id="apply"
      className="relative isolate overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--pf-acid)", color: INK }}
    >
      <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:items-start lg:gap-20">
        {/* Sticky beside the form so the pitch and criteria stay in view
            while a founder fills it in, instead of scrolling away. */}
        <Reveal className="lg:sticky lg:top-24">
          <div className="pf-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.24em]" style={{ color: INK_MUTED }}>
            <span style={{ color: INK }}>06</span>
            <span aria-hidden="true" className="h-px w-8" style={{ background: INK_LINE }} />
            <span>Send a deck</span>
          </div>
          <h2 className="pf-display mt-6 font-semibold leading-[0.98] tracking-[-0.03em]" style={{ fontSize: "clamp(42px, 6.5vw, 84px)" }}>
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

          <ul className="mt-10 space-y-3 text-[14px]">
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

        <Reveal delay={0.15}>
          <div
            className="overflow-hidden rounded-sm border"
            style={{ borderColor: "rgba(11, 11, 11, 0.3)", background: "rgba(255, 255, 255, 0.22)" }}
          >
            {/* A plain iframe rather than Typeform's embed SDK: the SDK is
                another third-party script on the critical path, and the
                form needs none of what it adds here. */}
            <iframe
              src={TYPEFORM_URL}
              title="PraFounds application form"
              loading="lazy"
              allow="camera; microphone; autoplay; encrypted-media;"
              className="block h-[70vh] min-h-[560px] w-full border-0"
            />
          </div>

          {/* If the iframe is blocked - strict privacy settings, an
              extension, an old browser - the form is still reachable. */}
          <p className="pf-mono mt-3 text-[10px] uppercase tracking-[0.1em]" style={{ color: INK_MUTED }}>
            Form not loading?{" "}
            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-2"
              style={{ color: INK }}
            >
              Open it in a new tab →
            </a>
          </p>
          <p className="pf-mono mt-2 text-[10px] uppercase tracking-[0.1em]" style={{ color: INK_MUTED }}>
            We reply within 7 days · always · no boilerplate
          </p>
        </Reveal>
      </div>
    </section>
  );
}
