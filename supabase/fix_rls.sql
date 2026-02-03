-- Fix: Allow inserts to 'articles' table
-- Reason: Previous policy only allowed 'SELECT' (read), causing 'row-level security policy' error on publish.

-- Enable INSERT for public (since we handle auth validation in the app/frontend layer for this V1)
create policy "Allow public insert access" on articles for insert with check (true);

-- (Optional) Allow UPDATE/DELETE if you plan to edit later
create policy "Allow public update access" on articles for update using (true);
