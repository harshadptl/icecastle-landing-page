-- Quote / capacity-review requests submitted from the landing page form.
create table if not exists public.quote_requests (
  id                 uuid primary key default gen_random_uuid(),
  created_at         timestamptz not null default now(),
  email              text not null check (char_length(email) <= 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  planned_gpu_count  integer not null check (planned_gpu_count between 1 and 1000000),
  gpu_type           text not null check (gpu_type in (
                       'NVIDIA B300', 'NVIDIA B200', 'NVIDIA H200', 'NVIDIA H100', 'NVIDIA A100', 'Other / mixed')),
  deployment_timing  text not null check (deployment_timing in (
                       'Within 30 days', '1–3 months', '3–6 months', 'More than 6 months', 'Not sure')),
  notes              text check (notes is null or char_length(notes) <= 2000),
  status             text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed', 'spam')),
  source_page        text,
  user_agent         text
);

create index if not exists quote_requests_created_at_idx on public.quote_requests (created_at desc);
create index if not exists quote_requests_email_idx on public.quote_requests (lower(email));

-- Lock the table down: RLS on with no policies means the anon and
-- authenticated roles can neither read nor write. Inserts happen only from
-- the Next.js API route using the server-side service-role/secret key,
-- which bypasses RLS.
alter table public.quote_requests enable row level security;
revoke all on public.quote_requests from anon, authenticated;
