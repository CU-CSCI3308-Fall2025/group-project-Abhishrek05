CREATE TABLE friendList (
    user_username   VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    friend_username VARCHAR(50) NOT NULL REFERENCES users(username) ON DELETE CASCADE,
    PRIMARY KEY (user_username, friend_username)
);
