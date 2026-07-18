import Image from "next/image";
import { Section } from "./Section";
import { Icon } from "./Icon";
import type { ServiceIcon } from "@/lib/services";

interface Value {
  title: string;
  desc: string;
}

interface Props {
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    values: {
      experience: Value;
      quality: Value;
      efficiency: Value;
    };
  };
}

const VALUE_ICONS: Record<keyof Props["about"]["values"], ServiceIcon> = {
  experience: "shield",
  quality: "blueprint",
  efficiency: "gauge",
};

export function About({ about }: Props) {
  const values = [
    { key: "experience" as const, ...about.values.experience },
    { key: "quality" as const, ...about.values.quality },
    { key: "efficiency" as const, ...about.values.efficiency },
  ];

  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.title} subtitle={about.lead} tone="dark">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div className="group relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/14 bg-[#07111f] shadow-[0_34px_90px_rgba(8,20,38,0.24)]">
            <Image
              src="/airart-banner2.png"
              alt=""
              fill
              className="object-cover opacity-[0.64] transition duration-700 group-hover:scale-[1.025]"
              sizes="(min-width: 1024px) 58vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,20,0.9)_0%,rgba(3,10,20,0.62)_45%,rgba(3,10,20,0.24)_100%)]" aria-hidden="true" />
            <div className="absolute inset-0 bg-grid-dark opacity-35" aria-hidden="true" />
            <div className="relative flex min-h-[520px] flex-col justify-end p-6 text-white sm:p-8 lg:p-10">
              <div className="max-w-xl">
                <span className="inline-flex items-center rounded-full border border-white/14 bg-white/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/62 backdrop-blur">
                  Air-Art MMC
                </span>
                <p className="mt-5 text-lg leading-relaxed text-white/76">{about.body}</p>
              </div>
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {values.map((v, index) => (
                  <div
                    key={v.key}
                    className="rounded-2xl border border-white/12 bg-white/9 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/42">
                      0{index + 1}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-white">{v.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1">
          {values.map((v) => (
            <article
              key={v.key}
              className="theme-dark-card group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.065] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.09]"
            >
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,136,213,0.1),transparent_36%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white shadow-[0_16px_34px_rgba(7,21,40,0.2)] transition-colors group-hover:bg-tech">
                <Icon name={VALUE_ICONS[v.key]} className="h-5 w-5" />
              </div>
              <h3 className="theme-card-title relative mt-5 text-lg font-semibold text-white">{v.title}</h3>
              <p className="theme-card-muted relative mt-2 text-sm leading-relaxed text-white/66">{v.desc}</p>
              <div className="relative mt-6 h-px w-16 bg-gradient-to-r from-tech via-emerald to-transparent transition-all duration-300 group-hover:w-28" />
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
