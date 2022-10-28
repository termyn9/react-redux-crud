// модель Sequelize для работы с таблицей tutorial
// инициалзиция таблицы tutorial с параметрами, столбцы будут сгенерированы автоматически
module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      Latitude: {
        type: Sequelize.STRING
      },
      Longitude: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Tutorial;
  };