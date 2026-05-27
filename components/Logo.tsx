import Link from "next/link";
import Image from "next/image";
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
        className={`theme-logo-mark relative grid h-11 w-11 place-items-center overflow-hidden rounded-2xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 ${
          variant === "light"
            ? "bg-transparent"
            : "bg-white shadow-[0_12px_28px_rgba(7,21,40,0.14)] ring-1 ring-navy/10"
        }`}
      >
        <span
          className={`absolute inset-x-1 top-1 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent ${
            variant === "light" ? "opacity-0" : "opacity-100"
          }`}
          aria-hidden="true"
        />
        <Image
          src="/airart-logo.png"
          alt=""
          width={1254}
          height={1254}
          priority
          unoptimized
          className="relative h-9 w-9 object-contain"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className={`theme-logo-title text-[15px] font-semibold tracking-tight ${text}`}>
          Air-Art <span className={`theme-logo-accent ${accent}`}>MMC</span>
        </span>
        <span
          className={`theme-logo-subtitle text-[10px] font-medium uppercase tracking-[0.16em] ${
            variant === "light" ? "text-white/60" : "text-muted"
          }`}
        >
          Engineering · HVAC
        </span>
      </span>
    </Link>
  );
}
