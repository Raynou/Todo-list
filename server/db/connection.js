const { Sequelize } = require("sequelize");
const sequelize = new Sequelize('sqlite:todos.db')
exports.sequelize = sequelize