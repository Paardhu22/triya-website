"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const FIELD =
  "w-full border-b border-foreground/25 bg-transparent py-3 text-[16px] text-foreground outline-none transition-colors duration-300 placeholder:text-foreground/35 focus:border-terracotta aria-[invalid=true]:border-red-700";
const LABEL = "text-[10px] font-medium tracking-[0.28em] text-foreground/55 uppercase";
const ERROR = "mt-2 text-[13px] text-red-800";
const MAX_BYTES = 3 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "done"; duplicate: boolean }
  | { kind: "error"; message: string; fields: Record<string, string> };

export default function RegistrationForm({
  slug,
  propertyName,
  contactEmail,
}: {
  slug: string;
  propertyName: string;
  contactEmail: string;
}) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const fileRef = useRef<HTMLInputElement>(null);
  const today = new Date().toISOString().slice(0, 10);
  const submitting = state.kind === "submitting";
  const fields = state.kind === "error" ? state.fields : {};

  function onPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setPhotoError(null);
    if (!file) return setPhotoName(null);
    if (!TYPES.includes(file.type)) setPhotoError("Upload a JPG, PNG or WebP image.");
    else if (file.size > MAX_BYTES) setPhotoError("Image must be 3 MB or smaller.");
    if (!TYPES.includes(file.type) || file.size > MAX_BYTES) {
      e.target.value = "";
      return setPhotoName(null);
    }
    setPhotoName(file.name);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return; // blocks double submits
    const data = new FormData(e.currentTarget);
    data.set("websiteSlug", slug);
    data.set("startedAt", String(startedAt));
    data.set("consent", data.get("consent") ? "true" : "");
    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/register", { method: "POST", body: data });
      const body = (await res.json().catch(() => ({}))) as { status?: string; error?: string; fields?: Record<string, string> };
      if (res.ok) return setState({ kind: "done", duplicate: body.status === "duplicate" });
      setState({ kind: "error", message: body.error ?? "Something went wrong. Please try again.", fields: body.fields ?? {} });
    } catch {
      setState({ kind: "error", message: "We could not reach the server. Check your connection and try again.", fields: {} });
    }
  }

  if (state.kind === "done") {
    return (
      <div role="status" className="border-t border-line pt-8">
        <h2 className="text-[clamp(1.6rem,3.5vw,2.75rem)] leading-[1.05] font-medium tracking-[-0.04em] text-pretty">
          {state.duplicate ? "We already have your request." : "Thank you. Your request is in."}
        </h2>
        <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-foreground/70">
          {state.duplicate
            ? `A registration for ${propertyName} with this phone number is already waiting for review. There is no need to submit it again.`
            : `The ${propertyName} team will review your details and contact you on the phone number you gave. A room is not reserved until they confirm it.`}
        </p>
        <Link href="/" className="focus-ring mt-8 inline-block text-[11px] font-medium tracking-[0.28em] uppercase underline underline-offset-8">
          Back to Triya
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-9" aria-busy={submitting}>
      {state.kind === "error" ? (
        <p role="alert" className="border-l-2 border-red-700 pl-4 text-[15px] text-red-800">{state.message}</p>
      ) : null}

      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Company<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div>
        <label className={LABEL} htmlFor="fullName">Full name</label>
        <input id="fullName" name="fullName" required minLength={2} maxLength={120} autoComplete="name" disabled={submitting}
          aria-invalid={Boolean(fields.fullName)} aria-describedby={fields.fullName ? "fullName-err" : undefined} className={FIELD} placeholder="As on your ID" />
        {fields.fullName ? <p id="fullName-err" className={ERROR}>{fields.fullName}</p> : null}
      </div>

      <div className="grid gap-9 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label className={LABEL} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" required maxLength={20} autoComplete="tel" inputMode="tel" disabled={submitting}
            aria-invalid={Boolean(fields.phone)} aria-describedby={fields.phone ? "phone-err" : undefined} className={FIELD} placeholder="10-digit mobile" />
          {fields.phone ? <p id="phone-err" className={ERROR}>{fields.phone}</p> : null}
        </div>
        <div>
          <label className={LABEL} htmlFor="email">Email <span className="normal-case tracking-normal text-foreground/40">(optional)</span></label>
          <input id="email" name="email" type="email" maxLength={254} autoComplete="email" disabled={submitting}
            aria-invalid={Boolean(fields.email)} aria-describedby={fields.email ? "email-err" : undefined} className={FIELD} placeholder="you@example.com" />
          {fields.email ? <p id="email-err" className={ERROR}>{fields.email}</p> : null}
        </div>
      </div>

      <div>
        <label className={LABEL} htmlFor="preferredCheckIn">Preferred check-in date <span className="normal-case tracking-normal text-foreground/40">(optional)</span></label>
        <input id="preferredCheckIn" name="preferredCheckIn" type="date" min={today} disabled={submitting}
          aria-invalid={Boolean(fields.preferredCheckIn)} aria-describedby={fields.preferredCheckIn ? "date-err" : undefined} className={FIELD} />
        {fields.preferredCheckIn ? <p id="date-err" className={ERROR}>{fields.preferredCheckIn}</p> : null}
      </div>

      <div>
        <span className={LABEL} id="kyc-label">ID photo <span className="normal-case tracking-normal text-foreground/40">(optional)</span></span>
        <p className="mt-2 text-[13px] leading-[1.5] text-foreground/55">A clear photo of an ID such as Aadhaar. JPG, PNG or WebP, up to 3 MB. You can also give it to the team on arrival.</p>
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <button type="button" onClick={() => fileRef.current?.click()} disabled={submitting}
            className="focus-ring border border-foreground/30 px-5 py-3 text-[11px] font-medium tracking-[0.28em] uppercase transition-colors hover:border-foreground">
            {photoName ? "Replace image" : "Choose image"}
          </button>
          <span className="min-w-0 truncate text-[14px] text-foreground/60" aria-live="polite">{photoName ?? "No file chosen"}</span>
        </div>
        <input ref={fileRef} id="photo" name="photo" type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" aria-labelledby="kyc-label" onChange={onPhoto} disabled={submitting} />
        {photoError || fields.photo ? <p className={ERROR} role="alert">{photoError ?? fields.photo}</p> : null}
      </div>

      <div>
        <label className="flex items-start gap-3 text-[14px] leading-[1.55] text-foreground/75">
          <input type="checkbox" name="consent" required disabled={submitting} aria-invalid={Boolean(fields.consent)}
            className="mt-1 h-[18px] w-[18px] shrink-0 accent-[#c2532c]" />
          <span>
            I agree that Triya may store these details{photoName ? " and my ID photo" : ""} to process my registration for {propertyName}.
            Details are visible only to that property&apos;s team, kept privately, and deleted if the request is declined or
            not reviewed within 30 days. To ask for deletion, write to{" "}
            <a className="underline underline-offset-4" href={`mailto:${contactEmail}`}>{contactEmail}</a>.
          </span>
        </label>
        {fields.consent ? <p className={ERROR} role="alert">{fields.consent}</p> : null}
      </div>

      <div>
        <button type="submit" disabled={submitting}
          className="focus-ring inline-flex min-h-[54px] items-center gap-3 bg-ink px-8 text-[11px] font-medium tracking-[0.28em] text-white uppercase transition-opacity disabled:opacity-60">
          {submitting ? "Submitting…" : "Submit registration"}
        </button>
        <p className="mt-4 text-[13px] text-foreground/50">Submitting does not reserve a room. The team will confirm with you.</p>
      </div>
    </form>
  );
}
