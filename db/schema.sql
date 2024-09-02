DROP DATABASE IF EXISTS tuner;
CREATE DATABASE tuner;

\c tuner;

CREATE TABLE songs(
id SERIAL PRIMARY KEY,
name VARCHAR (50),
artist VARCHAR (50),
album VARCHAR (50),
time TIMETZ,
is_favorite BOOLEAN
);

