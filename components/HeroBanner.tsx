"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = [
  {
    src: "/airart-banner.png",
    alt: "Air-Art engineer inspecting industrial HVAC equipment",
  },
  {
    src: "/airart-banner2.png",
    alt: "Air-Art engineer walking through a mechanical plant room",
  },
];

export function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % SLIDES.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () => {
    setActive((current) => (current - 1 + SLIDES.length) % SLIDES.length);
  };

  const next = () => {
    setActive((current) => (current + 1) % SLIDES.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDES.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          priority={index === 0}
          sizes="100vw"
          className={`object-cover transition-all duration-1000 ease-out ${
            active === index
              ? "scale-100 opacity-100"
              : "scale-[1.035] opacity-0"
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,10,20,0.88)_0%,rgba(3,10,20,0.68)_32%,rgba(3,10,20,0.22)_64%,rgba(3,10,20,0.46)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,10,20,0.48)_0%,rgba(3,10,20,0.08)_38%,rgba(3,10,20,0.68)_100%)]" />

      <div className="absolute bottom-28 left-1/2 z-20 flex w-full max-w-7xl -translate-x-1/2 items-end justify-between px-4 sm:bottom-32 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-white">
          {SLIDES.map((slide, index) => {
            const current = active === index;
            return (
              <button
                key={slide.src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show banner ${index + 1}`}
                aria-current={current ? "true" : undefined}
                className={`font-mono text-sm font-semibold tracking-[0.16em] transition ${
                  current ? "text-white" : "text-white/45 hover:text-white/75"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
                <span
                  className={`mt-1 block h-px transition-all ${
                    current ? "w-10 bg-white" : "w-0 bg-white/0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={previous}
            aria-label="Previous banner"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/16 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur transition hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next banner"
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/16 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur transition hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
