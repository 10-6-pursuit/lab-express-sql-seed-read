-- Drop and recreate the database
DROP DATABASE IF EXISTS songs_db;
CREATE DATABASE songs_db;

\c songs_db;

-- Create songs table
CREATE TABLE songs (    
    id SERIAL PRIMARY KEY,
    created TIMESTAMP DEFAULT NOW(),
    name TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT,
    time TEXT,
    is_favorite BOOLEAN
);

-- Create playlists table
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created TIMESTAMP DEFAULT NOW()
);

-- Create playlist_songs table for many-to-many relationship
CREATE TABLE playlist_songs (
    playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
    song_id INTEGER REFERENCES songs(id) ON DELETE CASCADE,
    PRIMARY KEY (playlist_id, song_id)
);

