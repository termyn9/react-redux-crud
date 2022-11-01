const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

// маршруты для регистрации
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // регистрация с доп-ой проверкой (middleware) на существование роли и дубликацию данных
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  // USERS
  app.get("/api/auth/users", controller.findAll);

  app.get("/api/auth/users/:id", controller.findOne)
  
  app.put("/api/auth/users/:id", controller.update)

  // вход через контроллер проверки входа (доп-ых middleware проверок не надо)
  app.post("/api/auth/signin", controller.signin);
};