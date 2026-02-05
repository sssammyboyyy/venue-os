-- 1. Rename existing legacy table if it exists and applications doesn't
do $$
begin
  if exists(select 1 from information_schema.tables where table_name = 'leads_legacy') 
     and not exists(select 1 from information_schema.tables where table_name = 'applications') then
    alter table leads_legacy rename to applications;
  end if;
end $$;

-- 2. Create applications table if it still doesn't exist (clean slate fallback)
create table if not exists public.applications (
  id uuid not null default gen_random_uuid (),
  created_at timestamp with time zone not null default now(),
  email text not null,
  full_name text, -- from legacy
  first_name text, -- new
  last_name text, -- new
  venue_name text,
  annual_weddings text, -- new
  pain_point text,
  status text default 'new'::text,
  constraint applications_pkey primary key (id)
);

-- 3. Add missing columns if they don't exist (for evolved table)
do $$
begin
    alter table public.applications add column if not exists first_name text;
    alter table public.applications add column if not exists last_name text;
    alter table public.applications add column if not exists annual_weddings text;
end $$;

-- 4. Enable RLS
alter table public.applications enable row level security;

-- 5. Policies
drop policy if exists "Allow public inserts" on public.applications;
create policy "Allow public inserts" on public.applications for insert to anon with check (true);

drop policy if exists "Allow admin select" on public.applications;
create policy "Allow admin select" on public.applications for select to authenticated using (true);
