interface LogoProps {
  textColor: string;
  dotColor: string;
  size?: number;
}

export function Logo({ textColor, dotColor, size = 32 }: LogoProps) {
  return (
    <div className="flex items-center gap-[10px]">
      {/* Refined geometric P mark — gradient badge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="pf-bg" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="22" fill="url(#pf-bg)" />
        {/*
          Stem : x 28–44, y 15–85
          Bowl outer: centre (44,42) r=27  → bottom y=69, right x=71
          Bowl inner: centre (44,42) r=16  → top y=26, bottom y=58
          Wall thickness: 11 px (consistent top/right/bottom)
        */}
        <path
          fillRule="evenodd"
          fill="white"
          d="M28 85 L44 85 L44 69 A27 27 0 0 1 44 15 L28 15 Z
             M44 26 A16 16 0 0 1 44 58 Z"
        />
      </svg>

      {/* Wordmark: "Pra" light + "Founds" bold */}
      <span
        className="font-display tracking-[-0.025em] transition-colors duration-300 select-none"
        style={{ color: textColor, fontSize: size * 0.53, lineHeight: 1 }}
      >
        <span style={{ fontWeight: 400 }}>Pra</span>
        <span style={{ fontWeight: 700 }}>Founds</span>
        <span style={{ color: dotColor, fontWeight: 700 }}>.</span>
      </span>
    </div>
  );
}
