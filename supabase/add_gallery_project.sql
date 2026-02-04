-- Add World Silver Gallery to Projects
insert into projects (title, tag, description, image_url, url) values
(
  'World Silver Gallery', 
  'DEV-03', 
  '探索那些定义了品牌、艺术与时尚的传奇色彩', 
  null, -- Image URL defaults to null, will fall back to local or placeholder if handled in frontend
  'https://famous-palette.vercel.app'
);
