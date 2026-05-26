"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const DURATION_MS = 2400;

declare global {
  interface Window {
    __airArtInitialLoaderPlayed?: boolean;
  }
}

export function PagePreloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    return !window.__airArtInitialLoaderPlayed;
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!visible) return;

    window.__airArtInitialLoaderPlayed = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 500 : DURATION_MS;
    let frame = 0;
    const timers: number[] = [];
    const startedAt = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const eased = 1 - Math.pow(1 - Math.min(elapsed / duration, 1), 3);
      const nextProgress = Math.min(Math.round(eased * 100), 100);
      setProgress(nextProgress);

      if (nextProgress < 100) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      timers.push(window.setTimeout(() => {
        setLeaving(true);
        timers.push(window.setTimeout(() => setVisible(false), reduceMotion ? 80 : 620));
      }, reduceMotion ? 80 : 220));
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || leaving) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [visible, leaving]);

  if (!visible) return null;

  const ringProgress = `${progress * 3.6}deg`;
  const ringMid = `${progress * 2.1}deg`;
  const revealLead = Math.min(progress + 16, 100);
  const revealTail = Math.max(progress - 18, 0);

  return (
    <div
      className={`fixed inset-0 z-[200] grid place-items-center overflow-hidden bg-[#02060b] text-white transition-all duration-700 ${
        leaving ? "pointer-events-none scale-[1.015] opacity-0 blur-sm" : "scale-100 opacity-100 blur-0"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Air-Art loading"
    >
      <div className="air-preloader-grid absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,136,213,0.16)_0%,transparent_32%),linear-gradient(225deg,rgba(242,165,26,0.11)_0%,transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.04)_0%,transparent_42%,rgba(0,0,0,0.38)_100%)]" aria-hidden="true" />
      <div className="air-preloader-scan absolute inset-y-0 w-1/3 max-w-[420px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)]" aria-hidden="true" />

      <div className="relative flex w-[min(86vw,460px)] flex-col items-center">
        <div className="relative grid h-72 w-72 place-items-center sm:h-[22rem] sm:w-[22rem]">
          <div
            className="absolute inset-0 rounded-full p-px shadow-[0_40px_120px_rgba(0,0,0,0.48)]"
            style={{
              background: `conic-gradient(from -90deg, rgba(23,136,213,0.95) 0deg, rgba(22,160,113,0.92) ${ringMid}, rgba(242,165,26,0.92) ${ringProgress}, rgba(255,255,255,0.1) ${ringProgress} 360deg)`,
            }}
            aria-hidden="true"
          >
            <div className="h-full w-full rounded-full bg-[#050a12]/94 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-38px_80px_rgba(23,136,213,0.08)]" />
          </div>

          <div className="absolute inset-5 rounded-full border border-white/8" aria-hidden="true" />
          <div className="absolute inset-11 rounded-full border border-dashed border-white/10" aria-hidden="true" />
          <div className="absolute h-[76%] w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" aria-hidden="true" />
          <div className="absolute h-px w-[76%] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />

          <div className="relative h-48 w-48 sm:h-64 sm:w-64">
            <Image
              src="/airart-logo.png"
              alt=""
              fill
              priority
              quality={100}
              unoptimized
              className="object-contain opacity-25 grayscale brightness-[0.34] contrast-125"
              sizes="(min-width: 640px) 256px, 192px"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: `polygon(0 0, ${revealLead}% 0, ${revealTail}% 100%, 0 100%)`,
              }}
              aria-hidden="true"
            >
              <Image
                src="/airart-logo.png"
                alt=""
                fill
                priority
                quality={100}
                unoptimized
                className="object-contain drop-shadow-[0_0_22px_rgba(23,136,213,0.34)]"
                sizes="(min-width: 640px) 256px, 192px"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                background: `linear-gradient(108deg, transparent ${Math.max(progress - 16, 0)}%, rgba(255,255,255,0.5) ${progress}%, transparent ${Math.min(progress + 18, 100)}%)`,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="mt-8 w-full max-w-[300px]">
          <div className="relative h-2 overflow-hidden rounded-full border border-white/10 bg-white/6 shadow-[inset_0_1px_8px_rgba(0,0,0,0.44)]">
            <div className="absolute inset-y-0 left-0 w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.16)_0_1px,transparent_1px_18px)] opacity-45" aria-hidden="true" />
            <div
              className="relative h-full rounded-full bg-gradient-to-r from-tech via-emerald to-accent shadow-[0_0_22px_rgba(23,136,213,0.45)] transition-[width] duration-150"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-center font-mono text-[11px] font-semibold tabular-nums tracking-[0.22em] text-white/42">
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
