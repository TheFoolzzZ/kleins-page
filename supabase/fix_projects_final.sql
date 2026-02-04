-- FIX: Clean up duplicates and set correct local image paths
-- 1. Cleans up ALL projects to avoid duplicates
-- 2. Re-inserts valid data with correct local image paths

delete from projects;

-- Re-insert all 3 projects
insert into projects (title, tag, description, image_url, url) values
(
  'Global Markets', 
  'DEV-01', 
  '股市指数信息查询', 
  '/project-covers/global-markets.png', 
  'https://fb10b3921cc049d695743eeab389fbd2.prod.enter.pro/'
),
(
  'Lottery Life (乐透人生)', 
  'DEV-02', 
  '赛博朋克风格抽奖工具', 
  '/project-covers/lottery-life.png', 
  'https://lottery-life-six.vercel.app'
),
(
  'World Famous Palette Gallery', 
  'DEV-03', 
  '世界名色画廊 - 探索那些定义了品牌、艺术与时尚的传奇色彩', 
  '/project-covers/famous-palette-cover.png', 
  'https://famous-palette.vercel.app'
);
