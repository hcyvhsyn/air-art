import { Section } from "./Section";
import { ContactForm } from "./ContactForm";

interface ServiceCopy {
  title: string;
  desc: string;
}

interface Props {
  copy: {
    eyebrow: string;
    title: string;
    subtitle: string;
    addressLabel: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    addressValue: string;
    phoneValue: string;
    emailValue: string;
    hoursValue: string;
    mapTitle: string;
    mapPlaceholder: string;
    form: React.ComponentProps<typeof ContactForm>["form"];
  };
  serviceItems: Record<string, ServiceCopy>;
}

export function Contact({ copy, serviceItems }: Props) {
  const details = [
    { label: copy.addressLabel, value: copy.addressValue, icon: "pin" as const },
    { label: copy.phoneLabel, value: copy.phoneValue, icon: "phone" as const, href: `tel:${copy.phoneValue.replace(/\s+/g, "")}` },
    { label: copy.emailLabel, value: copy.emailValue, icon: "mail" as const, href: `mailto:${copy.emailValue}` },
    { label: copy.hoursLabel, value: copy.hoursValue, icon: "clock" as const },
  ];

  return (
    <Section
      id="contact"
      eyebrow={copy.eyebrow}
      title={copy.title}
      subtitle={copy.subtitle}
      tone="dark"
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {details.map((d) => (
              <li
                key={d.label}
                className="group relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-white/[0.07] p-5 shadow-[0_20px_64px_rgba(0,0,0,0.2)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-tech/35 hover:bg-white/[0.1]"
              >
                <div className="absolute inset-0 bg-grid-dark opacity-0 transition-opacity group-hover:opacity-25" aria-hidden="true" />
                <div className="relative flex items-start gap-4">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/9 text-tech-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
                    <DetailIcon name={d.icon} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-white/42">
                      {d.label}
                    </div>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="mt-1 block text-sm font-medium text-white underline-offset-4 hover:underline"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <div className="mt-1 text-sm font-medium text-white">{d.value}</div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/[0.07] shadow-[0_24px_70px_rgba(0,0,0,0.22)] backdrop-blur">
            <div className="map-blueprint relative aspect-[4/3] w-full bg-[#07111f]">
              <div className="absolute inset-0 bg-grid-dark opacity-45" aria-hidden="true" />
              <div className="absolute left-[14%] top-[25%] h-24 w-24 rounded-[1.5rem] border border-tech/25 bg-white/8 shadow-inner" aria-hidden="true" />
              <div className="absolute bottom-[18%] right-[14%] h-28 w-32 rounded-[1.5rem] border border-accent/25 bg-white/8 shadow-inner" aria-hidden="true" />
              <div className="map-route absolute left-[25%] top-[47%] h-0.5 w-[48%] -rotate-12" aria-hidden="true" />
              <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-tech text-white shadow-[0_18px_38px_rgba(23,136,213,0.28)]">
                <DetailIcon name="pin" />
              </div>
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/12 bg-black/26 p-4 text-sm shadow-lg backdrop-blur">
                <div className="font-semibold text-white">{copy.mapTitle}</div>
                <div className="mt-1 leading-relaxed text-white/62">{copy.addressValue}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm form={copy.form} serviceItems={serviceItems} />
        </div>
      </div>
    </Section>
  );
}

function DetailIcon({ name }: { name: "pin" | "phone" | "mail" | "clock" }) {
  const paths: Record<typeof name, React.ReactNode> = {
    pin: (
      <>
        <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.4 2.1L8.1 9.8a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.8 2.2Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
