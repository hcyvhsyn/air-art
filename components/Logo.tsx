import Link from "next/link";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  variant?: "dark" | "light";
}

export function Logo({ locale, variant = "dark" }: Props) {
  const text = variant === "light" ? "text-white" : "text-navy";
  const accent = variant === "light" ? "text-tech-100" : "text-tech";

  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex items-center gap-3"
      aria-label="Air-Art MMC"
    >
      <span
        className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${
          variant === "light"
            ? "bg-white/10 ring-1 ring-white/20"
            : "bg-gradient-to-br from-navy via-navy-800 to-tech shadow-[0_12px_28px_rgba(7,21,40,0.24)]"
        }`}
      >
        <span
          className="absolute inset-x-1 top-1 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
          aria-hidden="true"
        />
        <svg
          viewBox="0 0 24 24"
          className="relative h-5 w-5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 8h12a3 3 0 1 0-3-3" />
          <path d="M4 12h16a3 3 0 1 1-3 3" />
          <path d="M4 16h9" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`text-[15px] font-semibold tracking-tight ${text}`}>
          Air-Art <span className={accent}>MMC</span>
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.16em] ${
            variant === "light" ? "text-white/60" : "text-muted"
          }`}
        >
          Engineering · HVAC
        </span>
      </span>
    </Link>
  );
}
