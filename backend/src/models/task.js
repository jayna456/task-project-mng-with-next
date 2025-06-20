const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = require('./user.js'); 

const Task = sequelize.define(
  'Task',
  {    
    taskName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: 'tasks'
  })

Task.belongsTo(User, {
  foreignKey: 'userId'
 })

module.exports = Task;