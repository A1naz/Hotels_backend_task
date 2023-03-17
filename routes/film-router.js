const Router = require('../framework/Router');
const router = new Router();
const filmController = require('../controllers/film-controller');

router.get('/films', filmController.getFilms);
router.post('/films', filmController.addFilm);
router.put('/films', filmController.updateFilm);
router.delete('/films', filmController.deleteFilm);

module.exports = router;
