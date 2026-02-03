-- Update Global Markets Project Image
UPDATE projects 
SET image_url = '/project-covers/global-markets.png' 
WHERE title ILIKE '%Global Markets%';

-- Update Lottery Life Project Image
UPDATE projects 
SET image_url = '/project-covers/lottery-life.png' 
WHERE title ILIKE '%乐透人生%' OR title ILIKE '%Lottery%';
