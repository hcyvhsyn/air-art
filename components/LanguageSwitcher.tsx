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
      className={`theme-language-switcher inline-flex items-center rounded-full p-0.5 text-xs font-medium ${
        variant === "footer"
          ? "border border-white/15 bg-white/5"
          : variant === "hero"
            ? "bg-transparent"
          : "bg-white/70 backdrop-blur"
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
            className={`theme-language-link ${active ? "theme-language-link-active" : ""} min-w-[34px] rounded-full px-2.5 py-1 text-center uppercase tracking-wide transition-colors ${
              active
                ? variant === "footer"
                  ? "bg-white text-navy"
                  : variant === "hero"
                    ? "bg-transparent text-white underline decoration-white/70 underline-offset-4"
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
