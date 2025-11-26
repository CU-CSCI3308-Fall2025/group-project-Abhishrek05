CREATE TABLE study_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50),
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    host_username VARCHAR(50) NOT NULL,
    max_participants INT NOT NULL,

    FOREIGN KEY (host_username) REFERENCES users(username)
);