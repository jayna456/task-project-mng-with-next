const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const user = require('./user.js');

const Project = sequelize.define(
  'Project',
  {    
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: 'projects'
  })

  Project.hasMany(user, {
    foreignKey: 'projectId',
    as: 'users'
  });

  module.exports = Project;