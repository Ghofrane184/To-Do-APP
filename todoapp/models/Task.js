// models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Project = require('./Project');

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('to do', 'doing', 'done'),
    defaultValue: 'to do',
  },
  due_date: {
    type: DataTypes.DATE,
  },
});

Task.belongsTo(Project, {
  foreignKey: {
    name: 'projectId',
    allowNull: false
  },
  onDelete: 'CASCADE',
});
module.exports = Task;
