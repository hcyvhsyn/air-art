"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n";

interface Props {
  current: Locale;
  variant?: "header" | "footer" | "hero";
}

export function LanguageSwitcher({ current, variant = "header" }: Props) {
  const pathname = usePathname() ?? `/${current}`;

  const buildHref = (target: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${target}`;
    segments[0] = target;
    return "/" + segments.join("/");
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border p-0.5 text-xs font-medium ${
        variant === "footer"
          ? "border-white/15 bg-white/5"
          : variant === "hero"
            ? "border-white/16 bg-white/10 backdrop-blur"
          : "border-line bg-white/70 backdrop-blur"
      }`}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            href={buildHref(locale)}
            aria-current={active ? "true" : undefined}
            className={`min-w-[34px] rounded-full px-2.5 py-1 text-center uppercase tracking-wide transition-colors ${
              active
                ? variant === "footer"
                  ? "bg-white text-navy"
                  : variant === "hero"
                    ? "bg-white text-navy"
                  : "bg-navy text-white"
                : variant === "footer"
                  ? "text-white/70 hover:text-white"
                  : variant === "hero"
                    ? "text-white/72 hover:text-white"
                  : "text-muted hover:text-navy"
            }`}
          >
            {locale}
          </Link>
        );
      })}
    </div>
  );
}
