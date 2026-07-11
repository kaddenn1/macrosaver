create table if not exists reviews (
  id uuid primary key default gen_random_uuid(),
  product_id text not null,
  rating int not null check (rating between 1 and 5),
  reviewer_name text,
  comment text,
  ip_hash text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists reviews_product_status_idx
  on reviews (product_id, status, created_at desc);

create index if not exists reviews_status_idx
  on reviews (status, created_at asc);

create index if not exists reviews_ip_product_idx
  on reviews (ip_hash, product_id, created_at desc);

create index if not exists reviews_ip_idx
  on reviews (ip_hash, created_at desc);

alter table reviews enable row level security;
-- No policies are defined: RLS with zero policies denies all access to the
-- anon/authenticated roles, so only the service role key (used by lib/reviews.ts)
-- can read or write. That's intentional — reviews go through moderation, not
-- direct client access.
