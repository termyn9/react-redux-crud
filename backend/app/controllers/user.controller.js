// Контроллер пользовательских интерфейсов
exports.allAccess = (req, res) => {
    res.status(200).send("Public panel.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin panel.");
  };

  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };