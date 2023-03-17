CREATE DATABASE cinema_postgres_tiny;

\ connect cinema_postgres_tiny 

CREATE TABLE film(
    film_id SERIAL PRIMARY KEY,
    title varchar(255),
    release_year date
);

CREATE TABLE genre(
    genre_id SERIAL PRIMARY KEY,
    title varchar(255)
);

CREATE TABLE film_genre(
    film_id int REFERENCES film(film_id),
    genre_id int REFERENCES genre(genre_id),
    CONSTRAINT film_genre_pkey PRIMARY KEY (film_id, genre_id)
);