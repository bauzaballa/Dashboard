const { Sequelize } = require('sequelize');
const config = require('./config');
const ventas = require('./models/ventas');
const gastos = require('./models/gastos');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
        host: dbConfig.host,
        dialect: dbConfig.dialect,
    }
);

// Definir modelos
const models = {
    ventas: ventas(sequelize, Sequelize.DataTypes),
    gastos: gastos(sequelize, Sequelize.DataTypes),
};

module.exports = { sequelize, ...models };