DROP DATABASE IF EXISTS songs_dev;
CREATE DATABASE songs_dev;

\c songs_dev;

CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    website_url TEXT,
    img_url TEXT NOT NULL,
    main_genre TEXT,
    is_favorite BOOLEAN 
);

CREATE TABLE songs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    img_url TEXT NOT NUll,
    vid_url TEXT NOT NUll,
    is_favorite BOOLEAN,
    artist_id INTEGER REFERENCES artists (id)
    ON DELETE CASCADE
);