-- =========================================================================
-- Supabase Schema for Shree 4.0 Birthday Celebration
-- Run this script in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- =========================================================================

-- 1. Create table for Fan Wishes
CREATE TABLE IF NOT EXISTS public.fan_wishes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    message TEXT NOT NULL,
    city TEXT DEFAULT '',
    emoji TEXT DEFAULT '🌸',
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.fan_wishes ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on fan_wishes" 
    ON public.fan_wishes FOR SELECT 
    USING (true);

-- Allow public insert access
CREATE POLICY "Allow public insert access on fan_wishes" 
    ON public.fan_wishes FOR INSERT 
    WITH CHECK (true);

-- 2. Create table for Floating Diya & Lotus Sacred Offerings
CREATE TABLE IF NOT EXISTS public.sacred_offerings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'diya',
    blessing TEXT NOT NULL,
    x DOUBLE PRECISION DEFAULT 0.5,
    y DOUBLE PRECISION DEFAULT 0.5,
    speed_x DOUBLE PRECISION DEFAULT 0.01,
    speed_y DOUBLE PRECISION DEFAULT -0.01,
    rotation DOUBLE PRECISION DEFAULT 0,
    size DOUBLE PRECISION DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.sacred_offerings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on sacred_offerings" 
    ON public.sacred_offerings FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on sacred_offerings" 
    ON public.sacred_offerings FOR INSERT 
    WITH CHECK (true);

-- 3. Create table for Arcade Mini-Game Leaderboard
CREATE TABLE IF NOT EXISTS public.leaderboard (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    rank TEXT DEFAULT 'Star Adventurer',
    avatar TEXT DEFAULT '🐱',
    city TEXT DEFAULT '',
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on leaderboard" 
    ON public.leaderboard FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert access on leaderboard" 
    ON public.leaderboard FOR INSERT 
    WITH CHECK (true);

-- Index creation for ultra-fast sorting
CREATE INDEX IF NOT EXISTS idx_fan_wishes_created ON public.fan_wishes (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_offerings_created ON public.sacred_offerings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_score ON public.leaderboard (score DESC);
