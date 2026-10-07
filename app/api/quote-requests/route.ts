import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { quoteRequestSchema } from "@/lib/quote-schema";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 10_000;

export async function POST(req: NextRequest) {
  // Accept JSON (fetch from the form) or classic form posts.
  let raw: unknown;
  try {
    const contentType = req.headers.get("content-type") ?? "";
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
    }
    raw = contentType.includes("application/json")
      ? JSON.parse(text)
      : Object.fromEntries(new URLSearchParams(text));
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteRequestSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    const errors = Object.fromEntries(
      Object.entries(fieldErrors).map(([k, v]) => [k, (v as string[] | undefined)?.[0]]),
    );
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields.", errors }, { status: 422 });
  }

  const { company_website, ...data } = parsed.data;

  // Honeypot tripped: pretend success so bots don't retry, but store nothing.
  if (company_website && company_website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("quote_requests").insert({
      ...data,
      source_page: req.headers.get("referer")?.slice(0, 500) ?? null,
      user_agent: req.headers.get("user-agent")?.slice(0, 500) ?? null,
    });
    if (error) throw error;
  } catch (err) {
    console.error("[quote-requests] insert failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn’t save your request. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
