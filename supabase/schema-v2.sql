-- PRD-002: Blog System Schema Updates
-- Run this after the initial schema.sql

-- Admin Secrets Table (for simple passcode auth)
create table if not exists admin_secrets (
  id uuid default uuid_generate_v4() primary key,
  passcode text not null,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for admin_secrets
alter table admin_secrets enable row level security;
create policy "Allow public read access" on admin_secrets for select using (true);

-- Add content field to articles table for full Markdown body
alter table articles add column if not exists content text;

-- Seed initial admin passcode (CHANGE THIS IN PRODUCTION!)
insert into admin_secrets (passcode, description) values 
('klein2026', 'Default admin passcode - change immediately');
