-- Update Projects Table with Full Data
-- This script ensures all 3 projects are present and have correct data/images

-- 1. World Famous Palette Gallery (世界名色画廊)
-- Note: Replace 'IMAGE_URL_PLACEHOLDER' with the actual uploaded URL if you have one. 
-- Since we only have a local screenshot, we'll use a placeholder or assume manual upload.
-- For now, I will use a placeholder or you can upload the screenshot to Supabase Storage manually.
-- Assuming the screenshot is local, we might need to use a public URL. 
-- Let's use the Vercel deployment URL if available, or leave it mostly null for local fallback.
-- However, user asked to "put the whole project display area into Supabase".

delete from projects where tag in ('DEV-01', 'DEV-02', 'DEV-03');

insert into projects (title, tag, description, image_url, url) values
(
  'Global Markets', 
  'DEV-01', 
  '股市指数信息查询', 
  '/project-covers/global-markets.png', -- Local fallback path
  'https://fb10b3921cc049d695743eeab389fbd2.prod.enter.pro/'
),
(
  'Lottery Life (乐透人生)', 
  'DEV-02', 
  '赛博朋克风格抽奖工具', 
  '/project-covers/lottery-life.png', -- Local fallback path
  'https://lottery-life-six.vercel.app'
),
(
  'World Famous Palette Gallery', 
  'DEV-03', 
  '世界名色画廊 - 探索那些定义了品牌、艺术与时尚的传奇色彩', 
  'https://famous-palette.vercel.app/og-image.png', -- Attempting to use site's OG image or null
  'https://famous-palette.vercel.app'
);

-- Note on Image for DEV-03: 
-- Adding a real public URL would be best. 
-- Since I captured a screenshot locally, it's at: 
-- /Users/klein/.gemini/antigravity/brain/a6f028d8-5789-4dbc-b971-773a28541ced/famous_palette_cover_1770170752781.png
-- You (User) need to upload this file to your Supabase Storage bucket ('projects') and get a public URL to replace the placeholder above.
