--Create a database with the name of all the current presidents and pms around the world

CREATE TABLE presidents (
    id INTEGER PRIMARY KEY,
    country TEXT NOT NULL,
    president TEXT,
    pm TEXT
);

--Create a table for capital cities around the world by country

CREATE TABLE capitals (
    id INTEGER PRIMARY KEY,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    continent TEXT NOT NULL
);
