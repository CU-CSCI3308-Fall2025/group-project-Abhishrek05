CREATE TABLE calendar_events (
    id SERIAL PRIMARY KEY,

    title VARCHAR(100) NOT NULL,
    description TEXT,

    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,

    -- Polymorphic reference: can point to either study_groups or assignments
    source_type VARCHAR(20) NOT NULL CHECK (source_type IN ('study_group', 'assignment')),
    source_id INT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
