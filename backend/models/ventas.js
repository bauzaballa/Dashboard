const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Ventas = sequelize.define('Ventas', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4, // Generar automáticamente un UUID
            primaryKey: true,
        },
        id_venta: {
            type: DataTypes.STRING,       // Tipo de dato: cadena de texto
            allowNull: true,              // Permitimos nulo para manejar registros con "id"
        },
        id: {
            type: DataTypes.INTEGER,      // Tipo de dato: entero
            allowNull: true,              // Permitimos nulo para manejar registros con "id_venta"
        },
        currency: {
            type: DataTypes.STRING,       // Tipo de dato: cadena de texto
            allowNull: false,             // No puede ser nulo
        },
        monto_ars: {
            type: DataTypes.FLOAT,        // Tipo de dato: número decimal
            allowNull: true,              // Puede ser nulo (si la moneda es USD)
        },
        monto_usd: {
            type: DataTypes.FLOAT,        // Tipo de dato: número decimal
            allowNull: true,              // Puede ser nulo (si la moneda es ARS)
        },
        cliente: {
            type: DataTypes.STRING,       // Tipo de dato: cadena de texto
            allowNull: true,              // Puede ser nulo
        },
        fecha: {
            type: DataTypes.DATE,         // Tipo de dato: fecha
            allowNull: true,              // Puede ser nulo
        },
        producto: {
            type: DataTypes.STRING,       // Tipo de dato: cadena de texto
            allowNull: true,              // Puede ser nulo
        },
        impuestos: {
            type: DataTypes.JSONB,        // Tipo de dato: objeto JSON
            allowNull: true,              // Puede ser nulo
        },
        detalles: {
            type: DataTypes.JSONB,        // Tipo de dato: objeto JSON
            allowNull: true,              // Puede ser nulo
        },
        extra: {
            type: DataTypes.JSONB,        // Tipo de dato: objeto JSON
            allowNull: true,              // Puede ser nulo
        },
        info_extra: {
            type: DataTypes.JSONB,        // Tipo de dato: objeto JSON
            allowNull: true,              // Puede ser nulo
        }
    });

    return Ventas;
};