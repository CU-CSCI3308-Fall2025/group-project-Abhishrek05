CREATE TABLE assignment_friends (
    assignment_name VARCHAR(100) NOT NULL REFERENCES assignments(name) ON DELETE CASCADE,
    user_username   VARCHAR(50)  NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    PRIMARY KEY (assignment_name, user_username)
);
