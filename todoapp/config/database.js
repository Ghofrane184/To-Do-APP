const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todoapp', 'root', '', {

        host: 'localhost',
        dialect: 'mysql',


});


module.exports = sequelize;