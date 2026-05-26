import { Section } from "./Section";
import { Icon } from "./Icon";
import { services } from "@/lib/services";

interface ServiceCopy {
  title: string;
  desc: string;
}

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Record<string, ServiceCopy>;
  };
}

export function Services({ copy }: Props) {
  return (
    <Section
      id="services"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {services.map((service, index) => {
          const item = copy.items[service.id];
          return (
            <li key={service.id}>
              <article className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[1.6rem] border border-white/12 bg-white/[0.065] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.09]">
                <div
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 bg-grid-dark opacity-0 transition-opacity duration-300 group-hover:opacity-30"
                  aria-hidden="true"
                />
                <div className="flex items-start justify-between gap-4">
                  <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/9 text-tech-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-colors group-hover:bg-tech group-hover:text-white">
                    <Icon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span className="relative font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="relative mt-6 text-base font-semibold leading-snug text-white">
                  {item.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-white/62">{item.desc}</p>
                <div className="relative mt-auto pt-6">
                  <span className="block h-px w-12 bg-gradient-to-r from-tech via-emerald to-transparent transition-all duration-300 group-hover:w-24" />
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
