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
    catalogue: string;
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
      className={`theme-header fixed top-0 z-50 w-full transition-all duration-500 ${
        floating
          ? "theme-header-floating bg-transparent text-white"
          : "theme-header-solid bg-white/88 text-ink shadow-[0_18px_44px_rgba(8,20,38,0.08)] backdrop-blur-xl"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          floating
            ? "opacity-0"
            : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[82px] lg:px-8">
        <Logo locale={locale} variant={floating ? "light" : "dark"} />

        <nav
          aria-label="Primary"
          className={`theme-header-nav hidden items-center gap-1 rounded-full p-1 transition-all duration-500 lg:flex ${
            floating
              ? "bg-transparent shadow-none backdrop-blur-0"
              : "bg-white/68 shadow-[0_14px_34px_rgba(8,20,38,0.08)] backdrop-blur"
          }`}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`theme-header-link group relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
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

          <a
            href="/catalogue.pdf"
            target="_blank"
            rel="noopener"
            className={`theme-header-link hidden items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-colors lg:inline-flex ${
              floating
                ? "text-white/88 hover:text-white"
                : "text-ink/72 hover:text-navy"
            }`}
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v12" />
              <path d="M7 12l5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            {nav.catalogue}
          </a>

          <Link
            href={`/${locale}#contact`}
            className={`theme-header-cta shine-hover hidden rounded-full px-5 py-2.5 text-sm font-semibold shadow-[0_12px_26px_rgba(7,21,40,0.2)] transition-all hover:shadow-[0_16px_34px_rgba(7,21,40,0.28)] lg:inline-flex ${
              floating
                ? "bg-transparent text-white shadow-none backdrop-blur-0 hover:bg-white/8"
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
            className={`theme-menu-button inline-flex h-10 w-10 items-center justify-center rounded-xl shadow-sm transition lg:hidden ${
              floating
                ? "bg-transparent text-white shadow-none backdrop-blur-0 hover:bg-white/8"
                : "bg-white/76 text-navy hover:bg-mist"
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
        className={`theme-mobile-menu lg:hidden ${open ? "block" : "hidden"} bg-white shadow-2xl shadow-navy/10`}
      >
        <nav aria-label="Mobile" className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="theme-mobile-link block rounded-xl px-3 py-3 text-base font-medium text-ink transition hover:bg-mist hover:text-navy"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="/catalogue.pdf"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="theme-mobile-link flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-ink transition hover:bg-mist hover:text-navy"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="M7 12l5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>
                {nav.catalogue}
              </a>
            </li>
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3 pt-4">
            <LanguageSwitcher current={locale} />
            <Link
              href={`/${locale}#contact`}
              onClick={() => setOpen(false)}
              className="theme-header-cta rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white shadow-sm"
            >
              {ctaLabel}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
