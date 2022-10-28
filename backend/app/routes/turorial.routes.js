// обработчики маршрута - реакция сервера на HTTP-запросы
module.exports = app => {
    // экземпляр контроллера
    const tutorials = require("../controllers/tutorial.controller.js");
   
    var router = require("express").Router();
  
    // добавить новый экземпляр
    router.post("/", tutorials.create);
  
    // получить все экземпляры
    router.get("/", tutorials.findAll);
  
    // получить все экземпляры с меткой
    router.get("/published", tutorials.findAllPublished);
  
    // получить определенный экземпляр
    router.get("/:id", tutorials.findOne);
  
    // обновить определенный экземпляр
    router.put("/:id", tutorials.update);
  
    // удалить определенный экземпляр
    router.delete("/:id", tutorials.delete);
  
    // удалить все экземпляры
    router.delete("/", tutorials.deleteAll);
  
    // исходный адрес и все маршруты
    app.use('/api/tutorials', router); 
  };