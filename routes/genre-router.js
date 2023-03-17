const Router = require('../framework/Router');
const router = new Router();
const genreController = require('../controllers/genre-controller');

router.get('/genres', genreController.getGenres);
router.post('/genres', genreController.addGenre);
router.put('/genres', genreController.updateGenre);
router.delete('/genres', genreController.deleteGenre);

module.exports = router;
