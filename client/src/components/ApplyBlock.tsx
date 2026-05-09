export default function ApplyBlock() {
  return (
    <section id="apply" className="relative isolate overflow-hidden py-24 sm:py-32" style={{ background: "var(--prf-ink)", color: "var(--prf-bone)" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="prf-orb absolute -top-32 left-1/4 h-[480px] w-[480px] rounded-full" style={{ background: "rgba(99,102,241,0.20)", filter: "blur(140px)" }} />
        <div className="prf-orb absolute -bottom-32 right-1/4 h-[420px] w-[420px] rounded-full" style={{ background: "rgba(217,119,6,0.20)", filter: "blur(140px)", animationDelay: "-4s" }} />
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-10 lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:gap-20 lg:items-start">
        <div>
          <span style={{ fontFamily: "var(--prf-mono)", color: "rgba(255,255,255,0.55)" }} className="text-[10.5px] uppercase tracking-[0.22em]">
            Send a deck
          </span>
          <h2 style={{ fontFamily: "var(--prf-display)" }} className="mt-3 text-[40px] font-semibold leading-[1.0] tracking-[-0.025em] sm:text-[60px] lg:text-[76px]">
            Reply within{" "}
            <span style={{ fontStyle: "italic", color: "var(--prf-amber-2)" }}>seven days.</span>
            <br />
            Always.
          </h2>
          <p style={{ color: "rgba(250,246,233,0.78)", fontFamily: "var(--prf-display)", fontStyle: "italic" }} className="mt-6 max-w-xl text-[18px] leading-relaxed">
            We read every email. We answer with a real reason — yes or no. We don't farm out diligence to associates, and we don't ghost.
          </p>

          <ul className="mt-9 space-y-3 text-[14px]" style={{ color: "rgba(250,246,233,0.82)" }}>
            {[
              ["Stage", "Pre-seed and seed (we sometimes follow on)"],
              ["Geography", "UK · Ireland · Europe · remote-friendly"],
              ["Cheque", "£250K — £2M (lead in 2 of 3 deals)"],
              ["Sectors", "Developer tools · applied AI · infrastructure · trust & data"],
            ].map(([k, v]) => (
              <li key={k} className="grid grid-cols-[100px_1fr] gap-4 border-b pb-3" style={{ borderColor: "rgba(255,255,255,0.10)" }}>
                <span style={{ fontFamily: "var(--prf-mono)", color: "rgba(255,255,255,0.55)" }} className="text-[10.5px] uppercase tracking-[0.18em]">{k}</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <form className="rounded-md border bg-white/[0.04] p-6 backdrop-blur-md" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          <div className="grid gap-4">
            <Field label="Founder name" placeholder="Maya Ramirez" />
            <Field label="Email" placeholder="you@startup.com" type="email" />
            <Field label="Company / website" placeholder="acme.io · 1-line description" />
            <div>
              <label style={{ fontFamily: "var(--prf-mono)", color: "rgba(255,255,255,0.55)" }} className="text-[10.5px] uppercase tracking-[0.18em]">Pitch · 200 words max</label>
              <textarea rows={5} placeholder="What you're building, why now, and what you'd want from us." className="mt-2 w-full rounded-md border bg-transparent px-3 py-2.5 text-[14px] outline-none placeholder:text-white/30" style={{ borderColor: "rgba(255,255,255,0.18)", color: "var(--prf-bone)" }} />
            </div>
            <Field label="Deck link · optional" placeholder="docsend, drive, dropbox, anything" />
            <button type="submit" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[14px] font-semibold" style={{ background: "var(--prf-amber-2)", color: "var(--prf-ink)" }}>
              Send to a partner →
            </button>
            <p style={{ color: "rgba(250,246,233,0.55)", fontFamily: "var(--prf-mono)" }} className="text-[10.5px]">
              We reply within 7 days · always · no boilerplate
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <div>
      <label style={{ fontFamily: "var(--prf-mono)", color: "rgba(255,255,255,0.55)" }} className="text-[10.5px] uppercase tracking-[0.18em]">{label}</label>
      <input type={type} placeholder={placeholder} className="mt-2 w-full rounded-md border bg-transparent px-3 py-2.5 text-[14px] outline-none placeholder:text-white/30" style={{ borderColor: "rgba(255,255,255,0.18)", color: "var(--prf-bone)" }} />
    </div>
  );
}
