import { useState, type ReactNode } from "react";
import { Reveal } from "./reveal";
import { useSubmitApplication } from "@/hooks/use-application";
import { api, SECTORS, STAGES, type InsertApplication } from "@shared/routes";
import { Check, AlertCircle, Loader2 } from "lucide-react";

const DETAILS: [string, string][] = [
  ["Stage", "Pre-seed and seed (we sometimes follow on)"],
  ["Geography", "UK · Ireland · Europe · India · remote-friendly"],
  ["Cheque", "£250K — £2M (lead in 2 of 3 deals)"],
  ["Sectors", "Developer tools · applied AI · infrastructure · trust & data"],
];

const INK = "var(--pf-ink)";
const INK_MUTED = "rgba(10, 11, 14, 0.62)";
const INK_LINE = "rgba(10, 11, 14, 0.18)";

type Errors = Partial<Record<keyof InsertApplication, string>>;

const inputClass =
  "mt-2 w-full rounded-sm border bg-white/35 px-3 py-3 text-[16px] sm:py-2.5 sm:text-[14px] outline-none transition-colors placeholder:text-black/30 focus:border-black disabled:opacity-60";

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <span className="pf-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: INK_MUTED }}>
      {children}
      {required && (
        <span aria-hidden="true" style={{ color: INK }}>
          {" "}
          *
        </span>
      )}
    </span>
  );
}

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-1.5 text-[12px] font-medium" style={{ color: "#8a1c10" }}>
      {msg}
    </p>
  );
}

/** Heading for a block of related questions. */
function Group({ n, title }: { n: string; title: string }) {
  return (
    <div
      className="pf-mono col-span-full flex items-center gap-3 border-b pb-2 pt-2 text-[10px] uppercase tracking-[0.2em]"
      style={{ borderColor: INK_LINE, color: INK_MUTED }}
    >
      <span style={{ color: INK }}>{n}</span>
      {title}
    </div>
  );
}

export default function Apply() {
  const submit = useSubmitApplication();
  const [errors, setErrors] = useState<Errors>({});
  const [values, setValues] = useState<Record<string, string>>({
    founderName: "", email: "", role: "", linkedin: "",
    companyName: "", website: "", oneLiner: "", sector: "", location: "", teamSize: "",
    stage: "", raising: "", traction: "", deckLink: "", heardVia: "", notes: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    // Clear a field's error as soon as the founder edits it.
    setErrors((prev) => (prev[k as keyof InsertApplication] ? { ...prev, [k]: undefined } : prev));
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Strip empties so optional fields don't fail URL/length checks.
    const payload = Object.fromEntries(
      Object.entries(values).filter(([, v]) => v.trim() !== ""),
    );
    const parsed = api.applications.create.input.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.errors) {
        const key = issue.path[0] as keyof InsertApplication;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      // Move focus to the first problem so keyboard and screen-reader
      // users aren't left guessing why nothing happened.
      const first = parsed.error.errors[0]?.path[0];
      if (first) document.getElementById(`ap-${String(first)}`)?.focus();
      return;
    }
    setErrors({});
    submit.mutate(parsed.data);
  }

  const busy = submit.isPending;

  /* ── Success ───────────────────────────────────────────────────── */
  if (submit.isSuccess) {
    return (
      <section id="apply" className="relative isolate overflow-hidden py-24 sm:py-32" style={{ background: "var(--pf-acid)", color: INK }}>
        <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />
        <div className="mx-auto max-w-[760px] px-5 text-center sm:px-10">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border" style={{ borderColor: INK }}>
            <Check size={24} />
          </div>
          <h2 className="pf-display mt-8 font-semibold leading-[1] tracking-[-0.03em]" style={{ fontSize: "clamp(36px, 5.5vw, 68px)" }}>
            Got it.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed" style={{ color: INK_MUTED }}>
            Your application for <strong style={{ color: INK }}>{submit.data.companyName}</strong> is
            with us. A partner reads every one — you'll hear back within seven days, with a
            real reason either way.
          </p>
        </div>
      </section>
    );
  }

  /* ── Form ──────────────────────────────────────────────────────── */
  return (
    <section id="apply" className="relative isolate overflow-hidden py-24 sm:py-32" style={{ background: "var(--pf-acid)", color: INK }}>
      <div aria-hidden="true" className="pf-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.05]" />

      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-10 lg:grid-cols-[1fr_minmax(0,1.05fr)] lg:items-start lg:gap-20">
        {/* Sticky beside the long form so the pitch and criteria stay in
            view while a founder fills it in, instead of scrolling away. */}
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
          <form
            noValidate
            onSubmit={onSubmit}
            className="rounded-sm border p-6 sm:p-7"
            style={{ borderColor: "rgba(10, 11, 14, 0.3)", background: "rgba(255, 255, 255, 0.22)" }}
          >
            <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
              <Group n="01" title="You" />

              <div>
                <label htmlFor="ap-founderName"><Label required>Your name</Label></label>
                <input id="ap-founderName" name="founderName" value={values.founderName} onChange={set("founderName")}
                  disabled={busy} placeholder="Maya Ramirez" autoComplete="name"
                  aria-invalid={!!errors.founderName} aria-describedby={errors.founderName ? "e-founderName" : undefined}
                  className={inputClass} style={{ borderColor: errors.founderName ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-founderName" msg={errors.founderName} />
              </div>

              <div>
                <label htmlFor="ap-email"><Label required>Email</Label></label>
                <input id="ap-email" name="email" type="email" value={values.email} onChange={set("email")}
                  disabled={busy} placeholder="you@startup.com" autoComplete="email"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined}
                  className={inputClass} style={{ borderColor: errors.email ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-email" msg={errors.email} />
              </div>

              <div>
                <label htmlFor="ap-role"><Label>Role</Label></label>
                <input id="ap-role" name="role" value={values.role} onChange={set("role")} disabled={busy}
                  placeholder="Co-founder & CTO" className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <div>
                <label htmlFor="ap-linkedin"><Label>LinkedIn</Label></label>
                <input id="ap-linkedin" name="linkedin" value={values.linkedin} onChange={set("linkedin")} disabled={busy}
                  placeholder="linkedin.com/in/…" aria-invalid={!!errors.linkedin}
                  className={inputClass} style={{ borderColor: errors.linkedin ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-linkedin" msg={errors.linkedin} />
              </div>

              <Group n="02" title="Company" />

              <div>
                <label htmlFor="ap-companyName"><Label required>Company</Label></label>
                <input id="ap-companyName" name="companyName" value={values.companyName} onChange={set("companyName")}
                  disabled={busy} placeholder="Acme" autoComplete="organization"
                  aria-invalid={!!errors.companyName}
                  className={inputClass} style={{ borderColor: errors.companyName ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-companyName" msg={errors.companyName} />
              </div>

              <div>
                <label htmlFor="ap-website"><Label>Website</Label></label>
                <input id="ap-website" name="website" value={values.website} onChange={set("website")} disabled={busy}
                  placeholder="acme.io" aria-invalid={!!errors.website}
                  className={inputClass} style={{ borderColor: errors.website ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-website" msg={errors.website} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ap-oneLiner"><Label required>What do you do? One sentence</Label></label>
                <input id="ap-oneLiner" name="oneLiner" value={values.oneLiner} onChange={set("oneLiner")} disabled={busy}
                  maxLength={220} placeholder="We help engineers navigate giant codebases by intent, not files."
                  aria-invalid={!!errors.oneLiner}
                  className={inputClass} style={{ borderColor: errors.oneLiner ? "#8a1c10" : INK_LINE, color: INK }} />
                <div className="mt-1 flex items-start justify-between gap-3">
                  <FieldError id="e-oneLiner" msg={errors.oneLiner} />
                  <span className="pf-mono ml-auto text-[10px]" style={{ color: INK_MUTED }}>
                    {values.oneLiner.length}/220
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="ap-sector"><Label required>Sector</Label></label>
                <select id="ap-sector" name="sector" value={values.sector} onChange={set("sector")} disabled={busy}
                  aria-invalid={!!errors.sector}
                  className={inputClass} style={{ borderColor: errors.sector ? "#8a1c10" : INK_LINE, color: values.sector ? INK : "rgba(0,0,0,0.3)" }}>
                  <option value="">Select…</option>
                  {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <FieldError id="e-sector" msg={errors.sector} />
              </div>

              <div>
                <label htmlFor="ap-location"><Label>Where are you based?</Label></label>
                <input id="ap-location" name="location" value={values.location} onChange={set("location")} disabled={busy}
                  placeholder="London, UK" className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <Group n="03" title="The round" />

              <div>
                <label htmlFor="ap-stage"><Label required>Stage</Label></label>
                <select id="ap-stage" name="stage" value={values.stage} onChange={set("stage")} disabled={busy}
                  aria-invalid={!!errors.stage}
                  className={inputClass} style={{ borderColor: errors.stage ? "#8a1c10" : INK_LINE, color: values.stage ? INK : "rgba(0,0,0,0.3)" }}>
                  <option value="">Select…</option>
                  {STAGES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <FieldError id="e-stage" msg={errors.stage} />
              </div>

              <div>
                <label htmlFor="ap-raising"><Label>Raising</Label></label>
                <input id="ap-raising" name="raising" value={values.raising} onChange={set("raising")} disabled={busy}
                  placeholder="£1.2M" className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <div>
                <label htmlFor="ap-teamSize"><Label>Team size</Label></label>
                <input id="ap-teamSize" name="teamSize" value={values.teamSize} onChange={set("teamSize")} disabled={busy}
                  placeholder="4" className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <div>
                <label htmlFor="ap-deckLink"><Label>Deck link</Label></label>
                <input id="ap-deckLink" name="deckLink" value={values.deckLink} onChange={set("deckLink")} disabled={busy}
                  placeholder="docsend, drive, dropbox" aria-invalid={!!errors.deckLink}
                  className={inputClass} style={{ borderColor: errors.deckLink ? "#8a1c10" : INK_LINE, color: INK }} />
                <FieldError id="e-deckLink" msg={errors.deckLink} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ap-traction"><Label>Traction so far</Label></label>
                <textarea id="ap-traction" name="traction" rows={2} value={values.traction} onChange={set("traction")}
                  disabled={busy} placeholder="Revenue, users, pilots, design partners — whatever is true."
                  className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ap-notes"><Label>Anything else</Label></label>
                <textarea id="ap-notes" name="notes" rows={3} value={values.notes} onChange={set("notes")}
                  disabled={busy} placeholder="Why now, and what you'd want from us."
                  className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="ap-heardVia"><Label>How did you hear about us?</Label></label>
                <input id="ap-heardVia" name="heardVia" value={values.heardVia} onChange={set("heardVia")} disabled={busy}
                  placeholder="A founder we back, an event, the internet"
                  className={inputClass} style={{ borderColor: INK_LINE, color: INK }} />
              </div>

              {submit.isError && (
                <div role="alert" className="sm:col-span-2 flex items-start gap-2 rounded-sm border px-3 py-2.5 text-[13px]"
                  style={{ borderColor: "#8a1c10", color: "#8a1c10", background: "rgba(255,255,255,0.4)" }}>
                  <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
                  <span>
                    {submit.error.message}
                    {submit.error.fallbackEmail && (
                      <>
                        {" "}
                        <a href={`mailto:${submit.error.fallbackEmail}`} className="underline" style={{ color: INK }}>
                          {submit.error.fallbackEmail}
                        </a>
                      </>
                    )}
                  </span>
                </div>
              )}

              <div className="sm:col-span-2">
                <button type="submit" disabled={busy}
                  className="pf-mono mt-2 inline-flex w-full items-center justify-center gap-2 rounded-sm px-6 py-3.5 text-[12.5px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-85 disabled:opacity-60"
                  style={{ background: INK, color: "var(--pf-acid)" }}>
                  {busy ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <>Send to a partner →</>}
                </button>
                <p className="pf-mono mt-3 text-[10px] uppercase tracking-[0.1em]" style={{ color: INK_MUTED }}>
                  * required · we reply within 7 days · always · no boilerplate
                </p>
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
