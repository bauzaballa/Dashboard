const express = require('express');
const cors = require('cors');
const { sequelize, ventas, gastos } = require('./sequelize');
const loadData = require('./scripts/loadData');
const { Op } = require('sequelize');
const moment = require('moment');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Dashboard de Finanzas');
});

// CRUD para Ventas
// ================================

// Obtener todas las ventas (con filtro de periodo)
app.get('/api/ventas', async (req, res) => {
    const { periodo } = req.query;
    let whereClause = {};

    if (periodo) {
        const now = moment();
        let startDate, endDate;

        switch (periodo) {
            case 'dia':
                startDate = now.startOf('day').toDate();
                endDate = now.endOf('day').toDate();
                break;
            case 'semana':
                startDate = now.startOf('week').toDate();
                endDate = now.endOf('week').toDate();
                break;
            case 'mes':
                startDate = now.startOf('month').toDate();
                endDate = now.endOf('month').toDate();
                break;
            case 'año':
                startDate = now.startOf('year').toDate();
                endDate = now.endOf('year').toDate();
                break;
            default:
                break;
        }

        if (startDate && endDate) {
            whereClause.fecha = {
                [Op.between]: [startDate, endDate],
            };
        }
    }

    try {
        const allVentas = await ventas.findAll({ where: whereClause });
        res.json(allVentas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
});

// Crear una nueva venta
app.post('/api/ventas', async (req, res) => {
    try {
        const nuevaVenta = await ventas.create(req.body);
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
});

// Actualizar una venta existente
app.put('/api/ventas/:uuid', async (req, res) => {
    try {
        const ventaActualizada = await ventas.update(req.body, {
            where: { uuid: req.params.uuid },
        });
        res.json(ventaActualizada);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
});

// Eliminar una venta
app.delete('/api/ventas/:uuid', async (req, res) => {
    try {
        await ventas.destroy({ where: { uuid: req.params.uuid } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
});

// CRUD para Gastos
// ================================

// Obtener todos los gastos (con filtro de periodo)
app.get('/api/gastos', async (req, res) => {
    const { periodo } = req.query;
    let whereClause = {};

    if (periodo) {
        const now = moment();
        switch (periodo) {
            case 'dia':
                whereClause.fecha_gasto = {
                    [Op.between]: [now.startOf('day').toDate(), now.endOf('day').toDate()],
                };
                break;
            case 'semana':
                whereClause.fecha_gasto = {
                    [Op.between]: [now.startOf('week').toDate(), now.endOf('week').toDate()],
                };
                break;
            case 'mes':
                whereClause.fecha_gasto = {
                    [Op.between]: [now.startOf('month').toDate(), now.endOf('month').toDate()],
                };
                break;
            case 'año':
                whereClause.fecha_gasto = {
                    [Op.between]: [now.startOf('year').toDate(), now.endOf('year').toDate()],
                };
                break;
            default:
                break;
        }
    }

    try {
        const allGastos = await gastos.findAll({ where: whereClause });
        res.json(allGastos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los gastos' });
    }
});

// Crear un nuevo gasto
app.post('/api/gastos', async (req, res) => {
    try {
        const nuevoGasto = await gastos.create(req.body);
        res.status(201).json(nuevoGasto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el gasto' });
    }
});

// Actualizar un gasto existente
app.put('/api/gastos/:uuid', async (req, res) => {
    try {
        const gastoActualizado = await gastos.update(req.body, {
            where: { uuid: req.params.uuid },
        });
        res.json(gastoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el gasto' });
    }
});

// Eliminar un gasto
app.delete('/api/gastos/:uuid', async (req, res) => {
    try {
        await gastos.destroy({ where: { uuid: req.params.uuid } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el gasto' });
    }
});

// Otras Rutas
// ================================

// Obtener datos para el gráfico
app.get('/api/grafico', async (req, res) => {
    const { periodo, currency } = req.query;

    try {
        const allVentas = await ventas.findAll();
        const ventasAgrupadas = {};

        allVentas.forEach((venta) => {
            const monto = currency === 'USD' ? venta.monto_usd : venta.monto_ars;
            if (monto !== null && monto !== undefined) {
                let clave;
                switch (periodo) {
                    case 'año':
                        clave = moment(venta.fecha).format('MMM YYYY');
                        break;
                    case 'mes':
                        clave = moment(venta.fecha).format('DD MMM YYYY');
                        break;
                    default:
                        clave = moment(venta.fecha).format('MMM YYYY');
                }

                if (!ventasAgrupadas[clave]) {
                    ventasAgrupadas[clave] = 0;
                }
                ventasAgrupadas[clave] += monto;
            }
        });

        const datosGrafico = Object.keys(ventasAgrupadas).map((clave) => ({
            fecha: clave,
            ventas: ventasAgrupadas[clave],
        }));

        datosGrafico.sort((a, b) => {
            const formato = periodo === 'mes' ? 'DD MMM YYYY' : 'MMM YYYY';
            return moment(a.fecha, formato).toDate() - moment(b.fecha, formato).toDate();
        });

        res.json(datosGrafico);
    } catch (error) {
        console.error('Error al obtener los datos del gráfico:', error);
        res.status(500).json({ error: 'Error al obtener los datos del gráfico' });
    }
});

// Calcular el crecimiento
app.get('/api/crecimiento', async (req, res) => {
    try {
        const allVentas = await ventas.findAll();
        const allGastos = await gastos.findAll();

        const hoy = moment();
        const en30Dias = moment().add(30, 'days');

        const ventasProximos30Dias = allVentas.filter((venta) =>
            moment(venta.fecha).isBetween(hoy, en30Dias, null, '[]')
        );
        const gastosProximos30Dias = allGastos.filter((gasto) =>
            moment(gasto.fecha_gasto).isBetween(hoy, en30Dias, null, '[]')
        );

        const crecimiento = {
            ARS: calcularCrecimiento(ventasProximos30Dias, gastosProximos30Dias, 'monto_ars'),
            USD: calcularCrecimiento(ventasProximos30Dias, gastosProximos30Dias, 'monto_usd'),
        };

        res.json(crecimiento);
    } catch (error) {
        console.error('Error al calcular el crecimiento:', error);
        res.status(500).json({ error: 'Error al calcular el crecimiento' });
    }
});

const calcularCrecimiento = (ventas, gastos, campo) => {
    const ingresos = ventas.reduce((sum, venta) => sum + (venta[campo] || 0), 0);
    const egresos = gastos.reduce((sum, gasto) => sum + (gasto[campo] || 0), 0);

    if (egresos === 0) {
        return 100.0.toFixed(2);
    }
    const crecimiento = ((ingresos - egresos) / egresos) * 100;
    return crecimiento.toFixed(2);
};

// Obtener el concepto de valor
app.get('/api/concepto-valor', async (req, res) => {
    const { periodo, currency } = req.query;
    let whereClauseVentas = {};
    let whereClauseGastos = {};

    if (periodo) {
        const now = moment();
        let startDate, endDate;

        switch (periodo) {
            case 'año':
                startDate = now.startOf('year').toDate();
                endDate = now.endOf('year').toDate();
                break;
            case 'mes':
                startDate = now.startOf('month').toDate();
                endDate = now.endOf('month').toDate();
                break;
            default:
                break;
        }

        if (startDate && endDate) {
            whereClauseVentas.fecha = {
                [Op.between]: [startDate, endDate],
            };
            whereClauseGastos.fecha_gasto = {
                [Op.between]: [startDate, endDate],
            };
        }
    }

    try {
        const allVentas = await ventas.findAll({ where: whereClauseVentas });
        const allGastos = await gastos.findAll({ where: whereClauseGastos });

        const totalVentas = allVentas.reduce((sum, venta) => sum + (venta[`monto_${currency.toLowerCase()}`] || 0), 0);
        const totalGastos = allGastos.reduce((sum, gasto) => sum + (gasto[`monto_${currency.toLowerCase()}`] || 0), 0);

        const conceptoValor = totalVentas - totalGastos;

        res.json({ conceptoValor });
    } catch (error) {
        console.error('Error al obtener el concepto de valor:', error);
        res.status(500).json({ error: 'Error al obtener el concepto de valor' });
    }
});

// Sincronizar la base de datos y cargar datos iniciales
sequelize.sync({ force: false }).then(() => {
    loadData().then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    });
});