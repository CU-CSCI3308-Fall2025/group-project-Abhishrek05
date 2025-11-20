CREATE TABLE assignments (
    name VARCHAR(100) NOT NULL,                 
    description TEXT,                           
    course VARCHAR(100),
    due_at TIMESTAMPTZ,
    points INTEGER NOT NULL DEFAULT 0,
    -- Group work flag (friends)
    is_group BOOLEAN NOT NULL DEFAULT FALSE
);