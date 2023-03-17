const db = require('../src/db');

class GenreController {
  async getGenres(req, res) {
    if (req.params.id) {
      const genres = await db.query('SELECT * FROM genre where genre_id = $1', [
        req.params.id,
      ]);
      res.send(genres.rows);
    } else {
      const genres = await db.query('SELECT * FROM genre');
      res.send(genres.rows);
    }
  }

  async addGenre(req, res) {
    try {
      const { title } = req.body;
      const newGenre = await db.query(
        'INSERT INTO genre (title) VALUES ($1) RETURNING *',
        [title]
      );

      res.send(newGenre.rows);
    } catch (e) {
      console.log(e);
    }
  }

  async updateGenre(req, res) {
    try {
      const id = req.params.id;
      const { title } = req.body;
      const updatedGenre = await db.query(
        'UPDATE genre set title = $1 where genre_id = $2 RETURNING *',
        [title, id]
      );
      res.send(updatedGenre.rows);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteGenre(req, res) {
    try {
      const id = req.params.id;
      await db.query('DELETE FROM film_genre WHERE genre_id = $1', [id]);
      await db.query('DELETE FROM genre WHERE genre_id = $1', [id]);
      res.send('Жанр успешно удален');
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new GenreController();
