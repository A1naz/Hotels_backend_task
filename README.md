# Hotels_backend_task
 
 1.Запуск сервера осуществляется командой "npm run dev". 
 
 2.Параметры подключения к БД в папке src, в файле db.js.
 
 3.В папке routers/controllers содержатся роутеры/контроллеры для сущностей film, genre.

Подробнее по запросам:

1. Для добавления фильмов используем POST запрос на адрес "http://localhost:5000/films", для изменения PUT запрос с параметром id  "http://localhost:5000/films?id=1" с телом запроса вида:

 {
        "title": "Зеленая миля",
        "release_year": "1999-07-20",
        "genres_id": [2, 1]
 }

2. Для получения всех фильмов GET запрос "http://localhost:5000/films" или же с параметром id: "http://localhost:5000/films?id=1" для получения одного фильма.

3. Для удаления фильмов DELETE запрос с параметром id: "http://localhost:5000/films?id=1".

4. Для добавления жанров используем POST запрос на адрес "http://localhost:5000/genres", для изменения PUT запрос с параметром id "http://localhost:5000/genres?id=2" с телом запроса вида:

 {
        "title": "Хоррор"
 }
 
5. Для получения всех жанров GET запрос "http://localhost:5000/genres" или же с параметром id: "http://localhost:5000/genres?id=1" для получения одного жанра.
