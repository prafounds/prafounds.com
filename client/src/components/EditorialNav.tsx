export default function EditorialNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-prf-rule bg-prf-paper/85 backdrop-blur-md" style={{ borderColor: "var(--prf-rule)" }}>
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-10">
        <a href="#top" className="flex items-center gap-2.5">
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-md" style={{ background: "var(--prf-ink)", color: "var(--prf-bone)" }}>
            <span style={{ fontFamily: "var(--prf-display)" }} className="text-[15px] font-semibold italic">P</span>
          </span>
          <span style={{ fontFamily: "var(--prf-display)", color: "var(--prf-ink)" }} className="text-[18px] font-semibold tracking-[-0.02em]">PraFounds</span>
        </a>
        <nav className="hidden items-center gap-7 text-[13px] md:flex" style={{ color: "var(--prf-ink-muted)" }}>
          <a href="#thesis" className="hover:opacity-100 opacity-90">Thesis</a>
          <a href="#portfolio" className="hover:opacity-100 opacity-90">Portfolio</a>
          <a href="#partner" className="hover:opacity-100 opacity-90">How we partner</a>
          <a href="#dispatches" className="hover:opacity-100 opacity-90">Dispatches</a>
          <a href="#team" className="hover:opacity-100 opacity-90">Team</a>
        </nav>
        <a href="#apply" className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13px] font-semibold text-white" style={{ background: "var(--prf-ink)" }}>
          Send a deck →
        </a>
      </div>
    </header>
  );
}
