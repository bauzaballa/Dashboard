import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/components/_InfoCards.scss';

const InfoCards = () => {
    const [data, setData] = useState({
        positiveARS: 0,
        positiveUSD: 0,
        negativeARS: 0,
        negativeUSD: 0,
    });

    useEffect(() => {
        // Fetch data from the API for ventas (positive values)
        axios.get('/api/ventas')
            .then(response => {
                const ventas = response.data;

                // Calcular los montos positivos en ARS y USD
                const positiveARS = ventas.reduce((acc, venta) => acc + (venta.monto_ars > 0 ? venta.monto_ars : 0), 0);
                const positiveUSD = ventas.reduce((acc, venta) => acc + (venta.monto_usd > 0 ? venta.monto_usd : 0), 0);

                // Actualizar el estado con los valores positivos
                setData(prevData => ({
                    ...prevData,
                    positiveARS,
                    positiveUSD,
                }));
            })
            .catch(error => {
                console.error('Error fetching ventas data:', error);
            });

        // Fetch data from the API for gastos (negative values)
        axios.get('/api/gastos')
            .then(response => {
                const gastos = response.data;

                // Calcular los montos negativos en ARS y USD
                const negativeARS = gastos.reduce((acc, gasto) => acc + (gasto.monto_ars || 0), 0);
                const negativeUSD = gastos.reduce((acc, gasto) => acc + (gasto.monto_usd || 0), 0);

                // Actualizar el estado con los valores negativos
                setData(prevData => ({
                    ...prevData,
                    negativeARS,
                    negativeUSD,
                }));
            })
            .catch(error => {
                console.error('Error fetching gastos data:', error);
            });
    }, []);

    return (
        <div className="info-cards">
            <div className="info-card positive">
                <div className='text'>
                    <h3>Valor positivo</h3>
                    <p className="amount">${data.positiveARS.toLocaleString()} ARS</p>
                </div>
                <div className="icon up"></div>
            </div>
            <div className="info-card positive">
                <div className='text'>
                    <h3>Valor positivo</h3>
                    <p className="amount">${data.positiveUSD.toLocaleString()} USD</p>
                </div>
                <div className="icon up"></div>
            </div>
            <div className="info-card negative">
                <div className='text'>
                    <h3>Valor negativo</h3>
                    <p className="amount">${Math.abs(data.negativeARS).toLocaleString()} ARS</p>
                </div>
                <div className="icon down"></div>
            </div>
            <div className="info-card negative">
                <div className='text'>
                    <h3>Valor negativo</h3>
                    <p className="amount">${Math.abs(data.negativeUSD).toLocaleString()} USD</p>
                </div>
                <div className="icon down"></div>
            </div>
        </div>
    );
};

export default InfoCards;