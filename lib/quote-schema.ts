import { z } from "zod";

export const GPU_TYPES = [
  "NVIDIA B300",
  "NVIDIA B200",
  "NVIDIA H200",
  "NVIDIA H100",
  "NVIDIA A100",
  "Other / mixed",
] as const;

export const DEPLOYMENT_TIMINGS = [
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "More than 6 months",
  "Not sure",
] as const;

/** Shared by the form (client) and the API route (server). */
export const quoteRequestSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "Email is too long.")
    .pipe(z.email("Enter a valid work email.")),
  planned_gpu_count: z.coerce
    .number({ error: "Enter a GPU count." })
    .int("GPU count must be a whole number.")
    .min(1, "GPU count must be at least 1.")
    .max(1_000_000, "GPU count looks too large."),
  gpu_type: z.enum(GPU_TYPES, { error: "Select a GPU type." }),
  deployment_timing: z.enum(DEPLOYMENT_TIMINGS, { error: "Select a deployment timing." }),
  notes: z
    .string()
    .trim()
    .max(2000, "Notes must be 2,000 characters or fewer.")
    .optional()
    .transform((v) => (v ? v : null)),
  // Honeypot: real users never see or fill this field.
  company_website: z.string().optional(),
});

export type QuoteRequestInput = z.input<typeof quoteRequestSchema>;
export type QuoteRequest = z.output<typeof quoteRequestSchema>;
export type QuoteFieldErrors = Partial<Record<keyof QuoteRequestInput, string>>;
