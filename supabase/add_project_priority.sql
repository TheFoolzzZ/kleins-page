-- Add priority field to projects table for custom ordering
-- Lower priority number = higher priority (1 is highest)
-- When priority is the same, order by created_at ascending (older first)

-- Add priority column with default value 999 (low priority)
alter table projects add column if not exists priority integer default 999;

-- Update existing projects with their priority based on current order
-- DEV-01: Global Markets
update projects set priority = 10 where tag = 'DEV-01';

-- DEV-02: 乐透人生
update projects set priority = 20 where tag = 'DEV-02';

-- DEV-03: World Famous Palette Gallery
update projects set priority = 30 where tag = 'DEV-03';

-- Comments for future projects:
-- DEV-04 and onwards will have priority = 999 by default unless specified
