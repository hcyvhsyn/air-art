"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

interface NavItem {
  href: string;
  label: string;
}

interface Props {
  locale: Locale;
  nav: {
    home: string;
    about: string;
    services: string;
    projects: string;
    partners: string;
    contact: string;
    menu: string;
    close: string;
  };
  ctaLabel: string;
}

export function Header({ locale, nav, ctaLabel }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: NavItem[] = [
    { href: `/${locale}#about`, label: nav.about },
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}#projects`, label: nav.projects },
    { href: `/${locale}#partners`, label: nav.partners },
    { href: `/${locale}#contact`, label: nav.contact },
  ];
  const floating = !scrolled && !open;

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        floating
          ? "border-b border-white/10 bg-transparent text-white"
          : "border-b border-line/80 bg-white/90 text-ink shadow-[0_18px_44px_rgba(8,20,38,0.08)] backdrop-blur-xl"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          floating
            ? "bg-gradient-to-b from-black/34 via-black/16 to-transparent opacity-100"
            : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent transition-opacity duration-500 ${
          floating ? "via-white/24" : "via-tech/45"
        } to-transparent`}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[82px] lg:px-8">
        <Logo locale={locale} variant={floating ? "light" : "dark"} />

        <nav
          aria-label="Primary"
          className={`hidden items-center gap-1 rounded-full p-1 transition-all duration-500 lg:flex ${
            floating
              ? "border border-transparent bg-transparent"
              : "border border-line/80 bg-white/70 shadow-sm backdrop-blur"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                floating
                  ? "text-white/88 hover:text-white"
                  : "text-ink/72 hover:text-navy"
              }`}
            >
              {item.label}
              <span
                className={`absolute inset-x-3 -bottom-px h-px scale-x-0 bg-gradient-to-r from-transparent transition-transform duration-300 group-hover:scale-x-100 ${
                  floating ? "via-white" : "via-tech"
                } to-transparent`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher current={locale} variant={floating ? "hero" : "header"} />
          </div>

          <Link
            href={`/${locale}#contact`}
            className={`shine-hover hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_12px_26px_rgba(7,21,40,0.2)] transition-all hover:shadow-[0_16px_34px_rgba(7,21,40,0.28)] lg:inline-flex ${
              floating
                ? "border border-white/16 bg-white/12 text-white backdrop-blur hover:bg-white/18"
                : "bg-navy text-white hover:bg-navy-800"
            }`}
          >
            <span className="relative z-10">{ctaLabel}</span>
          </Link>

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? nav.close : nav.menu}
            onClick={() => setOpen((v) => !v)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border shadow-sm transition lg:hidden ${
              floating
                ? "border-white/18 bg-white/12 text-white backdrop-blur hover:bg-white/18"
                : "border-line bg-white text-navy hover:bg-mist"
            }`}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-line bg-white shadow-2xl shadow-navy/10`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-base font-medium text-ink transition hover:bg-mist hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <LanguageSwitcher current={locale} />
            <Link
              href={`/${locale}#contact`}
              onClick={() => setOpen(false)}
              className="rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              {ctaLabel}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
