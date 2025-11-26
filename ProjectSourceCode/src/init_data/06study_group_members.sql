CREATE TABLE study_group_members (
    group_id INT NOT NULL,
    username VARCHAR(50) NOT NULL,

    PRIMARY KEY (group_id, username),

    FOREIGN KEY (group_id) REFERENCES study_groups(id) ON DELETE CASCADE,
    FOREIGN KEY (username) REFERENCES users(username)
);