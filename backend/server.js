// EXPRESS - создание REST API
const express = require("express"); // подключение express
const bodyParser = require("body-parser"); // помогает разобрать запрос и создать req.body
const cors = require("cors") // промежуточное ПО Express для включения CORS с различными параметрами

const app = express() // объект приложения

// вызов БД и работа с заданными параметрами
const db = require("./app/models");
db.sequelize.sync(); // синхронизация через sequelize

// повторная синхронизация БД, если удалили существующие таблицы в самой БД
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
// });

var corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// обработка для маршрута (тестовый)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to application." });
});

// включаем маршруты в express
require("./app/routes/turorial.routes")(app);

// установка номера порта
const PORT = process.env.PORT || 8080; 

// прослушивание подключений к порту
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

