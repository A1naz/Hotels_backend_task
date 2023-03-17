const PORT = process.env.PORT || 5000;
const Application = require('./framework/Application');
const filmRoutes = require('./routes/film-router');
const genreRoutes = require('./routes/genre-router');
const jsonParser = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');

const app = new Application();

app.use(jsonParser);
app.use(parseUrl('http://localhost:5000'));
app.addRouter(filmRoutes);
app.addRouter(genreRoutes);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
