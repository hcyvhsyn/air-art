import { Section } from "./Section";

interface Item {
  title: string;
  desc: string;
}

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Item[];
  };
}

export function WhyChooseUs({ copy }: Props) {
  return (
    <Section
      id="why"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {copy.items.map((item, i) => (
          <li
            key={item.title}
            className="theme-dark-card group relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] p-6 shadow-[0_24px_76px_rgba(0,0,0,0.24)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.1]"
          >
            <div
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-grid-dark opacity-0 transition-opacity duration-300 group-hover:opacity-30" aria-hidden="true" />
            <div className="flex items-center gap-3">
              <span className="relative grid h-10 w-10 place-items-center rounded-2xl border border-tech/28 bg-tech/14 text-xs font-semibold text-tech-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                0{i + 1}
              </span>
              <h3 className="theme-card-title relative text-base font-semibold text-white">{item.title}</h3>
            </div>
            <p className="theme-card-muted relative mt-4 text-sm leading-relaxed text-white/65">{item.desc}</p>
            <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-white/8">
              <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-tech via-emerald to-accent transition-all duration-500 group-hover:w-full" />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
