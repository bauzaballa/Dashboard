import React from 'react';
import moment from 'moment';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import '../styles/components/_GraficoLinealVentas.scss'; // Asegúrate de importar el archivo de estilos

const GraficoLinealVentas = ({ data, periodo }) => {
    console.log('Datos recibidos en el gráfico:', data); // Verifica los datos

    if (!data || data.length === 0) {
        return <p>No hay datos para mostrar.</p>; // Mensaje si no hay datos
    }

    const formatFecha = (fecha) => {
        if (periodo === 'año') {
            return moment(fecha).format('MMM'); // Formatear solo el mes
        } else if (periodo === 'mes') {
            return moment(fecha).format('DD MMM'); // Formatear día y mes
        }
        return fecha;
    };

    const formatNumero = (numero) => {
        if (numero >= 1000) {
            return `$${(numero / 1000).toFixed(1)}k`; // Formatear en miles
        }
        return `$${numero}`;
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{formatNumero(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='grafico-lineal-container' style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" >
                <AreaChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <defs>
                        <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="1.43%" stopColor="rgba(172, 172, 172, 0.8)" />
                            <stop offset="75.57%" stopColor="rgba(28, 104, 170, 0)" />
                        </linearGradient>
                    </defs>
                    <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="fecha"
                        tickFormatter={formatFecha}
                        axisLine={false}
                        tickLine={false}
                        tick={{ className: 'axis-tick' }}
                    />
                    <YAxis
                        tickFormatter={formatNumero}
                        axisLine={false}
                        tickLine={false}
                        tick={{ className: 'axis-tick' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                        type="monotone"
                        dataKey="ventas"
                        stroke="#0076B8"
                        strokeWidth={3.37}
                        fillOpacity={1}
                        fill="url(#colorVentas)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GraficoLinealVentas;