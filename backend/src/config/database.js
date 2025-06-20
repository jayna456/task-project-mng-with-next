const Sequelize = require('sequelize');

const sequelize = new Sequelize('task-management', process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql'
});

module.exports = sequelize;