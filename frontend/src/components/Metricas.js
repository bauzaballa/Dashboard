import React, { useEffect, useState } from 'react';
import GraficoLinealVentas from './GraficoLinealVentas';
import FiltroPeriodo from './FiltroPeriodo';
import FiltroMoneda from './FiltroMoneda';
import InfoCards from './InfoCards';
import ConceptoDeValor from './ConceptoDeValor';
import axios from 'axios';
import '../styles/components/_Metricas.scss';

const Metricas = () => {
    const [datosGrafico, setDatosGrafico] = useState([]);
    const [periodo, setPeriodo] = useState('año'); // Estado para el período seleccionado
    const [moneda, setMoneda] = useState('ARS'); // Estado para la moneda seleccionada
    const [crecimiento, setCrecimiento] = useState({ ARS: 0, USD: 0 }); // Estado para el crecimiento

    useEffect(() => {
        // Obtener los datos del gráfico con el período y la moneda seleccionados
        axios.get('/api/grafico', { params: { periodo, currency: moneda } })
            .then((response) => {
                setDatosGrafico(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos del gráfico:', error);
            });

        // Obtener los datos de crecimiento
        axios.get('/api/crecimiento')
            .then((response) => {
                setCrecimiento(response.data);
            })
            .catch((error) => {
                console.error('Error al obtener los datos de crecimiento:', error);
            });
    }, [periodo, moneda]); // Ejecutar cada vez que cambie el período o la moneda

    return (
        <div className='contenedor-metricas'>
            <h2 className='usuarioMetricas'>Hola Usuario 1</h2>
            <h1 className='tituloMetricas'>¿Qué hacemos hoy?</h1>
            <FiltroMoneda moneda={moneda} onChange={setMoneda} crecimiento={crecimiento} />
            <div className='contenedor-main'>
                <div className='grafico'>
                    <div className='sup-bar-grafico'>
                        <h2 className='titulo-grafico'>Ventas</h2>
                        <FiltroPeriodo periodo={periodo} onChange={setPeriodo} />
                    </div>
                    <GraficoLinealVentas data={datosGrafico} periodo={periodo} />
                </div>
                <ConceptoDeValor moneda={moneda} periodo={periodo} />
            </div>
            <InfoCards />
        </div>
    );
};

export default Metricas;