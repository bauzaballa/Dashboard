import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FiltroPeriodo from './FiltroPeriodo';
import '../styles/components/_ConceptoDeValor.scss';

const ConceptoDeValor = ({ moneda }) => {
    const [conceptoValor, setConceptoValor] = useState(0);
    const [periodo, setPeriodo] = useState('año'); // Estado para el período seleccionado

    useEffect(() => {
        // Fetch data from the API
        axios.get('/api/concepto-valor', {
            params: {
                periodo,
                currency: moneda,
            },
        })
        .then(response => {
            const valor = response.data.conceptoValor;
            setConceptoValor(valor);
        })
        .catch(error => {
            console.error('Error fetching concepto de valor data:', error);
        });
    }, [periodo, moneda]); // Ejecutar cada vez que cambie el período o la moneda

    return (
        <div className="concepto-de-valor">
            <div className="header">
                <FiltroPeriodo periodo={periodo} onChange={setPeriodo} />
                <h3>Concepto de Valor</h3>
            </div>
                <p className="amount">${conceptoValor.toLocaleString()} <br></br> {moneda}</p>
            <button className="detalle-button">Ver detalle</button>
        </div>
    );
};

export default ConceptoDeValor;