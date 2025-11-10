CREATE TABLE assignment_friends (
    assignment_name INTEGER NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
    user_username INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    PRIMARY KEY (assignment_name, user_username)
);