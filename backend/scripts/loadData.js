const fs = require('fs');
const path = require('path');
const { ventas, gastos } = require('../sequelize');

const loadData = async () => {
    try {
        // Usar rutas relativas
        const ventasPath = path.join(__dirname, '../data/ventas_500.json');
        const gastosPath = path.join(__dirname, '../data/gastos_500.json');

        const ventasData = JSON.parse(fs.readFileSync(ventasPath, 'utf8'));
        const gastosData = JSON.parse(fs.readFileSync(gastosPath, 'utf8'));

        // Transformar datos de ventas
        const ventasTransformadas = ventasData.data_ventas.map(venta => ({
            id_venta: venta.id_venta || venta.id,  // Usa id_venta o id si está presente
            id: venta.id || null,                  // Almacena id si está presente
            currency: venta.currency,
            monto_ars: venta.monto_ars || null,
            monto_usd: venta.monto_usd || null,
            cliente: venta.cliente || venta.detalles?.cliente || venta.extra?.cliente || venta.info_extra?.cliente || null,
            fecha: venta.fecha || venta.detalles?.fecha || venta.extra?.fecha || venta.info_extra?.fecha_compra || null,
            producto: venta.producto || venta.detalles?.producto || venta.extra?.producto || venta.info_extra?.descripcion || null,
            impuestos: venta.impuestos || null,
            detalles: venta.detalles || null,
            extra: venta.extra || null,
            info_extra: venta.info_extra || null
        }));

        // Transformar datos de gastos
        const gastosTransformados = gastosData.data_gastos.map(gasto => ({
            id: gasto.id || null,                  // Usa id si está presente
            id_gasto: gasto.id_gasto || null,      // Usa id_gasto si está presente
            currency: gasto.currency,
            monto_ars: gasto.monto_ars || null,
            monto_usd: gasto.monto_usd || null,
            fecha_gasto: gasto.fecha_gasto || gasto.fecha || gasto.detalles?.fecha || gasto.extra?.fecha || gasto.info_extra?.fecha_gasto || null,
            descripcion: gasto.descripcion || gasto.detalles?.descripcion || gasto.extra?.descripcion || gasto.info_extra?.descripcion || null,
            proveedor: gasto.proveedor || gasto.detalles?.proveedor || gasto.extra?.proveedor || gasto.info_extra?.proveedor || null,
            detalles: gasto.detalles || null,
            extra: gasto.extra || null,
            info_extra: gasto.info_extra || null
        }));

        console.log('Ventas transformadas:', ventasTransformadas);
        console.log('Gastos transformados:', gastosTransformados);

        // Insertar datos en la base de datos
        await ventas.bulkCreate(ventasTransformadas);
        await gastos.bulkCreate(gastosTransformados);

        console.log('Datos cargados exitosamente');
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
};

module.exports = loadData;