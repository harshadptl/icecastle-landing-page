"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { DEPLOYMENT_TIMINGS, GPU_TYPES, quoteRequestSchema, type QuoteFieldErrors } from "@/lib/quote-schema";

type Status = { state: "idle" | "sending" | "success" | "error"; message: string };

const FALLBACK_ERROR = "We couldn’t send your request. Please try again later or email hello@icecastle.ai.";

export default function QuoteForm() {
  const [status, setStatus] = useState<Status>({ state: "idle", message: "" });
  const [errors, setErrors] = useState<QuoteFieldErrors>({});
  const sending = status.state === "sending";

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    if (!form.reportValidity()) return;

    const payload = Object.fromEntries(new FormData(form).entries());

    // Mirror server-side validation for instant feedback.
    const parsed = quoteRequestSchema.safeParse(payload);
    if (!parsed.success) {
      const fe = z.flattenError(parsed.error).fieldErrors as Record<string, string[] | undefined>;
      setErrors(Object.fromEntries(Object.entries(fe).map(([k, v]) => [k, v?.[0]])) as QuoteFieldErrors);
      setStatus({ state: "error", message: "Please check the highlighted fields." });
      return;
    }

    setErrors({});
    setStatus({ state: "sending", message: "Sending your request…" });
    try {
      const res = await fetch("/api/quote-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string; errors?: QuoteFieldErrors };
      if (!res.ok) {
        if (body.errors) setErrors(body.errors);
        throw new Error(body.error || `Quote request failed: ${res.status}`);
      }
      setStatus({ state: "success", message: "Thanks. Your capacity request has been received." });
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus({
        state: "error",
        message: err instanceof Error && err.message && !err.message.startsWith("Quote request failed")
          ? `${err.message} If this keeps happening, email hello@icecastle.ai.`
          : FALLBACK_ERROR,
      });
    }
  }

  const err = (name: keyof QuoteFieldErrors) =>
    errors[name] ? (
      <span className="field-error" id={`${name}-error`}>
        {errors[name]}
      </span>
    ) : null;
  const a11y = (name: keyof QuoteFieldErrors) =>
    errors[name] ? { "aria-invalid": true, "aria-describedby": `${name}-error` } : {};

  return (
    <form className="form-panel reveal" data-d="1" id="quote-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="f-email">Work email</label>
          <input id="f-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} {...a11y("email")} />
          {err("email")}
        </div>
        <div className="field">
          <label htmlFor="f-desired">Planned GPU count</label>
          <input id="f-desired" name="planned_gpu_count" type="number" min={1} step={1} inputMode="numeric" placeholder="e.g. 32" required {...a11y("planned_gpu_count")} />
          {err("planned_gpu_count")}
        </div>
        <div className="field">
          <label htmlFor="f-gpu-type">GPU type</label>
          <select id="f-gpu-type" name="gpu_type" required defaultValue="" {...a11y("gpu_type")}>
            <option value="">Select GPU type…</option>
            {GPU_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("gpu_type")}
        </div>
        <div className="field">
          <label htmlFor="f-timing">Target deployment timing</label>
          <select id="f-timing" name="deployment_timing" required defaultValue="" {...a11y("deployment_timing")}>
            <option value="">Select timing…</option>
            {DEPLOYMENT_TIMINGS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          {err("deployment_timing")}
        </div>
        <div className="field wide">
          <label htmlFor="f-notes">
            Notes <span>(optional)</span>
          </label>
          <textarea id="f-notes" name="notes" rows={3} maxLength={2000} placeholder="Region, configuration or other requirements" {...a11y("notes")} />
          {err("notes")}
        </div>
        <div className="hp-field" aria-hidden="true">
          <label htmlFor="f-company-website">Company website</label>
          <input id="f-company-website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>
      <p className="form-note">Use your work email. Detailed spend information can be shared later.</p>
      <div className="form-submit">
        <button type="submit" className="btn btn-primary" disabled={sending}>
          {sending ? "Sending…" : (<>Request capacity review <span className="arr">→</span></>)}
        </button>
        <span className="form-hint">We’ll confirm availability and follow up by email.</span>
      </div>
      <p id="quote-status" className="form-status" role="status" aria-live="polite" data-state={status.state}>
        {status.message}
      </p>
    </form>
  );
}
