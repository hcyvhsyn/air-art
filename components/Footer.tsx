import Link from "next/link";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { services } from "@/lib/services";
import type { Locale } from "@/lib/i18n";

interface ServiceCopy {
  title: string;
  desc: string;
}

interface Props {
  locale: Locale;
  copy: {
    tagline: string;
    quickLinks: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
  };
  nav: {
    about: string;
    services: string;
    projects: string;
    partners: string;
    contact: string;
  };
  contact: {
    addressValue: string;
    phoneValues: string[];
    emailValue: string;
  };
  serviceItems: Record<string, ServiceCopy>;
}

export function Footer({ locale, copy, nav, contact, serviceItems }: Props) {
  const year = new Date().getFullYear();
  const quick = [
    { href: `/${locale}#about`, label: nav.about },
    { href: `/${locale}#services`, label: nav.services },
    { href: `/${locale}#projects`, label: nav.projects },
    { href: `/${locale}#partners`, label: nav.partners },
    { href: `/${locale}#contact`, label: nav.contact },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="absolute inset-0 bg-grid-dark opacity-50" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,136,213,0.18),transparent_34%),linear-gradient(245deg,rgba(242,165,26,0.12),transparent_38%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_34px_90px_rgba(0,0,0,0.24)] backdrop-blur sm:p-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo locale={locale} variant="light" />
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
                {copy.tagline}
              </p>
              <div className="mt-6">
                <LanguageSwitcher current={locale} variant="footer" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {copy.quickLinks}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {quick.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {copy.servicesTitle}
              </h4>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <Link
                      href={`/${locale}#services`}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {serviceItems[s.id]?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
                {copy.contactTitle}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/75">
                <li>{contact.addressValue}</li>
                {contact.phoneValues.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="hover:text-white"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${contact.emailValue}`}
                    className="hover:text-white"
                  >
                    {contact.emailValue}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
            <div>
              © {year} Air-Art MMC. {copy.rights}
            </div>
            <div className="font-mono uppercase tracking-[0.15em]">
              HVAC · VRF · CHILLER · BOILER
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
