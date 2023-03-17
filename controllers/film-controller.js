const db = require('../src/db');

class FilmController {
  async getFilms(req, res) {
    try {
      if (req.params.id) {
        const films = await db.query(
          'SELECT film.film_id, film.title, film.release_year, genre.title as genre FROM FILM LEFT JOIN film_genre ON film_genre.film_id = film.film_id LEFT JOIN  genre ON film_genre.genre_id = genre.genre_id WHERE film.film_id = $1; ',
          [req.params.id]
        );
        res.send(films.rows);
      } else {
        const films = await db.query(
          'SELECT film.film_id, film.title, film.release_year, genre.title as genre FROM FILM LEFT JOIN film_genre ON film_genre.film_id = film.film_id LEFT JOIN  genre ON film_genre.genre_id = genre.genre_id;'
        );
        res.send(films.rows);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async addFilm(req, res) {
    try {
      const { title, release_year, genres_id } = req.body;
      const newFilm = await db.query(
        'INSERT into film (title, release_year) values ($1, $2) RETURNING *',
        [title, release_year]
      );

      const filmID = newFilm.rows[0].film_id;
      if (genres_id) {
        let query = 'INSERT INTO film_genre (film_id, genre_id) values';
        genres_id.forEach((e, index) => {
          query += ` (${filmID},${e})`;
          if (genres_id.length - 1 != index) {
            query += ',';
          }
        });
        await db.query(query);
      }

      res.send(newFilm.rows[0]);
    } catch (e) {
      console.log(e);
    }
  }

  async updateFilm(req, res) {
    try {
      const id = req.params.id;
      const { title, release_year, genres_id } = req.body;
      if (genres_id) {
        await db.query('DELETE FROM film_genre WHERE film_id = $1', [id]);
        const updatedFilm = await db.query(
          'UPDATE film set title = $1, release_year = $2 where film_id = $3 RETURNING *',
          [title, release_year, id]
        );

        const filmId = updatedFilm.rows[0].film_id;
        let query = 'INSERT INTO film_genre (film_id, genre_id) values';
        genres_id.forEach((e, index) => {
          query += ` (${filmId},${e})`;
          if (genres_id.length - 1 != index) {
            query += ',';
          }
        });
        await db.query(query);
      } else {
        const updatedFilm = await db.query(
          'UPDATE film SET title = $1, release_year = $2 where film_id = $3 RETURNING *',
          [title, release_year, id]
        );
      }
      res.send('Фильм успешно обновлен');
    } catch (e) {
      console.log(e);
    }
  }

  async deleteFilm(req, res) {
    const id = req.params.id;
    await db.query('DELETE FROM film_genre WHERE film_id = $1', [id]);
    await db.query('DELETE FROM film WHERE film_id = $1', [id]);
    res.send('Фильм с id = ' + id + ' успешно удален');
    try {
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new FilmController();
