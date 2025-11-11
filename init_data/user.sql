CREATE TABLE users (
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    username VARCHAR(50) PRIMARY KEY,
    institution VARCHAR(50),
    points INTEGER DEFAULT 0
);
