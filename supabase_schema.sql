-- =========================================================================
-- SHREE'S 22ND BIRTHDAY SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase project's SQL Editor
-- =========================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =========================================================================
-- 1. FAN WISHES TABLE (Public submissions from fans worldwide)
-- =========================================================================
create table if not exists public.fan_wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  city text,
  emoji text default '🌸',
  likes integer default 0,
  created_at timestamptz default now()
);

-- RLS: Allow anyone to read and insert fan wishes
alter table public.fan_wishes enable row level security;

create policy "Allow public read on fan_wishes"
  on public.fan_wishes for select
  using (true);

create policy "Allow public insert on fan_wishes"
  on public.fan_wishes for insert
  with check (true);

create policy "Allow public update likes on fan_wishes"
  on public.fan_wishes for update
  using (true);

-- Enable Realtime for fan_wishes
alter publication supabase_realtime add table public.fan_wishes;


-- =========================================================================
-- 2. SACRED OFFERINGS TABLE (Floating Diyas & Lotuses)
-- =========================================================================
create table if not exists public.sacred_offerings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('diya', 'lotus')),
  blessing text not null,
  x_pos float default 50.0,
  y_pos float default 50.0,
  created_at timestamptz default now()
);

alter table public.sacred_offerings enable row level security;

create policy "Allow public read on sacred_offerings"
  on public.sacred_offerings for select
  using (true);

create policy "Allow public insert on sacred_offerings"
  on public.sacred_offerings for insert
  with check (true);

alter publication supabase_realtime add table public.sacred_offerings;


-- =========================================================================
-- 3. ARCADE LEADERBOARD TABLE (Top Stardust Catch Scores)
-- =========================================================================
create table if not exists public.arcade_leaderboard (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  score integer not null,
  rank text not null,
  avatar text default '🐱',
  city text,
  created_at timestamptz default now()
);

alter table public.arcade_leaderboard enable row level security;

create policy "Allow public read on arcade_leaderboard"
  on public.arcade_leaderboard for select
  using (true);

create policy "Allow public insert on arcade_leaderboard"
  on public.arcade_leaderboard for insert
  with check (true);

alter publication supabase_realtime add table public.arcade_leaderboard;


-- =========================================================================
-- 4. GLOBAL COUNTERS TABLE (Kitty Headpats, Offerings, Views)
-- =========================================================================
create table if not exists public.global_counters (
  key text primary key,
  value bigint default 0,
  updated_at timestamptz default now()
);

alter table public.global_counters enable row level security;

create policy "Allow public read on global_counters"
  on public.global_counters for select
  using (true);

create policy "Allow public update on global_counters"
  on public.global_counters for update
  using (true);

create policy "Allow public insert on global_counters"
  on public.global_counters for insert
  with check (true);

-- Seed initial global counters
insert into public.global_counters (key, value)
values 
  ('cat_headpats', 12480),
  ('diyas_lit', 4820),
  ('total_visits', 15400)
on conflict (key) do nothing;

-- =========================================================================
-- 5. INITIAL SEED DATA FOR FAN WISHES & LEADERBOARD
-- =========================================================================
insert into public.fan_wishes (name, city, message, emoji, likes)
values
  ('Aanya Sharma', 'Mumbai', 'Happy 22nd Birthday Shree! You are the sweetest and most genuine creator. Keep shining always! 🎂🌸', '🌸', 42),
  ('Rohan Verma', 'Delhi', 'Wishing you the happiest birthday! May Mahadev bless you with boundless health and joy! 🪷', '🪷', 38),
  ('Sneha & Kitties', 'Bangalore', 'Happy Birthday to our favorite cat lover! Sending purrs, hugs, and endless happiness! 🐱🐾', '🐱', 55),
  ('Pooja K.', 'Hyderabad', 'The kindest soul on the internet! Have the most magical year ahead 💖', '💖', 29)
on conflict do nothing;

insert into public.arcade_leaderboard (name, score, rank, avatar, city)
values
  ('Riya (Bestie)', 5850, 'SSS 👑', '🐱', 'Delhi'),
  ('Ananya V.', 4920, 'SSS 👑', '🌸', 'Mumbai'),
  ('Rohan (Kitties)', 4410, 'SS 🪷', '🐾', 'Bengaluru'),
  ('Pooja K.', 3890, 'SS 🪷', '💖', 'Hyderabad')
on conflict do nothing;
