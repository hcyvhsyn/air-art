import type { SVGProps } from "react";
import type { ServiceIcon } from "@/lib/services";

type Props = SVGProps<SVGSVGElement> & { name: ServiceIcon };

const PATHS: Record<ServiceIcon, React.ReactNode> = {
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h17a3 3 0 1 1-3 3" />
      <path d="M3 16h9" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 3v18" />
      <path d="M3 12h18" />
      <path d="m5.6 5.6 12.8 12.8" />
      <path d="m18.4 5.6-12.8 12.8" />
      <path d="m9 5 3-2 3 2" />
      <path d="m9 19 3 2 3-2" />
      <path d="m5 9-2 3 2 3" />
      <path d="m19 9 2 3-2 3" />
    </>
  ),
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" />,
  flame: (
    <path d="M12 22a6 6 0 0 0 6-6c0-3-2-5-3-7-1-2-1-4 0-6-3 1-7 4-7 9 0 1 1 2 2 2-1-2 0-4 2-5-1 3 0 5 1 7-2 0-3-1-3-3-1 4 1 9 2 9Z" />
  ),
  fan: (
    <>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2a4 4 0 0 1 4 4c0 2-2 4-4 6 0-2-2-4-2-6a2 2 0 0 1 2-4Z" />
      <path d="M22 12a4 4 0 0 1-4 4c-2 0-4-2-6-4 2 0 4-2 6-2a2 2 0 0 1 4 2Z" />
      <path d="M12 22a4 4 0 0 1-4-4c0-2 2-4 4-6 0 2 2 4 2 6a2 2 0 0 1-2 4Z" />
      <path d="M2 12a4 4 0 0 1 4-4c2 0 4 2 6 4-2 0-4 2-6 2a2 2 0 0 1-4-2Z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v6" />
      <path d="M15 2v6" />
      <path d="M6 8h12v3a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z" />
      <path d="M12 17v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  blueprint: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M10 4v16" />
      <path d="M14 14h4" />
      <path d="M14 17h4" />
    </>
  ),
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.5 2.5-2-2 2.5-2.5Z" />
  ),
  gauge: (
    <>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M12 3a9 9 0 0 1 9 9" />
      <path d="M12 3a9 9 0 0 0-9 9" />
      <path d="M3 12h2" />
      <path d="M19 12h2" />
      <path d="m13 11 4-4" />
    </>
  ),
};

export function Icon({ name, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
