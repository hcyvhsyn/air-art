import { Section } from "./Section";

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: string[];
  };
}

const ICONS = [
  "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6",
  "M3 21h18M4 21V10h16v11M8 14h2M14 14h2M8 18h2M14 18h2",
  "M4 21V7l8-4 8 4v14M8 21V12h8v9",
  "M4 21V8h16v13M9 21v-6h6v6M8 5h8l-2 3h-4z",
  "M4 21h16M5 21V9l7-5 7 5v12M9 21v-7h6v7M9 11h6",
  "M4 21h16M6 21v-9h12v9M9 12V8a3 3 0 0 1 6 0v4",
  "M3 21h18M4 21V8h16v13M8 12h2M14 12h2M8 16h8",
  "M4 21V10l8-6 8 6v11M9 21v-7h6v7M3 21h18",
  "M3 21h18M4 21V11l4-3v13M10 21V7l4-3v17M16 21V13l4-2v10",
];

export function Industries({ copy }: Props) {
  return (
    <Section
      id="industries"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <div className="theme-dark-panel relative overflow-hidden rounded-[2rem] border border-navy/10 bg-[#07111f] p-4 shadow-[0_34px_90px_rgba(8,20,38,0.18)] sm:p-5 lg:p-6">
        <div className="absolute inset-0 bg-grid-dark opacity-35" aria-hidden="true" />
        <div
          className="absolute inset-0 bg-[linear-gradient(115deg,rgba(23,136,213,0.22),transparent_32%),linear-gradient(245deg,rgba(242,165,26,0.12),transparent_30%)]"
          aria-hidden="true"
        />
        <ul className="relative grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {copy.items.map((item, i) => (
            <li
              key={item}
              className="theme-dark-card group relative flex min-h-[104px] items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.1] sm:px-5"
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/80 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/10 text-tech-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition-colors group-hover:bg-tech group-hover:text-white">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d={ICONS[i % ICONS.length]} />
                </svg>
              </div>
              <span className="theme-card-title text-sm font-semibold text-white sm:text-base">{item}</span>
              <span
                className="theme-card-faint ml-auto hidden h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-[10px] font-semibold text-white/42 transition-colors group-hover:border-tech/35 group-hover:text-tech-100 sm:grid"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
