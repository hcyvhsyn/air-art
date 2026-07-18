"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/lib/projects";

interface ProjectCopy {
  name: string;
  scope: string;
}

export interface ProjectShowcaseCopy {
  viewDetails: string;
  viewGallery: string;
  area: string;
  scope: string;
  sqm: string;
  photos: string;
  photo: string;
  gallery: string;
  close: string;
  previous: string;
  next: string;
  items: Record<string, ProjectCopy>;
}

interface Props {
  projects: Project[];
  copy: ProjectShowcaseCopy;
  locale: string;
}

const ACCENTS = ["#1788d5", "#16a071", "#f2a51a", "#c56a3a", "#7e8da3"];

function formatArea(n: number, locale: string) {
  try {
    return new Intl.NumberFormat(
      locale === "az" ? "az-AZ" : locale === "ru" ? "ru-RU" : "en-US",
    ).format(n);
  } catch {
    return n.toLocaleString();
  }
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

export function ProjectShowcase({ projects, copy, locale }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const active = openIndex === null ? null : projects[openIndex];
  const activeCopy = active ? copy.items[active.id] : null;

  const close = useCallback(() => setOpenIndex(null), []);

  const open = useCallback((index: number) => {
    setOpenIndex(index);
    setActiveImage(0);
  }, []);

  const step = useCallback(
    (delta: number) => {
      if (!active) return;
      const total = active.images.length;
      setActiveImage((current) => (current + delta + total) % total);
    },
    [active],
  );

  // Keyboard controls + body scroll lock while the lightbox is open.
  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const item = copy.items[project.id];
          const featured = index === 0;
          const count = project.images.length;
          const accent = ACCENTS[index % ACCENTS.length];

          return (
            <li key={project.id} className={featured ? "sm:col-span-2" : undefined}>
              <button
                type="button"
                onClick={() => open(index)}
                aria-label={`${item.name} — ${copy.gallery}`}
                className="theme-dark-card group flex h-full w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.065] text-left shadow-[0_26px_80px_rgba(0,0,0,0.26)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.085] focus:outline-none focus-visible:ring-2 focus-visible:ring-tech/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                style={{ "--project-accent": accent } as CSSProperties}
              >
                <div className={`relative overflow-hidden ${featured ? "aspect-[16/8] sm:aspect-[16/7]" : "aspect-[16/10]"}`}>
                  <Image
                    src={project.images[0]}
                    alt={item.name}
                    fill
                    sizes={featured ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,20,0.32)_0%,rgba(4,10,20,0)_28%,rgba(4,10,20,0.14)_62%,rgba(4,10,20,0.72)_100%)]" aria-hidden="true" />
                  <span className="absolute left-1 top-1 h-14 w-14 rounded-tl-[1.4rem] border-l-2 border-t-2 border-white/0 transition-colors duration-300 group-hover:border-[color:var(--project-accent)]" aria-hidden="true" />

                  <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur">
                    {formatArea(project.area, locale)} {copy.sqm}
                  </div>
                  {project.year ? (
                    <div className="absolute right-4 top-4 rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur">
                      {project.year}
                    </div>
                  ) : null}

                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    <CameraIcon className="h-3.5 w-3.5" />
                    {count} {count === 1 ? copy.photo : copy.photos}
                  </div>
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
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-tech-100 transition-colors group-hover:text-white">
                      {copy.viewGallery}
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path d="M5 12h14" />
                        <path d="m13 6 6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {mounted && active && activeCopy
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={activeCopy.name}
              className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
            >
              <button
                type="button"
                aria-label={copy.close}
                onClick={close}
                className="absolute inset-0 h-full w-full cursor-zoom-out bg-[rgba(3,8,16,0.86)] backdrop-blur-md"
              />

              <div className="relative z-10 flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-white/12 bg-[#0b1220]/90 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
                  <div className="min-w-0">
                    <h3 className="truncate text-lg font-semibold text-white sm:text-xl">{activeCopy.name}</h3>
                    <p className="mt-0.5 truncate text-sm text-white/55">
                      {formatArea(active.area, locale)} {copy.sqm}
                      <span className="mx-2 text-white/25">·</span>
                      {activeCopy.scope}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={copy.close}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/14 bg-white/10 text-white transition hover:bg-white/20"
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" aria-hidden="true">
                      <path d="m6 6 12 12M18 6 6 18" />
                    </svg>
                  </button>
                </div>

                <div className="relative flex min-h-[46vh] flex-1 items-center justify-center bg-black/40 sm:min-h-[54vh]">
                  <Image
                    key={active.images[activeImage]}
                    src={active.images[activeImage]}
                    alt={`${activeCopy.name} — ${activeImage + 1}`}
                    fill
                    sizes="(max-width: 1152px) 100vw, 1152px"
                    className="object-contain"
                    priority
                  />

                  {active.images.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label={copy.previous}
                        className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/16 bg-black/45 text-white backdrop-blur transition hover:bg-black/70 sm:left-5"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label={copy.next}
                        className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/16 bg-black/45 text-white backdrop-blur transition hover:bg-black/70 sm:right-5"
                      >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/14 bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                        {activeImage + 1} / {active.images.length}
                      </div>
                    </>
                  ) : null}
                </div>

                {active.images.length > 1 ? (
                  <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6 [scrollbar-width:thin]">
                    {active.images.map((src, i) => (
                      <button
                        key={src}
                        type="button"
                        onClick={() => setActiveImage(i)}
                        aria-label={`${activeCopy.name} — ${i + 1}`}
                        aria-current={i === activeImage ? "true" : undefined}
                        className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border transition sm:h-16 sm:w-24 ${
                          i === activeImage
                            ? "border-tech ring-1 ring-tech/60"
                            : "border-white/12 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
