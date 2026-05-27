import { Section } from "./Section";
import { projects } from "@/lib/projects";
import type { CSSProperties } from "react";

interface ProjectCopy {
  name: string;
  scope: string;
}

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewDetails: string;
    area: string;
    scope: string;
    sqm: string;
    items: Record<string, ProjectCopy>;
  };
  locale: string;
}

function formatArea(n: number, locale: string) {
  try {
    return new Intl.NumberFormat(locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US").format(n);
  } catch {
    return n.toLocaleString();
  }
}

export function Projects({ copy, locale }: Props) {
  const accents = ["#1788d5", "#16a071", "#f2a51a", "#c56a3a", "#7e8da3"];

  return (
    <Section
      id="projects"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const item = copy.items[project.id];
          const featured = index === 0;
          return (
            <li key={project.id} className={featured ? "sm:col-span-2" : undefined}>
              <article className="theme-dark-card group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.065] shadow-[0_26px_80px_rgba(0,0,0,0.26)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.085]">
                <div
                  className={`project-visual relative ${featured ? "aspect-[16/7]" : "aspect-[16/10]"}`}
                  style={{ "--project-accent": accents[index % accents.length] } as CSSProperties}
                >
                  <div className="project-building" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/12 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.2)] backdrop-blur">
                    {formatArea(project.area, locale)} {copy.sqm}
                  </div>
                  {project.year ? (
                    <div className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/28 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {project.year}
                    </div>
                  ) : null}
                  <div className="absolute bottom-4 left-4 right-4 h-px bg-gradient-to-r from-white/0 via-white/35 to-white/0" aria-hidden="true" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`theme-card-title ${featured ? "text-2xl" : "text-lg"} font-semibold leading-snug text-white`}>
                      {item.name}
                    </h3>
                    <span className="theme-card-faint font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/34">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex gap-2">
                      <dt className="theme-card-faint w-20 shrink-0 text-white/42">{copy.area}</dt>
                      <dd className="theme-card-title font-medium text-white/82">
                        {formatArea(project.area, locale)} {copy.sqm}
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="theme-card-faint w-20 shrink-0 text-white/42">{copy.scope}</dt>
                      <dd className="theme-card-muted leading-relaxed text-white/66">{item.scope}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <button
                      type="button"
                      className="group/button inline-flex items-center gap-1.5 text-sm font-semibold text-tech-100 transition-colors hover:text-white"
                    >
                      {copy.viewDetails}
                      <svg className="h-4 w-4 transition-transform group-hover/button:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
