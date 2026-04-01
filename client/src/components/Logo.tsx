interface LogoProps {
  textColor: string;
  dotColor: string;
  size?: number;
}

export function Logo({ textColor, dotColor, size = 32 }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      {/* Geometric P mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        <rect width="40" height="40" rx="8" fill="#6366F1" />
        <path
          fillRule="evenodd"
          fill="white"
          d="M8 7 L18 7 Q28 7 28 16 Q28 25 18 25 L13 25 L13 33 L8 33 Z M13 11 L16 11 Q23 11 23 16 Q23 21 16 21 L13 21 Z"
        />
      </svg>

      {/* Wordmark */}
      <span
        className="text-[17px] font-bold font-display tracking-[-0.02em] transition-colors duration-300"
        style={{ color: textColor }}
      >
        PraFounds<span style={{ color: dotColor }}>.</span>
      </span>
    </div>
  );
}
