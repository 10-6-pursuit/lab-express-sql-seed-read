DROP DATABASE IF EXISTS songs_db;
CREATE DATABASE songs_db;

\c songs_db;

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) ,
    artist TEXT,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN 
);