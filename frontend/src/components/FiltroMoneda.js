import React from 'react';
import '../styles/components/_FiltroMoneda.scss';
import arg from '../assets/Argentine-Peso-512.webp';
import usd from '../assets/1a857d341d8b6dd31426d6a62a8d9054-dollar-coin-currency-icon.webp';

const FiltroMoneda = ({ moneda, onChange, crecimiento }) => {
    const getCrecimientoClass = (valor) => {
        return valor > 0 ? 'positivo' : 'negativo';
    };

    return (
        <div className="filtro-moneda">
            <button
                className={`filtro-moneda__button ${moneda === 'ARS' ? 'active' : ''}`}
                onClick={() => onChange('ARS')}
            >
                <div className='currency-icon'>
                    <img src={arg} alt='arsicon'></img>
                </div>
                <div className='currency-text'>
                    <div>ARS</div>
                    <div className={`crecimiento ${getCrecimientoClass(crecimiento.ARS)}`}>
                        {crecimiento.ARS > 0 ? '↑' : '↓'} {crecimiento.ARS}%
                    </div>
                </div>
            </button>
            <button
                className={`filtro-moneda__button ${moneda === 'USD' ? 'active' : ''}`}
                onClick={() => onChange('USD')}
            >
                <div className='currency-icon'>
                    <img src={usd} alt='usdicon'></img>
                </div>
                <div className='currency-text'>
                    <div>USD</div>
                    <div className={`crecimiento ${getCrecimientoClass(crecimiento.USD)}`}>
                        {crecimiento.USD > 0 ? '↑' : '↓'} {crecimiento.USD}%
                    </div>
                </div>
            </button>
        </div>
    );
};

export default FiltroMoneda;