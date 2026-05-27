interface Props {
  id?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "mist" | "dark";
  children: React.ReactNode;
}

const TONES = {
  light: "theme-section-light",
  mist: "theme-section-mist section-noise",
  dark: "theme-section-dark",
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  tone = "light",
  children,
}: Props) {
  const isDark = tone === "dark";
  return (
    <section
      id={id}
      className={`theme-section relative isolate scroll-mt-24 overflow-hidden ${TONES[tone]} py-20 sm:py-24 lg:py-[7.5rem]`}
    >
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-grid-dark opacity-35" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,136,213,0.22)_0%,transparent_32%),linear-gradient(245deg,rgba(242,165,26,0.13)_0%,transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.05)_0%,transparent_38%,rgba(0,0,0,0.32)_100%)]"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/70 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
            aria-hidden="true"
          />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-grid-fine opacity-45 [mask-image:linear-gradient(180deg,#000,transparent_68%)]" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,136,213,0.08)_0%,transparent_30%),linear-gradient(245deg,rgba(242,165,26,0.06)_0%,transparent_34%)]"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {eyebrow ? (
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ${
                isDark
                  ? "border-white/12 bg-white/[0.07] text-tech-100"
                  : "border-tech/12 bg-white/78 text-tech shadow-sm"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isDark ? "bg-emerald shadow-[0_0_12px_rgba(22,160,113,0.9)]" : "bg-tech"
                }`}
                aria-hidden="true"
              />
              {eyebrow}
            </span>
          ) : null}
          <h2
            className={`mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[46px] ${
              isDark ? "theme-section-heading drop-shadow-[0_18px_42px_rgba(0,0,0,0.35)]" : "text-navy"
            }`}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
                isDark ? "theme-section-muted" : "text-muted"
              }`}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="mt-12 sm:mt-14">{children}</div>
      </div>
    </section>
  );
}
