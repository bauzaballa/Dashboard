const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Gastos = sequelize.define('Gastos', {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4, // Generar automáticamente un UUID
            primaryKey: true,
        },
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        id_gasto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        monto_ars: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        monto_usd: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        fecha_gasto: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        proveedor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        detalles: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        extra: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        info_extra: {
            type: DataTypes.JSONB,
            allowNull: true,
        }
    }, {
        tableName: 'Gastos',
        timestamps: true,
    });

    return Gastos;
};