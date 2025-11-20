CREATE TABLE assignments (
    name VARCHAR(100) PRIMARY KEY,             
    description TEXT,                           
    course VARCHAR(100),
    due_at TIMESTAMPTZ,
    points INTEGER NOT NULL DEFAULT 0,
    is_group BOOLEAN NOT NULL DEFAULT FALSE
);