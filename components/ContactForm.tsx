"use client";

import { useState, type FormEvent } from "react";
import { services } from "@/lib/services";

interface ServiceCopy {
  title: string;
  desc: string;
}

interface Props {
  form: {
    title: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    service: string;
    selectService: string;
    message: string;
    messagePlaceholder: string;
    submit: string;
    sending: string;
    success: string;
  };
  serviceItems: Record<string, ServiceCopy>;
}

type Status = "idle" | "sending" | "success";

export function ContactForm({ form, serviceItems }: Props) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    (event.target as HTMLFormElement).reset();
    setTimeout(() => setStatus("idle"), 5000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.07] p-6 text-white shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur sm:p-8"
      noValidate
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-tech/80 to-transparent" />
      <div className="absolute inset-0 bg-grid-dark opacity-20" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(23,136,213,0.14),transparent_34%),linear-gradient(245deg,rgba(242,165,26,0.08),transparent_32%)]"
        aria-hidden="true"
      />
      <h3 className="relative text-xl font-semibold text-white">{form.title}</h3>

      <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
        <Field id="name" label={form.name} required>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder={form.namePlaceholder}
            className="input"
            autoComplete="name"
          />
        </Field>
        <Field id="phone" label={form.phone} required>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder={form.phonePlaceholder}
            className="input"
            autoComplete="tel"
          />
        </Field>
        <Field id="email" label={form.email} required>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder={form.emailPlaceholder}
            className="input"
            autoComplete="email"
          />
        </Field>
        <Field id="service" label={form.service}>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="input appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23CFEFFF%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10"
          >
            <option value="" disabled>
              {form.selectService}
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {serviceItems[s.id]?.title ?? s.id}
              </option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="message" label={form.message} required>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder={form.messagePlaceholder}
              className="input resize-y"
            />
          </Field>
        </div>
      </div>

      <div className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="shine-hover inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy shadow-[0_16px_34px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-0.5 hover:bg-tech-50 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span className="relative z-10">{status === "sending" ? form.sending : form.submit}</span>
          <svg className="relative z-10 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </button>
        <p
          role="status"
          aria-live="polite"
          className={`text-sm font-medium transition-opacity ${
            status === "success" ? "text-emerald opacity-100" : "opacity-0"
          }`}
        >
          {form.success}
        </p>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid rgba(255,255,255,0.12);
          background-color: rgba(255,255,255,0.08);
          padding: 0.82rem 0.95rem;
          font-size: 0.9rem;
          color: #fff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
          transition: border-color .18s ease, box-shadow .18s ease, background-color .18s ease;
        }
        .input::placeholder { color: rgba(255,255,255,0.38); }
        .input option {
          color: var(--color-ink);
          background: #fff;
        }
        .input:focus {
          outline: none;
          border-color: var(--color-tech);
          background-color: rgba(255,255,255,0.11);
          box-shadow: 0 0 0 4px rgba(23,136,213,0.18), inset 0 1px 0 rgba(255,255,255,0.14);
        }
      `}</style>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-white/48">
        {label}
        {required ? <span className="ml-1 text-tech">*</span> : null}
      </span>
      {children}
    </label>
  );
}
