import Image from "next/image";
import { Section } from "./Section";
import { partners } from "@/lib/partners";

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
}

export function Partners({ copy }: Props) {
  return (
    <Section
      id="partners"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <div className="theme-dark-panel overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.065] shadow-[0_30px_90px_rgba(0,0,0,0.25)] backdrop-blur">
        <div className="relative border-b border-white/10 px-6 py-5 text-white">
          <div className="absolute inset-0 bg-grid-dark opacity-35" aria-hidden="true" />
          <div className="relative flex flex-wrap items-center justify-between gap-3">
            <span className="theme-card-faint text-sm font-semibold uppercase tracking-[0.2em] text-white/58">
              Air-Art network
            </span>
            <span className="theme-card-muted text-sm font-medium text-white/72">
              {partners.length} OEM
            </span>
          </div>
        </div>
        <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-5">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="group flex h-[7.5rem] items-center justify-center overflow-hidden rounded-2xl border border-white/14 bg-white/[0.94] px-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white hover:shadow-[0_22px_50px_rgba(0,0,0,0.22)]"
            >
              {partner.logo ? (
                <span className="relative block h-16 w-full">
                  <Image
                    src={partner.logo.src}
                    alt={`${partner.name} logo`}
                    fill
                    className={`object-contain opacity-[0.82] transition-all duration-300 group-hover:opacity-100 ${partner.logo.className ?? ""}`}
                    sizes="240px"
                  />
                </span>
              ) : (
                <span className="text-base font-semibold uppercase tracking-[0.15em] text-navy/70 transition-colors group-hover:text-navy">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
