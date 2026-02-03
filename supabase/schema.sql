-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Recommendations Table
create table if not exists recommendations (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  icon_url text,
  description text not null,
  url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Projects Table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  tag text not null default 'DEV-01',
  description text,
  image_url text,
  url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Articles Table
create table if not exists articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  summary text not null,
  tag_number text not null, -- e.g., 'LOG_001'
  categories text[] not null, -- e.g., ['WAYTOAGI', 'AI SOP']
  image_url text,
  url text,
  published_at date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Friend Links Table
create table if not exists friend_links (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  url text not null,
  sort_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) policies
-- Allow read access to everyone
alter table recommendations enable row level security;
create policy "Allow public read access" on recommendations for select using (true);

alter table projects enable row level security;
create policy "Allow public read access" on projects for select using (true);

alter table articles enable row level security;
create policy "Allow public read access" on articles for select using (true);

alter table friend_links enable row level security;
create policy "Allow public read access" on friend_links for select using (true);

-- Seed Data (Initial Data)
-- Recommendations
insert into recommendations (name, description, url) values 
('Raycast', '全能的 AI 助手', 'https://www.raycast.com'),
('Typeless', 'AI 驱动的效率工具', 'https://typeless.app'),
('Gemini', 'Google AI 助手', 'https://gemini.google.com'),
('Kimi', '国产 AI 长文本助手', 'https://kimi.moonshot.cn');

-- Projects
insert into projects (title, tag, description, url) values
('Global Markets', 'DEV-01', '股市指数信息查询', 'https://fb10b3921cc049d695743eeab389fbd2.prod.enter.pro/'),
('乐透人生', 'DEV-02', '抽奖工具', 'https://lottery-life-six.vercel.app');

-- Friend Links
insert into friend_links (name, url, sort_order) values
('WayToAGI', 'https://www.waytoagi.com', 10),
('LangChain', 'https://www.langchain.com/', 20),
('OpenAI', 'https://openai.com', 30),
('Vercel', 'https://vercel.com', 40);

-- Articles (Sample)
insert into articles (title, summary, tag_number, categories, published_at) values
('Skills火了，但我...', '文章针对当前AI领域流行的Skills热潮...', 'LOG_001', ARRAY['WAYTOAGI', 'AI SOP'], '2026-01-15'),
('写方案没思路？我用 notebooklm...', '本文作者分享了自己利用Google NotebookLM...', 'LOG_002', ARRAY['AI EFF', 'GOOGLE'], '2026-01-13'),
('别折腾环境了！用zcf一键搞定Claude...', '本文介绍了一种使用zcf工具快速配置...', 'LOG_003', ARRAY['DEVOPS', 'CLAUDE'], '2026-01-08');
