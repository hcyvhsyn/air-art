import Link from "next/link";
import { HeroBanner } from "./HeroBanner";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  hero: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    ctaServices: string;
    ctaContact: string;
    cardTitle: string;
    cardSubtitle: string;
    badges: string[];
  };
}

export function Hero({ locale, hero }: Props) {
  return (
    <section className="relative isolate min-h-[760px] overflow-hidden bg-[#07111f] text-white sm:min-h-[820px] lg:min-h-screen">
      <HeroBanner />

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[var(--section-blend)] to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-4 pt-32 pb-36 sm:min-h-[820px] sm:px-6 lg:min-h-screen lg:px-8 lg:pt-36 lg:pb-40">
        <div className="animate-fade-up max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/82 shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_12px_rgba(22,160,113,0.9)]" />
            {hero.eyebrow}
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.02] tracking-tight text-white drop-shadow-[0_18px_44px_rgba(0,0,0,0.42)] sm:text-5xl lg:text-7xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-lg">
            {hero.subtitle}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={`/${locale}#services`}
              className="shine-hover inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy shadow-[0_18px_36px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5 hover:bg-tech-50"
            >
              <span className="relative z-10">{hero.ctaServices}</span>
              <svg className="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-white/6 px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/12"
            >
              {hero.ctaContact}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
